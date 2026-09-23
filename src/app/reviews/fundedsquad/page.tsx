import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Tag, Zap, Percent, Flame, Gift, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "FundedSquad Review 2026: 35% Discount Code 'CHARGE' & Buy 1 Get 2 Free Promo",
  description: "Comprehensive 2026 review of FundedSquad Prop Firm. Claim 35% instant discount with code 'CHARGE', Buy 1 Get 2 Free on $25k+ accounts, instant funding models, and up to 90% profit split.",
  keywords: ["FundedSquad review 2026", "FundedSquad coupon code", "FundedSquad promo code CHARGE", "FundedSquad buy 1 get 2 free", "FundedSquad instant funding", "FundedSquad affiliate squad 3552"],
  alternates: {
    canonical: "https://thesmartmag.com/reviews/fundedsquad",
  },
};

export default function FundedSquadReviewPage() {
  const offer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === "fundedsquad") || {
    id: "prop_fundedsquad",
    name: "FundedSquad Prop Firm",
    slug: "fundedsquad",
    rating: 4.9,
    reviewCount: 940,
    promoCode: "CHARGE",
    targetUrl: "https://fundedsquad.com/?campaign=thesmartmag&squad=3552",
    profitSplit: "Up to 90% Profit Split",
    maxFunding: "$300,000 (Scalable to $1,500,000)",
    minTradingDays: "0 Days (Instant & Rapid Pass)",
    maxDrawdown: "8% - 10% Total Drawdown",
    highlightBadge: "🔥 BUY 1 GET 2 FREE + 35% OFF",
    pros: [
      "Unmatched Buy 1 Get 2 Free bundle on $25k+ accounts gives 3x trading accounts",
      "35% instant discount with code 'CHARGE' on instant & evaluation models",
      "Direct instant funding option bypasses challenge phases entirely",
      "High leverage (1:100) and low spreads on crypto and forex pairs",
    ],
    cons: [
      "Buy 1 Get 2 Free deal is a limited-time promotional window",
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
          <span className="text-slate-800 dark:text-slate-300">FundedSquad Review</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Gift className="w-64 h-64 text-purple-400" />
          </div>

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {offer.highlightBadge}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{offer.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({offer.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
              FundedSquad Review 2026: 35% Instant Discount &amp; Buy 1 Get 2 Free Offer
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              FundedSquad is leading the 2026 prop trading landscape with unbeatable value promotions. Get instant 35% savings with coupon <strong className="text-amber-300 font-mono">CHARGE</strong> and receive 2 additional free accounts when purchasing any $25K+ evaluation.
            </p>

            {/* Exclusive Promo Code Box */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Exclusive Partner Code</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    Code: <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">CHARGE</span> (35% OFF + B1G2 Free)
                  </div>
                </div>
              </div>

              <a
                href={offer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Claim B1G2 + 35% Off →</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Promo Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold mb-2">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Buy 1, Get 2 Free</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Buy any $25k, $50k, or $100k+ evaluation account and receive 2 additional equivalent accounts completely free. Triple your chances of passing and scaling.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">35% Instant Discount</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Use promo code <strong className="text-purple-400 font-mono">CHARGE</strong> during checkout to slice 35% off instant models and evaluation challenges.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-2">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Up to 90% Profit Split</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Keep up to 90% of your generated trading gains with automated, swift payout processing directly to crypto or bank wire.
            </p>
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
            <div className="text-xs text-slate-400 font-bold uppercase">Trading Days</div>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-1 font-serif">0 Days (No Min)</div>
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
              Why Traders Choose FundedSquad (Pros)
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

        {/* Partner & Affiliate Section */}
        <div className="p-6 rounded-3xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                Earn Up to 30% with the FundedSquad Partner Program
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Join the official FundedSquad affiliate program to earn competitive commissions on every referred trader with real-time analytics and dedicated manager support.
            </p>
          </div>
          <a
            href="https://fundedsquad.com/affiliate-registration/?squad=3552"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center shrink-0 shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Become an Affiliate →</span>
          </a>
        </div>

        {/* Call to action footer banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold font-serif">
            Ready to Claim Your Buy 1 Get 2 Free Deal?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Use code <strong className="text-amber-400 font-mono">CHARGE</strong> to save 35% instantly and receive 3 accounts for the price of 1 on all $25K+ tiers.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={offer.targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Apply Code CHARGE &amp; Get Funded</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/best-prop-firms"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
            >
              View 2026 Prop Leaderboard →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
