"use client";

import { useState } from "react";
import { Wand2, Sparkles, Sliders, Globe, Video, FileText, CheckCircle2 } from "lucide-react";
import GenerationProgressModal from "@/components/admin/GenerationProgressModal";

export default function GeneratorStudioPage() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("Artificial Intelligence & Autonomous Agents");
  const [category, setCategory] = useState("Artificial Intelligence");
  const [tone, setTone] = useState<any>("informative");
  const [targetWordCount, setTargetWordCount] = useState("1600");
  const [includeVideo, setIncludeVideo] = useState(true);
  const [autoPublish, setAutoPublish] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [currentStep, setCurrentStep] = useState("SCOUTING");
  const [progressPercent, setProgressPercent] = useState(10);
  const [modalMessage, setModalMessage] = useState("");
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setIsModalOpen(true);
    setPipelineStatus("running");
    setCurrentStep("SCOUTING");
    setProgressPercent(15);
    setModalMessage("Scouting trending topics & headlines...");
    setGeneratedPost(null);
    setErrorMessage("");

    // Simulate animated step transitions while backend processes
    const stepTimer1 = setTimeout(() => {
      setCurrentStep("WRITING");
      setProgressPercent(40);
      setModalMessage("Drafting deep SEO long-form article via AI Engine...");
    }, 2500);

    const stepTimer2 = setTimeout(() => {
      setCurrentStep("MEDIA");
      setProgressPercent(65);
      setModalMessage("Matching HD visual art and photo credits...");
    }, 5500);

    const stepTimer3 = setTimeout(() => {
      setCurrentStep("VIDEO");
      setProgressPercent(80);
      setModalMessage("Embedding contextual tutorial video...");
    }, 8500);

    const stepTimer4 = setTimeout(() => {
      setCurrentStep("SEO");
      setProgressPercent(90);
      setModalMessage("Injecting FAQ JSON-LD schemas and affiliate keywords...");
    }, 10500);

    try {
      const res = await fetch("/api/pipeline/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim() || undefined,
          niche,
          category,
          tone,
          targetWordCount,
          includeVideo,
          autoPublish,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);

      const json = await res.json();

      if (res.ok && json.success) {
        setPipelineStatus("success");
        setCurrentStep("PUBLISHING");
        setProgressPercent(100);
        setModalMessage("Article published and indexed successfully!");
        setGeneratedPost(json.post);
      } else {
        setPipelineStatus("error");
        setCurrentStep("FAILED");
        setProgressPercent(100);
        setErrorMessage(json.error || "Generation encountered an issue.");
      }
    } catch (err: any) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);
      setPipelineStatus("error");
      setErrorMessage(err.message || "Failed to trigger pipeline API.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-5xl mx-auto w-full">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" /> AI Engine Studio
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Generate New Blog Article
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Trigger the multi-stage autonomous pipeline to research, write, enrich with images/videos, and publish instantly.
        </p>
      </header>

      {/* One-Click Quick Auto Trend Runner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl">
        <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            <h2 className="text-lg sm:text-xl font-extrabold">Autonomous Auto-Pilot Mode</h2>
          </div>
          <p className="text-xs sm:text-sm text-indigo-200/80 max-w-lg">
            Let the engine discover what&apos;s trending on Google Trends & RSS right now, craft an authoritative 1,600+ word deep dive, and publish with media.
          </p>
        </div>
        <button
          onClick={() => {
            setTopic("");
            handleGenerate();
          }}
          className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Wand2 className="w-4 h-4" /> 1-Click Auto Trend Post
        </button>
      </div>

      {/* Custom Parameters Form */}
      <form
        onSubmit={handleGenerate}
        className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
          <Sliders className="w-4 h-4 text-indigo-600" /> Custom Article Configuration
        </div>

        {/* Custom Topic Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Target Topic / Headline Focus (Optional)
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Leave empty for auto trending topic discovery (e.g. 'DeepSeek SLM Architectures')"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
          />
        </div>

        {/* Niche & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Niche Context
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Autonomous AI, SaaS, Cloud"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Technology">Technology & Gadgets</option>
              <option value="Development & Engineering">Development & Engineering</option>
              <option value="Finance & Markets">Finance & Markets</option>
              <option value="Productivity & Workflow">Productivity & Workflow</option>
            </select>
          </div>
        </div>

        {/* Tone & Word Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Tone of Voice
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="informative">Informative & Deep Research</option>
              <option value="engaging">Engaging & Conversational</option>
              <option value="authoritative">Authoritative & Technical</option>
              <option value="analytical">Analytical & Data-Driven</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Target Word Count
            </label>
            <select
              value={targetWordCount}
              onChange={(e) => setTargetWordCount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="1200">1,200 words (Fast Read)</option>
              <option value="1600">1,600 words (Standard Deep Dive)</option>
              <option value="2200">2,200 words (Comprehensive Guide)</option>
              <option value="3000">3,000 words (Ultimate Pillar Post)</option>
            </select>
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-slate-100 dark:border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeVideo}
              onChange={(e) => setIncludeVideo(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Search & Embed YouTube Explainer Video</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={autoPublish}
              onChange={(e) => setAutoPublish(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Publish Immediately (Else save as Draft)</span>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4" /> Start Custom AI Generation Pipeline
          </button>
        </div>
      </form>

      {/* Real-time Multi-Step Progress Modal */}
      <GenerationProgressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={pipelineStatus}
        currentStep={currentStep}
        progressPercent={progressPercent}
        message={modalMessage}
        generatedPost={generatedPost}
        error={errorMessage}
      />
    </div>
  );
}
