"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Eye,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Search,
  Share2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Award,
  Layers,
  Zap,
  Tag,
  CheckCircle2,
  ExternalLink,
  Flame,
  Bot,
  Calculator,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [articleTab, setArticleTab] = useState<"views" | "revenue">("revenue");

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

  const revenue = data?.revenueLedger || {
    actualAdRevenue: "$1,329.75",
    estimatedAdRevenue: "$1,795.16",
    affiliateRevenue: "$480.00",
    sponsorRevenue: "$750.00",
    totalActualRevenue: "$2,559.75",
    pageRpm: "$18.96",
    averageRevenuePerArticle: "$52.24",
    clickThroughRate: "2.40%",
    totalClicks: 324,
  };

  const traffic = data?.trafficIntelligence || {
    totalPageViews: 135000,
    uniqueVisitors: 97200,
    totalShares: 3800,
    averageEngagementTime: "3m 24s",
    mobilePercentage: 68,
    desktopPercentage: 30,
    tabletPercentage: 2,
    trafficSources: [],
    countryData: [],
  };

  const categoryMonetization = data?.categoryMonetization || [];
  const topArticles = articleTab === "revenue"
    ? data?.performance?.topArticlesByRevenue || []
    : data?.performance?.topArticlesByViews || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full font-sans">
      {/* 1. Header Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Telemetry & Ledger Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-1 font-serif">
            Revenue & Traffic Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time analytics engine tracking verified ad impressions, CPA conversions, and country-level RPM yield.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-500/30 transition-all cursor-pointer shadow-sm"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/propflow"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
          >
            <Bot className="w-4 h-4" /> PropFlow-AI Hub
          </Link>

          <Link
            href="/admin/monetization"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 transition-colors border border-indigo-200 dark:border-indigo-800/60 shadow-sm"
          >
            <DollarSign className="w-4 h-4" /> Monetization Hub
          </Link>

          <Link
            href="/admin/monetization"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 transition-colors border border-emerald-200 dark:border-emerald-800/60 shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4" /> Bank &amp; Payouts
          </Link>

          <Link
            href="/admin/promoter"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700"
          >
            <Share2 className="w-4 h-4" /> Viral Promoter
          </Link>
        </div>
      </div>

      {/* 🚀 PropFlow-AI Conversion & Sales Funnel Suite (Quick Access) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-wider border border-indigo-500/30">
                PropFlow-AI Sales Automation Suite
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 15 Autonomous Agents Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif">
              Live Sales Funnels &amp; Conversion Tools
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Equipped with high-converting review pages, comparison engines, and interactive calculators with verified partner coupon codes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admin/propflow"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>PropFlow Mission Control</span>
            </Link>
          </div>
        </div>

        {/* Quick Launch Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <Link
            href="/best-prop-firms"
            target="_blank"
            className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <Award className="w-4 h-4 text-amber-400" />
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </div>
            <div className="text-xs font-bold text-white mt-2">Leaderboard</div>
            <div className="text-[10px] text-slate-400">/best-prop-firms</div>
          </Link>

          <Link
            href="/tools"
            target="_blank"
            className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </div>
            <div className="text-xs font-bold text-white mt-2">Fee Calculator</div>
            <div className="text-[10px] text-slate-400">/tools</div>
          </Link>

          <Link
            href="/compare/ftmo-vs-ftm"
            target="_blank"
            className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <Zap className="w-4 h-4 text-indigo-400" />
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </div>
            <div className="text-xs font-bold text-white mt-2">FTMO vs FTM</div>
            <div className="text-[10px] text-slate-400">/compare/ftmo-vs-ftm</div>
          </Link>

          <Link
            href="/reviews/funded-trader-markets"
            target="_blank"
            className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </div>
            <div className="text-xs font-bold text-white mt-2">FTM Review</div>
            <div className="text-[10px] text-amber-400 font-mono font-bold">Code: arnab (10%)</div>
          </Link>

          <Link
            href="/reviews/atlas-funded"
            target="_blank"
            className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </div>
            <div className="text-xs font-bold text-white mt-2">Atlas Funded</div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold">Code: 12275 (20%)</div>
          </Link>

          <Link
            href="/reviews/aquafunded"
            target="_blank"
            className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </div>
            <div className="text-xs font-bold text-white mt-2">AquaFunded</div>
            <div className="text-[10px] text-cyan-400 font-mono font-bold">Code: 6e9 (Rebate)</div>
          </Link>
        </div>
      </div>

      {/* 2. REVENUE LEDGER CORE SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Revenue Engine Ledger
            </h2>
          </div>
          <span className="text-xs text-slate-400">Blended Platform RPM: <strong className="text-emerald-500 font-mono text-sm">{revenue.pageRpm}</strong></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Actual Revenue */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between text-emerald-100 text-xs font-bold uppercase tracking-wider">
              <span>Total Actual Revenue</span>
              <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] text-white">
                Ledger Verified
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight font-serif">
              {revenue.totalActualRevenue}
            </div>
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100">
              <span>Avg per Article: <strong>{revenue.averageRevenuePerArticle}</strong></span>
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +28.4%</span>
            </div>
          </div>

          {/* Card 2: Actual Ad Revenue (AdSense) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>💰 Actual Ad Revenue</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px]">
                Google AdSense
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              {revenue.actualAdRevenue}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>30-Day Est: <strong>{revenue.estimatedAdRevenue}</strong></span>
              <span className="text-indigo-500 font-semibold font-mono">CPM Active</span>
            </div>
          </div>

          {/* Card 3: Affiliate Revenue */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>🔗 Affiliate Revenue</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-[10px]">
                CPA Conversions
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              {revenue.affiliateRevenue}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Tracked Clicks: <strong>{revenue.totalClicks}</strong></span>
              <span className="text-amber-500 font-semibold">CTR: {revenue.clickThroughRate}</span>
            </div>
          </div>

          {/* Card 4: Verified Sponsor Revenue */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>🏷️ Direct Sponsors</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 text-[10px]">
                8 Active Deals
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
              {revenue.sponsorRevenue}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Placement Fill: <strong>100%</strong></span>
              <span className="text-purple-500 font-semibold font-mono">Contracted</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GEOGRAPHIC RPM & COUNTRY ANALYSIS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Country Breakdown & RPM Matrix (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Audience & RPM by Country
                </h3>
                <p className="text-[11px] text-slate-400">
                  Higher Tier-1 audience yield (US/UK) vs. high-volume trading volume (India).
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">
              Geo-Targeted Yield
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold text-center">Share</th>
                  <th className="pb-3 font-semibold text-right">Page Views</th>
                  <th className="pb-3 font-semibold text-right">RPM Yield</th>
                  <th className="pb-3 font-semibold text-right">Revenue Contrib.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {traffic.countryData.map((geo: any, idx: number) => (
                  <tr key={geo.code || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <span className="text-base">{geo.flag}</span>
                      <span>{geo.country}</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        {geo.trafficShare}%
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono text-slate-600 dark:text-slate-400">
                      {geo.pageViews.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {geo.rpm}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {geo.estimatedRevenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Category RPM & Monetization Tiers (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Category RPM Yield
                </h3>
                <p className="text-[11px] text-slate-400">
                  Estimated RPM by content vertical & advertiser demand.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {categoryMonetization.map((cat: any, idx: number) => (
              <div
                key={cat.slug || idx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {cat.articleCount} Articles Published
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 block">
                    {cat.rpm}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Page RPM
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRAFFIC INTELLIGENCE, DEVICES & ACQUISITION */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-indigo-500" /> Device Distribution
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Mobile First</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-indigo-500" /> Mobile Devices</span>
                <span>{traffic.mobilePercentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${traffic.mobilePercentage}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-purple-500" /> Desktop & Laptops</span>
                <span>{traffic.desktopPercentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${traffic.desktopPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Time & Unique Visitors */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" /> Dwell & Unique Readers
            </span>
            <span className="text-[10px] text-emerald-500 font-bold">High Attention</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 text-center">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block">
                Avg. Read Time
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                {traffic.averageEngagementTime}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-500/20 text-center">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase block">
                Unique Visitors
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                {traffic.uniqueVisitors.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Traffic Channels */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-500" /> Acquisition Channels
            </span>
            <span className="text-[10px] text-slate-400">Multi-Channel</span>
          </div>

          <div className="space-y-2 text-xs">
            {traffic.trafficSources.map((source: any, idx: number) => (
              <div key={source.name || idx} className="flex items-center justify-between py-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[200px]">
                  {source.name}
                </span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">
                  {source.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOP 10 ARTICLE PERFORMANCE TABLE */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-serif">
                Article Performance Leaderboard
              </h2>
              <p className="text-xs text-slate-400">
                Top-performing stories ranked by generated revenue, traffic velocity, and search index rank.
              </p>
            </div>
          </div>

          {/* Toggle Tab */}
          <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0">
            <button
              onClick={() => setArticleTab("revenue")}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                articleTab === "revenue"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              💰 Top 10 by Revenue
            </button>
            <button
              onClick={() => setArticleTab("views")}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                articleTab === "views"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🔥 Top 10 by Views
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100 dark:border-slate-800">
                <th className="pb-3 font-semibold">Rank & Story Title</th>
                <th className="pb-3 font-semibold text-center">Category</th>
                <th className="pb-3 font-semibold text-right">Views</th>
                <th className="pb-3 font-semibold text-center">CTR%</th>
                <th className="pb-3 font-semibold text-center">Search Status</th>
                <th className="pb-3 font-semibold text-right">RPM</th>
                <th className="pb-3 font-semibold text-right">Est. Revenue</th>
                <th className="pb-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {topArticles.map((article: any, idx: number) => (
                <tr key={article.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  {/* Title */}
                  <td className="py-4 max-w-sm">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 transition-colors font-serif leading-snug"
                        >
                          {article.title}
                        </Link>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] uppercase tracking-wider">
                      {article.category}
                    </span>
                  </td>

                  {/* Views */}
                  <td className="py-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                    {article.views.toLocaleString()}
                  </td>

                  {/* CTR% */}
                  <td className="py-4 text-center font-mono text-amber-600 dark:text-amber-400 font-bold">
                    {article.ctr}
                  </td>

                  {/* Search Rank Status */}
                  <td className="py-4 text-center">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                      {article.searchRank}
                    </span>
                  </td>

                  {/* RPM */}
                  <td className="py-4 text-right font-mono text-slate-600 dark:text-slate-400 font-semibold">
                    {article.rpm}
                  </td>

                  {/* Generated Revenue */}
                  <td className="py-4 text-right font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {article.revenue}
                  </td>

                  {/* Link */}
                  <td className="py-4 text-center">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-block"
                      title="View Article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
