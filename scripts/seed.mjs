import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with initial categories, settings, and sample deep-dive articles...");

  // 1. Categories
  const categories = [
    {
      name: "Artificial Intelligence",
      slug: "artificial-intelligence",
      description: "Cutting-edge breakthroughs in LLMs, Autonomous Multi-Agent Swarms, and Computer Vision.",
      color: "#6366f1",
    },
    {
      name: "Development & Engineering",
      slug: "development-and-engineering",
      description: "Full-stack architectures, TypeScript, Next.js, and cloud-native software design patterns.",
      color: "#3b82f6",
    },
    {
      name: "Finance & Markets",
      slug: "finance-and-markets",
      description: "Algorithmic trading, crypto market structure, and AI-driven wealth generation strategies.",
      color: "#10b981",
    },
    {
      name: "Technology",
      slug: "technology",
      description: "Emerging consumer hardware, quantum computing, cybersecurity, and future trends.",
      color: "#f59e0b",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // 2. Fetch created categories
  const aiCat = await prisma.category.findUnique({ where: { slug: "artificial-intelligence" } });
  const devCat = await prisma.category.findUnique({ where: { slug: "development-and-engineering" } });
  const finCat = await prisma.category.findUnique({ where: { slug: "finance-and-markets" } });

  // 3. Sample High-Quality Posts
  const samplePosts = [
    {
      title: "The Agentic Revolution: How Autonomous AI Swarms Are Rewriting Software Engineering",
      slug: "the-agentic-revolution-autonomous-ai-swarms",
      excerpt: "An in-depth architectural breakdown of how multi-agent LLM systems are transitioning from passive chat assistants to proactive, self-healing developer workforces.",
      content: `## The Shift from Chatbots to Autonomous Co-Workers

The paradigm of Artificial Intelligence in software engineering has shifted permanently. While 2023 was the year of conversational code assistance, **2025 marks the era of autonomous agentic swarms**.

Rather than developers prompting an LLM line-by-line, modern multi-agent systems operate hierarchically: a Lead Architect agent decomposes a user specification, assigns modules to Specialized Worker agents (Frontend, Backend, Database), and dispatches a QA agent to execute test suites and repair build failures autonomously.

---

## 🏛️ Modern Multi-Agent Architecture

The fundamental blueprint of an enterprise agentic loop consists of four interconnected layers:

1. **Perception & State Ingestion**: Context-window indexing using AST (Abstract Syntax Tree) embeddings.
2. **Cognitive Planning**: Tree-of-Thought (ToT) exploration evaluating potential code mutations against linting rules.
3. **Tool & MCP Protocol Execution**: Direct sandboxed file system reads, terminal execution, and API calls.
4. **Verification & Self-Correction**: Dynamic runtime testing with automated rollbacks upon failure.

\`\`\`typescript
// Architectural representation of a Self-Healing Agent Task Runner
interface AgentWorkflow {
  plan: PlanStep[];
  executeStep: (step: PlanStep) => Promise<StepResult>;
  verifyResult: (result: StepResult) => Promise<boolean>;
  repairOnFailure: (error: Error) => Promise<void>;
}
\`\`\`

---

## 📊 Comparison: Monolithic Assistants vs. Multi-Agent Swarms

| Feature | Legacy Code Assistant | Autonomous Agent Swarm |
| :--- | :--- | :--- |
| **Context Window Scope** | Single File (~8k tokens) | Repository-Wide AST Graph |
| **Execution Capability** | Read / Suggest Only | Terminal, Git, & Browser Automation |
| **Error Handling** | Human must debug | Autonomous Test & Repair Loop |
| **Velocity Multiplier** | 1.2x - 1.5x | 4.0x - 8.0x |

---

## 💡 Practical Recommendations for Engineering Teams

- **Adopt MCP (Model Context Protocol)**: Standardize your tools and database connections so any agent can interface with them securely.
- **Implement Strict Guardrails**: Never allow agents write access to production branches without automated staging verification.
- **Instrument Observability**: Log agent token consumption and decision trees to maintain architectural transparency.

---

## Conclusion

Autonomous AI swarms do not replace developers; they elevate them into engineering directors orchestrating high-velocity digital teams.`,
      featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Futuristic digital neural network node visualization",
      imagePhotographer: "Milad Fakurian",
      imagePhotographerUrl: "https://unsplash.com/@fakurian",
      youtubeVideoId: "sal78ACtGTc",
      youtubeVideoTitle: "What Are Autonomous AI Agents? Complete Breakdown",
      seoTitle: "The Agentic Revolution: Autonomous AI Swarms in 2025",
      seoDescription: "Discover how autonomous AI swarms are revolutionizing software development with self-healing code loops and multi-agent systems.",
      seoKeywords: "autonomous AI, agentic workflows, multi-agent systems, AI programming, software engineering 2025",
      faqJson: JSON.stringify([
        {
          question: "What is an autonomous AI agent?",
          answer: "An autonomous AI agent is a software program powered by LLMs capable of perceiving its environment, reasoning, making decisions, and using tools to achieve goals with minimal human supervision."
        },
        {
          question: "How do agent swarms differ from ChatGPT or Copilot?",
          answer: "While chat assistants require continuous manual prompts, swarms work collaboratively in background loops to decompose complex multi-file projects, test outputs, and fix errors automatically."
        },
        {
          question: "What are the best frameworks to build AI agents?",
          answer: "Popular modern frameworks include LangChain, CrewAI, AutoGen, and Google Antigravity SDK."
        }
      ]),
      readTimeMinutes: 7,
      status: "PUBLISHED",
      views: 1420,
      categoryId: aiCat?.id,
    },
    {
      title: "Building High-Throughput TypeScript Microservices with Next.js 14 and Edge Workers",
      slug: "building-high-throughput-typescript-microservices",
      excerpt: "Discover modern architectural blueprints for sub-10ms global latency, edge data caching, and frictionless serverless deployment.",
      content: `## Why Edge Computing is Transforming Microservices

Modern web applications demand near-instantaneous response times regardless of global user geography. Moving business logic to Edge runtime environments allows requests to terminate at the nearest Cloudflare or Vercel PoP (Point of Presence).

---

## 🚀 Key Architectural Advantages

- **Zero Cold Starts**: Lightweight V8 isolates eliminate conventional container boot latency.
- **Global Data Proximity**: Replicating read-heavy workloads closer to edge users.
- **Atomic Reliability**: Graceful degradation with fallback origin servers.

### Sample Edge Cache Invalidation Pattern
\`\`\`typescript
export const runtime = "edge";

export async function GET(request: Request) {
  const data = await fetch("https://api.upstream.internal/feed", {
    next: { revalidate: 3600, tags: ["global-feed"] },
  });
  return Response.json(await data.json());
}
\`\`\`

---

## Summary & Next Steps

Adopting edge-first compute architectures enables software teams to scale seamlessly without provisioning bloated virtual machines.`,
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Computer programming code screen setup",
      imagePhotographer: "Fotis Fotopoulos",
      imagePhotographerUrl: "https://unsplash.com/@ffstop",
      youtubeVideoId: "843nec-IvW0",
      youtubeVideoTitle: "Next.js 14 Full Course - Build Modern Web Apps",
      seoTitle: "High-Throughput TypeScript Microservices & Edge Guide",
      seoDescription: "Comprehensive blueprint for scaling Next.js and TypeScript microservices with edge workers and sub-10ms latency.",
      seoKeywords: "typescript, nextjs, edge computing, serverless microservices, cloud architecture",
      faqJson: JSON.stringify([
        {
          question: "What is an Edge Worker?",
          answer: "An edge worker is a serverless function that executes in lightweight V8 engine isolates deployed at data centers located close to end users worldwide."
        }
      ]),
      readTimeMinutes: 5,
      status: "PUBLISHED",
      views: 890,
      categoryId: devCat?.id,
    },
    {
      title: "Algorithmic Market Intelligence: Leveraging Generative Models for Real-Time Sentiment",
      slug: "algorithmic-market-intelligence-generative-sentiment",
      excerpt: "How quant funds and retail investors are deploying fine-tuned SLMs to parse earning transcripts, SEC filings, and macro shifts.",
      content: `## The Modern Quantitative Edge

Financial markets are information engines. The speed with which an investor can parse an earnings call, identify subtle executive tone divergences, and correlate them with historical guidance determines statistical alpha.

---

## 📈 The 3-Step NLP Financial Pipeline

1. **Ingestion & Audio-to-Text Transcription**: Converting streaming audio to clean text in sub-second latency.
2. **Contextual Entity Extraction**: Tagging ticker symbols, revenue guidance, and risk disclosures.
3. **Sentiment Vector Scoring**: Projecting extracted disclosures against macroeconomic indices.

> **Risk Disclosure**: Algorithmic models must always be combined with disciplined risk management and portfolio diversification.`,
      featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Stock market financial charts and analysis",
      imagePhotographer: "Maxim Hopman",
      imagePhotographerUrl: "https://unsplash.com/@hopman",
      seoTitle: "Algorithmic Market Intelligence & AI Sentiment Analysis",
      seoDescription: "How generative AI and NLP models analyze SEC filings and earnings calls for quantitative trading insights.",
      seoKeywords: "algorithmic trading, finance AI, sentiment analysis, quant strategies, financial markets",
      faqJson: JSON.stringify([
        {
          question: "How does AI analyze financial sentiment?",
          answer: "AI models parse textual transcripts and filings using transformer embeddings to quantify sentiment, confidence, and risk factors."
        }
      ]),
      readTimeMinutes: 6,
      status: "PUBLISHED",
      views: 640,
      categoryId: finCat?.id,
    }
  ];

  for (const postData of samplePosts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    });
  }

  // 4. Initial Settings
  const defaultSettings = [
    { key: "DEFAULT_NICHE", value: "Artificial Intelligence, Tech Gadgets & SaaS" },
    { key: "AUTO_PUBLISH_DEFAULT", value: "true" },
    { key: "POST_LANGUAGE", value: "English" },
    { key: "TARGET_WORD_COUNT", value: "1600" },
    { key: "CRON_SCHEDULE", value: "0 8 * * *" },
  ];

  for (const s of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
