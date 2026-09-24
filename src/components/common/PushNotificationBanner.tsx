"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bell,
  BellOff,
  X,
  CheckCheck,
  ExternalLink,
  Clock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string | null;
  readTimeMinutes?: number;
  publishedAt?: string | null;
  category?: { name: string; slug: string } | null;
}

const STORAGE_KEY = "smartmag_read_articles";
const MAX_STORED_IDS = 200;

function getReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveReadIds(ids: Set<string>) {
  try {
    // Keep only last MAX_STORED_IDS to avoid localStorage bloat
    const arr = Array.from(ids).slice(-MAX_STORED_IDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {}
}

export default function PushNotificationBanner() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [loadingArticles, setLoadingArticles] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize permission state and read IDs
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
    setReadIds(getReadIds());
  }, []);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Fetch latest articles for the notification dropdown
  const fetchArticles = useCallback(async () => {
    if (articles.length > 0) return; // Don't re-fetch if already loaded
    setLoadingArticles(true);
    try {
      const res = await fetch("/api/posts?limit=8&status=PUBLISHED", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setArticles(data.posts || data.data || []);
      }
    } catch {
      // Fallback: try the categories API for trending post
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.topTrendingPost) {
          setArticles([data.topTrendingPost]);
        }
      } catch {}
    } finally {
      setLoadingArticles(false);
    }
  }, [articles.length]);

  const handleToggleOpen = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    if (newOpen) {
      fetchArticles();
    }
  };

  const markAllAsRead = () => {
    const merged = Array.from(readIds).concat(articles.map((a) => a.id));
    const newReadIds = new Set<string>(merged);
    setReadIds(newReadIds);
    saveReadIds(newReadIds);
  };

  const markOneAsRead = (id: string) => {
    const newReadIds = new Set<string>(Array.from(readIds));
    newReadIds.add(id);
    setReadIds(newReadIds);
    saveReadIds(newReadIds);
  };


  const requestPushPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === "granted") {
        new Notification("SmartMag VIP Alerts Activated! 🚀", {
          body: "You'll receive instant push alerts for breaking AI & Market news.",
          icon: "/favicon.ico",
        });
      }
    } catch (e) {
      console.error("Push permission error:", e);
    }
  };

  const unreadCount = articles.filter((a) => !readIds.has(a.id)).length;

  const formatTime = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);
    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        ref={buttonRef}
        onClick={handleToggleOpen}
        className={`relative p-2.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
          isOpen
            ? "border-teal-400/60 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
            : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
        }`}
        aria-label="Notifications"
        title="Latest Articles & Push Alerts"
      >
        {permission === "granted" ? (
          <Bell className="w-4 h-4 text-emerald-500 fill-emerald-500/30" />
        ) : (
          <Bell className="w-4 h-4 text-indigo-500 animate-pulse" />
        )}
        <span className="hidden xl:inline text-[11px] font-bold">Alerts</span>
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden"
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-teal-500" />
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Latest Articles
              </h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-rose-500 text-white">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Push Notification Toggle */}
          {permission !== "granted" && (
            <div className="flex items-center justify-between px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 border-b border-indigo-100 dark:border-indigo-800/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold">Enable push alerts for breaking news</p>
              </div>
              <button
                onClick={requestPushPermission}
                className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer shrink-0"
              >
                Enable
              </button>
            </div>
          )}

          {/* Articles List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {loadingArticles ? (
              <div className="py-10 flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                <RefreshCw className="w-5 h-5 animate-spin text-teal-500" />
                <p className="text-xs font-semibold">Loading latest articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2 text-slate-400">
                <BellOff className="w-8 h-8 opacity-30" />
                <p className="text-xs">No articles found.</p>
              </div>
            ) : (
              articles.map((article) => {
                const isRead = readIds.has(article.id);
                return (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    onClick={() => { markOneAsRead(article.id); setIsOpen(false); }}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group ${isRead ? "opacity-60" : ""}`}
                  >
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
                      {article.featuredImage ? (
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {!isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block shrink-0" />
                        )}
                        {article.category && (
                          <span className="text-[9px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                            {article.category.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                        {article.readTimeMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{article.readTimeMinutes}m read
                          </span>
                        )}
                        {article.publishedAt && (
                          <span>{formatTime(article.publishedAt)}</span>
                        )}
                      </div>
                    </div>

                    <ExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-teal-400 shrink-0 mt-1 transition-colors" />
                  </Link>
                );
              })
            )}
          </div>

          {/* Popover Footer */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              View All Articles →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
