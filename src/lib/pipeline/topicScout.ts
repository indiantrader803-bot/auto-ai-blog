import Parser from "rss-parser";

const parser = new Parser({
  timeout: 8000,
});

const DEFAULT_NICHE_TOPICS = [
  "Viral Social Media Algorithms in 2026: Cracking TikTok, YouTube Shorts & Instagram Reels Distribution",
  "AI Influencers & Digital Creators: How Autonomous Synthetic Avatars Are Generating Millions in Brand Sponsorships",
  "Social Media Monetization Blueprint: Scaling High-Ticket Affiliate Funnels Across Twitter/X and LinkedIn",
  "Nifty 50 & Sensex Technical Outlook: FII Inflows, DII Liquidity & Key Breakout Levels",
  "Indian Stock Market: Banking, IT & Defence Sectors Poised for High-Growth in 2026",
  "US Stock Markets (S&P 500, Nasdaq 100): Big Tech Earnings & Federal Reserve Rate Policy",
  "Global Forex Trading: USD/INR, EUR/USD & Currency Hedging Strategies for Volatility",
  "Commodity Supercycle: Gold, Silver & Crude Oil Technical Pivot Points and Geo-Economic Drivers",
  "DeepSeek V3 vs Claude 3.7 Sonnet: The Open-Weights AI Reasoning Architecture War",
  "Prop Trading Masterclass: Passing MFFU & Blue Guardian Funding Challenges with Algorithmic Risk Management",
  "India's Telecom Revolution: 5G SA, Starlink Satellite Broadband vs Airtel OneWeb",
  "Agentic AI Workflows and Autonomous Coding Systems in Enterprise Production",
  "Semiconductor Manufacturing: TSMC 2nm N2 Node & High-NA EUV Breakthroughs",
  "High-Yield Quantitative Strategies: Real-Time Algorithmic Execution on Global Markets",
  "Zero-Trust Cloud Infrastructure: Hardening Enterprise Kubernetes Clusters",
  "Post-Quantum Cryptography & Kyber Encryption for Financial Systems",
  "Next.js 15 & Edge Computing: Sub-10ms Microservices Architecture"
];

const RSS_SOURCES = [
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN",
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US",
  "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
  "https://www.moneycontrol.com/rss/MCtopnews.xml",
  "https://hnrss.org/frontpage",
  "https://techcrunch.com/feed/",
  "https://mashable.com/feeds/rss/all",
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
      suggestedCategory: "Finance & Markets",
    };
  }

  // Try fetching from Google Trends / Financial / Tech RSS
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
    source: "Curated Global Market & Tech Pool",
    suggestedCategory: categorizeTopic(fallback),
  };
}

function cleanRssTitle(raw: string): string {
  let title = raw.replace(/\s*-\s*(TechCrunch|The Verge|Google Trends|Hacker News|Reuters|Economic Times|Moneycontrol)$/i, "");
  title = title.replace(/^Show HN:\s*/i, "").replace(/^Ask HN:\s*/i, "");
  return title.trim();
}

function categorizeTopic(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("nifty") || lower.includes("sensex") || lower.includes("bse") || lower.includes("nse") || lower.includes("rupee") || lower.includes("sebi") || lower.includes("fii") || lower.includes("dii")) {
    return "Indian Markets";
  }
  if (lower.includes("forex") || lower.includes("usd") || lower.includes("eur") || lower.includes("gbp") || lower.includes("jpy") || lower.includes("currency")) {
    return "Forex & Currencies";
  }
  if (lower.includes("gold") || lower.includes("silver") || lower.includes("crude") || lower.includes("oil") || lower.includes("commodity") || lower.includes("metal") || lower.includes("natural gas")) {
    return "Commodities";
  }
  if (lower.includes("s&p") || lower.includes("nasdaq") || lower.includes("dow") || lower.includes("wall street") || lower.includes("fed") || lower.includes("nyse")) {
    return "US Markets";
  }
  if (lower.includes("ai") || lower.includes("gpt") || lower.includes("llm") || lower.includes("model") || lower.includes("neural") || lower.includes("agent") || lower.includes("claude")) {
    return "Artificial Intelligence";
  }
  if (lower.includes("code") || lower.includes("javascript") || lower.includes("python") || lower.includes("react") || lower.includes("dev") || lower.includes("rust") || lower.includes("kubernetes")) {
    return "Development & Engineering";
  }
  return "Finance & Markets";
}
