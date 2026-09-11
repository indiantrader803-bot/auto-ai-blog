"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  ShieldCheck,
  TrendingUp,
  Share2,
  DollarSign,
  Layers,
  Flame,
  Terminal,
  Play,
  Cpu,
  Radio,
  Copy,
  Check,
  ExternalLink,
  Target,
  Send,
  Eye,
  BarChart3,
  Sliders,
  FileCode2,
} from "lucide-react";

export default function PropFlowAdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTriggering, setIsTriggering] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"SWARM" | "HUMAN_REVIEW" | "AB_TESTS" | "UTM_BUILDER">("SWARM");

  const fetchPropFlowData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/propflow");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error("Failed to load PropFlow data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropFlowData();
  }, []);

  const handleTriggerSwarm = async () => {
    setIsTriggering(true);
    try {
      const res = await fetch("/api/propflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RUN_SWARM" }),
      });
      const json = await res.json();
      if (json.success) {
        fetchPropFlowData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTriggering(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const report = data?.report || {};
  const socialPosts = report.socialCampaigns || [];
  const abTests = report.abTestStatus || [];
  const keywords = report.keywordsScouted || [];

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-wider border border-indigo-500/30">
              PropFlow-AI Mission Control
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 15 Autonomous Agents Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            AI Affiliate Sales &amp; Orchestration Swarm
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Autonomous market intelligence, buyer-intent SEO landers, viral short scripts, 5-part email nurture funnels, and real-time A/B conversion optimization for FTM, Atlas Funded &amp; AquaFunded.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={handleTriggerSwarm}
            disabled={isTriggering}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isTriggering ? "animate-spin" : ""}`} />
            <span>{isTriggering ? "Orchestrating 15 Agents..." : "Run 15-Agent Swarm"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto text-xs font-bold uppercase tracking-wider scrollbar-none">
        <button
          onClick={() => setActiveTab("SWARM")}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === "SWARM" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          🤖 15 Agents Swarm
        </button>
        <button
          onClick={() => setActiveTab("HUMAN_REVIEW")}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === "HUMAN_REVIEW" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          👤 Human Review Loop ({socialPosts.length})
        </button>
        <button
          onClick={() => setActiveTab("AB_TESTS")}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === "AB_TESTS" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          🧪 A/B Testing Suite
        </button>
        <button
          onClick={() => setActiveTab("UTM_BUILDER")}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === "UTM_BUILDER" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          🎯 Buyer Keywords &amp; Landers
        </button>
      </div>

      {/* Tab 1: 15 Agents Swarm Status */}
      {activeTab === "SWARM" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Trending &amp; Keyword Scout
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Scouted {report.dailyOpportunitiesFound || 4} trending opportunities and {keywords.length} low-competition buyer keywords for maximum SEO conversion.
            </p>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              Status: 100% OPERATIONAL
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Multi-Channel Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generated {socialPosts.length} ready-to-blast campaigns across Reddit, Twitter/X, LinkedIn, Quora, and 5-day email sequence.
            </p>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              Status: READY FOR BROADCAST
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              A/B &amp; Funnel Optimization
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Running {abTests.length} active headline and CTA experiments with automated winner selection to maximize conversion rate.
            </p>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              Status: LIVE ATTRIBUTION SYNC
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Human Review Loop */}
      {activeTab === "HUMAN_REVIEW" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Human Review &amp; 1-Click Multi-Channel Distribution Swarm
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review and copy ready-to-publish viral outreach blueprints generated for Reddit, Twitter/X, LinkedIn, and Quora.
            </p>

            <div className="space-y-4">
              {socialPosts.map((post: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs uppercase font-mono">
                        {post.platform}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {post.targetChannelOrSubreddit}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                      {post.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {post.headline}
                  </h4>

                  <pre className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans border border-slate-100 dark:border-slate-800">
                    {post.content}
                  </pre>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      Codes: {post.promoCode}
                    </span>
                    <button
                      onClick={() => handleCopy(post.content, `post_${idx}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition-all"
                    >
                      {copiedId === `post_${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === `post_${idx}` ? "Copied to Clipboard!" : "Copy Post Text"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: A/B Testing Experiments */}
      {activeTab === "AB_TESTS" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Live Split-Testing &amp; Conversion Optimization Engine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {abTests.map((exp: any) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-500">{exp.targetFirm}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      {exp.confidenceScore}% Confidence
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Testing: {exp.element}
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="truncate max-w-[200px] font-medium text-slate-700 dark:text-slate-300">Variant A: {exp.variantA.copy}</span>
                      <span className="font-mono text-[11px] text-slate-500">{exp.variantA.clicks} clicks ({exp.variantA.conversions} sales)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                      <span className="truncate max-w-[200px] font-bold text-emerald-600 dark:text-emerald-400">Variant B (Winner): {exp.variantB.copy}</span>
                      <span className="font-mono text-[11px] font-bold text-emerald-500">{exp.variantB.clicks} clicks ({exp.variantB.conversions} sales)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Buyer Keywords & Landers */}
      {activeTab === "UTM_BUILDER" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              High-Intent Buyer Keywords &amp; Dedicated Review Landing Pages
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="pb-3">Buyer Keyword</th>
                    <th className="pb-3">Intent</th>
                    <th className="pb-3">SEO Difficulty</th>
                    <th className="pb-3">Monthly Volume</th>
                    <th className="pb-3 text-right">Target Landing Route</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {keywords.map((kw: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">{kw.keyword}</td>
                      <td className="py-3.5 text-indigo-500 font-bold">{kw.searchIntent}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono">{kw.estimatedMonthlySearches?.toLocaleString()} / mo</td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={kw.suggestedSlug}
                          className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                          <span>{kw.suggestedSlug}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
