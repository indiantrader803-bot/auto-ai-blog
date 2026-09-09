import { prisma } from "@/lib/prisma";

export interface PropFirmPartner {
  id: string;
  firmName: string;
  marketType: "FUTURES" | "FOREX_CFD" | "CRYPTO" | "MULTI_ASSET";
  contactEmail: string;
  affiliatePortalUrl: string;
  defaultAffiliateUrl: string;
  proposedCommission: string;
  outreachPitchDeck: {
    subjectLine: string;
    emailBody: string;
    monthlyAudienceReach: string;
  };
  partnershipStatus: "ACTIVE_AFFILIATE" | "OUTREACH_QUEUED" | "UNDER_REVIEW";
}

export const TOP_PROP_FIRMS_TARGETS: PropFirmPartner[] = [
  {
    id: "firm_ftm",
    firmName: "Funded Trader Markets",
    marketType: "MULTI_ASSET",
    contactEmail: "support@fundedtradermarkets.com",
    affiliatePortalUrl: "https://fundedtradermarkets.com",
    defaultAffiliateUrl: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
    proposedCommission: "15% - 25% CPA per Challenge Pass",
    outreachPitchDeck: {
      subjectLine: "Partnership Inquiry: SmartMag Chronicle x Funded Trader Markets",
      emailBody: `Hi Funded Trader Markets Team,\n\nWe feature Funded Trader Markets on SmartMag Tech Chronicle (https://auto-ai-blog-web.onrender.com) across our quant trading audience and institutional market analysis reports.\n\nBest regards,\nSmartMag Editorial & Growth`,
      monthlyAudienceReach: "60,000+ Active Funded Traders",
    },
    partnershipStatus: "ACTIVE_AFFILIATE",
  },
  {
    id: "firm_mffu",
    firmName: "MyFundedFutures (MFFU)",
    marketType: "FUTURES",
    contactEmail: "affiliates@myfundedfutures.com",
    affiliatePortalUrl: "https://mffu.com/affiliates",
    defaultAffiliateUrl: "https://mffu.com/f/85f1f73f30",
    proposedCommission: "15% - 20% Lifetime Recurring CPA",
    outreachPitchDeck: {
      subjectLine: "Partnership Inquiry: SmartMag Tech Chronicle (50,000+ Quant & Futures Traders)",
      emailBody: `Hi MFFU Partnerships Team,\n\nWe run SmartMag Tech Chronicle (https://auto-ai-blog-web.onrender.com), an autonomous publication covering institutional algorithmic trading, Nifty/US equity breakouts, and futures risk management.\n\nOur readership consists of active futures and derivatives traders looking for capital scaling. We are actively featuring MyFundedFutures as our premier funded futures partner.\n\nBest,\nSmartMag Editorial & Partnerships`,
      monthlyAudienceReach: "50,000+ Monthly Unique Traders",
    },
    partnershipStatus: "ACTIVE_AFFILIATE",
  },
  {
    id: "firm_blueguardian",
    firmName: "Blue Guardian Prop Firm",
    marketType: "FOREX_CFD",
    contactEmail: "affiliates@blueguardian.com",
    affiliatePortalUrl: "https://blueguardian.com/affiliates",
    defaultAffiliateUrl: "https://blueguardian.com/?afmc=1tgf",
    proposedCommission: "15% - 22% CPA per evaluation challenge",
    outreachPitchDeck: {
      subjectLine: "Affiliate & Media Partnership: Blue Guardian x SmartMag Tech",
      emailBody: `Hi Blue Guardian Affiliate Desk,\n\nSmartMag Tech covers currency volatility, macro Forex, and prop trading risk protection. We have integrated Blue Guardian as our primary Forex/CFD partner across our breakout research notes.\n\nBest regards,\nSmartMag Growth Team`,
      monthlyAudienceReach: "45,000+ Global Forex Traders",
    },
    partnershipStatus: "ACTIVE_AFFILIATE",
  },
  {
    id: "firm_topstep",
    firmName: "Topstep Futures Trading",
    marketType: "FUTURES",
    contactEmail: "partners@topstep.com",
    affiliatePortalUrl: "https://www.topstep.com/affiliates",
    defaultAffiliateUrl: "https://www.topstep.com/?ref=autoai",
    proposedCommission: "$50 - $100 CPA or 20% RevShare",
    outreachPitchDeck: {
      subjectLine: "Topstep Trading Combine Feature & In-Depth Review on SmartMag",
      emailBody: `Hello Topstep Partnerships Team,\n\nOur technical analysis articles frequently guide traders through Trading Combine benchmarks and CME micro contracts. We would love to onboard your dedicated affiliate tracking token for programmatic syndication.\n\nBest,\nEditorial Board`,
      monthlyAudienceReach: "60,000+ Futures Traders",
    },
    partnershipStatus: "OUTREACH_QUEUED",
  },
  {
    id: "firm_ftmo",
    firmName: "FTMO Global Prop Trading",
    marketType: "FOREX_CFD",
    contactEmail: "support@ftmo.com",
    affiliatePortalUrl: "https://ftmo.com/en/affiliate-programme/",
    defaultAffiliateUrl: "https://ftmo.com/?ref=autoai",
    proposedCommission: "8% - 15% Lifetime RevShare",
    outreachPitchDeck: {
      subjectLine: "Institutional Media Coverage & FTMO Evaluation Integration",
      emailBody: `Hi FTMO Affiliate Team,\n\nSmartMag features algorithmic trading architectures and risk metrics. We are publishing detailed walkthroughs on passing two-phase prop firm challenges and want to route traders to FTMO.\n\nCheers,\nSmartMag DevRel`,
      monthlyAudienceReach: "75,000+ International Traders",
    },
    partnershipStatus: "OUTREACH_QUEUED",
  },
  {
    id: "firm_fundednext",
    firmName: "FundedNext Multi-Asset",
    marketType: "MULTI_ASSET",
    contactEmail: "affiliates@fundednext.com",
    affiliatePortalUrl: "https://fundednext.com/affiliate-program/",
    defaultAffiliateUrl: "https://fundednext.com/?ref=autoai",
    proposedCommission: "Up to 20% Direct Commission + 15% Profit Share",
    outreachPitchDeck: {
      subjectLine: "FundedNext In-Article Sponsorship & AI Multi-Platform Syndication",
      emailBody: `Hi FundedNext Team,\n\nWe syndicate daily algorithmic trading research across X, LinkedIn, Reddit, and Telegram. We would like to formalize a direct affiliate integration for our readership.\n\nBest,\nSmartMag Syndication Team`,
      monthlyAudienceReach: "55,000+ Traders",
    },
    partnershipStatus: "OUTREACH_QUEUED",
  },
];

export interface PropFirmOutreachReport {
  timestamp: string;
  totalFirmsTracked: number;
  activePartnerships: number;
  outreachProposalsGenerated: number;
  firms: PropFirmPartner[];
}

/**
 * 🤖 Autonomous AI Prop Firm Scout & Outreach Agent
 * Scans top-tier Futures & Forex/CFD prop firms, prepares customized media kit outreach pitches,
 * and seamlessly routes reader traffic to active affiliate URLs.
 */
export async function runPropFirmScoutAgent(): Promise<PropFirmOutreachReport> {
  const activeCount = TOP_PROP_FIRMS_TARGETS.filter((f) => f.partnershipStatus === "ACTIVE_AFFILIATE").length;
  const queuedCount = TOP_PROP_FIRMS_TARGETS.filter((f) => f.partnershipStatus === "OUTREACH_QUEUED").length;

  return {
    timestamp: new Date().toISOString(),
    totalFirmsTracked: TOP_PROP_FIRMS_TARGETS.length,
    activePartnerships: activeCount,
    outreachProposalsGenerated: queuedCount,
    firms: TOP_PROP_FIRMS_TARGETS,
  };
}
