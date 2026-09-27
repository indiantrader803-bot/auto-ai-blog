"use client";

import { useState } from "react";
import type { AppleProduct } from "@/data/appleData";
import { appleImg } from "@/lib/appleImages";
import { goLink } from "@/lib/goLink";
import { Star, ShoppingBag, ExternalLink, Check, Palette } from "lucide-react";

/**
 * Authentic Apple-official product showcase with a live color-finish switcher.
 * Every finish renders Apple's own official product image from Apple's CDN,
 * so buyers see exactly the color they are about to purchase.
 */
export default function ProductColorShowcase({ product }: { product: AppleProduct }) {
  const finishes = product.finishGallery ?? [];
  const [activeIdx, setActiveIdx] = useState(0);

  const active = finishes.length > 0 ? finishes[Math.min(activeIdx, finishes.length - 1)] : null;
  const heroSrc = active ? appleImg(active.slug, 1600) : product.heroImage;
  const bestPrice = Math.min(...product.retailers.map((r) => r.priceInr));
  const bestRetailer =
    product.retailers.find((r) => r.priceInr === bestPrice) ?? product.retailers[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Visual column — official Apple CDN image per finish */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full aspect-square max-w-lg relative rounded-3xl overflow-hidden bg-gradient-to-tr from-zinc-800/40 via-zinc-900 to-black border border-white/10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt={`${product.name} in ${active?.label ?? "official finish"} — authentic Apple product image`}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating} / 5</span>
            <span className="text-zinc-400 font-normal">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
          <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono">
            100% Authentic
          </span>
        </div>

        {/* Color finish picker */}
        {finishes.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <Palette className="w-4 h-4" />
              <span>
                Finish:{" "}
                <span className="text-white font-bold">{active?.label}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {finishes.map((f, i) => (
                <button
                  key={f.slug}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View ${product.shortName} in ${f.label}`}
                  title={f.label}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                    i === Math.min(activeIdx, finishes.length - 1)
                      ? "border-white scale-110 shadow-lg shadow-white/20"
                      : "border-white/20 hover:border-white/60"
                  }`}
                  style={{ backgroundColor: f.hex }}
                >
                  {i === Math.min(activeIdx, finishes.length - 1) && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
              Official Apple imagery — {finishes.length} finishes
            </span>
          </div>
        )}
      </div>

      {/* Details column */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider font-mono">
              {product.badge || `${product.releaseYear} Edition`}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">{product.specs.weight}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price block */}
        <div className="flex flex-wrap items-baseline gap-3 p-4 rounded-2xl bg-black/60 border border-white/10">
          <span className="text-xs uppercase font-mono text-zinc-400">From</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            ₹{product.startingPriceInr.toLocaleString("en-IN")}
          </span>
          {product.originalPriceInr && (
            <span className="text-sm line-through text-zinc-500 font-mono">
              ₹{product.originalPriceInr.toLocaleString("en-IN")}
            </span>
          )}
          {bestPrice < product.startingPriceInr && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              Lowest today: ₹{bestPrice.toLocaleString("en-IN")} on {bestRetailer.store}
            </span>
          )}
        </div>

        {/* Highlight bullets */}
        <ul className="space-y-2.5">
          {product.keyHighlights.slice(0, 4).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              {h}
            </li>
          ))}
        </ul>

        {/* Primary buy CTA row — tracked via /go gateway */}
        <div className="flex flex-wrap gap-3">
          {product.retailers.slice(0, 3).map((r, i) => (
            <a
              key={i}
              href={goLink(r.affiliateUrl, {
                productId: product.id,
                store: r.store,
                placement: "deepdive_hero",
              })}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                i === 0
                  ? "bg-white hover:bg-zinc-200 text-black shadow-lg"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy on {r.store}</span>
              <span className="font-mono normal-case opacity-70">
                ₹{r.priceInr.toLocaleString("en-IN")}
              </span>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
          <ExternalLink className="w-3 h-3" />
          Secure checkout on the retailer&apos;s official store. TheSmartMag earns a commission on
          qualifying purchases — you pay nothing extra.
        </p>
      </div>
    </div>
  );
}
