"use client";

import {
  Plane,
  Building2,
  Ticket,
  MapPin,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Star,
} from "lucide-react";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";
import { useTravelCurrency } from "@/context/TravelCurrencyContext";

interface Destination {
  city: string;
  country: string;
  image: string;
  baseFlightUSD: number;
  baseHotelUSD: number;
  topAttraction: string;
  flightUrl: string;
  klookUrl: string;
  tag: string;
  slug: string;
}

const DESTINATIONS: Destination[] = [
  {
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    baseFlightUSD: 489,
    baseHotelUSD: 65,
    topAttraction: "teamLab & Shibuya Sky Pass",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com%2Fen-US%2Fcity%2F28-tokyo-things-to-do%2F",
    tag: "MOST POPULAR",
    slug: "japan",
  },
  {
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    baseFlightUSD: 399,
    baseHotelUSD: 85,
    topAttraction: "Louvre Priority & Eiffel Tower",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fparis-attractions-c66746%2F",
    tag: "ROMANTIC GETAWAY",
    slug: "paris",
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    baseFlightUSD: 420,
    baseHotelUSD: 90,
    topAttraction: "Tower of London & Crown Jewels",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Flondon-attractions-c67458%2F",
    tag: "HISTORIC SIGHTS",
    slug: "london",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    baseFlightUSD: 380,
    baseHotelUSD: 75,
    topAttraction: "Burj Khalifa & Desert Safari",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com%2Fen-US%2Fcity%2F115-dubai-things-to-do%2F",
    tag: "LUXURY & SUNSHINE",
    slug: "dubai",
  },
  {
    city: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    baseFlightUSD: 510,
    baseHotelUSD: 35,
    topAttraction: "Ubud Waterfalls & Temple Tours",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com%2Fen-US%2Fcity%2F98-bali-things-to-do%2F",
    tag: "TROPICAL ESCAPE",
    slug: "bali",
  },
  {
    city: "Manali",
    country: "India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80",
    baseFlightUSD: 140,
    baseHotelUSD: 30,
    topAttraction: "Solang Adventure & Atal Tunnel",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com",
    tag: "HIMALAYAN SNOW",
    slug: "manali",
  },
];

export default function TrendingDestinations() {
  const { currency, formatPrice } = useTravelCurrency();

  const handleClick = (dest: Destination, type: "flight" | "tours") => {
    trackTravelpayoutsClick(type === "flight" ? "aviasales" : "klook", {
      city: dest.city,
      country: dest.country,
      action: `TRENDING_${type.toUpperCase()}`,
    });
    window.open(type === "flight" ? dest.flightUrl : dest.klookUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-10 text-slate-900 dark:text-white shadow-2xl relative overflow-hidden font-sans transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500 dark:text-sky-400" />
              Global Destination Radar
            </span>
            <span className="text-[10px] text-slate-400 font-bold">
              AI Budget Packages ({currency})
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
            Trending Holiday Destinations &amp; Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Compare complete vacation bundles with cheap flights, handpicked luxury resorts, and verified skip-the-line attraction passes.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 relative z-10">
        {DESTINATIONS.map((dest, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={dest.image}
                alt={`${dest.city}, ${dest.country}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white font-black text-[9px] uppercase tracking-wider">
                {dest.tag}
              </span>
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-black text-white font-serif">{dest.city}</h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    {dest.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase flex items-center gap-1">
                    <Plane className="w-3 h-3 text-sky-500 dark:text-sky-400" /> Flights
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    from {formatPrice(dest.baseFlightUSD, "USD")}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> Hotels
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    from {formatPrice(dest.baseHotelUSD, "USD")}/nt
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/60 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="line-clamp-1 font-medium">{dest.topAttraction}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`/${dest.slug}`}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.01]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Explore {dest.city} AI Trip Basket →</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleClick(dest, "flight")}
                    className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-sky-300 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Flights</span>
                  </button>

                  <button
                    onClick={() => handleClick(dest, "tours")}
                    className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Tours</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
