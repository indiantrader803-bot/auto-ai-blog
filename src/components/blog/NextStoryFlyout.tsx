"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Sparkles, Clock, Eye, Flame } from "lucide-react";

interface NextStoryFlyoutProps {
  nextPost: {
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage?: string | null;
    readTimeMinutes?: number;
    views?: number;
    category?: {
      name: string;
      slug: string;
    } | null;
  } | null;
}

export default function NextStoryFlyout({ nextPost }: NextStoryFlyoutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!nextPost || dismissed) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = scrollY / scrollHeight;
        // Show when scrolled past 50%
        if (progress > 0.50 && !dismissed) {
          setIsVisible(true);
        } else if (progress <= 0.20) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPost, dismissed]);

  if (!nextPost || dismissed) return null;

  const viewsFormatted = (nextPost.views || 2400) >= 1000
    ? `${((nextPost.views || 2400) / 1000).toFixed(1)}k`
    : `${nextPost.views || 2400}`;

  return (
    <aside
      aria-label="Recommended next story"
      className={`fixed bottom-20 right-4 sm:right-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 shadow-2xl"
          : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative rounded-2xl p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 shadow-indigo-500/10 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

        {/* Header with dismiss button */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 text-[11px]">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>Up Next For You</span>
          </div>

          <button
            onClick={() => {
              setDismissed(true);
              setIsVisible(false);
            }}
            aria-label="Dismiss next story recommendation"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Card Preview */}
        <div className="flex gap-3 items-start">
          {nextPost.featuredImage && (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <img
                src={nextPost.featuredImage}
                alt={nextPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {nextPost.category && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                {nextPost.category.name}
              </span>
            )}
            <Link
              href={`/blog/${nextPost.slug}`}
              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 leading-snug transition-colors"
            >
              {nextPost.title}
            </Link>

            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-0.5">
                <Clock className="w-3 h-3 text-slate-400" /> {nextPost.readTimeMinutes || 5}m
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-semibold">
                <Eye className="w-3 h-3" /> {viewsFormatted} reads
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Link
            href={`/blog/${nextPost.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all hover:gap-2"
          >
            <span>Continue Reading</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
