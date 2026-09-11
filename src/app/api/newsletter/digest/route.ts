import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let topPosts: any[] = [];
    let subscribers = 1420;

    try {
      const posts = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { views: "desc" },
        take: 5,
        select: {
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          publishedAt: true,
        },
      });
      if (posts && posts.length > 0) topPosts = posts;
      subscribers = (await prisma.newsletterSubscriber.count()) || subscribers;
    } catch (_) {
      const catalog = getAllCatalogArticles();
      topPosts = catalog.slice(0, 5).map((c) => ({
        title: c.title,
        slug: c.slug,
        excerpt: c.excerpt,
        featuredImage: c.featuredImage,
        publishedAt: c.publishedAt,
      }));
    }

    const emailSubject = `🚀 Top AI & Tech Breakthroughs This Week (${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })})`;
    const htmlPreview = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155; }
            .header { text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 24px; }
            .title { font-size: 24px; font-weight: 900; color: #818cf8; margin: 0; }
            .article { margin-bottom: 24px; border-bottom: 1px solid #334155; padding-bottom: 16px; }
            .article-title { font-size: 18px; font-weight: 700; color: #ffffff; text-decoration: none; }
            .article-excerpt { font-size: 14px; color: #94a3b8; margin-top: 8px; line-height: 1.5; }
            .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 32px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">SMARTMAG TECH WEEKLY DIGEST</h1>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Top Autonomous AI & Engineering Chronicle</p>
            </div>

            ${topPosts
              .map(
                (p) => `
              <div class="article">
                <a href="https://auto-ai-blog-web.onrender.com/blog/${p.slug}" class="article-title">${p.title}</a>
                <p class="article-excerpt">${p.excerpt}</p>
              </div>
            `
              )
              .join("")}

            <div class="footer">
              Sent to ${subscribers} SmartMag VIP subscribers. <br/>
              © ${new Date().getFullYear()} SmartMag Tech Chronicle. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    return NextResponse.json({
      subscribersCount: subscribers,
      subject: emailSubject,
      articles: topPosts,
      htmlPreview,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
