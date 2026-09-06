import Parser from "rss-parser";

const parser = new Parser({
  timeout: 8000,
});

const DEFAULT_NICHE_TOPICS = [
  "Agentic AI Workflows and Autonomous Coding Systems",
  "Next-Generation Small Language Models (SLMs) for Edge Devices",
  "AI Search Engines vs Traditional SEO: How Traffic is Shifting",
  "High-Yield Passive Income Strategies Using Generative AI Tools",
  "Quantum Computing Breakthroughs: What Developers Need to Know",
  "Building Full-Stack Autonomous Web Applications with TypeScript",
  "The Rise of Local AI: Running 70B Models on Consumer Hardware",
  "Cybersecurity in the Age of AI: Prompt Injections and Zero-Trust Guardrails",
  "Future of Remote Work: Autonomous AI Agents as Pair Programmers",
  "Monetizing Developer Content and Micro-SaaS in 2025"
];

const RSS_SOURCES = [
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US",
  "https://hnrss.org/frontpage",
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml"
];

export async function scoutTrendingTopic(customNiche?: string): Promise<{
  topic: string;
  source: string;
  suggestedCategory: string;
}> {
  // If user configured a specific niche or custom seed
  if (customNiche && customNiche.trim().length > 0 && Math.random() > 0.4) {
    const topic = `${customNiche} - ${DEFAULT_NICHE_TOPICS[Math.floor(Math.random() * DEFAULT_NICHE_TOPICS.length)]}`;
    return {
      topic,
      source: "Custom Niche Config",
      suggestedCategory: "Artificial Intelligence",
    };
  }

  // Try fetching from Google Trends / HackerNews RSS
  for (const feedUrl of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(feedUrl);
      if (feed.items && feed.items.length > 0) {
        // Pick a fresh random trending item from the top 10
        const topItems = feed.items.slice(0, 10);
        const randomItem = topItems[Math.floor(Math.random() * topItems.length)];
        
        if (randomItem.title && randomItem.title.trim().length > 5) {
          return {
            topic: cleanRssTitle(randomItem.title),
            source: feed.title || feedUrl,
            suggestedCategory: categorizeTopic(randomItem.title),
          };
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch RSS from ${feedUrl}, trying next source...`, e.message);
    }
  }

  // Fallback to high-converting curated niche topics
  const fallback = DEFAULT_NICHE_TOPICS[Math.floor(Math.random() * DEFAULT_NICHE_TOPICS.length)];
  return {
    topic: fallback,
    source: "Curated Evergreen Tech & AI Pool",
    suggestedCategory: "Technology",
  };
}

function cleanRssTitle(raw: string): string {
  let title = raw.replace(/\s*-\s*(TechCrunch|The Verge|Google Trends|Hacker News)$/i, "");
  title = title.replace(/^Show HN:\s*/i, "").replace(/^Ask HN:\s*/i, "");
  return title.trim();
}

function categorizeTopic(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("ai") || lower.includes("gpt") || lower.includes("llm") || lower.includes("model") || lower.includes("neural") || lower.includes("agent")) {
    return "Artificial Intelligence";
  }
  if (lower.includes("crypto") || lower.includes("bitcoin") || lower.includes("finance") || lower.includes("money") || lower.includes("stock")) {
    return "Finance & Markets";
  }
  if (lower.includes("apple") || lower.includes("google") || lower.includes("microsoft") || lower.includes("phone") || lower.includes("gadget")) {
    return "Tech & Gadgets";
  }
  if (lower.includes("code") || lower.includes("javascript") || lower.includes("python") || lower.includes("react") || lower.includes("dev")) {
    return "Development & Engineering";
  }
  return "Technology";
}
