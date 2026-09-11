import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Atlas Funded Review 2026: 20% Discount Code '12275' + $5 Free Challenge Passes",
  description: "Detailed 2026 review of Atlas Funded. High leverage on TradeLocker, instant scaling, 85-90% profit split, and claim 20% off with exclusive partner code '12275'.",
  keywords: ["Atlas Funded review 2026", "Atlas Funded discount code 12275", "Atlas Funded promo", "prop firm discount 20 off"],
};

export default function AtlasFundedReviewPage() {
  const offer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === "atlas-funded") || PROPFLOW_MASTER_OFFERS[1];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/best-prop-firms" className="hover:text-indigo-600">Prop Firms</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-300">Atlas Funded Review</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden">
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
              Atlas Funded Review 2026: 20% Discount &amp; $5 Free Challenge Passes
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Atlas Funded provides rapid scaling up to $300,000 with TradeLocker execution and transparent drawdown rules. Use our partner code <strong>12275</strong> to claim an instant 20% discount on any challenge.
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified 20% Partner Code</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    Code: <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">12275</span> (20% OFF + $5 FTPs)
                  </div>
                </div>
              </div>

              <a
                href={offer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Claim 20% Off Atlas Funded</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-500/20 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Key Advantages
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {offer.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-red-500/20 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-red-500 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Things to Note
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {offer.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">⚠</span>
                  <span>{c}</span>
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
