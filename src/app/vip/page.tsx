import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";
import {
  Crown,
  Sparkles,
  Lock,
  Download,
  Key,
  ShieldCheck,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileCode2,
  Plane,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIP Member Lounge & Exclusive Intelligence | TheSmartMag",
  description:
    "Exclusive quant models, institutional trading algorithms, unredacted AI research dossiers, and private partner discount vouchers for verified VIP members.",
};

export default async function VipLoungePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* VIP Top Status Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0d1f35] to-slate-900 border border-teal-500/30 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md flex items-center gap-1.5">
                <Crown className="w-4 h-4 fill-current" />
                {user ? user.vipTier || "VIP ELITE MEMBER" : "VIP ACCESS PORTAL"}
              </span>
              {user && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Authenticated: {user.email}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              Exclusive VIP Intelligence &amp; Private Models
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Institutional-grade market data, unreleased Pine Script algorithmic indicators, private semiconductor supply chain reports, and secret travel flash vouchers.
            </p>

            {!user ? (
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/vip/register"
                  className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
                >
                  Create Free VIP Account →
                </Link>
                <Link
                  href="/vip/login"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  Log In to Existing VIP Account
                </Link>
              </div>
            ) : (
              <div className="pt-4 flex items-center gap-3 text-xs text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>All VIP intelligence modules, indicator scripts, and discount codes below are fully unlocked.</span>
              </div>
            )}
          </div>
        </div>

        {/* 📊 VIP Exclusive Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Proprietary Algorithmic Pine Script */}
          <div className="rounded-2xl bg-[#0b1329]/80 border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all shadow-lg group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                <FileCode2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">
                Exclusive Algorithm • v4.2
              </span>
              <h3 className="text-lg font-bold text-white font-serif group-hover:text-teal-300 transition-colors">
                SmartMag Order-Flow Reversal Pine Script
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Institutional delta divergence and volume profile absorption detector for TradingView. Identifies liquidity sweeps across Nifty, Forex, and Crypto pairs.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              {user ? (
                <a
                  href="/downloads/smartmag-orderflow-reversal.pine"
                  download
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Script Code
                </a>
              ) : (
                <Link
                  href="/vip/login"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Unlock with VIP Login
                </Link>
              )}
            </div>
          </div>

          {/* Card 2: Unredacted Hedge Fund AI Chip Dossier */}
          <div className="rounded-2xl bg-[#0b1329]/80 border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all shadow-lg group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                Quarterly Research Dossier (PDF)
              </span>
              <h3 className="text-lg font-bold text-white font-serif group-hover:text-cyan-300 transition-colors">
                2026 Sovereign Compute &amp; TSMC Taiwan Strait Analysis
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                38-page exhaustive report analyzing High-NA EUV lithography export bottlenecks, CoWoS packaging allocation, and private hedge fund macro hedging plays.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              {user ? (
                <a
                  href="/downloads/2026-sovereign-compute-dossier.pdf"
                  download
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download 38-Page PDF
                </a>
              ) : (
                <Link
                  href="/vip/login"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Unlock with VIP Login
                </Link>
              )}
            </div>
          </div>

          {/* Card 3: Secret Travel Flash Vouchers */}
          <div className="rounded-2xl bg-[#0b1329]/80 border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all shadow-lg group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                Partner Privilege Codes
              </span>
              <h3 className="text-lg font-bold text-white font-serif group-hover:text-purple-300 transition-colors">
                VIP Hotel Flash Coupons &amp; 20% eSIM Promo
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct discount vouchers for luxury European &amp; Asian hotels on Booking.com / Agoda, plus instant skip-the-line attraction passes on Klook.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              {user ? (
                <div className="w-full p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-center">
                  <span className="text-[11px] text-purple-300 font-mono font-bold block">
                    PROMO CODE: <span className="text-amber-300">SMARTVIP2026</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Apply at checkout on partner bookings</span>
                </div>
              ) : (
                <Link
                  href="/vip/login"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Unlock with VIP Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 🚀 Authenticated User Control Panel */}
        {user ? (
          <div className="p-6 rounded-2xl bg-[#071322] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Signed in as {user.email}</h4>
              <p className="text-xs text-slate-400">Membership Tier: {user.vipTier} • Status: Active &amp; Verified</p>
            </div>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-teal-500/20 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">Join 12,000+ Quant Traders &amp; AI Engineers</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Registration is 100% free and gives you immediate access to our private indicators, unredacted PDFs, and secret travel discounts.
            </p>
            <Link
              href="/vip/register"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-teal-400 hover:bg-teal-300 text-slate-950 transition-all shadow-lg shadow-teal-500/20"
            >
              <span>Activate Your Free VIP Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
