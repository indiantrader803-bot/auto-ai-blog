'use client';

import React from 'react';
import Link from 'next/link';
import { useVip } from '@/context/VipAuthContext';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { Lock, Sparkles, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

interface ArticleContentGateProps {
  fullContent: string;
  isLatestOrExclusive?: boolean;
  articleTitle: string;
  views?: number;
}

/**
 * ArticleContentGate
 * 
 * Logic:
 * - If user is logged-in VIP (isVip === true):
 *   -> Render 100% of the article content without any truncation.
 * 
 * - If user is a Normal Viewer / Non-VIP:
 *   -> Show an engaging glimpse (first 1/3 of paragraphs / content).
 *   -> Render an elegant gradient fade-out with blur.
 *   -> Render a high-conversion VIP Unlocking Terminal with instant register/login CTA.
 *   -> Shows exclusive perks that VIPs receive (Exclusive deep-dives, Pine Script code, full unredacted research).
 * 
 * - Seamlessly styled for both Light & Dark modes.
 */
export default function ArticleContentGate({
  fullContent,
  isLatestOrExclusive = true,
  articleTitle,
  views = 2800,
}: ArticleContentGateProps) {
  const { isVip, loading } = useVip();

  // If VIP user is logged in, show 100% of article
  if (isVip) {
    return (
      <div className="space-y-6">
        {/* VIP Member Recognition Banner */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <span className="text-base sm:text-lg">👑</span>
            <span>VIP Unlocked: You are enjoying full uncensored institutional coverage</span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
            Active VIP Pass
          </span>
        </div>

        <MarkdownRenderer content={fullContent} />
      </div>
    );
  }

  // Calculate 1/3 glimpse for normal viewers
  // Split by markdown paragraphs (double newlines or headings)
  const paragraphs = fullContent.split(/\n\s*\n/);
  const totalParagraphs = paragraphs.length;

  // Take roughly 1/3 (minimum 2 paragraphs, max 5 paragraphs for glimpse)
  const glimpseCount = Math.max(2, Math.min(5, Math.ceil(totalParagraphs / 3)));
  const glimpseContent = paragraphs.slice(0, glimpseCount).join('\n\n');

  return (
    <div className="relative">
      {/* 1/3 Glimpse of the Article */}
      <div className="relative">
        <MarkdownRenderer content={glimpseContent} />

        {/* Gradient Blur Mask over the ending of the glimpse */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#070c18] dark:via-[#070c18]/80 dark:to-transparent pointer-events-none" />
      </div>

      {/* High-Conversion VIP Gate Box */}
      <div className="relative -mt-10 z-10 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 text-white p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-wider shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>VIP Exclusive Deep Dive</span>
            {views >= 2000 && (
              <span className="flex items-center gap-1 text-slate-300 ml-1 border-l border-amber-500/30 pl-2">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> Trending Viral
              </span>
            )}
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white leading-tight">
            You&apos;ve reached the free preview of this exclusive article
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            You are reading <strong className="text-amber-300">&apos;{articleTitle}&apos;</strong>. The remaining <strong>67%</strong> containing proprietary benchmarks, verified code snippets, and institutional analysis is reserved exclusively for registered VIP members.
          </p>

          {/* Value Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left max-w-md mx-auto pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Full Unredacted Article Access</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Pine Script &amp; Code Indicators</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold shrink-0">📊</span>
              <span>Institutional Research Dossiers</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold shrink-0">⚡</span>
              <span>Authentic Daily Email Briefs</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/vip/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.99]"
            >
              <span>Unlock Full Article Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/vip/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-700 hover:border-slate-600 text-sm flex items-center justify-center"
            >
              VIP Member Sign In
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 pt-1">
            Free forever for early readers • Takes 15 seconds • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
