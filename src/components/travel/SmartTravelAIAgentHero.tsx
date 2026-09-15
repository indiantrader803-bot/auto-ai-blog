'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Mic,
  MicOff,
  Send,
  Loader2,
  Compass,
  ArrowRight,
  Plane,
  Building2,
  Calendar,
  DollarSign,
  Users,
  Search,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { DESTINATIONS_DATA, DestinationGuide, getDestinationBySlug } from '@/lib/travel/destinationsData';
import PersonalizedTripBasket, { TripPlanConfig } from './PersonalizedTripBasket';
import FirstTimeTravelGuideModal from './FirstTimeTravelGuideModal';

const QUICK_PROMPTS = [
  { label: '🌸 Japan 7 Days from Kolkata (₹1.5L)', query: 'I want to visit Japan for 7 days from Kolkata with a budget of ₹1.5 lakh.', dest: 'japan', origin: 'Kolkata (CCU)', days: 7, budget: 150000, travelers: 2, style: 'Comfort' as const },
  { label: '🏙️ Dubai 5 Days Couple (₹80K)', query: 'Plan a 5-day romantic Dubai trip for a couple from Delhi under ₹80,000.', dest: 'dubai', origin: 'Delhi (DEL)', days: 5, budget: 80000, travelers: 2, style: 'Comfort' as const },
  { label: '🌴 Bali 6 Days Solo Budget (₹50K)', query: 'Create a 6-day budget solo trip to Bali from Mumbai under ₹50,000.', dest: 'bali', origin: 'Mumbai (BOM)', days: 6, budget: 50000, travelers: 1, style: 'Budget' as const },
  { label: '🏔️ Swiss Alps 8 Days Luxury (₹3L)', query: 'I want an 8-day luxury Swiss Alps and Jungfraujoch tour from Mumbai budget ₹3 lakh.', dest: 'switzerland', origin: 'Mumbai (BOM)', days: 8, budget: 300000, travelers: 2, style: 'Luxury' as const },
  { label: '❄️ Kashmir 5 Days Dal Lake & Gulmarg (₹35K)', query: 'Plan a 5-day Kashmir family trip with Dal Lake houseboat and Gulmarg gondola for ₹35,000.', dest: 'kashmir', origin: 'Delhi (DEL)', days: 5, budget: 35000, travelers: 2, style: 'Comfort' as const },
];

export default function SmartTravelAIAgentHero() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<TripPlanConfig | null>(null);
  const [showWizardModal, setShowWizardModal] = useState(false);

  // Wizard State
  const [wizardDest, setWizardDest] = useState('Japan & Tokyo');
  const [wizardOrigin, setWizardOrigin] = useState('Kolkata (CCU)');
  const [wizardDays, setWizardDays] = useState(7);
  const [wizardBudget, setWizardBudget] = useState('150000');
  const [wizardTravelers, setWizardTravelers] = useState(2);
  const [wizardStyle, setWizardStyle] = useState<'Budget' | 'Comfort' | 'Luxury'>('Comfort');

  const recognitionRef = useRef<any>(null);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setSpeechFeedback('Listening... Speak your travel dream (e.g., "7 days in Dubai from Delhi budget 80k")');
        };

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setQuery(text);
          setIsListening(false);
          setSpeechFeedback(null);
          handleAnalyzeQuery(text);
        };

        recognition.onerror = () => {
          setIsListening(false);
          setSpeechFeedback(null);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (_) {
        setIsListening(false);
      }
    }
  };

  const handleAnalyzeQuery = (text: string) => {
    const raw = text.toLowerCase();
    setIsProcessing(true);

    setTimeout(() => {
      let matchedSlug = 'japan';
      if (raw.includes('dubai') || raw.includes('burj') || raw.includes('desert') || raw.includes('emirates')) {
        matchedSlug = 'dubai';
      } else if (raw.includes('bali') || raw.includes('indonesia') || raw.includes('ubud') || raw.includes('nusa')) {
        matchedSlug = 'bali';
      } else if (raw.includes('swiss') || raw.includes('switzerland') || raw.includes('alps') || raw.includes('zurich')) {
        matchedSlug = 'switzerland';
      } else if (raw.includes('kashmir') || raw.includes('srinagar') || raw.includes('gulmarg') || raw.includes('ladakh')) {
        matchedSlug = 'kashmir';
      } else if (raw.includes('japan') || raw.includes('tokyo') || raw.includes('kyoto') || raw.includes('fuji')) {
        matchedSlug = 'japan';
      }

      // Extract days
      const daysMatch = raw.match(/(\d+)\s*(days|day|nights|night)/);
      const parsedDays = daysMatch ? parseInt(daysMatch[1], 10) : 7;

      // Extract origin
      let parsedOrigin = 'Kolkata (CCU)';
      if (raw.includes('delhi')) parsedOrigin = 'Delhi (DEL)';
      else if (raw.includes('mumbai')) parsedOrigin = 'Mumbai (BOM)';
      else if (raw.includes('bangalore') || raw.includes('bengaluru')) parsedOrigin = 'Bangalore (BLR)';
      else if (raw.includes('chennai')) parsedOrigin = 'Chennai (MAA)';
      else if (raw.includes('london')) parsedOrigin = 'London (LHR)';
      else if (raw.includes('new york') || raw.includes('nyc')) parsedOrigin = 'New York (JFK)';

      // Extract budget
      let parsedBudget = 120000;
      const budgetMatch = raw.match(/(₹|rs\.?|inr)?\s*(\d+(\.\d+)?)\s*(lakh|lac|k|thousand|l)?/i);
      if (budgetMatch) {
        let num = parseFloat(budgetMatch[2]);
        const unit = budgetMatch[4]?.toLowerCase();
        if (unit === 'lakh' || unit === 'lac' || unit === 'l') num = num * 100000;
        else if (unit === 'k' || unit === 'thousand') num = num * 1000;
        if (num > 10000) parsedBudget = num;
      }

      // Style
      let parsedStyle: 'Budget' | 'Comfort' | 'Luxury' = 'Comfort';
      if (raw.includes('luxury') || raw.includes('5 star') || raw.includes('first class')) parsedStyle = 'Luxury';
      else if (raw.includes('budget') || raw.includes('cheap') || raw.includes('backpacking')) parsedStyle = 'Budget';

      const guide = getDestinationBySlug(matchedSlug) || DESTINATIONS_DATA['japan'];

      setActivePlan({
        destination: guide.name,
        origin: parsedOrigin,
        days: Math.min(Math.max(parsedDays, 3), 10),
        budget: parsedBudget,
        travelers: raw.includes('solo') || raw.includes('alone') ? 1 : raw.includes('family') ? 4 : 2,
        travelStyle: parsedStyle,
        guide,
      });

      setIsProcessing(false);
    }, 600);
  };

  const handleSelectQuickPrompt = (p: typeof QUICK_PROMPTS[0]) => {
    setQuery(p.query);
    setIsProcessing(true);
    setTimeout(() => {
      const guide = getDestinationBySlug(p.dest) || DESTINATIONS_DATA['japan'];
      setActivePlan({
        destination: guide.name,
        origin: p.origin,
        days: p.days,
        budget: p.budget,
        travelers: p.travelers,
        travelStyle: p.style,
        guide,
      });
      setIsProcessing(false);
    }, 400);
  };

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWizardModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      const slug = wizardDest.toLowerCase().includes('dubai') ? 'dubai'
        : wizardDest.toLowerCase().includes('bali') ? 'bali'
        : wizardDest.toLowerCase().includes('swiss') ? 'switzerland'
        : wizardDest.toLowerCase().includes('kashmir') ? 'kashmir'
        : 'japan';
      const guide = getDestinationBySlug(slug) || DESTINATIONS_DATA['japan'];
      setActivePlan({
        destination: guide.name,
        origin: wizardOrigin,
        days: wizardDays,
        budget: parseInt(wizardBudget, 10) || 120000,
        travelers: wizardTravelers,
        travelStyle: wizardStyle,
        guide,
      });
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="w-full space-y-8">
      {/* ?? AI Travel Concierge Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            Next-Gen AI Travel Concierge
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight pt-3">
            Plan Your Entire Dream Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200">Smart AI</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tell us where you want to go, your departure city, and budget. Our AI agent instantly crafts your custom <strong className="text-white">Trip Basket</strong> (Flights, Hotels, Private Transfers, Attraction Passes, 5G eSIM &amp; Daily Itinerary).
          </p>

          {/* Interactive Voice & Prompt Input Bar */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center rounded-2xl bg-slate-950 border-2 border-sky-500/50 shadow-2xl p-2 focus-within:border-sky-400 transition-all">
              <button
                type="button"
                onClick={toggleVoice}
                title={isListening ? 'Stop listening' : 'Speak your trip'}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40'
                    : 'bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    handleAnalyzeQuery(query);
                  }
                }}
                placeholder="e.g. 7 days in Japan from Kolkata for 2 people budget ₹1.5L..."
                className="w-full bg-transparent px-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => query.trim() && handleAnalyzeQuery(query)}
                disabled={isProcessing || !query.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Build Trip</span>
              </button>
            </div>

            {speechFeedback && (
              <div className="mt-2 text-xs font-semibold text-sky-400 animate-pulse flex items-center justify-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{speechFeedback}</span>
              </div>
            )}
          </div>

          {/* Three Entry Mode Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={toggleVoice}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-sky-400" />
              <span>Voice AI Assistant</span>
            </button>

            <button
              onClick={() => setShowWizardModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Build My Trip Wizard</span>
            </button>

            <a
              href="#flights"
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>Search Manually</span>
            </a>
          </div>

          {/* Quick Prompt Recommendation Pills */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Popular AI Trip Inquiries (Click to generate):
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuickPrompt(p)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs transition-all hover:border-sky-500/50 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ?? Active Generated Trip Basket Render */}
      {isProcessing && (
        <div className="w-full p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <h3 className="text-lg font-bold text-white">Synthesizing Your Custom Trip Basket...</h3>
          <p className="text-xs text-slate-400">
            Comparing 1,000+ flights on Aviasales, hotels on Booking.com, transfers on GetTransfer, passes on Klook &amp; 5G eSIM on Saily.
          </p>
        </div>
      )}

      {activePlan && !isProcessing && (
        <PersonalizedTripBasket
          plan={activePlan}
          onReset={() => setActivePlan(null)}
        />
      )}

      {/* ?? Build My Trip Wizard Modal */}
      {showWizardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <h3 className="text-xl font-bold font-serif text-white">Build My Trip with AI</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWizardModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleWizardSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Destination</label>
                  <select
                    value={wizardDest}
                    onChange={(e) => setWizardDest(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Japan & Tokyo">🌸 Japan (Tokyo, Kyoto &amp; Mt Fuji)</option>
                    <option value="Dubai & Emirates">🏙️ Dubai &amp; Arabian Desert</option>
                    <option value="Bali Tropical Paradise">🌴 Bali &amp; Nusa Penida</option>
                    <option value="Switzerland & The Swiss Alps">🏔️ Switzerland &amp; Swiss Alps</option>
                    <option value="Kashmir - Heaven on Earth">❄️ Kashmir (Dal Lake &amp; Gulmarg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Leaving From</label>
                  <input
                    type="text"
                    value={wizardOrigin}
                    onChange={(e) => setWizardOrigin(e.target.value)}
                    placeholder="e.g. Kolkata, Delhi, London, NYC"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="3"
                    max="14"
                    value={wizardDays}
                    onChange={(e) => setWizardDays(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={wizardTravelers}
                    onChange={(e) => setWizardTravelers(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Travel Style</label>
                  <select
                    value={wizardStyle}
                    onChange={(e) => setWizardStyle(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Comfort">Comfort</option>
                    <option value="Luxury">Luxury VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Total Target Budget (₹ INR)</label>
                <input
                  type="number"
                  value={wizardBudget}
                  onChange={(e) => setWizardBudget(e.target.value)}
                  placeholder="e.g. 150000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWizardModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold cursor-pointer"
                >
                  Generate My Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* First-Time Interactive Guide Modal & Floating Tour Beacon */}
      <FirstTimeTravelGuideModal
        onTriggerDemo={(slug) => {
          const prompt = QUICK_PROMPTS.find((p) => p.dest === slug) || QUICK_PROMPTS[0];
          handleSelectQuickPrompt(prompt);
        }}
        onTriggerVoice={toggleVoice}
        onOpenWizard={() => setShowWizardModal(true)}
      />
    </div>
  );
}
