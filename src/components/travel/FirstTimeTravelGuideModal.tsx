'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Mic,
  MessageCircle,
  X,
  Play,
  Compass,
} from 'lucide-react';

interface FirstTimeTravelGuideModalProps {
  onTriggerDemo?: (destSlug: string) => void;
  onTriggerVoice?: () => void;
  onOpenWizard?: () => void;
}

export default function FirstTimeTravelGuideModal({
  onTriggerDemo,
  onTriggerVoice,
  onOpenWizard,
}: FirstTimeTravelGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('smartmag_travel_guide_seen');
      if (!seen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('smartmag_travel_guide_seen', 'true');
    }
  };

  const handleRunDemo = (slug: string) => {
    handleDismiss();
    onTriggerDemo?.(slug);
  };

  return (
    <>
      {/* Persistent Floating 'AI Tour' Help Button (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-800 border border-sky-500/40 text-sky-400 hover:text-white text-xs font-bold shadow-2xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          title="How to use Travel AI Concierge"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
          </span>
          <Compass className="w-4 h-4 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline">How AI Concierge Works</span>
          <span className="sm:hidden">AI Tour</span>
        </button>
      </div>

      {/* Floating Interactive Onboarding Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-sky-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close guide"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with AI Avatar */}
            <div className="flex items-center gap-3.5 mb-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-sky-500/30 shrink-0">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                    AI Travel Concierge Guide
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                    Interactive Tour
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                  Plan Your Entire Trip in 3 Easy Steps
                </h3>
              </div>
            </div>

            {/* 3 Step Interactive Process Breakdown */}
            <div className="space-y-3.5 mb-6 relative z-10">
              {/* Step 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-sky-400" />
                    <span>Speak or Type Your Dream Journey</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Tell AI your destination, days &amp; budget in natural language (e.g. <em>"7 days in Japan from Kolkata budget ₹1.5L"</em>).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Instant AI Trip Basket Synthesis</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    AI automatically compares and bundles: <strong>Flights (0% markup)</strong> + <strong>Hotels</strong> + <strong>Transfers</strong> + <strong>Attraction Passes</strong> + <strong>5G eSIM</strong> + <strong>Daily Itinerary</strong>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>1-Click Direct Booking &amp; WhatsApp Export</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Book directly with verified partners or click <strong>"Send to WhatsApp"</strong> to get the formatted day-by-day roadmap on your phone.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick 1-Click Action Buttons */}
            <div className="space-y-2.5 relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Try a Live 1-Click AI Demo:
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleRunDemo('japan')}
                  className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>🌸 Japan 7 Days Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRunDemo('dubai')}
                  className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>🏙️ Dubai 5 Days Demo</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    handleDismiss();
                    onTriggerVoice?.();
                  }}
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Try Voice Search</span>
                </button>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition cursor-pointer"
                >
                  Got It, Explore!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
