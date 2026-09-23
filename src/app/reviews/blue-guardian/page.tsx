import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import { Star, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Tag, Zap, Percent, Flame, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Blue Guardian Prop Firm Review 2026: Reserve Pricing, Rules & Discount Code",
  description: "Comprehensive 2026 review of Blue Guardian Prop Firm. Check updated Reserve pricing (from $48), 5X bundle discounts, No Daily Loss option, Nano Momentum, and Guardian Protector shield.",
  keywords: ["Blue Guardian review 2026", "Blue Guardian discount code", "Blue Guardian reserve pricing", "Blue Guardian affiliate code 1tgf", "Blue Guardian 5X bundles"],
  alternates: {
    canonical: "https://thesmartmag.com/reviews/blue-guardian",
  },
};

export default function BlueGuardianReviewPage() {
  const offer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === "blue-guardian") || {
    id: "prop_blue_guardian",
    name: "Blue Guardian Prop Firm",
    slug: "blue-guardian",
    rating: 4.8,
    reviewCount: 1890,
    promoCode: "1tgf",
    targetUrl: "https://blueguardian.com/?afmc=1tgf",
    profitSplit: "85% - 90% Profit Split",
    maxFunding: "$400,000 (Scalable to $2,000,000)",
    minTradingDays: "0 Days (2-Day / 3-Day Pass Options)",
    maxDrawdown: "8% - 10% Trailing / Static",
    highlightBadge: "NEW RESERVE PRICING — FROM $48",
    pros: [
      "New lower Reserve challenge fees starting at just $48",
      "Customizable evaluation rules: No Daily Loss Limit, 2/3-day pass",
      "5X Bundles give significant per-account discounts for multi-account scaling",
      "Guardian Protector automated stop-loss protection prevents accidental breach",
    ],
    cons: [
      "Add-on customizations (like No Daily Loss) slightly increase checkout cost",
    ],
  };

  const reservePricing = [
    { size: "25K Reserve", regularPrice: "$64", newPrice: "$48", bundlePrice: "$41 / account", save: "25% OFF" },
    { size: "50K Reserve", regularPrice: "$100", newPrice: "$75", bundlePrice: "$64 / account", save: "25% OFF" },
    { size: "100K Reserve", regularPrice: "$148", newPrice: "$111", bundlePrice: "$95 / account", save: "25% OFF" },
    { size: "150K Reserve", regularPrice: "$296", newPrice: "$222", bundlePrice: "$189 / account", save: "25% OFF" },
  ];

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
          <span className="text-slate-800 dark:text-slate-300">Blue Guardian Review</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-blue-400" />
          </div>

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs border border-blue-500/30 uppercase tracking-wider">
                {offer.highlightBadge}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{offer.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({offer.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
              Blue Guardian Review 2026: Updated Reserve Pricing &amp; Customizable Rules
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Blue Guardian gives traders unprecedented flexibility with updated Reserve plans, 5X bundle savings, customizable daily loss limits, and their signature Guardian Protector risk shield.
            </p>

            {/* Exclusive Promo Code Box */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified Partner Link &amp; Code</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    Code / Ref: <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">1tgf</span> (Discount Automatically Applied)
                  </div>
                </div>
              </div>

              <a
                href={offer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get Blue Guardian Reserve →</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Updated Reserve Pricing Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                  Updated Blue Guardian Reserve Pricing &amp; 5X Bundles
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Traders can now secure single challenges at reduced rates or choose 5X Bundles for maximum cost efficiency.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono self-start sm:self-auto">
              Up to 25% Off + 5X Rates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                  <th className="pb-3">Account Size</th>
                  <th className="pb-3">Previous Price</th>
                  <th className="pb-3">New Reserve Price</th>
                  <th className="pb-3">5X Bundle (Per Account)</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {reservePricing.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white font-serif">
                      {item.size}
                    </td>
                    <td className="py-3.5 text-slate-400 line-through">
                      {item.regularPrice}
                    </td>
                    <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {item.newPrice}
                    </td>
                    <td className="py-3.5 font-bold text-blue-600 dark:text-blue-400">
                      {item.bundlePrice}
                    </td>
                    <td className="py-3.5 text-right">
                      <a
                        href={offer.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <span>Choose {item.size}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customization Options & Rules Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold mb-1">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Daily Loss Limit Option</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Traders can customize their setup to remove the daily loss rule, letting swing traders and volatility scalpers hold through market swings.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-1">
              <Percent className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">40% or 50% Consistency</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Choose between 40% or 50% consistency options tailored to your personal trading rhythm and execution strategy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-1">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">2-Day or 3-Day Fast Pass</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Accelerate your funded phase graduation with rapid 2-day or 3-day pass options, paired with Nano Momentum evaluations.
            </p>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Why Choose Blue Guardian (Pros)
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
        <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
            Ready to Start with Blue Guardian Reserve?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Take advantage of the new 25K Reserve starting at $48 or configure a 5X Bundle for institutional pricing.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={offer.targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Claim Discount &amp; Start Challenge</span>
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
