"use client";

import { useState } from "react";
import { Twitter, Linkedin, Copy, Check, Share2, Flame } from "lucide-react";

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
    const tweetText = `🚨 Critical breakdown: "${title}"\n\nRead our full market & tech deep dive:`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(articleUrl)}`,
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
    const text = `🔥 *${title}*\n\nRead the full report here:\n${articleUrl}`;
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
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-full px-3 py-2 shadow-2xl shadow-indigo-950/40 text-white transition-all hover:scale-105">
      <div className="hidden sm:flex items-center gap-1.5 px-2 text-xs font-bold text-amber-400">
        <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
        <span>Share</span>
      </div>

      <div className="h-4 w-px bg-slate-700 hidden sm:block" />

      {/* Twitter / X */}
      <button
        onClick={shareTwitter}
        title="Share to X (Twitter)"
        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
      >
        <Twitter className="w-3.5 h-3.5" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareLinkedIn}
        title="Share to LinkedIn"
        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </button>

      {/* WhatsApp */}
      <button
        onClick={shareWhatsApp}
        title="Share to WhatsApp"
        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
      >
        <span className="text-xs font-black">WA</span>
      </button>

      {/* Telegram */}
      <button
        onClick={shareTelegram}
        title="Share to Telegram"
        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
      >
        <span className="text-xs font-black">TG</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        title="Copy Link"
        className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-colors shadow-sm"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
