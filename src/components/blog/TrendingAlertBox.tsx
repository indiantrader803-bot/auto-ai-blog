"use client";

import Link from "next/link";
import { Flame, ArrowRight, TrendingUp } from "lucide-react";

interface Props {
  story: {
    title: string;
    slug: string;
    category: string;
    views: number;
  };
}

export default function TrendingAlertBox({ story }: Props) {
  const handleClick = () => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "RELATED_CLICK",
          slug: story.slug,
          metadata: { targetTitle: story.title, source: "in-article-alert" },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 dark:border-indigo-500/20 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
        <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
        <span>Trending High-Velocity Market Breakdown</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {story.category} • {(story.views || 4200).toLocaleString()} readers
          </span>
          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-serif hover:text-indigo-600 transition-colors">
            <Link href={`/blog/${story.slug}`} onClick={handleClick}>
              {story.title}
            </Link>
          </h4>
        </div>

        <Link
          href={`/blog/${story.slug}`}
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-md hover:opacity-90 transition-all shrink-0 active:scale-95"
        >
          <span>Read Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
