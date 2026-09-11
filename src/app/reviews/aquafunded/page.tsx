import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, CheckCircle2, XCircle, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "AquaFunded Review 2026: Up to 20% Discount Code '6e9' & 90% Profit Split",
  description: "Comprehensive 2026 AquaFunded review. Rapid 1-step and 2-step evaluations, 90% profit split, and save up to 20% with coupon code '6e9'.",
  keywords: ["AquaFunded review 2026", "AquaFunded promo code 6e9", "AquaFunded discount", "1 step prop challenge 2026"],
};

export default function AquaFundedReviewPage() {
  const offer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === "aquafunded") || PROPFLOW_MASTER_OFFERS[2];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/best-prop-firms" className="hover:text-indigo-600">Prop Firms</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-300">AquaFunded Review</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30 uppercase tracking-wider">
                {offer.highlightBadge}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{offer.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({offer.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
              AquaFunded Review 2026: 90% Profit Split &amp; Rapid 1-Step Payouts
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              AquaFunded offers fast 1-step and 2-step evaluation challenges with trade copiers allowed and industry-leading 90% profit splits. Use code <strong>6e9</strong> for up to 20% discount on all challenge passes.
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified Rebate Code</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    Code: <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">6e9</span> (Up to 20% Rebate)
                  </div>
                </div>
              </div>

              <a
                href={offer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Claim AquaFunded Rebate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              AquaFunded Strengths (Pros)
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
              Things to Note
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
      </main>

      <Footer />
    </div>
  );
}
