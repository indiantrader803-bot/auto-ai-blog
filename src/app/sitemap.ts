import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-orpin.vercel.app"
  ).replace(/\/$/, "");

  let dbPosts: any[] = [];
  let dbCategories: any[] = [];

  try {
    const [posts, cats] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
      prisma.category.findMany({
        select: { slug: true, createdAt: true },
      }),
    ]);
    dbPosts = posts || [];
    dbCategories = cats || [];
  } catch (e) {
    console.warn("Sitemap DB fetch notice:", e);
  }

  // Articles from DB + Catalog
  const catalog = getAllCatalogArticles();
  const postSlugs = new Set<string>();

  const postEntries: MetadataRoute.Sitemap = [];

  // 1. Add DB posts
  for (const post of dbPosts) {
    postSlugs.add(post.slug);
    postEntries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // 2. Add Catalog articles if not duplicate
  for (const article of catalog) {
    if (!postSlugs.has(article.slug)) {
      postSlugs.add(article.slug);
      postEntries.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "daily",
        priority: 0.9,
      });
    }
  }

  // Categories
  const categorySlugs = new Set<string>([
    "artificial-intelligence",
    "development-and-engineering",
    "finance-and-markets",
    "technology",
  ]);

  for (const cat of dbCategories) {
    categorySlugs.add(cat.slug);
  }

  const categoryEntries: MetadataRoute.Sitemap = Array.from(categorySlugs).map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...categoryEntries, ...postEntries];
}
