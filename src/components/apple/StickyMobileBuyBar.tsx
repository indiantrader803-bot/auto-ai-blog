"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Tag, ChevronUp, ExternalLink, Zap } from "lucide-react";
import { APPLE_PRODUCTS } from "@/data/appleData";

export default function StickyMobileBuyBar() {
  const [isOpen, setIsOpen] = useState(false);
  const flagship = APPLE_PRODUCTS[0]; // iPhone 18 Pro Max

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-white/15 px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      {/* Expanded Retailers Dropdown Drawer */}
      {isOpen && (
        <div className="mb-3 p-3.5 rounded-2xl bg-zinc-900 border border-white/10 space-y-2 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pb-2 border-b border-white/10">
            <span>Verified Indian Retailers</span>
            <span className="text-emerald-400 font-bold">Save up to ₹10,000</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {flagship.retailers.map((r, i) => (
              <a
                key={i}
                href={r.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="p-2 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-between text-xs font-bold text-white hover:bg-zinc-700"
              >
                <span>{r.store}</span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  ₹{r.priceInr.toLocaleString("en-IN")}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-white">{flagship.shortName}</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
              2nm A20
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-[10px] text-zinc-400 font-mono">From</span>
            <span className="text-sm font-black text-emerald-400 font-mono">
              ₹{flagship.startingPriceInr.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1 border border-white/10 cursor-pointer"
          >
            <span>Stores</span>
            <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          <Link
            href="/apple/deals"
            className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-white/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy Deals</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
