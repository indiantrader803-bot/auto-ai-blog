import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Create Tables via Raw SQL if not exist
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Category" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "slug" TEXT NOT NULL,
          "description" TEXT,
          "color" TEXT NOT NULL DEFAULT '#6366f1',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name");
      CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");

      CREATE TABLE IF NOT EXISTS "Post" (
          "id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "slug" TEXT NOT NULL,
          "excerpt" TEXT NOT NULL,
          "content" TEXT NOT NULL,
          "featuredImage" TEXT,
          "imageAlt" TEXT,
          "imagePhotographer" TEXT,
          "imagePhotographerUrl" TEXT,
          "youtubeVideoId" TEXT,
          "youtubeVideoTitle" TEXT,
          "seoTitle" TEXT,
          "seoDescription" TEXT,
          "seoKeywords" TEXT,
          "faqJson" TEXT,
          "readTimeMinutes" INTEGER NOT NULL DEFAULT 5,
          "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
          "views" INTEGER NOT NULL DEFAULT 0,
          "shares" INTEGER NOT NULL DEFAULT 0,
          "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "categoryId" TEXT,
          CONSTRAINT "Post_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug");

      CREATE TABLE IF NOT EXISTS "Tag" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "slug" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name");
      CREATE UNIQUE INDEX IF NOT EXISTS "Tag_slug_key" ON "Tag"("slug");

      CREATE TABLE IF NOT EXISTS "PostTag" (
          "postId" TEXT NOT NULL,
          "tagId" TEXT NOT NULL,
          CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postId","tagId"),
          CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "GenerationLog" (
          "id" TEXT NOT NULL,
          "topic" TEXT NOT NULL,
          "status" TEXT NOT NULL,
          "currentStep" TEXT NOT NULL,
          "details" TEXT,
          "error" TEXT,
          "durationSeconds" DOUBLE PRECISION NOT NULL DEFAULT 0,
          "postId" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "GenerationLog_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "GenerationLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Setting" (
          "id" TEXT NOT NULL,
          "key" TEXT NOT NULL,
          "value" TEXT NOT NULL,
          "description" TEXT,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "Setting_key_key" ON "Setting"("key");

      CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
          "id" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'ACTIVE',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

      CREATE TABLE IF NOT EXISTS "AnalyticsEvent" (
          "id" TEXT NOT NULL,
          "eventType" TEXT NOT NULL,
          "slug" TEXT,
          "referrer" TEXT,
          "ipHash" TEXT,
          "metadata" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
      );
    `);

    // 2. Seed Initial Categories
    const categories = [
      { name: "Artificial Intelligence", slug: "artificial-intelligence", description: "Breakthroughs in LLMs, Autonomous Agents & Vision." },
      { name: "Development & Engineering", slug: "development-and-engineering", description: "Full-stack architectures & cloud patterns." },
      { name: "Finance & Markets", slug: "finance-and-markets", description: "Quantitative intelligence and financial models." },
      { name: "Technology", slug: "technology", description: "Modern gadgets, hardware, and cybersecurity." },
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }

    const aiCat = await prisma.category.findUnique({ where: { slug: "artificial-intelligence" } });

    // 3. Seed Sample Featured Post
    await prisma.post.upsert({
      where: { slug: "the-agentic-revolution-autonomous-ai-swarms" },
      update: {},
      create: {
        title: "The Agentic Revolution: How Autonomous AI Swarms Are Rewriting Software Engineering",
        slug: "the-agentic-revolution-autonomous-ai-swarms",
        excerpt: "An in-depth architectural breakdown of how multi-agent LLM systems are transitioning from passive chat assistants to proactive, self-healing developer workforces.",
        content: `## The Shift from Chatbots to Autonomous Co-Workers\n\nThe paradigm of Artificial Intelligence in software engineering has shifted permanently. While 2023 was the year of conversational code assistance, **2025 marks the era of autonomous agentic swarms**.\n\nRather than developers prompting an LLM line-by-line, modern multi-agent systems operate hierarchically: a Lead Architect agent decomposes a user specification, assigns modules to Specialized Worker agents, and dispatches a QA agent to execute test suites autonomously.\n\n---\n\n## 🏛️ Modern Multi-Agent Architecture\n\n1. **Perception & State Ingestion**: Context-window indexing using AST embeddings.\n2. **Cognitive Planning**: Tree-of-Thought exploration evaluating potential code mutations.\n3. **Tool & MCP Execution**: Direct sandboxed file system reads and API calls.\n4. **Verification & Self-Correction**: Dynamic runtime testing with automated rollbacks.\n\n---\n\n## Conclusion\n\nAutonomous AI swarms do not replace developers; they elevate them into engineering directors orchestrating high-velocity digital teams.`,
        featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        imageAlt: "Futuristic digital neural network node visualization",
        imagePhotographer: "Milad Fakurian",
        imagePhotographerUrl: "https://unsplash.com/@fakurian",
        youtubeVideoId: "sal78ACtGTc",
        youtubeVideoTitle: "What Are Autonomous AI Agents? Complete Breakdown",
        seoTitle: "The Agentic Revolution: Autonomous AI Swarms in 2025",
        seoDescription: "Discover how autonomous AI swarms are revolutionizing software development.",
        seoKeywords: "autonomous AI, agentic workflows, multi-agent systems, AI programming",
        faqJson: JSON.stringify([
          { question: "What is an autonomous AI agent?", answer: "An autonomous AI agent is software powered by LLMs capable of perceiving, reasoning, and using tools with minimal supervision." }
        ]),
        readTimeMinutes: 6,
        status: "PUBLISHED",
        views: 1240,
        categoryId: aiCat?.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Database tables initialized and seeded successfully!",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
