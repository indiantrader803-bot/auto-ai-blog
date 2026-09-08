"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  Sparkles,
  Twitter,
  Linkedin,
  MessageSquare,
  Send,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Bot,
  Zap,
  Globe,
  Radio,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { getAllCatalogArticles } from "@/lib/content/articles";

export default function PromotionHubPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"twitter" | "linkedin" | "reddit" | "chat" | "newsletter">("twitter");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Fleet & Traffic Action States
  const [fleetLoading, setFleetLoading] = useState<boolean>(false);
  const [fleetResult, setFleetResult] = useState<any>(null);
  const [pingLoading, setPingLoading] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<any>(null);
  const [rescueLoading, setRescueLoading] = useState<boolean>(false);
  const [rescueResult, setRescueResult] = useState<any>(null);

  // Webhook settings
  const [discordWebhook, setDiscordWebhook] = useState<string>("");
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts?status=ALL&limit=50")
      .then((res) => res.json())
      .then((data) => {
        const livePosts = data.posts || [];
        const catalog = getAllCatalogArticles();
        const combined = [...livePosts, ...catalog];
        setArticles(combined);
        if (combined.length > 0) {
          setSelectedSlug(combined[0].slug);
        }
      })
      .catch(() => {
        const catalog = getAllCatalogArticles();
        setArticles(catalog);
        if (catalog.length > 0) {
          setSelectedSlug(catalog[0].slug);
        }
      });
  }, []);

  const handleGenerateCampaign = async () => {
    setLoading(true);
    setDispatchStatus(null);
    try {
      const res = await fetch("/api/pipeline/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedSlug,
          topic: customTopic || undefined,
        }),
      });

      const data = await res.json();
      if (data.campaign) {
        setCampaign(data.campaign);
      }
    } catch (err: any) {
      console.error("Campaign generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFleetPromote = async () => {
    setFleetLoading(true);
    setFleetResult(null);
    try {
      const res = await fetch("/api/pipeline/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "PROMOTE_ALL" }),
      });
      const data = await res.json();
      setFleetResult(data);
      if (data.campaigns && data.campaigns.length > 0) {
        setCampaign(data.campaigns[0]);
      }
    } catch (e: any) {
      setFleetResult({ error: e.message });
    } finally {
      setFleetLoading(false);
    }
  };

  const handleIndexPing = async () => {
    setPingLoading(true);
    setPingResult(null);
    try {
      const res = await fetch("/api/pipeline/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "INDEX_PING" }),
      });
      const data = await res.json();
      setPingResult(data);
    } catch (e: any) {
      setPingResult({ error: e.message });
    } finally {
      setPingLoading(false);
    }
  };

  const handleRescueTraffic = async () => {
    setRescueLoading(true);
    setRescueResult(null);
    try {
      const res = await fetch("/api/pipeline/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RESCUE_TRAFFIC" }),
      });
      const data = await res.json();
      setRescueResult(data.report);
    } catch (e: any) {
      setRescueResult({ error: e.message });
    } finally {
      setRescueLoading(false);
    }
  };

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDispatchDiscord = async () => {
    if (!campaign) return;
    setIsDispatching(true);
    setDispatchStatus("Sending payload to Discord webhook...");
    try {
      const res = await fetch("/api/pipeline/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "DISPATCH_WEBHOOK",
          platform: "DISCORD",
          webhookUrl: discordWebhook || "https://discord.com/api/webhooks/mock",
          content: campaign.discordTelegramEmbed.formattedDiscordMarkdown,
        }),
      });
      const data = await res.json();
      setDispatchStatus(data.message || "Broadcast successfully sent to Discord!");
    } catch (e: any) {
      setDispatchStatus("Error: " + e.message);
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Share2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Growth, Traffic &amp; Promotion Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Focus on maximizing views, clicks, and multi-platform viral syndication across all articles using intelligent agents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Traffic &amp; Monetization Swarm Online
          </span>
        </div>
      </div>

      {/* Autonomous Growth & Promotion Fleet Launchpad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action 1: Fleet Autopilot Promotion */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/30 text-white flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Fleet Syndication Engine
            </div>
            <h3 className="text-base font-bold">Promote All Articles</h3>
            <p className="text-xs text-slate-400 mt-1">
              Runs the viral promotion agent across all published stories to build Twitter threads, LinkedIn posts, and WhatsApp broadcasts.
            </p>
          </div>
          <button
            onClick={handleFleetPromote}
            disabled={fleetLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            {fleetLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing Fleet...
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Run Fleet Autopilot
              </>
            )}
          </button>
        </div>

        {/* Action 2: Instant Search Engine Indexing */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 text-white flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400 mb-1">
              <Globe className="w-3.5 h-3.5" /> Search Engine Pinger
            </div>
            <h3 className="text-base font-bold">Google &amp; Bing Instant Index</h3>
            <p className="text-xs text-slate-400 mt-1">
              Pings IndexNow protocol (Bing, Yandex) and Google Search Console sitemaps so crawlers index articles immediately.
            </p>
          </div>
          <button
            onClick={handleIndexPing}
            disabled={pingLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            {pingLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pinging Engines...
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5 text-emerald-300" /> Ping Search Engines
              </>
            )}
          </button>
        </div>

        {/* Action 3: Traffic Rescue Loop */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 text-white flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400 mb-1">
              <Flame className="w-3.5 h-3.5" /> Underperforming Rescue
            </div>
            <h3 className="text-base font-bold">Boost Low-Traffic Stories</h3>
            <p className="text-xs text-slate-400 mt-1">
              Detects stories with below-average views, elevates their internal link weight, and creates high-CTR headline variants.
            </p>
          </div>
          <button
            onClick={handleRescueTraffic}
            disabled={rescueLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            {rescueLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing Traffic...
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 text-amber-300" /> Run Traffic Rescue
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fleet Feedback Alerts */}
      {fleetResult && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
            <span>{fleetResult.message || `Processed ${fleetResult.processed} articles for multi-channel syndication.`}</span>
          </div>
          <span className="font-bold">{fleetResult.campaigns?.length || 0} campaigns ready</span>
        </div>
      )}

      {pingResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Search Engine Pings Dispatched:
          </div>
          {pingResult.results?.map((res: any, idx: number) => (
            <div key={idx} className="ml-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold">{res.engine}:</span> {res.message}
            </div>
          ))}
        </div>
      )}

      {rescueResult && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" /> Traffic Rescue Report:
          </div>
          <p className="ml-6">
            Scanned {rescueResult.totalArticlesScanned} articles. Found {rescueResult.lowTrafficIdentified} stories needing traffic amplification. Updated internal links and dispatched re-crawl pings.
          </p>
        </div>
      )}

      {/* Target Selector & Trigger Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          Select Specific Article to Inspect &amp; Launch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Published Article ({articles.length} Available)
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                setCustomTopic("");
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {articles.map((art) => (
                <option key={art.slug} value={art.slug}>
                  [{art.category?.name || "Topic"}] {art.title} ({(art.views || 0).toLocaleString()} views)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Or Type Custom Topic / Breaking Angle
            </label>
            <input
              type="text"
              placeholder="e.g. Nifty 50 Breakout: FII Inflows & Derivatives Strategy"
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                setSelectedSlug("");
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
            </input>
          </div>
        </div>

        <button
          onClick={handleGenerateCampaign}
          disabled={loading || (!selectedSlug && !customTopic)}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Bot className="w-4 h-4 animate-spin" />
              Promotion Agent Synthesizing Social Hooks...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Viral Social Campaign
            </>
          )}
        </button>
      </div>

      {/* Generated Campaign Output */}
      {campaign && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Universal 1-Click Launchpad */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-indigo-400" /> Instant 1-Click Viral Launchpad
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1">
                  {campaign.articleTitle}
                </h3>
              </div>
              <span className="text-xs text-slate-400 shrink-0">Click any channel to launch</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* X / Twitter */}
              <a
                href={campaign.oneClickShareUrls?.twitter || `https://twitter.com/intent/tweet?text=${encodeURIComponent(campaign.twitterThread.hookTweet)}&url=${encodeURIComponent(campaign.articleUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Twitter className="w-3.5 h-3.5" /> Share on X
              </a>

              {/* LinkedIn */}
              <a
                href={campaign.oneClickShareUrls?.linkedIn || `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaign.articleUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Linkedin className="w-3.5 h-3.5" /> Share on LinkedIn
              </a>

              {/* WhatsApp */}
              <a
                href={campaign.oneClickShareUrls?.whatsApp || `https://api.whatsapp.com/send?text=${encodeURIComponent(`🔥 *${campaign.articleTitle}*\n\nRead full report:\n${campaign.articleUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span className="text-xs font-black">WA</span> Share on WhatsApp
              </a>

              {/* Telegram */}
              <a
                href={campaign.oneClickShareUrls?.telegram || `https://t.me/share/url?url=${encodeURIComponent(campaign.articleUrl)}&text=${encodeURIComponent(campaign.articleTitle)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span className="text-xs font-black">TG</span> Share on Telegram
              </a>

              {/* Reddit */}
              <a
                href={campaign.oneClickShareUrls?.reddit || `https://www.reddit.com/submit?url=${encodeURIComponent(campaign.articleUrl)}&title=${encodeURIComponent(campaign.articleTitle)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Post to Reddit
              </a>
            </div>
          </div>

          {/* Channel Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "twitter", label: "Twitter / X Thread", icon: Twitter },
              { id: "linkedin", label: "LinkedIn Article", icon: Linkedin },
              { id: "reddit", label: "Reddit / HackerNews", icon: MessageSquare },
              { id: "chat", label: "Discord / Telegram", icon: Send },
              { id: "newsletter", label: "Newsletter Blast", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Twitter / X Thread */}
          {activeTab === "twitter" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {campaign.twitterThread.tweets.length + 2} Tweets in Thread
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyToClipboard(campaign.twitterThread.fullThreadText, "twitter")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedSection === "twitter" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Full Thread!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Entire Thread
                      </>
                    )}
                  </button>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      campaign.twitterThread.hookTweet
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white shadow-sm transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" /> Tweet Hook Directly
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                {/* Hook Tweet */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-500/30 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-500">
                      Tweet 1 (Viral Hook)
                    </span>
                    <button
                      onClick={() => copyToClipboard(campaign.twitterThread.hookTweet, "t1")}
                      className="text-xs text-slate-400 hover:text-indigo-500 flex items-center gap-1"
                    >
                      {copiedSection === "t1" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {campaign.twitterThread.hookTweet}
                  </p>
                </div>

                {/* Sub-tweets */}
                {campaign.twitterThread.tweets.map((tw: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">
                        Tweet {idx + 2}
                      </span>
                      <button
                        onClick={() => copyToClipboard(tw, `tw_${idx}`)}
                        className="text-xs text-slate-400 hover:text-indigo-500 flex items-center gap-1"
                      >
                        {copiedSection === `tw_${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {tw}
                    </p>
                  </div>
                ))}

                {/* CTA Tweet */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500">
                    Final Tweet (CTA &amp; Article Link)
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                    {campaign.twitterThread.ctaTweet}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LinkedIn Post */}
          {activeTab === "linkedin" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  LinkedIn Thought Leadership Format
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.linkedInPost.fullPostText, "li")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  {copiedSection === "li" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy LinkedIn Post
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {campaign.linkedInPost.headline}
              </h3>
              <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {campaign.linkedInPost.body}
                {"\n\n"}
                👉 Full Technical Breakdown: {campaign.articleUrl}
                {"\n\n"}
                {campaign.linkedInPost.hashtags.join(" ")}
              </div>
            </div>
          )}

          {/* TAB 3: Reddit Discussion */}
          {activeTab === "reddit" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Suggested Subreddits:
                  </span>
                  {campaign.redditDiscussion.suggestedSubreddits.map((sub: string) => (
                    <span key={sub} className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      {sub}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(`${campaign.redditDiscussion.postTitle}\n\n${campaign.redditDiscussion.postBody}`, "reddit")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  {copiedSection === "reddit" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Post
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Thread Title
                </label>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                  {campaign.redditDiscussion.postTitle}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Post Content
                </label>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed border border-slate-200 dark:border-slate-800">
                  {campaign.redditDiscussion.postBody}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Discord / Telegram Webhook Dispatch */}
          {activeTab === "chat" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Automated Discord Channel Webhook Dispatch
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Send this rich formatted dispatch card directly to your private or public Discord community.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="url"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={discordWebhook}
                  onChange={(e) => setDiscordWebhook(e.target.value)}
                  className="flex-1 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  onClick={handleDispatchDiscord}
                  disabled={isDispatching}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isDispatching ? "Dispatching..." : "Send Webhook Alert"}
                </button>
              </div>

              {dispatchStatus && (
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                  {dispatchStatus}
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs whitespace-pre-line border border-slate-800">
                {campaign.discordTelegramEmbed.formattedDiscordMarkdown}
              </div>
            </div>
          )}

          {/* TAB 5: Newsletter Edition */}
          {activeTab === "newsletter" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  A/B Tested Subject Line Options
                </h3>
                <div className="space-y-2">
                  {campaign.newsletterBlast.subjectLines.map((subj: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <span>{subj}</span>
                      <button
                        onClick={() => copyToClipboard(subj, `subj_${i}`)}
                        className="text-slate-400 hover:text-indigo-500 ml-2"
                      >
                        {copiedSection === `subj_${i}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Email Body (Markdown)
                  </span>
                  <button
                    onClick={() => copyToClipboard(campaign.newsletterBlast.emailBodyMarkdown, "nl")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                  >
                    {copiedSection === "nl" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Newsletter Markdown
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line border border-slate-200 dark:border-slate-800">
                  {campaign.newsletterBlast.emailBodyMarkdown}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
