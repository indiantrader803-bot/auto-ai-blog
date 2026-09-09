"use client";

import { useState } from "react";
import { Mail, Sparkles, X, CheckCircle2, Gift } from "lucide-react";

export default function FloatingSubscribeButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "floating_badge_subscribe" }),
      });
      setSubmitted(true);
    } catch (_) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded ? (
        <div className="w-80 p-5 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 text-white shadow-2xl space-y-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
              <Gift className="w-3.5 h-3.5" /> Free AI Toolkit
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-xs font-bold">You're Subscribed!</h4>
              <p className="text-[10px] text-slate-300">
                Check your inbox for your 100 AI Tools PDF guide.
              </p>
            </div>
          ) : (
            <>
              <h4 className="text-xs font-bold font-serif leading-snug">
                Get Weekly AI Research &amp; 100 Tools PDF Free
              </h4>
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder="Your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {loading ? "Joining..." : "Get Free Access →"}
                </button>
              </form>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-indigo-400/30"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Get Free 100 AI Tools PDF</span>
        </button>
      )}
    </div>
  );
}
