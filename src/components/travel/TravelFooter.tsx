"use client";

import Link from "next/link";
import {
  Plane,
  Compass,
  Car,
  Ticket,
  Wifi,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  Shield,
  Mail,
  ArrowUp,
  ExternalLink,
  CheckCircle2,
  Flame,
  Award,
} from "lucide-react";
import { useState } from "react";

export default function TravelFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-sans transition-colors">
      {/* 📧 Newsletter Subscription for Flight Price Drop & Flash Promo Alerts */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-700 to-emerald-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" /> Secret Fare Alerts &amp; Discount Vouchers
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
              Get Up to 40% Off Flight Flash Sales &amp; Tour Passes
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Join 45,000+ smart travelers receiving weekly curated hotel flash deals, instant eSIM discount codes, and skip-the-line attraction promotions.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>You&apos;re subscribed! Check your inbox for your first VIP discount code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white shadow-md flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-black text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                >
                  Get Deals →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 🗺️ Main 4-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/travel" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
                <Plane className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl text-slate-900 dark:text-white tracking-tight">
                  SMART<span className="text-sky-500">TRAVEL</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  Global Booking Hub
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              SmartMag Travel is an autonomous global travel booking engine and price comparison portal connecting travelers directly to 1,000+ airlines, 500,000+ tours, instant eSIM mobile data, and guaranteed airport transfers across 175+ countries.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Direct Provider Lowest Rate Guarantee</span>
            </div>
          </div>

          {/* Col 2: Core Booking Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Booking Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#transfers" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🚖 Airport Transfers &amp; Chauffeurs</span>
                  <span className="text-[10px] text-emerald-500 font-bold">175+ COUNTRIES</span>
                </a>
              </li>
              <li>
                <a href="#flights" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>✈️ Cheap Flight Comparison</span>
                  <span className="text-[10px] text-slate-400">1,000+ AIRLINES</span>
                </a>
              </li>
              <li>
                <a href="#attractions" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🎟️ Theme Parks &amp; City Passes</span>
                  <span className="text-[10px] text-amber-500 font-bold">SAVE 60%</span>
                </a>
              </li>
              <li>
                <a href="#esim" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>📱 Global eSIM QR Data Packs</span>
                  <span className="text-[10px] text-rose-500 font-bold">FROM $3.99</span>
                </a>
              </li>
              <li>
                <a href="#compensation" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🛡️ €600 Flight Delay Claim</span>
                  <span className="text-[10px] text-purple-500 font-bold">NO WIN NO FEE</span>
                </a>
              </li>
              <li>
                <a href="#essentials" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🧳 Luggage Storage &amp; Insurance</span>
                  <span className="text-[10px] text-slate-400">5,000+ HUBS</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Global Destinations */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Popular Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#destinations" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🇯🇵 Tokyo &amp; Japan Rail Passes</span>
                  <span className="text-[10px] text-slate-400">FROM $489</span>
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🇫🇷 Paris Louvre &amp; Eiffel Tower</span>
                  <span className="text-[10px] text-slate-400">FROM $399</span>
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🇬🇧 London Crown Jewels &amp; Eye</span>
                  <span className="text-[10px] text-slate-400">FROM $420</span>
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🇦🇪 Dubai Burj Khalifa &amp; Safari</span>
                  <span className="text-[10px] text-slate-400">FROM $380</span>
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🇮🇩 Bali Ubud &amp; Beach Resorts</span>
                  <span className="text-[10px] text-slate-400">FROM $510</span>
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-500 transition-colors flex items-center justify-between">
                  <span>🇺🇸 New York Summit &amp; Broadway</span>
                  <span className="text-[10px] text-slate-400">FROM $280</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Partner Network & Trust */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Verified Partners
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" /> Aviasales
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" /> Klook
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Tiqets
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> AirHelp
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Saily eSIM
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> GetTransfer
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" /> Go City
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Drimsim
              </span>
            </div>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Customer Inquiries: </span>
              <a href="mailto:support@thesmartmag.com" className="text-sky-600 dark:text-sky-400 font-bold hover:underline">
                support@thesmartmag.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} SmartMag Travel Hub. Part of The SmartMag Network. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              SmartMag News
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
