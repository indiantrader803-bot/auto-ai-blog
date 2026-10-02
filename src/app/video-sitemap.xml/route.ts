import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com"
  ).replace(/\/$/, "");

  let postsWithVideos: any[] = [];
  try {
    postsWithVideos = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        youtubeVideoId: { not: null },
      },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        youtubeVideoId: true,
        youtubeVideoTitle: true,
        category: {
          select: { name: true },
        },
      },
      orderBy: { publishedAt: "desc" },
      take: 200,
    });
  } catch (err: any) {
    console.warn("Video sitemap DB query notice:", err?.message);
  }

  function escapeXml(unsafe: string): string {
    return (unsafe || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  const urlEntries = postsWithVideos
    .filter((p) => p.youtubeVideoId && p.youtubeVideoId.trim().length > 0)
    .map((p) => {
      const videoId = p.youtubeVideoId.trim();
      const videoTitle = p.youtubeVideoTitle || p.title;
      const videoDescription = p.excerpt || p.title;
      const pubDate = (p.publishedAt || new Date()).toISOString();
      const pageUrl = `${baseUrl}/blog/${p.slug}`;
      const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      return `  <url>
    <loc>${pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${escapeXml(videoTitle)}</video:title>
      <video:description>${escapeXml(videoDescription)}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${videoId}</video:content_loc>
      <video:player_loc allow_embed="yes" autoplay="ap=1">${embedUrl}</video:player_loc>
      <video:publication_date>${pubDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
