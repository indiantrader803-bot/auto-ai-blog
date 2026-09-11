"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Star, ExternalLink, ShieldCheck, Zap, ArrowRight, Flame, Clock, Sparkles, Filter } from "lucide-react";
import { detectUserCurrency } from "@/lib/utils";

export interface AmazonProduct {
  id: string;
  name: string;
  category: "Developer Hardware" | "Trading Setups" | "Keyboards & Audio" | "AI & Finance Books";
  priceUSD: string;
  priceINR: string;
  rating: number;
  reviewCount: string;
  image: string;
  affiliateUrl: string;
  badge: string;
  discountBadge?: string;
  features: string[];
}

export const EXPANDED_AMAZON_CATALOG: AmazonProduct[] = [
  // 💻 Category: Developer Hardware
  {
    id: "amz_macbook",
    name: "Apple MacBook Pro 16\" (M3/M4 Max, 64GB Unified RAM, 1TB SSD)",
    category: "Developer Hardware",
    priceUSD: "$2,899",
    priceINR: "₹2,49,990",
    rating: 4.9,
    reviewCount: "3,820+",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "DEAL OF THE DAY",
    discountBadge: "Save $200",
    features: ["Liquid Retina XDR Display", "22-Hour Battery Life", "Local 70B LLM Inference Ready"],
  },
  {
    id: "amz_gpu_4090",
    name: "NVIDIA GeForce RTX 4090 OC Edition (24GB GDDR6X)",
    category: "Developer Hardware",
    priceUSD: "$1,799",
    priceINR: "₹1,85,000",
    rating: 4.9,
    reviewCount: "2,450+",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/4gJpL5u",
    badge: "ULTRA COMPUTE",
    discountBadge: "Top Pick",
    features: ["Ada Lovelace Architecture", "Tensor RT LLM Acceleration", "4K 240Hz Ray Tracing"],
  },
  {
    id: "amz_asus_rog",
    name: "ASUS ROG Zephyrus G16 (Intel Core Ultra 9, RTX 4080, OLED)",
    category: "Developer Hardware",
    priceUSD: "$2,299",
    priceINR: "₹2,19,990",
    rating: 4.8,
    reviewCount: "1,640+",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "OLED DISPLAY",
    features: ["2.5K 240Hz ROG Nebula OLED", "CNC Aluminum Chassis", "Thunderbolt 4 & WiFi 7"],
  },
  {
    id: "amz_ssd_samsung",
    name: "Samsung 990 PRO 4TB NVMe M.2 SSD (7450 MB/s Read)",
    category: "Developer Hardware",
    priceUSD: "$319",
    priceINR: "₹28,999",
    rating: 4.9,
    reviewCount: "14,200+",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "HIGH SPEED CACHE",
    features: ["Blazing 7450MB/s Read Speeds", "Nickel-Coated Controller", "Ideal for Heavy Dataset Caching"],
  },

  // 📈 Category: Trading Setups & Multi-Monitors
  {
    id: "amz_monitor_dell",
    name: "Dell UltraSharp 40\" Curved WUHD 5K2K Thunderbolt Hub Monitor",
    category: "Trading Setups",
    priceUSD: "$1,499",
    priceINR: "₹1,35,000",
    rating: 4.8,
    reviewCount: "1,190+",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3VjFaRp",
    badge: "PRO TRADER SETUP",
    discountBadge: "15% Off",
    features: ["120Hz IPS Black Panel", "Integrated 140W Power Delivery", "100% sRGB & DCI-P3 Color"],
  },
  {
    id: "amz_samsung_odyssey",
    name: "Samsung 49\" Odyssey G9 OLED Curved Gaming & Trading Monitor",
    category: "Trading Setups",
    priceUSD: "$1,199",
    priceINR: "₹1,12,000",
    rating: 4.8,
    reviewCount: "3,200+",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3VjFaRp",
    badge: "DUAL QHD 240HZ",
    features: ["0.03ms Response Time", "Dual QHD 32:9 Aspect Ratio", "Quantum Dot OLED Tech"],
  },
  {
    id: "amz_streamdeck",
    name: "Elgato Stream Deck XL (32 Customizable Macro Keys)",
    category: "Trading Setups",
    priceUSD: "$249",
    priceINR: "₹22,999",
    rating: 4.9,
    reviewCount: "18,900+",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "HOT MACRO DESK",
    features: ["1-Touch Order Execution", "Live TradingView & Chart Switching", "Custom LCD Key Feedback"],
  },
  {
    id: "amz_ergo_chair",
    name: "Herman Miller Embody Ergonomic Office Chair",
    category: "Trading Setups",
    priceUSD: "$1,695",
    priceINR: "₹1,58,000",
    rating: 4.9,
    reviewCount: "980+",
    image: "https://images.unsplash.com/photo-1580481077197-28565a0b5f13?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "ERGONOMIC LEADER",
    features: ["Dynamic Pixel Matrix Support", "PostureFit Sacral Spine Alignment", "Breathable Fabric"],
  },

  // 🎧 Category: Keyboards & Audio
  {
    id: "amz_keyboard_keychron",
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    category: "Keyboards & Audio",
    priceUSD: "$199",
    priceINR: "₹17,499",
    rating: 4.9,
    reviewCount: "5,120+",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "BEST KEYBOARD",
    features: ["Full CNC Aluminum Body", "Hot-Swappable Gateron Jupiter Switches", "Bluetooth 5.1 & QMK/VIA"],
  },
  {
    id: "amz_sony_headphones",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    category: "Keyboards & Audio",
    priceUSD: "$399",
    priceINR: "₹29,990",
    rating: 4.8,
    reviewCount: "22,400+",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "DEEP FOCUS NOISE CANCEL",
    features: ["Dual Processor V1 & QN1 ANC", "30-Hour Battery with Fast Charge", "Ultra Clear Mic Calls"],
  },
  {
    id: "amz_logitech_mxmaster",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    category: "Keyboards & Audio",
    priceUSD: "$99",
    priceINR: "₹8,995",
    rating: 4.9,
    reviewCount: "31,800+",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "TOP PRODUCTIVITY",
    features: ["8,000 DPI Any-Surface Sensor", "MagSpeed Electromagnetic Scroll", "Quiet Click Tech"],
  },

  // 📚 Category: AI & Finance Books
  {
    id: "amz_book_quant",
    name: "Advances in Financial Machine Learning (by Marcos López de Prado)",
    category: "AI & Finance Books",
    priceUSD: "$55",
    priceINR: "₹4,200",
    rating: 4.8,
    reviewCount: "1,450+",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "QUANT BIBLE",
    features: ["Backtesting & Overfitting Prevention", "Cross-Validation for Financial Data", "Feature Importance & ML Algos"],
  },
  {
    id: "amz_book_trading_zone",
    name: "Trading in the Zone (by Mark Douglas - Hardcover Edition)",
    category: "AI & Finance Books",
    priceUSD: "$28",
    priceINR: "₹1,850",
    rating: 4.9,
    reviewCount: "16,700+",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "MUST READ FOR TRADERS",
    features: ["Mastering Risk Psychology", "Probabilistic Thinking in Markets", "Eliminating Fear & Greed Biases"],
  },
  {
    id: "amz_book_designing_data",
    name: "Designing Data-Intensive Applications (by Martin Kleppmann)",
    category: "AI & Finance Books",
    priceUSD: "$44",
    priceINR: "₹2,990",
    rating: 4.9,
    reviewCount: "9,800+",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "DISTRIBUTED SYSTEMS",
    features: ["Scalability & Fault Tolerance", "Stream Processing & Event Sourcing", "Consensus & Replication Algos"],
  },
];

export default function AmazonAffiliateShowcase() {
  const [userCurrency, setUserCurrency] = useState<"USD" | "INR">("USD");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [dailyRotationOffset, setDailyRotationOffset] = useState<number>(0);

  useEffect(() => {
    setUserCurrency(detectUserCurrency());
    // Rotate featured products based on day of month
    const day = new Date().getDate();
    setDailyRotationOffset(day % EXPANDED_AMAZON_CATALOG.length);
  }, []);

  const handleAmazonClick = (product: AmazonProduct) => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "AFFILIATE_CLICK",
          metadata: {
            partner: "Amazon Associates",
            storeId: "autoaiblog-21",
            productId: product.id,
            productName: product.name,
            url: product.affiliateUrl,
            category: product.category,
          },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  // Get dynamic daily rotating list
  const rotatedCatalog = [...EXPANDED_AMAZON_CATALOG.slice(dailyRotationOffset), ...EXPANDED_AMAZON_CATALOG.slice(0, dailyRotationOffset)];

  const displayedProducts = selectedCategory === "ALL"
    ? rotatedCatalog
    : rotatedCatalog.filter((p) => p.category === selectedCategory);

  const dealOfTheDay = rotatedCatalog[0];

  return (
    <section className="my-14 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3" />
              Daily Amazon Associates Gear &amp; Deals
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1">
              <Clock className="w-3 h-3" /> Fresh Deals Daily
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            Curated Developer, AI &amp; Pro Trading Gear
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Handpicked hardware, trading monitors, audio gear and quantitative books updated every 24 hours.
          </p>
        </div>

        <a
          href="https://amzn.to/3UXVtTR"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <span>View All Amazon Deals</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none relative z-10">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            selectedCategory === "ALL"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>🔥 Today&apos;s Daily Picks ({EXPANDED_AMAZON_CATALOG.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory("Developer Hardware")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === "Developer Hardware"
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
          }`}
        >
          💻 Developer Hardware
        </button>

        <button
          onClick={() => setSelectedCategory("Trading Setups")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === "Trading Setups"
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
          }`}
        >
          📈 Trading &amp; Multi-Monitors
        </button>

        <button
          onClick={() => setSelectedCategory("Keyboards & Audio")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === "Keyboards & Audio"
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
          }`}
        >
          🎧 Keyboards &amp; Audio
        </button>

        <button
          onClick={() => setSelectedCategory("AI & Finance Books")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === "AI & Finance Books"
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
          }`}
        >
          📚 AI &amp; Finance Books
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-3.5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-amber-400 font-black text-[9px] uppercase tracking-wider border border-amber-500/30">
                  {product.badge}
                </span>
                {product.discountBadge && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-rose-600/90 text-white font-black text-[9px] uppercase tracking-wider shadow">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1.5 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-[10px] text-slate-400 font-medium">({product.reviewCount})</span>
              </div>

              {/* Title */}
              <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 leading-snug">
                {product.name}
              </h3>

              {/* Features */}
              <ul className="space-y-1 mb-4 text-[11px] text-slate-400">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                    <span className="line-clamp-1">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & CTA */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                {userCurrency === "INR" ? (
                  <>
                    <div className="text-sm font-black text-amber-300 font-mono">{product.priceINR}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{product.priceUSD} USD</div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-black text-amber-300 font-mono">{product.priceUSD}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{product.priceINR}</div>
                  </>
                )}
              </div>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={() => handleAmazonClick(product)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
              >
                <span>Buy Amazon</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

