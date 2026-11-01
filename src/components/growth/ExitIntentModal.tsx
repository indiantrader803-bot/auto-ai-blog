"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Download, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Gift, 
  Plane, 
  ArrowRight, 
  Tag, 
  ShoppingBag, 
  Zap, 
  Percent, 
  Copy, 
  Check, 
  Flame 
} from "lucide-react";

export default function ExitIntentModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTravelContext, setIsTravelContext] = useState(false);
  const [isStoreContext, setIsStoreContext] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      const path = window.location.pathname;
      if (host.startsWith("travel.") || host.includes("travel") || path.startsWith("/travel")) {
        setIsTravelContext(true);
      }
      if (host.startsWith("store.") || host.includes("store") || path.startsWith("/store")) {
        setIsStoreContext(true);
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

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("WELCOME15");
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const source = isStoreContext
        ? "exit_intent_store_discount"
        : isTravelContext
        ? "exit_intent_travel_guide"
        : "exit_intent_ai_lead";

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
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
      <div className={`relative w-full max-w-lg p-6 sm:p-8 rounded-3xl ${
        isStoreContext 
          ? "bg-slate-900 border-2 border-violet-500/50 shadow-[0_0_50px_rgba(139,92,246,0.3)]"
          : isTravelContext
          ? "bg-slate-900 border-2 border-sky-500/40 shadow-[0_0_50px_rgba(14,165,233,0.25)]"
          : "bg-slate-900 border-2 border-indigo-500/40 shadow-2xl"
      } text-white space-y-6`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className={`w-16 h-16 rounded-2xl ${isStoreContext ? "bg-violet-500/20 text-violet-400" : "bg-emerald-500/20 text-emerald-400"} flex items-center justify-center mx-auto`}>
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            {isStoreContext ? (
              <>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Here is Your 15% VIP Coupon Code!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We sent a confirmation to <b>{email}</b>. Use code below during checkout for immediate discount on all smart electronics:
                </p>
                <div className="flex items-center justify-center gap-3 p-3 bg-violet-950/60 border border-violet-500/40 rounded-2xl max-w-xs mx-auto">
                  <span className="font-mono text-lg font-black tracking-widest text-violet-300">WELCOME15</span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white flex items-center gap-1 transition-all cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? "Copied" : "Copy"}
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 cursor-pointer"
                >
                  Continue Shopping Now &rarr;
                </button>
              </>
            ) : isTravelContext ? (
              <>
                <h3 className="text-xl font-bold font-serif">
                  Your Travel VIP Bundle is Ready!
                </h3>
                <p className="text-xs text-slate-300">
                  We have dispatched the guide and exclusive partner promo codes directly to <b>{email}</b>.
                </p>
                <a
                  href="https://travel.thesmartmag.com"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-xs font-bold text-white shadow-lg transition-all"
                >
                  <Plane className="w-3.5 h-3.5" /> Explore Secret Hotel Deals (Save 40%)
                </a>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold font-serif">
                  Your Free Executive Guide is Ready!
                </h3>
                <p className="text-xs text-slate-300">
                  We have dispatched the guide and exclusive partner promo codes directly to <b>{email}</b>.
                </p>
                <a
                  href="/store"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Browse Digital Toolkits
                </a>
              </>
            )}
          </div>
        ) : isStoreContext ? (
          /* ================= STORE SPECIFIC HIGH-CONVERTING POPUP ================= */
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30 text-[10px] font-black uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Exclusive First-Order Discount
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Wait! Take <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">15% Off</span> Your Entire Cart + Free Shipping
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Unlock our limited-time instant voucher valid on all smart wearables, AI gadgets, audio gear, and productivity accessories.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                placeholder="Enter your email to reveal coupon..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
              >
                {loading ? (
                  "Unlocking Your 15% Code..."
                ) : (
                  <>
                    <Tag className="w-4 h-4" /> Claim My 15% Off Voucher Now
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Razorpay Verified
              </span>
              <span>•</span>
              <span>7-Day Return Guarantee</span>
              <span>•</span>
              <span>No Spam Promise</span>
            </div>
          </div>
        ) : isTravelContext ? (
          /* ================= TRAVEL SPECIFIC POPUP ================= */
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
          /* ================= BLOG / MAIN DOMAIN POPUP ================= */
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
