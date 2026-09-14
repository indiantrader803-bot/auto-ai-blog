"use client";

import { useState } from "react";
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Send,
  Copy,
  Check,
  MessageCircle,
  ExternalLink
} from "lucide-react";

interface SocialShareBarProps {
  title: string;
  url: string;
  excerpt?: string;
  category?: string;
  className?: string;
}

export default function SocialShareBar({
  title,
  url,
  excerpt = "",
  category = "Technology",
  className = "",
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt.slice(0, 150));

  // Determine relevant hashtags
  const lowerCat = category.toLowerCase();
  let hashtags = "SmartMag,Tech,AI";
  if (lowerCat.includes("travel") || lowerCat.includes("expedition")) {
    hashtags = "Travel,IncredibleIndia,Wanderlust,Expeditions,SmartTravel";
  } else if (lowerCat.includes("festival") || lowerCat.includes("culture")) {
    hashtags = "Culture,Festivals,TravelCommunity,Traditions";
  } else if (lowerCat.includes("market") || lowerCat.includes("trading") || lowerCat.includes("finance")) {
    hashtags = "Trading,StockMarket,Nifty50,Forex,IndianTrader";
  }

  // 1-Click Native Share Links
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${hashtags}&via=Theindainta9go`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt || title,
          url,
        });
      } catch (_) {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Share &amp; Promote This Article
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Distribute to your network across 6+ major platforms
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Twitter / X */}
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share to Twitter / X (@Theindainta9go)"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <Twitter className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Post on X</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn (Indian Trader)"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <Linkedin className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <Facebook className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">Facebook</span>
          </a>

          {/* Telegram */}
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Telegram"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">Telegram</span>
          </a>

          {/* Reddit */}
          <a
            href={redditShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Submit to Reddit"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <span className="text-xs font-black">r/</span>
            <span className="hidden md:inline">Reddit</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            title="Copy direct article URL"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-black">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
