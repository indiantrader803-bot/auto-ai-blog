import type { Metadata } from "next";
import Link from "next/link";
import AppleNavbar from "@/components/apple/AppleNavbar";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import { APPLE_PRODUCTS } from "@/data/appleData";
import { Cpu, Camera, Battery, HardDrive, Star, ShieldCheck, Zap, ArrowRight, ExternalLink, Check, ShoppingBag, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "Apple iPhone 18 & 18 Pro Max: Price in India, Specs & Launch Guide | TheSmartMag",
  description:
    "Complete breakdown of Apple iPhone 18, iPhone 18 Pro, and iPhone 18 Pro Max. Explore TSMC 2nm A20 Pro silicon, mechanical variable aperture cameras, launch pricing across Flipkart, Croma, Reliance Digital & Amazon India.",
  keywords: [
    "iPhone 18 price in India",
    "iPhone 18 Pro Max launch",
    "iPhone 18 specs",
    "A20 Pro 2nm chip",
    "iPhone 18 camera variable aperture",
    "iPhone 18 Croma discount",
    "iPhone 18 Flipkart bank offer",
  ],
  alternates: {
    canonical: `${siteUrl}/apple/iphone-18`,
  },
};

export default function Iphone18LaunchPage() {
  const iphones = APPLE_PRODUCTS.filter((p) => p.category === "iphone");
  const proMax = iphones.find((p) => p.id === "iphone-18-pro-max") || iphones[0];
  const pro = iphones.find((p) => p.id === "iphone-18-pro") || iphones[1];
  const standard = iphones.find((p) => p.id === "iphone-18") || iphones[2];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Apple iPhone 18 Pro Max",
    image: proMax.heroImage,
    description: proMax.tagline,
    brand: {
      "@type": "Brand",
      name: "Apple",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: proMax.startingPriceInr,
      highPrice: proMax.originalPriceInr || proMax.startingPriceInr,
      offerCount: proMax.retailers.length,
      offers: proMax.retailers.map((r) => ({
        "@type": "Offer",
        price: r.priceInr,
        priceCurrency: "INR",
        seller: {
          "@type": "Organization",
          name: r.store,
        },
        availability: "https://schema.org/InStock",
        url: r.affiliateUrl,
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: proMax.rating,
      reviewCount: proMax.reviewCount,
    },
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AppleNavbar />

      {/* Hero Banner */}
      <section className="py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Official 2026 Flagship Launch
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            iPhone 18 &amp; 18 Pro Max.
          </h1>

          <p className="mt-4 text-base sm:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            The era of 2nm computing. Featuring the mechanical variable aperture camera, 3,000-nit micro-lens OLED, and instant on-device Apple Intelligence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#models"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              Explore Models &amp; Prices
            </a>
            <Link
              href="/apple/iphone-18-pro-max-review"
              className="px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Read In-Depth Review
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Models Grid */}
      <section id="models" className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Select Your iPhone 18 Model.
            </h2>
            <p className="mt-2 text-zinc-400 text-sm font-light">
              Compare base configurations, pricing in India, and live retailer stock.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[proMax, pro, standard].map((phone) => (
              <div
                key={phone.id}
                className="rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl relative group shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
                      {phone.badge || "2026 Model"}
                    </span>
                    <span className="text-xs text-zinc-400">{phone.specs.weight}</span>
                  </div>

                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/5 mb-6 relative">
                    <img
                      src={phone.heroImage}
                      alt={phone.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-2xl font-extrabold text-white">{phone.name}</h3>
                  <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                    {phone.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-white/5 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-zinc-400">Launch Price India</div>
                      <div className="text-2xl font-black text-white font-mono">
                        ₹{phone.startingPriceInr.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold font-mono">
                      ₹5,000 Bank Cashback
                    </span>
                  </div>

                  {/* Specs Quicklist */}
                  <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
                    <div className="flex items-start gap-2">
                      <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{phone.specs.chip}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Camera className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{phone.specs.camera}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Battery className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{phone.specs.battery}</span>
                    </div>
                  </div>
                </div>

                {/* Retailer Buy Buttons */}
                <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-zinc-400 font-bold">
                    Buy with Instant Cashback:
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {phone.retailers.slice(0, 4).map((r, i) => (
                      <a
                        key={i}
                        href={r.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 flex items-center justify-between text-xs font-bold text-white transition-colors"
                      >
                        <span>{r.store}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2nm A20 Pro Deep Dive */}
      <section className="py-20 bg-zinc-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
                <Cpu className="w-3.5 h-3.5" /> Silicon Breakthrough
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
                TSMC 2nm A20 Pro.
              </h2>
              <p className="mt-4 text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                The A20 Pro transitions to Gate-All-Around (GAA) nanosheet transistors. By enveloping the conductive channel on all four sides, leakage currents drop by 35% while peak GPU clock speeds accelerate by 30%.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="text-2xl font-black text-emerald-400 font-mono">+35%</div>
                  <div className="text-xs text-zinc-400 mt-1">GPU Compute &amp; Ray-Tracing</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="text-2xl font-black text-indigo-400 font-mono">-30%</div>
                  <div className="text-xs text-zinc-400 mt-1">Thermal Wattage Consumption</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="text-2xl font-black text-amber-400 font-mono">38 TOPS</div>
                  <div className="text-xs text-zinc-400 mt-1">Local Neural AI Performance</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="text-2xl font-black text-sky-400 font-mono">35W</div>
                  <div className="text-xs text-zinc-400 mt-1">Ultra-Fast Wired Juice Up</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Why Mechanical Variable Aperture Changes Mobile Photography</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Traditional smartphones rely on digital portrait mode software simulation to blur backgrounds. The iPhone 18 Pro Max introduces physical 6-blade iris blades that physically expand to f/1.4 in twilight or constrict to f/2.8 in broad daylight.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Native Optical Depth:</strong> Authentic optical shallow depth-of-field without hair cutouts or edge artifacts.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Sunstar Diffraction:</strong> Dramatic multi-point starburst flare effects when shooting night streetscapes.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>ProRes Log 2.0:</strong> 4K at 120fps direct NVMe recording to external SSD drives via USB-C 10Gbps.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/apple/iphone-18-pro-max-review"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
                >
                  <span>See Camera Sample Tests in Our Review</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileBuyBar />
    </div>
  );
}
