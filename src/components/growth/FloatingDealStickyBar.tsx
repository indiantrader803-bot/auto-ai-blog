"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X, ShieldCheck, Copy, Check, Flame, Gift } from "lucide-react";

interface FloatingDealStickyBarProps {
  categorySlug?: string;
  articleTitle?: string;
}

export default function FloatingDealStickyBar({ categorySlug, articleTitle }: FloatingDealStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Show after scrolling 300px or after 3 seconds
    const handleScroll = () => {
      if (window.scrollY > 350 && !isDismissed) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isDismissed]);

  // Determine most relevant high-converting offer
  const isAqua = articleTitle?.toLowerCase().includes("aqua") || articleTitle?.toLowerCase().includes("eval") || categorySlug?.includes("forex");
  const isPropTrading = categorySlug?.includes("market") || categorySlug?.includes("finance") || categorySlug?.includes("forex") || articleTitle?.toLowerCase().includes("trading") || articleTitle?.toLowerCase().includes("nifty") || articleTitle?.toLowerCase().includes("stock");
  
  const deal = isAqua
    ? {
        badge: "AQUAFUNDED 20% REBATE",
        title: "AquaFunded: Trade Up to $200,000 Capital",
        subtitle: "Pass evaluation, get funded & keep up to 90% profit split.",
        promoCode: "6e9",
        buttonText: "Claim AquaFunded ($200k)",
        url: "https://www.aquafunded.com/?afmc=6e9",
        platform: "AquaFunded",
        colorScheme: "from-cyan-600 via-teal-600 to-blue-700",
      }
    : isPropTrading
    ? {
        badge: "EXCLUSIVE PROP CHALLENGE",
        title: "Fundex & AquaFunded: Scale Up to $200k",
        subtitle: "Instant scaling, lowest spreads & up to 90% profit payouts.",
        promoCode: "GGG34QEO",
        buttonText: "Claim Funded Account",
        url: "https://prop.fundex.gg/rc/GGG34QEO",
        platform: "Fundex Prop",
        colorScheme: "from-purple-600 via-indigo-600 to-indigo-700",
      }
    : {
        badge: "VERIFIED TRADING BONUS",
        title: "Pocket Option: 50% Match + $10,000 Free Demo",
        subtitle: "Zero-risk practice account or 50% cash bonus on first deposit.",
        promoCode: "50START",
        buttonText: "Claim 50% Bonus Now",
        url: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
        platform: "Pocket Option",
        colorScheme: "from-amber-600 via-orange-600 to-rose-600",
      };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(deal.promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTrackClick = () => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "AFFILIATE_CLICK",
          slug: window.location.pathname,
          referrer: "FloatingStickyDealBar",
          metadata: {
            offerName: deal.platform,
            url: deal.url,
            promoCode: deal.promoCode,
            source: "floating_sticky_bar",
          },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${deal.colorScheme} text-white shadow-2xl shadow-black/40 border border-white/20 relative overflow-hidden`}>
        {/* Glow ambient effects */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
          aria-label="Close offer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="space-y-2">
          {/* Top Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white border border-white/30">
              <Flame className="w-3 h-3 text-amber-300" />
              {deal.badge}
            </span>
            <span className="text-[10px] text-emerald-200 font-bold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-300" /> Verified
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-snug">
              {deal.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-white/85 line-clamp-1 mt-0.5">
              {deal.subtitle}
            </p>
          </div>

          {/* Promo Code Pill & Direct Action Button */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/40 border border-white/30 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
              title="Copy Promo Code"
            >
              <span>{deal.promoCode}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white/70" />}
            </button>

            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={handleTrackClick}
              className="flex-1 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>{deal.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
