"use client";

import { useState } from "react";
import {
  Plane,
  Shield,
  Wifi,
  Ticket,
  Car,
  Bike,
  Navigation,
  Luggage,
  Sparkles,
  ExternalLink,
  Star,
  CheckCircle2,
  Flame,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react";
import { TRAVELPAYOUTS_PROGRAMS, TravelpayoutsProgram, trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";

export default function TravelEssentialsHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "ALL", label: "🔥 All Travel Deals", count: TRAVELPAYOUTS_PROGRAMS.length },
    { id: "Flights & Search", label: "✈️ Flights & Tickets", count: 1 },
    { id: "Flight Delay Compensation", label: "🛡️ Delay Compensation", count: 2 },
    { id: "eSIM & Connectivity", label: "📱 eSIM & Data", count: 2 },
    { id: "Tours, Passes & Guides", label: "🎟️ Tours & City Passes", count: 4 },
    { id: "Car & Bike Rentals", label: "🚗 Car & Bike Hire", count: 4 },
    { id: "Airport Transfers", label: "🚖 Airport Transfers", count: 2 },
    { id: "Luggage & Travel Insurance", label: "🧳 Insurance & Luggage", count: 2 },
  ];

  const filteredPrograms = TRAVELPAYOUTS_PROGRAMS.filter((p) => {
    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconType: TravelpayoutsProgram["iconType"]) => {
    switch (iconType) {
      case "plane":
        return <Plane className="w-4 h-4 text-sky-500 dark:text-sky-400" />;
      case "shield":
        return <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case "wifi":
        return <Wifi className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case "ticket":
        return <Ticket className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      case "car":
        return <Car className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      case "bike":
        return <Bike className="w-4 h-4 text-teal-500 dark:text-teal-400" />;
      case "taxi":
        return <Navigation className="w-4 h-4 text-purple-500 dark:text-purple-400" />;
      case "luggage":
        return <Luggage className="w-4 h-4 text-rose-500 dark:text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
    }
  };

  return (
    <section className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-10 text-slate-900 dark:text-white shadow-2xl relative overflow-hidden font-sans transition-colors">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 animate-pulse" />
              Verified Travel Partner Hub • Campaign: travelpayouts
            </span>
            <span className="hidden sm:inline-flex text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% Best Price Guarantee
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
            Global Travel Essentials &amp; Exclusive Deals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Curated flight search, eSIM data, skip-the-line passes, car rentals, luggage storage, and up to €600 flight compensation claims.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flights, eSIM, car hire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-5 scrollbar-none relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
            }`}
          >
            <span>{cat.label}</span>
            <span className="text-[10px] opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pt-2">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className="group rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 relative overflow-hidden shadow-sm"
          >
            {/* Top Row: Icon, Category & Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                    {getCategoryIcon(program.iconType)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{program.category}</span>
                </div>

                {program.discountBadge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase tracking-wide flex items-center gap-1">
                    <Flame className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                    {program.discountBadge}
                  </span>
                )}
              </div>

              {/* Title & Ratings */}
              <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors mb-1.5 leading-snug">
                {program.name}
              </h3>

              <div className="flex items-center gap-1 mb-3 text-amber-500 text-xs">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-slate-900 dark:text-white ml-1">{program.rating}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">({program.reviews} reviews)</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-2">
                {program.description}
              </p>

              {/* Features List */}
              <ul className="space-y-1.5 mb-5 text-[11px] text-slate-600 dark:text-slate-400">
                {program.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <a
                href={program.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={() => trackTravelpayoutsClick(program.id, { clickSource: "TRAVEL_ESSENTIALS_HUB" })}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>{program.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
