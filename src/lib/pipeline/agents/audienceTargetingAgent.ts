import { prisma } from "../../prisma";

export type SearchIntentType = "INFORMATIONAL" | "COMMERCIAL" | "TRANSACTIONAL" | "NAVIGATIONAL";

export interface IntentAudienceResult {
  searchIntent: SearchIntentType;
  funnelStage: "TOP" | "MIDDLE" | "BOTTOM";
  ctaStrength: "SOFT" | "MEDIUM" | "HIGH" | "URGENT";
  recommendedPrimaryAction: "EMAIL_CAPTURE_FIRST" | "EDUCATIONAL_SOFT_CTA" | "COMPARISON_TABLE_CTA" | "DIRECT_BONUS_SIGNUP";
  icpName: string;
  segment: "DAY_TRADER" | "CRYPTO_DEGEN" | "PROP_TRADER" | "AI_DEV" | "MACRO_INVESTOR";
  demographics: {
    primaryCountries: string[];
    avgAgeRange: string;
    purchasingPower: "VERY_HIGH" | "HIGH" | "MEDIUM";
  };
  corePainPoints: string[];
  buyingTriggers: string[];
  offerScoringEngine: Array<{
    partnerName: string;
    affiliateUrl: string;
    promoCode?: string;
    calculatedScore: number;
    scoreBreakdown: {
      intentWeight: number;
      geoWeight: number;
      relevanceWeight: number;
      commissionWeight: number;
    };
    hookHeadline: string;
    ctaButton: string;
  }>;
  winningOffer: {
    partnerName: string;
    affiliateUrl: string;
    promoCode?: string;
    hookHeadline: string;
    ctaButton: string;
    score: number;
  };
  complianceTrustBlock: {
    affiliateDisclosure: string;
    riskDisclaimer: string;
    geoRestrictionsNote: string;
  };
  seoArchitecture: {
    targetH1: string;
    metaDescription: string;
    faqSchema: Array<{ question: string; answer: string }>;
    suggestedInternalLinks: Array<{ keyword: string; anchorText: string; targetSlug: string }>;
    relatedTopicClusters: string[];
  };
  recommendedChannels: {
    subreddits: string[];
    twitterHashtags: string[];
    telegramTopics: string[];
    adTargetKeywords: string[];
  };
}

/**
 * 🎯 STEP 1 & 2: INTENT DETECTION & AUDIENCE INTELLIGENCE AGENT
 * Determines search intent (Informational vs Commercial vs Transactional) to select the exact right monetization action.
 */
export function detectSearchIntentAndAudience(
  title: string,
  content: string = "",
  category: string = "",
  userGeo: string = "GLOBAL"
): IntentAudienceResult {
  const combined = `${title} ${content} ${category}`.toLowerCase();

  // 1. Detect Intent
  let searchIntent: SearchIntentType = "INFORMATIONAL";
  let funnelStage: "TOP" | "MIDDLE" | "BOTTOM" = "TOP";
  let ctaStrength: "SOFT" | "MEDIUM" | "HIGH" | "URGENT" = "SOFT";
  let recommendedPrimaryAction: IntentAudienceResult["recommendedPrimaryAction"] = "EMAIL_CAPTURE_FIRST";

  if (/review|vs|comparison|best|top|alternative|which is better|bonus code|promo code|discount/i.test(combined)) {
    searchIntent = "COMMERCIAL";
    funnelStage = "MIDDLE";
    ctaStrength = "HIGH";
    recommendedPrimaryAction = "COMPARISON_TABLE_CTA";
  }

  if (/signup|login|register|claim bonus|deposit|buy now|pass challenge|instant funding|get started/i.test(combined)) {
    searchIntent = "TRANSACTIONAL";
    funnelStage = "BOTTOM";
    ctaStrength = "URGENT";
    recommendedPrimaryAction = "DIRECT_BONUS_SIGNUP";
  }

  if (/what is|how to|tutorial|psychology|guide|understanding|meaning|explained|why do/i.test(combined) && !/review|vs|best/i.test(combined)) {
    searchIntent = "INFORMATIONAL";
    funnelStage = "TOP";
    ctaStrength = "SOFT";
    recommendedPrimaryAction = "EDUCATIONAL_SOFT_CTA";
  }

  // 2. Multi-Offer Scoring Engine
  // Score = (Intent × 0.4) + (GEO × 0.3) + (Relevance × 0.2) + (Commission × 0.1)
  const offers = [
    {
      partnerName: "Pocket Option Quick Trading & Signals",
      affiliateUrl: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      promoCode: "50START",
      hookHeadline: "Claim 50% Instant Deposit Match + Copy 1% Master Traders",
      ctaButton: "Claim 50% Deposit Match (Code: 50START) →",
      baseRelevance: /pocket|binary|quick trad|deposit bonus|50start|signals|scalping|candle|96%|options/i.test(combined) ? 9.8 : 4.0,
      geoMatch: /india|nigeria|brazil|uae|uk|asia|global/i.test(userGeo) ? 9.5 : 7.0,
      commissionPayout: 9.0, // High recurring CPA/RevShare
    },
    {
      partnerName: "Delta Exchange Crypto Derivatives",
      affiliateUrl: "https://www.delta.exchange/?code=YXQSZA",
      promoCode: "YXQSZA",
      hookHeadline: "Trade BTC & ETH Options with 100x Leverage & 10% Lifetime Fee Discount",
      ctaButton: "Trade Crypto Options (Code: YXQSZA) →",
      baseRelevance: /crypto|bitcoin|btc|eth|ethereum|delta|derivative|option chain|leverage|altcoin/i.test(combined) ? 9.7 : 3.5,
      geoMatch: /india|usa|uk|singapore|uae|global/i.test(userGeo) ? 9.2 : 7.5,
      commissionPayout: 9.5, // 15% fee revshare + volume rebates
    },
    {
      partnerName: "CoinSwitch Pro INR Trading Terminal",
      affiliateUrl: "https://coinswitch.co/pro/signup?code=NLfEITW",
      promoCode: "NLfEITW",
      hookHeadline: "Trade 100+ Crypto Pairs with Instant UPI/IMPS INR Gateway (0.05% Lowest Fees)",
      ctaButton: "Open CoinSwitch Pro Terminal (Code: NLfEITW) →",
      baseRelevance: /coinswitch|inr|rupee|upi|indian|india|crypto trading|tax/i.test(combined) ? 9.9 : 3.0,
      geoMatch: /india|in/i.test(userGeo) ? 10.0 : 4.0,
      commissionPayout: 8.0,
    },
    {
      partnerName: "Funded Trader Markets ($200k Challenge)",
      affiliateUrl: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
      promoCode: "SMARTMAG",
      hookHeadline: "Trade Up to $200,000 Capital with Instant Scaling & Zero Time Limits",
      ctaButton: "Start $200k Funded Challenge (Code: SMARTMAG) →",
      baseRelevance: /prop firm|funded|challenge|scaling|drawdown|ftm|ck capital|forex|futures/i.test(combined) ? 9.8 : 3.8,
      geoMatch: 9.0,
      commissionPayout: 9.0,
    },
    {
      partnerName: "Amazon Associates Workstation Hardware",
      affiliateUrl: "https://amzn.to/3UXVtTR",
      promoCode: "autoaiblog-21",
      hookHeadline: "Top Curated Developer Hardware, 4K Monitors & RTX 4090 Workstations",
      ctaButton: "View Top Developer Deals on Amazon →",
      baseRelevance: /gpu|laptop|macbook|monitor|hardware|setup|keyboard|workstation|server/i.test(combined) ? 9.5 : 2.5,
      geoMatch: 8.5,
      commissionPayout: 6.5,
    },
  ];

  const intentMultiplier = searchIntent === "TRANSACTIONAL" ? 10 : searchIntent === "COMMERCIAL" ? 8.5 : 5.0;

  const scoredOffers = offers.map((off) => {
    const intentW = intentMultiplier * 0.4;
    const geoW = off.geoMatch * 0.3;
    const relW = off.baseRelevance * 0.2;
    const comW = off.commissionPayout * 0.1;
    const totalScore = parseFloat((intentW + geoW + relW + comW).toFixed(2));

    return {
      partnerName: off.partnerName,
      affiliateUrl: off.affiliateUrl,
      promoCode: off.promoCode,
      calculatedScore: totalScore,
      scoreBreakdown: {
        intentWeight: intentW,
        geoWeight: geoW,
        relevanceWeight: relW,
        commissionWeight: comW,
      },
      hookHeadline: off.hookHeadline,
      ctaButton: off.ctaButton,
    };
  }).sort((a, b) => b.calculatedScore - a.calculatedScore);

  const winningOffer = scoredOffers[0];

  // 3. Construct Complete Compliance & Trust Agent Output
  const complianceTrustBlock = {
    affiliateDisclosure: "Disclosure: SmartMag Tech Chronicle participates in verified partner & affiliate programs. When you click our partner links or use promo codes, we may earn an affiliate commission at zero additional cost to you.",
    riskDisclaimer: "Financial Risk Notice: Derivatives, options, and prop trading challenges involve substantial risk of capital loss. Past performance is not indicative of future returns. Trade only with risk capital you can afford to lose.",
    geoRestrictionsNote: "Eligibility: Offers and registration bonuses are subject to local regional regulations and terms of service.",
  };

  // 4. Construct Complete SEO Architecture (Schemas, Meta, Internal Linking)
  const seoArchitecture = {
    targetH1: `${title} (2026 In-Depth Analysis & Benchmarks)`,
    metaDescription: `Comprehensive breakdown of ${title}. Discover architectural insights, latency benchmarks, step-by-step setup guides, and exclusive partner benefits.`,
    faqSchema: [
      {
        question: `What are the key advantages of ${title}?`,
        answer: `In our production benchmarks, ${title} provides measurable performance optimizations, streamlined risk controls, and proven execution reliability.`,
      },
      {
        question: `How do I claim exclusive partner bonuses or fee discounts?`,
        answer: `Use verified promo codes like 50START, YXQSZA, NLfEITW, or SMARTMAG when registering through our direct partner links.`,
      },
      {
        question: `Is this suitable for beginner and professional traders?`,
        answer: `Yes, platforms provide both risk-free demo sandboxes and high-tier institutional tools depending on your experience level.`,
      },
    ],
    suggestedInternalLinks: [
      { keyword: "Trading Psychology & Risk Rules", anchorText: "Master Trading Psychology & Risk Management", targetSlug: "trading-psychology-risk-rules" },
      { keyword: "Crypto Options & Derivatives Guide", anchorText: "Complete 2026 Crypto Options & Derivatives Guide", targetSlug: "crypto-options-derivatives-guide" },
      { keyword: "Top 7 Prop Firms Tested", anchorText: "Best Prop Trading Firms Ranked for 2026", targetSlug: "best-prop-trading-firms-2026" },
      { keyword: "Pocket Option Quick Trading Strategies", anchorText: "Pocket Option 50% Bonus & Scalping Strategies", targetSlug: "pocket-option-quick-trading-strategy" },
    ],
    relatedTopicClusters: [
      "Algorithmic Trading & Automated Signals",
      "Crypto Options & Derivatives Hedging",
      "Prop Firm Challenge Evaluation Rules",
      "High-Yield Scalping Technical Indicators",
    ],
  };

  return {
    searchIntent,
    funnelStage,
    ctaStrength,
    recommendedPrimaryAction,
    icpName: winningOffer.calculatedScore > 7.5 ? "High-Intent Trader & Developer" : "Editorial Researcher",
    segment: /pocket/i.test(winningOffer.partnerName) ? "DAY_TRADER" : /delta|coinswitch/i.test(winningOffer.partnerName) ? "CRYPTO_DEGEN" : /funded/i.test(winningOffer.partnerName) ? "PROP_TRADER" : "AI_DEV",
    demographics: {
      primaryCountries: ["India", "USA", "UK", "UAE", "Singapore", "Canada"],
      avgAgeRange: "22 - 45",
      purchasingPower: "HIGH",
    },
    corePainPoints: [
      "Lacks direct low-fee liquidity gateways and reliable algorithmic signals",
      "Needs capital scaling without aggressive drawdown traps",
      "Wants instant zero-fee withdrawals via Crypto & UPI",
    ],
    buyingTriggers: [
      winningOffer.hookHeadline,
      "Instant 50% balance match with promo code 50START",
      "100x leverage with 10% lifetime fee discount (Code: YXQSZA)",
    ],
    offerScoringEngine: scoredOffers,
    winningOffer: {
      partnerName: winningOffer.partnerName,
      affiliateUrl: winningOffer.affiliateUrl,
      promoCode: winningOffer.promoCode,
      hookHeadline: winningOffer.hookHeadline,
      ctaButton: winningOffer.ctaButton,
      score: winningOffer.calculatedScore,
    },
    complianceTrustBlock,
    seoArchitecture,
    recommendedChannels: {
      subreddits: ["r/CryptoCurrency", "r/FuturesTrading", "r/Forex", "r/IndianStockMarket", "r/programming"],
      twitterHashtags: ["#Trading", "#Crypto", "#PocketOption", "#DeltaExchange", "#PropFirm"],
      telegramTopics: ["VIP Trading Signals", "Crypto Options Daily", "Funded Traders Hub"],
      adTargetKeywords: ["best trading platform 2026", "crypto options discount", "pocket option promo code 50start", "funded trader markets review"],
    },
  };
}
