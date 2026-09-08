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
              Growth &amp; Viral Promotion Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate high-converting social media threads, newsletter campaigns, and automated webhooks for published articles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Syndication Agent Online
          </span>
        </div>
      </div>

      {/* Target Selector & Trigger Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          Select Target Content for Multi-Platform Distribution
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Published Article
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
                  [{art.category.name}] {art.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Or Type Custom Topic / Angle
            </label>
            <input
              type="text"
              placeholder="e.g. Why We Migrated from Kubernetes to Serverless in 2026"
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
          disabled={loading}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Promotion Agent Synthesizing Viral Copy &amp; Hooks...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate Multi-Platform Viral Campaign (AI Agent Swarm)
            </>
          )}
        </button>
      </div>

      {/* Generated Campaign Workstation */}
      {campaign ? (
        <div className="space-y-6">
          {/* Channel Tabs (Scrollable on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-slate-200 dark:border-slate-800">
            {[
              { id: "twitter", label: "Twitter / X Thread", icon: Twitter },
              { id: "linkedin", label: "LinkedIn Post", icon: Linkedin },
              { id: "reddit", label: "Reddit / HackerNews", icon: MessageSquare },
              { id: "chat", label: "Discord & Telegram", icon: Send },
              { id: "newsletter", label: "Email Newsletter Blast", icon: Mail },
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
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                    {campaign.twitterThread.hookTweet}
                  </p>
                </div>

                {/* Body Tweets */}
                {campaign.twitterThread.tweets.map((tw: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Tweet {idx + 2} (Insight)
                      </span>
                      <button
                        onClick={() => copyToClipboard(tw, `t_${idx}`)}
                        className="text-xs text-slate-400 hover:text-indigo-500 flex items-center gap-1"
                      >
                        {copiedSection === `t_${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                      {tw}
                    </p>
                  </div>
                ))}

                {/* CTA Tweet */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Final Tweet (CTA &amp; Traffic Link)
                    </span>
                    <button
                      onClick={() => copyToClipboard(campaign.twitterThread.ctaTweet, "cta")}
                      className="text-xs text-slate-400 hover:text-indigo-500 flex items-center gap-1"
                    >
                      {copiedSection === "cta" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                    {campaign.twitterThread.ctaTweet}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LinkedIn Post */}
          {activeTab === "linkedin" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Thought-Leadership Format
                </span>
                <button
                  onClick={() => copyToClipboard(campaign.linkedInPost.fullPostText, "linkedin")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copiedSection === "linkedin" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" /> Copied for LinkedIn!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Post
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                  {campaign.linkedInPost.headline}
                </h3>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {campaign.linkedInPost.body}
                </p>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {campaign.linkedInPost.hashtags.join(" ")}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Reddit / HackerNews */}
          {activeTab === "reddit" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recommended Communities:
                  </span>
                  {campaign.redditDiscussion.suggestedSubreddits.map((sub: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${campaign.redditDiscussion.postTitle}\n\n${campaign.redditDiscussion.postBody}`,
                      "reddit"
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copiedSection === "reddit" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" /> Copied Reddit Post!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Title &amp; Body
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase">Post Title:</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {campaign.redditDiscussion.postTitle}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase pt-2">Discussion Body:</div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {campaign.redditDiscussion.postBody}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Discord & Telegram */}
          {activeTab === "chat" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Discord Webhook Broadcast Hub
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Broadcast instantly to your community announcement channels.
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      campaign.discordTelegramEmbed.formattedDiscordMarkdown,
                      "discord"
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copiedSection === "discord" ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied Markdown
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Discord Embed
                    </>
                  )}
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://discord.com/api/webhooks/your-channel-webhook"
                  value={discordWebhook}
                  onChange={(e) => setDiscordWebhook(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleDispatchDiscord}
                  disabled={isDispatching}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Webhook
                </button>
              </div>

              {dispatchStatus && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {dispatchStatus}
                </div>
              )}

              {/* Discord UI Mockup */}
              <div className="p-5 rounded-2xl bg-[#313338] text-white border-l-4 border-indigo-500 font-sans space-y-3">
                <div className="text-xs font-bold text-[#f2f3f5]">{campaign.discordTelegramEmbed.title}</div>
                <div className="text-xs text-[#dbdee1] leading-relaxed">
                  {campaign.discordTelegramEmbed.summary}
                </div>
                <div className="text-xs text-[#dbdee1] space-y-1">
                  <div className="font-bold text-[#f2f3f5]">Key Takeaways:</div>
                  {campaign.discordTelegramEmbed.takeaways.map((t: string, idx: number) => (
                    <div key={idx}>• {t}</div>
                  ))}
                </div>
                <div className="text-xs text-indigo-400 underline font-semibold">
                  👉 Read Full Article: {campaign.articleUrl}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Email Newsletter Blast */}
          {activeTab === "newsletter" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  3 AI Tested Subject Line Options
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(campaign.newsletterBlast.emailBodyMarkdown, "newsletter")
                  }
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copiedSection === "newsletter" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" /> Copied Email Body!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Email Edition
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {campaign.newsletterBlast.subjectLines.map((sub: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                      {sub}
                    </span>
                    <button
                      onClick={() => copyToClipboard(sub, `sub_${idx}`)}
                      className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
                    >
                      {copiedSection === `sub_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase">Preheader Preview:</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">
                  {campaign.newsletterBlast.previewText}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase pt-2">Email Body (Markdown / HTML):</div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
                  {campaign.newsletterBlast.emailBodyMarkdown}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
            No Campaign Generated Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Select an article from the dropdown above or enter a custom topic, then click <strong>Generate Multi-Platform Viral Campaign</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

