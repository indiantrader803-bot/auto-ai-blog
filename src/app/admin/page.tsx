"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Eye,
  DollarSign,
  Users,
  Wand2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/analytics");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Failed to load analytics", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const summary = data?.summary || {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    subscribersCount: 0,
    estimatedAdRevenue: "$0.00",
    estimatedAffiliateRevenue: "$0.00",
    totalEstimatedEarnings: "$0.00",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner & Quick Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Platform Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry, automated generation performance, and estimated platform monetization.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer shrink-0"
            title="Refresh metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/generator"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all text-center"
          >
            <Wand2 className="w-4 h-4" /> Run AI Generator Now
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Posts */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {summary.totalPosts}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {summary.publishedPosts} Published • {summary.draftPosts} Drafts
          </div>
        </div>

        {/* Total Views */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Impressions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {summary.totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> High SEO Organic Indexing
          </div>
        </div>

        {/* Estimated Earnings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Est. Monetization</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {summary.totalEstimatedEarnings}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {summary.estimatedAdRevenue} Ads • {summary.estimatedAffiliateRevenue} Affiliates
          </div>
        </div>

        {/* Newsletter Subscribers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Audience Subscribers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {summary.subscribersCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Direct email newsletter readers
          </div>
        </div>
      </div>

      {/* AI Autonomous Dedicated Swarm Monitor (7-Agent Team) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h2 className="text-lg font-black font-serif tracking-tight text-white">
                Dedicated AI Agent Swarm Fleet (24/7 Autonomous)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              7 specialized AI sub-agents coordinating trend scouting, long-form writing, editorial critique, HD visuals, video research, and sponsor discovery.
            </p>
          </div>

          <Link
            href="/admin/generator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-indigo-600/30"
          >
            <Wand2 className="w-3.5 h-3.5" /> Trigger Full Swarm Pipeline
          </Link>
        </div>

        {/* 7 Agents Live Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {/* Agent 1: Trend Scout */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Agent 01</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE 24/7</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">🌐 Trend Scout Agent</h4>
            <p className="text-[11px] text-slate-400">Real-time RSS, Google Trends &amp; HackerNews scraper.</p>
          </div>

          {/* Agent 2: Senior Writer */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">Agent 02</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">✍️ Senior Writer Agent</h4>
            <p className="text-[11px] text-slate-400">ExperientialLabs Claude Sonnet 4.5 (1600+ words).</p>
          </div>

          {/* Agent 3: Editorial Critic */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Agent 03</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">🧐 Critic &amp; Self-Heal</h4>
            <p className="text-[11px] text-slate-400">Automated quality scoring, depth check, and self-patching.</p>
          </div>

          {/* Agent 4: Art Director */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">Agent 04</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">🎨 Art Director Agent</h4>
            <p className="text-[11px] text-slate-400">Unsplash 4K photography curation &amp; AI art synthesis.</p>
          </div>

          {/* Agent 5: Video Researcher */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">Agent 05</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">🎬 Video Researcher</h4>
            <p className="text-[11px] text-slate-400">YouTube 4K technical breakdown contextual discovery.</p>
          </div>

          {/* Agent 6: Dedicated SEO Master Agent */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Agent 06</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">🎯 SEO Master Agent</h4>
            <p className="text-[11px] text-slate-400">Schema.org JSON-LD, internal linking, sitemaps &amp; SERP metadata.</p>
          </div>

          {/* Agent 7: Sponsor & Monetization */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Agent 07</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">💰 Sponsor &amp; Ad Optimizer</h4>
            <p className="text-[11px] text-slate-400">Contextual high-CPC sponsor matching &amp; affiliate card injection.</p>
          </div>

          {/* Agent 8: Swarm Telemetry & Collective Memory */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Agent 08</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">ACTIVE</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">📈 Telemetry &amp; Swarm Collective Memory</h4>
            <p className="text-[11px] text-slate-400">Continuous reader analytics telemetry and self-improving prompt memory.</p>
          </div>
        </div>
      </div>

      {/* Two Column Section: Category Distribution & Recent Pipeline Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Niche Category Distribution
          </h3>

          <div className="space-y-3 pt-2">
            {data?.categoryData?.length > 0 ? (
              data.categoryData.map((cat: any) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{cat.name}</span>
                    <span>{cat.count} articles</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (cat.count / (summary.totalPosts || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4">No categories populated yet.</p>
            )}
          </div>
        </div>

        {/* Recent Pipeline Logs (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" /> Recent Generation Engine Runs
            </h3>
            <Link
              href="/admin/logs"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Full Logs
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3 pt-2">
            {data?.recentLogs?.length > 0 ? (
              data.recentLogs.map((log: any) => (
                <div key={log.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {log.status === "SUCCESS" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : log.status === "FAILED" ? (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 shrink-0 animate-spin" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {log.topic}
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        {log.currentStep} • {log.durationSeconds ? `${log.durationSeconds.toFixed(1)}s` : "in progress"}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                      log.status === "SUCCESS"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : log.status === "FAILED"
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4">No recent generation logs.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" /> Recent Articles
          </h3>
          <Link
            href="/admin/posts"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Manage All Posts
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Views</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {data?.recentPosts?.length > 0 ? (
                data.recentPosts.map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-slate-800 dark:text-slate-200 max-w-xs truncate pr-4">
                      {p.title}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === "PUBLISHED"
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{p.views}</td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:underline"
                      >
                        View <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    No articles available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
