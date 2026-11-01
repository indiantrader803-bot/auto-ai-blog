import { NextResponse } from "next/server";

export interface ScrapedProduct {
  id: string;
  title: string;
  tagline: string;
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  originalPriceUSD: number;
  badge: string;
  category: string;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  supplier: string;
  image: string;
  features: string[];
}

const DROPSHIP_SUPPLIERS = [
  { name: "AliExpress Pro Verified", fulfillmentDays: "7-12 days", tracking: "AliExpress Standard Global" },
  { name: "CJ Dropshipping Global", fulfillmentDays: "5-9 days", tracking: "DHL / CJPacket" },
  { name: "Printify Custom Merch", fulfillmentDays: "3-7 days", tracking: "FedEx / BlueDart" },
];

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { searchQuery = "tech gadgets", maxProducts = 6 } = body;

    // Fast autonomous scraping simulator based on themineworks/aliexpress-product-scraper schema
    const simulatedProducts: ScrapedProduct[] = [
      {
        id: `ali-${Date.now()}-1`,
        title: "Magnetic 10,000mAh Ultra-Slim Wireless Power Bank",
        tagline: "22.5W Fast Charging with LED Digital Display for iPhone & Android",
        priceINR: 1899,
        originalPriceINR: 3999,
        priceUSD: 24.99,
        originalPriceUSD: 49.99,
        badge: "HOT DROPSHIP",
        category: "Mobile Accessories",
        rating: 4.8,
        reviewsCount: 1420,
        ordersCount: 5200,
        supplier: "AliExpress Pro Verified",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
        features: [
          "Strong N52 neodymium magnetic ring auto-aligns with MagSafe",
          "Charges iPhone 15/16 Pro up to 2.2 times on a single charge",
          "Bi-directional 20W PD USB-C fast input and output port",
          "Smart airline approved 37Wh battery certification",
          "Direct door-to-door shipping with live tracking",
        ],
      },
      {
        id: `ali-${Date.now()}-2`,
        title: "Mechanical Macro RGB Macro Gaming & Trading Numpad",
        tagline: "Hot-swappable Custom Switches & Rotary Knob for Chart Navigation",
        priceINR: 2399,
        originalPriceINR: 4799,
        priceUSD: 29.99,
        originalPriceUSD: 59.99,
        badge: "TOP SELLER",
        category: "Desk Setup",
        rating: 4.9,
        reviewsCount: 890,
        ordersCount: 3100,
        supplier: "CJ Dropshipping Global",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
        features: [
          "Programmable hotkeys for MT5 / TradingView instant buy/sell triggers",
          "Gateron yellow smooth linear mechanical switches",
          "Full per-key RGB backlighting with 16 animation modes",
          "Tri-mode connectivity: Bluetooth 5.0, 2.4GHz dongle, and USB-C",
          "Express shipping with damage protection insurance",
        ],
      },
      {
        id: `ali-${Date.now()}-3`,
        title: "Smart Ergonomic Posture Sensor & Vibration Coach",
        tagline: "Real-time Biofeedback Sensor for Long Software Development Sessions",
        priceINR: 1499,
        originalPriceINR: 2999,
        priceUSD: 18.99,
        originalPriceUSD: 39.99,
        badge: "HEALTH & TECH",
        category: "Ergonomics",
        rating: 4.7,
        reviewsCount: 650,
        ordersCount: 2400,
        supplier: "AliExpress Pro Verified",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
        features: [
          "Precision angle sensor vibrates gently when slouching beyond 15 degrees",
          "Lightweight breathable medical silicone strap",
          "21-day continuous battery life per charge",
          "LCD counter records daily slouching incidents to track improvement",
          "Includes free worldwide priority airmail shipping",
        ],
      },
    ];

    return NextResponse.json({
      success: true,
      query: searchQuery,
      productsCount: simulatedProducts.length,
      products: simulatedProducts,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
