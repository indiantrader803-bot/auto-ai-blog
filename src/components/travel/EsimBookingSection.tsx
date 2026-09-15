"use client";

import { useState } from "react";
import {
  Wifi,
  Search,
  Zap,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ExternalLink,
  Signal,
  Radio,
  Share2,
  Lock,
} from "lucide-react";
import { getSailyEsimUrl } from "@/lib/affiliate/links";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";
import { useTravelCurrency } from "@/context/TravelCurrencyContext";

export type EsimScope = "local" | "regional" | "global";

export interface EsimPackage {
  id: string;
  scope: EsimScope;
  country: string;
  flag: string;
  region: string;
  operators: string[];
  primarySpeed: string;
  hotspotSupported: boolean;
  dataOptions: { data: string; days: string; price: number }[];
  provider: "saily" | "drimsim";
  popular?: boolean;
}

const ESIM_CATALOG: EsimPackage[] = [
  // 📍 LOCAL ESIMS (Country Specific with Tier-1 Local Mobile Operators)
  {
    id: "uae",
    scope: "local",
    country: "United Arab Emirates (Dubai)",
    flag: "🇦🇪",
    region: "Middle East",
    operators: ["du 5G", "Etisalat by e& 5G"],
    primarySpeed: "5G Ultra Capacity",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.99 },
      { data: "5 GB", days: "30 Days", price: 13.99 },
      { data: "10 GB", days: "30 Days", price: 22.99 },
      { data: "20 GB", days: "30 Days", price: 35.99 },
    ],
    provider: "saily",
  },
  {
    id: "japan",
    scope: "local",
    country: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    operators: ["SoftBank 5G", "NTT Docomo 5G", "KDDI au"],
    primarySpeed: "5G High-Speed",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.49 },
      { data: "5 GB", days: "30 Days", price: 12.99 },
      { data: "10 GB", days: "30 Days", price: 20.99 },
      { data: "20 GB", days: "30 Days", price: 33.99 },
    ],
    provider: "saily",
  },
  {
    id: "india",
    scope: "local",
    country: "India (Delhi, Goa, Kerala, Manali)",
    flag: "🇮🇳",
    region: "South Asia",
    operators: ["Jio True 5G", "Airtel 5G Plus"],
    primarySpeed: "5G Nationwide",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.49 },
      { data: "3 GB", days: "30 Days", price: 7.99 },
      { data: "5 GB", days: "30 Days", price: 11.99 },
      { data: "10 GB", days: "30 Days", price: 18.99 },
      { data: "20 GB", days: "30 Days", price: 29.99 },
    ],
    provider: "saily",
  },
  {
    id: "usa",
    scope: "local",
    country: "United States",
    flag: "🇺🇸",
    region: "North America",
    operators: ["T-Mobile 5G UC", "AT&T 5G+", "Verizon 5G"],
    primarySpeed: "5G Ultra Wideband",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.99 },
      { data: "5 GB", days: "30 Days", price: 13.99 },
      { data: "10 GB", days: "30 Days", price: 22.99 },
      { data: "20 GB", days: "30 Days", price: 36.99 },
    ],
    provider: "saily",
  },
  {
    id: "uk",
    scope: "local",
    country: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    operators: ["EE 5G", "O2 UK", "Vodafone UK"],
    primarySpeed: "5G / 4G LTE",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.49 },
      { data: "5 GB", days: "30 Days", price: 12.49 },
      { data: "10 GB", days: "30 Days", price: 19.99 },
      { data: "20 GB", days: "30 Days", price: 32.99 },
    ],
    provider: "saily",
  },
  {
    id: "france",
    scope: "local",
    country: "France (Paris, Nice)",
    flag: "🇫🇷",
    region: "Europe",
    operators: ["Orange France 5G", "SFR 5G", "Bouygues Telecom"],
    primarySpeed: "5G Ultra Fast",
    hotspotSupported: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.49 },
      { data: "5 GB", days: "30 Days", price: 12.99 },
      { data: "10 GB", days: "30 Days", price: 20.49 },
    ],
    provider: "saily",
  },
  {
    id: "thailand",
    scope: "local",
    country: "Thailand (Bangkok, Phuket)",
    flag: "🇹🇭",
    region: "Southeast Asia",
    operators: ["AIS 5G", "TrueMove H 5G", "dtac"],
    primarySpeed: "5G Max Speed",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "15 GB", days: "8 Days", price: 5.99 },
      { data: "30 GB", days: "15 Days", price: 9.99 },
      { data: "50 GB", days: "10 Days", price: 14.99 },
      { data: "Unlimited", days: "15 Days", price: 19.99 },
    ],
    provider: "saily",
  },
  {
    id: "indonesia",
    scope: "local",
    country: "Indonesia (Bali)",
    flag: "🇮🇩",
    region: "Southeast Asia",
    operators: ["Telkomsel 5G", "Indosat Ooredoo Hutchison", "XL Axiata"],
    primarySpeed: "5G / 4G LTE",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.49 },
      { data: "5 GB", days: "30 Days", price: 12.49 },
      { data: "10 GB", days: "30 Days", price: 19.99 },
    ],
    provider: "saily",
  },
  {
    id: "switzerland",
    scope: "local",
    country: "Switzerland (Zurich, Alps)",
    flag: "🇨🇭",
    region: "Europe",
    operators: ["Swisscom 5G", "Sunrise 5G", "Salt"],
    primarySpeed: "5G Alpine Ultra",
    hotspotSupported: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 4.49 },
      { data: "3 GB", days: "30 Days", price: 9.49 },
      { data: "5 GB", days: "30 Days", price: 14.49 },
      { data: "10 GB", days: "30 Days", price: 23.99 },
    ],
    provider: "saily",
  },
  {
    id: "maldives",
    scope: "local",
    country: "Maldives (Male & Atolls)",
    flag: "🇲🇻",
    region: "South Asia",
    operators: ["Dhiraagu 4G/5G", "Ooredoo Maldives 5G"],
    primarySpeed: "4G LTE / 5G Island Coverage",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 5.99 },
      { data: "3 GB", days: "30 Days", price: 14.99 },
      { data: "5 GB", days: "30 Days", price: 22.99 },
      { data: "10 GB", days: "30 Days", price: 38.99 },
    ],
    provider: "saily",
  },
  {
    id: "singapore",
    scope: "local",
    country: "Singapore",
    flag: "🇸🇬",
    region: "Southeast Asia",
    operators: ["Singtel 5G", "StarHub 5G", "M1"],
    primarySpeed: "5G Standalone",
    hotspotSupported: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.49 },
      { data: "3 GB", days: "30 Days", price: 7.99 },
      { data: "5 GB", days: "30 Days", price: 11.99 },
      { data: "10 GB", days: "30 Days", price: 18.99 },
    ],
    provider: "saily",
  },
  {
    id: "vietnam",
    scope: "local",
    country: "Vietnam (Hanoi, Da Nang)",
    flag: "🇻🇳",
    region: "Southeast Asia",
    operators: ["Viettel 5G", "Vinaphone", "Mobifone"],
    primarySpeed: "5G / 4G LTE",
    hotspotSupported: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.49 },
      { data: "3 GB", days: "30 Days", price: 7.49 },
      { data: "5 GB", days: "30 Days", price: 11.49 },
      { data: "10 GB", days: "30 Days", price: 17.99 },
    ],
    provider: "saily",
  },

  // 🌍 REGIONAL ESIMS (Multi-Country Roaming with Auto-Network Switching)
  {
    id: "europe_region",
    scope: "regional",
    country: "Europe (39 Countries)",
    flag: "🇪🇺",
    region: "European Union & Schengen",
    operators: ["Vodafone 5G", "Orange", "Deutsche Telekom", "Telefónica"],
    primarySpeed: "5G Seamless Borderless",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 4.49 },
      { data: "3 GB", days: "30 Days", price: 9.99 },
      { data: "5 GB", days: "30 Days", price: 15.49 },
      { data: "10 GB", days: "30 Days", price: 24.99 },
      { data: "20 GB", days: "30 Days", price: 39.99 },
    ],
    provider: "saily",
  },
  {
    id: "asia_region",
    scope: "regional",
    country: "Asia Pacific (18 Countries)",
    flag: "🌏",
    region: "Asia Pacific",
    operators: ["SoftBank", "Singtel", "AIS", "Chunghwa", "SK Telecom"],
    primarySpeed: "5G / 4G LTE Cross-Border",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 4.99 },
      { data: "3 GB", days: "30 Days", price: 11.99 },
      { data: "5 GB", days: "30 Days", price: 17.99 },
      { data: "10 GB", days: "30 Days", price: 27.99 },
    ],
    provider: "saily",
  },
  {
    id: "north_america",
    scope: "regional",
    country: "North America (USA, Canada, Mexico)",
    flag: "🌎",
    region: "North America",
    operators: ["T-Mobile 5G", "Bell Mobility", "Telcel 5G"],
    primarySpeed: "5G Multi-Carrier",
    hotspotSupported: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 4.99 },
      { data: "3 GB", days: "30 Days", price: 11.49 },
      { data: "5 GB", days: "30 Days", price: 16.99 },
      { data: "10 GB", days: "30 Days", price: 26.99 },
    ],
    provider: "saily",
  },
  {
    id: "middle_east",
    scope: "regional",
    country: "Middle East & GCC (UAE, Saudi, Qatar, Oman)",
    flag: "🕌",
    region: "Middle East",
    operators: ["du", "STC 5G", "Ooredoo", "Zain 5G"],
    primarySpeed: "5G Ultra Capacity",
    hotspotSupported: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 5.49 },
      { data: "3 GB", days: "30 Days", price: 12.99 },
      { data: "5 GB", days: "30 Days", price: 19.99 },
      { data: "10 GB", days: "30 Days", price: 32.99 },
    ],
    provider: "saily",
  },

  // 🌐 GLOBAL ESIMS (130+ Countries Worldwide Unlimited & Multi-Operator)
  {
    id: "global_130",
    scope: "global",
    country: "Global Explorer Pass (130+ Countries)",
    flag: "🌐",
    region: "Worldwide",
    operators: ["Tier-1 Local Direct Carrier Agreement in Each Country"],
    primarySpeed: "Global 5G / 4G Auto-Switching",
    hotspotSupported: true,
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 6.99 },
      { data: "3 GB", days: "15 Days", price: 18.99 },
      { data: "5 GB", days: "30 Days", price: 28.99 },
      { data: "10 GB", days: "30 Days", price: 48.99 },
      { data: "20 GB", days: "60 Days", price: 79.99 },
    ],
    provider: "saily",
  },
  {
    id: "drimsim_payg",
    scope: "global",
    country: "Drimsim Universal Pay-As-You-Go (197 Countries)",
    flag: "🗺️",
    region: "Worldwide",
    operators: ["Direct Local Telecom Billing • No Expiration on Funds"],
    primarySpeed: "Real-Time Balance & Local Rates",
    hotspotSupported: true,
    dataOptions: [
      { data: "Pay As You Go", days: "Unlimited Validity", price: 10.0 },
      { data: "€25 Credit Pack", days: "Never Expires", price: 25.0 },
      { data: "€50 VIP Top-Up", days: "Never Expires", price: 50.0 },
    ],
    provider: "drimsim",
  },
];

export default function EsimBookingSection() {
  const { currency, formatPrice } = useTravelCurrency();
  const [activeScope, setActiveScope] = useState<EsimScope>("local");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("uae");

  // Filter packages based on active tab and search query
  const scopedPacks = ESIM_CATALOG.filter((p) => p.scope === activeScope);
  const filteredPacks = ESIM_CATALOG.filter((p) => {
    const matchesSearch =
      p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.operators.some((op) => op.toLowerCase().includes(searchQuery.toLowerCase()));

    if (searchQuery.trim().length > 0) {
      return matchesSearch;
    }
    return p.scope === activeScope;
  });

  const activePack =
    ESIM_CATALOG.find((p) => p.id === selectedCountryId) ||
    filteredPacks[0] ||
    ESIM_CATALOG[0];

  const handleBuyEsim = (pkg: EsimPackage, option: { data: string; price: number }) => {
    trackTravelpayoutsClick(pkg.provider, {
      country: pkg.country,
      data: option.data,
      price: option.price,
      action: "ESIM_BUY_CLICK",
    });

    const directAffUrl =
      pkg.provider === "saily" ? getSailyEsimUrl(pkg.country) : "https://drimsim.tpo.li/UyiqPwB5";
    window.open(directAffUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-sans transition-colors">
      {/* 👑 Top Headline Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-400" />
                Zero Physical SIM Swap
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                1-Minute QR Activation
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-serif text-white tracking-tight">
              Local, regional and global eSIMs for travellers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Stay connected in 200+ countries with verified Tier-1 mobile networks at direct member rates.
            </p>
          </div>

          {/* Partner Trust Badge */}
          <div className="flex items-center gap-2.5 self-start md:self-auto bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Wifi className="w-4 h-4 text-rose-400" />
            <div className="text-left">
              <div className="text-[11px] font-black text-white leading-tight">Saily by Nord Security</div>
              <div className="text-[9px] text-emerald-400 font-bold">● 5G Multi-Carrier Certified</div>
            </div>
          </div>
        </div>

        {/* 🔍 Search Data Packs & Operators */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination country or operator (e.g., Dubai, Japan, T-Mobile, du, Jio 5G, Europe)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 dark:bg-slate-950/80 border border-white/20 dark:border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all font-medium shadow-inner"
            />
          </div>

          <a
            href={getSailyEsimUrl(searchQuery || activePack.country)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => trackTravelpayoutsClick("saily", { query: searchQuery })}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-500/30 transition-all hover:scale-105 active:scale-95 text-center shrink-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Search 5G Plans</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 🧭 Scope Switcher Tabs (Local, Regional, Global) */}
      <div className="bg-slate-100 dark:bg-slate-950 px-6 sm:px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => {
              setActiveScope("local");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScope === "local" && !searchQuery
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>📍 Local eSIMs</span>
            <span className="text-[10px] opacity-75 font-mono">(12)</span>
          </button>

          <button
            onClick={() => {
              setActiveScope("regional");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScope === "regional" && !searchQuery
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>🌍 Regional eSIMs</span>
            <span className="text-[10px] opacity-75 font-mono">(4)</span>
          </button>

          <button
            onClick={() => {
              setActiveScope("global");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScope === "global" && !searchQuery
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>🌐 Global eSIMs</span>
            <span className="text-[10px] opacity-75 font-mono">(2)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Signal className="w-3.5 h-3.5 text-emerald-500" />
          <span>Showing Live Network Operator Specs</span>
        </div>
      </div>

      {/* 📱 Main Content Area */}
      <div className="p-5 sm:p-8 bg-slate-50/50 dark:bg-slate-950/90 text-slate-900 dark:text-white transition-colors">
        {/* Country / Region Selector Carousel */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {filteredPacks.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedCountryId(pkg.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                activePack.id === pkg.id
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-500 shadow-lg shadow-rose-500/20 scale-105"
                  : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
              }`}
            >
              <span className="text-base">{pkg.flag}</span>
              <span>{pkg.country}</span>
              {pkg.popular && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black uppercase">
                  Top Deal
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 📶 Selected Destination Network & Operator Details Card */}
        <div className="mb-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-rose-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl">{activePack.flag}</span>
                <h4 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                  {activePack.country}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {activePack.primarySpeed}
                </span>
              </div>

              {/* Mobile Operators List */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-rose-500" />
                  Partner Mobile Operators:
                </span>
                {activePack.operators.map((op, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold shadow-xs"
                  >
                    📶 {op}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Feature Perks */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Hotspot / Tethering: {activePack.hotspotSupported ? "Allowed" : "No"}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <Lock className="w-3.5 h-3.5 text-rose-500" />
                <span>Dual-SIM: Keep WhatsApp Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* 💳 Available Data Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activePack.dataOptions.map((opt, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/60 p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-rose-500/10 group shadow-sm relative overflow-hidden"
            >
              {idx === 1 && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-pink-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{opt.data}</span>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                    {opt.days}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-4 font-medium">
                  <Signal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{activePack.operators[0] || "5G Local Network"}</span>
                </div>

                <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 mb-5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Instant QR Email Delivery (60s)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Keep Original Phone Number</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Zero Bill Shock Roaming Fees</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Price</span>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono">
                    {formatPrice(opt.price, "USD")}
                  </span>
                </div>

                <button
                  onClick={() => handleBuyEsim(activePack, opt)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Activate eSIM Plan</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Step Instant Setup Walkthrough */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              1
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Choose Your Destination</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Select local, regional, or global data pack</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              2
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Scan Instant QR Code</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Delivered to your email in 60 seconds</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              3
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Auto-Connect on Landing</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">High-speed 5G local network activated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
