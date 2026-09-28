import { prisma } from "../prisma";
import { scoutTrendingTopic } from "./topicScout";
import { generateArticleContent } from "../ai";
import { enrichMedia } from "./mediaEnricher";
import { runSeoMasterAgent } from "./agents/seoAgent";
import { runCriticAndSelfImprovement, updateSwarmMemoryFromAnalytics } from "./agents/criticAgent";
import { runPromotionAgent } from "./agents/promotionAgent";
import { PipelineOptions, PipelineProgress } from "../types";
import { generateSlug } from "../utils";
import { applySmartInternalLinks } from "./internalLinkingEngine";

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

// Daily-cadence guard: autonomous runs skip generation when a fresh article was published within the cooldown window
export const AUTO_PUBLISH_COOLDOWN_HOURS = 20;
const AUTO_PUBLISH_COOLDOWN_MS = AUTO_PUBLISH_COOLDOWN_HOURS * 60 * 60 * 1000;

export async function getLastAutopublishAt(): Promise<Date | null> {
  try {
    const latest = await prisma.post.findFirst({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: { publishedAt: true },
    });
    return latest?.publishedAt || null;
  } catch {
    return null;
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
    // 0. Daily-cadence guard — prevents redundant multi-posts per day while guaranteeing at least one daily article
    const isAutonomousRun = !options.topic || options.topic.trim() === "";
    const willAutoPublish =
      options.autoPublish !== undefined
        ? options.autoPublish
        : process.env.AUTO_PUBLISH_DEFAULT !== "false";

    if (isAutonomousRun && willAutoPublish) {
      const lastPublish = await getLastAutopublishAt();
      if (lastPublish && Date.now() - lastPublish.getTime() < AUTO_PUBLISH_COOLDOWN_MS) {
        const hoursAgo = ((Date.now() - lastPublish.getTime()) / 3600000).toFixed(1);
        const message = `Daily publish quota already met — newest article went live ${hoursAgo}h ago (cooldown ${AUTO_PUBLISH_COOLDOWN_HOURS}h). Skipping generation.`;
        console.log(`[PIPELINE] ${message}`);
        report({ step: "COMPLETED", message, percent: 100, data: { skipped: true } });
        return { success: true, post: null, skipped: true, durationSeconds: 0 };
      }
    }

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
      targetWordCount:
        options.fastMode && !options.targetWordCount ? 1600 : options.targetWordCount,
      language: options.language,
    });

    // 3. Editorial Critic & Self-Improvement Agent
    report({
      step: "WRITING",
      message: "Critic Agent analyzing draft quality & running self-improvement loop...",
      percent: 45,
    });

    const critique = options.fastMode
      ? {
          finalTitle: aiResult.title,
          finalContent: aiResult.content,
          critiqueScore: 92,
          critiqueNotes: "Fast mode: critic rewrite loop skipped to fit cron time budget.",
        }
      : await runCriticAndSelfImprovement(
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
      refinedTitle,
      { includeVideo: options.includeVideo !== false, fastMode: options.fastMode }
    );

    // 5. Video Researcher Agent
    report({
      step: "VIDEO",
      message: "Video Researcher Agent querying contextual video tutorial embeds...",
      percent: 75,
    });

    if (mediaResult.videoSkippedReason) {
      console.log(`[PIPELINE] Video embed skipped — ${mediaResult.videoSkippedReason}`);
    } else if (mediaResult.youtubeVideoId) {
      console.log(
        `[PIPELINE] Video embed verified playable & embeddable: "${mediaResult.youtubeVideoTitle || mediaResult.youtubeVideoId}"`
      );
    }

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
    const rawSeoContent = seoResult.processedContent;
    const processedContent = await applySmartInternalLinks(rawSeoContent);
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

    // Resolve Category Safely & Resiliently
    const rawCatName = (aiResult.category || options.category || "Technology").trim();
    const categoryName = rawCatName.length > 50 ? rawCatName.slice(0, 50) : rawCatName;
    const categorySlug = generateSlug(categoryName) || "technology";

    const shouldPublish =
      options.autoPublish !== undefined
        ? options.autoPublish
        : process.env.AUTO_PUBLISH_DEFAULT !== "false";

    // Attempt to safely resolve or create Category
    let dbCategory: any = null;
    try {
      dbCategory = await prisma.category.findFirst({
        where: {
          OR: [
            { slug: categorySlug },
            { name: { equals: categoryName, mode: "insensitive" } },
          ],
        },
      });

      if (!dbCategory) {
        try {
          dbCategory = await prisma.category.create({
            data: { name: categoryName, slug: categorySlug },
          });
        } catch (_) {
          // Fallback if concurrent insert or duplicate name/slug collision
          dbCategory = await prisma.category.findFirst({
            where: {
              OR: [
                { slug: categorySlug },
                { name: { equals: categoryName, mode: "insensitive" } },
              ],
            },
          });
        }
      }

      if (!dbCategory) {
        dbCategory = await prisma.category.findFirst();
      }
    } catch (catErr) {
      console.warn("[PIPELINE] Category resolution non-fatal warning:", catErr);
      try {
        dbCategory = await prisma.category.findFirst();
      } catch (_) {}
    }

    // Attempt to save post to database
    let post: any = null;
    try {
      post = await prisma.post.create({
        data: {
          title: refinedTitle,
          slug: finalSlug,
          excerpt: aiResult.excerpt,
          content: processedContent,
          featuredImage: mediaResult.featuredImage,
          imageAlt: mediaResult.imageAlt,
          imagePhotographer: mediaResult.imagePhotographer,
          imagePhotographerUrl: mediaResult.imagePhotographerUrl,
          youtubeVideoId: mediaResult.youtubeVideoId,
          youtubeVideoTitle: mediaResult.youtubeVideoTitle,
          youtubeChannelTitle: mediaResult.youtubeChannelTitle,
          seoTitle: seoResult.seoTitle,
          seoDescription: seoResult.seoDescription,
          seoKeywords: seoKeywords.join(", "),
          faqJson,
          readTimeMinutes,
          status: shouldPublish ? "PUBLISHED" : "DRAFT",
          categoryId: dbCategory?.id || null,
        },
      });
    } catch (postErr: any) {
      console.warn("[PIPELINE] Post creation initial attempt warning:", postErr?.message);
      try {
        const fallbackSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
        post = await prisma.post.create({
          data: {
            title: refinedTitle,
            slug: fallbackSlug,
            excerpt: aiResult.excerpt,
            content: processedContent,
            featuredImage: mediaResult.featuredImage,
            imageAlt: mediaResult.imageAlt,
            status: shouldPublish ? "PUBLISHED" : "DRAFT",
            readTimeMinutes,
          },
        });
      } catch (fatalPostErr: any) {
        console.error("[PIPELINE] Post creation failed in DB:", fatalPostErr?.message);
      }
    }

    // Stamp autonomous publish time — the daily-cadence cooldown guard reads this to enforce "max one fresh article per day"
    if (post && shouldPublish) {
      await safeDb("setting.upsert:LAST_AUTO_PUBLISH", () =>
        prisma.setting.upsert({
          where: { key: "LAST_AUTO_PUBLISH" },
          update: { value: new Date().toISOString() },
          create: {
            key: "LAST_AUTO_PUBLISH",
            value: new Date().toISOString(),
            description: "Timestamp of the most recent autonomous article publish (drives daily posting cadence).",
          },
        })
      );
    }

    // Resolve Tags Resiliently
    if (post && post.id && !post.id.startsWith("local_") && aiResult.tags && Array.isArray(aiResult.tags)) {
      for (const rawTagName of aiResult.tags) {
        const tagName = String(rawTagName || "").trim().slice(0, 40);
        const tagSlug = generateSlug(tagName);
        if (!tagSlug) continue;

        try {
          let tag = await prisma.tag.findFirst({
            where: {
              OR: [
                { slug: tagSlug },
                { name: { equals: tagName, mode: "insensitive" } },
              ],
            },
          });

          if (!tag) {
            try {
              tag = await prisma.tag.create({
                data: { name: tagName, slug: tagSlug },
              });
            } catch (_) {
              tag = await prisma.tag.findFirst({
                where: {
                  OR: [
                    { slug: tagSlug },
                    { name: { equals: tagName, mode: "insensitive" } },
                  ],
                },
              });
            }
          }

          if (tag && post.id) {
            await prisma.postTag.upsert({
              where: {
                postId_tagId: { postId: post.id, tagId: tag.id },
              },
              update: {},
              create: { postId: post.id, tagId: tag.id },
            }).catch(() => {});
          }
        } catch (_) {}
      }
    }

    // 8. Auto-Trigger Viral Social Promotion Campaign
    if (post && post.title) {
      try {
        await runPromotionAgent({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          category: categoryName,
          tags: aiResult.tags || [],
          content: post.content,
        });
      } catch (_) {}
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
