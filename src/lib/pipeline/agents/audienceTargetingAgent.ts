export interface AudienceProfile {
  icpName: string;
  segment: "DAY_TRADER" | "CRYPTO_DEGEN" | "PROP_TRADER" | "AI_DEV" | "MACRO_INVESTOR";
  demographics: {
    primaryCountries: string[];
    avgAgeRange: string;
    purchasingPower: "VERY_HIGH" | "HIGH" | "MEDIUM";
  };
  corePainPoints: string[];
  buyingTriggers: string[];
  bestConvertingOffer: {
    partnerName: string;
    affiliateUrl: string;
    promoCode?: string;
    hookHeadline: string;
    ctaButton: string;
  };
  recommendedChannels: {
    subreddits: string[];
    twitterHashtags: string[];
    telegramTopics: string[];
    adTargetKeywords: string[];
  };
}

export function identifyTargetAudience(title: string, content: string = "", category: string = ""): AudienceProfile {
  const combined = `${title} ${content} ${category}`.toLowerCase();

  // 1. Binary Options & Quick Trading Audience
  if (/pocket|binary|quick trad|deposit bonus|50start|signals|scalping|candle|96%/i.test(combined)) {
    return {
      icpName: "High-Frequency Retail Scalper & Options Trader",
      segment: "DAY_TRADER",
      demographics: {
        primaryCountries: ["India", "Nigeria", "Brazil", "Indonesia", "UAE", "UK"],
        avgAgeRange: "20 - 38",
        purchasingPower: "MEDIUM",
      },
      corePainPoints: [
        "Needs fast 5s-60s payouts without waiting days for bank clearance",
        "Lacks consistent profitable indicators and reliable entry signals",
        "Small initial starting capital to risk",
      ],
      buyingTriggers: [
        "50% Extra Balance Match on First Deposit (Promo Code: 50START)",
        "Zero-Fee Instant Crypto & UPI Withdrawals",
        "Free $10,000 Refillable Demo Account to practice risk-free",
      ],
      bestConvertingOffer: {
        partnerName: "Pocket Option Quick Trading",
        affiliateUrl: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
        promoCode: "50START",
        hookHeadline: "Claim 50% Instant Deposit Bonus + Copy Top 1% Master Traders",
        ctaButton: "Claim 50% Deposit Match (Code: 50START) →",
      },
      recommendedChannels: {
        subreddits: ["r/binaryoptions", "r/daytrading", "r/Forex", "r/IndianStockMarket"],
        twitterHashtags: ["#PocketOption", "#TradingSignals", "#BinaryOptions", "#ForexSignals"],
        telegramTopics: ["Pocket Option VIP Signals", "Daily Scalping Hub", "Crypto Scalping Alerts"],
        adTargetKeywords: ["pocket option promo code", "binary options signals", "fast deposit bonus trading", "best scalping app 2026"],
      },
    };
  }

  // 2. Crypto Derivatives & Options Trader
  if (/crypto|bitcoin|btc|eth|ethereum|delta|coinswitch|derivative|option chain|leverage|altcoin|inr deposit/i.test(combined)) {
    return {
      icpName: "Crypto Derivatives Trader & DeFi Yield Strategist",
      segment: "CRYPTO_DEGEN",
      demographics: {
        primaryCountries: ["India", "USA", "UK", "Germany", "Singapore", "UAE"],
        avgAgeRange: "22 - 42",
        purchasingPower: "HIGH",
      },
      corePainPoints: [
        "High 30% tax & TDS friction in standard Indian crypto exchanges",
        "Lack of direct INR gateway into deep derivative liquidity orderbooks",
        "Needs high leverage (up to 100x) and daily/weekly crypto options contracts",
      ],
      buyingTriggers: [
        "100x Leverage on Bitcoin & Ethereum Options with 10% Fee Discount (Code: YXQSZA)",
        "Direct Instant INR Deposit & Withdrawal with 0.05% lowest fees on CoinSwitch Pro (Code: NLfEITW)",
      ],
      bestConvertingOffer: {
        partnerName: "Delta Exchange Crypto Derivatives",
        affiliateUrl: "https://www.delta.exchange/?code=YXQSZA",
        promoCode: "YXQSZA",
        hookHeadline: "Trade BTC & ETH Options with 100x Leverage & 10% Lifetime Fee Discount",
        ctaButton: "Trade Crypto Options (Code: YXQSZA) →",
      },
      recommendedChannels: {
        subreddits: ["r/CryptoCurrency", "r/Bitcoin", "r/CryptoMarkets", "r/ethtrader"],
        twitterHashtags: ["#BitcoinOptions", "#CryptoDerivatives", "#DeltaExchange", "#Ethereum"],
        telegramTopics: ["Crypto Futures Trading", "Bitcoin Daily Signals", "CoinSwitch Pro VIP"],
        adTargetKeywords: ["crypto options trading india", "delta exchange referral code", "lowest fee crypto terminal inr", "trade btc options 100x"],
      },
    };
  }

  // 3. Prop Trading & Funded Account Seekers
  if (/prop firm|funded|ck capital|ftm|funded trader|mffu|challenge|scaling|drawdown|rule/i.test(combined)) {
    return {
      icpName: "Ambitious Prop Trader Seeking $100k-$300k Scaling Capital",
      segment: "PROP_TRADER",
      demographics: {
        primaryCountries: ["USA", "UK", "India", "Canada", "Australia", "UAE"],
        avgAgeRange: "24 - 45",
        purchasingPower: "HIGH",
      },
      corePainPoints: [
        "Has trading skill but limited personal capital to generate full-time living income",
        "Frustrated by hidden trailing drawdowns and strict 30-day evaluation limits",
        "Wants 90% profit splits with same-day bi-weekly payouts",
      ],
      buyingTriggers: [
        "1-Day Pass Challenges with No Minimum Trading Days",
        "Institutional UK Risk Frameworks with 10% Instant Partner Split (Code: ALPROP)",
        "Zero Time Limit Challenges with Instant Scaling (Code: SMARTMAG)",
      ],
      bestConvertingOffer: {
        partnerName: "Funded Trader Markets & CK Capital",
        affiliateUrl: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
        promoCode: "SMARTMAG",
        hookHeadline: "Get Funded Up to $200,000 Capital with Instant Scaling & Zero Time Limits",
        ctaButton: "Start $200k Funded Challenge (Code: SMARTMAG) →",
      },
      recommendedChannels: {
        subreddits: ["r/FuturesTrading", "r/Forex", "r/PropFirmTraders", "r/Daytrading"],
        twitterHashtags: ["#PropFirm", "#FundedTrader", "#ForexTrading", "#FuturesTrading"],
        telegramTopics: ["Prop Firm Passers Club", "Funded Traders Discord", "MFFU Payouts"],
        adTargetKeywords: ["best prop firm 2026", "pass prop challenge fast", "1 day funded trader challenge", "ck capital discount code"],
      },
    };
  }

  // 4. Default: AI Engineers & Developer Workstations
  return {
    icpName: "Full-Stack Software Engineer & AI System Architect",
    segment: "AI_DEV",
    demographics: {
      primaryCountries: ["USA", "India", "UK", "Germany", "Canada"],
      avgAgeRange: "23 - 48",
      purchasingPower: "VERY_HIGH",
    },
    corePainPoints: [
      "Local LLM inference is too slow on underpowered laptops",
      "Cloud GPU instances are expensive for recurring fine-tuning experiments",
      "Needs ergonomic multi-monitor workstation setups for 12+ hour deep work sessions",
    ],
    buyingTriggers: [
      "M3/M4 Max MacBooks with 64GB+ unified memory for running local 70B models",
      "NVIDIA RTX 4090 24GB GPUs at best verified Amazon prices",
    ],
    bestConvertingOffer: {
      partnerName: "Amazon Associates Workstation Hardware",
      affiliateUrl: "https://amzn.to/3UXVtTR",
      promoCode: "autoaiblog-21",
      hookHeadline: "Top Curated Developer Hardware, 4K Monitors & RTX 4090 Workstations",
      ctaButton: "View Top Developer Deals on Amazon →",
    },
    recommendedChannels: {
      subreddits: ["r/programming", "r/webdev", "r/MachineLearning", "r/LocalLLaMA", "r/devops"],
      twitterHashtags: ["#AI", "#SoftwareEngineering", "#LocalLLMs", "#WebDev", "#RTX4090"],
      telegramTopics: ["DevOps Architects", "AI Builders Guild", "HackerNews Pulse"],
      adTargetKeywords: ["best laptop for ai machine learning", "rtx 4090 developer workstation", "macbook pro m3 max review", "curved monitor for coding"],
    },
  };
}
