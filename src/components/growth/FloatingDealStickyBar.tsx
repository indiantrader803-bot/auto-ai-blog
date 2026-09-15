"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X, ShieldCheck, Copy, Check, Flame, Gift, Plane, Building, Percent } from "lucide-react";

interface FloatingDealStickyBarProps {
  categorySlug?: string;
  articleTitle?: string;
}

export default function FloatingDealStickyBar({ categorySlug, articleTitle }: FloatingDealStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }

    // Show after scrolling 300px or after 3.5 seconds
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 3500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isDismissed]);

  // Determine most relevant high-converting offer based on path & context
  const isTravel = pathname.includes("/travel") || categorySlug?.includes("travel") || articleTitle?.toLowerCase().includes("travel") || articleTitle?.toLowerCase().includes("itinerary") || articleTitle?.toLowerCase().includes("kerala") || articleTitle?.toLowerCase().includes("ladakh") || articleTitle?.toLowerCase().includes("japan") || articleTitle?.toLowerCase().includes("goa") || articleTitle?.toLowerCase().includes("dubai");
  const isAtlas = articleTitle?.toLowerCase().includes("atlas") || articleTitle?.toLowerCase().includes("futures");
  const isAqua = articleTitle?.toLowerCase().includes("aqua") || articleTitle?.toLowerCase().includes("eval") || categorySlug?.includes("forex");

  const deal = isTravel
    ? {
        badge: "✈️ 2026 TRAVEL MEMBER RATES",
        title: "Booking.com & Aviasales: Up to 40% OFF",
        subtitle: "Pre-filled flight routes, verified boutique stays & free cancellation.",
        promoCode: "TRAVEL2026",
        buttonText: "Search Live Deals",
        url: "https://travel.thesmartmag.com",
        platform: "Travel Portal",
        colorScheme: "from-sky-600 via-indigo-600 to-blue-700",
      }
    : isAtlas
    ? {
        badge: "ATLAS FUNDED 20% DISCOUNT",
        title: "Atlas Funded: Scale Up to $200,000",
        subtitle: "Rapid evaluation passing, lowest spreads & instant profit withdrawals.",
        promoCode: "12275",
        buttonText: "Claim Atlas ($200k)",
        url: "https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN",
        platform: "Atlas Funded",
        colorScheme: "from-amber-600 via-yellow-600 to-orange-700",
      }
    : isAqua
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
    : {
        badge: "🔥 10% OFF + 90% PROFIT SPLIT",
        title: "Funded Trader Markets: Scale to $200k",
        subtitle: "Zero time limits, raw institutional spreads & on-demand payouts.",
        promoCode: "arnab",
        buttonText: "Claim FTM Challenge",
        url: "https://fundedtradermarkets.com/ref/arnab",
        platform: "Funded Trader Markets",
        colorScheme: "from-purple-600 via-indigo-600 to-indigo-800",
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
      <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${deal.colorScheme} text-white shadow-2xl shadow-black/50 border-2 border-white/30 relative overflow-hidden backdrop-blur-md`}>
        {/* Glow ambient effects */}
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />

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
              <Flame className="w-3 h-3 text-amber-300 animate-pulse" />
              {deal.badge}
            </span>
            <span className="text-[10px] text-emerald-200 font-bold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-300" /> 100% Verified
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-snug">
              {deal.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-white/90 line-clamp-1 mt-0.5">
              {deal.subtitle}
            </p>
          </div>

          {/* Promo Code Pill & Direct Action Button */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/40 text-amber-300 text-xs font-mono font-black flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
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
              className="flex-1 px-4 py-2 rounded-xl bg-white hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{deal.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

