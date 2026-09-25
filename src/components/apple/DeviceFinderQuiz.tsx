"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Star, HelpCircle } from "lucide-react";
import { APPLE_PRODUCTS, AppleProduct } from "@/data/appleData";

interface QuizAnswers {
  budget: "under-70k" | "70k-100k" | "100k-140k" | "above-140k";
  priority: "camera" | "battery" | "gaming" | "portability" | "coding";
  formFactor: "phone" | "laptop" | "tablet" | "wearable";
}

export default function DeviceFinderQuiz() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    budget: "above-140k",
    priority: "camera",
    formFactor: "phone",
  });
  const [result, setResult] = useState<AppleProduct | null>(null);

  const calculateRecommendation = () => {
    let matchId = "iphone-18-pro-max";

    if (answers.formFactor === "laptop") {
      matchId = "macbook-pro-m5";
    } else if (answers.formFactor === "tablet") {
      matchId = "ipad-pro-m4";
    } else if (answers.formFactor === "wearable") {
      matchId = "apple-watch-ultra-3";
    } else {
      // Phone
      if (answers.budget === "under-70k") {
        matchId = "iphone-18"; // or entry
      } else if (answers.budget === "70k-100k") {
        matchId = "iphone-18";
      } else if (answers.budget === "100k-140k") {
        if (answers.priority === "battery" || answers.priority === "camera") {
          matchId = "iphone-17-pro-max";
        } else {
          matchId = "iphone-18-pro";
        }
      } else {
        // Above 140k
        matchId = "iphone-18-pro-max";
      }
    }

    const found = APPLE_PRODUCTS.find((p) => p.id === matchId) || APPLE_PRODUCTS[0];
    setResult(found);
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <section id="device-finder" className="py-20 bg-black text-white border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Device Matcher
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Which Apple Device Fits You?
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base font-light">
            Answer 3 quick questions. Our algorithmic selector analyzes your workload, budget, and camera priorities to suggest the exact best device.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl shadow-2xl">
          {step < 4 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs font-mono text-zinc-400">
              <span>Question {step} of 3</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      step >= i ? "w-6 bg-white" : "w-2 bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Form Factor */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                What type of device are you primarily looking for?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "phone", label: "iPhone", desc: "Flagship daily smartphone for photography & communication" },
                  { id: "laptop", label: "MacBook", desc: "Pro laptop for coding, video editing & high battery life" },
                  { id: "tablet", label: "iPad", desc: "Tandem OLED tablet for digital illustration & note-taking" },
                  { id: "wearable", label: "Apple Watch / Audio", desc: "Extreme durability GPS watch or noise-cancelling AirPods" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswers({ ...answers, formFactor: opt.id as any });
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      answers.formFactor === opt.id
                        ? "bg-white text-black border-white"
                        : "bg-zinc-800/60 hover:bg-zinc-800 text-white border-white/10"
                    }`}
                  >
                    <div className="font-bold text-sm sm:text-base">{opt.label}</div>
                    <div className={`text-xs mt-1 ${answers.formFactor === opt.id ? "text-zinc-700" : "text-zinc-400"}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Budget */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                What is your estimated target budget?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "under-70k", label: "Under ₹70,000", desc: "Best value entry into the modern Apple ecosystem" },
                  { id: "70k-100k", label: "₹70,000 – ₹1,00,000", desc: "Mainstream flagships & lightweight MacBook Air" },
                  { id: "100k-140k", label: "₹1,00,000 – ₹1,40,000", desc: "Pro-tier performance with zoom cameras & high refresh rate" },
                  { id: "above-140k", label: "₹1,40,000+ (No Compromises)", desc: "Top-of-the-line Pro Max, M5 silicon & titanium build" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswers({ ...answers, budget: opt.id as any });
                      setStep(3);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      answers.budget === opt.id
                        ? "bg-white text-black border-white"
                        : "bg-zinc-800/60 hover:bg-zinc-800 text-white border-white/10"
                    }`}
                  >
                    <div className="font-bold text-sm sm:text-base">{opt.label}</div>
                    <div className={`text-xs mt-1 ${answers.budget === opt.id ? "text-zinc-700" : "text-zinc-400"}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  ← Back to Previous Question
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Priority */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                What feature matters most to your workflow?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "camera", label: "Optical Camera & 4K Cinema", desc: "Mechanical variable aperture, 5x periscope zoom & ProRes Log" },
                  { id: "battery", label: "Maximum Battery Stamina", desc: "Full day+ heavy multi-tasking without recharging" },
                  { id: "gaming", label: "Gaming & AI Intelligence", desc: "Hardware ray-tracing, 2nm A20 Pro & local neural models" },
                  { id: "coding", label: "High Compute & Productivity", desc: "Multi-core compiling, 40-core GPU & high RAM capacity" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswers({ ...answers, priority: opt.id as any });
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      answers.priority === opt.id
                        ? "bg-white text-black border-white"
                        : "bg-zinc-800/60 hover:bg-zinc-800 text-white border-white/10"
                    }`}
                  >
                    <div className="font-bold text-sm sm:text-base">{opt.label}</div>
                    <div className={`text-xs mt-1 ${answers.priority === opt.id ? "text-zinc-700" : "text-zinc-400"}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  ← Back
                </button>

                <button
                  onClick={calculateRecommendation}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                >
                  <span>Reveal My Match</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RESULT */}
          {step === 4 && result && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider">
                  🎯 98% Match to Your Preferences
                </span>

                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
                <div className="sm:col-span-4 aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 relative">
                  <img
                    src={result.heroImage}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-8 space-y-3">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {result.name}
                  </h4>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {result.tagline}
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-baseline justify-between">
                    <span className="text-xs text-zinc-400 font-mono">Effective Online Price:</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">
                      ₹{result.startingPriceInr.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-400">
                    {result.keyHighlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/apple/${result.slug}`}
                      className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>View Deals &amp; Retailers</span>
                    </Link>

                    <Link
                      href="/apple/deals"
                      className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all"
                    >
                      Check Bank Offers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
