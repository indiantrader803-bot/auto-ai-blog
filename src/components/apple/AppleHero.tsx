"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Tag, ShoppingBag, GitCompare, Zap, CheckCircle2 } from "lucide-react";

export default function AppleHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-black text-slate-900 dark:text-white pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200">
      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/10 dark:from-indigo-600/20 via-sky-500/10 dark:via-sky-500/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Apple Intelligence Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/15 backdrop-blur-md mb-6 hover:border-slate-400 dark:hover:border-white/30 transition-colors shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-700 dark:text-zinc-300 tracking-wide">
            Apple Intelligence 2.0 • 2nm TSMC A20 Pro
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-300 font-mono font-bold">
            2026
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif max-w-4xl mx-auto leading-[1.1] sm:leading-[1.08] text-slate-900 dark:text-white">
          Meet the New <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
            Apple Lineup 2026.
          </span>
        </h1>

        {/* Subhead product line */}
        <p className="mt-4 text-sm sm:text-lg font-mono text-slate-500 dark:text-zinc-400 tracking-widest uppercase">
          iPhone 18 • MacBook • iPad • Apple Watch • AirPods
        </p>

        {/* Value Proposition */}
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-light">
          Compare every flagship model side-by-side, unlock verified retail bank discounts across Croma, Flipkart, Reliance Digital, &amp; Vijay Sales, and get expert buying recommendations.
        </p>

        {/* 3 Core Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/apple/iphone-18"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 dark:shadow-white/10 group"
          >
            <span>Buy Now</span>
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>

          <a
            href="#comparison-engine"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 font-bold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-xs"
          >
            <GitCompare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Compare iPhones</span>
          </a>

          <Link
            href="/apple/deals"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>View Today&apos;s Deals</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
              ₹15,000 OFF
            </span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">100% Authorized Retailers</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">Flipkart, Croma, Reliance, Vijay Sales</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Instant Bank Cashback</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">Up to ₹5,000 instant on HDFC/ICICI</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">24-Month No Cost EMI</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">Zero down-payment available</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">AI Purchase Assistant</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">Personalized device matching</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
