import { Metadata } from "next";
import TravelNavbar from "@/components/travel/TravelNavbar";
import TravelFooter from "@/components/travel/TravelFooter";
import SmartTravelAIAgentHero from "@/components/travel/SmartTravelAIAgentHero";
import AirportTransferBanner from "@/components/travel/AirportTransferBanner";
import InteractiveTravelBookingBar from "@/components/travel/InteractiveTravelBookingBar";
import FeaturedAttractionsGrid from "@/components/travel/FeaturedAttractionsGrid";
import EsimBookingSection from "@/components/travel/EsimBookingSection";
import FlightCompensationCalculator from "@/components/travel/FlightCompensationCalculator";
import TrendingDestinations from "@/components/travel/TrendingDestinations";
import TravelEssentialsHub from "@/components/travel/TravelEssentialsHub";
import { ShieldCheck } from "lucide-react";

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

        {/* 3. Global Airport Transfers & Private Chauffeurs */}
        <section id="transfers" className="scroll-mt-24">
          <AirportTransferBanner />
        </section>

        {/* 3. Popular Attraction Passes & Skip-The-Line Tickets (Klook & Tiqets) */}
        <section id="attractions" className="scroll-mt-24">
          <FeaturedAttractionsGrid />
        </section>

        {/* 4. Airalo & Saily Global eSIM Data Packs (200+ Countries) */}
        <section id="esim" className="scroll-mt-24">
          <EsimBookingSection />
        </section>

        {/* 5. Flight Delay Claim Calculator (€600 Legal Compensation) */}
        <section id="compensation" className="scroll-mt-24">
          <FlightCompensationCalculator />
        </section>

        {/* 6. Trending Holiday Destinations & Bundles */}
        <section id="destinations" className="scroll-mt-24">
          <TrendingDestinations />
        </section>

        {/* 7. Comprehensive Travel Partner Directory & Search Filter */}
        <section id="essentials" className="scroll-mt-24">
          <TravelEssentialsHub />
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
