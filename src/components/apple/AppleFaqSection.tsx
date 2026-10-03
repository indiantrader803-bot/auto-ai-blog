"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { APPLE_FAQ_ITEMS } from "@/data/appleData";

export default function AppleFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase tracking-widest mb-3 border border-slate-200 dark:border-white/10 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" /> Buyer Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="mt-2 text-slate-600 dark:text-zinc-400 text-sm font-light">
            Everything you need to know about Apple&apos;s 2026 pricing in India, bank discounts, trade-in policies, and specs.
          </p>
        </div>

        <div className="space-y-3">
          {APPLE_FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 dark:text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-slate-900 dark:text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in-50 duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
