"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, FileText, Zap, Compass, CheckCircle2 } from "lucide-react";

interface SubNavbarHeroBannerProps {
  badgeText?: string;
  title?: string;
  subLabel?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function SubNavbarHeroBanner({
  badgeText = "PATIENT WARMING · FORCED AIR · AI SIGNALS",
  title = "Mistral-Air® Warming Unit & AI Intelligence",
  subLabel = "MA1200 · 2026 EDITION · 24/7 AUTOPILOT FLEET",
  primaryButtonText = "Request quote",
  primaryButtonLink = "/contact",
  secondaryButtonText = "← All Products",
  secondaryButtonLink = "/store",
}: SubNavbarHeroBannerProps) {
  return (
    <div className="w-full bg-[#ff3b00] bg-gradient-to-r from-[#ff3400] via-[#ff4500] to-[#ff2b00] text-white py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 border-b border-[#e03400] shadow-inner relative overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Left: Pill Tag, Large Bold Title & Sub-code */}
        <div className="space-y-1.5 min-w-0">
          {/* Top Pill Category Tag (Exact match with reference image) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-[10px] sm:text-xs font-black uppercase tracking-wider text-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{badgeText}</span>
          </div>

          {/* Large Bold Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight font-sans drop-shadow-sm truncate">
            {title}
          </h2>

          {/* Sub-label / Model Code */}
          <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white/95 flex items-center gap-2">
            <span>{subLabel}</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/60" />
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-100 bg-emerald-700/40 px-2 py-0.5 rounded border border-emerald-300/30">
              <CheckCircle2 className="w-3 h-3 text-emerald-300" /> LIVE 24/7
            </span>
          </div>
        </div>

        {/* Right: Dual Pill Action Buttons (Exact visual style from uploaded image) */}
        <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
          {/* 1. White Solid Button with Orange Text & Document/Quote Icon */}
          <Link
            href={primaryButtonLink}
            className="px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#ff3b00] hover:bg-slate-100 font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-black/10 hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#ff3b00] group-hover:scale-110 transition-transform" />
            <span>{primaryButtonText}</span>
            <span className="text-[10px] font-bold opacity-80 group-hover:translate-x-0.5 transition-transform">↗</span>
          </Link>

          {/* 2. Semi-translucent Pill Button with White Border */}
          <Link
            href={secondaryButtonLink}
            className="px-5 py-2 sm:py-2.5 rounded-full border border-white/70 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-wide backdrop-blur-sm transition-all duration-200 flex items-center gap-2 group cursor-pointer"
          >
            <span>{secondaryButtonText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
