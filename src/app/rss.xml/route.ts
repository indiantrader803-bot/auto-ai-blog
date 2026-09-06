import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export async function GET() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-orpin.vercel.app"
  ).replace(/\/$/, "");

  let dbPosts: any[] = [];
  try {
    dbPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 25,
      include: { category: true },
    });
  } catch (_) {}

  const catalog = getAllCatalogArticles();
  const seenSlugs = new Set<string>();
  const items: Array<{
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publishedAt: string;
  }> = [];

  for (const p of dbPosts) {
    seenSlugs.add(p.slug);
    items.push({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category?.name || "Technology",
      publishedAt: (p.publishedAt || new Date()).toUTCString(),
    });
  }

  for (const c of catalog) {
    if (!seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      items.push({
        title: c.title,
        slug: c.slug,
        excerpt: c.excerpt,
        category: c.category.name,
        publishedAt: new Date(c.publishedAt).toUTCString(),
      });
    }
  }

  const rssItemsXml = items
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${siteUrl}/blog/${item.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${item.slug}</guid>
      <description><![CDATA[${item.excerpt}]]></description>
      <category>${item.category}</category>
      <pubDate>${item.publishedAt}</pubDate>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SmartMag Tech Chronicle</title>
    <link>${siteUrl}</link>
    <description>Frontier Artificial Intelligence, Software Engineering &amp; Modern Innovation</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

