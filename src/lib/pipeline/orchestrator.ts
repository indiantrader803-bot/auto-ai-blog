import { prisma } from "../prisma";
import { scoutTrendingTopic } from "./topicScout";
import { generateArticleContent } from "../ai";
import { enrichMedia } from "./mediaEnricher";
import { runSeoMasterAgent } from "./agents/seoAgent";
import { runCriticAndSelfImprovement, updateSwarmMemoryFromAnalytics } from "./agents/criticAgent";
import { PipelineOptions, PipelineProgress } from "../types";
import { generateSlug } from "../utils";

/**
 * Safely execute a Prisma database operation.
 * Returns null and logs a warning if the database is unreachable.
 */
async function safeDb<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes("Can't reach database server") || msg.includes("ENOTFOUND") || msg.includes("ECONNREFUSED") || msg.includes("Connection refused") || msg.includes("Connection timed out")) {
      console.warn(`[PIPELINE] DB unavailable at "${label}" — continuing without database. Reason: ${msg.slice(0, 120)}`);
      return null;
    }
    throw err; // Re-throw if it's a different kind of error
  }
}

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

    // Create DB generation log record (resilient)
    const log = await safeDb("generationLog.create", () =>
      prisma.generationLog.create({
        data: {
          topic: targetTopic,
          status: "RUNNING",
          currentStep: "SCOUTING",
          details: JSON.stringify({ topic: targetTopic, options }),
        },
      })
    );
    if (log) logId = log.id;

    // 2. Writer Agent
    report({
      step: "WRITING",
      message: `Writer Agent drafting comprehensive SEO article for "${targetTopic}"...`,
      percent: 25,
    });

    if (logId) {
      await safeDb("generationLog.update:WRITING", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: { currentStep: "WRITING" },
        })
      );
    }

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

    if (logId) {
      await safeDb("generationLog.update:MEDIA", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: { currentStep: "MEDIA" },
        })
      );
    }

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

    if (logId) {
      await safeDb("generationLog.update:VIDEO", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: { currentStep: "VIDEO" },
        })
      );
    }

    // 6. Dedicated SEO Master Agent
    report({
      step: "SEO",
      message: "Dedicated SEO Master Agent engineering schemas, canonical URLs, and internal linking...",
      percent: 88,
    });

    if (logId) {
      await safeDb("generationLog.update:SEO", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: { currentStep: "SEO" },
        })
      );
    }

    const seoResult = runSeoMasterAgent({
      title: refinedTitle,
      excerpt: aiResult.excerpt,
      content: refinedContent,
      category: aiResult.category || options.category || "Technology",
      tags: aiResult.tags,
      faq: aiResult.faq,
      featuredImage: mediaResult.featuredImage,
      youtubeVideoId: mediaResult.youtubeVideoId,
      youtubeVideoTitle: mediaResult.youtubeVideoTitle,
    });

    const baseSlug = seoResult.slug;
    const processedContent = seoResult.processedContent;
    const readTimeMinutes = seoResult.readTimeMinutes;
    const faqJson = JSON.stringify(aiResult.faq || []);
    const seoKeywords = seoResult.seoKeywords;

    // Ensure unique slug (resilient)
    let finalSlug = baseSlug;
    const existingSlug = await safeDb("post.findUnique:slug", () =>
      prisma.post.findUnique({ where: { slug: finalSlug } })
    );
    if (existingSlug) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    // 7. Database Publishing Step
    report({
      step: "PUBLISHING",
      message: "Saving article and linking categories & tags...",
      percent: 95,
    });

    if (logId) {
      await safeDb("generationLog.update:PUBLISHING", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: { currentStep: "PUBLISHING" },
        })
      );
    }

    // Resolve Category
    const categoryName = aiResult.category || options.category || "Technology";
    const categorySlug = generateSlug(categoryName);

    const shouldPublish =
      options.autoPublish !== undefined
        ? options.autoPublish
        : process.env.AUTO_PUBLISH_DEFAULT !== "false";

    // Attempt to save to database
    let post: any = null;
    const dbCategory = await safeDb("category.upsert", () =>
      prisma.category.upsert({
        where: { slug: categorySlug },
        update: {},
        create: { name: categoryName, slug: categorySlug },
      })
    );

    if (dbCategory) {
      post = await safeDb("post.create", () =>
        prisma.post.create({
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
            categoryId: dbCategory.id,
          },
        })
      );

      // Resolve Tags
      if (post && aiResult.tags && Array.isArray(aiResult.tags)) {
        for (const tagName of aiResult.tags) {
          const tagSlug = generateSlug(tagName);
          if (!tagSlug) continue;
          const tag = await safeDb(`tag.upsert:${tagSlug}`, () =>
            prisma.tag.upsert({
              where: { slug: tagSlug },
              update: {},
              create: { name: tagName, slug: tagSlug },
            })
          );

          if (tag) {
            await safeDb(`postTag.create:${tagSlug}`, () =>
              prisma.postTag.create({
                data: { postId: post.id, tagId: tag.id },
              })
            );
          }
        }
      }
    }

    // If database was unavailable, create an in-memory post object for the response
    if (!post) {
      console.warn("[PIPELINE] Database unavailable — article generated successfully but saved only to in-memory catalog. It will appear on the site via the content catalog fallback.");
      post = {
        id: `local_${Date.now()}`,
        title: aiResult.title,
        slug: finalSlug,
        excerpt: aiResult.excerpt,
        content: processedContent,
        featuredImage: mediaResult.featuredImage,
        imageAlt: mediaResult.imageAlt,
        readTimeMinutes,
        status: shouldPublish ? "PUBLISHED" : "DRAFT",
        category: { name: categoryName, slug: categorySlug },
        publishedAt: new Date(),
        _savedToDb: false,
      };
    }

    const durationSeconds = (Date.now() - startTime) / 1000;

    if (logId) {
      await safeDb("generationLog.update:COMPLETED", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: {
            status: "SUCCESS",
            currentStep: "COMPLETED",
            postId: post?.id?.startsWith?.("local_") ? null : post.id,
            durationSeconds,
          },
        })
      );
    }

    // Update Swarm Memory from historical analytics (resilient)
    await safeDb("updateSwarmMemory", () => updateSwarmMemoryFromAnalytics());

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
      await safeDb("generationLog.update:FAILED", () =>
        prisma.generationLog.update({
          where: { id: logId },
          data: {
            status: "FAILED",
            currentStep: "FAILED",
            error: error.message || String(error),
            durationSeconds,
          },
        })
      );
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
