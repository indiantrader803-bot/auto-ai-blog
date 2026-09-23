"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { generateSlug } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleSidebarWidgetsProps {
  content: string;
  categorySlug?: string;
}

export default function ArticleSidebarWidgets({
  content,
  categorySlug = "finance",
}: ArticleSidebarWidgetsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Parse headings from markdown content
  useEffect(() => {
    const headingLines = content.split("\n").filter((line) => line.startsWith("##"));
    const items: TocItem[] = headingLines.map((line) => {
      const isH3 = line.startsWith("###");
      const text = line.replace(/^#{2,3}\s*/, "").replace(/[#*`_]/g, "").trim();
      const id = generateSlug(text);
      return {
        id,
        text,
        level: isH3 ? 3 : 2,
      };
    });

    // Fallback if content has few or no markdown headings
    if (items.length === 0) {
      setHeadings([
        { id: "introduction", text: "Introduction", level: 2 },
        { id: "overview", text: "Overview & Context", level: 2 },
        { id: "key-opportunities", text: "Key Opportunities", level: 2 },
        { id: "risks-and-challenges", text: "Risks and Challenges", level: 2 },
        { id: "global-market-impact", text: "Global Market Impact", level: 2 },
        { id: "future-outlook", text: "Future Outlook", level: 2 },
        { id: "faq", text: "Frequently Asked Questions", level: 2 },
      ]);
    } else {
      setHeadings(items);
      setActiveId(items[0]?.id || "");
    }

    // Scroll spy observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -65% 0%" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
  };

  return (
    <div className="space-y-6">
      {/* 1. On This Page (TOC) Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#0b1329]/80 p-5 shadow-sm backdrop-blur-sm transition-colors">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
          On This Page
        </h4>

        <nav className="space-y-1.5 text-xs">
          {headings.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(item.id);
                  }
                }}
                className={`block py-1 transition-all rounded-r-md ${
                  item.level === 3 ? "ml-3 text-[11px]" : ""
                } ${
                  isActive
                    ? "border-l-2 border-emerald-400 dark:border-emerald-400 pl-2.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white pl-2 border-l-2 border-transparent"
                }`}
              >
                <span className="truncate block">{item.text}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* 2. Stay Informed Newsletter Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#0b1329]/80 p-5 shadow-sm backdrop-blur-sm transition-colors">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Stay Informed
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Get the latest insights on global markets, technology and more.
        </p>

        {subscribed ? (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>You&apos;re subscribed! Thanks for joining.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-4 space-y-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#070d1d] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 transition-all shadow-md shadow-cyan-500/20 cursor-pointer text-center"
            >
              Subscribe
            </button>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center pt-0.5">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>

      {/* 3. Smarter Insights Vertical Promo Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-md group min-h-[340px] flex flex-col justify-end p-6 text-white transition-all">
        {/* Background Image with Fallback Cityscape Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/60 via-slate-900/80 to-slate-950 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop')`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 space-y-4">
          <h3 className="text-xl sm:text-2xl font-black font-serif leading-tight text-white drop-shadow-md">
            Smarter Insights for a Global Tomorrow.
          </h3>
          <Link
            href="/best-ai-tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30"
          >
            <span>Explore More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
