"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs?: FaqItem[];
  topicTitle?: string;
}

export default function FaqAccordion({ faqs, topicTitle }: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const fallbackFaqs: FaqItem[] = [
    {
      question: `What are the core technical advantages discussed in this report?`,
      answer: `This analysis highlights enhanced architectural throughput, reduced friction in cross-system settlement, and institutional-grade resilience against market volatility.`,
    },
    {
      question: `Why is this development gaining widespread market attention?`,
      answer: `Global market participants and infrastructure providers are accelerating adoption due to increased efficiency, cross-border interoperability, and favorable regulatory alignment.`,
    },
    {
      question: `How could this affect global investors and engineering teams?`,
      answer: `Investors benefit from expanded liquidity and clearer risk models, while engineering teams gain standardized APIs, lower latency execution, and battle-tested protocols.`,
    },
    {
      question: `What are the primary operational risks to monitor?`,
      answer: `Key considerations include regulatory fragmentation across jurisdictions, rate of enterprise integration, and long-term liquidity concentration risks.`,
    },
    {
      question: `When can we expect full widespread implementation?`,
      answer: `Phased rollouts are currently underway across tier-1 platforms, with broader institutional deployment and public availability slated through late 2026 and 2027.`,
    },
  ];

  const items = faqs && faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <section id="faq" className="my-10 scroll-mt-24">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
        Frequently Asked Questions
      </h3>

      <div className="space-y-2.5">
        {items.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden bg-white/80 dark:bg-[#0b1329]/70 backdrop-blur-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  {faq.question}
                </span>
                <span className="text-slate-400 dark:text-slate-500 shrink-0">
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
