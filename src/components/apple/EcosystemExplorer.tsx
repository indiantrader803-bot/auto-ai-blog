"use client";

import Link from "next/link";
import { Laptop, Tablet, Watch, Headphones, Smartphone, Sparkles, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export default function EcosystemExplorer() {
  const categories = [
    {
      name: "iPhone",
      tagline: "iPhone 18 Pro Max, 18 Pro, 18 & 17 Series",
      href: "/apple/iphone-18",
      icon: Smartphone,
      count: "5 Flagship Models",
      priceFrom: "₹57,999",
      bgGradient: "from-indigo-50/80 via-white to-slate-50 dark:from-indigo-950/40 dark:via-zinc-900 dark:to-black",
      borderHover: "hover:border-indigo-500/50",
      accentColor: "text-indigo-600 dark:text-indigo-400",
      chip: "2nm A20 Pro",
    },
    {
      name: "MacBook",
      tagline: "MacBook Pro 14\"/16\" M5 & MacBook Air M3/M4",
      href: "/apple/macbook",
      icon: Laptop,
      count: "M4 / M5 Pro & Max",
      priceFrom: "₹96,900",
      bgGradient: "from-slate-50 via-white to-slate-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black",
      borderHover: "hover:border-slate-400/50 dark:hover:border-zinc-400/50",
      accentColor: "text-slate-800 dark:text-zinc-300",
      chip: "M5 Pro / Max",
    },
    {
      name: "iPad",
      tagline: "iPad Pro M4 Tandem OLED, iPad Air & iPad Mini",
      href: "/apple/ipad",
      icon: Tablet,
      count: "Ultra Retina XDR",
      priceFrom: "₹49,900",
      bgGradient: "from-purple-50/80 via-white to-slate-50 dark:from-purple-950/40 dark:via-zinc-900 dark:to-black",
      borderHover: "hover:border-purple-500/50",
      accentColor: "text-purple-600 dark:text-purple-400",
      chip: "M4 / M2 Chip",
    },
    {
      name: "Apple Watch",
      tagline: "Apple Watch Ultra 3 & Series 12 microLED",
      href: "/apple/apple-watch",
      icon: Watch,
      count: "72hr Battery GPS",
      priceFrom: "₹24,900",
      bgGradient: "from-amber-50/80 via-white to-slate-50 dark:from-amber-950/40 dark:via-zinc-900 dark:to-black",
      borderHover: "hover:border-amber-500/50",
      accentColor: "text-amber-600 dark:text-amber-400",
      chip: "S11 SiP",
    },
    {
      name: "AirPods",
      tagline: "AirPods Pro 3 with Heart Rate, AirPods 5 & Max",
      href: "/apple/airpods",
      icon: Headphones,
      count: "Active Noise Cancel",
      priceFrom: "₹12,900",
      bgGradient: "from-sky-50/80 via-white to-slate-50 dark:from-sky-950/40 dark:via-zinc-900 dark:to-black",
      borderHover: "hover:border-sky-500/50",
      accentColor: "text-sky-600 dark:text-sky-400",
      chip: "H3 Audio Chip",
    },
    {
      name: "Accessories",
      tagline: "MagSafe 25W Qi2, Torras Cases & Anker Power",
      href: "/apple/accessories",
      icon: Sparkles,
      count: "High Commission Hub",
      priceFrom: "₹1,499",
      bgGradient: "from-emerald-50/80 via-white to-slate-50 dark:from-emerald-950/40 dark:via-zinc-900 dark:to-black",
      borderHover: "hover:border-emerald-500/50",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      chip: "Up to 40% OFF",
    },
  ];

  return (
    <section id="ecosystem" className="py-20 bg-slate-50/60 dark:bg-zinc-950 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase tracking-widest mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" /> Complete Apple Ecosystem
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              Ecosystem Explorer.
            </h2>
            <p className="mt-2 text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light max-w-xl">
              Seamless synergy across your phone, laptop, tablet, wrist, and ears. Dive into dedicated buyer guides below.
            </p>
          </div>

          <Link
            href="/apple/deals"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>Browse All Daily Discounts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className={`group p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${cat.bgGradient} border border-slate-200/90 dark:border-white/10 ${cat.borderHover} transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-sm hover:shadow-lg dark:shadow-xl relative overflow-hidden`}
              >
                {/* Top Row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className={`w-6 h-6 ${cat.accentColor}`} />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5 font-semibold">
                      {cat.chip}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:translate-x-0.5 transition-transform">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400 dark:text-zinc-500">Starting At</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">{cat.priceFrom}</div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-zinc-200">
                    <span>Explore Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
