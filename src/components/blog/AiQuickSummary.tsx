"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, Volume2, Globe, FileText, Check } from "lucide-react";
import LanguageSelector from "../layout/LanguageSelector";

interface AiQuickSummaryProps {
  title: string;
  excerpt?: string;
  category?: string;
  points?: string[];
  onListenClick?: () => void;
}

export default function AiQuickSummary({
  title,
  excerpt,
  category = "Finance",
  points,
  onListenClick,
}: AiQuickSummaryProps) {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate 4 clean key points matching the mockup style
  const defaultPoints = [
    `What ${title.length > 40 ? title.slice(0, 40) + "..." : title} is and why it matters`,
    "Key opportunities and potential risks across global markets",
    "How it impacts international infrastructure and institutional adoption",
    "What key indicators to watch for next in this sector",
  ];

  const displayPoints = points && points.length >= 3 ? points.slice(0, 4) : defaultPoints;

  const handleTriggerAudio = () => {
    if (onListenClick) {
      onListenClick();
    } else {
      // Find audio player trigger on page or scroll to it
      const audioBtn = document.querySelector<HTMLButtonElement>("[data-audio-trigger]");
      if (audioBtn) {
        audioBtn.click();
      } else {
        const audioSection = document.getElementById("article-audio-player");
        if (audioSection) {
          audioSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="relative rounded-2xl border border-teal-500/20 dark:border-teal-500/30 bg-[#ebf8fa] dark:bg-[#071926]/90 p-5 sm:p-6 shadow-sm overflow-hidden transition-all group">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4 mb-2 relative z-10">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm sm:text-base">
          <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
          <span>AI Quick Summary</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100/80 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700/60">
          30 sec read
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 relative z-10">
        Get the key points before reading the full article.
      </p>

      {/* Content & Right Graphic Grid */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        {/* Bullet points */}
        <ul className="space-y-2.5 flex-1 min-w-0">
          {displayPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-snug">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {/* Abstract Graphic on Right Side (Matching Mockup) */}
        <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-xl bg-teal-100/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 shrink-0 self-center">
          <div className="w-10 h-8 flex flex-col justify-between items-start">
            <span className="w-8 h-1.5 rounded-full bg-teal-400 dark:bg-teal-400/80" />
            <span className="w-6 h-1.5 rounded-full bg-teal-300 dark:bg-teal-500/60" />
            <span className="w-7 h-1.5 rounded-full bg-teal-400 dark:bg-teal-400/80" />
            <span className="w-5 h-1.5 rounded-full bg-teal-300 dark:bg-teal-500/60" />
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-5 pt-4 border-t border-teal-200/60 dark:border-teal-800/40 flex flex-wrap items-center gap-2.5 relative z-10">
        <button
          type="button"
          onClick={handleTriggerAudio}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-300 dark:hover:border-teal-700 transition-colors shadow-sm cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Listen</span>
        </button>

        <button
          type="button"
          onClick={() => setShowLanguageModal(!showLanguageModal)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-300 dark:hover:border-teal-700 transition-colors shadow-sm cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Translate</span>
        </button>

        {showLanguageModal && (
          <div className="absolute top-full left-0 mt-2 z-50 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
            <LanguageSelector />
          </div>
        )}
      </div>
    </div>
  );
}
