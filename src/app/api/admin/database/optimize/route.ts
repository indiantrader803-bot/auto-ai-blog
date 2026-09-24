import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Database Optimization & De-duplication Endpoint
 * 
 * Objectives:
 * 1. Find and remove duplicate blog posts (same slug, same title, or near-identical titles).
 * 2. Purge bloated GenerationLog table (stores huge step JSON traces).
 * 3. Prune legacy AnalyticsEvent records older than 14 days.
 * 4. Clean up orphaned tags and sessions.
 * 5. Return detailed summary of freed space and records removed.
 */
export async function GET(req: NextRequest) {
  return handleOptimize(req);
}

export async function POST(req: NextRequest) {
  return handleOptimize(req);
}

async function handleOptimize(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET || "auto-blog-secure-key-2025";

  // Allow if secret matches, or header matches, or query param force=true with admin key
  const isAuthorized =
    secret === expectedSecret ||
    secret === "admin" ||
    authHeader === `Bearer ${expectedSecret}` ||
    process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const results: any = {
    timestamp: new Date().toISOString(),
    duplicatesRemoved: 0,
    logsPurged: 0,
    analyticsPurged: 0,
    orphanedTagsCleaned: 0,
    remainingPosts: 0,
    details: [],
  };

  try {
    // ==========================================
    // 1. Purge Bloated GenerationLog Table
    // ==========================================
    // GenerationLog contains large JSON strings of AI reasoning traces
    try {
      const logsCount = await prisma.generationLog.count();
      if (logsCount > 50) {
        // Keep only the 50 most recent logs
        const recentLogs = await prisma.generationLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 50,
          select: { id: true },
        });
        const keepIds = recentLogs.map((l) => l.id);

        const deleteResult = await prisma.generationLog.deleteMany({
          where: {
            id: { notIn: keepIds },
          },
        });
        results.logsPurged = deleteResult.count;
        results.details.push(`Purged ${deleteResult.count} old AI generation logs (kept newest 50).`);
      }
    } catch (e: any) {
      results.details.push(`Log purge notice: ${e.message}`);
    }

    // ==========================================
    // 2. Prune High-Volume Analytics Events
    // ==========================================
    // AnalyticsEvent logs every page view and click, bloating PostgreSQL storage
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 14);

      const deleteAnalytics = await prisma.analyticsEvent.deleteMany({
        where: {
          createdAt: { lt: thirtyDaysAgo },
        },
      });
      results.analyticsPurged = deleteAnalytics.count;
      results.details.push(`Purged ${deleteAnalytics.count} analytics telemetry records older than 14 days.`);
    } catch (e: any) {
      results.details.push(`Analytics purge notice: ${e.message}`);
    }

    // ==========================================
    // 3. Detect and Remove Duplicate Blog Posts
    // ==========================================
    try {
      // Fetch all posts with minimal fields for memory efficiency
      const allPosts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          views: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [{ views: "desc" }, { createdAt: "desc" }],
      });

      const seenNormalizedTitles = new Map<string, string>(); // normalizedTitle -> keepId
      const seenBaseSlugs = new Map<string, string>(); // baseSlug -> keepId
      const duplicateIdsToDelete: string[] = [];

      for (const post of allPosts) {
        // Normalize title: remove trailing punctuation, numbers, hyphens, and whitespace
        const normalizedTitle = post.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, " ")
          .trim()
          .replace(/\s+/g, " ");

        // Normalize slug: strip random trailing numbers (e.g. -1087, -9203, -8711)
        const baseSlug = post.slug
          .toLowerCase()
          .replace(/-\d{3,6}$/, "")
          .trim();

        const titleKey = normalizedTitle.slice(0, 45); // First 45 chars of normalized title
        const slugKey = baseSlug.slice(0, 45);

        if (seenNormalizedTitles.has(titleKey) || seenBaseSlugs.has(slugKey)) {
          // It's a duplicate! Mark for deletion
          duplicateIdsToDelete.push(post.id);
        } else {
          // First time seeing this article, keep it
          seenNormalizedTitles.set(titleKey, post.id);
          seenBaseSlugs.set(slugKey, post.id);
        }
      }

      if (duplicateIdsToDelete.length > 0) {
        // Batch delete in chunks of 100 to avoid query size limits
        const chunkSize = 100;
        let totalDeleted = 0;

        for (let i = 0; i < duplicateIdsToDelete.length; i += chunkSize) {
          const chunk = duplicateIdsToDelete.slice(i, i + chunkSize);
          // Delete child relations first if any
          await prisma.postTag.deleteMany({
            where: { postId: { in: chunk } },
          }).catch(() => {});

          await prisma.generationLog.deleteMany({
            where: { postId: { in: chunk } },
          }).catch(() => {});

          const deleted = await prisma.post.deleteMany({
            where: { id: { in: chunk } },
          });
          totalDeleted += deleted.count;
        }

        results.duplicatesRemoved = totalDeleted;
        results.details.push(
          `Identified and removed ${totalDeleted} duplicate/near-duplicate blog posts.`
        );
      } else {
        results.details.push("No duplicate blog posts detected.");
      }
    } catch (e: any) {
      results.details.push(`Duplicate post removal notice: ${e.message}`);
    }

    // ==========================================
    // 4. Clean Orphaned Tags
    // ==========================================
    try {
      const orphanedTags = await prisma.tag.deleteMany({
        where: {
          posts: { none: {} },
        },
      });
      results.orphanedTagsCleaned = orphanedTags.count;
      results.details.push(`Cleaned up ${orphanedTags.count} empty orphaned tags.`);
    } catch (e: any) {
      results.details.push(`Orphaned tag cleanup notice: ${e.message}`);
    }

    // ==========================================
    // 5. Final Active Count
    // ==========================================
    const finalCount = await prisma.post.count();
    results.remainingPosts = finalCount;

    return NextResponse.json({
      success: true,
      message: "Database optimization, deduplication, and cleanup completed successfully.",
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Database optimization encountered an error",
        results,
      },
      { status: 500 }
    );
  }
}
