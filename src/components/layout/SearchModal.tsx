"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Flame, ArrowRight, Loader2, BookOpen } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?search=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        setResults(data.posts || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, technology trends, AI models, reviews..."
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base"
          />
          {loading && <Loader2 className="w-5 h-5 text-indigo-600 animate-spin mr-2" />}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hot Topics / Instant Tags */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-bold shrink-0">
            <Flame className="w-3.5 h-3.5 text-rose-500" /> Hot:
          </span>
          {["Autonomous AI", "Next.js 15", "Quantum Computing", "DeepSeek", "Cloud Edge", "Nvidia Blackwell"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.trim() && results.length === 0 && !loading && (
            <div className="text-center py-10 text-slate-400 text-sm">
              No matching articles found for &quot;{query}&quot;. Try exploring top categories.
            </div>
          )}

          {results.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200/50 dark:border-slate-700/50 group-hover:scale-105 transition-transform"
                />
              )}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {post.category?.name || "Tech"}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all self-center shrink-0" />
            </Link>
          ))}

          {!query.trim() && (
            <div className="py-8 px-4 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-indigo-500 mx-auto opacity-70" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type keywords above to instantly search through all editorial deep-dives, benchmark guides, and AI news.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd> to exit</span>
          <Link href="/" onClick={onClose} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            SmartMag Chronicle Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
