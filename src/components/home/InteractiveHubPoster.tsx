"use client";

import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  Plane,
  Smartphone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  Star,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function InteractiveHubPoster() {
  const hubs = [
    {
      id: "apple-hub",
      title: "Apple Hub 2026",
      subtitle: "iPhone 18 • MacBook • Watch • AirPods",
      description: "Explore TSMC 2nm A20 Pro silicon, mechanical variable aperture cameras, and compare prices across Flipkart, Croma & Amazon.",
      href: "/apple",
      tag: "18 PRO MAX",
      tagColor: "bg-emerald-500 text-slate-950",
      accentBorder: "hover:border-zinc-300 dark:hover:border-white/40",
      bgGradient: "from-zinc-900 via-zinc-950 to-black text-white",
      icon: Smartphone,
      ctaText: "Explore Apple Hub",
      stat: "₹15,000 OFF Deals",
      statSub: "Verified Indian Retailers",
      isPrimary: true,
    },
    {
      id: "trade-hub",
      title: "Quant & Prop Trade Hub",
      subtitle: "FTMO • Blue Guardian • FTM • AquaFunded",
      description: "Compare verified prop firms, unlock 90% profit splits with coupon SMARTMAG20, and calculate monthly trader payouts.",
      href: "/trade",
      tag: "90% PROFIT SPLIT",
      tagColor: "bg-emerald-500 text-slate-950",
      accentBorder: "hover:border-emerald-500/50",
      bgGradient: "from-emerald-950/40 via-slate-900 to-slate-950 text-white",
      icon: TrendingUp,
      ctaText: "Launch Trade Terminal",
      stat: "Code SMARTMAG20",
      statSub: "20% Evaluation Discount",
      isPrimary: false,
    },
    {
      id: "ai-tools",
      title: "AI Tools & Prompt Studio",
      subtitle: "Autonomous Agents • Models • SLMs",
      description: "Directory of 100+ verified generative AI tools, ready-to-run multi-agent system prompts, and local LLM benchmark guides.",
      href: "/best-ai-tools",
      tag: "2026 DIRECTORY",
      tagColor: "bg-purple-500 text-white",
      accentBorder: "hover:border-purple-500/50",
      bgGradient: "from-purple-950/40 via-slate-900 to-slate-950 text-white",
      icon: Sparkles,
      ctaText: "Discover AI Tools",
      stat: "100+ Verified Tools",
      statSub: "Ranked by Latency & Cost",
      isPrimary: false,
    },
    {
      id: "travel-deals",
      title: "Luxury Travel & Expeditions",
      subtitle: "Flights • Hotels • Transfers • eSIMs",
      description: "Curated vacation itineraries across Goa, Manali, Kerala, Dubai & Bali. 0% booking fees, flight radar, and eSIM cellular.",
      href: "/travel",
      tag: "0% BOOKING FEES",
      tagColor: "bg-sky-500 text-slate-950",
      accentBorder: "hover:border-sky-500/50",
      bgGradient: "from-sky-950/40 via-slate-900 to-slate-950 text-white",
      icon: Plane,
      ctaText: "Find Travel Deals",
      stat: "25+ Top Itineraries",
      statSub: "Direct Agoda & Aviasales",
      isPrimary: false,
    },
    {
      id: "community-mastermind",
      title: "Community Mastermind",
      subtitle: "Live AI Reviews • Architecture Critique",
      description: "Join fellow quants, engineers, and founders. Get instant peer code reviews and architectural feedback from our Staff AI Lead.",
      href: "/community",
      tag: "LIVE DISCUSSIONS",
      tagColor: "bg-indigo-500 text-white",
      accentBorder: "hover:border-indigo-500/50",
      bgGradient: "from-indigo-950/40 via-slate-900 to-slate-950 text-white",
      icon: MessageSquare,
      ctaText: "Join Mastermind",
      stat: "Active 24/7",
      statSub: "Staff AI Critique Live",
      isPrimary: false,
    },
  ];

  return (
    <section className="my-10 w-full">
      {/* Poster Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-950/50 border border-indigo-500/30 text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3" /> TheSmartMag Interactive Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Featured Platform Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
            High-utility interactive platforms curated and continuously updated by our autonomous intelligence network.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Live Portals Active</span>
        </div>
      </div>

      {/* Luxury Poster Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hubs.map((hub) => {
          const Icon = hub.icon;
          return (
            <Link
              key={hub.id}
              href={hub.href}
              className={`group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${hub.bgGradient} border border-slate-200/40 dark:border-white/10 ${hub.accentBorder} transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl hover:shadow-2xl overflow-hidden`}
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-colors" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono tracking-wider uppercase ${hub.tagColor}`}>
                    {hub.tag}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  {hub.subtitle}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-zinc-100 transition-colors leading-snug">
                  {hub.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {hub.description}
                </p>
              </div>

              {/* Bottom Stat & CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-emerald-400 font-mono">{hub.stat}</div>
                  <div className="text-[10px] text-zinc-400">{hub.statSub}</div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-slate-950 font-bold text-xs uppercase tracking-wider group-hover:bg-zinc-200 transition-all shadow-md group-hover:translate-x-0.5">
                  <span>{hub.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
