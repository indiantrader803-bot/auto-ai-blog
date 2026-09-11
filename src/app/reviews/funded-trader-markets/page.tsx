import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Zap, Tag, DollarSign, Award, Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Funded Trader Markets (FTM) Review 2026: 10% Discount Code & Rules Breakdown",
  description: "Comprehensive 2026 review of Funded Trader Markets (FTM). Learn about zero time limits, up to 90% profit split, on-demand payouts, and claim an exclusive 10% discount with code 'arnab'.",
  keywords: ["Funded Trader Markets review", "FTM discount code", "FTM promo code arnab", "prop trading zero time limit", "FTM challenge rules 2026"],
};

export default function FTMReviewPage() {
  const offer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === "funded-trader-markets") || PROPFLOW_MASTER_OFFERS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/best-prop-firms" className="hover:text-indigo-600">Prop Firms</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-300">Funded Trader Markets Review</span>
        </div>

        {/* Hero Section with Trust Rating & Exclusive Coupon */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-indigo-400" />
          </div>

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 uppercase tracking-wider">
                {offer.highlightBadge}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{offer.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({offer.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
              Funded Trader Markets (FTM) Review 2026: Zero Time Limits &amp; On-Demand Payouts
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Funded Trader Markets is revolutionizing prop trading by removing arbitrary 30-day deadlines. Pass your evaluation at your own pace with up to 90% profit split and refundable fees.
            </p>

            {/* Exclusive Promo Code Box */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Exclusive Partner Discount</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    Code: <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">arnab</span> (10% OFF at Checkout)
                  </div>
                </div>
              </div>

              <a
                href={offer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Claim 10% Off FTM Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Max Funding</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-serif">{offer.maxFunding}</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Profit Split</div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 font-serif">{offer.profitSplit}</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Time Limit</div>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-1 font-serif">0 Days (None)</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Max Drawdown</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-serif">{offer.maxDrawdown}</div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Why Choose Funded Trader Markets (Pros)
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {offer.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
              <XCircle className="w-5 h-5 text-rose-500" />
              Points to Consider (Cons)
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {offer.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison CTA Box */}
        <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
            Compare FTM Directly Against Legacy Competitors
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            See how Funded Trader Markets compares against FTMO and FundingPips on fee savings, challenge rules, and payout turnaround.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/compare/ftmo-vs-ftm"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md"
            >
              FTMO vs FTM Comparison →
            </Link>
            <Link
              href="/tools"
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all"
            >
              Challenge Cost Calculator →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
