"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface ArticleContentExplainerProps {
  title: string;
  category?: string;
  content: string;
  excerpt?: string;
}

export default function ArticleContentExplainer({
  title,
  category = "Editorial Analysis",
  content,
  excerpt,
}: ArticleContentExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "breakdown" | "concepts">("overview");

  // Extract major themes/headers from the content
  const headers = content
    .split("\n")
    .filter((line) => line.startsWith("## ") && !line.includes("FAQ") && !line.includes("Frequently"))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .slice(0, 5);

  const keyConcepts = [
    {
      term: "Primary Core Thesis",
      explanation:
        excerpt ||
        `${title} establishes critical industry developments, structural execution challenges, and tactical implications for practitioners and investors.`,
    },
    {
      term: "Architectural & Real-World Impact",
      explanation:
        "Analyzes practical metrics, technical bottlenecks, operational benchmarks, and cost asymmetries rather than theoretical speculation.",
    },
    {
      term: "Strategic Takeaway & Action Plan",
      explanation:
        "Delivers verified recommendations, risk mitigation parameters, and step-by-step methodologies to navigate rapid shifts.",
    },
  ];

  return (
    <div className="my-8 rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 dark:from-slate-900/90 dark:via-slate-950 dark:to-indigo-950/40 p-5 sm:p-6 shadow-sm transition-all duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                AI Deep Intel Explainer
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {category}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
              Article Concept Breakdown &amp; Guided Explanation
            </h3>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-all cursor-pointer shrink-0"
          aria-expanded={isOpen}
        >
          <span>{isOpen ? "Hide Explanation" : "Explain This Article"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Explanation Details */}
      {isOpen && (
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-4 animate-in fade-in-50 duration-200">
          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold w-fit">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Plain English Overview
            </button>
            <button
              onClick={() => setActiveTab("breakdown")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "breakdown"
                  ? "bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Section Road Map ({headers.length})
            </button>
            <button
              onClick={() => setActiveTab("concepts")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "concepts"
                  ? "bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Core Principles
            </button>
          </div>

          {/* Tab 1: Plain English Overview */}
          {activeTab === "overview" && (
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>What This Article Explains:</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                This comprehensive report evaluates <strong className="text-slate-900 dark:text-white">&ldquo;{title}&rdquo;</strong> from an authoritative analytical perspective. Readers are guided through real-world deployment metrics, architectural trade-offs, and critical data points without high-level promotional fluff.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Fact-checked by SmartMag Editorial Desk
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  Independent peer-reviewed findings
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Section Breakdown */}
          {activeTab === "breakdown" && (
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Key Chapter Modules:</span>
              </h4>
              <div className="space-y-2">
                {headers.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Core Principles */}
          {activeTab === "concepts" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {keyConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    {item.term}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
