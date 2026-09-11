import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, ShieldCheck, Tag, ExternalLink, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Prop Trading Firms 2026: Leaderboard, Rules & Verified Discount Codes",
  description: "Ranked list of the best prop trading firms for 2026. Compare Funded Trader Markets, Atlas Funded, AquaFunded, and Pocket Option with verified discount codes.",
  keywords: ["best prop firms 2026", "prop trading leaderboard", "cheap prop challenges", "atlas funded coupon", "FTM discount code"],
};

export default function BestPropFirmsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
            2026 Verified Prop Firm Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
            Best Prop Trading Firms (Ranked by Payout Speed &amp; Value)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Compare evaluation rules, profit splits, drawdown limits, and verified partner coupon codes.
          </p>
        </div>

        {/* Firm Cards */}
        <div className="space-y-6">
          {PROPFLOW_MASTER_OFFERS.map((firm, idx) => (
            <div
              key={firm.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:border-indigo-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Left Column */}
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs font-mono">
                    #{idx + 1}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    {firm.highlightBadge}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{firm.rating}</span>
                    <span className="text-slate-400 font-normal">({firm.reviewCount} reviews)</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                  {firm.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {firm.discountSummary}
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-slate-400 block font-bold">Split</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{firm.profitSplit}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-slate-400 block font-bold">Max Drawdown</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{firm.maxDrawdown}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-slate-400 block font-bold">Min Days</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{firm.minTradingDays}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-slate-400 block font-bold">Max Account</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{firm.maxFunding}</span>
                  </div>
                </div>
              </div>

              {/* Right Action Column */}
              <div className="w-full lg:w-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left lg:text-center w-full">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Coupon Code</div>
                  <div className="text-sm font-black text-amber-500 font-mono mt-0.5">
                    {firm.promoCode}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <Link
                    href={`/reviews/${firm.slug}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs text-center transition-all"
                  >
                    Read Review
                  </Link>
                  <a
                    href={firm.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-1 shrink-0"
                  >
                    <span>Claim Deal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
