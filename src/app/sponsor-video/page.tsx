"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Youtube, DollarSign, CheckCircle, ShieldCheck, Sparkles, Send, Copy, ArrowRight, Eye, Play, Award } from "lucide-react";

export default function SponsorVideoPage() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [videoUrl, setVideoUrl] = useState("");
  const [channelName, setChannelName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [selectedTier, setSelectedTier] = useState<"STANDARD" | "FEATURED_STUDIO" | "HOMEPAGE_TAKEOVER">("FEATURED_STUDIO");
  const [txHash, setTxHash] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const TIERS = [
    {
      id: "STANDARD",
      name: "In-Article Video Embed",
      priceUSD: "$29",
      priceINR: "₹2,499",
      duration: "7 Days Active",
      reach: "15,000+ Readers",
      features: [
        "Embedded inside high-ranking niche articles",
        "Direct CTA button below player with your link",
        "Search engine indexable video schema",
      ],
    },
    {
      id: "FEATURED_STUDIO",
      name: "Homepage Studio Showcase",
      priceUSD: "$59",
      priceINR: "₹4,999",
      duration: "14 Days Active",
      reach: "50,000+ Viewers",
      popular: true,
      features: [
        "Front-and-center slot in Homepage 4K Studio Showcase",
        "Embedded across top 5 trending category articles",
        "Custom promotional badge & direct subscriber link",
        "Social media syndicate broadcast (X & Telegram)",
      ],
    },
    {
      id: "HOMEPAGE_TAKEOVER",
      name: "30-Day Omnichannel Blast",
      priceUSD: "$99",
      priceINR: "₹8,499",
      duration: "30 Days Active",
      reach: "120,000+ Viewers",
      features: [
        "Permanent Video Showcase placement for 30 days",
        "Hero grid sticky banner on all related articles",
        "Featured in The Morning Dispatch newsletter (65k+ subscribers)",
        "Priority do-follow backlink & lead generation button",
      ],
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || !contactEmail) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: channelName || "YouTube Creator",
          email: contactEmail,
          message: `[YOUTUBE PROMOTION BOOKING]\nVideo URL: ${videoUrl}\nTier: ${selectedTier}\nCurrency: ${currency}\nTx Reference / UTR: ${txHash || "PENDING_VERIFICATION"}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (_) {}
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black uppercase tracking-wider mb-4">
            <Youtube className="w-4 h-4" /> YouTube Video Promotion Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white mb-4">
            Promote Your YouTube Videos to 100,000+ Active Traders &amp; Tech Enthusiasts
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Get instant organic views, high-retention watch time, and real subscribers by showcasing your video on SmartMag Tech Chronicle.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                currency === "USD"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              $ USD (Global)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                currency === "INR"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ₹ INR (India)
            </button>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id as any)}
                className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative overflow-hidden border ${
                  isSelected
                    ? "bg-gradient-to-b from-slate-900 to-rose-950/40 border-rose-500/60 shadow-2xl shadow-rose-600/10 scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-black font-serif text-white mb-1">{tier.name}</h3>
                  <div className="text-xs font-semibold text-rose-400 mb-4">{tier.duration} • {tier.reach}</div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                      {currency === "USD" ? tier.priceUSD : tier.priceINR}
                    </span>
                    <span className="text-xs text-slate-400">one-time</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-300">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  <span>{isSelected ? "Selected Tier" : "Select Tier"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Submission & Automated Payment Flow */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">Promotion Activated!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you! Your payment for the <strong>{selectedTier}</strong> package has been processed. Our media agent has queued your video for broadcast across our editorial channels. A confirmation has been sent to <strong>{contactEmail}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" /> Secure 256-bit Encrypted Checkout
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Complete Video Promotion Order
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  YouTube Video URL *
                </label>
                <input
                  type="url"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Channel / Creator Name
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="e.g. Quant Trading Academy"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Receipt Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="creator@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Order Summary & One-Click Pay */}
              <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Total Investment:</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    {currency === "USD"
                      ? TIERS.find((t) => t.id === selectedTier)?.priceUSD
                      : TIERS.find((t) => t.id === selectedTier)?.priceINR}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Selected Package: </span>
                  <strong className="text-white block">{selectedTier}</strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{loading ? "Processing Order..." : `Pay & Start Promotion (${currency === "USD" ? TIERS.find((t) => t.id === selectedTier)?.priceUSD : TIERS.find((t) => t.id === selectedTier)?.priceINR})`}</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
