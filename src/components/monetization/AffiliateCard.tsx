"use client";

import { Star, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";

interface AffiliateCardProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  slug?: string;
}

export default function AffiliateCard({
  title = "TradingView Pro Charts & Indicators",
  subtitle = "The world's leading charting platform for Indian Markets, US Stocks, Forex, and Crypto.",
  rating = 4.9,
  features = [
    "Real-time data feeds for NSE, BSE, S&P 500, and MCX",
    "100+ technical indicators, volume profiles & pattern screeners",
    "Multi-chart layouts with custom alert webhooks",
  ],
  ctaText = "Start Free 30-Day Pro Trial",
  ctaLink = "https://www.tradingview.com/?aff_id=autoai",
  badge = "Editor's Choice",
  slug,
}: AffiliateCardProps) {
  const handleClick = () => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "AFFILIATE_CLICK",
          slug: slug || null,
          metadata: { title, ctaLink },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 p-6 shadow-lg shadow-indigo-500/5 relative overflow-hidden">
      {/* Decorative top badge */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          {badge}
        </span>
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
            {rating}/5.0
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
        {subtitle}
      </p>

      {/* Feature Checkmarks */}
      <ul className="space-y-2 mb-6 text-sm text-slate-700 dark:text-slate-300">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button & Disclaimer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          * Verified Financial &amp; Tech Partner. Special reader access.
        </span>
        <a
          href={ctaLink}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all active:scale-95"
        >
          {ctaText} <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
