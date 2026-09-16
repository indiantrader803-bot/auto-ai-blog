"use client";

import { useState } from "react";
import {
  Play,
  Video,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  Plane,
  Building,
  Ticket,
  Car,
  Wifi,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Share2,
} from "lucide-react";
import {
  getAviasalesFlightUrl,
  getBookingHotelUrl,
  getKlookUrl,
  getKkdayUrl,
  getIntuiTransferUrl,
  getSailyEsimUrl,
} from "@/lib/affiliate/links";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";
import { useTravelCurrency } from "@/context/TravelCurrencyContext";

interface VideoGuide {
  id: string;
  destination: string;
  country: string;
  flag: string;
  title: string;
  youtubeId: string;
  duration: string;
  resolution: string;
  channel: string;
  description: string;
  flightCode: string;
  visaInfo: string;
  bestTime: string;
  dailyBudget: string;
  emergencyNumber: string;
  plugType: string;
  insiderTips: string[];
}

const VIDEO_GUIDES: VideoGuide[] = [
  {
    id: "dubai",
    destination: "Dubai & Desert Safari",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    title: "Dubai 4K Ultra HD Night & Luxury Walking Tour",
    youtubeId: "dyHWNcKGRAs",
    duration: "22 mins",
    resolution: "4K HDR 60fps",
    channel: "UinDubai 4K",
    description: "Explore Downtown Dubai, Burj Khalifa light shows, Dubai Marina yacht cruises, luxury desert dune safaris, and Bluewaters Island beach resorts.",
    flightCode: "DXB",
    visaInfo: "30-Day Visa on Arrival / E-Visa for most nationalities (Free / Instant).",
    bestTime: "November to March (Pleasant 24°C-28°C weather, perfect for desert safaris).",
    dailyBudget: "$95 - $280 / day (AED 350 - 1,000)",
    emergencyNumber: "999 (Police) / 998 (Ambulance)",
    plugType: "Type G (British standard 230V)",
    insiderTips: [
      "Buy Dubai Metro Nol Silver Card at DXB Airport to save 70% on taxi fares.",
      "Book Burj Khalifa tickets 2-3 weeks in advance to secure sunset time slots.",
      "Pre-order Saily 5G eSIM to avoid expensive airport mobile kiosks."
    ]
  },
  {
    id: "japan",
    destination: "Tokyo, Kyoto & Mt. Fuji",
    country: "Japan",
    flag: "🇯🇵",
    title: "Tokyo, Japan 4K HDR Walking Tour: Day & Night Views",
    youtubeId: "28ZjrtD_iL0",
    duration: "30 mins",
    resolution: "4K HDR 60fps",
    channel: "World Wanderings 4K",
    description: "Experience the vibrant streets of Shibuya, teamLab digital art, Arashiyama bamboo forest in Kyoto, and scenic Mt. Fuji Lake Kawaguchiko.",
    flightCode: "HND",
    visaInfo: "eVisa available online for most passports; 90-day visa exemption for US/EU/UK.",
    bestTime: "March-May (Cherry Blossoms) & October-November (Vibrant Autumn Foliage).",
    dailyBudget: "$65 - $190 / day (¥10,000 - ¥28,000)",
    emergencyNumber: "110 (Police) / 119 (Medical/Fire)",
    plugType: "Type A & B (100V 2-pin flat)",
    insiderTips: [
      "Download Suica or Pasmo on Apple/Google Wallet for seamless metro & 7-Eleven taps.",
      "Get a portable 5G eSIM active before landing for seamless Google Maps navigation in subways.",
      "Reserve Shinkansen bullet train luggage space in advance for oversized suitcases."
    ]
  },
  {
    id: "switzerland",
    destination: "Swiss Alps & Interlaken",
    country: "Switzerland",
    flag: "🇨🇭",
    title: "Switzerland 4K: Lauterbrunnen, Zermatt & Scenic Alps",
    youtubeId: "kVxTrhojpFI",
    duration: "25 mins",
    resolution: "4K 60fps",
    channel: "Scenic Relaxation 4K",
    description: "Witness the 72 cascading waterfalls of Lauterbrunnen Valley, Jungfraujoch Top of Europe, Lake Brienz emerald waters, and Matterhorn scenic trains.",
    flightCode: "ZRH",
    visaInfo: "Schengen Visa (Apply 3-4 weeks in advance) or 90-Day Visa-Free for Tier-1 passports.",
    bestTime: "June to September for alpine hiking; December to March for world-class skiing.",
    dailyBudget: "$120 - $350 / day (CHF 110 - 320)",
    emergencyNumber: "112 (General European Emergency) / 117 (Police)",
    plugType: "Type J (230V 3-pin recessed)",
    insiderTips: [
      "The Swiss Travel Pass gives unlimited train, bus, boat and museum access across Switzerland.",
      "Supermarkets like Coop and Migros have high-quality hot meals at 50% restaurant prices.",
      "Tap water from public fountains in Swiss towns is alpine mineral-quality and 100% free to drink."
    ]
  },
  {
    id: "manali",
    destination: "Manali & Solang Snow Valley",
    country: "India (Himachal Pradesh)",
    flag: "🇮🇳",
    title: "Manali 4K Travel Film: Snow Peaks, Atal Tunnel & Valleys",
    youtubeId: "o4bsfOUxJKU",
    duration: "15 mins",
    resolution: "4K Ultra HD",
    channel: "Mesmerizing Time 4K",
    description: "Complete adventure guide to Solang Valley snow sports, paragliding at 8,000ft, Atal Tunnel gateway to Lahaul, and rustic wooden cafes of Old Manali.",
    flightCode: "KUU",
    visaInfo: "Indian E-Visa (Online approval in 24-72 hours) / Native Travel unrestricted.",
    bestTime: "October-February for heavy snowfall; April-June for pleasant mountain weather.",
    dailyBudget: "₹2,500 - ₹8,000 / day ($30 - $95)",
    emergencyNumber: "112 (All Emergency) / 100 (Police)",
    plugType: "Type C, D, M (230V 50Hz)",
    insiderTips: [
      "Rohtang Pass permits are mandatory and limited to 800 petrol / 400 diesel vehicles daily—book 3 days early.",
      "Stay in Old Manali near Clubhouse road for walking access to bohemian cafes and pine forests.",
      "Pre-book heated 4x4 cabs for Atal Tunnel and Sissu winter excursions to prevent getting stuck in snow."
    ]
  },
  {
    id: "maldives",
    destination: "Maldives Luxury Overwater Villas",
    country: "Maldives",
    flag: "🇲🇻",
    title: "Maldives 4K Ocean Therapy: Turquoise Lagoons & Overwater Villas",
    youtubeId: "9kFRXbpvNME",
    duration: "20 mins",
    resolution: "4K HDR 60fps",
    channel: "One Blue Ocean 4K",
    description: "Crystal clear turquoise lagoons, coral reef snorkeling with sea turtles and manta rays, private infinity pool villas, and luxury speedboat transfers.",
    flightCode: "MLE",
    visaInfo: "30-Day Free Visa on Arrival for ALL nationalities with valid passport and hotel confirmation.",
    bestTime: "December to April (Dry northeast monsoon with calm seas and sunny skies).",
    dailyBudget: "$180 - $650 / day (Luxury Resort All-Inclusive)",
    emergencyNumber: "119 (Police) / 102 (Ambulance)",
    plugType: "Type G (British standard 230V)",
    insiderTips: [
      "Fill out the free IMUGA digital traveler declaration within 96 hours before arrival in Male.",
      "Speedboat transfers from Male Airport are up to 60% cheaper than seaplanes for nearby atolls.",
      "Book All-Inclusive meal plans to avoid heavy taxes on individual food & beverage orders."
    ]
  },
  {
    id: "bali",
    destination: "Bali, Ubud & Nusa Penida",
    country: "Indonesia",
    flag: "🇮🇩",
    title: "Bali Tropical Paradise 4K: Complete Travel Guide & Nusa Penida",
    youtubeId: "ZZp5kWJKDV4",
    duration: "18 mins",
    resolution: "4K 60fps",
    channel: "Tour Point 4K",
    description: "Explore the emerald Tegalalang rice terraces in Ubud, sacred sea temples of Uluwatu, Kelingking T-Rex cliff at Nusa Penida, and Seminyak beach clubs.",
    flightCode: "DPS",
    visaInfo: "30-Day Electronic Visa on Arrival (e-VOA) available online for 500,000 IDR (~$32).",
    bestTime: "April to October (Dry season with low humidity and optimal surf conditions).",
    dailyBudget: "$40 - $140 / day (IDR 600k - 2.2M)",
    emergencyNumber: "112 (General Emergency) / 110 (Police)",
    plugType: "Type C & F (230V Europlug)",
    insiderTips: [
      "Pay the mandatory Bali Tourist Tax (150,000 IDR) online before arrival to skip airport lines.",
      "Use Grab or Gojek apps for transparent taxi pricing instead of negotiating with street cabs.",
      "Book Nusa Penida fast boat tickets online in advance to secure morning departures."
    ]
  }
];

export default function CinematicTravelGuides() {
  const [selectedGuide, setSelectedGuide] = useState<VideoGuide>(VIDEO_GUIDES[0]);
  const [activeInfoTab, setActiveInfoTab] = useState<"video" | "intel" | "tips">("video");
  const { currency, formatPrice } = useTravelCurrency();

  const handleBooking = (type: string, url: string) => {
    trackTravelpayoutsClick(type, {
      destination: selectedGuide.destination,
      country: selectedGuide.country,
      source: "CINEMATIC_TRAVEL_VIDEOS_HUB",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-sans transition-colors">
      {/* 👑 Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-3 h-3 text-red-400" />
                4K Ultra HD Video Cinema
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                100% Verified Destination Intel
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-serif text-white tracking-tight">
              Cinematic 4K Travel Guides &amp; Verified Destination Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Watch official high-resolution walking tours and drone documentaries with synchronized one-click flight, hotel, pass, eSIM, and airport chauffeur booking.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shrink-0">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="text-[11px] font-black text-white leading-tight">6+ Global Destinations</div>
              <div className="text-[9px] text-emerald-400 font-bold">● Instant Partner Booking</div>
            </div>
          </div>
        </div>

        {/* 🧭 Destination Selector Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/10">
          {VIDEO_GUIDES.map((guide) => {
            const isSelected = guide.id === selectedGuide.id;
            return (
              <button
                key={guide.id}
                onClick={() => {
                  setSelectedGuide(guide);
                  setActiveInfoTab("video");
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-lg shadow-red-600/30 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                <span className="text-base">{guide.flag}</span>
                <span>{guide.destination.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🎬 Main Video & Intelligence Console */}
      <div className="p-4 sm:p-8 bg-slate-50 dark:bg-slate-950/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Main: Video Player Frame & Tab Views */}
          <div className="lg:col-span-8 space-y-4">
            {/* View Switcher Tabs (Video Player, Visa & Essentials, Insider Tips) */}
            <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button
                onClick={() => setActiveInfoTab("video")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeInfoTab === "video"
                    ? "bg-slate-900 dark:bg-slate-800 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Play className="w-3.5 h-3.5 text-red-500" />
                <span>4K Video Guide</span>
              </button>

              <button
                onClick={() => setActiveInfoTab("intel")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeInfoTab === "intel"
                    ? "bg-slate-900 dark:bg-slate-800 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Info className="w-3.5 h-3.5 text-sky-500" />
                <span>Visa &amp; Travel Facts</span>
              </button>

              <button
                onClick={() => setActiveInfoTab("tips")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeInfoTab === "tips"
                    ? "bg-slate-900 dark:bg-slate-800 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Insider Hacks</span>
              </button>
            </div>

            {/* Video Player Display */}
            {activeInfoTab === "video" && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedGuide.youtubeId}?rel=0&modestbranding=1`}
                  title={selectedGuide.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {/* Verified Visa & Travel Facts Display */}
            {activeInfoTab === "intel" && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-2xl">{selectedGuide.flag}</span>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white font-serif">
                      Essential Travel Facts: {selectedGuide.destination}
                    </h4>
                    <span className="text-xs text-slate-500">{selectedGuide.country}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Visa &amp; Entry Protocol
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedGuide.visaInfo}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      Best Season to Visit
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedGuide.bestTime}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-sky-500" />
                      Estimated Daily Budget
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-mono font-semibold">
                      {selectedGuide.dailyBudget}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      Emergency Dial &amp; Plugs
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Emergency: <span className="font-mono font-bold text-rose-500">{selectedGuide.emergencyNumber}</span> • Plug: {selectedGuide.plugType}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Insider Hacks Display */}
            {activeInfoTab === "tips" && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h4 className="text-base font-black text-slate-900 dark:text-white font-serif">
                    Local Insider Secrets &amp; Money-Saving Hacks
                  </h4>
                </div>

                <div className="space-y-3">
                  {selectedGuide.insiderTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">{selectedGuide.title}</span>
                <span>•</span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">{selectedGuide.resolution}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Duration: {selectedGuide.duration} • Channel: {selectedGuide.channel}
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Multi-Affiliate Quick Booking Stack */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedGuide.flag}</span>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                      Book Trip Components
                    </div>
                    <div className="text-sm font-bold text-white leading-tight">
                      {selectedGuide.destination}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Best Price
                </span>
              </div>

              {/* 1. Compare Cheap Flights (Aviasales) */}
              <button
                onClick={() =>
                  handleBooking(
                    "aviasales",
                    getAviasalesFlightUrl({
                      origin: "DEL",
                      destination: selectedGuide.flightCode,
                    })
                  )
                }
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-red-300 transition">
                      1,000+ Airline Flights
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Direct {selectedGuide.flightCode} Radar • 0% Markup
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5" />
              </button>

              {/* 2. Book Luxury Hotel (Booking.com) */}
              <button
                onClick={() =>
                  handleBooking(
                    "booking",
                    getBookingHotelUrl(selectedGuide.destination.split("&")[0].trim())
                  )
                }
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                      Verified Hotels &amp; Resorts
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Booking.com Member Rates &amp; Free Cancel
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5" />
              </button>

              {/* 3. Attraction Passes (Klook & KKday) */}
              <button
                onClick={() =>
                  handleBooking(
                    "klook",
                    getKlookUrl({
                      destination: selectedGuide.destination.split("&")[0].trim(),
                      query: "tickets passes attractions",
                    })
                  )
                }
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      Skip-The-Line Experience Passes
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Instant QR Vouchers • Klook &amp; KKday
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5" />
              </button>

              {/* 4. Airport VIP Chauffeur Transfer (Intui & GetTransfer) */}
              <button
                onClick={() =>
                  handleBooking(
                    "intui",
                    getIntuiTransferUrl({
                      from: `${selectedGuide.destination} Airport`,
                      to: "Hotel",
                    })
                  )
                }
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                      Airport Chauffeur &amp; Taxi
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Fixed Prices • Name-Sign Meet &amp; Greet
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5" />
              </button>

              {/* 5. 5G Instant eSIM Mobile Data (Saily) */}
              <button
                onClick={() =>
                  handleBooking("saily", getSailyEsimUrl(selectedGuide.country))
                }
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-rose-300 transition">
                      High-Speed 5G eSIM Data
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Saily by Nord Security • Zero SIM Swap
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
