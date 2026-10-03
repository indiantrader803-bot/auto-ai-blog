import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runBlogPipeline, getLastAutopublishAt } from "@/lib/pipeline/orchestrator";
import { runFullAutonomousMaintenanceSwarm } from "@/lib/pipeline/maintenance/adminSwarm";

export const dynamic = "force-dynamic";
// Keep the function alive long enough for a full scout→write→publish cycle on serverless hosts
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  return handleCron(req);
}

export async function POST(req: NextRequest) {
  return handleCron(req);
}

async function handleCron(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET || "auto-blog-secure-key-2025";

  const isAuthorized =
    secret === expectedSecret ||
    authHeader === `Bearer ${expectedSecret}` ||
    process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
  }

  try {
    console.log("24/7 Autonomous Content Engine triggered — daily article generation runs FIRST...");

    // 1. MULTI-ARTICLE DAILY PUBLISH (Cadence: every ~3.5 hours)
    // Allows multiple editor agents to publish fresh articles across diverse topics everyday
    const lastPublish = await getLastAutopublishAt();
    const hoursSincePublish = lastPublish
      ? (Date.now() - lastPublish.getTime()) / 3600000
      : Number.POSITIVE_INFINITY;

    let newPostResult: any = null;
    if (hoursSincePublish < 3.5) {
      newPostResult = {
        success: true,
        post: null,
        skipped: true,
        message: `Multi-article cadence active — newest article published ${hoursSincePublish.toFixed(1)}h ago (3.5h window). Next editor agent dispatch shortly.`,
      };
      console.log(`[CRON] ${newPostResult.message}`);
    } else {
      newPostResult = await runBlogPipeline({ autoPublish: true, fastMode: true });
      console.log(
        newPostResult.success
          ? `[CRON] Daily article cycle: ${newPostResult.post ? `published "${newPostResult.post.title}"` : "completed"}`
          : `[CRON] Daily article cycle FAILED: ${newPostResult.error}`
      );
    }

    // 2. 24/7 Maintenance swarm (promotion, indexing, monetization) — runs after the daily publish
    let swarmResult: any = null;
    try {
      swarmResult = await runFullAutonomousMaintenanceSwarm({
        triggerNewPostGeneration: false, // publishing already handled above
      });
    } catch (swarmErr: any) {
      console.warn("Maintenance swarm notice:", swarmErr.message);
      swarmResult = { success: false, error: swarmErr.message, fleetReports: [] };
    }

    // Dispatch Daily VIP & Reader Viral Headline Digest
    let digestReport = null;
    try {
      const topPosts = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ views: "desc" }, { publishedAt: "desc" }],
        take: 5,
        include: { category: { select: { name: true } } },
      });
      const vipUsers = await prisma.user.findMany({
        where: { isVip: true },
        select: { email: true, name: true },
      });
      const subscribers = await prisma.newsletterSubscriber.findMany({
        where: { status: "ACTIVE" },
        select: { email: true },
      });

      const recipientMap = new Map<string, { email: string; name?: string }>();
      for (const u of vipUsers) {
        if (u.email && u.email.includes("@")) {
          recipientMap.set(u.email.toLowerCase().trim(), { email: u.email.toLowerCase().trim(), name: u.name || undefined });
        }
      }
      for (const s of subscribers) {
        if (s.email && s.email.includes("@")) {
          const clean = s.email.toLowerCase().trim();
          if (!recipientMap.has(clean)) recipientMap.set(clean, { email: clean });
        }
      }

      if (topPosts.length > 0 && recipientMap.size > 0) {
        const { sendDailyVipViralDigestEmail } = await import("@/lib/emailNotification");
        const formattedArticles = topPosts.map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          featuredImage: p.featuredImage || undefined,
          readTimeMinutes: p.readTimeMinutes || 5,
          category: p.category?.name || "VIP INTELLIGENCE",
        }));
        digestReport = await sendDailyVipViralDigestEmail(formattedArticles, Array.from(recipientMap.values()));
      }
    } catch (digestErr: any) {
      console.warn("Daily VIP digest dispatch notice:", digestErr.message);
    }

    return NextResponse.json({
      success: Boolean(newPostResult?.success ?? true),
      message: newPostResult?.post
        ? `Daily article published: "${newPostResult.post.title}"`
        : "Daily cadence cycle executed.",
      dailyPublish: newPostResult,
      durationSeconds: swarmResult?.durationSeconds,
      digestReport,
      reports: swarmResult?.fleetReports,
    });
  } catch (error: any) {
    console.error("Cron execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

