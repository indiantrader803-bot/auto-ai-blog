"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, Languages } from "lucide-react";

interface Props {
  title: string;
  content: string;
}

export default function ArticleAudioPlayer({ title, content }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1); // 1x, 1.25x, 1.5x
  const [supported, setSupported] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("English (US)");
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);

  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);

      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  const cleanText = (text: string) => {
    return text
      .replace(/`[\s\S]*?`/g, " ")
      .replace(/([^]+)/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "")
      .replace(/[#*_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getActiveTextAndLanguage = () => {
    let textToRead = "";
    // Check if DOM has translated article text
    const articleTitleEl = document.querySelector("h1");
    const articleBodyEl = document.querySelector(".prose") || document.querySelector("article");

    const liveTitle = articleTitleEl ? articleTitleEl.innerText.trim() : title;
    const liveBody = articleBodyEl ? (articleBodyEl as HTMLElement).innerText.trim() : cleanText(content);

    textToRead = `${liveTitle}. ${liveBody}`;

    // Read language from Google Translate cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z_-]+)/);
    const langCode = match && match[1] ? match[1].toLowerCase() : "en";

    const langMap: Record<string, { code: string; name: string }> = {
      bn: { code: "bn-IN", name: "বাংলা (Bengali)" },
      hi: { code: "hi-IN", name: "हिन्दी (Hindi)" },
      es: { code: "es-ES", name: "Español (Spanish)" },
      fr: { code: "fr-FR", name: "Français (French)" },
      de: { code: "de-DE", name: "Deutsch (German)" },
      "zh-cn": { code: "zh-CN", name: "中文 (Chinese Simplified)" },
      "zh-tw": { code: "zh-TW", name: "繁體中文 (Chinese Traditional)" },
      ja: { code: "ja-JP", name: "日本語 (Japanese)" },
      ko: { code: "ko-KR", name: "한국어 (Korean)" },
      ar: { code: "ar-SA", name: "العربية (Arabic)" },
      pt: { code: "pt-BR", name: "Português (Portuguese)" },
      ru: { code: "ru-RU", name: "Русский (Russian)" },
      it: { code: "it-IT", name: "Italiano (Italian)" },
      nl: { code: "nl-NL", name: "Nederlands (Dutch)" },
      tr: { code: "tr-TR", name: "Türkçe (Turkish)" },
      vi: { code: "vi-VN", name: "Tiếng Việt (Vietnamese)" },
      th: { code: "th-TH", name: "ไทย (Thai)" },
      id: { code: "id-ID", name: "Bahasa Indonesia" },
      pl: { code: "pl-PL", name: "Polski (Polish)" },
      en: { code: "en-US", name: "English (US)" },
    };

    const target = langMap[langCode] || { code: "en-US", name: "English (US)" };
    setDetectedLanguage(target.name);

    return { text: textToRead, langCode: target.code, baseLang: langCode };
  };

  // Chunk text into short natural sentences to prevent SpeechSynthesis freeze bug
  const createChunks = (text: string): string[] => {
    const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > 180) {
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += " " + sentence;
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    return chunks.length > 0 ? chunks : [text.slice(0, 300)];
  };

  const playChunk = (index: number, langCode: string, baseLang: string) => {
    if (!isPlayingRef.current || index >= chunksRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
      return;
    }

    chunkIndexRef.current = index;
    setCurrentChunkIndex(index);

    const chunkText = chunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.lang = langCode;
    utterance.rate = rate;
    utterance.volume = isMuted ? 0 : 1;

    // Pick best matching native voice
    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(baseLang) ||
        v.lang.toLowerCase().replace("_", "-") === langCode.toLowerCase()
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        playChunk(index + 1, langCode, baseLang);
      }
    };

    utterance.onerror = (e) => {
      console.warn("Speech chunk note:", e);
      if (isPlayingRef.current) {
        playChunk(index + 1, langCode, baseLang);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (!supported) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      window.speechSynthesis.cancel();
      const { text, langCode, baseLang } = getActiveTextAndLanguage();
      const chunks = createChunks(text);
      chunksRef.current = chunks;
      setTotalChunks(chunks.length);
      chunkIndexRef.current = 0;
      setCurrentChunkIndex(0);

      isPlayingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);

      playChunk(0, langCode, baseLang);
    }
  };

  const handleReset = () => {
    if (!supported) return;
    isPlayingRef.current = false;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying) {
      handleReset();
    }
  };

  const cycleRate = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1;
    setRate(nextRate);
    if (isPlaying) {
      handleReset();
    }
  };

  if (!supported) return null;

  const progressPercent = totalChunks > 0 ? Math.round(((currentChunkIndex + 1) / totalChunks) * 100) : 0;

  return (
    <div className="my-6 p-4.5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white border border-indigo-500/30 shadow-xl font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        {/* Left: Player Info & Active Translation Badge */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
                AI Voice Audio Edition
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] border border-indigo-500/30">
                <Languages className="w-3 h-3" /> {detectedLanguage}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-medium line-clamp-1">
              Listen to full translated editorial narration in real-time
            </p>
          </div>
        </div>

        {/* Right: Audio Controls */}
        <div className="flex items-center gap-2 justify-end">
          {/* Speed Toggle */}
          <button
            onClick={cycleRate}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all"
            title="Narration Speed"
          >
            {rate}x
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 transition-all"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Reset / Stop Button */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition-all"
            title="Stop & Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{isPaused ? "Resume" : "Listen Now"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Audio Progress Bar */}
      {isPlaying && (
        <div className="mt-3.5 relative z-10">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
            <span>Speaking chunk {currentChunkIndex + 1} of {totalChunks}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
