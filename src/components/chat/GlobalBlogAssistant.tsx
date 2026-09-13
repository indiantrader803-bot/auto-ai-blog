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
  ChevronDown,
  ArrowRight,
  Plane,
  Flame
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: string;
}

const QUICK_PROMPTS = [
  { icon: "🌴", text: "5-Day Kerala Itinerary", query: "Generate a 5-day itinerary for Kerala with Munnar tea hills, Alleppey houseboat, and Fort Kochi." },
  { icon: "🏔️", text: "7-Day Ladakh & Kashmir", query: "Create a 7-day high altitude travel plan for Ladakh and Kashmir with Khardung La and Pangong Tso." },
  { icon: "🎌", text: "7-Day Japan Golden Route", query: "Create a 7-day itinerary for Japan covering Tokyo, Hakone Mt Fuji, and Kyoto." },
  { icon: "🪔", text: "World Cultural Festivals", query: "What are the most mesmerizing cultural festivals to visit worldwide like Diwali, Holi, and Rio Carnival?" },
  { icon: "🤖", text: "Explain AI Swarms 2026", query: "Explain Autonomous AI Agent Swarms and LangGraph multi-agent systems in enterprise engineering." },
  { icon: "📈", text: "Nifty & Sensex Breakout", query: "What is the technical and macro outlook for Indian stock market Nifty 50 and FII/DII liquidity?" }
];

export default function GlobalBlogAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 **Welcome to SmartTravel & Knowledge AI Assistant!**

I am your 24/7 intelligent concierge. Ask me **anything about our blog**, or ask me to **generate a custom travel itinerary** for any destination in India or around the world!

Try clicking one of the quick suggestions below or type your dream trip destination:`,
      timestamp: "Just now",
      source: "SmartTravel Assistant"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source || "SmartTravel AI",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: "error_" + Date.now(),
        role: "assistant",
        content: `⚠️ Network error: ${err.message || "Failed to reach assistant server."}`,
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

  const handleReset = () => {
    setMessages([
      {
        id: "welcome_reset",
        role: "assistant",
        content: `👋 **Chat reset!** How can I assist with your travel itineraries or technical questions today?`,
        timestamp: "Just now",
        source: "SmartTravel Assistant"
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/80 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-indigo-400/40 cursor-pointer"
            aria-label="Open AI Travel & Blog Assistant"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>

            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Ask AI &amp; Itineraries</span>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase shadow-xs">
              24/7
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[999] w-[94vw] sm:w-[460px] md:w-[520px] h-[84vh] max-h-[700px] bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border-2 border-indigo-500/30 dark:border-indigo-500/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Compass className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white tracking-tight">
                    SmartTravel &amp; Knowledge AI
                  </h3>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-indigo-200 font-medium">
                  Custom Itineraries &amp; Blog Knowledge Concierge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Carousel / Pills */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 border-b border-slate-200/80 dark:border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
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
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none"
                  }`}
                >
                  {/* Assistant Header & Copy */}
                  {m.role === "assistant" && (
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {m.source || "SmartTravel AI"}
                      </span>
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
                  )}

                  {/* Message Content formatted */}
                  <div className="prose prose-xs dark:prose-invert max-w-none space-y-2 whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>

                  <div
                    className={`text-[9px] mt-2 text-right ${
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
                    Generating custom itinerary &amp; insights...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for an itinerary (e.g. 5 days in Kerala, Japan trip) or any question..."
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
              <span>✈️ Instant day-by-day itineraries for any destination</span>
              <span className="font-semibold text-indigo-500">Autonomous Concierge</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
