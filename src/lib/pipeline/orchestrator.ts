import { prisma } from "../prisma";
import { scoutTrendingTopic } from "./topicScout";
import { generateArticleContent } from "../ai";
import { enrichMedia } from "./mediaEnricher";
import { enrichSeoAndAffiliates } from "./seoAffiliateEngine";
import { runCriticAndSelfImprovement, updateSwarmMemoryFromAnalytics } from "./agents/criticAgent";
import { PipelineOptions, PipelineProgress } from "../types";
import { generateSlug } from "../utils";

export async function runBlogPipeline(
  options: PipelineOptions = {},
  onProgress?: (progress: PipelineProgress) => void
) {
  const startTime = Date.now();
  let logId = "";

  const report = (progress: PipelineProgress) => {
    if (onProgress) onProgress(progress);
  };

  try {
    // 1. Trend Scout Agent
    report({
      step: "SCOUTING",
      message: "Scout Agent scouting trending topics from Google Trends & RSS...",
      percent: 10,
    });

    let targetTopic = options.topic;
    let topicCategory = options.category;

    if (!targetTopic || targetTopic.trim() === "") {
      const scoutResult = await scoutTrendingTopic(options.niche);
      targetTopic = scoutResult.topic;
      if (!topicCategory) topicCategory = scoutResult.suggestedCategory;
    }

    // Create DB generation log record
    const log = await prisma.generationLog.create({
      data: {
        topic: targetTopic,
        status: "RUNNING",
        currentStep: "SCOUTING",
        details: JSON.stringify({ topic: targetTopic, options }),
      },
    });
    logId = log.id;

    // 2. Writer Agent
    report({
      step: "WRITING",
      message: `Writer Agent drafting comprehensive SEO article for "${targetTopic}"...`,
      percent: 25,
    });

    await prisma.generationLog.update({
      where: { id: logId },
      data: { currentStep: "WRITING" },
    });

    const aiResult = await generateArticleContent({
      topic: targetTopic,
      niche: options.niche,
      category: topicCategory || options.category,
      tone: options.tone,
      targetWordCount: options.targetWordCount,
      language: options.language,
    });

    // 3. Editorial Critic & Self-Improvement Agent
    report({
      step: "WRITING",
      message: "Critic Agent analyzing draft quality & running self-improvement loop...",
      percent: 45,
    });

    const critique = await runCriticAndSelfImprovement(
      targetTopic,
      aiResult.title,
      aiResult.content
    );

    const refinedTitle = critique.finalTitle || aiResult.title;
    const refinedContent = critique.finalContent || aiResult.content;

    // 4. Art Director & Media Enrichment Agent
    report({
      step: "MEDIA",
      message: "Art Director Agent fetching HD cover visuals & generating AI art...",
      percent: 60,
    });

    await prisma.generationLog.update({
      where: { id: logId },
      data: { currentStep: "MEDIA" },
    });

    const mediaResult = await enrichMedia(
      aiResult.suggestedImageQuery || targetTopic,
      aiResult.suggestedVideoQuery || `${targetTopic} tutorial`,
      refinedTitle
    );

    // 5. Video Researcher Agent
    report({
      step: "VIDEO",
      message: "Video Researcher Agent querying contextual video tutorial embeds...",
      percent: 75,
    });

    await prisma.generationLog.update({
      where: { id: logId },
      data: { currentStep: "VIDEO" },
    });

    // 6. Monetization & SEO Agent
    report({
      step: "SEO",
      message: "Monetization Agent injecting FAQ schemas & affiliate links...",
      percent: 88,
    });

    await prisma.generationLog.update({
      where: { id: logId },
      data: { currentStep: "SEO" },
    });

    const {
      processedContent,
      slug: baseSlug,
      readTimeMinutes,
      faqJson,
      seoKeywords,
    } = enrichSeoAndAffiliates(
      refinedContent,
      refinedTitle,
      aiResult.category,
      aiResult.tags,
      aiResult.faq,
      options.affiliateKeywords
    );

    // Ensure unique slug
    let finalSlug = baseSlug;
    const existingSlug = await prisma.post.findUnique({
      where: { slug: finalSlug },
    });
    if (existingSlug) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    // 6. Database Publishing Step
    report({
      step: "PUBLISHING",
      message: "Saving article and linking categories & tags...",
      percent: 95,
    });

    await prisma.generationLog.update({
      where: { id: logId },
      data: { currentStep: "PUBLISHING" },
    });

    // Resolve Category
    const categoryName = aiResult.category || options.category || "Technology";
    const categorySlug = generateSlug(categoryName);
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        name: categoryName,
        slug: categorySlug,
      },
    });

    // Determine status
    const shouldPublish =
      options.autoPublish !== undefined
        ? options.autoPublish
        : process.env.AUTO_PUBLISH_DEFAULT !== "false";

    const post = await prisma.post.create({
      data: {
        title: aiResult.title,
        slug: finalSlug,
        excerpt: aiResult.excerpt,
        content: processedContent,
        featuredImage: mediaResult.featuredImage,
        imageAlt: mediaResult.imageAlt,
        imagePhotographer: mediaResult.imagePhotographer,
        imagePhotographerUrl: mediaResult.imagePhotographerUrl,
        youtubeVideoId: mediaResult.youtubeVideoId,
        youtubeVideoTitle: mediaResult.youtubeVideoTitle,
        seoTitle: aiResult.seoTitle,
        seoDescription: aiResult.seoDescription,
        seoKeywords: seoKeywords.join(", "),
        faqJson,
        readTimeMinutes,
        status: shouldPublish ? "PUBLISHED" : "DRAFT",
        categoryId: category.id,
      },
    });

    // Resolve Tags
    if (aiResult.tags && Array.isArray(aiResult.tags)) {
      for (const tagName of aiResult.tags) {
        const tagSlug = generateSlug(tagName);
        if (!tagSlug) continue;
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: {
            name: tagName,
            slug: tagSlug,
          },
        });

        await prisma.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id,
          },
        });
      }
    }

    const durationSeconds = (Date.now() - startTime) / 1000;

    await prisma.generationLog.update({
      where: { id: logId },
      data: {
        status: "SUCCESS",
        currentStep: "COMPLETED",
        postId: post.id,
        durationSeconds,
      },
    });

    // Update Swarm Memory from historical analytics
    await updateSwarmMemoryFromAnalytics();

    report({
      step: "COMPLETED",
      message: `Successfully generated and published "${post.title}" in ${durationSeconds.toFixed(1)}s!`,
      percent: 100,
      data: { post },
    });

    return {
      success: true,
      post,
      durationSeconds,
    };
  } catch (error: any) {
    console.error("Pipeline run failed:", error);
    const durationSeconds = (Date.now() - startTime) / 1000;

    if (logId) {
      await prisma.generationLog.update({
        where: { id: logId },
        data: {
          status: "FAILED",
          currentStep: "FAILED",
          error: error.message || String(error),
          durationSeconds,
        },
      });
    }

    report({
      step: "FAILED",
      message: `Generation error: ${error.message}`,
      percent: 100,
      data: { error: error.message },
    });

    return {
      success: false,
      error: error.message,
    };
  }
}
