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
  Twitter,
  Linkedin,
  FileCode2,
  Award,
  Calculator,
  Globe,
  Link2,
  Tag,
  ArrowRight,
  Tv,
  MessageSquare,
} from "lucide-react";

export default function PropFlowAdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTriggering, setIsTriggering] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "MULTI_WEBSITES" | "UTM_GENERATOR" | "ARTICLE_PROMOTER" | "SWARM" | "HUMAN_REVIEW" | "AB_TESTS" | "KEYWORD_LANDERS"
  >("MULTI_WEBSITES");

  // UTM Generator State
  const [selectedTarget, setSelectedTarget] = useState<string>("/reviews/funded-trader-markets");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("twitter");
  const [campaignName, setCampaignName] = useState<string>("discount_arnab");
  const [selectedOfferCode, setSelectedOfferCode] = useState<string>("arnab");

  // Article Promoter State
  const [selectedArticleTitle, setSelectedArticleTitle] = useState<string>(
    "Best Prop Trading Firms 2026: Leaderboard & Verified Coupon Codes"
  );
  const [selectedArticleUrl, setSelectedArticleUrl] = useState<string>("/best-prop-firms");
  const [autoposting, setAutoposting] = useState<boolean>(false);
  const [autopostMsg, setAutopostMsg] = useState<string | null>(null);

  const handleTriggerAutopost = async () => {
    try {
      setAutoposting(true);
      setAutopostMsg(null);
      const res = await fetch("/api/pipeline/autopost", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setAutopostMsg("✅ Autonomous Autoposting dispatched successfully to @Theindainta9go & Indian Trader!");
      } else {
        setAutopostMsg("⚠️ Autopost queued: " + (json.error || "Simulated dispatch recorded"));
      }
    } catch (err: any) {
      setAutopostMsg("⚠️ Autopost queued: " + err.message);
    } finally {
      setAutoposting(false);
    }
  };

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

  const baseUrl = "https://auto-ai-blog-web.onrender.com";
  const generatedUtmUrl = `${baseUrl}${selectedTarget}?utm_source=${selectedPlatform}&utm_medium=social&utm_campaign=${campaignName}&coupon=${selectedOfferCode}`;

  const popularWebsites = [
    {
      name: "Reddit (r/Forex & r/Daytrading)",
      category: "Trader Community (1.4M+ Members)",
      icon: "🔴",
      audience: "Active Challenge Buyers",
      strategy: "Post breakdown of 0-time-limit rules & share FTM vs FTMO savings matrix.",
      directShareUrl: `https://www.reddit.com/submit?title=${encodeURIComponent("Comprehensive 2026 Prop Firm Audit: Why Zero Time Limits & 10% Discount beats FTMO")}&url=${encodeURIComponent(generatedUtmUrl)}`,
    },
    {
      name: "Twitter / X (Finance & Forex)",
      category: "Viral Micro-Blogging",
      icon: "🐦",
      audience: "25M+ Daily Finance Impressions",
      strategy: "Tweet thread on saving $95+ on prop evaluations with verified partner codes.",
      directShareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent("🔥 If you're buying a prop trading challenge in 2026, don't pay full price. Use code 'arnab' for 10% instant checkout discount at Funded Trader Markets + zero time limits:\n\n" + generatedUtmUrl + "\n\n#Forex #PropFirm #Trading")}`,
    },
    {
      name: "Telegram Forex Channels & Groups",
      category: "Instant Messenger VIP",
      icon: "✈️",
      audience: "High-Converting Signal Subscribers",
      strategy: "Broadcast flash coupon alert: '10% OFF FTM (Code: arnab) + 20% OFF Atlas Funded (Code: 12275)'.",
      directShareUrl: `https://t.me/share/url?url=${encodeURIComponent(generatedUtmUrl)}&text=${encodeURIComponent("🚀 Verified Prop Firm Discount Alert:\n• Funded Trader Markets: 10% OFF with code 'arnab'\n• Atlas Funded: 20% OFF with code '12275'\n\nCalculate your exact fees & payout savings here:")}`,
    },
    {
      name: "Quora Q&A",
      category: "High-Intent Search Traffic",
      icon: "❓",
      audience: "Traders asking 'What is the best prop firm?'",
      strategy: "Answer popular queries about passing challenges and link to the /tools fee calculator.",
      directShareUrl: "https://www.quora.com/search?q=best+prop+trading+firms+2026",
    },
    {
      name: "LinkedIn Pulse & Finance Groups",
      category: "Professional & Institutional",
      icon: "💼",
      audience: "High-ticket capital allocators",
      strategy: "Publish case study on prop trading risk management and payout scalability.",
      directShareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generatedUtmUrl)}`,
    },
    {
      name: "WhatsApp Trading Communities",
      category: "Direct Messaging",
      icon: "💬",
      audience: "Private Masterminds & Groups",
      strategy: "Share direct calculator tool link with instant discount savings.",
      directShareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent("Check out this 2026 Prop Firm Leaderboard & Fee Savings Calculator (Save up to 20% on challenges): " + generatedUtmUrl)}`,
    },
  ];

  return (
    <div className="space-y-8 font-sans pb-16 max-w-7xl mx-auto w-full">
      {/* 1. Header & Live Agent Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-wider border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              PropFlow-AI Mission Control
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 15 Autonomous Agents Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
            AI Affiliate Growth, Link Promotion &amp; Multi-Platform Syndication
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Autonomous multi-website promotion engine designed to turn clicks into sales across Reddit, Twitter/X, Telegram, Quora, and YouTube Shorts for <strong>FTM</strong>, <strong>Atlas Funded</strong>, and <strong>AquaFunded</strong>.
          </p>

          <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400 font-mono flex-wrap">
            <span className="flex items-center gap-1 text-amber-400">
              <Tag className="w-3.5 h-3.5" /> FTM: <strong>arnab</strong> (10% OFF)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Tag className="w-3.5 h-3.5" /> Atlas: <strong>12275</strong> (20% OFF)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Tag className="w-3.5 h-3.5" /> Aqua: <strong>6e9</strong> (Rebate)
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
          <button
            onClick={handleTriggerSwarm}
            disabled={isTriggering}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-indigo-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isTriggering ? "animate-spin" : ""}`} />
            <span>{isTriggering ? "Orchestrating 15 Agents..." : "Run 15-Agent Swarm"}</span>
          </button>

          <Link
            href="/tools"
            target="_blank"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 transition-all text-center"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Public Calculator</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Promotion Channels</span>
          <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-serif">10+ Major Sites</div>
          <span className="text-[10px] text-slate-500">Reddit, X, Telegram, Quora</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Targeted Buyer Keywords</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-serif">{keywords.length || 5} Commercial Queries</div>
          <span className="text-[10px] text-slate-500">High-intent discount searches</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Max Partner Discount</span>
          <div className="text-xl font-black text-amber-500 font-serif">20% Flat OFF</div>
          <span className="text-[10px] text-slate-500">Atlas Funded (12275)</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Sales Funnels</span>
          <div className="text-xl font-black text-cyan-600 dark:text-cyan-400 font-serif">6 High-Trust Pages</div>
          <span className="text-[10px] text-slate-500">Reviews, tools &amp; comparisons</span>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs font-bold uppercase tracking-wider scrollbar-none">
        <button
          onClick={() => setActiveTab("MULTI_WEBSITES")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "MULTI_WEBSITES"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>🚀 Multi-Website Promoter</span>
        </button>

        <button
          onClick={() => setActiveTab("UTM_GENERATOR")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "UTM_GENERATOR"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>🔗 Shortlink &amp; UTM Builder</span>
        </button>

        <button
          onClick={() => setActiveTab("ARTICLE_PROMOTER")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "ARTICLE_PROMOTER"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>📢 Article Cross-Promoter</span>
        </button>

        <button
          onClick={() => setActiveTab("SWARM")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "SWARM"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>🤖 15 Agents Swarm</span>
        </button>

        <button
          onClick={() => setActiveTab("HUMAN_REVIEW")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "HUMAN_REVIEW"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>👤 Social Copy ({socialPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("AB_TESTS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "AB_TESTS"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>🧪 A/B Tests</span>
        </button>

        <button
          onClick={() => setActiveTab("KEYWORD_LANDERS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "KEYWORD_LANDERS"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>🎯 Keywords &amp; Landers</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MULTI-WEBSITE PROMOTION HUB                                        */}
      {/* ========================================================================= */}
      {activeTab === "MULTI_WEBSITES" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                  Popular Websites Viral Syndication Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-filled 1-click posting blueprints targeted to high-traffic trader platforms. Click to open and publish directly.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                7 Major Networks Active
              </span>
            </div>

            {/* Official Twitter / X Campaign Dispatcher for @Theindainta9go */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/80 via-slate-900 to-black border border-sky-500/40 text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Twitter / X Viral Broadcast Hub</span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono">@Theindainta9go</span>
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      1-Click Twitter threads &amp; deal alerts with embedded UTM tracking for your profile.
                    </p>
                  </div>
                </div>

                <a
                  href="https://x.com/Theindainta9go"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all self-start sm:self-auto"
                >
                  <span>View @Theindainta9go</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Tweet 1: Prop Codes */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">🔥 Discount Codes</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "Getting funded in 2026? Stop paying full price: Atlas (12275), FTM (arnab), AquaFunded (6e9), Pocket Option (50START)..."
                    </p>
                  </div>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Getting funded in 2026? Stop paying full price for prop evaluations:\n\n🔥 Atlas Funded: 20% OFF (Code: 12275)\n📈 FTM: 10% OFF + 0 Time Limits (Code: arnab)\n🚀 AquaFunded: 20% Rebate (Code: 6e9)\n💎 Pocket Option: 50% Match (Code: 50START)\n\nAudit & Fee Calculator:\n${baseUrl}/best-prop-firms?utm_source=twitter&utm_medium=social&utm_campaign=theindainta9go\n\n#Forex #PropFirm #Trading`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Tweet Codes</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Tweet 2: FTM vs FTMO */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">⚖️ FTM vs FTMO Breakdown</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "Why 2026 prop traders are shifting from FTMO to Funded Trader Markets: 0 time limits, 90% profit split, instant payout..."
                    </p>
                  </div>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Why 2026 prop traders are shifting from FTMO to Funded Trader Markets:\n\n1. Zero time limits on evaluation\n2. 90% payout profit split\n3. 10% instant checkout discount with code 'arnab'\n\nFull Head-to-Head Comparison:\n${baseUrl}/compare/ftmo-vs-ftm?utm_source=twitter&utm_medium=social&utm_campaign=theindainta9go\n\n#ForexTrading #FTMO #PropTrader`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Tweet Comparison</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Tweet 3: Evaluation Calculator */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">🧮 Fee Calculator Tool</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "Never buy an evaluation challenge blindly. Use our interactive calculator to check net profit after fee splits..."
                    </p>
                  </div>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Never buy an evaluation challenge blindly.\n\nCalculate your exact break-even payout, slippage fees, and net savings across top firms:\n\n${baseUrl}/tools?utm_source=twitter&utm_medium=social&utm_campaign=theindainta9go\n\n#Daytrading #TradingTools #Forex`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Tweet Calculator</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Tweet 4: Trading Gear Setup */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">🖥️ Trader Battlestation Gear</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "The ultimate 2026 algorithmic & day trading setup: 49-inch curved monitors, Elgato macro keys & ergonomic chairs..."
                    </p>
                  </div>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`The ultimate 2026 day trading desk setup to eliminate fatigue & boost execution speed:\n\n• Ultra-wide 49" curved monitors\n• Elgato Stream Deck for 1-click risk exits\n• Mechanical macro pads\n\nCurated trading gear list:\n${baseUrl}/store?utm_source=twitter&utm_medium=social&utm_campaign=theindainta9go\n\n#Daytrading #TradingSetup #DeskSetup`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Tweet Gear Setup</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Official LinkedIn Campaign Dispatcher for Indian Trader */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/80 via-slate-900 to-black border border-blue-500/40 text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>LinkedIn Professional Syndicate Hub</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono">Indian Trader</span>
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Long-form quantitative insights &amp; institutional review syndication for high-net-worth traders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTriggerAutopost}
                    disabled={autoposting}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Bot className={`w-3.5 h-3.5 ${autoposting ? "animate-spin" : ""}`} />
                    <span>{autoposting ? "Autoposting..." : "⚡ Run Live Autopost (Twitter + LinkedIn)"}</span>
                  </button>

                  <a
                    href="https://www.linkedin.com/in/indian-trader-804333436/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {autopostMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{autopostMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* LinkedIn 1: Quantitative Audit */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">💼 Institutional Prop Audit</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "Why Quantitative Traders Are Rerouting Capital to Zero-Time-Limit Evaluation Models in 2026..."
                    </p>
                  </div>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseUrl}/best-prop-firms?utm_source=linkedin&utm_medium=social&utm_campaign=indian_trader`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Share to LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* LinkedIn 2: Risk Management */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">⚖️ Risk &amp; Profit Split Analysis</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "Funded Trader Markets vs FTMO: Benchmarking slippage, liquidity pools, and verified coupon code 'arnab'..."
                    </p>
                  </div>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseUrl}/compare/ftmo-vs-ftm?utm_source=linkedin&utm_medium=social&utm_campaign=indian_trader`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Share Comparison</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* LinkedIn 3: Automated Calculator */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">🧮 Interactive Evaluation Calculator</span>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-3">
                      "Interactive proprietary fee and breakeven payout modeling tool for active day traders."
                    </p>
                  </div>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseUrl}/tools?utm_source=linkedin&utm_medium=social&utm_campaign=indian_trader`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Share Tool</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularWebsites.map((site, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{site.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {site.name}
                          </h4>
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block">
                            {site.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                        {site.audience}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {site.strategy}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={site.directShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95"
                    >
                      <span>Launch &amp; Post Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleCopy(generatedUtmUrl, `site_${idx}`)}
                      className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all"
                      title="Copy Tracked Link"
                    >
                      {copiedId === `site_${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DYNAMIC SHORTLINK & UTM CAMPAIGN BUILDER                           */}
      {/* ========================================================================= */}
      {activeTab === "UTM_GENERATOR" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
              Dynamic Shortlink &amp; Campaign Attribution Builder
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generate precise, sub-ID tagged tracking links for every landing page, review, calculator, and article to trace every sale back to its traffic source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Page Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Destination Landing Page / Tool
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="/reviews/funded-trader-markets">Funded Trader Markets Review (/reviews/funded-trader-markets)</option>
                <option value="/reviews/atlas-funded">Atlas Funded Review (/reviews/atlas-funded)</option>
                <option value="/reviews/aquafunded">AquaFunded Review (/reviews/aquafunded)</option>
                <option value="/tools">Fee &amp; Payout Calculator Tool (/tools)</option>
                <option value="/compare/ftmo-vs-ftm">FTMO vs FTM Battle Matrix (/compare/ftmo-vs-ftm)</option>
                <option value="/best-prop-firms">2026 Prop Firm Leaderboard (/best-prop-firms)</option>
                <option value="/">Main Blog Homepage (/)</option>
              </select>
            </div>

            {/* Platform / Source Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Promotion Channel / Source
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="twitter">Twitter / X (twitter)</option>
                <option value="reddit">Reddit (reddit)</option>
                <option value="youtube_shorts">YouTube Shorts / TikTok (youtube_shorts)</option>
                <option value="telegram">Telegram VIP Channels (telegram)</option>
                <option value="quora">Quora Q&amp;A (quora)</option>
                <option value="linkedin">LinkedIn Pulse (linkedin)</option>
                <option value="newsletter">Email Newsletter (newsletter)</option>
                <option value="whatsapp">WhatsApp Communities (whatsapp)</option>
              </select>
            </div>

            {/* Campaign Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Campaign Name / Angle
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. discount_arnab or zero_time_limit"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Partner Promo Code */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Partner Coupon Code
              </label>
              <select
                value={selectedOfferCode}
                onChange={(e) => setSelectedOfferCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="arnab">arnab (FTM - 10% OFF)</option>
                <option value="12275">12275 (Atlas Funded - 20% OFF + $5 FTPs)</option>
                <option value="6e9">6e9 (AquaFunded - 20% Rebate)</option>
                <option value="50START">50START (Pocket Option - 50% Bonus)</option>
              </select>
            </div>
          </div>

          {/* Generated Result Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Link2 className="w-4 h-4" /> Ready-to-Promote Tracked URL
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                100% Sub-ID Attribution Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400 break-all select-all">
              {generatedUtmUrl}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => handleCopy(generatedUtmUrl, "utm_link")}
                className="w-full sm:w-auto flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {copiedId === "utm_link" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === "utm_link" ? "Link Copied to Clipboard!" : "Copy Tracked Shortlink"}</span>
              </button>

              <a
                href={generatedUtmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Test Link Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ARTICLE & BLOG CROSS-PROMOTER                                      */}
      {/* ========================================================================= */}
      {activeTab === "ARTICLE_PROMOTER" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
              Omnichannel Blog Post &amp; New Article Cross-Promoter
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instantly generate viral snippets, hashtags, and social post blurbs for any published article to syndicate across external networks.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Article Title
              </label>
              <input
                type="text"
                value={selectedArticleTitle}
                onChange={(e) => setSelectedArticleTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Article Relative Path / URL
              </label>
              <input
                type="text"
                value={selectedArticleUrl}
                onChange={(e) => setSelectedArticleUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Social Snippets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                  Twitter / X Thread Hook
                </span>
                <button
                  onClick={() => handleCopy(`🚨 NEW AUDIT: ${selectedArticleTitle}\n\nKey takeaways & verified discount codes inside:\n${baseUrl}${selectedArticleUrl}?utm_source=twitter\n\n#PropFirm #Forex #Trading`, "tweet_art")}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-indigo-600 text-xs cursor-pointer"
                >
                  {copiedId === "tweet_art" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans border border-slate-100 dark:border-slate-800">
{`🚨 NEW AUDIT: ${selectedArticleTitle}

Key takeaways & verified discount codes inside:
${baseUrl}${selectedArticleUrl}?utm_source=twitter

#PropFirm #Forex #Trading`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                  Reddit r/Forex Post Text
                </span>
                <button
                  onClick={() => handleCopy(`[Audit & Guide] ${selectedArticleTitle}\n\nHere is a complete breakdown of rules, scaling programs, and how to claim the maximum challenge discount:\n${baseUrl}${selectedArticleUrl}?utm_source=reddit`, "reddit_art")}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-indigo-600 text-xs cursor-pointer"
                >
                  {copiedId === "reddit_art" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans border border-slate-100 dark:border-slate-800">
{`[Audit & Guide] ${selectedArticleTitle}

Here is a complete breakdown of rules, scaling programs, and how to claim the maximum challenge discount:
${baseUrl}${selectedArticleUrl}?utm_source=reddit`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 15-AGENT SWARM STATUS                                              */}
      {/* ========================================================================= */}
      {activeTab === "SWARM" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Layer 1: Market Intelligence
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trending Opportunity Scout (Agent 1), Keyword Hunter (Agent 2), and Competitor Intelligence (Agent 3).
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
              Layer 2: Viral Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Shorts/Reels Scriptwriter (Agent 6), Social Swarm (Agents 7, 8, 10, 11), and 5-Part Email Specialist (Agent 9).
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
              Layer 3: Growth &amp; Attribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A/B Testing (Agent 12), Analytics &amp; Attribution (Agent 13), Funnel Optimizer (Agent 14), and Offer Manager (Agent 15).
            </p>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              Status: LIVE ATTRIBUTION SYNC
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: HUMAN REVIEW LOOP                                                  */}
      {/* ========================================================================= */}
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

                  <pre className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans border border-slate-100 dark:border-slate-800 max-h-40 overflow-y-auto">
                    {post.content}
                  </pre>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      Partner Code: <strong className="text-amber-500">{post.promoCode}</strong>
                    </span>
                    <button
                      onClick={() => handleCopy(post.content, `post_${idx}`)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition-all cursor-pointer active:scale-95"
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

      {/* ========================================================================= */}
      {/* TAB 6: A/B TESTING EXPERIMENTS                                            */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* TAB 7: BUYER KEYWORDS & LANDERS                                           */}
      {/* ========================================================================= */}
      {activeTab === "KEYWORD_LANDERS" && (
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
