import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Parser from "rss-parser";
import slugify from "slugify";

const prisma = new PrismaClient();
const rssParser = new Parser({ timeout: 8000 });

async function main() {
  console.log("==========================================");
  console.log("🤖 AUTO AI BLOG GENERATOR - CLI WORKER");
  console.log("==========================================");

  const startTime = Date.now();

  // 1. Topic Scouting
  console.log("🔍 [1/5] Scouting trending topics...");
  let targetTopic = process.env.CUSTOM_TOPIC || "";
  let categoryName = "Artificial Intelligence";

  if (!targetTopic) {
    try {
      const feed = await rssParser.parseURL("https://trends.google.com/trends/trendingsearches/daily/rss?geo=US");
      if (feed.items && feed.items.length > 0) {
        targetTopic = feed.items[0].title || "";
      }
    } catch (e) {
      console.log("Google trends RSS fallback...");
    }
  }

  if (!targetTopic) {
    targetTopic = "Autonomous AI Agents and the Future of Software Development";
  }

  console.log(`🎯 Target Topic: "${targetTopic}"`);

  // 2. Article Generation
  console.log("✍️ [2/5] Writing comprehensive SEO long-form article...");
  const apiKey = process.env.GEMINI_API_KEY;

  let article = {
    title: `The 2025 Deep Dive: ${targetTopic}`,
    excerpt: `An exhaustive analysis of ${targetTopic}, breaking down core architectural shifts, practical benchmarks, and what developers need to know next.`,
    content: `## Executive Overview\n\nIn the modern technology landscape, **${targetTopic}** has transformed from an experimental concept into a foundational catalyst for software systems.\n\n### Core Pillars\n- **High Throughput**: Instant parallel processing.\n- **Algorithmic Accuracy**: Lower hallucination and greater precision.\n- **Automated Workflows**: Frictionless CI/CD operations.\n\n## Implementation Architecture\n\nWhen deploying modern solutions around ${targetTopic}, adhering to modular microservice design is critical.`,
    category: categoryName,
    tags: ["AI", "Innovation", "Engineering", "Technology"],
    seoTitle: `${targetTopic}: Complete 2025 Guide`,
    seoDescription: `Learn the essential trends, breakthroughs, and strategies behind ${targetTopic}.`,
    faq: [
      {
        question: `Why is ${targetTopic} critical right now?`,
        answer: `It automates complex workflows and accelerates operational velocity exponentially.`
      }
    ],
    suggestedImageQuery: `${targetTopic} technology abstract`,
    suggestedVideoQuery: `${targetTopic} explained`
  };

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });
      const prompt = `Write a 1500+ word comprehensive SEO blog article in JSON format for: "${targetTopic}".
Schema: {"title": "string", "excerpt": "string", "content": "string in markdown", "category": "string", "tags": ["string"], "seoTitle": "string", "seoDescription": "string", "faq": [{"question": "string", "answer": "string"}], "suggestedImageQuery": "string", "suggestedVideoQuery": "string"}`;
      
      const res = await model.generateContent(prompt);
      const parsed = JSON.parse(res.response.text());
      article = { ...article, ...parsed };
      console.log("✅ Successfully generated article using Gemini API!");
    } catch (err) {
      console.warn("Gemini API call failed, using high-quality structured template:", err.message);
    }
  }

  // 3. Media
  console.log("🖼️ [3/5] Enriching with high-res media...");
  const promptImage = `modern high tech digital illustration 4k wallpaper of ${article.suggestedImageQuery || targetTopic}`;
  const featuredImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptImage)}?width=1200&height=675&nologo=true`;

  // 4. Slug & Category
  console.log("🏷️ [4/5] Resolving SEO slugs & taxonomy...");
  const baseSlug = slugify(article.title, { lower: true, strict: true }) || "ai-article";
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  const categorySlug = slugify(article.category || "Artificial Intelligence", { lower: true, strict: true });

  const category = await prisma.category.upsert({
    where: { slug: categorySlug },
    update: {},
    create: {
      name: article.category || "Artificial Intelligence",
      slug: categorySlug,
    },
  });

  // 5. Publish to Database
  console.log("🚀 [5/5] Indexing & publishing to database...");
  const post = await prisma.post.create({
    data: {
      title: article.title,
      slug,
      excerpt: article.excerpt,
      content: article.content,
      featuredImage,
      imageAlt: `${article.title} visual`,
      imagePhotographer: "AI Synthesized Visual",
      imagePhotographerUrl: "https://pollinations.ai",
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      seoKeywords: article.tags?.join(", ") || "AI, Tech",
      faqJson: JSON.stringify(article.faq || []),
      readTimeMinutes: Math.max(1, Math.ceil(article.content.split(/\s+/).length / 220)),
      status: "PUBLISHED",
      categoryId: category.id,
    },
  });

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("==========================================");
  console.log(`🎉 SUCCESS: Published "${post.title}" in ${duration}s!`);
  console.log(`🔗 Slug: /blog/${post.slug}`);
  console.log("==========================================");
}

main()
  .catch((e) => {
    console.error("CLI Execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
