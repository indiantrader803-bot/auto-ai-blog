"use client";

import Link from "next/link";
import {
  Smartphone,
  TrendingUp,
  Sparkles,
  Plane,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function FeaturedHubsStrip() {
  const hubs = [
    {
      id: "apple",
      name: "Apple Hub 2026",
      badge: "iPhone 18",
      href: "/apple",
      icon: Smartphone,
      gradient: "from-zinc-500/20 to-zinc-800/20 border-zinc-700/60 hover:border-zinc-400",
      iconColor: "text-zinc-200",
      pingColor: "bg-emerald-400",
      pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "trade",
      name: "Quant Trade Hub",
      badge: "90% Split",
      href: "/trade",
      icon: TrendingUp,
      gradient: "from-emerald-500/15 to-teal-800/20 border-emerald-700/60 hover:border-emerald-400",
      iconColor: "text-emerald-400",
      pingColor: "bg-emerald-400",
      pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "ai-tools",
      name: "AI Prompt Studio",
      badge: "100+ Tools",
      href: "/best-ai-tools",
      icon: Sparkles,
      gradient: "from-purple-500/15 to-indigo-800/20 border-purple-700/60 hover:border-purple-400",
      iconColor: "text-purple-400",
      pingColor: "bg-purple-400",
      pillBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    {
      id: "travel",
      name: "Luxury Travel Deals",
      badge: "0% Fees",
      href: "/travel",
      icon: Plane,
      gradient: "from-sky-500/15 to-blue-800/20 border-sky-700/60 hover:border-sky-400",
      iconColor: "text-sky-400",
      pingColor: "bg-sky-400",
      pillBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    },
    {
      id: "community",
      name: "VIP Mastermind",
      badge: "Live 24/7",
      href: "/community",
      icon: MessageSquare,
      gradient: "from-amber-500/15 to-orange-800/20 border-amber-700/60 hover:border-amber-400",
      iconColor: "text-amber-400",
      pingColor: "bg-amber-400",
      pillBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Featured Ecosystem Hubs</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
          Live Interactive Portals
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {hubs.map((hub) => {
          const Icon = hub.icon;
          return (
            <Link
              key={hub.id}
              href={hub.href}
              className={`group relative p-3 rounded-2xl bg-gradient-to-br ${hub.gradient} border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-between gap-2 overflow-hidden`}
            >
              {/* Subtle ambient light */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-slate-900/70 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 ${hub.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {hub.name}
                    </p>
                  </div>
                  <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full border ${hub.pillBg} mt-0.5`}>
                    {hub.badge}
                  </span>
                </div>
              </div>

              <div className="w-6 h-6 rounded-lg bg-slate-800/40 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all shrink-0">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
