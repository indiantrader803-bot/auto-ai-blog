"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles } from "lucide-react";

interface Props {
  title: string;
  content: string;
}

export default function ArticleAudioPlayer({ title, content }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1); // 1x speed
  const [supported, setSupported] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const cleanTextForSpeech = (text: string) => {
    // Strip markdown formatting, headers, links, and code blocks for smooth speech
    return text
      .replace(/```[\s\S]*?```/g, "Code snippet omitted.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handlePlayPause = () => {
    if (!supported) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel(); // Stop any previous speech
        const textToRead = `${title}. ${cleanTextForSpeech(content)}`;
        const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 4000));
        utterance.rate = rate;
        utterance.volume = isMuted ? 0 : 1;

        // Detect current language from Google Translate cookie or browser selection
        const match = document.cookie.match(/googtrans=\/en\/([a-z-A-Z]+)/);
        const selectedLang = match && match[1] ? match[1] : "en";
        utterance.lang = selectedLang === "bn" ? "bn-IN" : selectedLang === "hi" ? "hi-IN" : selectedLang === "es" ? "es-ES" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "zh-CN" ? "zh-CN" : selectedLang === "ja" ? "ja-JP" : selectedLang === "ar" ? "ar-SA" : selectedLang === "pt" ? "pt-BR" : selectedLang === "ru" ? "ru-RU" : "en-US";

        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleReset = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Refresh volume
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      }
    }
  };

  const cycleRate = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1;
    setRate(nextRate);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (!supported) return null;

  return (
    <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-slate-900/10 border border-indigo-500/20 dark:border-indigo-500/30 font-sans shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Player Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                AI Voice Audio Edition
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[9px] uppercase">
                HD Audio
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 line-clamp-1">
              Listen to full editorial breakdown
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Pause Audio
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Listen Now
              </>
            )}
          </button>

          <button
            onClick={cycleRate}
            className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Change Playback Speed"
          >
            {rate}x
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset Audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
