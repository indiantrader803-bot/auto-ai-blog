"use client";

import { useState } from "react";
import Link from "next/link";
import { AppleProduct, APPLE_PRODUCTS } from "@/data/appleData";
import { GitCompare, Check, X, Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Trophy } from "lucide-react";

export default function ComparisonEngine() {
  const iphones = APPLE_PRODUCTS.filter((p) => p.category === "iphone");

  const [modelAId, setModelAId] = useState<string>("iphone-18-pro-max");
  const [modelBId, setModelBId] = useState<string>("iphone-17-pro-max");

  const modelA = iphones.find((p) => p.id === modelAId) || iphones[0];
  const modelB = iphones.find((p) => p.id === modelBId) || iphones[3] || iphones[1];

  const comparisonRows = [
    {
      feature: "Starting Price (India)",
      valA: `₹${modelA.startingPriceInr.toLocaleString("en-IN")}`,
      valB: `₹${modelB.startingPriceInr.toLocaleString("en-IN")}`,
      winner: modelA.startingPriceInr <= modelB.startingPriceInr ? "A" : "B",
      explanation: "Includes base storage tier before bank discounts",
    },
    {
      feature: "Processor & Architecture",
      valA: modelA.specs.chip,
      valB: modelB.specs.chip,
      winner: modelA.releaseYear >= modelB.releaseYear ? "A" : "B",
      explanation: "CPU & GPU compute speed, hardware ray-tracing, and NPU tokens/sec",
    },
    {
      feature: "Display & Peak Brightness",
      valA: modelA.specs.display,
      valB: modelB.specs.display,
      winner: "A",
      explanation: "Outdoor readability under direct sunlight and refresh rate smoothness",
    },
    {
      feature: "Primary Camera System",
      valA: modelA.specs.camera,
      valB: modelB.specs.camera,
      winner: modelA.id === "iphone-18-pro-max" || modelA.id === "iphone-18-pro" ? "A" : "B",
      explanation: "Optical aperture control, low-light noise reduction, and periscope zoom range",
    },
    {
      feature: "Battery Endurance & Charging",
      valA: modelA.specs.battery,
      valB: modelB.specs.battery,
      winner: "A",
      explanation: "Video playback hours and MagSafe Qi2 wireless charging wattage",
    },
    {
      feature: "Apple Intelligence & AI Suite",
      valA: modelA.specs.aiFeatures,
      valB: modelB.specs.aiFeatures,
      winner: "A",
      explanation: "On-device diffusion models, real-time voice translation, and smart canvas",
    },
    {
      feature: "Weight & Ergonomics",
      valA: modelA.specs.weight,
      valB: modelB.specs.weight,
      winner: parseInt(modelA.specs.weight) <= parseInt(modelB.specs.weight) ? "A" : "B",
      explanation: "Single-handed palm fatigue during prolonged reading or gaming",
    },
  ];

  return (
    <section id="comparison-engine" className="py-20 bg-black text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
            <GitCompare className="w-3.5 h-3.5" /> Interactive Comparison Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Compare Every iPhone Spec Side-by-Side.
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base font-light">
            Select two models below to instantly analyze real-world performance differences, optical camera advances, battery life, and pricing in India.
          </p>
        </div>

        {/* Model Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Model A Selector Card */}
          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono font-bold text-zinc-400">Select Model A:</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold">Primary</span>
            </div>
            <select
              value={modelAId}
              onChange={(e) => setModelAId(e.target.value)}
              className="w-full bg-zinc-800 border border-white/20 rounded-2xl px-4 py-3 text-white text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {iphones.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₹{p.startingPriceInr.toLocaleString("en-IN")})
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-zinc-400">Best Online Price:</span>
              <span className="text-base font-black text-emerald-400 font-mono">
                ₹{modelA.startingPriceInr.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Model B Selector Card */}
          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono font-bold text-zinc-400">Select Model B:</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300 font-mono font-bold">Compare Against</span>
            </div>
            <select
              value={modelBId}
              onChange={(e) => setModelBId(e.target.value)}
              className="w-full bg-zinc-800 border border-white/20 rounded-2xl px-4 py-3 text-white text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {iphones.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₹{p.startingPriceInr.toLocaleString("en-IN")})
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-zinc-400">Best Online Price:</span>
              <span className="text-base font-black text-emerald-400 font-mono">
                ₹{modelB.startingPriceInr.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-900/90 text-xs uppercase font-mono tracking-wider text-zinc-400">
                  <th className="p-4 sm:p-5 w-1/4">Key Specification</th>
                  <th className="p-4 sm:p-5 w-3/8 text-white font-bold bg-indigo-950/20 border-r border-white/5">
                    <div className="flex items-center gap-2">
                      <span>{modelA.shortName}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500 text-white font-mono">Model A</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 w-3/8 text-zinc-300 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{modelB.shortName}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">Model B</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 align-top">
                      <div className="font-bold text-white text-xs sm:text-sm">{row.feature}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{row.explanation}</div>
                    </td>
                    <td className="p-4 sm:p-5 align-top bg-indigo-950/10 border-r border-white/5">
                      <div className="flex items-start gap-2">
                        {row.winner === "A" && (
                          <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                        <span className="text-zinc-200 text-xs sm:text-sm leading-relaxed">{row.valA}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 align-top">
                      <div className="flex items-start gap-2">
                        {row.winner === "B" && (
                          <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                        <span className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{row.valB}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Buy CTA Footer on Table */}
          <div className="p-5 sm:p-6 bg-zinc-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase font-mono text-zinc-400">TheSmartMag Verdict:</div>
              <div className="text-sm font-medium text-zinc-200 mt-0.5">
                {modelA.releaseYear > modelB.releaseYear
                  ? `${modelA.shortName} offers unmatched 2nm silicon efficiency & superior optics. ${modelB.shortName} remains great if bought at clearance prices.`
                  : `Both models showcase Apple's elite engineering. Pick ${modelA.shortName} for premium titanium & zoom or ${modelB.shortName} for lighter everyday portability.`}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/apple/iphone-18-vs-iphone-17-pro-max"
                className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all"
              >
                Read Flagship Head-to-Head
              </Link>

              <Link
                href={`/apple/${modelA.slug}`}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Buy {modelA.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
