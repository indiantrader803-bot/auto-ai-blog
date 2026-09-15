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
  { label: '🏔️ Manali 4 Days Couple (₹30K)', query: 'Plan a budget 4-day Manali trip for couple with ₹30,000 INR from Delhi.', dest: 'manali', origin: 'Delhi (DEL)', days: 4, budget: 30000, travelers: 2, style: 'Budget' as const },
  { label: '🌸 Japan 7 Days from Kolkata (₹1.5L)', query: 'I want to visit Japan for 7 days from Kolkata with a budget of ₹1.5 lakh.', dest: 'japan', origin: 'Kolkata (CCU)', days: 7, budget: 150000, travelers: 2, style: 'Comfort' as const },
  { label: '🏖️ Goa 4 Days Beach & Forts (₹25K)', query: 'Plan a 4-day Goa beach and heritage trip for 2 people under ₹25,000.', dest: 'goa', origin: 'Mumbai (BOM)', days: 4, budget: 25000, travelers: 2, style: 'Budget' as const },
  { label: '🏙️ Dubai 5 Days Couple (₹80K)', query: 'Plan a 5-day romantic Dubai trip for a couple from Delhi under ₹80,000.', dest: 'dubai', origin: 'Delhi (DEL)', days: 5, budget: 80000, travelers: 2, style: 'Comfort' as const },
  { label: '🌴 Bali 6 Days Solo Budget (₹50K)', query: 'Create a 6-day budget solo trip to Bali from Mumbai under ₹50,000.', dest: 'bali', origin: 'Mumbai (BOM)', days: 6, budget: 50000, travelers: 1, style: 'Budget' as const },
  { label: '❄️ Kashmir 5 Days Dal Lake & Gulmarg (₹35K)', query: 'Plan a 5-day Kashmir family trip with Dal Lake houseboat and Gulmarg gondola for ₹35,000.', dest: 'kashmir', origin: 'Delhi (DEL)', days: 5, budget: 35000, travelers: 2, style: 'Comfort' as const },
  { label: '🏝️ Maldives 4 Days Overwater (₹1.2L)', query: 'Plan a 4-day romantic Maldives overwater villa honeymoon with budget ₹1.2 lakh.', dest: 'maldives', origin: 'Bangalore (BLR)', days: 4, budget: 120000, travelers: 2, style: 'Luxury' as const },
  { label: '🏔️ Swiss Alps 8 Days Luxury (₹3L)', query: 'I want an 8-day luxury Swiss Alps and Jungfraujoch tour from Mumbai budget ₹3 lakh.', dest: 'switzerland', origin: 'Mumbai (BOM)', days: 8, budget: 300000, travelers: 2, style: 'Luxury' as const },
];

export default function SmartTravelAIAgentHero() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<TripPlanConfig | null>(null);
  const [showWizardModal, setShowWizardModal] = useState(false);

  // Wizard State
  const [wizardDest, setWizardDest] = useState('manali');
  const [customDestInput, setCustomDestInput] = useState('');
  const [wizardOrigin, setWizardOrigin] = useState('Delhi (DEL)');
  const [wizardDays, setWizardDays] = useState(4);
  const [wizardBudget, setWizardBudget] = useState('30000');
  const [wizardTravelers, setWizardTravelers] = useState(2);
  const [wizardStyle, setWizardStyle] = useState<'Budget' | 'Comfort' | 'Luxury'>('Budget');

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
          setSpeechFeedback('Listening... Speak your travel dream (e.g., "Manali trip for couple budget 30000 inr")');
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
    const raw = text.toLowerCase().trim();
    setIsProcessing(true);

    setTimeout(() => {
      // 1. Extract Budget
      let parsedBudget = 0;
      // Match patterns like: "30000 inr", "30k", "1.5 lakh", "₹30,000", "budget 30000", "under 50k", "$1000"
      const budgetMatch = raw.match(/(?:budget\s*(?:of|for|is|around|under)?\s*)?(?:₹|rs\.?|inr|\$)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(lakh|lac|k|thousand|l|inr|rs|usd|\$)?/i);
      if (budgetMatch) {
        let num = parseFloat(budgetMatch[1].replace(/,/g, ''));
        const unit = budgetMatch[2]?.toLowerCase();
        if (unit === 'lakh' || unit === 'lac' || unit === 'l') {
          num = num * 100000;
        } else if (unit === 'k' || unit === 'thousand') {
          num = num * 1000;
        }
        if (num >= 5000) {
          parsedBudget = num;
        }
      }

      // 2. Extract Travelers
      let parsedTravelers = 2;
      if (raw.includes('couple') || raw.includes('husband') || raw.includes('wife') || raw.includes('partner') || raw.includes('2 people') || raw.includes('two')) {
        parsedTravelers = 2;
      } else if (raw.includes('solo') || raw.includes('alone') || raw.includes('myself') || raw.includes('single') || raw.includes('1 person')) {
        parsedTravelers = 1;
      } else if (raw.includes('family') || raw.includes('4 people') || raw.includes('four')) {
        parsedTravelers = 4;
      } else {
        const paxMatch = raw.match(/(\d+)\s*(?:people|persons|travelers|friends|adults|pax)/);
        if (paxMatch) parsedTravelers = Math.max(parseInt(paxMatch[1], 10), 1);
      }

      // 3. Extract Days / Duration
      const daysMatch = raw.match(/(\d+)\s*(?:days|day|nights|night|d|n)/);
      let parsedDays = daysMatch ? parseInt(daysMatch[1], 10) : 0;

      // 4. Extract Origin
      let parsedOrigin = '';
      if (raw.includes('delhi')) parsedOrigin = 'Delhi (DEL)';
      else if (raw.includes('mumbai') || raw.includes('bombay')) parsedOrigin = 'Mumbai (BOM)';
      else if (raw.includes('kolkata') || raw.includes('calcutta')) parsedOrigin = 'Kolkata (CCU)';
      else if (raw.includes('bangalore') || raw.includes('bengaluru')) parsedOrigin = 'Bangalore (BLR)';
      else if (raw.includes('chennai') || raw.includes('madras')) parsedOrigin = 'Chennai (MAA)';
      else if (raw.includes('hyderabad')) parsedOrigin = 'Hyderabad (HYD)';
      else if (raw.includes('ahmedabad')) parsedOrigin = 'Ahmedabad (AMD)';
      else if (raw.includes('pune')) parsedOrigin = 'Pune (PNQ)';
      else if (raw.includes('chandigarh')) parsedOrigin = 'Chandigarh (IXC)';
      else if (raw.includes('jaipur')) parsedOrigin = 'Jaipur (JAI)';
      else if (raw.includes('lucknow')) parsedOrigin = 'Lucknow (LKO)';
      else if (raw.includes('kochi') || raw.includes('cochin')) parsedOrigin = 'Kochi (COK)';
      else if (raw.includes('london')) parsedOrigin = 'London (LHR)';
      else if (raw.includes('new york') || raw.includes('nyc')) parsedOrigin = 'New York (JFK)';
      else if (raw.includes('dubai')) parsedOrigin = 'Dubai (DXB)';
      else if (raw.includes('singapore')) parsedOrigin = 'Singapore (SIN)';

      // 5. Extract Destination Name / Slug
      let matchedTarget = '';
      const destPatterns: Record<string, string[]> = {
        manali: ['manali', 'solang', 'rohtang', 'atal tunnel', 'kullu', 'kasol', 'sissu', 'himachal'],
        goa: ['goa', 'panaji', 'calangute', 'baga', 'anjuna', 'palolem', 'fontainhas', 'dudhsagar'],
        kerala: ['kerala', 'munnar', 'alleppey', 'alappuzha', 'kochi', 'cochin', 'varkala', 'wayanad', 'thekkady'],
        ladakh: ['ladakh', 'leh', 'pangong', 'nubra', 'khardung', 'hunder', 'zanskar'],
        kashmir: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'sonamarg', 'dal lake'],
        thailand: ['thailand', 'bangkok', 'phuket', 'pattaya', 'phi phi', 'krabi'],
        maldives: ['maldives', 'male', 'overwater', 'atoll'],
        dubai: ['dubai', 'burj', 'abu dhabi', 'emirates', 'sharjah'],
        bali: ['bali', 'indonesia', 'ubud', 'seminyak', 'canggu', 'nusa penida', 'kuta'],
        switzerland: ['swiss', 'switzerland', 'alps', 'zurich', 'interlaken', 'jungfrau', 'lucerne', 'zermatt'],
        japan: ['japan', 'tokyo', 'kyoto', 'osaka', 'fuji', 'shibuya', 'shinjuku'],
      };

      for (const [key, keywords] of Object.entries(destPatterns)) {
        if (keywords.some((kw) => raw.includes(kw))) {
          matchedTarget = key;
          break;
        }
      }

      // If not in standard keywords, extract destination noun from text
      if (!matchedTarget) {
        // Strip common prompt prefixes and budget words
        const cleaned = raw
          .replace(/i want (?:a )?budget for/g, '')
          .replace(/plan (?:a )?(?:budget )?(?:trip )?(?:to|for)?/g, '')
          .replace(/trip to/g, '')
          .replace(/holiday in/g, '')
          .replace(/for (?:a )?couple/g, '')
          .replace(/for solo(?: traveler)?/g, '')
          .replace(/for family/g, '')
          .replace(/\b\d+\s*(?:days|nights|day|night)\b/g, '')
          .replace(/\b(?:₹|rs\.?|inr|\$)?\s*\d+(?:,\d+)*(?:\.\d+)?\s*(?:lakh|lac|k|thousand|l|inr|rs)?\b/gi, '')
          .replace(/\b(?:from|leaving from)\s+[a-z\s]+/gi, '')
          .replace(/\b(?:budget|trip|tour|itinerary|package|cheap|luxury|best|places|visit|travel)\b/gi, '')
          .trim();

        matchedTarget = cleaned || 'manali';
      }

      // Defaults
      if (!parsedDays) {
        parsedDays = (matchedTarget === 'manali' || matchedTarget === 'goa') ? 4
          : (matchedTarget === 'kerala' || matchedTarget === 'dubai' || matchedTarget === 'bali' || matchedTarget === 'thailand') ? 5
          : (matchedTarget === 'switzerland' || matchedTarget === 'japan' || matchedTarget === 'ladakh') ? 7
          : 5;
      }

      if (!parsedOrigin) {
        parsedOrigin = (matchedTarget === 'manali' || matchedTarget === 'kashmir' || matchedTarget === 'ladakh') ? 'Delhi (DEL)'
          : (matchedTarget === 'goa') ? 'Mumbai (BOM)'
          : 'Kolkata (CCU)';
      }

      // Default budget if not specified
      if (!parsedBudget) {
        parsedBudget = (matchedTarget === 'manali' || matchedTarget === 'goa') ? 30000
          : (matchedTarget === 'kerala' || matchedTarget === 'kashmir') ? 45000
          : (matchedTarget === 'thailand' || matchedTarget === 'bali') ? 70000
          : (matchedTarget === 'dubai') ? 80000
          : (matchedTarget === 'maldives') ? 140000
          : (matchedTarget === 'japan') ? 150000
          : (matchedTarget === 'switzerland') ? 300000
          : 35000;
      }

      // Style
      let parsedStyle: 'Budget' | 'Comfort' | 'Luxury' = 'Comfort';
      const perPaxPerDay = parsedBudget / (parsedTravelers * parsedDays);
      if (raw.includes('luxury') || raw.includes('5 star') || perPaxPerDay > 9000) {
        parsedStyle = 'Luxury';
      } else if (raw.includes('budget') || raw.includes('cheap') || perPaxPerDay < 3500) {
        parsedStyle = 'Budget';
      }

      // Resolve guide dynamically with budget and traveler parameters
      const guide = getDestinationBySlug(matchedTarget, parsedBudget, parsedDays, parsedTravelers, parsedStyle);

      setActivePlan({
        destination: guide.name,
        origin: parsedOrigin,
        days: Math.min(Math.max(parsedDays, 3), 14),
        budget: parsedBudget,
        travelers: parsedTravelers,
        travelStyle: parsedStyle,
        guide,
      });

      setIsProcessing(false);
    }, 400);
  };

  const handleSelectQuickPrompt = (p: typeof QUICK_PROMPTS[0]) => {
    setQuery(p.query);
    setIsProcessing(true);
    setTimeout(() => {
      const guide = getDestinationBySlug(p.dest, p.budget, p.days, p.travelers, p.style);
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
    }, 300);
  };

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWizardModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      const targetSlug = wizardDest === 'custom' && customDestInput.trim() ? customDestInput.trim() : wizardDest;
      const budgetNum = parseInt(wizardBudget, 10) || 30000;
      const guide = getDestinationBySlug(targetSlug, budgetNum, wizardDays, wizardTravelers, wizardStyle);

      setActivePlan({
        destination: guide.name,
        origin: wizardOrigin,
        days: wizardDays,
        budget: budgetNum,
        travelers: wizardTravelers,
        travelStyle: wizardStyle,
        guide,
      });
      setIsProcessing(false);
    }, 300);
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
                    <option value="manali">🏔️ Manali (Solang, Atal Tunnel & Rohtang)</option>
                    <option value="goa">🏖️ Goa (North Beaches & South Heritage)</option>
                    <option value="kerala">🌴 Kerala (Munnar Tea Hills & Alleppey Houseboat)</option>
                    <option value="ladakh">🏔️ Ladakh (Pangong Lake & Khardung La)</option>
                    <option value="kashmir">❄️ Kashmir (Dal Lake & Gulmarg Gondola)</option>
                    <option value="thailand">🏝️ Thailand (Bangkok & Phuket Speedboats)</option>
                    <option value="maldives">🏝️ Maldives (Overwater Luxury Bungalow)</option>
                    <option value="dubai">🏙️ Dubai & Arabian Desert Safari</option>
                    <option value="bali">🌴 Bali Tropical Paradise & Nusa Penida</option>
                    <option value="switzerland">🏔️ Switzerland & Swiss Alps</option>
                    <option value="japan">🌸 Japan (Tokyo, Kyoto & Mt Fuji)</option>
                    <option value="custom">✨ Custom Destination (Type Any City/Place)...</option>
                  </select>

                  {wizardDest === 'custom' && (
                    <input
                      type="text"
                      required
                      value={customDestInput}
                      onChange={(e) => setCustomDestInput(e.target.value)}
                      placeholder="Enter any destination (e.g., Shimla, Kedarnath, Paris, Ooty)..."
                      className="mt-2 w-full bg-slate-950 border border-sky-500 rounded-xl px-3 py-2 text-white placeholder:text-slate-500"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Leaving From</label>
                  <input
                    type="text"
                    value={wizardOrigin}
                    onChange={(e) => setWizardOrigin(e.target.value)}
                    placeholder="e.g. Delhi, Kolkata, Mumbai, London"
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
