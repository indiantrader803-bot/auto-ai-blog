"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Tag, ShieldCheck, Copy, Check, Flame, Plane, Percent } from "lucide-react";

interface HighIntentDealBoxProps {
  category?: string;
  articleTitle?: string;
}

export default function HighIntentDealBox({ category = "Technology", articleTitle = "" }: HighIntentDealBoxProps) {
  const [copied, setCopied] = useState(false);

  const titleLower = articleTitle.toLowerCase();
  const catLower = category.toLowerCase();

  const isTravel =
    catLower.includes("travel") ||
    catLower.includes("expedition") ||
    titleLower.includes("travel") ||
    titleLower.includes("hotel") ||
    titleLower.includes("flight") ||
    titleLower.includes("trip");

  const deal = isTravel
    ? {
        badge: "✈️ VERIFIED TRAVEL PARTNER",
        title: "Booking.com & Aviasales: Save Up to 40% on Flights & Hotels",
        description:
          "Unlock member-only discounts on flights, verified 4-star boutique hotels, and free cancellation worldwide.",
        promoCode: "TRAVEL2026",
        ctaText: "Check Live Flight & Hotel Deals",
        ctaUrl: "https://thesmartmag.com/travel",
        gradient: "from-sky-950 via-slate-900 to-indigo-950",
        border: "border-sky-500/40 hover:border-sky-400",
        btnGradient: "from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500",
      }
    : {
        badge: "🔥 EXCLUSIVE 3-FOR-1 PROMO",
        title: "FundedSquad: 35% OFF + Buy 1 Get 2 FREE ($25k+ Accounts)",
        description:
          "Pass evaluations faster with zero minimum trading days, 90% profit split, and 3 accounts for the price of 1 starting from $35.",
        promoCode: "CHARGE",
        ctaText: "Claim Buy 1 Get 2 Free Deal ($35)",
        ctaUrl: "https://fundedsquad.com/?campaign=thesmartmag&squad=3552",
        gradient: "from-rose-950 via-slate-900 to-amber-950",
        border: "border-amber-500/40 hover:border-amber-400",
        btnGradient: "from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950",
      };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(deal.promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`my-6 rounded-2xl p-4 sm:p-5 border-2 ${deal.border} bg-gradient-to-r ${deal.gradient} text-white shadow-xl transition-all`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 border border-white/20 text-white flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-300 animate-pulse" />
              {deal.badge}
            </span>
            <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Tested & Verified
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
            {deal.title}
          </h4>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {deal.description}
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5 shrink-0">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/30 text-amber-300 text-xs font-mono font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="Click to copy promo code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">COPIED!</span>
              </>
            ) : (
              <>
                <Tag className="w-3.5 h-3.5" />
                <span>CODE: {deal.promoCode}</span>
                <Copy className="w-3 h-3 opacity-60" />
              </>
            )}
          </button>

          <a
            href={deal.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r ${deal.btnGradient} transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap`}
          >
            <span>{deal.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
