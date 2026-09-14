"use client";

import { useState } from "react";
import { Twitter, Linkedin, Copy, Check, Share2, Flame, MessageCircle, Send } from "lucide-react";

interface Props {
  title: string;
  slug: string;
}

export default function FloatingShareDock({ title, slug }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://auto-ai-blog-web.onrender.com";
  const articleUrl = `${siteUrl}/blog/${slug}`;

  const trackShare = (platform: string) => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "SOCIAL_SHARE",
          slug,
          metadata: { platform, title },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    trackShare("COPY_LINK");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    trackShare("TWITTER");
    const tweetText = `🚨 Essential read: "${title}"\n\nFull deep dive:`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(articleUrl)}&via=Theindainta9go`,
      "_blank"
    );
  };

  const shareLinkedIn = () => {
    trackShare("LINKEDIN");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    trackShare("WHATSAPP");
    const text = `🔥 *${title}*\n\nRead the full article:\n${articleUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareTelegram = () => {
    trackShare("TELEGRAM");
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`,
      "_blank"
    );
  };

  return (
    <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 shadow-2xl text-white transition-all">
      <div className="flex flex-col items-center gap-1 py-1 text-[10px] font-black uppercase text-amber-400">
        <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
        <span>Share</span>
      </div>

      <div className="w-4 h-px bg-slate-700 my-1" />

      {/* Twitter / X */}
      <button
        onClick={shareTwitter}
        title="Share to X / Twitter (@Theindainta9go)"
        className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-black flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-110 cursor-pointer"
      >
        <Twitter className="w-3.5 h-3.5 text-sky-400" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareLinkedIn}
        title="Share to LinkedIn (Indian Trader)"
        className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-110 cursor-pointer"
      >
        <Linkedin className="w-3.5 h-3.5 text-white" />
      </button>

      {/* WhatsApp */}
      <button
        onClick={shareWhatsApp}
        title="Share to WhatsApp"
        className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-110 cursor-pointer"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
      </button>

      {/* Telegram */}
      <button
        onClick={shareTelegram}
        title="Share to Telegram"
        className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-sky-500 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-110 cursor-pointer"
      >
        <Send className="w-3.5 h-3.5 text-sky-300" />
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        title="Copy Link"
        className="w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer shadow-sm"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
