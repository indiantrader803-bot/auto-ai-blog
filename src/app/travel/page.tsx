import { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Plane,
  Shield,
  Wifi,
  Ticket,
  Car,
  Bike,
  Navigation,
  Luggage,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Tag,
  Headphones,
  Flame,
} from "lucide-react";
import InteractiveTravelBookingBar from "@/components/travel/InteractiveTravelBookingBar";
import AirportTransferBanner from "@/components/travel/AirportTransferBanner";
import FeaturedAttractionsGrid from "@/components/travel/FeaturedAttractionsGrid";
import EsimBookingSection from "@/components/travel/EsimBookingSection";
import FlightCompensationCalculator from "@/components/travel/FlightCompensationCalculator";
import TrendingDestinations from "@/components/travel/TrendingDestinations";
import TravelEssentialsHub from "@/components/travel/TravelEssentialsHub";

export const metadata: Metadata = {
  title: "Official Travel Booking Hub: Flights, Hotels, eSIMs, Transfers & City Passes | SmartMag Travel",
  description:
    "Compare real-time cheap flights, instant eSIM QR data packs, airport chauffeur transfers, skip-the-line attraction tickets, car rentals, and up to €600 flight delay compensation.",
  alternates: {
    canonical: "https://thesmartmag.com/travel",
  },
};

export default function TravelHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-24">
      {/* 🌟 Top Hero Header with Live Travel Stats */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-wider mb-6 shadow-sm">
            <Compass className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: "14s" }} />
            <span>Official Travelpayouts Verified Booking Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Book Smarter: Real-Time Flights, Instant eSIMs, Airport Transfers &amp; City Passes
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Direct access to 1,000+ global airlines, 150+ eSIM cellular carriers, airport chauffeur transfers in 175 countries, skip-the-line museum passes, luggage lockers, and up to €600 guaranteed flight delay compensation.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">1,000+</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">Airlines Compared</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">200+</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">eSIM Destinations</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">500,000+</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">Tours &amp; Activities</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-md">
              <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">€600</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">Max Flight Payout</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 Main Interactive Travel Hub */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-12">
        {/* 1. Real-time Embedded Flight, Hotel, Klook, Car, Tiqets & AirHelp Widget */}
        <InteractiveTravelBookingBar />

        {/* 2. Airport Transfer & Chauffeur Search Banner (Matching Screenshot 1 & 5) */}
        <AirportTransferBanner />

        {/* 3. Popular Attraction Passes & Skip-The-Line Tickets (Matching Screenshot 2 & 4) */}
        <FeaturedAttractionsGrid />

        {/* 4. Airalo & Saily Global eSIM Data Packs (Matching Screenshot 3) */}
        <EsimBookingSection />

        {/* 5. Flight Delay Claim Calculator (€600 Legal Compensation) */}
        <FlightCompensationCalculator />

        {/* 6. Trending Holiday Destinations & Bundles */}
        <TrendingDestinations />

        {/* 7. Comprehensive Travel Partner Directory & Search Filter */}
        <TravelEssentialsHub />

        {/* 8. Verified Booking Protection & Trust Banner */}
        <section className="my-16 p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Why Book via SmartMag Travel Partners?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every partner in our network is certified for direct pricing, zero middleman markups, secure encrypted checkout, and official voucher validity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white">Zero Extra Fees Guarantee</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You receive the lowest direct provider rates. Our affiliate tracking marker ensures you get access to exclusive seasonal promotional discount codes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white">EU/UK Passenger Rights Protection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suffered a 3+ hour delay or cancellation? Our legal claim partners help you recover up to €600 per passenger on a strict no-win, no-fee guarantee.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-white">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                From Saily QR eSIMs to Klook mobile vouchers and Radical Storage bag drop codes, receive instant confirmations right on your phone.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
