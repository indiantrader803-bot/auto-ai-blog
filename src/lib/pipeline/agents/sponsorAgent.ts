export interface SponsorDeal {
  id: string;
  sponsorName: string;
  badge: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  discountCode?: string;
  categoryMatch: string[];
  cpcTier: "ULTRA" | "HIGH" | "MEDIUM";
}

export const VERIFIED_SPONSORS: SponsorDeal[] = [
  {
    id: "sp_ftm",
    sponsorName: "Funded Trader Markets",
    badge: "FEATURED PRO TRADER PARTNER",
    tagline: "Trade Up to $200,000 Capital with Instant Scaling & 90% Profit Split",
    description: "Industry-leading challenge evaluations, zero time limit rules, lowest spreads, and same-day payout approvals via Rise, Bank Wire & Crypto.",
    ctaText: "Start Funded Trader Markets Challenge →",
    ctaUrl: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
    discountCode: "SMARTMAG",
    categoryMatch: ["Indian Markets", "US Markets", "Forex & Currencies", "Commodities", "Finance & Markets", "Trading"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_mffu",
    sponsorName: "MyFundedFutures (MFFU) Prop Trading",
    badge: "FUTURES CAPITAL LEADER",
    tagline: "Get Funded Up To $300,000 to Trade Futures with 90% Profit Split",
    description: "Industry-leading evaluation accounts, 1-day pass options, zero activation fees, and fast bi-weekly payouts for serious traders.",
    ctaText: "Claim Your MFFU Funded Account →",
    ctaUrl: "https://mffu.com/f/85f1f73f30",
    discountCode: "FUTURES2026",
    categoryMatch: ["Indian Markets", "US Markets", "Forex & Currencies", "Commodities", "Finance & Markets", "Trading"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_blueguardian",
    sponsorName: "Blue Guardian Prop Firm",
    badge: "GLOBAL FOREX & CFD LEADER",
    tagline: "Unlimited Trading Days & The Guardian Protector Risk Engine",
    description: "Trade Forex, Crypto, Indices & Commodities with up to $400k capital. No hidden rules, fast scaling plans, and 85%+ profit splits.",
    ctaText: "Start Blue Guardian Challenge →",
    ctaUrl: "https://blueguardian.com/?afmc=1tgf",
    discountCode: "GUARDIAN803",
    categoryMatch: ["Forex & Currencies", "US Markets", "Indian Markets", "Commodities", "Finance & Markets", "Trading"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_amazon_tech",
    sponsorName: "Amazon Tech & AI Gear",
    badge: "OFFICIAL AMAZON ASSOCIATE",
    tagline: "Top-Rated Developer Laptops, GPUs, Mechanical Keyboards & Monitors",
    description: "Exclusive Amazon deals on high-performance M3/M4 MacBooks, RTX 4090 GPUs, ultrawide monitors, and smart home tech with Prime 1-Day Delivery.",
    ctaText: "Check Amazon Deals & Best Prices",
    ctaUrl: "https://amzn.to/3UXVtTR",
    discountCode: "PRIME2026",
    categoryMatch: ["Technology", "Artificial Intelligence", "Development & Engineering", "Software & Cloud"],
    cpcTier: "HIGH",
  },
  {
    id: "sp_tradingview",
    sponsorName: "TradingView Pro Charts",
    badge: "FEATURED MARKET CHARTS",
    tagline: "Institutional-Grade Candlestick Charts, Heatmaps & Algorithmic Screeners",
    description: "Access real-time data for NSE, BSE, S&P 500, Forex, and MCX commodities with 100+ technical indicators and Pine Script backtesting.",
    ctaText: "Start 30-Day Free Pro Trial",
    ctaUrl: "https://amzn.to/3UXVtTR",
    discountCode: "SMARTTRADER",
    categoryMatch: ["Indian Markets", "US Markets", "Forex & Currencies", "Commodities", "Finance & Markets"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_indian_broker",
    sponsorName: "Zerodha Demat & Trading",
    badge: "INDIA'S #1 STOCK BROKER",
    tagline: "Zero Brokerage on Equity Delivery & Direct Mutual Funds",
    description: "Open an online Demat account in 5 minutes with Kite. Fast execution, advanced option chains, and seamless UPI fund transfers.",
    ctaText: "Open Free Demat Account",
    ctaUrl: "https://amzn.to/3UXVtTR",
    discountCode: "ZERODHA2026",
    categoryMatch: ["Indian Markets", "Finance & Markets"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_cloud_gpu",
    sponsorName: "HyperCompute Cloud GPUs",
    badge: "FEATURED CLOUD SPONSOR",
    tagline: "Deploy On-Demand H100 & RTX 4090 Clusters with 80% Cost Savings",
    description: "Instant serverless GPU provisioning for fine-tuning LLMs, running 70B local inference, and scaling multi-agent swarms with zero idle fees.",
    ctaText: "Claim $100 Free GPU Credits",
    ctaUrl: "https://amzn.to/4gJpL5u",
    discountCode: "SMARTMAG2026",
    categoryMatch: ["Artificial Intelligence", "Technology", "Software & Cloud"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_cursor_ai",
    sponsorName: "Cursor AI & Claude 3.5 Sonnet",
    badge: "DEVELOPER PRODUCTIVITY",
    tagline: "The #1 AI-Native Code Editor Built for High-Velocity Engineering",
    description: "Full-codebase semantic indexing, multi-file agentic refactoring, and automated terminal debugging trusted by top software teams.",
    ctaText: "Try Cursor Pro Free",
    ctaUrl: "https://amzn.to/3VjFaRp",
    discountCode: "DEV2026",
    categoryMatch: ["Software & Cloud", "Technology", "Artificial Intelligence"],
    cpcTier: "HIGH",
  },
];

/**
 * 💰 Sponsor & Prop Firm Monetization Matcher
 */
export function matchSponsorForArticle(
  topic: string,
  category: string,
  keywords: string[] = []
): SponsorDeal {
  const combined = `${topic} ${category} ${keywords.join(" ")}`.toLowerCase();

  // 1. Futures / Prop Firm / Trading / Breakout Match
  if (
    combined.includes("future") ||
    combined.includes("prop") ||
    combined.includes("funded") ||
    combined.includes("evaluation") ||
    combined.includes("nifty") ||
    combined.includes("sensex") ||
    combined.includes("breakout")
  ) {
    return VERIFIED_SPONSORS[0]; // MFFU
  }

  // 2. Forex / Currencies / Gold / Commodities
  if (
    combined.includes("forex") ||
    combined.includes("usd/inr") ||
    combined.includes("currency") ||
    combined.includes("gold") ||
    combined.includes("crude") ||
    combined.includes("guardian")
  ) {
    return VERIFIED_SPONSORS[1]; // Blue Guardian
  }

  // 3. AI & GPUs
  if (combined.includes("gpu") || combined.includes("llm") || combined.includes("ai")) {
    return VERIFIED_SPONSORS[5]; // HyperCompute
  }

  // 4. Default to MFFU or Blue Guardian high-payout prop trading
  return Math.random() > 0.5 ? VERIFIED_SPONSORS[0] : VERIFIED_SPONSORS[1];
}
