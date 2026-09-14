"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Loader2,
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Copy,
  Check,
  RotateCcw,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  ExternalLink,
  ShieldCheck,
  Star,
  Tag,
  Video,
  Award,
  ArrowRight,
  Plane,
  Building,
  BarChart3,
  Cpu
} from "lucide-react";
import { BookingDeal, AffiliateComparisonOffer, VideoSearchResult } from "@/lib/agents/multiAgentIntentRouter";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: string;
  speechText?: string;
  intent?: string;
  bookingDeals?: BookingDeal[] | null;
  comparisonOffers?: AffiliateComparisonOffer[] | null;
  videoResults?: VideoSearchResult[] | null;
  affiliateCta?: {
    title: string;
    description: string;
    url: string;
    buttonText: string;
    promoCode?: string;
  } | null;
  recommendedBlogSlugs?: Array<{ title: string; slug: string }> | null;
}

const QUICK_PROMPTS = [
  { icon: "🎙️", text: "Voice Greeting", query: "Hello Voice Agent, what services and bookings can you help me with?" },
  { icon: "🏨", text: "Kerala Backwaters & Houseboat", query: "Find me the best luxury houseboat stays and booking deals in Alleppey Kerala." },
  { icon: "🏔️", text: "7-Day Ladakh & Kashmir Plan", query: "Create a 7-day high altitude travel plan for Ladakh and Kashmir with Khardung La and Pangong Tso." },
  { icon: "📊", text: "Compare Prop Trading Firms", query: "Compare the best prop trading firms and funded account offers with promo codes." },
  { icon: "🎥", text: "AI Swarm Video Workshop", query: "Show me a video tutorial and workshop on Autonomous AI Agent Swarms." },
  { icon: "🤖", text: "Best AI Developer Tools", query: "What are the best AI developer IDEs, cloud GPUs, and prompt toolkits available in 2026?" },
  { icon: "🎌", text: "7-Day Japan Golden Route", query: "Create a 7-day itinerary for Japan covering Tokyo, Hakone Mt Fuji, and Kyoto." },
];

export default function GlobalBlogAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Voice & Speech State
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `🎙️ **Welcome to SmartMag Voice & Multi-Agent Concierge!**

I am your autonomous 24/7 AI Voice Agent. How can I assist you today?
- 🏨 **Booking Concierge**: Verified hotel, resort, and houseboat reservations.
- 📊 **Affiliate Comparison**: Compare funded prop firms, crypto terminals, and travel gear with exclusive discount promo codes.
- 🎥 **Video Search**: Watch curated masterclasses, tutorials, and travel documentaries.
- 🤖 **AI Tools & Digital Store**: Discover top IDEs, Cloud GPUs, and quantitative scripts.
- 🗺️ **Global Itineraries**: Custom day-by-day travel plans for India and 100+ countries worldwide.

*Click the 🎙️ **Microphone button** to speak your query, or type below:*`,
      timestamp: "Just now",
      source: "Voice Agent Concierge",
      speechText: "Welcome to SmartMag Voice Concierge. I can help you with hotel bookings, offer comparisons, video search, or custom travel itineraries. How may I assist you today?",
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          // Auto send after speech recognition
          handleSend(transcript);
        };

        recognition.onerror = (event: any) => {
          console.warn("[Voice Recognition Error]:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Text-To-Speech (TTS)
  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // Stop any previous speech
    const cleanText = text.replace(/[*#_\[\]()`]/g, "").slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-smarttravel-chat", handleOpenChat);
    return () => window.removeEventListener("open-smarttravel-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: "user_" + Date.now(),
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: userMsg.content,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: "assistant_" + Date.now(),
        role: "assistant",
        content: data.reply || "I apologize, but I could not generate a response right now. Please try asking again.",
        speechText: data.speechText,
        intent: data.intent,
        bookingDeals: data.bookingDeals,
        comparisonOffers: data.comparisonOffers,
        videoResults: data.videoResults,
        affiliateCta: data.affiliateCta,
        recommendedBlogSlugs: data.recommendedBlogSlugs,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source || data.agentName || "Voice Agent Concierge",
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Trigger Voice Playback if speech is enabled
      if (data.speechText) {
        speakText(data.speechText);
      } else if (data.reply) {
        speakText(data.reply);
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: "error_" + Date.now(),
        role: "assistant",
        content: `⚠️ Network error: ${err.message || "Failed to reach voice agent server."}`,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([
      {
        id: "welcome_reset",
        role: "assistant",
        content: `🎙️ **Voice Concierge reset!** How can I assist you with bookings, offer comparisons, video search, or travel itineraries?`,
        timestamp: "Just now",
        source: "Voice Agent Concierge",
      }
    ]);
  };

  return (
    <>
      {/* Floating Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <span className="text-xs font-bold flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-500" />
                Featured Video Workshop
              </span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1`}
                title="YouTube video player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              if (speechEnabled) speakText(messages[0].speechText || messages[0].content);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/80 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-indigo-400/40 cursor-pointer"
            aria-label="Open AI Voice Agent & Concierge"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>

            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider">
              <Mic className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>🎙️ AI Voice Agent</span>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase shadow-xs">
              LIVE 24/7
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[999] w-[94vw] sm:w-[480px] md:w-[560px] h-[86vh] max-h-[740px] bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border-2 border-indigo-500/30 dark:border-indigo-500/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Compass className="w-5 h-5 text-amber-300" />
                {isSpeaking && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white tracking-tight">
                    Voice Agent &amp; Intent Concierge
                  </h3>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-indigo-200 font-medium">
                  Bookings • Offers • Video Search • Itineraries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Mute / Unmute Toggle */}
              <button
                onClick={() => {
                  if (speechEnabled) {
                    window.speechSynthesis?.cancel();
                    setSpeechEnabled(false);
                  } else {
                    setSpeechEnabled(true);
                  }
                }}
                title={speechEnabled ? "Mute Voice Audio" : "Enable Voice Audio"}
                className={`p-1.5 rounded-xl transition-colors text-xs ${
                  speechEnabled ? "bg-indigo-600/60 text-amber-300 hover:bg-indigo-600" : "hover:bg-white/10 text-slate-400"
                }`}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                title="Close chat"
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Carousel / Pills */}
          <div className="bg-slate-50 dark:bg-slate-900/80 p-2.5 border-b border-slate-200/80 dark:border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
            {QUICK_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400/50 text-[11px] font-medium whitespace-nowrap transition-all shadow-2xs group"
              >
                <span>{p.icon}</span>
                <span>{p.text}</span>
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 shadow-xs space-y-3 ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none"
                  }`}
                >
                  {/* Assistant Header & Copy / Listen */}
                  {m.role === "assistant" && (
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {m.source || "Voice Agent"}
                      </span>
                      <div className="flex items-center gap-2">
                        {m.speechText && (
                          <button
                            onClick={() => speakText(m.speechText!)}
                            className="hover:text-indigo-500 flex items-center gap-1 transition-colors"
                            title="Listen to response"
                          >
                            <Volume2 className="w-3 h-3 text-indigo-500" />
                            <span>Listen</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message Markdown Content */}
                  <div className="prose prose-xs dark:prose-invert max-w-none space-y-2 whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>

                  {/* 🏨 RICH CARD: BOOKING DEALS */}
                  {m.bookingDeals && m.bookingDeals.length > 0 && (
                    <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" />
                        Verified Partner Stays &amp; Resorts
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {m.bookingDeals.map((deal) => (
                          <div
                            key={deal.id}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-2 group hover:border-indigo-400/50 transition-all"
                          >
                            <div className="flex gap-2.5 items-center">
                              {deal.imageUrl && (
                                <img
                                  src={deal.imageUrl}
                                  alt={deal.title}
                                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30 mb-1">
                                  {deal.badge}
                                </span>
                                <h4 className="text-xs font-bold truncate text-slate-900 dark:text-white">
                                  {deal.title}
                                </h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                                  <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                                  {deal.location}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {deal.features.slice(0, 3).map((feat, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px]"
                                >
                                  ✓ {feat}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                              <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xs">
                                {deal.priceTag}
                              </span>
                              <a
                                href={deal.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                              >
                                <span>Book on Booking.com</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 📊 RICH CARD: AFFILIATE OFFER COMPARISON */}
                  {m.comparisonOffers && m.comparisonOffers.length > 0 && (
                    <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        Side-by-Side Offer Comparison
                      </div>
                      <div className="space-y-2">
                        {m.comparisonOffers.map((offer) => (
                          <div
                            key={offer.id}
                            className={`p-3 rounded-xl border transition-all ${
                              offer.isBestMatch
                                ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-400 dark:border-amber-500/50 shadow-md"
                                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                  {offer.name}
                                </h4>
                                {offer.isBestMatch && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[8px] uppercase tracking-wider flex items-center gap-0.5">
                                    <Award className="w-2.5 h-2.5" />
                                    BEST MATCH
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                {offer.payoutSplit}
                              </span>
                            </div>

                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                              Tier: {offer.startingPrice}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-1">
                              {offer.features.map((feat, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[9px]"
                                >
                                  • {feat}
                                </span>
                              ))}
                            </div>

                            <div className="mt-2.5 flex items-center justify-between gap-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800">
                              {offer.discountCode ? (
                                <button
                                  onClick={() => handleCopyPromo(offer.discountCode)}
                                  className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-mono text-[9px] flex items-center gap-1 transition-colors"
                                  title="Copy promo code"
                                >
                                  <Tag className="w-2.5 h-2.5 text-indigo-500" />
                                  <span>Code: <strong>{offer.discountCode}</strong></span>
                                  {copiedCode === offer.discountCode ? (
                                    <Check className="w-2.5 h-2.5 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-2.5 h-2.5" />
                                  )}
                                </button>
                              ) : <span />}

                              <a
                                href={offer.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-3 py-1 rounded-lg text-white font-bold text-[10px] flex items-center gap-1 transition-all ${
                                  offer.isBestMatch
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black shadow-xs"
                                    : "bg-indigo-600 hover:bg-indigo-500"
                                }`}
                              >
                                <span>Claim Deal</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🎥 RICH CARD: VIDEO SEARCH RESULTS */}
                  {m.videoResults && m.videoResults.length > 0 && (
                    <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-rose-500" />
                        Curated Video Tutorials &amp; Workshops
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {m.videoResults.map((vid) => (
                          <div
                            key={vid.id}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col gap-2 group hover:border-rose-400/50 transition-all"
                          >
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 group-hover:opacity-95">
                              <img
                                src={vid.thumbnailUrl}
                                alt={vid.title}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => setActiveVideoModal(vid.videoId)}
                                className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                title="Watch Video"
                              >
                                <Play className="w-5 h-5 fill-white ml-0.5" />
                              </button>
                              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">
                                {vid.duration}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                                {vid.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {vid.summary}
                              </p>
                            </div>

                            {vid.relatedBlogSlug && (
                              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                                <span className="text-slate-400">Related Guide:</span>
                                <Link
                                  href={`/blog/${vid.relatedBlogSlug}`}
                                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                                >
                                  <span>Read Article</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🏷️ RICH CARD: AFFILIATE CTA BANNER */}
                  {m.affiliateCta && (
                    <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white border border-indigo-500/40 shadow-md">
                      <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-black uppercase">
                        <Sparkles className="w-3 h-3" />
                        Exclusive Community Offer
                      </div>
                      <h4 className="text-xs font-extrabold mt-1">
                        {m.affiliateCta.title}
                      </h4>
                      <p className="text-[10px] text-indigo-200 mt-0.5">
                        {m.affiliateCta.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        {m.affiliateCta.promoCode && (
                          <button
                            onClick={() => handleCopyPromo(m.affiliateCta!.promoCode!)}
                            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 font-mono text-[9px] flex items-center gap-1"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            <span>Code: <strong>{m.affiliateCta.promoCode}</strong></span>
                            {copiedCode === m.affiliateCta.promoCode ? (
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        )}
                        <a
                          href={m.affiliateCta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] flex items-center gap-1 ml-auto shadow-sm"
                        >
                          <span>{m.affiliateCta.buttonText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.role === "user" ? "text-indigo-200" : "text-slate-400"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start items-center text-slate-500 dark:text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white animate-spin shrink-0">
                  <Loader2 className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    Voice Agent is executing intent pipeline...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Active Indicator Banner */}
          {isListening && (
            <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white px-4 py-2 flex items-center justify-between animate-pulse shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>🎙️ Listening... Speak your booking or search query</span>
              </div>
              <button
                onClick={toggleListening}
                className="px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-[10px] font-bold"
              >
                Stop
              </button>
            </div>
          )}

          {/* Footer Input Form with Mic Button */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Mic Button */}
              <button
                type="button"
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Click to speak with Voice Agent"}
                className={`p-2.5 rounded-2xl transition-all shrink-0 cursor-pointer shadow-md ${
                  isListening
                    ? "bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/50"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 hover:text-indigo-600"
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </button>

              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening to your voice..." : "Ask for bookings, compare offers, video search..."}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all shrink-0 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Instant conversion tracking &amp; verified deals
              </span>
              <span className="font-semibold text-indigo-500">Autonomous Intent Router</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
