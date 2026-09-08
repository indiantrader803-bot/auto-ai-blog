import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let dbCategories: any[] = [];
    try {
      dbCategories = await prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
      });
    } catch (e: any) {
      console.warn("DB Categories fetch warning:", e.message);
    }

    const catalog = getAllCatalogArticles();
    const catalogCatCounts: Record<string, { name: string; slug: string; count: number }> = {};

    for (const art of catalog) {
      const slug = art.category.slug;
      if (!catalogCatCounts[slug]) {
        catalogCatCounts[slug] = {
          name: art.category.name,
          slug: art.category.slug,
          count: 0,
        };
      }
      catalogCatCounts[slug].count++;
    }

    // Merge DB & Catalog categories
    const categoryMap = new Map<string, any>();

    // Pre-seed core hot topic categories
    const hotOrder = [
      { name: "🇮🇳 Indian Markets", slug: "indian-markets", isHot: true },
      { name: "🇺🇸 US Markets", slug: "us-markets", isHot: true },
      { name: "Forex (USD/INR)", slug: "forex-and-currencies", isHot: true },
      { name: "Commodities", slug: "commodities", isHot: true },
      { name: "AI & Tech", slug: "artificial-intelligence", isHot: true },
      { name: "Software Eng", slug: "development-and-engineering", isHot: false },
      { name: "Telecom & 5G", slug: "telecom-and-connectivity", isHot: false },
    ];

    for (const hot of hotOrder) {
      categoryMap.set(hot.slug, {
        id: hot.slug,
        name: hot.name,
        slug: hot.slug,
        isHot: hot.isHot,
        count: catalogCatCounts[hot.slug]?.count || 5,
      });
    }

    for (const dbCat of dbCategories) {
      const existing = categoryMap.get(dbCat.slug);
      if (existing) {
        existing.count = Math.max(existing.count, dbCat._count?.posts || 0);
      } else {
        categoryMap.set(dbCat.slug, {
          id: dbCat.id,
          name: dbCat.name,
          slug: dbCat.slug,
          isHot: false,
          count: dbCat._count?.posts || 0,
        });
      }
    }

    const result = Array.from(categoryMap.values());

    return NextResponse.json({
      success: true,
      categories: result,
      topTrendingSlug: "nifty-50-sensex-record-highs-fii-dii-liquidity-breakout",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
