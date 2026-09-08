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
    id: "sp_tradingview",
    sponsorName: "TradingView Pro",
    badge: "FEATURED MARKET CHARTS",
    tagline: "Institutional-Grade Candlestick Charts, Heatmaps & Algorithmic Screeners",
    description: "Access real-time data for NSE, BSE, S&P 500, Forex, and MCX commodities with 100+ technical indicators and Pine Script backtesting.",
    ctaText: "Start 30-Day Free Pro Trial",
    ctaUrl: "https://www.tradingview.com/?aff_id=autoai",
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
    ctaUrl: "https://zerodha.com/open-account?c=AUTOAI",
    discountCode: "ZERODHA2026",
    categoryMatch: ["Indian Markets", "Finance & Markets"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_us_broker",
    sponsorName: "Interactive Brokers Global",
    badge: "GLOBAL EQUITIES GATEWAY",
    tagline: "Trade S&P 500, Nasdaq, ETFs & Bonds Across 150+ Global Markets",
    description: "Industry-leading low margin rates, deep liquidity, zero-commission US stock trading, and automated API execution for international investors.",
    ctaText: "Open Global Trading Account",
    ctaUrl: "https://www.interactivebrokers.com/?ref=autoai",
    discountCode: "GLOBALPASS",
    categoryMatch: ["US Markets", "Forex & Currencies", "Finance & Markets"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_commodities_terminal",
    sponsorName: "Bullion & Energy Terminal",
    badge: "COMMODITY INTELLIGENCE",
    tagline: "Real-Time Gold, Silver, Brent Crude Oil & Natural Gas Liquidity Feeds",
    description: "Institutional supply/demand telemetry, OPEC+ tracking, and technical breakout alerts for physical commodity and futures traders.",
    ctaText: "Access Commodity Liquidity",
    ctaUrl: "https://www.tradingview.com/markets/commodities/?aff_id=autoai",
    discountCode: "GOLD2026",
    categoryMatch: ["Commodities", "Finance & Markets"],
    cpcTier: "HIGH",
  },
  {
    id: "sp_cloud_gpu",
    sponsorName: "HyperCompute Cloud GPUs",
    badge: "FEATURED CLOUD SPONSOR",
    tagline: "Deploy On-Demand H100 & RTX 4090 Clusters with 80% Cost Savings",
    description: "Instant serverless GPU provisioning for fine-tuning LLMs, running 70B local inference, and scaling multi-agent swarms with zero idle fees.",
    ctaText: "Claim $100 Free GPU Credits",
    ctaUrl: "https://hypercompute.cloud/?ref=autoai",
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
    ctaUrl: "https://cursor.com/?ref=autoai",
    discountCode: "DEV2026",
    categoryMatch: ["Software & Cloud", "Technology", "Artificial Intelligence"],
    cpcTier: "HIGH",
  },
  {
    id: "sp_dev_sec",
    sponsorName: "ArmorGuard Zero-Trust",
    badge: "ENTERPRISE SECURITY PARTNER",
    tagline: "Automated eBPF Observability & Secrets Protection for Kubernetes",
    description: "Eliminate static credentials and enforce kernel-level microsegmentation for AI agent sandboxes and cloud native microservices.",
    ctaText: "Start Free 30-Day Enterprise Trial",
    ctaUrl: "https://nordvpn.com/?ref=autoai",
    discountCode: "DEVPASS",
    categoryMatch: ["Technology", "Software & Cloud"],
    cpcTier: "HIGH",
  },
  {
    id: "sp_quant_tools",
    sponsorName: "AlphaSignal Terminal",
    badge: "QUANTITATIVE INTELLIGENCE",
    tagline: "Real-Time NLP Sentiment Streams for Global Equities & Macro Data",
    description: "Institutional-grade sentiment feeds, SEC filing anomaly alerts, and automated Python SDK backtesting for modern trading desks.",
    ctaText: "Access Live Market Data",
    ctaUrl: "https://www.tradingview.com/?aff_id=autoai",
    discountCode: "ALPHA2026",
    categoryMatch: ["Finance & Markets", "US Markets"],
    cpcTier: "ULTRA",
  },
];

/**
 * 💰 Sponsor & Ad Monetization Agent
 * Matches the article topic and category with the most profitable, highly contextual sponsor.
 */
export function matchSponsorForArticle(
  topic: string,
  category: string,
  keywords: string[] = []
): SponsorDeal {
  const combined = `${topic} ${category} ${keywords.join(" ")}`.toLowerCase();

  // 1. Indian Markets (Nifty, Sensex, FII, DII, NSE, BSE, RBI)
  if (
    combined.includes("indian") ||
    combined.includes("nifty") ||
    combined.includes("sensex") ||
    combined.includes("dii") ||
    combined.includes("fii") ||
    combined.includes("rupee")
  ) {
    return VERIFIED_SPONSORS[1]; // Zerodha
  }

  // 2. Commodities (Gold, Silver, Crude Oil, Brent, Energy)
  if (
    combined.includes("gold") ||
    combined.includes("silver") ||
    combined.includes("crude") ||
    combined.includes("commodity") ||
    combined.includes("oil")
  ) {
    return VERIFIED_SPONSORS[3]; // Bullion & Energy
  }

  // 3. US Markets (S&P 500, Nasdaq, Wall Street, Fed, US Stocks)
  if (
    combined.includes("s&p") ||
    combined.includes("nasdaq") ||
    combined.includes("fed") ||
    combined.includes("us market") ||
    combined.includes("wall street") ||
    combined.includes("dollar")
  ) {
    return VERIFIED_SPONSORS[2]; // Interactive Brokers
  }

  // 4. Forex & Currencies (USD/INR, EUR/USD, Forex)
  if (
    combined.includes("forex") ||
    combined.includes("usd/inr") ||
    combined.includes("currency")
  ) {
    return VERIFIED_SPONSORS[0]; // TradingView
  }

  // 5. Code & Software Development (Cursor, Next.js, React, Architecture)
  if (
    combined.includes("code") ||
    combined.includes("editor") ||
    combined.includes("software") ||
    combined.includes("frontend") ||
    combined.includes("backend")
  ) {
    return VERIFIED_SPONSORS[5]; // Cursor
  }

  // 6. Enterprise Security / Cloud Infrastructure
  if (
    combined.includes("security") ||
    combined.includes("kubernetes") ||
    combined.includes("devops") ||
    combined.includes("docker")
  ) {
    return VERIFIED_SPONSORS[6]; // ArmorGuard
  }

  // 7. General AI & High Performance Compute
  if (
    combined.includes("gpu") ||
    combined.includes("llm") ||
    combined.includes("cluster") ||
    combined.includes("model")
  ) {
    return VERIFIED_SPONSORS[4]; // HyperCompute
  }

  return VERIFIED_SPONSORS[0]; // Default TradingView Pro
}
