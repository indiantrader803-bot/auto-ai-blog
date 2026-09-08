"use client";

import { ShoppingBag, Star, ExternalLink, ShieldCheck, Zap, ArrowRight, Flame } from "lucide-react";

export interface AmazonProduct {
  id: string;
  name: string;
  category: string;
  priceUSD: string;
  priceINR: string;
  rating: number;
  reviewCount: string;
  image: string;
  affiliateUrl: string;
  badge: string;
  features: string[];
}

export const TOP_AMAZON_PICKS: AmazonProduct[] = [
  {
    id: "amz_macbook",
    name: "Apple MacBook Pro 16\" (M3/M4 Max, 64GB Unified RAM)",
    category: "Developer Workstation",
    priceUSD: "$2,899",
    priceINR: "₹2,49,990",
    rating: 4.9,
    reviewCount: "3,820+",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "EDITOR'S TOP CHOICE",
    features: ["Liquid Retina XDR Display", "22-Hour Battery Life", "Local 70B LLM Inference Ready"],
  },
  {
    id: "amz_gpu",
    name: "NVIDIA GeForce RTX 4090 OC Edition (24GB GDDR6X)",
    category: "AI & Deep Learning",
    priceUSD: "$1,799",
    priceINR: "₹1,85,000",
    rating: 4.9,
    reviewCount: "2,450+",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/4gJpL5u",
    badge: "ULTRA HIGH PERFORMANCE",
    features: ["Ada Lovelace Architecture", "Tensor RT LLM Acceleration", "4K 240Hz Ray Tracing"],
  },
  {
    id: "amz_monitor",
    name: "Dell UltraSharp 40\" Curved WUHD 5K2K Thunderbolt Hub Monitor",
    category: "Multi-Chart Trading",
    priceUSD: "$1,499",
    priceINR: "₹1,35,000",
    rating: 4.8,
    reviewCount: "1,190+",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3VjFaRp",
    badge: "PRO TRADER SETUP",
    features: ["120Hz IPS Black Panel", "Integrated 140W Power Delivery", "100% sRGB & DCI-P3 Color"],
  },
  {
    id: "amz_keyboard",
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    category: "Ergonomics & Typing",
    priceUSD: "$199",
    priceINR: "₹17,499",
    rating: 4.9,
    reviewCount: "5,120+",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    affiliateUrl: "https://amzn.to/3UXVtTR",
    badge: "BEST MECHANICAL KEYBOARD",
    features: ["Full CNC Aluminum Body", "Hot-Swappable Switches", "Bluetooth 5.1 & QMK/VIA Support"],
  },
];

export default function AmazonAffiliateShowcase() {
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
          },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  return (
    <section className="my-14 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3" />
              Official Amazon Associates Deals
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Store Tag: <strong className="text-amber-300 font-mono">autoaiblog-21</strong>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            Curated Developer, AI &amp; Pro Trading Gear
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Top hardware benchmarks vetted by our research lab with Prime 1-day delivery and live price drops.
          </p>
        </div>

        <a
          href="https://amzn.to/3UXVtTR"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <span>View All Amazon Deals</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {TOP_AMAZON_PICKS.map((product) => (
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
                <div className="text-sm font-black text-amber-300 font-mono">{product.priceUSD}</div>
                <div className="text-[10px] text-slate-400 font-mono">{product.priceINR}</div>
              </div>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAmazonClick(product)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shadow-md transition-all shrink-0"
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
