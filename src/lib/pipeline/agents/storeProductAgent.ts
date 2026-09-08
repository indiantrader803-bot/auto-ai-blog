import { prisma } from "@/lib/prisma";

export interface DigitalProductItem {
  id: string;
  title: string;
  tagline: string;
  priceINR: number;
  originalPriceINR: number;
  badge: string;
  category: string;
  features: string[];
  activeCoupon?: {
    code: string;
    discountPercent: number;
    finalPriceINR: number;
    bannerText: string;
  };
}

export const BASE_PRODUCTS: DigitalProductItem[] = [
  {
    id: "ai-prompt-pack",
    title: "500+ Ultimate AI Prompt PowerPack 2026",
    tagline: "Tested Production Prompts for Developers, Traders & Marketers",
    priceINR: 299,
    originalPriceINR: 1499,
    badge: "BESTSELLER",
    category: "Prompt Engineering",
    features: [
      "500+ battle-tested system prompts for Claude 4.5, GPT-4o & Gemini 2",
      "Algorithmic trading & options backtesting prompt scripts",
      "SEO programmatic content generation blueprints",
      "Code refactoring & unit-test automation prompts",
      "Lifetime free updates + instant PDF/Markdown delivery",
    ],
  },
  {
    id: "chatgpt-cheat-sheet",
    title: "ChatGPT & LLM Workflow Cheat Sheet 2026",
    tagline: "Visual Desk Reference & Shortcut Playbook",
    priceINR: 299,
    originalPriceINR: 999,
    badge: "POPULAR",
    category: "Cheat Sheets",
    features: [
      "High-density 12-page visual PDF guide",
      "Multi-step prompt chaining & Tree-of-Thought recipes",
      "Context window optimization & token cost reduction tips",
      "API function calling & structured JSON output cheat sheets",
      "Instant printable PDF download",
    ],
  },
  {
    id: "ai-resume-templates",
    title: "ATS-Optimized AI & Software Engineer Resume Templates",
    tagline: "Silicon Valley Verified LaTeX, Word & Notion Templates",
    priceINR: 499,
    originalPriceINR: 1999,
    badge: "CAREER ACCELERATOR",
    category: "Career & Tech",
    features: [
      "10+ ATS-friendly templates (LaTeX, Google Docs, MS Word)",
      "Proven templates that got candidates interviews at Google, Meta & OpenAI",
      "50+ AI & DevOps action verb bullet point examples",
      "Cover letter templates for AI Engineer & Quant Trader roles",
      "100% editable & customizable",
    ],
  },
  {
    id: "ai-business-toolkit",
    title: "Complete AI Agency & Business Automation Toolkit",
    tagline: "The Full Operational Blueprint for Launching AI Services",
    priceINR: 999,
    originalPriceINR: 4999,
    badge: "ENTERPRISE COMPLETE",
    category: "Business Suite",
    features: [
      "All 3 products above included free (Save ₹1,097)",
      "Full client proposal decks, contracts & SOW agreements",
      "Autonomous agent multi-platform setup documentation",
      "Cold outreach scripts that close $2,000/mo retainer clients",
      "Private Discord Mastermind VIP invite",
    ],
  },
];

export interface StoreDiscountState {
  activeCouponCode: string;
  discountPercentage: number;
  bannerHeadline: string;
  expiresInHours: number;
  products: DigitalProductItem[];
}

/**
 * 🏷️ Autonomous AI Product & Promotional Discount Engine
 * Dynamically shifts discount coupons (e.g. "SMART50", "AI2026", "FLASH70") to accelerate conversions.
 */
export function getAutonomousStoreCatalog(): StoreDiscountState {
  // Rotate dynamic promotional coupons based on hour of day
  const hour = new Date().getHours();
  
  let promoCode = "SMARTMAG30";
  let discount = 30;
  let banner = "🔥 Flash Sale: Use code SMARTMAG30 for an extra 30% instant discount!";

  if (hour % 3 === 0) {
    promoCode = "VIP50";
    discount = 50;
    banner = "⚡ AI Founder Special: Use code VIP50 to unlock 50% OFF all toolkits for the next 2 hours!";
  } else if (hour % 2 === 0) {
    promoCode = "QUANT40";
    discount = 40;
    banner = "🚀 Developer & Quant Pass: Use code QUANT40 for an extra 40% discount!";
  }

  const discountedProducts = BASE_PRODUCTS.map((p) => {
    const discountedPrice = Math.round(p.priceINR * (1 - discount / 100));
    return {
      ...p,
      activeCoupon: {
        code: promoCode,
        discountPercent: discount,
        finalPriceINR: discountedPrice,
        bannerText: banner,
      },
    };
  });

  return {
    activeCouponCode: promoCode,
    discountPercentage: discount,
    bannerHeadline: banner,
    expiresInHours: 2,
    products: discountedProducts,
  };
}
