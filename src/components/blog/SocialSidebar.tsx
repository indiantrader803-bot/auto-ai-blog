"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  TrendingUp,
  Twitter,
  Youtube,
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle,
  Tag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import AdBanner from "../monetization/AdBanner";

interface SocialSidebarProps {
  trendingPosts: any[];
  recentPosts: any[];
  categories: any[];
}

export default function SocialSidebar({
  trendingPosts,
  recentPosts,
  categories,
}: SocialSidebarProps) {
  const [activeTab, setActiveTab] = useState<"trending" | "recent">("trending");
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const displayedPosts = activeTab === "trending" ? trendingPosts : recentPosts;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubscribing(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "sidebar_widget" }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <aside className="space-y-8">
      {/* 1. Social Follow Counter Widget (SmartMag Style) */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <span>Stay Connected</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:scale-102 transition-transform"
          >
            <div className="p-2 rounded-xl bg-sky-500 text-white shadow-sm">
              <Twitter className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-black">48.2k</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Followers</div>
            </div>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:scale-102 transition-transform"
          >
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-sm">
              <Youtube className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-black">92.5k</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Subscribers</div>
            </div>
          </a>

          <a
            href="https://github.com/indiantrader803-bot/auto-ai-blog"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-102 transition-transform"
          >
            <div className="p-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm">
              <Github className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-black">14.8k</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Stars</div>
            </div>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:scale-102 transition-transform"
          >
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
              <Linkedin className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-black">35.0k</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Members</div>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Tabbed Posts Widget [Trending | Recent] (SmartMag signature) */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-1">
          <button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "trending"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "recent"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Latest</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 space-y-3.5">
          {displayedPosts.slice(0, 5).map((post, idx) => (
            <Link
              key={post.id || idx}
              href={`/blog/${post.slug}`}
              className="group pt-3.5 first:pt-0 flex items-start gap-3.5 block"
            >
              {post.featuredImage ? (
                <div className="relative shrink-0">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200/50 dark:border-slate-700/50 group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black font-serif flex items-center justify-center shadow">
                    {idx + 1}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-black text-slate-300 dark:text-slate-700 font-serif shrink-0">
                  0{idx + 1}
                </span>
              )}

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {post.category?.name || "Tech"}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-serif mt-0.5">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span>{post.readTimeMinutes || 5} min read</span>
                  <span>•</span>
                  <span>{post.views || 450} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Newsletter Box (SmartMag Luxury Style) */}
      <div
        id="newsletter-subscribe"
        className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-7 shadow-xl border border-indigo-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-400 border border-white/10">
            <Mail className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-lg font-black font-serif tracking-tight text-white">
              The Morning Dispatch
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Join 65,000+ engineers, researchers, and tech founders receiving our daily curated AI intelligence briefing.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>You&apos;re in! Check your inbox for our latest briefing.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-400 backdrop-blur-md"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                {subscribing ? "Subscribing..." : "Get Free Dispatch"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>No spam. 1-click unsubscribe anytime.</span>
          </div>
        </div>
      </div>

      {/* 4. Sponsored Ad Slot */}
      <AdBanner slot="sidebar-smartmag" format="rectangle" />

      {/* 5. Categories & Topics Widget */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
            Topic Hubs
          </span>
          <Tag className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="space-y-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-medium">
                {c.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {c._count?.posts || 6}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
