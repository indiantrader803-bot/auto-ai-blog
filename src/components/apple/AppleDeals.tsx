"use client";

import Link from "next/link";
import { DAILY_APPLE_DEALS } from "@/data/appleData";
import { Tag, Clock, Zap, ArrowRight, ExternalLink, ShieldCheck, Flame, Gift } from "lucide-react";

export default function AppleDeals() {
  return (
    <section id="deals" className="py-20 bg-black text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5" /> Daily Price Drops &amp; Bank Offers
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Best Apple Deals Today.
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base font-light max-w-xl">
              Verified daily across Flipkart, Croma, Amazon India, Reliance Digital, and Vijay Sales. Instant bank cashback and exchange bonuses applied.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-zinc-400">Refreshed 2 hours ago</span>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAILY_APPLE_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group shadow-lg"
            >
              {/* Hot Ribbon */}
              {deal.isHot && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase font-mono">
                  <Zap className="w-3 h-3 fill-emerald-400" /> Hot Deal
                </div>
              )}

              <div>
                {/* Store & Category Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white text-xs font-bold font-mono">
                    {deal.store}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-xs text-zinc-400 font-medium">{deal.category}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {deal.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 font-light">
                  {deal.product}
                </p>

                {/* Price Matrix */}
                <div className="mt-4 p-3.5 rounded-2xl bg-black/60 border border-white/5 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-zinc-400 font-mono">Deal Price:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        ₹{deal.currentPriceInr.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs line-through text-zinc-500 font-mono">
                        ₹{deal.originalPriceInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-between">
                    <span>Direct Savings:</span>
                    <span>₹{deal.discountAmountInr.toLocaleString("en-IN")} OFF</span>
                  </div>
                </div>

                {/* Bank Offer Breakdown */}
                <div className="mt-3.5 space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5 text-zinc-300">
                    <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{deal.bankOffer}</span>
                  </div>
                  {deal.exchangeBonus !== "N/A" && (
                    <div className="flex items-start gap-1.5 text-zinc-400">
                      <Gift className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span className="text-[11px]">{deal.exchangeBonus}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Ends in {deal.expiryHours}h</span>
                </div>

                <a
                  href={deal.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-all flex items-center gap-1.5 shadow-md group-hover:scale-105 cursor-pointer"
                >
                  <span>Grab Deal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Deals Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Looking for model-specific clearance sales?</div>
              <div className="text-xs text-zinc-400">Explore our dedicated Daily Deals catalog with live alerts.</div>
            </div>
          </div>

          <Link
            href="/apple/deals"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <span>View Full Deals Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
