import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Tag, Zap, Percent, Award, Layers, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Equity Edge Prop Firm Review 2026: Rules, 90% Split & Partner Signup Code",
  description: "Comprehensive 2026 review of Equity Edge Prop Firm. Learn about evaluation rules, up to 90% profit split, zero time limits, fast payouts, and claim partner access with code THESMARTMAG.",
  keywords: ["Equity Edge review 2026", "Equity Edge discount code", "Equity Edge promo code THESMARTMAG", "Equity Edge prop firm", "Equity Edge signup link"],
  alternates: {
    canonical: "https://thesmartmag.com/reviews/equity-edge",
  },
};

export default function EquityEdgeReviewPage() {
  const offer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === "equity-edge") || {
    id: "prop_equity_edge",
    name: "Equity Edge Prop Firm",
    slug: "equity-edge",
    rating: 4.8,
    reviewCount: 1120,
    promoCode: "THESMARTMAG",
    targetUrl: "https://app.equityedge.io/signup/THESMARTMAG/",
    profitSplit: "85% - 90% Profit Split",
    maxFunding: "$400,000 (Scalable to $2,000,000)",
    minTradingDays: "0 Days (No Minimum Trading Days)",
    maxDrawdown: "8% - 10% Max Drawdown",
    highlightBadge: "PARTNER VERIFIED — CODE THESMARTMAG",
    pros: [
      "Clean onboarding and rapid dashboard setup via partner portal",
      "No time limit on challenge phases removes psychological pressure",
      "High profit splits up to 90% and fast withdrawal processing",
      "Transparent rules with zero hidden drawdown tricks",
    ],
    cons: [
      "Weekend crypto leverage requires standard risk buffer",
    ],
  };

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
          <span className="text-slate-800 dark:text-slate-300">Equity Edge Review</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <TrendingUp className="w-64 h-64 text-emerald-400" />
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
              Equity Edge Review 2026: Evaluation Rules, Scaling &amp; Verified Partner Access
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Equity Edge offers institutional-grade trading conditions for Forex, Crypto, Indices, and Commodities. Benefit from zero time limits, flexible drawdown parameters, and up to 90% profit payouts.
            </p>

            {/* Exclusive Promo Code Box */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Partner Link &amp; Code</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    Code / Ref: <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">THESMARTMAG</span>
                  </div>
                </div>
              </div>

              <a
                href={offer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Start Equity Edge Challenge →</span>
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

        {/* Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Zero Time Limits</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Trade with calm discipline without the stress of arbitrary 30-day deadlines. Pass when market conditions match your trading edge.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Scaling up to $2,000,000</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Consistent profitability unlocks automated account scaling, multiplying your capital allocations and payout potentials.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-2">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Fast Bi-Weekly Payouts</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enjoy automated withdrawal cycles processed directly to your crypto wallet or bank account with 85% to 90% profit share.
            </p>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Why Choose Equity Edge (Pros)
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {offer.pros.map((pro: string, idx: number) => (
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
              {offer.cons.map((con: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to action footer banner */}
        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
            Start Your Equity Edge Evaluation Today
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Get instant partner onboarding with referral code <strong className="text-emerald-600 dark:text-emerald-400 font-mono">THESMARTMAG</strong> and take the next step in your funded trading career.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={offer.targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Get Started with Code THESMARTMAG</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/best-prop-firms"
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all"
            >
              View Full 2026 Leaderboard →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
