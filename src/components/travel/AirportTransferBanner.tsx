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
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";

export default function AirportTransferBanner() {
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
    trackTravelpayoutsClick("gettransfer", {
      searchQuery: `${fromLocation} -> ${toLocation}`,
      pickupDate,
      passengers,
      source: "AIRPORT_TRANSFER_BANNER",
    });

    const params = new URLSearchParams();
    if (fromLocation) params.set("from", fromLocation);
    if (toLocation) params.set("to", toLocation);
    if (pickupDate) params.set("date", pickupDate);

    // Direct GetTransfer Affiliate Link
    const targetUrl = `https://gettransfer.tpo.li/SHZAx1VF?${params.toString()}`;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors font-sans">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md shrink-0 shadow-sm">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black tracking-tight font-serif text-white">
              Global Airport Transfers &amp; Private Chauffeurs
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-medium mt-0.5">
              Guaranteed fixed prices in 175+ countries • Name-sign meet &amp; greet in arrivals
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Best Price Guarantee
        </span>
      </div>

      {/* Main Search Box */}
      <div className="p-5 sm:p-8 bg-slate-50/50 dark:bg-slate-950/80 transition-colors">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* From Input */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                From (Airport, City or Train Station)
              </label>
              <input
                type="text"
                placeholder="e.g. JFK Airport, London Heathrow, Tokyo Haneda..."
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium shadow-sm"
              />
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex justify-center lg:pt-6">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap pickup and destination"
                className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To Input */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                To (Hotel, Resort or City Address)
              </label>
              <input
                type="text"
                placeholder="e.g. Manhattan Hotel, Central Paris, Shinjuku..."
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium shadow-sm"
              />
            </div>

            {/* Find Transfer Submit Button */}
            <div className="lg:col-span-3 lg:pt-6">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find Transfer</span>
              </button>
            </div>
          </div>

          {/* Quick Date and Passenger Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Pickup Date:</span>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="bg-transparent text-slate-900 dark:text-white focus:outline-none text-xs font-medium cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Users className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
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
            <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-auto flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Direct driver confirmation
            </span>
          </div>
        </form>

        {/* 3 Value Pillars */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Free cancellation</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Up to 24 hours before pickup</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">90 mins free waiting</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Flight delay tracking included</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-sky-500 dark:text-sky-400" />
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
