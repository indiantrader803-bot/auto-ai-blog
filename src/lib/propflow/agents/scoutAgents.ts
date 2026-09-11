import { BuyerKeyword, CompetitorBenchmark } from "../types";

export async function runTrendingScoutAgent() {
  const opportunities = [
    {
      source: "Reddit (r/PropFirm)",
      topic: "Traders comparing Atlas Funded vs AquaFunded payout turnaround times",
      viralityScore: 94,
      targetFirm: "Atlas Funded",
      recommendedAction: "Publish comparison review featuring code '12275' (20% off)",
    },
    {
      source: "YouTube (Forex Trading Shorts)",
      topic: "How to pass Funded Trader Markets evaluation with 0 minimum trading days",
      viralityScore: 91,
      targetFirm: "Funded Trader Markets",
      recommendedAction: "Create 60s short script explaining 0-time-limit rule with code 'arnab'",
    },
    {
      source: "X (Crypto Derivatives & Prop Trends)",
      topic: "Pocket Option 50% match bonus strategies for small balance accounts",
      viralityScore: 88,
      targetFirm: "Pocket Option",
      recommendedAction: "Dispatch Twitter thread breakdown with promo code '50START'",
    },
    {
      source: "Google Trends",
      topic: "Best prop firm discounts and instant scaling challenges 2026",
      viralityScore: 96,
      targetFirm: "All Verified Firms",
      recommendedAction: "Update /best-prop-firms leaderboard with filterable table",
    },
  ];

  return {
    agentName: "Trending Scout Agent",
    status: "SUCCESS",
    timestamp: new Date().toISOString(),
    topOpportunities: opportunities,
    totalScouted: opportunities.length,
  };
}

export async function runKeywordHunterAgent(): Promise<{
  agentName: string;
  keywords: BuyerKeyword[];
  summary: string;
}> {
  const keywords: BuyerKeyword[] = [
    {
      keyword: "atlas funded promo code 2026",
      searchIntent: "BUYER_TRANSACTIONAL",
      difficulty: "LOW",
      estimatedMonthlySearches: 4800,
      targetFirm: "Atlas Funded",
      suggestedSlug: "/reviews/atlas-funded",
    },
    {
      keyword: "aquafunded discount code 20 off",
      searchIntent: "BUYER_TRANSACTIONAL",
      difficulty: "LOW",
      estimatedMonthlySearches: 5200,
      targetFirm: "AquaFunded",
      suggestedSlug: "/reviews/aquafunded",
    },
    {
      keyword: "funded trader markets review coupon",
      searchIntent: "COMMERCIAL_INVESTIGATION",
      difficulty: "MEDIUM",
      estimatedMonthlySearches: 6100,
      targetFirm: "Funded Trader Markets",
      suggestedSlug: "/reviews/funded-trader-markets",
    },
    {
      keyword: "ftmo vs funded trader markets comparison",
      searchIntent: "COMMERCIAL_INVESTIGATION",
      difficulty: "LOW",
      estimatedMonthlySearches: 3900,
      targetFirm: "Funded Trader Markets",
      suggestedSlug: "/compare/ftmo-vs-ftm",
    },
    {
      keyword: "best prop firms with no time limit",
      searchIntent: "INFORMATIONAL",
      difficulty: "LOW",
      estimatedMonthlySearches: 12500,
      targetFirm: "All Verified Firms",
      suggestedSlug: "/best-prop-firms",
    },
  ];

  return {
    agentName: "Keyword Hunter Agent",
    keywords,
    summary: `Identified ${keywords.length} high-intent buyer keywords with combined ~32,500 monthly search volume.`,
  };
}

export async function runCompetitorIntelAgent(): Promise<{
  agentName: string;
  benchmarks: CompetitorBenchmark[];
}> {
  const benchmarks: CompetitorBenchmark[] = [
    {
      competitor: "FTMO ($100k Challenge: $540 EUR)",
      ourAlternative: "Funded Trader Markets ($100k Challenge: ~$450 USD with code 'arnab')",
      feeDifferenceUSD: 140,
      timeLimitComparison: "FTMO requires structured periods, FTM has ZERO minimum trading days",
      payoutSpeedComparison: "FTM executes on-demand payouts within 24 hours vs FTMO 14-day schedule",
      ourCompetitiveEdge: "Save up to $140 upfront + 10% lifetime fee rebate with code arnab",
    },
    {
      competitor: "FundingPips ($100k Challenge: $399 USD)",
      ourAlternative: "Atlas Funded ($100k Challenge: ~$320 USD with code '12275')",
      feeDifferenceUSD: 79,
      timeLimitComparison: "Atlas Funded includes $5 Free Challenge Pass tokens on every tier",
      payoutSpeedComparison: "Instant scaling program available upon 1st cycle pass",
      ourCompetitiveEdge: "20% flat discount code '12275' provides lowest entry challenge price",
    },
    {
      competitor: "MyFundedFX ($100k Challenge: $450 USD)",
      ourAlternative: "AquaFunded ($100k Challenge: ~$360 USD with code '6e9')",
      feeDifferenceUSD: 90,
      timeLimitComparison: "AquaFunded offers 1-step rapid evaluation with 90% profit split",
      payoutSpeedComparison: "14-day direct crypto/bank settlement",
      ourCompetitiveEdge: "Up to 20% discount rebate with code '6e9'",
    },
  ];

  return {
    agentName: "Competitor Intelligence Agent",
    benchmarks,
  };
}
