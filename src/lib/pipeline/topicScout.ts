import Parser from "rss-parser";

const parser = new Parser({
  timeout: 8000,
});

const DEFAULT_NICHE_TOPICS = [
  "Bharti Airtel 5G Standalone Core & Edge Cloud Infrastructure: Enterprise Case Study",
  "India's Telecom Revolution: 5G SA, Starlink Satellite Broadband vs Airtel OneWeb",
  "Airtel Payments Bank & Digital Lending: How 50 Million Active Accounts are Driving Rural Fintech",
  "Global Telecom Tariffs & ARPU Surge in 2026: The Race for Sovereign AI Compute Networks",
  "Agentic AI Workflows and Autonomous Coding Systems in Production",
  "Next-Generation Small Language Models (SLMs) for Edge Devices & IoT",
  "Semiconductor Manufacturing: TSMC 2nm N2 Node & High-NA EUV Breakthroughs",
  "High-Yield Quantitative Strategies: Real-Time Sentiment Extraction on Global Markets",
  "The Electric Vehicle & Solid-State Battery Revolution: Global Grid Transitions",
  "Zero-Trust Cloud Infrastructure: Hardening Enterprise Kubernetes Clusters",
  "Cybersecurity in the Age of AI: Post-Quantum Cryptography & Kyber Encryption",
  "Next.js 14 & Edge Computing: Sub-10ms Microservices Architecture"
];

const RSS_SOURCES = [
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN",
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
      suggestedCategory: "Telecom & Connectivity",
    };
  }

  // Try fetching from Google Trends / HackerNews RSS
  for (const feedUrl of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(feedUrl);
      if (feed.items && feed.items.length > 0) {
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
    source: "Curated Hot Topic & Telecom Pool",
    suggestedCategory: categorizeTopic(fallback),
  };
}

function cleanRssTitle(raw: string): string {
  let title = raw.replace(/\s*-\s*(TechCrunch|The Verge|Google Trends|Hacker News|Reuters)$/i, "");
  title = title.replace(/^Show HN:\s*/i, "").replace(/^Ask HN:\s*/i, "");
  return title.trim();
}

function categorizeTopic(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("airtel") || lower.includes("telecom") || lower.includes("5g") || lower.includes("6g") || lower.includes("broadband") || lower.includes("oneweb") || lower.includes("spectrum") || lower.includes("jio")) {
    return "Telecom & Connectivity";
  }
  if (lower.includes("ai") || lower.includes("gpt") || lower.includes("llm") || lower.includes("model") || lower.includes("neural") || lower.includes("agent") || lower.includes("claude")) {
    return "Artificial Intelligence";
  }
  if (lower.includes("crypto") || lower.includes("bitcoin") || lower.includes("finance") || lower.includes("money") || lower.includes("stock") || lower.includes("bank") || lower.includes("market") || lower.includes("upi")) {
    return "Finance & Markets";
  }
  if (lower.includes("battery") || lower.includes("ev") || lower.includes("electric") || lower.includes("energy") || lower.includes("quantum") || lower.includes("chip") || lower.includes("semiconductor")) {
    return "Science & Future Tech";
  }
  if (lower.includes("code") || lower.includes("javascript") || lower.includes("python") || lower.includes("react") || lower.includes("dev") || lower.includes("rust") || lower.includes("kubernetes")) {
    return "Development & Engineering";
  }
  return "Technology";
}
