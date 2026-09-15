"use client";

import { useState } from "react";
import {
  Plane,
  Building2,
  Compass,
  Car,
  Wifi,
  ShieldCheck,
  Calendar,
  Sparkles,
  MapPin,
  ArrowRight,
  ArrowRightLeft,
  Users,
  Search,
  CheckCircle2,
  Tag,
  Star,
} from "lucide-react";
import {
  getBookingHotelUrl,
  getAgodaHotelUrl,
  getAviasalesFlightUrl,
  getKlookUrl,
  getGetTransferUrl,
  getSailyEsimUrl,
  getEconomyBookingsUrl,
} from "@/lib/affiliate/links";

interface TabConfig {
  id: string;
  name: string;
  badge?: string;
  icon: any;
  tagline: string;
}

const TABS: TabConfig[] = [
  { id: "flights", name: "Flights", badge: "Low Fare Radar", icon: Plane, tagline: "Compare 1,000+ verified global airlines with 0% extra booking markup" },
  { id: "hotels", name: "Hotels & Resorts", badge: "Best Price Match", icon: Building2, tagline: "Exclusive rates on 2M+ hotels, luxury villas & boutique mountain stays" },
  { id: "treks", name: "Hiking & Expeditions", badge: "Curated Treks", icon: Compass, tagline: "Certified guided treks, national park passes & high-altitude adventures" },
  { id: "cars", name: "Car Rentals", icon: Car, tagline: "Compare Hertz, Avis, Sixt & top local car rentals with zero hidden credit card fees" },
  { id: "transfers", name: "VIP Transfers", badge: "Fixed Rate", icon: ArrowRightLeft, tagline: "Guaranteed private airport pickups & intercity luxury chauffeur service" },
  { id: "esim", name: "Global eSIM", badge: "Instant 5G", icon: Wifi, tagline: "Stay connected across 160+ countries without expensive roaming charges" },
];

const POPULAR_DESTINATIONS = [
  { name: "Kashmir Great Lakes", type: "Trek", query: "Kashmir Great Lakes Trek" },
  { name: "Everest Base Camp", type: "Expedition", query: "Everest Base Camp Trek Nepal" },
  { name: "Swiss Alps & Mont Blanc", type: "Alpine", query: "Tour du Mont Blanc Alps" },
  { name: "Bali & Nusa Penida", type: "Island", query: "Bali Indonesia" },
  { name: "Dubai & Desert Safari", type: "Luxury", query: "Dubai United Arab Emirates" },
  { name: "Tokyo & Mt Fuji", type: "Culture", query: "Tokyo Mount Fuji Japan" },
  { name: "Manali & Spiti Valley", type: "Highlands", query: "Manali Spiti Valley Himachal" },
  { name: "Patagonia W-Trek", type: "Wilderness", query: "Patagonia Torres del Paine" },
];

export default function InteractiveTravelBookingBar({
  className = "",
  title = "Smart Travel Search Engine",
}: {
  defaultTab?: string;
  className?: string;
  title?: string;
}) {
  const [activeTab, setActiveTab] = useState<string>("flights");
  const [origin, setOrigin] = useState<string>("New York (NYC)");
  const [destination, setDestination] = useState<string>("Geneva / Alps (GVA)");
  const [departDate, setDepartDate] = useState<string>("2026-09-20");
  const [returnDate, setReturnDate] = useState<string>("2026-09-28");
  const [travelers, setTravelers] = useState<string>("2 Adults, Economy");
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = () => {
    const queryDest = destination || "Manali";
    const queryOrigin = origin || "Delhi";
    
    // Parse adults count
    let adultsCount = 2;
    const paxMatch = travelers.match(/(\d+)/);
    if (paxMatch) adultsCount = parseInt(paxMatch[1], 10);

    if (activeTab === "flights") {
      const flightUrl = getAviasalesFlightUrl({
        origin: queryOrigin,
        destination: queryDest,
        departDate,
        returnDate: isRoundTrip ? returnDate : undefined,
        adults: adultsCount,
        isRoundTrip,
      });
      window.open(flightUrl, "_blank", "noopener,noreferrer");
    } else if (activeTab === "hotels") {
      const hotelUrl = getBookingHotelUrl({
        destination: queryDest,
        checkin: departDate,
        checkout: returnDate,
        adults: adultsCount,
        rooms: Math.ceil(adultsCount / 2),
      });
      window.open(hotelUrl, "_blank", "noopener,noreferrer");
    } else if (activeTab === "treks") {
      const trekUrl = getKlookUrl({
        destination: queryDest,
        query: `${queryDest} Trekking Adventure Pass`,
      });
      window.open(trekUrl, "_blank", "noopener,noreferrer");
    } else if (activeTab === "cars") {
      const carUrl = getEconomyBookingsUrl({
        location: queryDest,
        pickDate: departDate,
        dropDate: returnDate,
      });
      window.open(carUrl, "_blank", "noopener,noreferrer");
    } else if (activeTab === "transfers") {
      const transferUrl = getGetTransferUrl({
        from: queryOrigin,
        to: queryDest,
        date: departDate,
        passengers: adultsCount,
      });
      window.open(transferUrl, "_blank", "noopener,noreferrer");
    } else if (activeTab === "esim") {
      const esimUrl = getSailyEsimUrl(queryDest);
      window.open(esimUrl, "_blank", "noopener,noreferrer");
    }
  };

  const currentTabObj = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div
      className={`w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 text-slate-900 dark:text-white shadow-2xl relative overflow-hidden transition-all ${className}`}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500 dark:text-sky-400 animate-pulse" />
              Direct Live Engine
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Price Match & Zero Booking Fees
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            {currentTabObj.tagline}
          </p>
        </div>

        {/* Quick Trust Badges */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> 4.9/5 Rating
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-500" /> Instant Confirmation
          </span>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-none relative z-10">
        {TABS.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-slate-900 dark:bg-sky-500 text-white shadow-lg shadow-sky-500/20 scale-[1.02]"
                  : "bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? "text-sky-400 dark:text-white" : "text-slate-500 dark:text-slate-400"}`} />
              <span>{tab.name}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Bar Interactive Form */}
      <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/90 relative z-10">
        {activeTab === "flights" && (
          <div className="flex items-center gap-3 mb-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => setIsRoundTrip(true)}
              className={`px-2.5 py-1 rounded-md transition ${
                isRoundTrip
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-700 font-bold"
                  : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => setIsRoundTrip(false)}
              className={`px-2.5 py-1 rounded-md transition ${
                !isRoundTrip
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-700 font-bold"
                  : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              One Way
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin / Departure */}
          {activeTab !== "esim" && (
            <div className="md:col-span-3 relative">
              <label className="block text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
                {activeTab === "treks" ? "Trek Region / Base" : activeTab === "hotels" ? "City / Destination" : "Leaving From"}
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-sky-500 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder={activeTab === "hotels" ? "e.g. Zurich, Bali, Manali" : "e.g. New York, London, Delhi"}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

          {/* Swap Button (Flights & Transfers) */}
          {(activeTab === "flights" || activeTab === "transfers") && (
            <div className="hidden md:flex md:col-span-1 justify-center pt-4">
              <button
                type="button"
                onClick={swapLocations}
                title="Swap Locations"
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:border-sky-500 transition shadow-sm cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Destination / Going to */}
          <div className={`${activeTab === "esim" ? "md:col-span-5" : (activeTab === "flights" || activeTab === "transfers") ? "md:col-span-3" : "md:col-span-4"} relative`}>
            <label className="block text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
              {activeTab === "treks"
                ? "Trek Peak / Wilderness Trail"
                : activeTab === "esim"
                ? "Destination Country (160+ Supported)"
                : "Going To / Destination"}
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-emerald-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={
                  activeTab === "treks"
                    ? "e.g. Kashmir Lakes, Everest Base Camp"
                    : activeTab === "esim"
                    ? "e.g. Japan, Switzerland, USA, India"
                    : "e.g. Tokyo, Paris, Dubai, Srinagar"
                }
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Dates */}
          <div className={`${activeTab === "esim" ? "md:col-span-4" : "md:col-span-3"} relative`}>
            <label className="block text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
              {activeTab === "esim" ? "Travel Start Date" : "Travel Dates"}
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 pt-4">
            <button
              onClick={handleSearch}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-sky-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Now</span>
            </button>
          </div>
        </div>

        {/* Popular Destination Quick-Chips */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3 text-sky-500" /> Trending Routes:
          </span>
          {POPULAR_DESTINATIONS.slice(0, 6).map((dest) => (
            <button
              key={dest.name}
              type="button"
              onClick={() => {
                setDestination(dest.query);
                if (dest.type === "Trek" || dest.type === "Expedition" || dest.type === "Wilderness") {
                  setActiveTab("treks");
                }
              }}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition"
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Partner Integration Strip */}
      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Supported Network:</span>
          <span>Aviasales • Booking.com • Agoda • Klook • GetTransfer • EconomyBookings • Saily eSIM</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
