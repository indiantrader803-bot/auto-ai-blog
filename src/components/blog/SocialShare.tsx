"use client";

import { useState } from "react";
import {
  Twitter,
  Linkedin,
  Facebook,
  Send,
  Copy,
  Check,
  MessageCircle,
  Share2
} from "lucide-react";

interface SocialShareProps {
  title: string;
  url?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  className?: string;
}

export default function SocialShare({
  title,
  url,
  slug,
  category = "Technology",
  excerpt = "",
  className = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://auto-ai-blog-web.onrender.com";

  const resolvedUrl = url || (slug ? `${siteUrl}/blog/${slug}` : siteUrl);
  const encodedUrl = encodeURIComponent(resolvedUrl);
  const encodedTitle = encodeURIComponent(title);

  // Dynamic contextual hashtags
  const lowerCat = category.toLowerCase();
  let hashtags = "SmartMag,Tech,AI";
  if (lowerCat.includes("travel") || lowerCat.includes("expedition")) {
    hashtags = "Travel,IncredibleIndia,Wanderlust,TravelGuide";
  } else if (lowerCat.includes("festival") || lowerCat.includes("culture")) {
    hashtags = "Culture,Festivals,WorldHeritage,Traditions";
  } else if (lowerCat.includes("market") || lowerCat.includes("trading") || lowerCat.includes("finance")) {
    hashtags = "Trading,Nifty50,StockMarket,Forex,IndianTrader";
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(resolvedUrl);
    setCopied(true);
    trackShare("COPY_LINK");
    setTimeout(() => setCopied(false), 2000);
  };

  const trackShare = (platform: string) => {
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "SOCIAL_SHARE",
          slug: slug || "",
          metadata: { platform, title },
        }),
      }).catch(() => {});
    } catch (_) {}
  };

  const shareTwitter = () => {
    trackShare("TWITTER");
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${hashtags}&via=Theindainta9go`,
      "_blank"
    );
  };

  const shareLinkedIn = () => {
    trackShare("LINKEDIN");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    trackShare("WHATSAPP");
    window.open(
      `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    trackShare("FACEBOOK");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank"
    );
  };

  const shareTelegram = () => {
    trackShare("TELEGRAM");
    window.open(
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      "_blank"
    );
  };

  const shareReddit = () => {
    trackShare("REDDIT");
    window.open(
      `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      "_blank"
    );
  };

  return (
    <div className={`p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Share2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Share this story:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* Twitter / X */}
          <button
            onClick={shareTwitter}
            title="Share on X (@Theindainta9go)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Twitter className="w-3.5 h-3.5 text-sky-400" />
            <span>X / Twitter</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={shareLinkedIn}
            title="Share on LinkedIn (Indian Trader)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5 text-white" />
            <span>LinkedIn</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={shareWhatsApp}
            title="Share on WhatsApp"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </button>

          {/* Facebook */}
          <button
            onClick={shareFacebook}
            title="Share on Facebook"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Facebook className="w-3.5 h-3.5 text-white" />
            <span>Facebook</span>
          </button>

          {/* Telegram */}
          <button
            onClick={shareTelegram}
            title="Share on Telegram"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Telegram</span>
          </button>

          {/* Reddit */}
          <button
            onClick={shareReddit}
            title="Share on Reddit"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-xs font-black">r/</span>
            <span>Reddit</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            title="Copy article link"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
