import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runFullAutonomousMaintenanceSwarm } from "@/lib/pipeline/maintenance/adminSwarm";

export const dynamic = "force-dynamic";

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
    console.log("24/7 Autonomous Traffic, Trend Hunter & Monetization Swarm Triggered...");
    const result = await runFullAutonomousMaintenanceSwarm({
      triggerNewPostGeneration: true, // Automatically publishes newly scouted viral topics daily
    });

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
      const adminEmail = process.env.ADMIN_EMAIL || "arnab.laha2018@gmail.com";
      if (!recipientMap.has(adminEmail)) recipientMap.set(adminEmail, { email: adminEmail, name: "Admin" });

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
      success: result.success,
      message: "24/7 Autonomous Admin Swarm Maintenance & Content Cycle executed.",
      durationSeconds: result.durationSeconds,
      digestReport,
      reports: result.fleetReports,
    });
  } catch (error: any) {
    console.error("Cron swarm execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

