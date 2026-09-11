import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let dbCategories: any[] = [];
    let latestPost: any = null;

    try {
      dbCategories = await prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
          posts: {
            where: { status: "PUBLISHED" },
            orderBy: { publishedAt: "desc" },
            take: 1,
            select: { title: true, slug: true, publishedAt: true },
          },
        },
      });

      latestPost = await prisma.post.findFirst({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        select: { title: true, slug: true },
      });
    } catch (e: any) {
      console.warn("DB Categories fetch warning:", e.message);
    }

    // Process and score categories based on real article count & freshness
    const processedCategories = dbCategories
      .map((cat) => {
        const postCount = cat._count?.posts || 0;
        const lastPost = cat.posts?.[0];
        const lastPublishedAt = lastPost?.publishedAt ? new Date(lastPost.publishedAt).getTime() : 0;
        const isRecent = Date.now() - lastPublishedAt < 1000 * 60 * 60 * 72; // within last 3 days

        // Emoji / Icon decorator mapping
        const emojiMap: Record<string, string> = {
          "artificial-intelligence": "🤖",
          "technology": "⚡",
          "tech-and-gadgets": "📱",
          "commodities": "🪙",
          "development-and-engineering": "💻",
          "indian-markets": "🇮🇳",
          "us-markets": "🇺🇸",
          "finance-and-markets": "📈",
          "telecom-and-connectivity": "📡",
          "web-development": "🌐",
          "productivity-and-workflow": "⚡",
        };

        const emoji = emojiMap[cat.slug] || "🔥";
        const displayName = cat.name.includes("🇮🇳") || cat.name.includes("🇺🇸") ? cat.name : `${emoji} ${cat.name}`;

        return {
          id: cat.id,
          name: displayName,
          rawName: cat.name,
          slug: cat.slug,
          count: postCount,
          isHot: postCount >= 5 || isRecent,
          priorityScore: postCount * 2 + (isRecent ? 15 : 0),
          lastPublishedAt,
        };
      })
      // Filter out categories with 0 posts
      .filter((c) => c.count > 0)
      // Sort strictly by priority score (most articles & latest published)
      .sort((a, b) => b.priorityScore - a.priorityScore);

    return NextResponse.json({
      success: true,
      categories: processedCategories,
      topTrendingPost: latestPost || {
        title: "Astra for Coding: Why Are We Doing This Again?",
        slug: "astra-for-coding-why-are-we-doing-this-again",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
