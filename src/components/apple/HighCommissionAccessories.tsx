"use client";

import Link from "next/link";
import { HIGH_COMMISSION_ACCESSORIES } from "@/data/appleData";
import { Star, ShoppingBag, ExternalLink, Sparkles, ShieldCheck, ArrowRight, Zap, Check } from "lucide-react";

export default function HighCommissionAccessories() {
  return (
    <section id="accessories" className="py-20 bg-zinc-950 text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> High-Utility Accessories
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Essential Apple Add-Ons.
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base font-light max-w-xl">
              Equip your iPhone 18, Apple Watch Ultra, and MacBook with verified Qi2 MagSafe wireless pads, military drop cases, and high-speed GaN chargers.
            </p>
          </div>

          <Link
            href="/apple/accessories"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>See Full 2026 Gear Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Accessory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGH_COMMISSION_ACCESSORIES.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl group shadow-lg"
            >
              <div>
                {/* Image Box */}
                <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden bg-black/60 border border-white/5 mb-4 flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase font-mono shadow-md">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold font-mono">
                    {item.discountPercent}% OFF
                  </span>
                </div>

                {/* Compatibility and Brand Tag */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="font-mono font-bold text-white uppercase">{item.brand}</span>
                  <span className="text-[11px] truncate max-w-[170px]" title={item.compatibleWith}>
                    {item.compatibleWith}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                  {item.name}
                </h3>

                {/* Ratings */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{item.rating}</span>
                  <span>({item.reviewsCount.toLocaleString()} verified buyers)</span>
                </div>

                {/* Bullet Highlights */}
                <div className="mt-3.5 space-y-1.5 pt-3 border-t border-white/5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-400 leading-snug">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Buy Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-white font-mono">
                      ₹{item.priceInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs line-through text-zinc-500 font-mono">
                      ₹{item.mrpInr.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400">In Stock on {item.retailer}</div>
                </div>

                <a
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="px-4 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-all flex items-center gap-1.5 shadow-md group-hover:scale-105 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy on {item.retailer}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
