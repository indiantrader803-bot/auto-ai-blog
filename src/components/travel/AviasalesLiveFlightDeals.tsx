"use client";

import { useState } from "react";
import {
  Plane,
  Flame,
  MapPin,
  TrendingDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe2,
  Compass,
  ArrowRight,
} from "lucide-react";
import TravelpayoutsWidget from "./TravelpayoutsWidget";
import { getAviasalesFlightUrl } from "@/lib/affiliate/links";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";

const SCRIPT_TABLE_DEALS =
  "https://tpemb.com/content?currency=usd&trs=573790&shmarker=777349&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=LON&destination=BKK&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100";

const SCRIPT_MAP_RADAR =
  "https://tpemb.com/content?currency=usd&trs=573790&shmarker=777349&lat=51.5073509&lng=-0.1277583&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100";

export default function AviasalesLiveFlightDeals() {
  const [activeTab, setActiveTab] = useState<"table" | "map">("table");

  const handleAviasalesDirect = (origin = "DEL", destination = "BKK") => {
    trackTravelpayoutsClick("aviasales", {
      origin,
      destination,
      source: "AVIASALES_LIVE_DEALS_RADAR",
    });
    const url = getAviasalesFlightUrl({ origin, destination });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-sans transition-colors">
      {/* 👑 Top Headline Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-400" />
                Live Fare Radar
              </span>
              <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-sky-400" />
                1,000+ Verified Airlines
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-serif text-white tracking-tight">
              Real-Time Lowest Flight Deals &amp; Interactive Fare Map
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Live price feeds directly from Aviasales with 0% booking fees and instant price drops on global routes.
            </p>
          </div>

          {/* Direct Aviasales Badge */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Plane className="w-5 h-5 text-sky-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[11px] font-black text-white leading-tight">
                Aviasales Official Feed
              </div>
              <div className="text-[9px] text-emerald-400 font-bold">
                ● Live 24/7 Global Price Matching
              </div>
            </div>
          </div>
        </div>

        {/* 🧭 Interactive Tab Selector */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 p-1 bg-black/40 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab("table")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "table"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Lowest Fare Table</span>
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "map"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>World Low-Fare Map</span>
            </button>
          </div>

          {/* Search Custom Route Button */}
          <button
            onClick={() => handleAviasalesDirect("DEL", "BKK")}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>Search 1,000+ Airlines</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 📊 Live Widget Canvas Container */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/80">
        {activeTab === "table" ? (
          <div className="w-full overflow-x-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 sm:p-4 shadow-inner">
            <div className="mb-3 px-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Live Direct &amp; Connecting Flight Matrix
              </span>
              <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400">
                Auto-Refreshed
              </span>
            </div>
            <TravelpayoutsWidget
              scriptSrc={SCRIPT_TABLE_DEALS}
              minHeight="380px"
              className="border-0 shadow-none p-0 bg-transparent"
            />
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 sm:p-4 shadow-inner">
            <div className="mb-3 px-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Compass className="w-3.5 h-3.5 text-sky-500" />
                Explore Global Destinations by Cheapest Ticket Price
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                Interactive Heatmap
              </span>
            </div>
            <TravelpayoutsWidget
              scriptSrc={SCRIPT_MAP_RADAR}
              minHeight="520px"
              className="border-0 shadow-none p-0 bg-transparent"
            />
          </div>
        )}

        {/* Bottom Trust & Feature Highlights */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                0% Booking Commission
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Direct airline ticket prices
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Real-Time Price Alerts
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Catches secret airline price drops
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                100% Verified Tickets
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                IATA authorized ticketing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
