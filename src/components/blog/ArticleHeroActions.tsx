"use client";

import { useState } from "react";
import { Bookmark, Link2, Check, Share2, Twitter, Linkedin, Facebook } from "lucide-react";

interface ArticleHeroActionsProps {
  title: string;
  slug: string;
}

export default function ArticleHeroActions({ title, slug }: ArticleHeroActionsProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://thesmartmag.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
      {/* Bookmark Button */}
      <button
        type="button"
        onClick={() => setBookmarked(!bookmarked)}
        aria-label="Bookmark article"
        className={`p-2 rounded-full border transition-all ${
          bookmarked
            ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-600 dark:text-teal-400"
            : "bg-white/80 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
      </button>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="p-2 rounded-full border bg-white/80 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all relative"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Link2 className="w-3.5 h-3.5" />
        )}
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white whitespace-nowrap shadow-md">
            Copied!
          </span>
        )}
      </button>

      {/* Share Actions */}
      <div className="flex items-center gap-1.5 pl-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
          Share
        </span>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="p-2 rounded-full border bg-white/80 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
        >
          <Twitter className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="p-2 rounded-full border bg-white/80 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="p-2 rounded-full border bg-white/80 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
        >
          <Facebook className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
