import { prisma } from "@/lib/prisma";

export interface DigitalProductItem {
  id: string;
  title: string;
  tagline: string;
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  originalPriceUSD: number;
  badge: string;
  category: string;
  features: string[];
  activeCoupon?: {
    code: string;
    discountPercent: number;
    finalPriceINR: number;
    finalPriceUSD: number;
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
    priceUSD: 4.99,
    originalPriceUSD: 24.99,
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
    priceUSD: 4.99,
    originalPriceUSD: 14.99,
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
    priceUSD: 7.99,
    originalPriceUSD: 29.99,
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
    priceUSD: 14.99,
    originalPriceUSD: 69.99,
    badge: "ENTERPRISE COMPLETE",
    category: "Business Suite",
    features: [
      "All 3 products above included free (Save $45 / ₹1,097)",
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
 * 🏷️ Autonomous AI Product & Promotional Discount Engine (Multi-Currency USD & INR)
 */
export function getAutonomousStoreCatalog(): StoreDiscountState {
  const hour = new Date().getHours();
  
  let promoCode = "GLOBAL30";
  let discount = 30;
  let banner = "🔥 Flash Sale: Use code GLOBAL30 for 30% OFF ($ / ₹) storewide!";

  if (hour % 3 === 0) {
    promoCode = "VIP50";
    discount = 50;
    banner = "⚡ AI Founder Special: Use code VIP50 for 50% OFF all toolkits!";
  } else if (hour % 2 === 0) {
    promoCode = "QUANT40";
    discount = 40;
    banner = "🚀 Global Developer Pass: Use code QUANT40 for an extra 40% discount!";
  }

  const discountedProducts = BASE_PRODUCTS.map((p) => {
    const discountedINR = Math.round(p.priceINR * (1 - discount / 100));
    const discountedUSD = parseFloat((p.priceUSD * (1 - discount / 100)).toFixed(2));
    return {
      ...p,
      activeCoupon: {
        code: promoCode,
        discountPercent: discount,
        finalPriceINR: discountedINR,
        finalPriceUSD: discountedUSD,
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
