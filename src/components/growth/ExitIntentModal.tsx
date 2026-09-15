"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Download, Sparkles, X, CheckCircle2, ShieldCheck, Gift, Plane, ArrowRight } from "lucide-react";

export default function ExitIntentModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTravelContext, setIsTravelContext] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      const path = window.location.pathname;
      if (host.startsWith("travel.") || host.includes("travel") || path.startsWith("/travel")) {
        setIsTravelContext(true);
      }
    }

    if (pathname?.startsWith("/admin")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        try {
          if (typeof window !== "undefined" && window.sessionStorage) {
            const hasSeen = sessionStorage.getItem("hasSeenExitModal");
            if (!hasSeen) {
              setIsOpen(true);
              sessionStorage.setItem("hasSeenExitModal", "true");
            }
          }
        } catch (_) {}
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: isTravelContext ? "exit_intent_travel_guide" : "exit_intent_ai_lead",
        }),
      });
      setSubmitted(true);
    } catch (_) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl space-y-6">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif">
              {isTravelContext ? "Your Travel VIP Bundle is Ready!" : "Your Free Executive Guide is Ready!"}
            </h3>
            <p className="text-xs text-slate-300">
              We have dispatched the guide and exclusive partner promo codes directly to <b>{email}</b>.
            </p>
            {isTravelContext ? (
              <a
                href="https://travel.thesmartmag.com"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-xs font-bold text-white shadow-lg transition-all"
              >
                <Plane className="w-3.5 h-3.5" /> Explore Secret Hotel Deals (Save 40%)
              </a>
            ) : (
              <a
                href="/store"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" /> Browse Digital Toolkits
              </a>
            )}
          </div>
        ) : isTravelContext ? (
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-black uppercase tracking-wider">
              <Plane className="w-3.5 h-3.5" /> Exclusive Travel VIP Member Perk
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight leading-tight">
              Wait! Unlock <span className="text-sky-400">Up to 40% Off</span> Stays &amp; 2026 Itineraries
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Join 35,000+ smart travelers receiving verified hotel partner promo codes (Booking.com Genius rates, Aviasales cheap routes, and free eSIM data).
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                placeholder="Enter your email to unlock deals..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
              >
                {loading ? (
                  "Sending Travel Discounts..."
                ) : (
                  <>
                    <Gift className="w-4 h-4" /> Unlock VIP Travel Cheatsheet &amp; Codes
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero spam • 1-Click unsubscribe • Free cancellation guarantee</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" /> Free Executive Download
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight leading-tight">
              Wait! Grab The Free <span className="text-indigo-400">100 AI Tools &amp; Prop Firm Cheatsheet</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Join 42,000+ developers, algorithmic traders, and founders getting our curated index of high-ROI artificial intelligence models, system prompts, and verified 20% discount codes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                placeholder="Enter your best email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
              >
                {loading ? (
                  "Sending Download Link..."
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Claim Free 100 AI Tools PDF (₹999 Value)
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero spam • 1-Click unsubscribe anytime • Instant download</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

