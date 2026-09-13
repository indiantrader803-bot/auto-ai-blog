"use client";

import { ShieldCheck, UserCheck, CheckCircle, Award } from "lucide-react";

interface FactCheckedBadgeProps {
  category?: string;
  authorName?: string;
}

export default function FactCheckedBadge({
  category = "Technology",
  authorName = "SmartMag Editorial Board",
}: FactCheckedBadgeProps) {
  return (
    <aside aria-label="Editorial Standards & Verification" className="my-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">
              Editorial Standards &amp; Verification
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/20">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Peer-reviewed by senior quantitative analysts and software architecture leads.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-500 dark:text-slate-400 font-medium border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-2 sm:pt-0 sm:pl-3">
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Fact-Checked</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
          <Award className="w-3.5 h-3.5" />
          <span>E-E-A-T Compliant</span>
        </div>
      </div>
    </aside>
  );
}
