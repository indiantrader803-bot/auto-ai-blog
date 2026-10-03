"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppleProduct, APPLE_PRODUCTS } from "@/data/appleData";
import { appleImg } from "@/lib/appleImages";
import { goLink } from "@/lib/goLink";
import { ShoppingBag, ChevronRight, Zap, Shield, Sparkles, ExternalLink, Cpu, Camera, Battery, HardDrive, Check, Star, Palette } from "lucide-react";

export default function IphoneShowcase() {
  const iphones = APPLE_PRODUCTS.filter((p) => p.category === "iphone");
  const [selectedId, setSelectedId] = useState<string>("iphone-18-pro-max");
  const [activeRetailerModal, setActiveRetailerModal] = useState<AppleProduct | null>(null);
  const [finishIdx, setFinishIdx] = useState(0);

  const selectedProduct = iphones.find((p) => p.id === selectedId) || iphones[0];
  const finishes = selectedProduct.finishGallery ?? [];
  const activeFinish = finishes.length > 0 ? finishes[Math.min(finishIdx, finishes.length - 1)] : null;
  const heroSrc = activeFinish ? appleImg(activeFinish.slug, 1200) : selectedProduct.heroImage;

  const selectPhone = (id: string) => {
    setSelectedId(id);
    setFinishIdx(0);
  };

  return (
    <section id="iphone-showcase" className="py-20 bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Flagship Showcase 2026
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            The iPhone 18 Family.
          </h2>
          <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light">
            Engineered with TSMC 2nm A20 Pro silicon, mechanical variable aperture lenses, and seamless Apple Intelligence. Choose your configuration below.
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-6">
          {iphones.map((phone) => (
            <button
              key={phone.id}
              onClick={() => selectPhone(phone.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedId === phone.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg shadow-slate-900/15 dark:shadow-white/20 scale-105"
                  : "bg-white dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-white/5 shadow-xs"
              }`}
            >
              <span>{phone.shortName}</span>
              {phone.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase font-mono ${
                    selectedId === phone.id
                      ? "bg-slate-800 text-slate-200 dark:bg-zinc-900 dark:text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {phone.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selected Phone Feature Card */}
        <div className="mt-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-slate-200/90 dark:border-white/10 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="w-full aspect-[4/3] sm:aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-zinc-800/40 dark:via-zinc-900 dark:to-black border border-slate-200 dark:border-white/10 flex items-center justify-center">
                <img
                  src={heroSrc}
                  alt={`${selectedProduct.name} in ${activeFinish?.label ?? "official finish"} — authentic Apple product image`}
                  className="w-full h-full object-cover object-center rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating} / 5.0</span>
                    <span className="text-zinc-300 dark:text-zinc-400 font-normal">({selectedProduct.reviewCount.toLocaleString()})</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 dark:text-emerald-400 text-xs font-bold font-mono">
                    In Stock in India
                  </span>
                </div>
              </div>

              {/* Color Options — live finish switcher with authentic Apple renders */}
              {finishes.length > 0 ? (
                <div className="mt-5 flex flex-col items-center gap-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 font-medium">
                    <Palette className="w-4 h-4" />
                    <span>
                      Finish: <span className="text-slate-900 dark:text-white font-bold">{activeFinish?.label}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {finishes.map((f, i) => (
                      <button
                        key={f.slug}
                        onClick={() => setFinishIdx(i)}
                        aria-label={`View ${selectedProduct.shortName} in ${f.label}`}
                        title={f.label}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                          i === Math.min(finishIdx, finishes.length - 1)
                            ? "border-slate-900 dark:border-white scale-110 shadow-sm"
                            : "border-slate-300 dark:border-white/20 hover:border-slate-600 dark:hover:border-white/60"
                        }`}
                        style={{ backgroundColor: f.hex }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">Finishes:</span>
                  <div className="flex items-center gap-2">
                    {selectedProduct.specs.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800/90 border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-zinc-300 font-medium"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specifications & Details Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider font-mono">
                    {selectedProduct.releaseYear} Edition
                  </span>
                  <span className="text-slate-400 dark:text-zinc-500">•</span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400">{selectedProduct.specs.weight}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {selectedProduct.name}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  {selectedProduct.tagline}
                </p>

                {/* Price Tag with Effective Savings */}
                <div className="mt-4 flex flex-wrap items-baseline gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-black/60 border border-slate-200/90 dark:border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs uppercase font-mono text-slate-500 dark:text-zinc-400">From</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                      ₹{selectedProduct.startingPriceInr.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {selectedProduct.originalPriceInr && (
                    <span className="text-sm line-through text-slate-400 dark:text-zinc-500 font-mono">
                      ₹{selectedProduct.originalPriceInr.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold">
                    Save up to ₹10,000 with Card &amp; Exchange
                  </span>
                </div>
              </div>

              {/* 4 Core Quick Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-white/5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-mono uppercase mb-1">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Chip
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={selectedProduct.specs.chip}>
                    {selectedProduct.specs.chip.split("(")[0]}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-white/5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-mono uppercase mb-1">
                    <Camera className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Camera
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={selectedProduct.specs.camera}>
                    48MP Variable
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-white/5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-mono uppercase mb-1">
                    <Battery className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Battery
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={selectedProduct.specs.battery}>
                    {selectedProduct.specs.battery.split("(")[0]}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-white/5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px] font-mono uppercase mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" /> Storage
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={selectedProduct.specs.storage}>
                    {selectedProduct.specs.storage.split("/")[0]} Base
                  </div>
                </div>
              </div>

              {/* Verified Retailer Direct Buy Buttons Grid (Amazon, Flipkart, Croma, Reliance, Vijay Sales) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-zinc-400">
                    Compare Retailer Prices &amp; Bank Offers (India):
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Live Stock Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {selectedProduct.retailers.map((r, i) => (
                    <a
                      key={i}
                      href={goLink(r.affiliateUrl, {
                        productId: selectedProduct.id,
                        store: r.store,
                        placement: "showcase_retailer_grid",
                      })}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-700/90 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{r.store}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="mt-2 text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        ₹{r.priceInr.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 truncate mt-0.5" title={r.offerText}>
                        {r.offerText}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/apple/${selectedProduct.slug}`}
                  className="px-6 py-3 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Full {selectedProduct.shortName} Deep Dive</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/apple/iphone-18-pro-max-review"
                  className="px-6 py-3 rounded-full bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-800 dark:text-white border border-slate-300 dark:border-white/10 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs"
                >
                  Read Hands-On Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
