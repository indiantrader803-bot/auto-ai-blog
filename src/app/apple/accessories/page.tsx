import type { Metadata } from "next";
import Link from "next/link";
import AppleNavbar from "@/components/apple/AppleNavbar";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import HighCommissionAccessories from "@/components/apple/HighCommissionAccessories";
import { Sparkles, ShieldCheck, Zap, ShoppingBag, Check } from "lucide-react";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "Best Apple Accessories 2026: MagSafe Chargers, Cases & Power Banks | TheSmartMag",
  description:
    "Curated guide to the best iPhone 18, MacBook & Apple Watch accessories. Explore Torras magnetic kickstand cases, 25W Qi2 MagSafe wireless pads, ESR sapphire glass, and Anker power banks.",
  keywords: [
    "Best iPhone 18 cases",
    "iPhone 18 Pro Max MagSafe charger",
    "Apple Watch Ultra 3 band",
    "Anker Qi2 power bank India",
    "Best screen protector iPhone 18",
  ],
  alternates: {
    canonical: `${siteUrl}/apple/accessories`,
  },
};

export default function AppleAccessoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-16 md:pb-0">
      <AppleNavbar />

      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> High-Utility Gear 2026
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Curated Apple Accessories. <br />
            <span className="text-zinc-400 font-light">Engineered for Durability &amp; 25W MagSafe Speed.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
            High-converting, lab-tested cases, sapphire glass protectors, Qi2 magnetic battery packs, and titanium watch bands designed for Apple&apos;s 2026 flagship ecosystem.
          </p>
        </div>
      </section>

      {/* Full Accessories Grid */}
      <HighCommissionAccessories />

      <StickyMobileBuyBar />
    </div>
  );
}
