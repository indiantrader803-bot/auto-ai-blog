"use client";

import { useState, useEffect } from "react";
import { DollarSign, ExternalLink, Zap, Shield, Flame, Award, Sparkles, ArrowRight, Tag } from "lucide-react";
import { DYNAMIC_AD_CREATIVES, getContextualBanner, DynamicAdCreative } from "@/lib/pipeline/agents/adBannerIntelligenceAgent";

interface AdBannerProps {
  slot?: "article-top" | "article-mid" | "article-sidebar" | "article-bottom" | "sticky-anchor" | string;
  format?: "horizontal" | "rectangle" | "vertical" | "sticky";
  category?: string;
  className?: string;
}

export default function AdBanner({
  slot = "article-mid",
  format = "horizontal",
  category = "Prop Trading",
  className = "",
}: AdBannerProps) {
  const [creative, setCreative] = useState<DynamicAdCreative>(DYNAMIC_AD_CREATIVES[0]);

  useEffect(() => {
    const matchedSlot = slot.includes("top")
      ? "article-top"
      : slot.includes("bottom")
      ? "article-bottom"
      : slot.includes("sidebar")
      ? "sidebar"
      : slot.includes("sticky")
      ? "sticky-bar"
      : "article-mid";
    const selected = getContextualBanner(category, matchedSlot as any);
    setCreative(selected);
  }, [category, slot]);

  const renderIcon = (type: string) => {
    switch (type) {
      case "shield":
        return <Shield className="w-5 h-5 text-blue-300" />;
      case "award":
        return <Award className="w-5 h-5 text-emerald-300" />;
      case "flame":
        return <Flame className="w-5 h-5 text-cyan-300" />;
      case "dollar":
        return <DollarSign className="w-5 h-5 text-amber-300" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-orange-300" />;
      default:
        return <Zap className="w-5 h-5 text-indigo-300" />;
    }
  };

  // Sticky Mobile / Desktop Bottom Anchor Ad
  if (format === "sticky" || slot === "sticky-anchor") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center justify-center shadow-2xl">
        <div className="max-w-4xl w-full flex items-center justify-between gap-3 text-xs text-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase tracking-wider shrink-0">
              {creative.badge}
            </span>
            <span className="font-semibold truncate text-slate-200">
              {creative.title}: <span className="text-slate-400 hidden sm:inline">{creative.subtitle}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {creative.promoCode && (
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 text-amber-400 font-mono border border-slate-700">
                <Tag className="w-3 h-3" /> Code: {creative.promoCode}
              </span>
            )}
            <a
              href={creative.targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 active:scale-95"
            >
              {creative.ctaText}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Full-width High-Converting Interactive Banner
  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full max-w-4xl p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />
        <div className="flex items-start sm:items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            {renderIcon(creative.iconType)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {creative.badge}
              </span>
              <span className="text-[11px] text-slate-400">
                {creative.discountText}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white mt-1">
              {creative.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
              {creative.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto justify-end">
          <a
            href={creative.targetUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 text-center shrink-0"
          >
            {creative.ctaText}
          </a>
        </div>
      </div>
    </div>
  );
}
