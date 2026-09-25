import { Metadata } from "next";
import dynamic from "next/dynamic";
import TravelNavbar from "@/components/travel/TravelNavbar";
import TravelFooter from "@/components/travel/TravelFooter";
import SmartTravelAIAgentHero from "@/components/travel/SmartTravelAIAgentHero";
import InteractiveTravelBookingBar from "@/components/travel/InteractiveTravelBookingBar";
import TrendingDestinations from "@/components/travel/TrendingDestinations";
import MonetagBanner from "@/components/ads/MonetagBanner";
import { ShieldCheck, Mail, Sparkles, CheckCircle2 } from "lucide-react";

// Code splitting: Dynamic lazy loading for below-the-fold widgets
const AviasalesLiveFlightDeals = dynamic(() => import("@/components/travel/AviasalesLiveFlightDeals"), { ssr: true });
const AirportTransferBanner = dynamic(() => import("@/components/travel/AirportTransferBanner"), { ssr: true });
const FeaturedAttractionsGrid = dynamic(() => import("@/components/travel/FeaturedAttractionsGrid"), { ssr: true });
const CinematicTravelGuides = dynamic(() => import("@/components/travel/CinematicTravelGuides"), { ssr: true });
const EsimBookingSection = dynamic(() => import("@/components/travel/EsimBookingSection"), { ssr: true });
const FlightCompensationCalculator = dynamic(() => import("@/components/travel/FlightCompensationCalculator"), { ssr: true });
const InteractiveTravelCostCalculator = dynamic(() => import("@/components/travel/InteractiveTravelCostCalculator"), { ssr: true });
const TravelEssentialsHub = dynamic(() => import("@/components/travel/TravelEssentialsHub"), { ssr: true });

export const revalidate = 300;

export const metadata: Metadata = {
  title: "SmartMag Travel: AI Trip Planner, Cheap Flights, eSIMs & Attraction Passes",
  description:
    "Plan your entire vacation with SmartMag AI: Instant personalized trip baskets, cheap flight radar on Aviasales, airport transfers, 200+ eSIM cellular packages, and skip-the-line attraction passes.",
  alternates: {
    canonical: "https://thesmartmag.com/travel",
  },
};

export default function TravelHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col justify-between transition-colors">
      {/* 🌐 JSON-LD Structured Data for Googlebot Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://travel.thesmartmag.com/#website",
                url: "https://travel.thesmartmag.com",
                name: "SmartMag Travel: AI Vacation Planner & Deals",
                description:
                  "Plan flights, luxury hotels, airport transfers, eSIM cellular packages, and attraction passes across 25+ global destinations.",
                publisher: {
                  "@type": "Organization",
                  name: "SmartMag Tech & Travel Media",
                  url: "https://thesmartmag.com",
                },
              },
              {
                "@type": "ItemList",
                name: "Top Trending Travel Destinations 2026",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Manali & Himachal Snow Valleys", url: "https://travel.thesmartmag.com/manali" },
                  { "@type": "ListItem", position: 2, name: "Goa Coastal Beaches & Nightlife", url: "https://travel.thesmartmag.com/goa" },
                  { "@type": "ListItem", position: 3, name: "Kerala Backwaters & Munnar Tea Hills", url: "https://travel.thesmartmag.com/kerala" },
                  { "@type": "ListItem", position: 4, name: "Dubai Luxury & Desert Safari", url: "https://travel.thesmartmag.com/dubai" },
                  { "@type": "ListItem", position: 5, name: "Japan Cherry Blossom & Kyoto Temples", url: "https://travel.thesmartmag.com/japan" },
                  { "@type": "ListItem", position: 6, name: "Bali Tropical Beaches & Ubud Villas", url: "https://travel.thesmartmag.com/bali" },
                  { "@type": "ListItem", position: 7, name: "Maldives Overwater Luxury Resorts", url: "https://travel.thesmartmag.com/maldives" },
                  { "@type": "ListItem", position: 8, name: "Switzerland Alpine Scenic Trains & Peaks", url: "https://travel.thesmartmag.com/switzerland" },
                  { "@type": "ListItem", position: 9, name: "Kashmir Gulmarg Snow & Dal Lake Shikaras", url: "https://travel.thesmartmag.com/kashmir" },
                  { "@type": "ListItem", position: 10, name: "Ladakh High Passes & Pangong Lake", url: "https://travel.thesmartmag.com/ladakh" },
                  { "@type": "ListItem", position: 11, name: "Thailand Island Hopping & Bangkok Nightlife", url: "https://travel.thesmartmag.com/thailand" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How does the SmartMag AI Travel Concierge work?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Simply specify your destination, duration, and budget. Our AI agent instantly builds a complete day-by-day itinerary, compares real-time flight fares on Aviasales, selects high-rated hotels on Booking.com/Agoda, and provisions eSIM data.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I get international eSIM mobile data before flying?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, you can select instant eSIM profiles with unlimited 4G/5G data for over 200 countries via Airalo and Saily with zero roaming charges.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* 🧭 Dedicated Standalone Travel Brand Navbar */}
      <TravelNavbar />

      {/* 🚀 Main Travel Booking Suite */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1 w-full">
        {/* 1. 🎙️ Flagship AI Travel Concierge & Trip Planner Engine (First & Most Prominent) */}
        <section id="ai-planner" className="scroll-mt-24">
          <SmartTravelAIAgentHero />
        </section>

        {/* 2. Real-time Live Flight, Hotel, Treks, Car & Transfer Search Engine */}
        <section id="flights" className="scroll-mt-24">
          <InteractiveTravelBookingBar />
        </section>

        {/* ✈️ 2B. Live Lowest Fare Radar & Interactive Flight Deals Map (Aviasales) */}
        <section id="flight-deals" className="scroll-mt-24">
          <AviasalesLiveFlightDeals />
        </section>

        {/* 3. Global Airport Transfers & Private Chauffeurs (GetTransfer & Intui.travel) */}
        <section id="transfers" className="scroll-mt-24">
          <AirportTransferBanner />
        </section>

        {/* 3. Popular Attraction Passes & Skip-The-Line Tickets (Klook, KKday & Tiqets) */}
        <section id="attractions" className="scroll-mt-24">
          <FeaturedAttractionsGrid />
        </section>

        {/* 🎬 3B. 4K Ultra HD Cinematic Travel Guides & Destination Facts */}
        <section id="video-cinema" className="scroll-mt-24">
          <CinematicTravelGuides />
        </section>

        {/* 4. Airalo & Saily Global eSIM Data Packs (200+ Countries) */}
        <section id="esim" className="scroll-mt-24">
          <EsimBookingSection />
        </section>

        {/* 5. Flight Delay Claim Calculator (€600 Legal Compensation) */}
        <section id="compensation" className="scroll-mt-24">
          <FlightCompensationCalculator />
        </section>

        {/* 🧮 5B. Interactive Vacation Cost & Budget Calculator (Phase 8 Tool) */}
        <section id="budget-calculator" className="scroll-mt-24">
          <InteractiveTravelCostCalculator />
        </section>

        {/* 6. Trending Holiday Destinations & Bundles */}
        <section id="destinations" className="scroll-mt-24">
          <TrendingDestinations />
        </section>

        {/* 7. Comprehensive Travel Partner Directory & Search Filter */}
        <section id="essentials" className="scroll-mt-24">
          <TravelEssentialsHub />
        </section>

        {/* Monetag Safe High-CPM Travel Ad Slot */}
        <MonetagBanner slotType="homepage" className="my-10" />

        {/* 🤝 Transparent Affiliate Disclosure (Editorial Trust Standard) */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed my-8 max-w-5xl mx-auto flex items-start gap-3">
          <span className="p-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold shrink-0 text-sm">ℹ️</span>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Just so you know: </span>
            Some links on this platform are verified affiliate links. If you book a flight, hotel, airport transfer, or eSIM package, we may earn a modest commission at absolutely zero additional cost to you. This enables us to maintain our 24/7 AI travel research fleet and price radar completely free. We strictly partner with accredited global operators with 256-bit SSL encrypted checkouts.
          </div>
        </div>

        {/* 🎁 Free 30-Day Travel Planning Kit Lead Magnet (High Conversion) */}
        <section className="my-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Free Traveler Toolkit
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-serif tracking-tight">
              Download the Free 30-Day Travel Planning Kit
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto leading-relaxed">
              Get our comprehensive packing checklist, currency budgeting template, flight price radar guide, and emergency visa checklist delivered instantly to your inbox.
            </p>
            <form action="/api/subscribe" method="POST" className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto pt-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your best email address..."
                className="w-full px-4 py-3 rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-500 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-inner"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 cursor-pointer"
              >
                Get Free Kit →
              </button>
            </form>
            <div className="flex items-center justify-center gap-4 text-[11px] text-sky-200 pt-1">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> No Spam Guarantee</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Instant PDF Download</span>
            </div>
          </div>
        </section>

        {/* 8. Verified Booking Protection & Trust Banner */}
        <section className="my-14 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-300 text-[10px] font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              Verified Partner Guarantees
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
              Why Book via SmartMag Travel Partners?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Every partner in our network is certified for direct pricing, zero middleman markups, secure encrypted checkout, and official voucher validity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Zero Extra Fees Guarantee</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You receive the lowest direct provider rates. Our affiliate tracking marker ensures you get access to exclusive seasonal promotional discount codes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">EU/UK Passenger Rights Protection</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Suffered a 3+ hour delay or cancellation? Our legal claim partners help you recover up to €600 per passenger on a strict no-win, no-fee guarantee.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-800/80 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                From Saily QR eSIMs to Klook mobile vouchers and Radical Storage bag drop codes, receive instant confirmations right on your phone.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 🗺️ Dedicated Standalone Travel Brand Footer */}
      <TravelFooter />
    </div>
  );
}
