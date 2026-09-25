import type { Metadata } from "next";
import Link from "next/link";
import AppleNavbar from "@/components/apple/AppleNavbar";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import { APPLE_PRODUCTS } from "@/data/appleData";
import { Headphones, Heart, ShieldCheck, Zap, ExternalLink, Check, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "AirPods Pro 3 & AirPods 5: Price in India, Audio Review & Deals (2026) | TheSmartMag",
  description:
    "Explore Apple AirPods Pro 3, AirPods 5, and AirPods Max in India. Discover 2x stronger active noise cancellation, in-ear heart rate sensing, and retail deals on Flipkart, Croma & Amazon.",
  keywords: [
    "AirPods Pro 3 price India",
    "AirPods 5 noise cancelling",
    "AirPods heart rate sensor",
    "AirPods Max USB C discount",
  ],
  alternates: {
    canonical: `${siteUrl}/apple/airpods`,
  },
};

export default function AirpodsGuidePage() {
  const airpods = APPLE_PRODUCTS.find((p) => p.id === "airpods-pro-3") || APPLE_PRODUCTS[5];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-16 md:pb-0">
      <AppleNavbar />

      <section className="py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-6">
            <Headphones className="w-3.5 h-3.5 text-sky-400" /> Spatial Acoustics 2026
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-white tracking-tight leading-tight">
            AirPods Pro 3 &amp; AirPods 5. <br />
            <span className="text-zinc-400 font-light">Lossless Audio Meets In-Ear Heart Rate Health.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
            Clinical-grade OTC hearing aid certification, real-time heart rate sensor during workouts, and 2x more powerful active noise cancellation powered by the Apple H3 chip.
          </p>
        </div>
      </section>

      {/* Featured Model: AirPods Pro 3 */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-zinc-900/60 border border-white/10 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 relative">
                <img
                  src={airpods.heroImage}
                  alt={airpods.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-mono font-bold uppercase">
                    Apple H3 Silicon
                  </span>
                  <span className="text-xs text-zinc-400">Heart Rate Sensor</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">{airpods.name}</h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {airpods.tagline}
                </p>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/5 flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-zinc-400">Launch Price India</div>
                    <div className="text-2xl font-black text-white font-mono">
                      ₹{airpods.startingPriceInr.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400 font-mono">₹2,500 Instant Off</div>
                    <div className="text-[10px] text-zinc-400">on Axis &amp; ICICI Cards</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-300">
                  {airpods.keyHighlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Retailer Links */}
                <div className="pt-3 border-t border-white/10">
                  <div className="text-xs font-mono uppercase text-zinc-400 mb-2">Buy on Authorized Stores:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {airpods.retailers.slice(0, 4).map((r, i) => (
                      <a
                        key={i}
                        href={r.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/5 text-xs font-bold text-white flex items-center justify-between"
                      >
                        <span>{r.store}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileBuyBar />
    </div>
  );
}
