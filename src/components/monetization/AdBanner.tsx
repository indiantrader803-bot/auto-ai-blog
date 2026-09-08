"use client";

import { useEffect } from "react";
import { DollarSign, ExternalLink, Zap } from "lucide-react";

interface AdBannerProps {
  slot?: "article-top" | "article-mid" | "article-sidebar" | "article-bottom" | "sticky-anchor" | string;
  format?: "horizontal" | "rectangle" | "vertical" | "sticky";
  className?: string;
}

export default function AdBanner({
  slot = "article-mid",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9768860457233655";

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, []);

  // Sticky Mobile Bottom Anchor Ad
  if (format === "sticky" || slot === "sticky-anchor") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 flex items-center justify-center shadow-2xl">
        <div className="max-w-xl w-full flex items-center justify-between gap-3 text-xs text-white">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">AD</span>
            <span className="truncate">Deploy H100 GPUs at $1.85/hr on HyperCompute</span>
          </div>
          <a
            href="https://amzn.to/4gJpL5u"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] shrink-0"
          >
            Claim 70% Off →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full max-w-3xl p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Zap className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                Sponsored Benchmark Partner
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Verified Enterprise Tier
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              TradingView Pro Charts &amp; Automated Technical Indicators
            </p>
          </div>
        </div>
        <a
          href="https://amzn.to/3UXVtTR"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="shrink-0 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
        >
          Open Free Terminal <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
