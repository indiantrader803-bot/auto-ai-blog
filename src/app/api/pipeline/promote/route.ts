import { NextResponse } from "next/server";
import {
  runPromotionAgent,
  runFleetPromotionAgent,
  dispatchSocialWebhook,
} from "@/lib/pipeline/agents/promotionAgent";
import {
  pingSearchEngines,
  auditAndRescueLowTrafficArticles,
} from "@/lib/pipeline/agents/trafficBoosterAgent";
import { getArticleBySlug, getAllCatalogArticles } from "@/lib/content/articles";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action, slug, topic, webhookUrl, platform, content, botToken, chatId } = body;

    // Action 1: Dispatch webhook to Discord, Telegram, or Slack
    if (action === "DISPATCH_WEBHOOK") {
      if (!webhookUrl && !(platform === "TELEGRAM" && botToken && chatId)) {
        return NextResponse.json(
          { error: "Missing webhook URL or Telegram credentials." },
          { status: 400 }
        );
      }

      const result = await dispatchSocialWebhook(
        webhookUrl || "",
        platform || "DISCORD",
        content || "Check out our latest tech deep dive!",
        botToken,
        chatId
      );

      return NextResponse.json(result);
    }

    // Action 2: Rapid Search Engine Pinging (Google, Bing, IndexNow)
    if (action === "INDEX_PING") {
      const results = await pingSearchEngines(slug ? [`https://auto-ai-blog-web.onrender.com/blog/${slug}`] : undefined);
      return NextResponse.json({
        success: true,
        message: "Search engine indexing ping dispatched to Google, Bing & IndexNow",
        results,
      });
    }

    // Action 3: Underperforming Article Traffic Rescue
    if (action === "RESCUE_TRAFFIC") {
      const report = await auditAndRescueLowTrafficArticles();
      return NextResponse.json({
        success: true,
        report,
      });
    }

    // Action 4: Fleet Autopilot Promotion (Promote ALL articles)
    if (action === "PROMOTE_ALL") {
      const catalog = getAllCatalogArticles();
      let dbPosts: any[] = [];
      try {
        dbPosts = await prisma.post.findMany({
          where: { status: "PUBLISHED" },
          include: { category: true, tags: { include: { tag: true } } },
        });
      } catch (_) {}

      const allInputs = [
        ...catalog.map((c) => ({
          title: c.title,
          excerpt: c.excerpt,
          slug: c.slug,
          category: c.category.name,
          tags: c.tags,
          content: c.content,
        })),
        ...dbPosts.map((p) => ({
          title: p.title,
          excerpt: p.excerpt,
          slug: p.slug,
          category: p.category?.name || "Technology",
          tags: p.tags.map((t: any) => t.tag.name),
          content: p.content,
        })),
      ];

      // De-duplicate by slug
      const uniqueInputs = Array.from(
        new Map(allInputs.map((item) => [item.slug, item])).values()
      );

      const fleetResult = await runFleetPromotionAgent(uniqueInputs);

      // Also ping search engines for all articles in fleet
      const indexingResults = await pingSearchEngines();

      return NextResponse.json({
        success: true,
        message: `Fleet promotion synthesized across ${fleetResult.processed} articles. Search engine pings dispatched.`,
        processed: fleetResult.processed,
        campaigns: fleetResult.campaigns,
        indexingResults,
      });
    }

    // Action 5: Generate Campaign for single article or custom topic
    let targetTitle = topic || "Modern Autonomous AI Systems in Production";
    let targetExcerpt = "Comprehensive latency and cost benchmarks from real-world deployments.";
    let targetSlug = slug || "autonomous-ai-agent-swarms-2026-enterprise-automation";
    let targetCategory = "Artificial Intelligence";
    let targetTags = ["AI", "Tech", "Engineering"];
    let targetContent = "";

    if (slug) {
      // 1. Check DB first
      try {
        const dbPost = await prisma.post.findUnique({
          where: { slug },
          include: { category: true, tags: { include: { tag: true } } },
        });

        if (dbPost) {
          targetTitle = dbPost.title;
          targetExcerpt = dbPost.excerpt;
          targetSlug = dbPost.slug;
          targetCategory = dbPost.category?.name || "Technology";
          targetTags = dbPost.tags.map((t) => t.tag.name);
          targetContent = dbPost.content;
        }
      } catch (_) {}

      // 2. Fallback to Catalog
      if (!targetContent) {
        const catalogPost = getArticleBySlug(slug);
        if (catalogPost) {
          targetTitle = catalogPost.title;
          targetExcerpt = catalogPost.excerpt;
          targetSlug = catalogPost.slug;
          targetCategory = catalogPost.category.name;
          targetTags = catalogPost.tags;
          targetContent = catalogPost.content;
        }
      }
    }

    const campaign = await runPromotionAgent({
      title: targetTitle,
      excerpt: targetExcerpt,
      slug: targetSlug,
      category: targetCategory,
      tags: targetTags,
      content: targetContent,
    });

    return NextResponse.json({
      success: true,
      campaign,
    });
  } catch (error: any) {
    console.error("Promotion API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate social campaign" },
      { status: 500 }
    );
  }
}
