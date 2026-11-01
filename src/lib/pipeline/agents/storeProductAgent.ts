import { prisma } from "@/lib/prisma";

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
  };
  features: string[];
  activeCoupon?: {
    code: string;
    discountPercent: number;
    finalPriceINR: number;
    finalPriceUSD: number;
    bannerText: string;
  };
}

export const BASE_PRODUCTS: StoreProductItem[] = [
  // 1. Physical Hardware Dropshipping
  {
    id: "mechanical-trading-macropad",
    title: "Mechanical Macro RGB 9-Key Trading & Coding Numpad",
    tagline: "Hot-swappable Custom Linear Switches & Dual CNC Rotary Dial for Instant Order Execution",
    priceINR: 1999,
    originalPriceINR: 3999,
    priceUSD: 24.99,
    originalPriceUSD: 49.99,
    badge: "HOT DROPSHIP",
    category: "Trader Gear",
    isPhysical: true,
    stock: 48,
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Stealth Black", colorHex: "#1e293b" },
      { name: "Cyber White", colorHex: "#f8fafc" },
      { name: "Neon Purple", colorHex: "#7e22ce" },
    ],
    shippingDetails: {
      origin: "Verified Shenzhen Logistics Hub",
      estimatedDelivery: "5 - 9 Business Days",
      shippingCost: "FREE Air Express",
      carrier: "DHL Express / BlueDart",
    },
    features: [
      "Smooth metal CNC rotary dial for precision timeline and zoom scrolling",
      "9 fully programmable mechanical Gateron yellow linear switches",
      "Per-key RGB backlight with on-board memory profiles (no drivers needed)",
      "Detachable Type-C braided cable compatible with Mac & Windows",
      "Direct dropship door-to-door courier delivery with live tracking",
    ],
  },
  {
    id: "magsafe-travel-charger",
    title: "3-in-1 Foldable MagSafe Fast Travel Wireless Charging Stand",
    tagline: "Charge iPhone, Apple Watch & AirPods Simultaneously with 15W Qi2 Support",
    priceINR: 2199,
    originalPriceINR: 4299,
    priceUSD: 28.99,
    originalPriceUSD: 59.99,
    badge: "BESTSELLER TECH",
    category: "Apple Accessories",
    isPhysical: true,
    stock: 65,
    rating: 4.8,
    reviewsCount: 540,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Titanium Gray", colorHex: "#475569" },
      { name: "Polar White", colorHex: "#f1f5f9" },
    ],
    shippingDetails: {
      origin: "Global Fulfillment Hub",
      estimatedDelivery: "6 - 10 Business Days",
      shippingCost: "FREE Global Express",
      carrier: "FedEx International / Delhivery",
    },
    features: [
      "Foldable pocket-size aircraft-grade aluminum hinges for digital nomads",
      "Official 15W MagSafe ultra-fast wireless charging certification",
      "Intelligent temperature control chip & foreign object detection",
      "Includes 20W GaN PD wall adapter + braided USB-C cable in the box",
      "Global door-to-door express dropship delivery with tracking number",
    ],
  },
  {
    id: "algo-trading-desk-pad",
    title: "Pro Trader & Quant Extended Desk Mat (900x400mm)",
    tagline: "Ultra-Smooth High-Precision Rubber Surface with Financial & Forex Keybinds",
    priceINR: 1299,
    originalPriceINR: 2499,
    priceUSD: 19.99,
    originalPriceUSD: 39.99,
    badge: "PHYSICAL DROPSHIP",
    category: "Trader Gear",
    isPhysical: true,
    stock: 120,
    rating: 4.9,
    reviewsCount: 428,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Deep Charcoal Black", colorHex: "#0f172a" },
      { name: "Quant Matrix Navy", colorHex: "#1e1b4b" },
    ],
    shippingDetails: {
      origin: "Central Warehouse Dispatch",
      estimatedDelivery: "4 - 7 Business Days",
      shippingCost: "FREE Tracked Delivery",
      carrier: "BlueDart / IndiaPost Express",
    },
    features: [
      "High-density anti-fray stitched edges & natural non-slip rubber base",
      "Printed candlestick chart patterns & algorithmic cheat-sheet overlay",
      "Waterproof coating for long 12-hour high-focus trading sessions",
      "Worldwide express courier delivery with live tracking",
      "30-day money-back guarantee & zero-risk quality assurance",
    ],
  },
  {
    id: "digital-nomad-esim-adapter",
    title: "Global Travel Smart 65W GaN Worldwide Universal Travel Adapter",
    tagline: "Works in 180+ Countries: USA, UK, EU, AUS & Asia with Dual USB-C PD Ports",
    priceINR: 1799,
    originalPriceINR: 3499,
    priceUSD: 24.99,
    originalPriceUSD: 49.99,
    badge: "TRAVEL ESSENTIAL",
    category: "Travel Gear",
    isPhysical: true,
    stock: 84,
    rating: 4.9,
    reviewsCount: 389,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Midnight Black", colorHex: "#09090b" },
      { name: "Arctic White", colorHex: "#ffffff" },
    ],
    shippingDetails: {
      origin: "Travel Tech Center",
      estimatedDelivery: "5 - 8 Business Days",
      shippingCost: "FREE Priority Post",
      carrier: "DHL / Express Mail",
    },
    features: [
      "65W high-speed GaN fast-charge for MacBook Pro, iPad & iPhone",
      "Patented slider locking mechanism compatible across all global wall plugs",
      "Dual USB-C Power Delivery + Dual USB-A QC 3.0 ports",
      "Built-in 10A auto-resetting ceramic safety fuse for surge protection",
      "Express dropshipping fulfillment direct to your doorstep",
    ],
  },
  {
    id: "curved-screen-monitor-lightbar",
    title: "Smart RGB Ambient Monitor Screen Light Bar with Wireless Puck",
    tagline: "Zero Screen Glare & Asymmetric Optical Design for Late-Night Desks",
    priceINR: 2799,
    originalPriceINR: 5499,
    priceUSD: 36.99,
    originalPriceUSD: 72.99,
    badge: "DESK UPGRADE",
    category: "Hardware",
    isPhysical: true,
    stock: 35,
    rating: 4.9,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Matte Black Aluminum", colorHex: "#18181b" },
      { name: "Space Silver", colorHex: "#94a3b8" },
    ],
    shippingDetails: {
      origin: "Electronics Dropship Hub",
      estimatedDelivery: "6 - 10 Business Days",
      shippingCost: "FREE Insured Freight",
      carrier: "FedEx Express / BlueDart",
    },
    features: [
      "Asymmetric optical projection illuminates desk surface without screen reflection",
      "Wireless 2.4GHz desktop controller puck for stepless brightness & color temp",
      "Backlight dynamic RGB ambient lighting with music sync modes",
      "Weighted clamp securely fits curved and flat gaming monitors (10-32 inches)",
      "Premium dropship express packaging direct to your home",
    ],
  },
  {
    id: "crypto-hardware-seed-backup",
    title: "Fireproof & Waterproof Titanium Crypto Recovery Seed Plate",
    tagline: "Indestructible Grade-5 Titanium Storage for 12/24 BIP39 Seed Phrases",
    priceINR: 2499,
    originalPriceINR: 4999,
    priceUSD: 34.99,
    originalPriceUSD: 69.99,
    badge: "MAX SECURITY",
    category: "Crypto Security",
    isPhysical: true,
    stock: 75,
    rating: 5.0,
    reviewsCount: 260,
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Brushed Titanium", colorHex: "#64748b" },
      { name: "Obsidian Black Coating", colorHex: "#020617" },
    ],
    shippingDetails: {
      origin: "Discreet Packaging Depot",
      estimatedDelivery: "5 - 8 Business Days",
      shippingCost: "FREE Discreet Shipping",
      carrier: "Private Courier Express",
    },
    features: [
      "Melting point above 1,660°C (3,000°F) — survives structural house fires",
      "Laser-engraved grid compatible with Trezor, Ledger, Tangem & Metamask",
      "Includes tungsten carbide engraving pen & tamper-evident security seals",
      "Zero digital footprint — 100% offline cold-storage redundancy",
      "Discreet dropship worldwide packaging for ultimate privacy",
    ],
  },

  // 2. High-Margin Digital Quant Systems
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
    },
    features: [
      "500+ battle-tested system prompts for Claude 4.5, GPT-4o & Gemini 2",
      "Algorithmic trading & options backtesting prompt scripts",
      "SEO programmatic content generation blueprints",
      "Code refactoring & unit-test automation prompts",
      "Lifetime free updates + instant PDF/Markdown delivery",
    ],
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
    category: "Business Suite",
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
    },
    features: [
      "Full client proposal decks, contracts & SOW agreements",
      "Autonomous agent multi-platform setup documentation",
      "Cold outreach scripts that close $2,000/mo retainer clients",
      "Private Discord Mastermind VIP invite",
      "Immediate cloud access dispatched to customer email",
    ],
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
  let banner = "🔥 Grand Launch: Use code GLOBAL30 for 30% OFF ($ / ₹) storewide!";

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
