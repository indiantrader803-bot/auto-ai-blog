"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function SwarmMaintenancePage() {
  const [autopilotEnabled, setAutopilotEnabled] = useState<boolean>(true);
  const [isRunningFullSwarm, setIsRunningFullSwarm] = useState<boolean>(false);
  const [activeRunningAgent, setActiveRunningAgent] = useState<string | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [copiedCron, setCopiedCron] = useState<boolean>(false);
  const [lastRunTime, setLastRunTime] = useState<string | null>(null);

  const fetchSwarmStatus = async () => {
    try {
      const res = await fetch("/api/admin/swarm/actions");
      const data = await res.json();
      if (data.lastRunTime) setLastRunTime(data.lastRunTime);
    } catch (_) {}
  };

  useEffect(() => {
    fetchSwarmStatus();
  }, []);

  const handleRunFullSwarm = async () => {
    setIsRunningFullSwarm(true);
    try {
      const res = await fetch("/api/admin/swarm/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RUN_FULL_SWARM",
          triggerNewPostGeneration: true,
        }),
      });

      const data = await res.json();
      if (data.fleetReports) {
        setReports(data.fleetReports);
        setLastRunTime(new Date().toISOString());
      }
    } catch (e: any) {
      console.error("Swarm execution error:", e);
    } finally {
      setIsRunningFullSwarm(false);
    }
  };

  const handleRunSingleAgent = async (actionKey: string, agentName: string) => {
    setActiveRunningAgent(agentName);
    try {
      const res = await fetch("/api/admin/swarm/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionKey }),
      });

      const data = await res.json();
      if (data.report) {
        setReports((prev) => [data.report, ...prev]);
        setLastRunTime(new Date().toISOString());
      }
    } catch (e: any) {
      console.error(`Agent ${agentName} error:`, e);
    } finally {
      setActiveRunningAgent(null);
    }
  };

  const copyCronCommand = () => {
    const curl = `curl -X POST https://auto-ai-blog-orpin.vercel.app/api/cron -H "Authorization: Bearer auto-blog-secure-key-2025"`;
    navigator.clipboard.writeText(curl);
    setCopiedCron(true);
    setTimeout(() => setCopiedCron(false), 2000);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Autonomous Admin AI Swarm Maintenance Fleet
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Self-driving multi-agent swarm maintaining content curation, SEO audits, revenue optimization, viral syndication, and system health 24/7.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunFullSwarm}
            disabled={isRunningFullSwarm}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            {isRunningFullSwarm ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Fleet Executing Full Swarm Cycle...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Trigger Full Fleet Swarm Now
              </>
            )}
          </button>
        </div>
      </div>

      {/* Autopilot Status Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <h2 className="text-base font-bold text-white font-serif">
                  24/7 Autonomous Autopilot Mode: Active
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Last Autonomous Swarm Cycle: {lastRunTime ? new Date(lastRunTime).toLocaleTimeString() : "Recently active"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyCronCommand}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCron ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Cron cURL!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Vercel Cron Trigger
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5 Agent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {/* Agent 1: Content Quality Auditor */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400">
                  Agent 01
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Active
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-serif">
                🧹 Content Curator &amp; SEO Auditor
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audits all published posts, optimizes reading times, verifies tag metadata, and cleans SEO descriptions.
              </p>
            </div>

            <button
              onClick={() => handleRunSingleAgent("AUDIT_CONTENT", "Content Auditor")}
              disabled={activeRunningAgent === "Content Auditor"}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {activeRunningAgent === "Content Auditor" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              Run Content Audit
            </button>
          </div>

          {/* Agent 2: Monetization & RPM Optimizer */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400">
                  Agent 02
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Active
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-serif">
                💰 Monetization &amp; RPM Optimizer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches articles to highest-CPC sponsors, injects profitable affiliate autolinks, and optimizes banner placements.
              </p>
            </div>

            <button
              onClick={() => handleRunSingleAgent("OPTIMIZE_REVENUE", "Revenue Optimizer")}
              disabled={activeRunningAgent === "Revenue Optimizer"}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {activeRunningAgent === "Revenue Optimizer" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <DollarSign className="w-3.5 h-3.5" />
              )}
              Optimize Monetization
            </button>
          </div>

          {/* Agent 3: Viral Social Syndicator */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-400">
                  Agent 03
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Active
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-serif">
                📢 Viral Social Syndicator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auto-generates Twitter threads, LinkedIn posts, Reddit discussions, and broadcasts via Discord/Telegram webhooks.
              </p>
            </div>

            <button
              onClick={() => handleRunSingleAgent("AUTO_SYNDICATE", "Social Syndicator")}
              disabled={activeRunningAgent === "Social Syndicator"}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {activeRunningAgent === "Social Syndicator" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
              Syndicate Latest Post
            </button>
          </div>

          {/* Agent 4: System Sentinel & Health Self-Healer */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400">
                  Agent 04
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Active
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-serif">
                🛡️ System Health Sentinel
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Purges stale logs older than 7 days, monitors database connectivity, and verifies Claude Sonnet 4.5 &amp; Gemini APIs.
              </p>
            </div>

            <button
              onClick={() => handleRunSingleAgent("SYSTEM_SENTINEL", "System Sentinel")}
              disabled={activeRunningAgent === "System Sentinel"}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {activeRunningAgent === "System Sentinel" ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              Run Health Sentinel
            </button>
          </div>

          {/* Agent 5: Autonomous 24/7 Publishing Producer */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 lg:col-span-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400">
                  Agent 05 (Core Publisher)
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Ready
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-serif">
                🤖 Autonomous 24/7 Producer &amp; Writer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Continuous cycle: Trends Scout → Claude 4.5 Writer → Editorial Critic → Media Enricher → SEO Schemas → Instant Auto-Publishing.
              </p>
            </div>

            <button
              onClick={handleRunFullSwarm}
              disabled={isRunningFullSwarm}
              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
            >
              {isRunningFullSwarm ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              Produce &amp; Publish New Article Now
            </button>
          </div>
        </div>
      </div>

      {/* Fleet Maintenance Action Reports */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-500" />
            Autonomous Swarm Action &amp; Audit Reports
          </h3>
          <span className="text-xs text-slate-400">Real-time execution log</span>
        </div>

        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((rep, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  {rep.status === "SUCCESS" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {rep.agentName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(rep.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {rep.summary}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    rep.status === "SUCCESS"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {rep.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Click <strong>Trigger Full Fleet Swarm Now</strong> or any agent button above to see live autonomous maintenance telemetry.
          </div>
        )}
      </div>
    </div>
  );
}

