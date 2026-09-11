"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, Languages, Radio, Check } from "lucide-react";

interface Props {
  title: string;
  content: string;
}

export default function ArticleAudioPlayer({ title, content }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1); // 1x, 1.25x, 1.5x
  const [supported, setSupported] = useState(true);
  const [detectedLanguage, setDetectedLanguage] = useState("English (US)");
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [audioEngine, setAudioEngine] = useState<"NEURAL_CLOUD" | "BROWSER_SPEECH">("NEURAL_CLOUD");

  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const currentAudioElRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    isPlayingRef.current = false;
    if (currentAudioElRef.current) {
      currentAudioElRef.current.pause();
      currentAudioElRef.current.src = "";
      currentAudioElRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*_-]/g, " ")
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[\{\}\[\]\<\>\/\\~|\^]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getActiveTextAndLanguage = () => {
    let textToRead = "";
    const articleTitleEl = document.querySelector("h1");
    const articleBodyEl = document.querySelector(".prose") || document.querySelector("article");

    const liveTitle = articleTitleEl ? articleTitleEl.innerText.trim() : title;
    const liveBody = articleBodyEl ? (articleBodyEl as HTMLElement).innerText.trim() : cleanTextForSpeech(content);

    textToRead = `${liveTitle}. ${liveBody}`;

    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z_-]+)/);
    const langCode = match && match[1] ? match[1].toLowerCase() : "en";

    const langMap: Record<string, { bcp47: string; name: string; ttsCode: string }> = {
      bn: { bcp47: "bn-IN", name: "বাংলা (Bengali)", ttsCode: "bn" },
      hi: { bcp47: "hi-IN", name: "हिन्दी (Hindi)", ttsCode: "hi" },
      es: { bcp47: "es-ES", name: "Español (Spanish)", ttsCode: "es" },
      fr: { bcp47: "fr-FR", name: "Français (French)", ttsCode: "fr" },
      de: { bcp47: "de-DE", name: "Deutsch (German)", ttsCode: "de" },
      "zh-cn": { bcp47: "zh-CN", name: "中文 (Chinese)", ttsCode: "zh-CN" },
      "zh-tw": { bcp47: "zh-TW", name: "繁體中文 (Chinese)", ttsCode: "zh-TW" },
      ja: { bcp47: "ja-JP", name: "日本語 (Japanese)", ttsCode: "ja" },
      ko: { bcp47: "ko-KR", name: "한국어 (Korean)", ttsCode: "ko" },
      ar: { bcp47: "ar-SA", name: "العربية (Arabic)", ttsCode: "ar" },
      pt: { bcp47: "pt-BR", name: "Português (Portuguese)", ttsCode: "pt" },
      ru: { bcp47: "ru-RU", name: "Русский (Russian)", ttsCode: "ru" },
      it: { bcp47: "it-IT", name: "Italiano (Italian)", ttsCode: "it" },
      nl: { bcp47: "nl-NL", name: "Nederlands (Dutch)", ttsCode: "nl" },
      tr: { bcp47: "tr-TR", name: "Türkçe (Turkish)", ttsCode: "tr" },
      vi: { bcp47: "vi-VN", name: "Tiếng Việt (Vietnamese)", ttsCode: "vi" },
      th: { bcp47: "th-TH", name: "ไทย (Thai)", ttsCode: "th" },
      id: { bcp47: "id-ID", name: "Bahasa Indonesia", ttsCode: "id" },
      pl: { bcp47: "pl-PL", name: "Polski (Polish)", ttsCode: "pl" },
      en: { bcp47: "en-US", name: "English (US)", ttsCode: "en" },
    };

    const target = langMap[langCode] || { bcp47: "en-US", name: "English (US)", ttsCode: "en" };
    setDetectedLanguage(target.name);

    return { text: cleanTextForSpeech(textToRead), bcp47: target.bcp47, ttsCode: target.ttsCode, baseLang: langCode };
  };

  const createChunks = (text: string): string[] => {
    // Split by standard punctuation including Bengali/Hindi purna viram (।), Asian full stops (。), and commas
    const sentences = text.match(/[^.!?\n।。]+[.!?\n।。]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
      const clean = sentence.trim();
      if (!clean) continue;

      if ((currentChunk + " " + clean).length > 140) {
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        currentChunk = clean;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${clean}` : clean;
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    return chunks.length > 0 ? chunks : [text.slice(0, 200)];
  };

  // 1. Studio Neural Cloud TTS Streamer (Flawless Native Accent for All Languages)
  const playNeuralCloudChunk = (index: number, ttsCode: string, bcp47: string, baseLang: string) => {
    if (!isPlayingRef.current || index >= chunksRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
      return;
    }

    chunkIndexRef.current = index;
    setCurrentChunkIndex(index);

    const chunkText = chunksRef.current[index];
    const encodedText = encodeURIComponent(chunkText.slice(0, 160));
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${ttsCode}&client=tw-ob&q=${encodedText}`;

    const audio = new Audio(audioUrl);
    audio.playbackRate = rate;
    audio.volume = isMuted ? 0 : 1;
    currentAudioElRef.current = audio;

    audio.onended = () => {
      if (isPlayingRef.current) {
        playNeuralCloudChunk(index + 1, ttsCode, bcp47, baseLang);
      }
    };

    audio.onerror = () => {
      // Fallback to browser voice if network audio stream is blocked
      console.warn("Neural audio stream note, switching to browser synthesis voice...");
      playBrowserVoiceChunk(index, bcp47, baseLang);
    };

    audio.play().catch(() => {
      playBrowserVoiceChunk(index, bcp47, baseLang);
    });
  };

  // 2. High-Fidelity Browser Speech Synthesis Engine
  const playBrowserVoiceChunk = (index: number, bcp47: string, baseLang: string) => {
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
    utterance.lang = bcp47;
    utterance.rate = rate === 1 ? 0.95 : rate; // slightly paced for clear natural diction
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : 1;

    // Pick top native voice for this specific language
    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(baseLang) ||
        v.lang.toLowerCase().replace("_", "-") === bcp47.toLowerCase() ||
        v.name.toLowerCase().includes(baseLang)
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        playBrowserVoiceChunk(index + 1, bcp47, baseLang);
      }
    };

    utterance.onerror = () => {
      if (isPlayingRef.current) {
        playBrowserVoiceChunk(index + 1, bcp47, baseLang);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        if (audioEngine === "NEURAL_CLOUD" && currentAudioElRef.current) {
          currentAudioElRef.current.play();
        } else if (window.speechSynthesis) {
          window.speechSynthesis.resume();
        }
        setIsPaused(false);
      } else {
        if (audioEngine === "NEURAL_CLOUD" && currentAudioElRef.current) {
          currentAudioElRef.current.pause();
        } else if (window.speechSynthesis) {
          window.speechSynthesis.pause();
        }
        setIsPaused(true);
      }
    } else {
      stopAllAudio();
      const { text, bcp47, ttsCode, baseLang } = getActiveTextAndLanguage();
      const chunks = createChunks(text);
      chunksRef.current = chunks;
      setTotalChunks(chunks.length);
      chunkIndexRef.current = 0;
      setCurrentChunkIndex(0);

      isPlayingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);

      if (audioEngine === "NEURAL_CLOUD") {
        playNeuralCloudChunk(0, ttsCode, bcp47, baseLang);
      } else {
        playBrowserVoiceChunk(0, bcp47, baseLang);
      }
    }
  };

  const handleReset = () => {
    stopAllAudio();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentAudioElRef.current) {
      currentAudioElRef.current.muted = !isMuted;
    }
  };

  const cycleRate = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1;
    setRate(nextRate);
    if (currentAudioElRef.current) {
      currentAudioElRef.current.playbackRate = nextRate;
    }
    if (isPlaying) {
      handleReset();
    }
  };

  const progressPercent = totalChunks > 0 ? Math.round(((currentChunkIndex + 1) / totalChunks) * 100) : 0;

  return (
    <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Left: Player Info & Active Translation Badge */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
                AI Voice Audio Edition
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                <Languages className="w-3 h-3" /> {detectedLanguage}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                Studio Quality
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium line-clamp-1">
              Crystal-clear native accent narration in your selected language
            </p>
          </div>
        </div>

        {/* Right: Audio Controls & Engine Toggle */}
        <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">
          {/* Engine Selector */}
          <button
            onClick={() => {
              const next = audioEngine === "NEURAL_CLOUD" ? "BROWSER_SPEECH" : "NEURAL_CLOUD";
              setAudioEngine(next);
              if (isPlaying) handleReset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-indigo-500 text-slate-300 text-[11px] font-semibold transition-all"
            title="Switch Voice Engine"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-400" />
            <span>{audioEngine === "NEURAL_CLOUD" ? "Studio Neural AI" : "Browser Voice"}</span>
          </button>

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
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all active:scale-95 shrink-0"
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
        <div className="mt-4 relative z-10 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1.5">
            <span>Speaking sentence {currentChunkIndex + 1} of {totalChunks}</span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-300 rounded-full shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
