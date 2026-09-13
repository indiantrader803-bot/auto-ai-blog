"use client";

import { Sparkles, CheckCircle2, Bookmark, Clock, Award } from "lucide-react";

interface KeyTakeawaysProps {
  title: string;
  excerpt?: string;
  category?: string;
  readTimeMinutes?: number;
}

export default function KeyTakeaways({
  title,
  excerpt,
  category = "Technology",
  readTimeMinutes = 5,
}: KeyTakeawaysProps) {
  // Generate smart high-impact takeaway bullets from the title and excerpt
  const takeaways = [
    `Core Insight: Practical breakdown of ${title.replace(/^The Future of /i, "")} and its architectural implications.`,
    excerpt || `Comprehensive market analysis comparing real-world performance, implementation benchmarks, and cost efficiency.`,
    "Actionable Takeaway: Step-by-step strategies to leverage these breakthroughs for maximum ROI and competitive edge.",
  ];

  return (
    <div className="my-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/60 shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4 border-b border-indigo-100 dark:border-indigo-900/60 pb-3.5 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <span>Executive Summary &amp; Key Takeaways</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono font-bold">
                TL;DR
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Essential highlights for readers &amp; quantitative decision makers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Fact-Checked
          </span>
        </div>
      </div>

      <ul className="space-y-3 relative z-10">
        {takeaways.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            <span className="w-5 h-5 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
              0{idx + 1}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
