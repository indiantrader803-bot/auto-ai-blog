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
  ArrowRight,
} from "lucide-react";
import { getSailyEsimUrl } from "@/lib/affiliate/links";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";
import { useTravelCurrency } from "@/context/TravelCurrencyContext";

interface EsimPackage {
  id: string;
  country: string;
  flag: string;
  region: string;
  dataOptions: { data: string; days: string; price: number }[];
  operator: string;
  provider: "saily" | "drimsim";
  affiliateUrl: string;
  popular?: boolean;
}

const ESIM_PACKAGES: EsimPackage[] = [
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    region: "North America",
    operator: "T-Mobile / AT&T 5G",
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.99 },
      { data: "10 GB", days: "30 Days", price: 22.99 },
      { data: "20 GB", days: "30 Days", price: 36.99 },
    ],
    provider: "saily",
    affiliateUrl: getSailyEsimUrl("united-states"),
  },
  {
    id: "europe",
    country: "Europe (39 Countries)",
    flag: "🇪🇺",
    region: "Europe",
    operator: "Vodafone / Orange 5G",
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 4.49 },
      { data: "3 GB", days: "30 Days", price: 9.99 },
      { data: "5 GB", days: "30 Days", price: 15.49 },
      { data: "10 GB", days: "30 Days", price: 24.99 },
    ],
    provider: "saily",
    affiliateUrl: getSailyEsimUrl("europe"),
  },
  {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    operator: "SoftBank / NTT Docomo 5G",
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.99 },
      { data: "5 GB", days: "30 Days", price: 13.99 },
      { data: "10 GB", days: "30 Days", price: 21.99 },
    ],
    provider: "saily",
    affiliateUrl: getSailyEsimUrl("japan"),
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    operator: "EE / O2 UK 5G",
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 3.99 },
      { data: "3 GB", days: "30 Days", price: 8.49 },
      { data: "10 GB", days: "30 Days", price: 19.99 },
    ],
    provider: "saily",
    affiliateUrl: getSailyEsimUrl("united-kingdom"),
  },
  {
    id: "thailand",
    country: "Thailand",
    flag: "🇹🇭",
    region: "Asia",
    operator: "dtac / AIS 5G",
    dataOptions: [
      { data: "15 GB", days: "8 Days", price: 5.99 },
      { data: "30 GB", days: "15 Days", price: 9.99 },
      { data: "Unlimited", days: "10 Days", price: 19.99 },
    ],
    provider: "saily",
    affiliateUrl: getSailyEsimUrl("thailand"),
  },
  {
    id: "global",
    country: "Global (130+ Countries)",
    flag: "🌐",
    region: "Worldwide",
    operator: "Multi-Carrier Local Roaming",
    popular: true,
    dataOptions: [
      { data: "1 GB", days: "7 Days", price: 7.99 },
      { data: "3 GB", days: "15 Days", price: 21.99 },
      { data: "5 GB", days: "30 Days", price: 32.99 },
    ],
    provider: "drimsim",
    affiliateUrl: "https://drimsim.tpo.li/UyiqPwB5",
  },
];

export default function EsimBookingSection() {
  const { currency, formatPrice } = useTravelCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("usa");

  const filteredPacks = ESIM_PACKAGES.filter((p) =>
    p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePack = ESIM_PACKAGES.find((p) => p.id === selectedCountryId) || ESIM_PACKAGES[0];

  const handleBuyEsim = (pkg: EsimPackage, option: { data: string; price: number }) => {
    trackTravelpayoutsClick(pkg.provider, {
      country: pkg.country,
      data: option.data,
      price: option.price,
      action: "ESIM_BUY_CLICK",
    });

    const directAffUrl = pkg.provider === "saily" ? getSailyEsimUrl(pkg.country) : pkg.affiliateUrl;
    window.open(directAffUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-sans transition-colors">
      {/* Top Banner (Matching user screenshot 3: Airalo / Saily Banner) */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 sm:p-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
              Local, regional and global eSIMs for travellers
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Stay connected, wherever you travel, at affordable rates • 1-Minute instant QR activation
            </p>
          </div>

          {/* Airalo / Saily Brand Mark */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <Wifi className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-black tracking-wide text-slate-800 dark:text-slate-200">
              Saily &amp; Airalo Partners
            </span>
          </div>
        </div>

        {/* Search Data Packs for 200+ Countries */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search data packs for 200+ countries and regions (e.g., Japan, Europe, USA...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all font-medium shadow-sm"
            />
          </div>

          <a
            href={getSailyEsimUrl(searchQuery || "global")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => trackTravelpayoutsClick("saily", { query: searchQuery })}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#f2685f] hover:bg-[#e0564d] text-white font-black text-sm uppercase tracking-wider shadow-md shadow-rose-500/25 transition-all hover:scale-105 active:scale-95 text-center shrink-0 cursor-pointer"
          >
            Search
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-8 bg-slate-50/50 dark:bg-slate-950/90 text-slate-900 dark:text-white transition-colors">
        {/* Country Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {filteredPacks.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedCountryId(pkg.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedCountryId === pkg.id
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20 scale-105"
                  : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              }`}
            >
              <span className="text-base">{pkg.flag}</span>
              <span>{pkg.country}</span>
              {pkg.popular && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black uppercase">
                  Popular
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selected Country Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activePack.dataOptions.map((opt, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-rose-500/10 group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{opt.data}</span>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {opt.days}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-4 font-medium">
                  <Smartphone className="w-3.5 h-3.5 text-rose-500" />
                  <span>{activePack.operator}</span>
                </div>

                <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 mb-5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Instant QR Email Delivery</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Keep WhatsApp Number</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>No Roaming Charges</span>
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
                  <span>Activate eSIM</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Step Activation Guide */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              1
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Choose Your Destination</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Select country data package</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              2
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Scan Instant QR Code</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Delivered to email in 60 seconds</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              3
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Connect on Landing</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Instant local 5G/4G connectivity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
