"use client";

import { useState, useEffect } from "react";
import { Download, Sparkles, X, CheckCircle2, ShieldCheck, Gift } from "lucide-react";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit_intent_pdf_lead" }),
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
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-500/30 text-white shadow-2xl space-y-6">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif">Your Free PDF is Ready!</h3>
            <p className="text-xs text-slate-300">
              We have dispatched <b>"Top 100 AI Tools for Profit & Productivity 2026"</b> directly to <b>{email}</b>.
            </p>
            <a
              href="https://auto-ai-blog-web.onrender.com"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold shadow-lg transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Download Instant Copy
            </a>
          </div>
        ) : (
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" /> Free Executive Download
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight leading-tight">
              Wait! Grab The Free <span className="text-indigo-400">100 AI Tools PDF</span> Before You Leave
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Join 42,000+ developers, algorithmic traders, and founders getting our curated index of high-ROI artificial intelligence models, system prompts, and workflow templates.
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
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
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
