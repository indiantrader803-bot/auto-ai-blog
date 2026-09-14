"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Plane,
  Clock,
  Euro,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { trackTravelpayoutsClick } from "@/lib/affiliate/travelpayouts";

export default function FlightCompensationCalculator() {
  const [delayType, setDelayType] = useState<"delayed" | "cancelled" | "overbooked">("delayed");
  const [flightDistance, setFlightDistance] = useState<"short" | "medium" | "long">("long");
  const [flightYear, setFlightYear] = useState("2026");

  // Calculate estimated compensation based on EU EC 261 / UK 261 rules
  const getPayoutAmount = () => {
    if (flightDistance === "short") return 250; // Under 1,500 km
    if (flightDistance === "medium") return 400; // 1,500 km - 3,500 km
    return 600; // Over 3,500 km
  };

  const payout = getPayoutAmount();

  const handleStartClaim = (service: "airhelp" | "compensair") => {
    trackTravelpayoutsClick(service, {
      delayType,
      flightDistance,
      estimatedPayout: payout,
      action: "FLIGHT_COMPENSATION_CALCULATOR",
    });

    const targetUrl =
      service === "airhelp"
        ? "https://airhelp.tpo.li/fpMMLvXF"
        : "https://compensair.tpo.li/nwEzrtjW";

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="my-14 rounded-3xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden font-sans">
      {/* Glow Decor */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Explanation Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[11px] font-black uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            <span>EU EC 261 &amp; UK 261 Legal Passenger Rights</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-tight">
            Flight Delayed, Cancelled or Overbooked? Claim Up To €600 / $650
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Airlines are legally required to pay cash compensation for flights delayed over 3 hours or cancelled within the last 6 years. No win, no fee legal claim processing with 98% court success rate.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Covers flights from past 6 years</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero upfront payment or fee</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Missed connections included</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct bank wire payout</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Calculator Box */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Instant Compensation Estimator
            </span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Check
            </span>
          </div>

          <div className="space-y-4 my-5">
            {/* Delay Type Selectors */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                What happened to your flight?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "delayed", label: "Delayed 3h+" },
                  { id: "cancelled", label: "Cancelled" },
                  { id: "overbooked", label: "Denied Boarding" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setDelayType(type.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                      delayType === type.id
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Distance */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Flight Distance / Route
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "short", label: "< 1,500 km", sub: "Domestic / Short" },
                  { id: "medium", label: "1,500 - 3,500 km", sub: "Intra-Europe" },
                  { id: "long", label: "> 3,500 km", sub: "Long-Haul / Intl" },
                ].map((dist) => (
                  <button
                    key={dist.id}
                    type="button"
                    onClick={() => setFlightDistance(dist.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-left transition-all ${
                      flightDistance === dist.id
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{dist.label}</div>
                    <div className="text-[10px] opacity-80">{dist.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-emerald-500/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                Estimated Legal Payout
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                €{payout} <span className="text-xs text-slate-400 font-normal">/ passenger</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                Guaranteed Law
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleStartClaim("airhelp")}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Check via AirHelp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleStartClaim("compensair")}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Check via Compensair</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
