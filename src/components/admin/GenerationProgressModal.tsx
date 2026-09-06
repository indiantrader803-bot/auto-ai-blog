"use client";

import { CheckCircle2, Loader2, Sparkles, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

interface GenerationProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "idle" | "running" | "success" | "error";
  currentStep: string;
  progressPercent: number;
  message: string;
  generatedPost?: { id: string; title: string; slug: string } | null;
  error?: string;
}

const STEPS = [
  { key: "SCOUTING", label: "Trend & RSS Topic Scout" },
  { key: "WRITING", label: "Gemini AI Long-Form Article" },
  { key: "MEDIA", label: "HD Image & AI Art Generation" },
  { key: "VIDEO", label: "Contextual YouTube Video Embed" },
  { key: "SEO", label: "SEO Schemas & Affiliate Rules" },
  { key: "PUBLISHING", label: "Database Indexing & Publishing" },
];

export default function GenerationProgressModal({
  isOpen,
  onClose,
  status,
  currentStep,
  progressPercent,
  message,
  generatedPost,
  error,
}: GenerationProgressModalProps) {
  if (!isOpen) return null;

  const getStepStatus = (stepKey: string, index: number) => {
    const activeIndex = STEPS.findIndex((s) => s.key === currentStep);
    if (status === "success") return "done";
    if (status === "error" && currentStep === stepKey) return "error";
    if (activeIndex === -1) return "pending";
    if (index < activeIndex) return "done";
    if (index === activeIndex) return "active";
    return "pending";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Auto AI Blog Pipeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Autonomous multi-agent generation engine
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>{message || "Processing pipeline steps..."}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                status === "error"
                  ? "bg-rose-500"
                  : status === "success"
                  ? "bg-emerald-500"
                  : "bg-indigo-600"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step list */}
        <div className="space-y-3 pt-2">
          {STEPS.map((s, idx) => {
            const stepState = getStepStatus(s.key, idx);
            return (
              <div
                key={s.key}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  stepState === "active"
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200"
                    : stepState === "done"
                    ? "border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200"
                    : stepState === "error"
                    ? "border-rose-500/50 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200"
                    : "border-slate-100 dark:border-slate-800/80 text-slate-400 opacity-60"
                }`}
              >
                <span className="text-xs font-medium">{s.label}</span>
                {stepState === "active" && (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                )}
                {stepState === "done" && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
                {stepState === "error" && (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {status === "error" && error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-medium">
            {error}
          </div>
        )}

        {/* Success Action CTA */}
        {status === "success" && generatedPost && (
          <div className="pt-2 space-y-3">
            <Link
              href={`/blog/${generatedPost.slug}`}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all"
            >
              View Published Article Live <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close & Return to Studio
            </button>
          </div>
        )}

        {status === "error" && (
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
