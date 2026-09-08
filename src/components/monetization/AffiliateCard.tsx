"use client";

import { Star, CheckCircle, ExternalLink, ShieldCheck, Flame, Gift, ArrowRight } from "lucide-react";

interface AffiliateCardProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  slug?: string;
  discountCode?: string;
}

export default function AffiliateCard({
  title = "MyFundedFutures (MFFU) $300,000 Evaluation Account",
  subtitle = "Get funded to trade CME futures contracts with up to 90% profit split, zero activation fees, and 1-day pass options.",
  rating = 4.9,
  features = [
    "Instant Account Activation & 90% Trader Profit Split",
    "Pass in as little as 1 Trading Day with No Minimum Days",
    "Fast Bi-Weekly Direct Wire & Crypto Payouts",
  ],
  ctaText = "Claim Your Funded Account & Pass Challenge →",
  ctaLink = "https://mffu.com/f/85f1f73f30",
  badge = "HIGH CONVERTING OFFER",
  slug,
  discountCode = "FUTURES2026",
}: AffiliateCardProps) {
  const handleClick = () => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "AFFILIATE_CLICK",
          slug: slug || null,
          metadata: { title, ctaLink, purchaseIntent: "HIGH" },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  return (
    <div className="my-8 rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
      {/* Urgency Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            {badge}
          </span>
          <span className="text-xs text-amber-300 font-bold hidden sm:inline">
            Exclusive Reader Discount Active
          </span>
        </div>

        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
          <span className="text-xs font-bold text-slate-300 ml-1">
            {rating}/5.0 (4,200+ Reviews)
          </span>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-black font-serif text-white mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
        {subtitle}
      </p>

      {/* Feature Checkmarks */}
      <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-200">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* High-Converting CTA & Promo Code Unlock */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">Coupon Auto-Applied At Checkout:</span>
          </div>
          <div className="font-mono text-sm font-black text-amber-300 tracking-wider">
            CODE: {discountCode} (Save 20% Off Challenge)
          </div>
        </div>

        <a
          href={ctaLink}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
