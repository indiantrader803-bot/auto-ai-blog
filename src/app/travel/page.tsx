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
} from "lucide-react";
import TravelEssentialsHub from "@/components/travel/TravelEssentialsHub";
import InteractiveTravelBookingBar from "@/components/travel/InteractiveTravelBookingBar";

export const metadata: Metadata = {
  title: "Travel Deals, Flights, eSIMs & City Passes | SmartMag Travel Hub",
  description:
    "Compare cheap flights, global travel eSIMs, attraction tickets, airport transfers, luggage storage, and up to €600 flight delay compensation.",
  alternates: {
    canonical: "https://auto-ai-blog-web.onrender.com/travel",
  },
};

export default function TravelHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      {/* Hero Header */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-wider mb-6">
            <Compass className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Official Travelpayouts Verified Deals Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Book Smarter: Flights, eSIMs, Tours &amp; Verified Travel Perks
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Direct access to the world&apos;s leading flight engines, instant QR eSIMs, city passes, airport chauffeurs, luggage storage networks, and guaranteed flight delay compensation.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">1,000+</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">Airlines Compared</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">150+</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">eSIM Countries</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">500,000+</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">Tours &amp; Activities</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">€600</div>
              <div className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">Max Flight Payout</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Hub Component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Real-time Embedded Booking Widgets */}
        <InteractiveTravelBookingBar />

        {/* Full Travel Partner Suite */}
        <TravelEssentialsHub />

        {/* Why Book Through Our Travel Partners Section */}
        <section className="my-16 p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Why Book via SmartMag Travel Partners?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every partner on our platform is handpicked for security, transparent pricing, zero markup, and comprehensive traveller protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white">Zero Extra Fees Guarantee</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You receive the lowest direct provider rates. Our affiliate tracking marker ensures you get access to exclusive seasonal promotional discount codes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white">EU/UK Passenger Rights Protection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suffered a 3+ hour delay or cancellation? Our legal claim partners help you recover up to €600 per passenger on a strict no-win, no-fee guarantee.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
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
