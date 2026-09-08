import Parser from "rss-parser";
import { prisma } from "@/lib/prisma";
import { runBlogPipeline } from "../orchestrator";

const parser = new Parser({ timeout: 10000 });

export interface DiscoveredTrend {
  title: string;
  category: string;
  source: string;
  trendVelocity: "BREAKING" | "VIRAL" | "HIGH_MOMENTUM";
  estimatedMonthlySearchVolume: string;
  recommendedMonetization: "PROP_TRADING_MFFU_BG" | "DIGITAL_STORE_PRODUCTS" | "AMAZON_TECH_AFFILIATE";
}

const LIVE_TRENDING_FEEDS = [
  { url: "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US", source: "Google Trends (US)", category: "US Markets" },
  { url: "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN", source: "Google Trends (India)", category: "Indian Markets" },
  { url: "https://hnrss.org/frontpage", source: "Hacker News Frontier", category: "Technology" },
  { url: "https://techcrunch.com/feed/", source: "TechCrunch Innovation", category: "Artificial Intelligence" },
  { url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms", source: "Economic Times Markets", category: "Indian Markets" },
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge Tech & Social", category: "Social Media & Tech" },
  { url: "https://mashable.com/feeds/rss/all", source: "Mashable Digital Culture", category: "Social Media & Tech" }
];

const CURATED_HOT_TOPIC_RADAR = [
  {
    title: "DeepSeek V3 vs Claude 3.7 Sonnet: The Open-Weights AI Reasoning Architecture War",
    category: "Artificial Intelligence",
    monetization: "AMAZON_TECH_AFFILIATE" as const
  },
  {
    title: "Viral Social Media Algorithms in 2026: Cracking TikTok, Shorts & Reels Distribution",
    category: "Social Media & Tech",
    monetization: "DIGITAL_STORE_PRODUCTS" as const
  },
  {
    title: "Prop Trading Masterclass: Passing MFFU & Blue Guardian Challenges with Algorithmic Risk",
    category: "Trading & Prop Firms",
    monetization: "PROP_TRADING_MFFU_BG" as const
  },
  {
    title: "Nifty 50 & BankNifty Technical Outlook: FII Liquidity Breakout Targets",
    category: "Indian Markets",
    monetization: "PROP_TRADING_MFFU_BG" as const
  },
  {
    title: "Commodity Supercycle: Gold at Record Highs & Silver Industrial Solar Demand Surge",
    category: "Commodities",
    monetization: "PROP_TRADING_MFFU_BG" as const
  },
  {
    title: "AI Influencers & Digital Creators: Building Automated Synthetic Video Channels for Revenue",
    category: "Social Media & Tech",
    monetization: "DIGITAL_STORE_PRODUCTS" as const
  }
];

export async function runTrendHunterAgent(): Promise<{
  scoutedTrends: DiscoveredTrend[];
  selectedWinner: DiscoveredTrend;
  publishedArticleResult?: any;
}> {
  const discovered: DiscoveredTrend[] = [];

  // 1. Ingest real-time headlines from RSS and Trend feeds
  for (const feed of LIVE_TRENDING_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      if (parsed.items && parsed.items.length > 0) {
        for (const item of parsed.items.slice(0, 3)) {
          if (item.title && item.title.trim().length > 10) {
            discovered.push({
              title: item.title.replace(/\s*-\s*.*$/, "").trim(),
              category: feed.category,
              source: feed.source,
              trendVelocity: "BREAKING",
              estimatedMonthlySearchVolume: `${Math.floor(Math.random() * 80 + 20)}k searches/mo`,
              recommendedMonetization: feed.category.includes("Market") || feed.category.includes("Trading")
                ? "PROP_TRADING_MFFU_BG"
                : "DIGITAL_STORE_PRODUCTS"
            });
          }
        }
      }
    } catch (_) {}
  }

  // 2. Add curated radar items
  for (const radar of CURATED_HOT_TOPIC_RADAR) {
    discovered.push({
      title: radar.title,
      category: radar.category,
      source: "Autonomous Quant Radar",
      trendVelocity: "VIRAL",
      estimatedMonthlySearchVolume: "100k+ global searches/mo",
      recommendedMonetization: radar.monetization
    });
  }

  // 3. Deduplicate against already existing articles in DB
  let existingSlugs = new Set<string>();
  try {
    const existing = await prisma.post.findMany({ select: { slug: true } });
    existingSlugs = new Set(existing.map(p => p.slug.toLowerCase()));
  } catch (_) {}

  const availableTrends = discovered.filter(t => {
    const simplifiedSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return !existingSlugs.has(simplifiedSlug);
  });

  const selectedWinner = availableTrends.length > 0
    ? availableTrends[Math.floor(Math.random() * availableTrends.length)]
    : discovered[0];

  return {
    scoutedTrends: discovered.slice(0, 10),
    selectedWinner,
  };
}

export async function executeDailyViralTopicPipeline(): Promise<{
  trend: DiscoveredTrend;
  postResult: any;
}> {
  const { selectedWinner } = await runTrendHunterAgent();

  const postResult = await runBlogPipeline({
    topic: selectedWinner.title,
    category: selectedWinner.category,
    autoPublish: true,
    tone: "authoritative",
    targetWordCount: 1600
  });

  return {
    trend: selectedWinner,
    postResult
  };
}
