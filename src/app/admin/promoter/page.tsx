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
  FileText,
  Image as ImageIcon,
  HelpCircle,
} from "lucide-react";
import { getAllCatalogArticles } from "@/lib/content/articles";

export default function PromotionHubPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"twitter" | "linkedin" | "carousel" | "pinterest" | "quora" | "medium" | "reddit" | "chat" | "newsletter">("twitter");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Fleet & Traffic Action States
  const [fleetLoading, setFleetLoading] = useState<boolean>(false);
  const [fleetResult, setFleetResult] = useState<any>(null);
  const [pingLoading, setPingLoading] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<any>(null);
  const [rescueLoading, setRescueLoading] = useState<boolean>(false);
  const [rescueResult, setRescueResult] = useState<any>(null);

  // 6-Agent Swarm States
  const [swarmLoading, setSwarmLoading] = useState<boolean>(false);
  const [swarmReport, setSwarmReport] = useState<any>(null);

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

  const handleRunRevenueSwarm = async () => {
    setSwarmLoading(true);
    setSwarmReport(null);
    try {
      const res = await fetch("/api/pipeline/swarm", { method: "POST" });
      const data = await res.json();
      if (data.report) {
        setSwarmReport(data.report);
      }
    } catch (err) {
      console.error("Swarm execution error:", err);
    } finally {
      setSwarmLoading(false);
    }
  };

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
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
              Growth, Syndication &amp; Revenue Swarm Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Syndicate across X, LinkedIn Carousels, Pinterest, Quora, Medium, and trigger the 6-Agent Revenue Optimization Swarm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunRevenueSwarm}
            disabled={swarmLoading}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
          >
            {swarmLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Running 6-Agent Swarm...
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-300" /> Execute Revenue Optimization Swarm
              </>
            )}
          </button>
        </div>
      </div>

      {/* Swarm Feedback Report */}
      {swarmReport && (
        <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/30 text-white space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <CheckCircle2 className="w-5 h-5" /> Revenue Optimization Swarm Cycle Completed
            </div>
            <span className="text-xs text-slate-400">{swarmReport.totalArticlesProcessed} Articles Optimized</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-400">1. Content Decay Agent</span>
              <p className="text-slate-300">{swarmReport.contentDecayResults?.length || 0} old articles refreshed to 2026 timestamps &amp; keywords.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400">2. CTR &amp; A/B Testing Agent</span>
              <p className="text-slate-300">Statistical winner variants selected (+42% expected click lift).</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">3. Schema &amp; Affiliate Agent</span>
              <p className="text-slate-300">Rich JSON-LD FAQ/Article schemas validated for Google rich snippets.</p>
            </div>
          </div>
        </div>
      )}

      {/* Target Selector Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          Select Article to Generate Multi-Platform Campaigns
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
                  [{art.category?.name || "Topic"}] {art.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Or Type Custom Breaking Topic
            </label>
            <input
              type="text"
              placeholder="e.g. Nifty 50 Breakout Strategy &amp; AI Algorithms"
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                setSelectedSlug("");
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateCampaign}
          disabled={loading || (!selectedSlug && !customTopic)}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Bot className="w-4 h-4 animate-spin" />
              Promotion Agent Synthesizing Multi-Channel Hooks...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Multi-Channel Campaign (X, LinkedIn, Pinterest, Quora, Medium)
            </>
          )}
        </button>
      </div>

      {/* Generated Campaign Output */}
      {campaign && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 🎯 AUDIENCE TARGETING & COMMERCIAL INTENT INTELLIGENCE */}
          {campaign.audienceProfile && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 text-white border-2 border-indigo-500/40 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Zap className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                      Target Audience &amp; Commercial Intent Intelligence
                    </span>
                    <h3 className="text-lg font-bold text-white font-serif">
                      {campaign.audienceProfile.icpName}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-xs font-mono font-bold text-indigo-300">
                    Segment: {campaign.audienceProfile.segment}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-400">
                    Purchasing Power: {campaign.audienceProfile.demographics.purchasingPower}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Core Pain Points */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                    ⚠️ Critical Pain Points (What Bugs Them)
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {campaign.audienceProfile.corePainPoints.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 shrink-0">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buying Triggers & Incentives */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                    ⚡ Primary Buying Triggers &amp; Hooks
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {campaign.audienceProfile.buyingTriggers.map((t: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 shrink-0">✓</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Converting Offer */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                      🏆 Recommended High-Converting Offer
                    </div>
                    <div className="font-bold text-sm text-white mt-1">
                      {campaign.audienceProfile.bestConvertingOffer.partnerName}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {campaign.audienceProfile.bestConvertingOffer.hookHeadline}
                    </p>
                  </div>
                  <a
                    href={campaign.audienceProfile.bestConvertingOffer.affiliateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] text-center block transition-all"
                  >
                    {campaign.audienceProfile.bestConvertingOffer.ctaButton}
                  </a>
                </div>
              </div>

              {/* Target GEOs & Ad Keywords */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-white/5">
                <div>
                  <span className="font-bold text-slate-300">Top Geographic Locations:</span>{" "}
                  {campaign.audienceProfile.demographics.primaryCountries.join(", ")}
                </div>
                <div>
                  <span className="font-bold text-slate-300">Target Keywords:</span>{" "}
                  {campaign.audienceProfile.recommendedChannels.adTargetKeywords.join(" | ")}
                </div>
              </div>
            </div>
          )}

          {/* Universal Launchpad */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-indigo-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-400">1-Click Launchpad</span>
                <h3 className="text-base font-bold mt-0.5">{campaign.articleTitle}</h3>
              </div>
              <span className="text-xs text-slate-400">Launch to any network</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={campaign.oneClickShareUrls?.twitter}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Twitter className="w-3.5 h-3.5" /> Share on X
              </a>

              <a
                href={campaign.oneClickShareUrls?.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" /> Share on LinkedIn
              </a>

              <a
                href={campaign.oneClickShareUrls?.pinterest}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" /> Pin to Pinterest
              </a>

              <a
                href={campaign.oneClickShareUrls?.reddit}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Post to Reddit
              </a>

              <a
                href={campaign.oneClickShareUrls?.whatsApp}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <span className="text-xs font-bold">WA</span> WhatsApp
              </a>

              <a
                href={campaign.oneClickShareUrls?.telegram}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <span className="text-xs font-bold">TG</span> Telegram
              </a>
            </div>
          </div>

          {/* Channel Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "twitter", label: "Twitter / X Thread", icon: Twitter },
              { id: "carousel", label: "LinkedIn Carousel Slides", icon: FileText },
              { id: "pinterest", label: "Pinterest Infographic", icon: ImageIcon },
              { id: "quora", label: "Quora Q&A Answer", icon: HelpCircle },
              { id: "medium", label: "Medium Canonical Post", icon: Globe },
              { id: "linkedin", label: "LinkedIn Post", icon: Linkedin },
              { id: "reddit", label: "Reddit / HackerNews", icon: MessageSquare },
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

          {/* TAB: LinkedIn Carousel */}
          {activeTab === "carousel" && campaign.linkedInCarousel && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    LinkedIn Multi-Slide Carousel Deck ({campaign.linkedInCarousel.slides.length} Slides)
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {campaign.linkedInCarousel.title}
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(campaign.linkedInCarousel, null, 2), "carousel")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "carousel" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Slide Deck
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {campaign.linkedInCarousel.slides.map((s: any) => (
                  <div key={s.slideNumber} className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold">
                        Slide {s.slideNumber}
                      </span>
                      <h4 className="text-sm font-bold font-serif mt-2">{s.title}</h4>
                      <ul className="space-y-1.5 text-xs text-slate-300 mt-3">
                        {s.bulletPoints.map((b: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-400">•</span> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
                      {s.takeaway}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Pinterest Infographic */}
          {activeTab === "pinterest" && campaign.pinterestPin && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pinterest Pin &amp; Infographic Generator
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {campaign.pinterestPin.title}
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(`${campaign.pinterestPin.title}\n\n${campaign.pinterestPin.description}`, "pin")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "pin" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Pin Details
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-500">Board Suggestion: <span className="text-indigo-600 dark:text-indigo-400">{campaign.pinterestPin.boardSuggestion}</span></div>
                <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{campaign.pinterestPin.description}</div>
                <div className="text-[11px] font-mono p-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                  <b>Image Prompt:</b> {campaign.pinterestPin.imagePrompt}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Quora Q&A */}
          {activeTab === "quora" && campaign.quoraAnswer && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Quora High-Authority Q&amp;A Response
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.quoraAnswer.answer, "quora")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "quora" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Quora Answer
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Target Question: "{campaign.quoraAnswer.question}"
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {campaign.quoraAnswer.answer}
                </p>
              </div>
            </div>
          )}

          {/* TAB: Medium Canonical Post */}
          {activeTab === "medium" && campaign.mediumRepublish && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Medium Markdown Import (With rel="canonical" Citation)
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.mediumRepublish.markdownBody, "medium")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "medium" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Medium Markdown
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs whitespace-pre-line border border-slate-800 max-h-80 overflow-y-auto">
                {campaign.mediumRepublish.markdownBody}
              </div>
            </div>
          )}

          {/* TAB: Twitter / X */}
          {activeTab === "twitter" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Twitter / X Viral Thread
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.twitterThread.fullThreadText, "twitter")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "twitter" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Entire Thread
                </button>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed border border-slate-200 dark:border-slate-800">
                {campaign.twitterThread.fullThreadText}
              </div>
            </div>
          )}

          {/* TAB: LinkedIn Post */}
          {activeTab === "linkedin" && campaign.linkedInPost && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  LinkedIn High-Authority Thought Leadership Post
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.linkedInPost.fullPostText, "linkedin")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "linkedin" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy LinkedIn Post
                </button>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed border border-slate-200 dark:border-slate-800">
                {campaign.linkedInPost.fullPostText}
              </div>
            </div>
          )}

          {/* TAB: Reddit / HackerNews */}
          {activeTab === "reddit" && campaign.redditDiscussion && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Reddit &amp; Developer Community Discussion Post
                </span>
                <button
                  onClick={() => copyToClipboard(`${campaign.redditDiscussion.postTitle}\n\n${campaign.redditDiscussion.postBody}`, "reddit")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "reddit" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Reddit Post
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-500">
                  Suggested Subreddits: <span className="text-indigo-600 dark:text-indigo-400">{campaign.redditDiscussion.suggestedSubreddits.join(", ")}</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {campaign.redditDiscussion.postTitle}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {campaign.redditDiscussion.postBody}
                </p>
              </div>
            </div>
          )}

          {/* TAB: Newsletter Blast */}
          {activeTab === "newsletter" && campaign.newsletterBlast && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Newsletter Broadcast (Markdown &amp; Subject Lines)
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.newsletterBlast.emailBodyMarkdown, "newsletter")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSection === "newsletter" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Newsletter
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-500">
                  High-Open Subject Lines:
                  <ul className="list-disc list-inside mt-1 text-slate-800 dark:text-slate-200">
                    {campaign.newsletterBlast.subjectLines.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs font-bold text-slate-500">Preview Text: <span className="font-normal text-slate-700 dark:text-slate-300">{campaign.newsletterBlast.previewText}</span></div>
                <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs whitespace-pre-line border border-slate-800 max-h-80 overflow-y-auto">
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
