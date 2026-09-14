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

interface Destination {
  city: string;
  country: string;
  image: string;
  flightPrice: string;
  hotelPrice: string;
  topAttraction: string;
  flightUrl: string;
  klookUrl: string;
  tag: string;
}

const DESTINATIONS: Destination[] = [
  {
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    flightPrice: "from $489",
    hotelPrice: "from $65/night",
    topAttraction: "teamLab & Shibuya Sky Pass",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com%2Fen-US%2Fcity%2F28-tokyo-things-to-do%2F",
    tag: "MOST POPULAR",
  },
  {
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    flightPrice: "from $399",
    hotelPrice: "from $85/night",
    topAttraction: "Louvre Priority & Eiffel Tower",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fparis-attractions-c66746%2F",
    tag: "ROMANTIC GETAWAY",
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    flightPrice: "from $420",
    hotelPrice: "from $90/night",
    topAttraction: "Tower of London & Crown Jewels",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Flondon-attractions-c67458%2F",
    tag: "HISTORIC SIGHTS",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    flightPrice: "from $380",
    hotelPrice: "from $75/night",
    topAttraction: "Burj Khalifa & Desert Safari",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com%2Fen-US%2Fcity%2F115-dubai-things-to-do%2F",
    tag: "LUXURY & SUNSHINE",
  },
  {
    city: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    flightPrice: "from $510",
    hotelPrice: "from $35/night",
    topAttraction: "Ubud Waterfalls & Temple Tours",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com%2Fen-US%2Fcity%2F98-bali-things-to-do%2F",
    tag: "TROPICAL ESCAPE",
  },
  {
    city: "New York",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80",
    flightPrice: "from $280",
    hotelPrice: "from $110/night",
    topAttraction: "Summit One Vanderbilt & Broadway",
    flightUrl: "https://aviasales.tpo.li/ZeF7BjUt",
    klookUrl: "https://gocity.tpo.li/rDzH4JAW",
    tag: "CITY BREAK",
  },
];

export default function TrendingDestinations() {
  const handleClick = (dest: Destination, type: "flight" | "tours") => {
    trackTravelpayoutsClick(type === "flight" ? "aviasales" : "klook", {
      city: dest.city,
      country: dest.country,
      action: `TRENDING_DESTINATION_${type.toUpperCase()}`,
    });
    window.open(type === "flight" ? dest.flightUrl : dest.klookUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="my-14 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-400" />
              Top Global Destinations
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            Trending Holiday &amp; Weekend Getaways
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Compare discounted flight routes, verified boutique stays, and instant mobile attraction tickets.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 relative z-10">
        {DESTINATIONS.map((dest, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between"
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
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    {dest.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                    <Plane className="w-3 h-3 text-sky-400" /> Flights
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">{dest.flightPrice}</div>
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-emerald-400" /> Hotels
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">{dest.hotelPrice}</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="line-clamp-1 font-medium">{dest.topAttraction}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleClick(dest, "flight")}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <Plane className="w-3 h-3" />
                  <span>Flights</span>
                </button>

                <button
                  onClick={() => handleClick(dest, "tours")}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all hover:scale-[1.02]"
                >
                  <Ticket className="w-3 h-3" />
                  <span>Tours &amp; Passes</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
