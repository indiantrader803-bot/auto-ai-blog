import Parser from "rss-parser";

const parser = new Parser({
  timeout: 8000,
});

const DEFAULT_NICHE_TOPICS = [
  // 🚀 AI & Frontier Tech
  "OpenAI o3 & Claude 3.7 Sonnet: The Rise of Autonomous Self-Evolving AI Agents in 2026",
  "Local LLMs on Apple Silicon: Running 70B Models with Zero Cloud Costs and High Token Throughput",
  "Physical AI & Humanoid Robotics: How Figure 02 and Tesla Optimus Are Entering Global Assembly Lines",
  "Agentic Coding in Production: Why Engineering Teams Are Replacing Traditional IDEs with Autonomous Dev Swarms",
  "DeepSeek V3 vs Mistral Large 2: The Open-Weights Architecture Transforming Enterprise AI",
  "The Next Computing Frontier: Quantum Neural Networks and Post-Quantum Financial Cryptography",
  "Brain-Computer Interfaces in 2026: Neuralink Clinical Progress, BCI Gaming & Ethical Guardrails",
  
  // 📈 High-Frequency Trading & Prop Firms
  "Algorithmic Order Flow Trading: Decoding Institutional Footprint Charts, Delta Spikes & Iceberg Orders",
  "Prop Trading Survival Handbook: How Top 1% Funded Traders Pass $200k Challenges with Strict Risk Scaling",
  "High-Frequency Market Making in 2026: Rust vs C++ for Microsecond Arbitrage on Global Exchanges",
  "Delta Exchange & Crypto Derivatives: Hedging Perpetual Futures and Options Strategies for High Volatility",
  "Zero-Loss Drawdown Discipline: The Mathematical Formula Behind Long-Term Funded Account Longevity",
  "India's Retail Trading Explosion: Nifty 50 Zero-Day-to-Expiry (0DTE) Options Trading Dynamics",
  
  // ✈️ Luxury Travel, Remote Work & Cultural Wonders
  "Kyoto to Tokyo on the Shinkansen: The Ultimate 10-Day AI-Curated Luxury Japan Itinerary",
  "Switzerland Scenic Train Journeys: Glacier Express, First-Class Passes & Alpine Chalet Stays",
  "Digital Nomad Empires in Bali & Lisbon: Cost of Living, Coworking Hubs & High-Speed Satellite Workspaces",
  "Himalayan High-Altitude Expeditions: Surviving the Chadar Frozen River Trek and Rohtang Passes",
  "The World's Most Surreal Cultural Carnivals: From Rio Sambadrome & Venice Masks to India's Mathura Holi",
  "Secret Northern Lights Cabins: Lapland Igloos, Arctic Thermal Baths & Photography Checklist",
  
  // 📱 Gadgets, Hardware & Apple Ecosystem
  "iPhone 18 Pro Max Teardown: 2nm A20 Pro Silicon, Variable Aperture Lens & All-Glass Unibody",
  "Apple M5 Ultra MacBook Pro: Is 512GB Unified Memory Worth the Pro Creator Premium in 2026?",
  "Spatial Computing Face-off: Apple Vision Pro 2 vs Meta Quest Pro 3 for Enterprise Workspaces",
  "Next-Gen Foldables: Tri-Fold Displays, Zero-Crease Hinges & Tablet-Class Productivity on the Go",
  
  // ⚡ Emerging Wealth, Crypto & Global Macro
  "Bitcoin Post-Halving Cycle: Institutional ETF Accumulation, Sovereign Reserves & Mining Realities",
  "Global Macro Pivots: How Central Bank Liquidity Shifts Impact Stocks, Gold & Tech Valuations",
  "Passive Income Playbook 2026: Automated AI Micro-SaaS and High-Yield Digital Product Funnels"
];

const RSS_SOURCES = [
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US",
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN",
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=GB",
  "https://hnrss.org/frontpage",
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
  "https://www.wired.com/feed/rss",
  "https://arstechnica.com/feed/",
  "https://www.moneycontrol.com/rss/MCtopnews.xml"
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
  if (lower.includes("travel") || lower.includes("traveller") || lower.includes("backpack") || lower.includes("trek") || lower.includes("nomad") || lower.includes("expedition") || lower.includes("tourism") || lower.includes("itinerary") || lower.includes("destination") || lower.includes("hiking") || lower.includes("flight")) {
    return "Travel & Expeditions";
  }
  if (lower.includes("festival") || lower.includes("festivle") || lower.includes("diwali") || lower.includes("holi") || lower.includes("carnival") || lower.includes("matsuri") || lower.includes("tradition") || lower.includes("celebration") || lower.includes("culture") || lower.includes("oktoberfest") || lower.includes("ritual")) {
    return "Festivals & Culture";
  }
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
  if (lower.includes("iphone") || lower.includes("apple") || lower.includes("macbook") || lower.includes("ipad") || lower.includes("vision pro") || lower.includes("gadget") || lower.includes("hardware") || lower.includes("foldable") || lower.includes("samsung")) {
    return "Technology & Gadgets";
  }
  if (lower.includes("crypto") || lower.includes("bitcoin") || lower.includes("ethereum") || lower.includes("halving") || lower.includes("blockchain") || lower.includes("token")) {
    return "Finance & Markets";
  }
  return "Finance & Markets";
}
