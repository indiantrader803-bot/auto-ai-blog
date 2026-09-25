import type { Metadata } from "next";
import Link from "next/link";
import AppleNavbar from "@/components/apple/AppleNavbar";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import ComparisonEngine from "@/components/apple/ComparisonEngine";
import UpgradeCalculator from "@/components/apple/UpgradeCalculator";
import { GitCompare, Check, X, ArrowRight, ShieldCheck, Zap, Star, ExternalLink } from "lucide-react";
import { APPLE_PRODUCTS } from "@/data/appleData";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "iPhone 18 Pro Max vs iPhone 17 Pro Max: Should You Upgrade? (2026) | TheSmartMag",
  description:
    "Direct flagship head-to-head: Apple iPhone 18 Pro Max vs iPhone 17 Pro Max. Compare 2nm A20 Pro vs A19 Pro, mechanical variable aperture vs fixed lens, battery life, and pricing in India.",
  keywords: [
    "iPhone 18 vs iPhone 17 Pro Max",
    "iPhone 18 Pro Max comparison",
    "A20 Pro vs A19 Pro",
    "variable aperture iPhone 18",
    "Should I upgrade to iPhone 18",
    "iPhone 17 Pro Max price drop India",
  ],
  alternates: {
    canonical: `${siteUrl}/apple/iphone-18-vs-iphone-17-pro-max`,
  },
};

export default function Iphone18Vs17ProMaxPage() {
  const p18 = APPLE_PRODUCTS.find((p) => p.id === "iphone-18-pro-max") || APPLE_PRODUCTS[0];
  const p17 = APPLE_PRODUCTS.find((p) => p.id === "iphone-17-pro-max") || APPLE_PRODUCTS[3];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "iPhone 18 Pro Max vs iPhone 17 Pro Max: Flagship Comparison & Upgrade Guide",
    description: "Detailed side-by-side comparison of Apple iPhone 18 Pro Max vs iPhone 17 Pro Max.",
    author: {
      "@type": "Organization",
      name: "TheSmartMag",
    },
    publisher: {
      "@type": "Organization",
      name: "TheSmartMag",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/apple/iphone-18-vs-iphone-17-pro-max`,
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AppleNavbar />

      {/* Hero Head-to-Head Header */}
      <section className="py-14 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-4">
            <GitCompare className="w-3.5 h-3.5" /> Flagship Showdown 2026
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-tight">
            iPhone 18 Pro Max <br />
            <span className="text-zinc-500 font-light">vs</span> iPhone 17 Pro Max
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
            Is the new 2nm A20 Pro and mechanical variable aperture camera worth the premium over last year&apos;s heavily discounted titanium flagship? Here is our comprehensive breakdown.
          </p>
        </div>
      </section>

      {/* Side-by-Side Quick Summary Cards */}
      <section className="py-12 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 18 Pro Max */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono uppercase">
                  Winner: The Pinnacle 2026
                </span>
                <span className="text-xs text-zinc-400 font-mono">₹1,59,900</span>
              </div>

              <h2 className="text-2xl font-bold text-white">{p18.name}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">{p18.tagline}</p>

              <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Silicon Process:</span>
                  <span className="font-bold text-emerald-400">TSMC 2nm GAA (A20 Pro)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Camera Optics:</span>
                  <span className="font-bold text-emerald-400">f/1.4-f/2.8 Variable Aperture</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Peak Brightness:</span>
                  <span className="font-bold text-emerald-400">3,000 Nits Micro-Lens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Battery Stamina:</span>
                  <span className="font-bold text-emerald-400">34 Hours Video</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/apple/iphone-18"
                  className="w-full py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider text-center block transition-all"
                >
                  View iPhone 18 Deals
                </Link>
              </div>
            </div>

            {/* 17 Pro Max */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono uppercase">
                  Best Value Buy: ₹25,000 Cheaper
                </span>
                <span className="text-xs text-zinc-400 font-mono">₹1,28,900 (Clearance)</span>
              </div>

              <h2 className="text-2xl font-bold text-white">{p17.name}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">{p17.tagline}</p>

              <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Silicon Process:</span>
                  <span className="font-bold text-zinc-300">TSMC 3nm N3E (A19 Pro)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Camera Optics:</span>
                  <span className="font-bold text-zinc-300">f/1.78 Fixed Aperture</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Peak Brightness:</span>
                  <span className="font-bold text-zinc-300">2,000 Nits Super Retina</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Battery Stamina:</span>
                  <span className="font-bold text-zinc-300">31 Hours Video</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.flipkart.com/search?q=iphone+17+pro+max"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 font-bold text-xs uppercase tracking-wider text-center block transition-all"
                >
                  Check Flipkart Clearance Stock
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Interactive Comparison Engine */}
      <ComparisonEngine />

      {/* Upgrade Calculator */}
      <UpgradeCalculator />

      <StickyMobileBuyBar />
    </div>
  );
}
