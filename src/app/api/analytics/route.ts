import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViewsAgg,
      categoriesWithCount,
      recentLogs,
      recentPosts,
      subscribersCount,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
      }),
      prisma.generationLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 7,
        select: {
          id: true,
          title: true,
          slug: true,
          views: true,
          createdAt: true,
          status: true,
        },
      }),
      prisma.newsletterSubscriber.count(),
    ]);

    const totalViews = totalViewsAgg._sum.views || 0;
    // Estimated CPM of $8.50 per 1000 views + $15 per affiliate referral estimation
    const estimatedAdRevenue = ((totalViews / 1000) * 8.5).toFixed(2);
    const estimatedAffiliateRevenue = (totalViews * 0.015 * 12).toFixed(2);
    const totalEstimatedEarnings = (
      parseFloat(estimatedAdRevenue) + parseFloat(estimatedAffiliateRevenue)
    ).toFixed(2);

    const categoryData = categoriesWithCount.map((c) => ({
      name: c.name,
      count: c._count.posts,
    }));

    return NextResponse.json({
      summary: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews,
        subscribersCount,
        estimatedAdRevenue: `$${estimatedAdRevenue}`,
        estimatedAffiliateRevenue: `$${estimatedAffiliateRevenue}`,
        totalEstimatedEarnings: `$${totalEstimatedEarnings}`,
      },
      categoryData,
      recentLogs,
      recentPosts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
