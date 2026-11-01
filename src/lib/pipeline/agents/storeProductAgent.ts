import { prisma } from "@/lib/prisma";
import { VIRAL_DROPSHIP_CATALOG } from "./dropshipHunterAgent";

export interface StoreProductVariant {
  name: string; // e.g. "Space Gray", "Matte Black", "Silver", "65W GaN"
  colorHex?: string;
  image?: string;
}

export interface StoreProductItem {
  id: string;
  title: string;
  tagline: string;
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  originalPriceUSD: number;
  badge: string;
  category: string;
  isPhysical: boolean;
  stock: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  colors: StoreProductVariant[];
  shippingDetails: {
    origin: string;
    estimatedDelivery: string;
    shippingCost: string;
    carrier: string;
    supportedCountries?: string[];
  };
  features: string[];
  supplier?: string;
  supplierOrigin?: string;
  trendVelocity?: string;
  monthlySearchVolume?: string;
  activeCoupon?: {
    code: string;
    discountPercent: number;
    finalPriceINR: number;
    finalPriceUSD: number;
    bannerText: string;
  };
}

export const BASE_PRODUCTS: StoreProductItem[] = [
  ...VIRAL_DROPSHIP_CATALOG,

  // High-Margin Digital Quant Systems & Developer Toolkits
  {
    id: "ai-prompt-pack",
    title: "500+ Ultimate AI Prompt PowerPack 2026",
    tagline: "Tested Production Prompts for Developers, Traders & Marketers",
    priceINR: 299,
    originalPriceINR: 1499,
    priceUSD: 4.99,
    originalPriceUSD: 24.99,
    badge: "BESTSELLER",
    category: "AI & Quant Toolkits",
    isPhysical: false,
    stock: 9999,
    rating: 4.9,
    reviewsCount: 890,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [{ name: "Digital Edition", colorHex: "#6366f1" }],
    shippingDetails: {
      origin: "Instant Cloud Delivery",
      estimatedDelivery: "Instant (0 Seconds)",
      shippingCost: "FREE Instant Download",
      carrier: "Secure Cloud API",
      supportedCountries: ["Worldwide (All Countries)"],
    },
    features: [
      "500+ battle-tested system prompts for Claude 4.5, GPT-4o & Gemini 2",
      "Algorithmic trading & options backtesting prompt scripts",
      "SEO programmatic content generation blueprints",
      "Code refactoring & unit-test automation prompts",
      "Lifetime free updates + instant PDF/Markdown delivery",
    ],
    supplier: "TheSmartMag Enterprise Digital",
    monthlySearchVolume: "520,000+ searches/mo",
  },
  {
    id: "ai-business-toolkit",
    title: "Complete AI Agency & Business Automation Toolkit",
    tagline: "The Full Operational Blueprint for Launching AI Services & Retainers",
    priceINR: 999,
    originalPriceINR: 4999,
    priceUSD: 14.99,
    originalPriceUSD: 69.99,
    badge: "ENTERPRISE COMPLETE",
    category: "AI & Quant Toolkits",
    isPhysical: false,
    stock: 9999,
    rating: 5.0,
    reviewsCount: 610,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [{ name: "Enterprise Suite", colorHex: "#a855f7" }],
    shippingDetails: {
      origin: "Instant Cloud Delivery",
      estimatedDelivery: "Instant (0 Seconds)",
      shippingCost: "FREE Instant Download",
      carrier: "Secure Cloud API",
      supportedCountries: ["Worldwide (All Countries)"],
    },
    features: [
      "Full client proposal decks, contracts & SOW agreements",
      "Autonomous agent multi-platform setup documentation",
      "Cold outreach scripts that close $2,000/mo retainer clients",
      "Private Discord Mastermind VIP invite",
      "Immediate cloud access dispatched to customer email",
    ],
    supplier: "TheSmartMag Enterprise Digital",
    monthlySearchVolume: "380,000+ searches/mo",
  },
];

export interface StoreDiscountState {
  activeCouponCode: string;
  discountPercentage: number;
  bannerHeadline: string;
  expiresInHours: number;
  products: StoreProductItem[];
}

/**
 * 🏷️ Autonomous AI Product & Promotional Discount Engine (Multi-Currency USD & INR)
 */
export function getAutonomousStoreCatalog(): StoreDiscountState {
  const hour = new Date().getHours();
  
  let promoCode = "GLOBAL30";
  let discount = 30;
  let banner = "🔥 Grand Launch: Use code GLOBAL30 for 30% OFF ($ / ₹) storewide + Free Tracked Global Express Shipping!";

  if (hour % 3 === 0) {
    promoCode = "VIP50";
    discount = 50;
    banner = "⚡ Flash Sale: Use code VIP50 for 50% OFF today!";
  } else if (hour % 2 === 0) {
    promoCode = "QUANT40";
    discount = 40;
    banner = "🚀 Developer Pass: Use code QUANT40 for an extra 40% discount!";
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
