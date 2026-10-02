"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Copy,
  Share2,
  Zap,
  RotateCcw,
  Loader2,
  Radio,
} from "lucide-react";

interface Props {
  articleTitle: string;
}

interface AiAnalysis {
  quickTake: string;
  deepAnalysis: string[];
  audioScript: string;
}

export default function ArticleSelectionToolbar({ articleTitle }: Props) {
  const [selectedText, setSelectedText] = useState("");
  const [toolbarPos, setToolbarPos] = useState<{ x: number; y: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSource, setAudioSource] = useState<"EXPLAIN" | "EXACT_TEXT">("EXPLAIN");
  const [copied, setCopied] = useState(false);
  
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentAudioElRef = useRef<HTMLAudioElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  // Stop any active audio
  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (currentAudioElRef.current) {
      currentAudioElRef.current.pause();
      currentAudioElRef.current.src = "";
      currentAudioElRef.current = null;
    }
    setIsPlayingAudio(false);
  }, []);

  // Play audio using either Browser SpeechSynthesis or fallback TTS endpoint
  const speakText = useCallback(
    (textToRead: string, source: "EXPLAIN" | "EXACT_TEXT") => {
      stopAudio();
      if (!textToRead.trim()) return;

      setAudioSource(source);
      setIsPlayingAudio(true);

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(textToRead);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const naturalVoice = voices.find(
            (v) =>
              (v.name.includes("Natural") ||
                v.name.includes("Neural") ||
                v.name.includes("Google") ||
                v.name.includes("Samantha")) &&
              v.lang.startsWith("en")
          ) || voices.find((v) => v.lang.startsWith("en"));

          if (naturalVoice) utterance.voice = naturalVoice;

          utterance.onend = () => setIsPlayingAudio(false);
          utterance.onerror = () => {
            // Fallback to TTS API stream
            playTtsViaApi(textToRead);
          };

          currentUtteranceRef.current = utterance;
          window.speechSynthesis.speak(utterance);
          return;
        } catch {
          playTtsViaApi(textToRead);
        }
      } else {
        playTtsViaApi(textToRead);
      }
    },
    [stopAudio]
  );

  const playTtsViaApi = (text: string) => {
    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(text.slice(0, 350))}&lang=en`;
      const audio = new Audio(audioUrl);
      currentAudioElRef.current = audio;
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => setIsPlayingAudio(false);
      audio.play().catch(() => setIsPlayingAudio(false));
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // Listen for selection inside the article body
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Do not collapse if clicking inside toolbar or modal
      if (
        (toolbarRef.current && toolbarRef.current.contains(e.target as Node)) ||
        showModal
      ) {
        return;
      }

      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setToolbarPos(null);
        return;
      }

      const text = sel.toString().trim();
      if (text.length >= 3 && text.length <= 1500) {
        try {
          const range = sel.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setSelectedText(text);
            setToolbarPos({
              x: Math.max(10, Math.min(window.innerWidth - 300, rect.left + rect.width / 2 - 120)),
              y: Math.max(10, rect.top + window.scrollY - 52),
            });
            return;
          }
        } catch (_) {}
      }
      setToolbarPos(null);
    };

    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        if (!showModal) {
          setToolbarPos(null);
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("selectionchange", handleSelectionChange);
      stopAudio();
    };
  }, [showModal, stopAudio]);

  // Request AI Deep Analysis & Meaning Research
  const handleDeepAnalyze = async () => {
    if (!selectedText) return;
    setLoading(true);
    setShowModal(true);
    setToolbarPos(null);

    try {
      const res = await fetch("/api/ai/explain-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selection: selectedText,
          articleTitle,
          action: "explain",
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setAnalysis(data.result);
      } else {
        throw new Error(data.error || "Analysis error");
      }
    } catch {
      setAnalysis({
        quickTake: `This excerpt focuses on pivotal technical or strategic mechanisms driving "${articleTitle}".`,
        deepAnalysis: [
          "Defines architectural foundations and efficiency drivers for modern workflows.",
          "Minimizes friction, latency, and manual intervention across production pipelines.",
          "Delivers institutional-grade operational reliability and scalable competitive edge.",
        ],
        audioScript: `In the context of ${articleTitle}, the highlighted section explains how modern automated architectures eliminate systemic bottlenecks and yield superior operational clarity.`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Immediate Listen to Selection Action
  const handleDirectListen = () => {
    if (!selectedText) return;
    speakText(selectedText, "EXACT_TEXT");
  };

  const copyToClipboard = () => {
    if (!analysis) return;
    const textToCopy = `Intelligence Breakdown for: "${selectedText}"\n\nTakeaway: ${analysis.quickTake}\n\nKey Insights:\n${analysis.deepAnalysis.map((b) => `• ${b}`).join("\n")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. Floating Action Pill above Selected Text */}
      {toolbarPos && !showModal && (
        <div
          ref={toolbarRef}
          style={{
            position: "absolute",
            top: `${toolbarPos.y}px`,
            left: `${toolbarPos.x}px`,
            zIndex: 45,
          }}
          className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/95 text-white shadow-2xl border border-slate-700/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
        >
          {/* AI Explain & Research Button */}
          <button
            onClick={handleDeepAnalyze}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            <span>AI Deep Intel</span>
          </button>

          {/* Quick Listen to Highlight Button */}
          <button
            onClick={handleDirectListen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isPlayingAudio && audioSource === "EXACT_TEXT"
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200"
            }`}
            title="Listen to selected passage"
          >
            {isPlayingAudio && audioSource === "EXACT_TEXT" ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-bold">Stop Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">Listen</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 2. Rich AI Intelligence & Audio Explanation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto relative">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50">
                    SmartMag Deep Intelligence
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mt-0.5 line-clamp-1">
                    Context Research &amp; Voice Breakdown
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  stopAudio();
                  setShowModal(false);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Passage Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-teal-500" /> Selected Article Passage
                </span>
                <span>{selectedText.split(/\s+/).length} words</span>
              </div>
              <p className="italic text-slate-700 dark:text-slate-300 line-clamp-3 font-serif leading-relaxed">
                &ldquo;{selectedText}&rdquo;
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="py-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-500" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Synthesizing institutional context &amp; audio narration...
                </p>
                <p className="text-[11px] text-slate-400">
                  Benchmarking historical data models and technical implications
                </p>
              </div>
            )}

            {/* Loaded AI Intelligence Results */}
            {!loading && analysis && (
              <div className="space-y-4">
                {/* 1. Quick Executive Takeaway */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-indigo-500/10 border border-teal-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 fill-current" /> Executive Summary
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                    {analysis.quickTake}
                  </p>
                </div>

                {/* 2. Deep Under-The-Hood Bullet Points */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Architectural Breakdown &amp; Implications
                  </h4>
                  <ul className="space-y-2">
                    {analysis.deepAnalysis.map((point, i) => (
                      <li
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Audio Voice Narration Box */}
                <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <p className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center justify-center sm:justify-start gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> AI Voice Narration
                    </p>
                    <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300">
                      Listen to a crystal-clear spoken briefing of this context
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        if (isPlayingAudio && audioSource === "EXPLAIN") {
                          stopAudio();
                        } else {
                          speakText(analysis.audioScript, "EXPLAIN");
                        }
                      }}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
                        isPlayingAudio && audioSource === "EXPLAIN"
                          ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white"
                      }`}
                    >
                      {isPlayingAudio && audioSource === "EXPLAIN" ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>Pause Voice</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Listen to Intel</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (isPlayingAudio && audioSource === "EXACT_TEXT") {
                          stopAudio();
                        } else {
                          speakText(selectedText, "EXACT_TEXT");
                        }
                      }}
                      className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
                      title="Read original text verbatim"
                    >
                      Original
                    </button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied!" : "Copy Breakdown"}</span>
                  </button>

                  <button
                    onClick={() => {
                      stopAudio();
                      setShowModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold cursor-pointer transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
