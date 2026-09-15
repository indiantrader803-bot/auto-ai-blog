"use client";

import { useState } from "react";
import { Star, CheckCircle2, ExternalLink, ShieldCheck, Flame, Gift, ArrowRight, Copy, Check, Zap, Sparkles } from "lucide-react";

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
  claimedPercent?: number;
}

export default function AffiliateCard({
  title = "Funded Trader Markets (FTM) — Up to $200,000 Scaling",
  subtitle = "Zero time limit prop challenges, on-demand bi-weekly profit withdrawals, raw institutional spreads, and up to 90% profit split.",
  rating = 4.9,
  features = [
    "Instant Account Activation & 90% Trader Profit Split",
    "Pass in as little as 1 Trading Day with Zero Time Pressure",
    "Fast Crypto, Wire & Rise Payouts with 100% Payout Guarantee",
    "Free Retake & Scaling up to $2,000,000 Capital",
  ],
  ctaText = "Claim Exclusive 10% Discount & Pass Challenge →",
  ctaLink = "https://fundedtradermarkets.com/ref/arnab",
  badge = "⚡ HIGHEST PAYOUT MATCH",
  slug,
  discountCode = "arnab",
  claimedPercent = 94,
}: AffiliateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAndClaim = (e: React.MouseEvent) => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "AFFILIATE_CLICK",
          slug: slug || window.location.pathname,
          metadata: { title, ctaLink, discountCode, purchaseIntent: "MAXIMUM" },
        }),
      }).catch(() => {});
    } catch (_) {}

    // Open link in new tab
    window.open(ctaLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="my-10 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden group hover:border-amber-400 transition-all">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all" />

      {/* Top Banner & Urgency Meter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 shadow-md animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            {badge}
          </span>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Partner Rate
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-amber-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-white ml-1">
            {rating}/5.0 (4,800+ Verified Reviews)
          </span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-white mb-2 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          {subtitle}
        </p>

        {/* Feature Checkmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-200">{feature}</span>
            </div>
          ))}
        </div>

        {/* Live Scarcity & Progress Indicator */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
            <span><strong>{claimedPercent}% of Reader Vouchers Claimed</strong> — Verified active for today</span>
          </div>
          <div className="w-full sm:w-36 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2 rounded-full" style={{ width: `${claimedPercent}%` }} />
          </div>
        </div>

        {/* High-Converting 1-Click Action Bar */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-black/80 to-slate-950 border-2 border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Exclusive Coupon Unlocked:</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-mono text-base font-black text-amber-300 tracking-wider bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/30">
                {discountCode}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                (Click button to auto-copy &amp; apply)
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyAndClaim}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>{copied ? "Code Copied! Opening Deal..." : ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

