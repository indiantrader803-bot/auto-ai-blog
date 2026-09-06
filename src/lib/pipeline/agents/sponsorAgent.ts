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
  cpcTier: "HIGH" | "ULTRA" | "MEDIUM";
}

export const VERIFIED_SPONSORS: SponsorDeal[] = [
  {
    id: "sp_cloud_gpu",
    sponsorName: "HyperCompute Cloud GPUs",
    badge: "FEATURED CLOUD SPONSOR",
    tagline: "Deploy On-Demand H100 & RTX 4090 Clusters with 80% Cost Savings",
    description: "Instant serverless GPU provisioning for fine-tuning LLMs, running 70B local inference, and scaling multi-agent swarms with zero idle fees.",
    ctaText: "Claim $100 Free GPU Credits",
    ctaUrl: "https://auto-ai-blog-orpin.vercel.app/admin?ref=gpu_sponsor",
    discountCode: "SMARTMAG2026",
    categoryMatch: ["Artificial Intelligence", "Technology", "Development & Engineering"],
    cpcTier: "ULTRA"
  },
  {
    id: "sp_dev_sec",
    sponsorName: "ArmorGuard Zero-Trust",
    badge: "ENTERPRISE SECURITY PARTNER",
    tagline: "Automated eBPF Observability & Secrets Protection for Kubernetes",
    description: "Eliminate static credentials and enforce kernel-level microsegmentation for AI agent sandboxes and cloud native microservices.",
    ctaText: "Start Free 30-Day Enterprise Trial",
    ctaUrl: "https://auto-ai-blog-orpin.vercel.app/admin?ref=sec_sponsor",
    discountCode: "DEVPASS",
    categoryMatch: ["Development & Engineering", "Technology"],
    cpcTier: "HIGH"
  },
  {
    id: "sp_quant_tools",
    sponsorName: "AlphaSignal Terminal",
    badge: "QUANTITATIVE INTELLIGENCE",
    tagline: "Real-Time NLP Sentiment Streams for Global Equities & Macro Data",
    description: "Institutional-grade sentiment feeds, SEC filing anomaly alerts, and automated Python SDK backtesting for modern trading desks.",
    ctaText: "Access Live Market Data",
    ctaUrl: "https://auto-ai-blog-orpin.vercel.app/admin?ref=quant_sponsor",
    discountCode: "ALPHA2026",
    categoryMatch: ["Finance & Markets"],
    cpcTier: "ULTRA"
  }
];

/**
 * 💰 Sponsor & Ad Monetization Agent
 * Matches the article topic and category with the most profitable, highly contextual sponsor.
 */
export function matchSponsorForArticle(topic: string, category: string, keywords: string[] = []): SponsorDeal {
  const combined = (topic + " " + category + " " + keywords.join(" ")).toLowerCase();

  if (combined.includes("finance") || combined.includes("market") || combined.includes("trade") || combined.includes("quant")) {
    return VERIFIED_SPONSORS[2];
  }

  if (combined.includes("security") || combined.includes("kubernetes") || combined.includes("devops") || combined.includes("docker")) {
    return VERIFIED_SPONSORS[1];
  }

  return VERIFIED_SPONSORS[0]; // Default High-CPC Cloud AI GPU Sponsor
}
