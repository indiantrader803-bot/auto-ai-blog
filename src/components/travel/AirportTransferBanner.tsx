"use client";

import { useState } from "react";
import {
  Car,
  ArrowLeftRight,
  Search,
  ShieldCheck,
  Clock,
  Headphones,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getGetTransferUrl, getIntuiTransferUrl } from "@/lib/affiliate/links";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";

export default function AirportTransferBanner() {
  const [provider, setProvider] = useState<"gettransfer" | "intui">("gettransfer");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackTravelpayoutsClick(provider, {
      searchQuery: `${fromLocation} -> ${toLocation}`,
      pickupDate,
      passengers,
      source: "AIRPORT_TRANSFER_BANNER",
    });

    if (provider === "intui") {
      const targetUrl = getIntuiTransferUrl({
        from: fromLocation || "Airport",
        to: toLocation || "Hotel",
        date: pickupDate,
        passengers: parseInt(passengers, 10) || 1,
      });
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const targetUrl = getGetTransferUrl({
      from: fromLocation || "Airport",
      to: toLocation || "Hotel",
      date: pickupDate,
      passengers: parseInt(passengers, 10) || 1,
    });
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const popularRoutes = [
    { from: "JFK Airport (New York)", to: "Manhattan Hotel" },
    { from: "Heathrow Airport (LHR)", to: "Central London" },
    { from: "Haneda Airport (HND)", to: "Shinjuku / Shibuya" },
    { from: "Dubai Intl (DXB)", to: "Downtown Dubai / Marina" },
  ];

  return (
    <section className="w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all font-sans">
      {/* 👑 Top Headline Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 sm:px-8 py-5 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center shrink-0 shadow-md">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black font-serif text-white tracking-tight">
                Global Airport Transfers &amp; Private Chauffeurs
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                Guaranteed fixed prices in 175+ countries • Name-sign meet &amp; greet in arrivals
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Best Price Guarantee
          </span>
        </div>
      </div>

      {/* 🔍 Interactive Booking Console */}
      <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-950/60">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              type="button"
              onClick={() => setProvider("gettransfer")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                provider === "gettransfer"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              GetTransfer (Chauffeur &amp; Minivan)
            </button>
            <button
              type="button"
              onClick={() => setProvider("intui")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                provider === "intui"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Intui.travel (VIP &amp; Fixed Fare)
            </button>
          </div>

          <a
            href="https://intui.tpo.li/7TDYgynw"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Explore Intui.travel VIP Fleet</span>
            <Sparkles className="w-3.5 h-3.5" />
          </a>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Connected Inputs Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* From Input */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                From (Airport, Station or Address)
              </label>
              <input
                type="text"
                placeholder="e.g. JFK Airport, London Heathrow, Tokyo Haneda..."
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium shadow-sm"
              />
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex justify-center lg:pt-6">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap pickup and destination"
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To Input */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                To (Hotel, Resort or City Address)
              </label>
              <input
                type="text"
                placeholder="e.g. Manhattan Hotel, Central Paris, Shinjuku..."
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium shadow-sm"
              />
            </div>

            {/* Find Transfer Submit Button */}
            <div className="lg:col-span-3 lg:pt-6">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find Transfer</span>
              </button>
            </div>
          </div>

          {/* Quick Date, Passenger & Popular Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Date:</span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="bg-transparent text-slate-900 dark:text-white focus:outline-none text-xs font-medium cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <Users className="w-3.5 h-3.5 text-sky-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Passengers:</span>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="bg-transparent text-slate-900 dark:text-white focus:outline-none text-xs font-medium cursor-pointer"
                >
                  <option value="1" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">1 Person</option>
                  <option value="2" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">2 People</option>
                  <option value="3" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">3-4 People (Sedan)</option>
                  <option value="6" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">5-8 People (Minivan)</option>
                  <option value="12" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Group Minibus</option>
                </select>
              </div>
            </div>

            {/* Popular Presets */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Popular:</span>
              {popularRoutes.slice(0, 2).map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setFromLocation(r.from);
                    setToLocation(r.to);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {r.from.split(" ")[0]} → {r.to.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* 3 Value Pillars */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Free cancellation</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Up to 24 hours before pickup</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">90 mins free waiting</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Flight delay tracking included</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">24/7 support service</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Multilingual dispatch assistance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
