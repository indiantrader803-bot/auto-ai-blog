import type { Metadata } from "next";
import Link from "next/link";
import AppleNavbar from "@/components/apple/AppleNavbar";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import AppleDeals from "@/components/apple/AppleDeals";
import UpgradeCalculator from "@/components/apple/UpgradeCalculator";
import { Tag, Sparkles, ShieldCheck, Flame, Bell, Check } from "lucide-react";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "Today's Apple Deals & Price Drops India (2026): Flipkart, Croma, Amazon | TheSmartMag",
  description:
    "Discover the best daily Apple deals in India. Verified price crashes, HDFC/ICICI bank cashbacks, 24-month No-Cost EMI, and clearance offers on iPhone 18, iPhone 17 Pro Max, MacBook Air, and Apple Watch.",
  keywords: [
    "Apple deals India today",
    "iPhone 18 discount Flipkart",
    "Croma Apple sale",
    "MacBook Air M3 deal",
    "AirPods Pro 2 price drop",
    "Best Apple offers India",
  ],
  alternates: {
    canonical: `${siteUrl}/apple/deals`,
  },
};

export default function AppleDealsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-16 md:pb-0">
      <AppleNavbar />

      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6">
            <Flame className="w-3.5 h-3.5" /> Live Price Drop Radar
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Daily Apple Deals &amp; Discounts. <br />
            <span className="text-zinc-400 font-light">Verified Across All Authorized Indian Retailers.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
            We scan Flipkart, Croma, Reliance Digital, Vijay Sales, and Amazon India hourly to aggregate instant card discounts, exchange bonuses, and 0% EMI plans.
          </p>
        </div>
      </section>

      {/* Deals Grid */}
      <AppleDeals />

      {/* Trade-In Upgrade Valuation */}
      <UpgradeCalculator />

      <StickyMobileBuyBar />
    </div>
  );
}
