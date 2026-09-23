"use client";

import { useState } from "react";
import { Calculator, DollarSign, Users, Calendar, Plane, Building2, Wifi, Shield, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { DESTINATIONS_DATA } from "@/lib/travel/destinationsData";
import { getAviasalesFlightUrl, getBookingHotelUrl, getAiraloEsimUrl } from "@/lib/affiliate/links";

export default function InteractiveTravelCostCalculator() {
  const [selectedDestSlug, setSelectedDestSlug] = useState<string>("manali");
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [travelTier, setTravelTier] = useState<"budget" | "comfort" | "luxury">("comfort");

  const guide = DESTINATIONS_DATA[selectedDestSlug] || DESTINATIONS_DATA["manali"];

  // Tier multiplier
  const tierMultipliers = {
    budget: 0.65,
    comfort: 1.0,
    luxury: 1.85,
  };

  const mult = tierMultipliers[travelTier];
  const flightPerPax = Math.round(guide.budgetBreakdown.flight * (travelTier === "luxury" ? 1.5 : 1));
  const hotelPerNight = Math.round((guide.budgetBreakdown.hotel / 5) * mult);
  const roomsNeeded = Math.ceil(travelers / 2);
  const totalHotel = hotelPerNight * durationDays * roomsNeeded;
  const foodPerPaxDay = Math.round((guide.budgetBreakdown.food / 5) * mult);
  const totalFood = foodPerPaxDay * durationDays * travelers;
  const activitiesPerPax = Math.round(guide.budgetBreakdown.activities * mult);
  const totalActivities = activitiesPerPax * travelers;
  const esimTotal = guide.budgetBreakdown.esim * travelers;
  const insuranceTotal = guide.budgetBreakdown.insurance * travelers;

  const totalTripCost = (flightPerPax * travelers) + totalHotel + totalFood + totalActivities + esimTotal + insuranceTotal;
  const perPersonCost = Math.round(totalTripCost / travelers);

  const sym = guide.budgetBreakdown.currencySymbol || "$";

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Phase 8 Interactive Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white">
            Smart Vacation Cost &amp; Budget Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Customize dates, travelers, and travel style to estimate exact trip costs with real-time partner pricing.
          </p>
        </div>

        <div className="text-left md:text-right p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 shrink-0">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Estimated Total Budget</span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-sky-600 dark:text-sky-400">
            {sym}{totalTripCost.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
            ({sym}{perPersonCost.toLocaleString()} per traveler)
          </span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Destination Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Destination
          </label>
          <select
            value={selectedDestSlug}
            onChange={(e) => setSelectedDestSlug(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
          >
            {Object.values(DESTINATIONS_DATA).map((dest) => (
              <option key={dest.slug} value={dest.slug}>
                {dest.name} ({dest.country})
              </option>
            ))}
          </select>
        </div>

        {/* Duration Days */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Trip Duration: {durationDays} Days
          </label>
          <input
            type="range"
            min={2}
            max={21}
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer mt-2"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Weekend (2d)</span>
            <span>1 Week (7d)</span>
            <span>3 Weeks (21d)</span>
          </div>
        </div>

        {/* Travelers */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Travelers: {travelers} {travelers === 1 ? "Solo" : "People"}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer mt-2"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>1 Solo</span>
            <span>2 Couple</span>
            <span>4 Family</span>
            <span>10 Group</span>
          </div>
        </div>

        {/* Travel Style Tier */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Travel Style
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(["budget", "comfort", "luxury"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setTravelTier(tier)}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  travelTier === tier
                    ? "bg-sky-500 text-white shadow-md font-black"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Itemized Cost Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Plane className="w-4 h-4 text-sky-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Flights</span>
          <span className="text-sm font-black font-mono">{sym}{(flightPerPax * travelers).toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Building2 className="w-4 h-4 text-indigo-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Hotels</span>
          <span className="text-sm font-black font-mono">{sym}{totalHotel.toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Sparkles className="w-4 h-4 text-emerald-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Food &amp; Dining</span>
          <span className="text-sm font-black font-mono">{sym}{totalFood.toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Calendar className="w-4 h-4 text-amber-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Activities</span>
          <span className="text-sm font-black font-mono">{sym}{totalActivities.toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Wifi className="w-4 h-4 text-purple-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">eSIM Data</span>
          <span className="text-sm font-black font-mono">{sym}{esimTotal.toLocaleString()}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Shield className="w-4 h-4 text-rose-500 mx-auto" />
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Insurance</span>
          <span className="text-sm font-black font-mono">{sym}{insuranceTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Direct Booking Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Real-time price checks via Aviasales, Booking.com, and Airalo</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <a
            href={getAviasalesFlightUrl(guide.name)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Search Flights on Aviasales</span>
          </a>

          <a
            href={getBookingHotelUrl(guide.name)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Book Hotels on Booking.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
