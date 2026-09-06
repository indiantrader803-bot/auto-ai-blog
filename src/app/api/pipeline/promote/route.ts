import { NextResponse } from "next/server";
import { runPromotionAgent, dispatchSocialWebhook } from "@/lib/pipeline/agents/promotionAgent";
import { getArticleBySlug, getAllCatalogArticles } from "@/lib/content/articles";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, slug, topic, webhookUrl, platform, content, botToken, chatId } = body;

    // Action 1: Dispatch webhook
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

    // Action 2: Generate Campaign for an article or custom topic
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

