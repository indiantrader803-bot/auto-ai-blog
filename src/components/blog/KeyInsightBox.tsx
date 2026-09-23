"use client";

import { Lightbulb } from "lucide-react";

interface KeyInsightBoxProps {
  title?: string;
  insight?: string;
}

export default function KeyInsightBox({
  title = "Key Insight",
  insight = "Strategic adoption depends on technical execution, ecosystem integration, and regulatory alignment. Early movers gain significant efficiency and market positioning advantages.",
}: KeyInsightBoxProps) {
  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl border border-amber-300/40 dark:border-amber-500/20 bg-[#fffdf0] dark:bg-[#111922] shadow-sm transition-all flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-500 shadow-sm">
        <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {insight}
        </p>
      </div>
    </div>
  );
}
