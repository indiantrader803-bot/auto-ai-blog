"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, User, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

export default function AiAppleAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "assistant",
      text: "Hello! I am your TheSmartMag Apple Genius Assistant. Ask me anything about iPhone 18 specs, trade-in valuations, M5 MacBooks, or Indian retailer bank discounts.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Should I buy iPhone 18 or wait?",
    "iPhone 18 Pro Max vs Samsung S24 Ultra?",
    "Best Apple Watch for marathon running?",
    "What is the best MacBook for code compilation?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes("should i buy") || lower.includes("worth it") || lower.includes("wait")) {
        reply =
          "If you currently own an iPhone 12, 13, or standard 14, upgrading to the iPhone 18 series is a monumental leap. You will gain the TSMC 2nm A20 Pro chip, a mechanical variable aperture camera (f/1.4-f/2.8), 25W MagSafe 2.0, 3,000 nits outdoor brightness, and full on-device Apple Intelligence. However, if you already have an iPhone 16 Pro, your current phone handles Apple Intelligence easily, so upgrading is only essential if you need dedicated periscope video optics.";
      } else if (lower.includes("samsung") || lower.includes("s24") || lower.includes("s25") || lower.includes("android")) {
        reply =
          "Comparing iPhone 18 Pro Max with Galaxy S24/S25 Ultra: The iPhone 18 Pro Max leads heavily in 4K ProRes Log video capture, single-core CPU throughput with the 2nm A20 Pro, Apple Watch ecosystem synergy, and multi-year trade-in residual value in India. The Galaxy Ultra excels in S-Pen stylus productivity and 100x digital zoom.";
      } else if (lower.includes("watch") || lower.includes("fitness") || lower.includes("running") || lower.includes("marathon")) {
        reply =
          "For serious fitness and marathon runners, the Apple Watch Ultra 3 is unbeatable. It delivers dual-frequency L1+L5 GPS under heavy city buildings, 72 hours of Low Power battery life, an emergency two-way satellite SOS transponder, and a blinding 3,000-nit microLED display. For everyday gym and lifestyle tracking, the Series 12 offers a thinner profile with hypertension and sleep apnea detection.";
      } else if (lower.includes("macbook") || lower.includes("code") || lower.includes("programming") || lower.includes("developer")) {
        reply =
          "For software developers, ML engineers, and Docker workloads, we recommend the MacBook Pro 14\" or 16\" with the M5 Pro chip and at least 36GB of unified memory. It compiles large codebases 40% faster than M2, supports Thunderbolt 5 (120 Gbps) for triple 8K displays, and runs cool with 24 hours of real battery endurance.";
      } else if (lower.includes("discount") || lower.includes("offer") || lower.includes("croma") || lower.includes("flipkart")) {
        reply =
          "Current top offers: Flipkart and Croma provide an instant ₹5,000 cashback on HDFC & ICICI Bank Credit Cards, plus up to ₹6,000 in exchange bonus on older devices. Croma also provides 5% Tata NeuCoins and 24-month zero-cost EMI plans.";
      } else {
        reply = `Great question! The 2026 Apple lineup is defined by the 2nm TSMC A20 Pro chip, mechanical variable aperture lenses, and seamless Apple Intelligence 2.0. Whether your priority is mobile gaming, professional cinema video, or extreme battery stamina, you can compare models side-by-side or calculate your exact trade-in discount on this page.`;
      }

      setMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <section id="ai-assistant" className="py-20 bg-slate-50 dark:bg-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            <Bot className="w-3.5 h-3.5" /> 24/7 Apple Intelligence Advisor
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Ask the Apple Genius AI.
          </h2>
          <p className="mt-2 text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light">
            Have a specific buying dilemma? Ask our real-time advisor for side-by-side advice, exchange recommendations, and hardware comparisons.
          </p>
        </div>

        {/* Chat Box */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900/70 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl flex flex-col overflow-hidden">
          {/* Messages Stream */}
          <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto no-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
                    
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-xs"
                      : "bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 border border-slate-200/80 dark:border-white/5 rounded-tl-xs"
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-xs text-slate-500 dark:text-zinc-400">
                <div className="w-7 h-7 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold flex items-center justify-center shrink-0 text-xs">
                  
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-800/60 flex items-center gap-1.5 border border-slate-200/80 dark:border-transparent">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-zinc-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-zinc-400 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-zinc-400 animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-3 bg-slate-50 dark:bg-black/40 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 uppercase shrink-0">Try:</span>
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs whitespace-nowrap transition-colors border border-slate-200 dark:border-white/5 cursor-pointer shrink-0 shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-slate-50/80 dark:bg-zinc-950 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g., iPhone 18 vs 17 Pro, trade-in value, best deals)..."
              className="flex-1 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 rounded-full px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden focus:border-slate-500 dark:focus:border-white/30"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-200 disabled:opacity-40 text-white dark:text-black flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
