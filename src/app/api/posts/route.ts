import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const status = searchParams.get("status") || "PUBLISHED";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status !== "ALL") {
      where.status = status;
    }

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            slug: tag,
          },
        },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    let posts: any[] = [];
    let total = 0;

    try {
      const [dbPosts, count] = await Promise.all([
        prisma.post.findMany({
          where,
          orderBy: { publishedAt: "desc" },
          skip,
          take: limit,
          include: {
            category: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        }),
        prisma.post.count({ where }),
      ]);
      posts = dbPosts;
      total = count;
    } catch (dbErr: any) {
      console.warn("DB posts fetch notice, serving catalog backup:", dbErr.message);
      const catalog = getAllCatalogArticles();
      let filtered = catalog;

      if (category) {
        filtered = filtered.filter((c) => c.category.slug === category);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((c) => c.title.toLowerCase().includes(s) || c.excerpt.toLowerCase().includes(s));
      }

      total = filtered.length;
      posts = filtered.slice(skip, skip + limit).map((c) => ({
        ...c,
        category: c.category,
        tags: c.tags.map((t) => ({ tag: { name: t, slug: t.toLowerCase().replace(/\s+/g, "-") } })),
      }));
    }

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.action === "DEDUPLICATE") {
      const allPosts = await prisma.post.findMany({
        orderBy: { publishedAt: "desc" },
      });

      const seenTitles = new Map<string, string>();
      const seenSlugs = new Map<string, string>();
      const idsToDelete: string[] = [];

      for (const p of allPosts) {
        const normTitle = p.title.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
        const baseSlug = p.slug.toLowerCase().replace(/-[0-9]{4,13}$/, "");

        if (seenTitles.has(normTitle) || seenSlugs.has(baseSlug)) {
          idsToDelete.push(p.id);
        } else {
          seenTitles.set(normTitle, p.id);
          seenSlugs.set(baseSlug, p.id);
        }
      }

      let deletedCount = 0;
      if (idsToDelete.length > 0) {
        const del = await prisma.post.deleteMany({
          where: { id: { in: idsToDelete } },
        });
        deletedCount = del.count;
      }

      return NextResponse.json({
        success: true,
        message: `Deduplication complete. Scanned ${allPosts.length} posts, removed ${deletedCount} duplicates.`,
        deletedCount,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
