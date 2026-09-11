export interface PropFirmOffer {
  id: string;
  name: string;
  category: "Prop Trading" | "Crypto Derivatives" | "Trading & Binary";
  slug: string;
  rating: number;
  reviewCount: number;
  promoCode: string;
  discountSummary: string;
  payoutModel: string;
  targetUrl: string;
  profitSplit: string;
  maxFunding: string;
  minTradingDays: string;
  dailyDrawdown: string;
  maxDrawdown: string;
  leverage: string;
  platforms: string[];
  features: string[];
  pros: string[];
  cons: string[];
  startingPriceUSD: number;
  highlightBadge: string;
}

export interface BuyerKeyword {
  keyword: string;
  searchIntent: "BUYER_TRANSACTIONAL" | "COMMERCIAL_INVESTIGATION" | "INFORMATIONAL";
  difficulty: "LOW" | "MEDIUM" | "HIGH";
  estimatedMonthlySearches: number;
  targetFirm: string;
  suggestedSlug: string;
}

export interface CompetitorBenchmark {
  competitor: string;
  ourAlternative: string;
  feeDifferenceUSD: number;
  timeLimitComparison: string;
  payoutSpeedComparison: string;
  ourCompetitiveEdge: string;
}

export interface YouTubeShortScript {
  id: string;
  title: string;
  targetFirm: string;
  durationSeconds: 30 | 60;
  hook: string;
  bodyScenes: { timestamp: string; visualPrompt: string; voiceoverScript: string }[];
  callToAction: string;
  promoCode: string;
  pinnedCommentText: string;
  hashtags: string[];
}

export interface EmailFunnelSequence {
  sequenceName: string;
  targetAudience: string;
  emails: {
    dayOffset: number;
    subjectLine: string;
    previewText: string;
    bodyMarkdown: string;
    ctaButtonText: string;
    ctaTargetUrl: string;
    discountNotice: string;
  }[];
}

export interface SocialDistributionPost {
  platform: "Reddit" | "Twitter/X" | "LinkedIn" | "Telegram" | "Quora";
  targetChannelOrSubreddit: string;
  headline: string;
  content: string;
  callToActionUrl: string;
  promoCode: string;
  status: "PENDING_REVIEW" | "APPROVED" | "PUBLISHED";
  generatedAt: string;
}

export interface ABTestExperiment {
  id: string;
  element: "HERO_HEADLINE" | "CTA_BUTTON" | "DISCOUNT_BADGE" | "PRICING_TABLE";
  targetFirm: string;
  variantA: { copy: string; color?: string; clicks: number; conversions: number };
  variantB: { copy: string; color?: string; clicks: number; conversions: number };
  activeVariant: "A" | "B";
  winningVariant?: "A" | "B";
  confidenceScore: number;
}

export interface PropFlowSwarmReport {
  timestamp: string;
  orchestratorStatus: "COMPLETED" | "RUNNING" | "FAILED";
  dailyOpportunitiesFound: number;
  keywordsScouted: BuyerKeyword[];
  competitorBenchmarks: CompetitorBenchmark[];
  reviewPagesUpdated: number;
  shortsGenerated: YouTubeShortScript[];
  emailSequencesReady: number;
  socialCampaigns: SocialDistributionPost[];
  abTestStatus: ABTestExperiment[];
  totalAffiliateOffersMonitored: number;
  humanReviewPendingCount: number;
  executionDurationSeconds: number;
}
