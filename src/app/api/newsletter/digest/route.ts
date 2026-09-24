import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";
import { sendDailyVipViralDigestEmail, ViralDigestArticle, DigestRecipient } from "@/lib/emailNotification";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleDigest(req);
}

export async function POST(req: NextRequest) {
  return handleDigest(req);
}

async function handleDigest(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const send = searchParams.get("send") === "true";
    const secret = searchParams.get("secret");
    const authHeader = req.headers.get("authorization");
    const expectedSecret = process.env.CRON_SECRET || "auto-blog-secure-key-2025";

    const isAuthorized =
      secret === expectedSecret ||
      authHeader === `Bearer ${expectedSecret}` ||
      req.headers.get("x-admin-key") === expectedSecret;

    // 1. Fetch Top 5 Viral Articles
    let topPosts: ViralDigestArticle[] = [];
    try {
      const posts = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ views: "desc" }, { publishedAt: "desc" }],
        take: 5,
        include: {
          category: { select: { name: true } },
        },
      });

      if (posts && posts.length > 0) {
        topPosts = posts.map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          featuredImage: p.featuredImage || undefined,
          readTimeMinutes: p.readTimeMinutes || 5,
          category: p.category?.name || "FRONTIER INTELLIGENCE",
        }));
      }
    } catch (_) {
      // Fallback to static catalog articles
    }

    if (topPosts.length === 0) {
      const catalog = getAllCatalogArticles();
      topPosts = catalog.slice(0, 5).map((c) => ({
        title: c.title,
        slug: c.slug,
        excerpt: c.excerpt,
        featuredImage: c.featuredImage,
        readTimeMinutes: c.readTimeMinutes || 5,
        category: typeof c.category === "string" ? c.category : "VIP INTELLIGENCE",
      }));
    }

    // 2. Fetch VIP members & Newsletter Subscribers
    const recipientMap = new Map<string, DigestRecipient>();

    try {
      // Add all active VIP Users
      const vipUsers = await prisma.user.findMany({
        where: { isVip: true },
        select: { email: true, name: true },
      });
      for (const u of vipUsers) {
        if (u.email && u.email.includes("@")) {
          recipientMap.set(u.email.toLowerCase().trim(), {
            email: u.email.toLowerCase().trim(),
            name: u.name || undefined,
          });
        }
      }

      // Add all active newsletter subscribers
      const subscribers = await prisma.newsletterSubscriber.findMany({
        where: { status: "ACTIVE" },
        select: { email: true },
      });
      for (const s of subscribers) {
        if (s.email && s.email.includes("@")) {
          const cleanEmail = s.email.toLowerCase().trim();
          if (!recipientMap.has(cleanEmail)) {
            recipientMap.set(cleanEmail, { email: cleanEmail });
          }
        }
      }
    } catch (err: any) {
      console.warn("Could not query DB subscribers:", err.message);
    }

    // Always include admin as a recipient for audit/verification
    const adminEmail = process.env.ADMIN_EMAIL || "arnab.laha2018@gmail.com";
    if (!recipientMap.has(adminEmail)) {
      recipientMap.set(adminEmail, { email: adminEmail, name: "Admin" });
    }

    const recipients = Array.from(recipientMap.values());

    // 3. If send=true is requested and authorized, dispatch emails
    if (send) {
      if (!isAuthorized && process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Unauthorized dispatch request" }, { status: 401 });
      }

      const dispatchResult = await sendDailyVipViralDigestEmail(topPosts, recipients);

      return NextResponse.json({
        success: true,
        dispatched: true,
        recipientsCount: recipients.length,
        dispatchedCount: dispatchResult.dispatchedCount,
        errors: dispatchResult.errors,
        articlesFeatured: topPosts.length,
        timestamp: new Date().toISOString(),
      });
    }

    // 4. Otherwise, return preview payload
    return NextResponse.json({
      success: true,
      subscribersCount: recipients.length,
      topArticlesCount: topPosts.length,
      articles: topPosts,
      recipientsPreview: recipients.slice(0, 10).map((r) => r.email),
      info: "Pass ?send=true&secret=auto-blog-secure-key-2025 to dispatch daily viral briefing.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

