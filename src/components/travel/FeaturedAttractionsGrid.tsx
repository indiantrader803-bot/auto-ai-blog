"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Ticket,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";
import { useTravelCurrency } from "@/context/TravelCurrencyContext";

interface AttractionItem {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
  currency: string;
  provider: "klook" | "tiqets" | "gocity" | "kkday";
  affiliateUrl: string;
  badge?: string;
  hasCalendar?: boolean;
}

const FEATURED_ATTRACTIONS: AttractionItem[] = [
  {
    id: "kkday-universal-studios-japan",
    title: "Universal Studios Japan Studio Pass & Express Pass",
    location: "Osaka, Japan",
    category: "Theme Park & Pass",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "88,230",
    price: 54.00,
    originalPrice: 65.00,
    currency: "US$",
    provider: "kkday",
    affiliateUrl: "https://kkday.tpo.li/VtERguRB",
    badge: "KKDAY EXCLUSIVE",
  },
  {
    id: "kkday-taipei-101",
    title: "Taipei 101 Observatory Skip-The-Line Fast Track Pass",
    location: "Taipei, Taiwan",
    category: "Observation Deck",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "45,190",
    price: 18.50,
    originalPrice: 22.00,
    currency: "US$",
    provider: "kkday",
    affiliateUrl: "https://kkday.tpo.li/VtERguRB",
    badge: "INSTANT VOUCHER",
  },
  {
    id: "eaton-hk-buffet",
    title: "Eaton HK Buffet | The Astor Lunch & Dinner Buffet",
    location: "Hong Kong",
    category: "Dining & Gourmet",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    rating: 4.4,
    reviews: "4,780",
    price: 37.30,
    originalPrice: 58.65,
    currency: "US$",
    provider: "klook",
    affiliateUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F24933-the-astor-eaton-hk-buffet%2F",
    badge: "SAVE 36%",
  },
  {
    id: "hk-airport-express",
    title: "Hong Kong Airport Express QR Code Ticket",
    location: "Hong Kong",
    category: "Airport Transfer",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "353,766",
    price: 6.55,
    originalPrice: 9.30,
    currency: "US$",
    provider: "klook",
    affiliateUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F71-airport-express-hong-kong%2F",
    badge: "BESTSELLER",
  },
  {
    id: "hk-disneyland",
    title: "Hong Kong Disneyland Park Ticket (1-Day / 2-Day Pass)",
    location: "Hong Kong",
    category: "Theme Park",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "191,651",
    price: 76.69,
    originalPrice: 76.69,
    currency: "US$",
    provider: "klook",
    affiliateUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F39-hong-kong-disneyland-ticket%2F",
    badge: "INSTANT QR PASS",
  },
  {
    id: "tower-of-london",
    title: "Tower of London & Crown Jewels Exhibition: Entry Ticket",
    location: "London, UK",
    category: "Historic Landmark",
    image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: "4,504",
    price: 49.97,
    currency: "$",
    provider: "tiqets",
    affiliateUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Flondon-attractions-c67458%2Ftickets-for-tower-of-london-p973950%2F",
    badge: "SKIP THE LINE",
    hasCalendar: true,
  },
  {
    id: "tokyo-teamlab",
    title: "teamLab Planets TOKYO Digital Art Museum Pass",
    location: "Tokyo, Japan",
    category: "Immersive Art",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "128,400",
    price: 26.50,
    originalPrice: 32.00,
    currency: "US$",
    provider: "klook",
    affiliateUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F16261-teamlab-planets-toyosu-tokyo%2F",
    badge: "TOP RATED",
  },
  {
    id: "louvre-museum",
    title: "Paris Louvre Museum Priority Reserved Access Ticket",
    location: "Paris, France",
    category: "Museum Pass",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "82,190",
    price: 24.90,
    currency: "€",
    provider: "tiqets",
    affiliateUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fparis-attractions-c66746%2Ftickets-for-louvre-museum-timed-entrance-p974868%2F",
    badge: "MOBILE TICKET",
    hasCalendar: true,
  },
  {
    id: "burj-khalifa",
    title: "Burj Khalifa 124th & 125th Floor Observation Deck",
    location: "Dubai, UAE",
    category: "Observation Deck",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: "210,000",
    price: 48.50,
    currency: "US$",
    provider: "klook",
    affiliateUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F1445-burj-khalifa-observation-deck-dubai%2F",
    badge: "FAST TRACK",
  },
  {
    id: "sagrada-familia",
    title: "Sagrada Família Fast Track Ticket with Audio Guide",
    location: "Barcelona, Spain",
    category: "Architecture & Culture",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: "96,400",
    price: 33.80,
    currency: "€",
    provider: "tiqets",
    affiliateUrl: "https://tp.media/r?campaign_id=89&marker=777349&p=3984&trs=573790&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fbarcelona-attractions-c66743%2Ftickets-for-sagrada-familia-fast-track-p916053%2F",
    badge: "AUDIO GUIDE INCLUDED",
  },
];

export default function FeaturedAttractionsGrid() {
  const { currency, formatPrice } = useTravelCurrency();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number>(14);

  const filteredItems = FEATURED_ATTRACTIONS.filter((item) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "KLOOK") return item.provider === "klook";
    if (activeFilter === "KKDAY") return item.provider === "kkday";
    if (activeFilter === "TIQETS") return item.provider === "tiqets";
    if (activeFilter === "ASIA") return item.location.includes("Hong Kong") || item.location.includes("Tokyo") || item.location.includes("Osaka") || item.location.includes("Taipei");
    if (activeFilter === "EUROPE") return item.location.includes("London") || item.location.includes("Paris") || item.location.includes("Barcelona");
    return true;
  });

  const handleBookNow = (item: AttractionItem) => {
    trackTravelpayoutsClick(item.provider, {
      attractionId: item.id,
      title: item.title,
      price: item.price,
      location: item.location,
    });
    window.open(item.affiliateUrl, "_blank", "noopener,noreferrer");
  };

  const calendarDays = [
    { day: "Mon", date: 31, inactive: true },
    { day: "Tue", date: 1 },
    { day: "Wed", date: 2 },
    { day: "Thu", date: 3 },
    { day: "Fri", date: 4 },
    { day: "Sat", date: 5 },
    { day: "Sun", date: 6 },
    { day: "Mon", date: 7 },
    { day: "Tue", date: 8 },
    { day: "Wed", date: 9 },
    { day: "Thu", date: 10 },
    { day: "Fri", date: 11 },
    { day: "Sat", date: 12 },
    { day: "Sun", date: 13 },
    { day: "Mon", date: 14, selected: true },
    { day: "Tue", date: 15 },
    { day: "Wed", date: 16 },
    { day: "Thu", date: 17 },
    { day: "Fri", date: 18 },
    { day: "Sat", date: 19 },
    { day: "Sun", date: 20 },
  ];

  return (
    <section className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-10 text-slate-900 dark:text-white shadow-2xl relative overflow-hidden font-sans transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />
              Verified Partners (KKday, Klook &amp; Tiqets)
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% Official Mobile Vouchers
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
            Popular Experiences, Tours &amp; Skip-The-Line Tickets
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Book top-rated theme park passes, museum admissions, and day tours with instant mobile QR delivery and free cancellation.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "ALL", label: "🔥 Top Trending" },
            { id: "KKDAY", label: "✨ KKday Passes" },
            { id: "KLOOK", label: "🎟️ Klook Deals" },
            { id: "TIQETS", label: "🏛️ Tiqets Passes" },
            { id: "ASIA", label: "🏯 Asia & Japan" },
            { id: "EUROPE", label: "🏰 Europe & UK" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === btn.id
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 relative z-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
          >
            {/* Top Media / Thumbnail */}
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white font-black text-[9px] uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/70 backdrop-blur-sm text-slate-200 font-bold text-[10px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <span>{item.location}</span>
                </div>

                {/* Rating Badge */}
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white font-black text-[10px] flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                    {item.rating}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    ({item.reviews} Reviews)
                  </span>
                </div>

                {/* Mini Calendar Preview if item has calendar (Tower of London) */}
                {item.hasCalendar && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <ChevronLeft className="w-3 h-3 text-slate-400 cursor-pointer" />
                      <span>September 2026</span>
                      <ChevronRight className="w-3 h-3 text-slate-400 cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                        <div key={idx} className="text-slate-400">{d}</div>
                      ))}
                      {calendarDays.slice(0, 14).map((c, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedCalendarDate(c.date)}
                          className={`py-0.5 rounded cursor-pointer transition-colors ${
                            c.inactive
                              ? "text-slate-300 dark:text-slate-600"
                              : c.date === selectedCalendarDate
                              ? "bg-amber-500 text-white font-black"
                              : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {c.date}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price & CTA Footer */}
            <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                    {formatPrice(item.price, "USD")}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(item.originalPrice, "USD")}
                    </span>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 block -mt-0.5">Instant confirmation</span>
              </div>

              <button
                onClick={() => handleBookNow(item)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Book</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* "See More" Button */}
      <div className="mt-8 flex justify-center relative z-10">
        <a
          href="https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={() => trackTravelpayoutsClick("klook", { action: "SEE_MORE_ACTIVITIES" })}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <span>See More 500,000+ Activities &amp; Passes</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
