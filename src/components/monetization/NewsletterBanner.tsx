"use client";

import { useState } from "react";
import { Mail, CheckCircle, Sparkles, Loader2 } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Failed to subscribe.");
      }
    } catch (e: any) {
      setStatus("error");
      setMsg("Connection error. Try again.");
    }
  };

  return (
    <div className="my-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-indigo-500/30">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          Autonomous Daily AI Briefing
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Stay Ahead of the Exponential Curve
        </h2>
        <p className="text-sm text-indigo-200/80 leading-relaxed">
          Join 25,000+ engineers, founders, and investors receiving our daily AI-curated intelligence reports with zero fluff.
        </p>

        {status === "success" ? (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center gap-2 text-emerald-300 text-sm font-semibold">
            <CheckCircle className="w-5 h-5" />
            {msg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-indigo-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe Free"
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-rose-400 font-medium">{msg}</p>
        )}

        <p className="text-[11px] text-indigo-300/50">
          No spam ever. Unsubscribe with 1-click anytime.
        </p>
      </div>
    </div>
  );
}
