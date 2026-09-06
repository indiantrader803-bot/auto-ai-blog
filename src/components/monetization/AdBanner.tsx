"use client";

import { useEffect } from "react";
import { DollarSign, ExternalLink } from "lucide-react";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export default function AdBanner({
  slot = "default",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (adsenseClientId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, [adsenseClientId]);

  if (adsenseClientId) {
    return (
      <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
          Advertisement
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Stylish Sponsor & High-Converting Placeholder Unit
  return (
    <div
      className={`my-8 p-4 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-200/80 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
              Sponsored Slot
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              High-Converting Partner Offer
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
            Supercharge Your AI Infrastructure with 70% Off Cloud Workloads
          </p>
        </div>
      </div>
      <a
        href="https://digitalocean.com"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="shrink-0 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
      >
        Claim Deal <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
