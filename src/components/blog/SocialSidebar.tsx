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
      {/* 1. Editorial Trust & Research Desk (SmartMag Signature) */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Editorial Verification Desk
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
            100% Peer Verified
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Benchmark Lab Testing</span>
              <span className="text-emerald-500 font-mono text-[11px]">Active</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every technical benchmark, SWE-bench score, and hardware metric is verified on physical testbeds.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Zero Sponsored Bias</span>
              <span className="text-indigo-500 font-mono text-[11px]">Strict</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              All sponsor placements are transparently labeled with clear commercial disclosures.
            </p>
          </div>
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
                  <span className="text-amber-500 dark:text-amber-400 font-semibold flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 fill-current" />
                    {(post.views || 2400) >= 1000
                      ? `${((post.views || 2400) / 1000).toFixed(1)}k`
                      : `${post.views || 2400}`}
                  </span>
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

      {/* 4. High-Yield Prop Firm & Partner Hub Widget */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 border border-indigo-500/30 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              Verified Partner Offers
            </span>
          </div>
          <span className="text-[10px] font-bold text-amber-300">Active Deals</span>
        </div>

        {/* Offer 1: CK Capital */}
        <a
          href="https://app.ckcapital.co.uk/signup/ALPROP/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 transition-all"
        >
          <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
            <span className="group-hover:text-amber-300 transition-colors">CK Capital Funded Prop</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">10% Split</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug mb-2">
            Institutional UK &amp; global trading accounts. Code: <strong className="text-amber-300 font-mono">ALPROP</strong>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 group-hover:text-white font-bold">
            <span>Claim CK Capital Account (ALPROP)</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Offer 2: Funded Trader Markets */}
        <a
          href="https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all"
        >
          <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
            <span className="group-hover:text-emerald-300 transition-colors">Funded Trader Markets</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Up to $200k</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug mb-2">
            Trade with instant scaling, zero time limits &amp; lowest spreads. Code: <strong className="text-emerald-300 font-mono">SMARTMAG</strong>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 group-hover:text-white font-bold">
            <span>Claim $200k Funded Challenge</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Offer 2: MFFU */}
        <a
          href="https://mffu.com/f/85f1f73f30"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-3.5 rounded-2xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/50 transition-all"
        >
          <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
            <span className="group-hover:text-amber-300 transition-colors">MyFundedFutures (MFFU)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">90% Split</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug mb-2">
            Pass 1-day challenge up to $300k. Code: <strong className="text-amber-300 font-mono">FUTURES2026</strong>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-indigo-400 group-hover:text-white font-bold">
            <span>Get Funded Account</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Offer 2: Blue Guardian */}
        <a
          href="https://blueguardian.com/?afmc=1tgf"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-3.5 rounded-2xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 transition-all"
        >
          <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
            <span className="group-hover:text-amber-300 transition-colors">Blue Guardian Forex</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">$400k Max</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug mb-2">
            Unlimited trading days & Guardian Protector risk shield. Code: <strong className="text-amber-300 font-mono">GUARDIAN803</strong>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-indigo-400 group-hover:text-white font-bold">
            <span>Start Forex Challenge</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Offer 3: Digital Product Store */}
        <Link
          href="/store"
          className="group block p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20 border border-amber-500/30 transition-all"
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
            <span>Quant & AI Digital Store</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 font-mono">Instant DL</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug mb-2">
            Download trading indicators, source codes & prompt packs ($ USD / ₹ INR).
          </p>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 group-hover:text-white font-bold">
            <span>Browse Products & Use Coupon</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 5. Sponsored Ad Slot */}
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
