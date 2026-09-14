"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, Languages, Radio, AlertCircle } from "lucide-react";
import { LANGUAGES } from "../layout/LanguageSelector";

interface Props {
  title: string;
  content: string;
}

export default function ArticleAudioPlayer({ title, content }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1); // 1x, 1.25x, 1.5x
  const [activeLangInfo, setActiveLangInfo] = useState<{ code: string; name: string; ttsCode: string; bcp47: string }>({
    code: "en",
    name: "English (US)",
    ttsCode: "en",
    bcp47: "en-US",
  });
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [audioEngine, setAudioEngine] = useState<"NEURAL_CLOUD" | "BROWSER_SPEECH">("NEURAL_CLOUD");

  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const currentAudioElRef = useRef<HTMLAudioElement | null>(null);
  const heartbeatTimerRef = useRef<any>(null);

  // Sync available speech synthesis voices
  const populateVoices = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      voicesRef.current = window.speechSynthesis.getVoices();
    }
  }, []);

  // Detect current active language from cookie or localStorage
  const detectLanguage = useCallback(() => {
    let langCode = "en";

    // 1. Check googtrans cookie
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/googtrans=\/(?:en|auto)\/([a-zA-Z_-]+)/);
      if (match && match[1]) {
        langCode = match[1];
      } else {
        const saved = localStorage.getItem("smartmag_user_lang");
        if (saved) langCode = saved;
      }
    }

    const matched = LANGUAGES.find((l) => l.code.toLowerCase() === langCode.toLowerCase()) || LANGUAGES[0];
    setActiveLangInfo({
      code: matched.code,
      name: matched.name,
      ttsCode: matched.ttsCode,
      bcp47: matched.bcp47,
    });
    return matched;
  }, []);

  useEffect(() => {
    populateVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = populateVoices;
    }
    detectLanguage();

    // Listen for language changes from Navbar
    const onLangChanged = () => {
      stopAllAudio();
      detectLanguage();
    };

    window.addEventListener("smartmag_language_changed", onLangChanged);

    return () => {
      stopAllAudio();
      window.removeEventListener("smartmag_language_changed", onLangChanged);
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
    };
  }, [detectLanguage, populateVoices]);

  const stopAllAudio = () => {
    isPlayingRef.current = false;
    isPausedRef.current = false;
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
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
      .replace(/[#*_\-\~]/g, " ")
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[\{\}\[\]\<\>\/\\|\^]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getLiveArticleText = () => {
    const articleTitleEl = document.querySelector("h1");
    const articleBodyEl = document.querySelector(".prose") || document.querySelector("article");

    const liveTitle = articleTitleEl ? articleTitleEl.innerText.trim() : title;
    const liveBody = articleBodyEl ? (articleBodyEl as HTMLElement).innerText.trim() : cleanTextForSpeech(content);

    const fullRaw = `${liveTitle}. ${liveBody}`;
    return cleanTextForSpeech(fullRaw);
  };

  const createChunks = (text: string): string[] => {
    // Sentence segmentation supporting multiple scripts (Latin, Devanagari ।, Bengali ।, CJK 。！？)
    const sentences = text.match(/[^.!?\n।。！？]+[.!?\n।。！？]+/g) || [text];
    const chunks: string[] = [];
    let current = "";

    for (const s of sentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;

      if ((current + " " + trimmed).length > 150) {
        if (current.trim()) chunks.push(current.trim());
        current = trimmed;
      } else {
        current = current ? `${current} ${trimmed}` : trimmed;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length > 0 ? chunks : [text.slice(0, 180)];
  };

  // 1. Neural Cloud TTS Audio Player
  const playNeuralAudioChunk = (index: number, ttsCode: string, bcp47: string) => {
    if (!isPlayingRef.current || isPausedRef.current || index >= chunksRef.current.length) {
      if (index >= chunksRef.current.length) {
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
      }
      return;
    }

    chunkIndexRef.current = index;
    setCurrentChunkIndex(index);

    const chunkText = chunksRef.current[index];
    const audioUrl = `/api/tts?lang=${encodeURIComponent(ttsCode)}&text=${encodeURIComponent(chunkText.slice(0, 180))}`;

    const audio = new Audio(audioUrl);
    audio.playbackRate = rate;
    audio.muted = isMuted;
    currentAudioElRef.current = audio;

    audio.onended = () => {
      if (isPlayingRef.current && !isPausedRef.current) {
        playNeuralAudioChunk(index + 1, ttsCode, bcp47);
      }
    };

    audio.onerror = () => {
      console.warn("Neural audio chunk error, falling back to browser speech synthesis...");
      playBrowserVoiceChunk(index, bcp47);
    };

    audio.play().catch(() => {
      playBrowserVoiceChunk(index, bcp47);
    });
  };

  // 2. Browser Speech Synthesis Player (with Chrome Heartbeat keep-alive)
  const playBrowserVoiceChunk = (index: number, bcp47: string) => {
    if (!isPlayingRef.current || isPausedRef.current || index >= chunksRef.current.length) {
      if (index >= chunksRef.current.length) {
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
      }
      return;
    }

    chunkIndexRef.current = index;
    setCurrentChunkIndex(index);

    const chunkText = chunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.lang = bcp47;
    utterance.rate = rate === 1 ? 0.95 : rate;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : 1;

    // Pick top native voice for this language
    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    const langPrefix = bcp47.split("-")[0].toLowerCase();

    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase() === bcp47.toLowerCase() ||
        v.lang.toLowerCase().startsWith(langPrefix) ||
        v.lang.toLowerCase().replace("_", "-") === bcp47.toLowerCase()
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current && !isPausedRef.current) {
        playBrowserVoiceChunk(index + 1, bcp47);
      }
    };

    utterance.onerror = () => {
      if (isPlayingRef.current && !isPausedRef.current) {
        playBrowserVoiceChunk(index + 1, bcp47);
      }
    };

    // Chromium pause/resume heartbeat keepalive
    if (!heartbeatTimerRef.current) {
      heartbeatTimerRef.current = setInterval(() => {
        if (isPlayingRef.current && !isPausedRef.current && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    }

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        // Resume
        setIsPaused(false);
        isPausedRef.current = false;
        if (audioEngine === "NEURAL_CLOUD" && currentAudioElRef.current) {
          currentAudioElRef.current.play();
        } else if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.resume();
        }
      } else {
        // Pause
        setIsPaused(true);
        isPausedRef.current = true;
        if (audioEngine === "NEURAL_CLOUD" && currentAudioElRef.current) {
          currentAudioElRef.current.pause();
        } else if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.pause();
        }
      }
    } else {
      // Start Playing from beginning
      stopAllAudio();
      const currentLang = detectLanguage();
      const liveText = getLiveArticleText();
      const chunks = createChunks(liveText);

      chunksRef.current = chunks;
      setTotalChunks(chunks.length);
      chunkIndexRef.current = 0;
      setCurrentChunkIndex(0);

      isPlayingRef.current = true;
      isPausedRef.current = false;
      setIsPlaying(true);
      setIsPaused(false);

      if (audioEngine === "NEURAL_CLOUD") {
        playNeuralAudioChunk(0, currentLang.ttsCode, currentLang.bcp47);
      } else {
        playBrowserVoiceChunk(0, currentLang.bcp47);
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
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (currentAudioElRef.current) {
      currentAudioElRef.current.muted = nextMuted;
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
                <Languages className="w-3 h-3" /> {activeLangInfo.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                {audioEngine === "NEURAL_CLOUD" ? "Neural Cloud Voice" : "Native OS Voice"}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium line-clamp-1">
              Crystal-clear native narration in your selected translation
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
            <span>{audioEngine === "NEURAL_CLOUD" ? "Neural AI Voice" : "Browser TTS"}</span>
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
