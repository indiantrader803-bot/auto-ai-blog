import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://thesmartmag.com"
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
    "technology",
    "artificial-intelligence",
    "festivals-and-culture",
    "travel-and-expeditions",
    "finance-and-markets",
    "development-and-engineering",
    "tech-and-gadgets",
    "commodities",
    "indian-markets",
    "telecom-and-connectivity",
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
      url: "https://travel.thesmartmag.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://travel.thesmartmag.com/manali",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/goa",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/kerala",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/dubai",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/japan",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/bali",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/maldives",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/switzerland",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/kashmir",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/ladakh",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://travel.thesmartmag.com/thailand",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-prop-firms`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews/fundedsquad`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews/equity-edge`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reviews/blue-guardian`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews/funded-trader-markets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews/atlas-funded`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews/aquafunded`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
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
