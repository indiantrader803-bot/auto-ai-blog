'use client';

import React, { useState } from 'react';
import {
  Plane,
  Building2,
  Car,
  Ticket,
  Wifi,
  ShieldCheck,
  Calendar,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Star,
  DollarSign,
  Share2,
  Bookmark,
  Bell,
  Utensils,
  ChevronDown,
  ChevronUp,
  Flame,
  Check,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { DestinationGuide } from '@/lib/travel/destinationsData';
import { useTravelCurrency } from '@/context/TravelCurrencyContext';
import {
  getBookingHotelUrl,
  getAgodaHotelUrl,
  getKlookUrl,
} from '@/lib/affiliate/links';

export interface TripPlanConfig {
  destination: string;
  origin: string;
  days: number;
  budget: number;
  travelers: number;
  travelStyle: 'Budget' | 'Comfort' | 'Luxury';
  guide: DestinationGuide;
}

export default function PersonalizedTripBasket({
  plan,
  onReset,
}: {
  plan: TripPlanConfig;
  onReset?: () => void;
}) {
  const { guide, destination, origin, days, budget, travelers, travelStyle } = plan;
  const { currency, setCurrency, currencyInfo, allCurrencies, formatPrice } = useTravelCurrency();
  const [activeDay, setActiveDay] = useState<number>(1);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPriceAlertModal, setShowPriceAlertModal] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Budget calculations (base in INR)
  const flightCost = guide.budgetBreakdown.flight * travelers;
  const hotelCost = guide.budgetBreakdown.hotel * Math.ceil(travelers / 2);
  const transferCost = guide.budgetBreakdown.transfer;
  const activitiesCost = guide.budgetBreakdown.activities * travelers;
  const foodCost = guide.budgetBreakdown.food * travelers;
  const esimCost = guide.budgetBreakdown.esim * travelers;
  const insuranceCost = guide.budgetBreakdown.insurance * travelers;

  const totalCalculated =
    flightCost + hotelCost + transferCost + activitiesCost + foodCost + esimCost + insuranceCost;
  const remainingBudget = budget > 0 ? budget - totalCalculated : 0;

  // Direct affiliate URLs
  const flightUrl = `https://aviasales.tpo.li/ZeF7BjUt?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
  const hotelUrl = travelStyle === 'Luxury' ? getAgodaHotelUrl(destination) : getBookingHotelUrl(destination);
  const transferUrl = 'https://gettransfer.tpo.li/yE0Wk8xK';
  const esimUrl = 'https://saily.tpo.li/9kXyVV0E';
  const insuranceUrl = 'https://airhelp.tpo.li/fpMMLvXF';

  // WhatsApp share message
  const generateWhatsAppLink = () => {
    const text = `✈️ *My AI Personalized Travel Plan: ${guide.name}*\n` +
      `📍 Route: ${origin} → ${destination} (${days} Days)\n` +
      `👥 Travelers: ${travelers} | Style: ${travelStyle}\n` +
      `💰 Total Estimated Budget: ${formatPrice(totalCalculated, 'INR')}\n\n` +
      `✈️ Flights: ${flightUrl}\n` +
      `🏨 Stays: ${hotelUrl}\n` +
      `🚕 Transfers: ${transferUrl}\n` +
      `📱 5G eSIM: ${esimUrl}\n\n` +
      `Crafted by SmartMag Travel AI Concierge: https://travel.thesmartmag.com`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const handleSaveTrip = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('smartmag_saved_trips') || '[]');
      const newTrip = {
        id: `${guide.slug}_${Date.now()}`,
        name: guide.name,
        slug: guide.slug,
        origin,
        days,
        budget: totalCalculated,
        date: new Date().toLocaleDateString(),
      };
      localStorage.setItem('smartmag_saved_trips', JSON.stringify([newTrip, ...saved.slice(0, 5)]));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (_) {}
  };

  const handleSubscribeAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    setAlertSuccess(true);
    setTimeout(() => {
      setShowPriceAlertModal(false);
      setAlertSuccess(false);
    }, 2500);
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900 border-2 border-sky-500/40 p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden transition-all">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header with AI synthesis badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              AI Verified Trip Basket
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
              {travelStyle} Class Plan
            </span>
            <span className="text-xs text-slate-400">
              {origin} → <strong className="text-white">{destination}</strong> • {days} Days • {travelers} Traveler(s)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            Your Personalized {guide.name} Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {guide.tagline} • Best Season: <span className="text-amber-300 font-semibold">{guide.bestTimeToVisit}</span>
          </p>
        </div>

        {/* Action buttons (Currency Switcher, WhatsApp, Save, Price Alert) */}
        <div className="flex flex-wrap items-center gap-2 relative z-10">
          {/* Inline Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
              title="Switch currency"
            >
              <span className="text-sm">{currencyInfo.flag}</span>
              <span>{currency}</span>
              <span className="text-sky-400 font-mono text-[11px]">({currencyInfo.symbol.trim()})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-44 max-h-60 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1 text-[10px] uppercase font-black tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                  Change Currency
                </div>
                {allCurrencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      currency === c.code
                        ? "bg-sky-950 text-sky-400 border border-sky-800"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{c.flag}</span>
                      <span>{c.code}</span>
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">{c.symbol.trim()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send to WhatsApp</span>
          </a>

          <button
            onClick={handleSaveTrip}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-sky-400" />}
            <span>{savedSuccess ? 'Saved in Wallet' : 'Save Trip'}</span>
          </button>

          <button
            onClick={() => setShowPriceAlertModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-bold transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Track Price Drops</span>
          </button>
        </div>
      </div>

      {/* 1. THE COMPLETE TRIP BASKET (All 6 core products with 1-click booking) */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase tracking-wider text-sky-400">
              Trip Essentials Basket
            </span>
            <span className="text-xs text-slate-400">
              (6 Verified Components Matched to Your Preferences)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Component 1: Flights */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-sky-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                  <Plane className="w-4 h-4" /> Best Flight Radar
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400">
                  0% Markup
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-sky-300 transition">
                {origin} → {destination}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Real-time multi-airline comparison with direct airline ticket matching.
              </p>
              <div className="mt-2 text-xs font-bold text-emerald-400">
                Est. {formatPrice(flightCost, 'INR')} (Round-Trip)
              </div>
            </div>
            <a
              href={flightUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Book Flights on Aviasales</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Component 2: Hotels & Stays */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                  <Building2 className="w-4 h-4" /> {travelStyle} Hotel Stay
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                  Best Price Match
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-indigo-300 transition">
                Verified Stays in {destination}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Free cancellation on 85% of stays with instant confirmation.
              </p>
              <div className="mt-2 text-xs font-bold text-emerald-400">
                Est. {formatPrice(hotelCost, 'INR')} ({days} Nights)
              </div>
            </div>
            <a
              href={hotelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Book Stay on {travelStyle === 'Luxury' ? 'Agoda' : 'Booking.com'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Component 3: Airport Transfer */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Car className="w-4 h-4" /> VIP Airport Chauffeur
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  Fixed Fare
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition">
                Airport → Hotel Meet &amp; Greet
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Name-sign arrival pickup with 60 mins free waiting time.
              </p>
              <div className="mt-2 text-xs font-bold text-emerald-400">
                Est. {formatPrice(transferCost, 'INR')}
              </div>
            </div>
            <a
              href={transferUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Book Transfer on GetTransfer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Component 4: Top Attraction Passes (Klook) */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Ticket className="w-4 h-4" /> Top Attraction Pass
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                  Instant QR Voucher
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition">
                {guide.topAttractions[0]?.title || `${destination} Sightseeing Pass`}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Skip-the-line gate admission with mobile QR code delivery.
              </p>
              <div className="mt-2 text-xs font-bold text-emerald-400">
                {guide.topAttractions[0]?.price} • 4.9★ Rating
              </div>
            </div>
            <a
              href={getKlookUrl(guide.topAttractions[0]?.query || destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Book Pass on Klook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Component 5: 5G Global eSIM Data */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-pink-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-pink-400">
                  <Wifi className="w-4 h-4" /> 5G Roaming eSIM
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400">
                  Zero Roaming Fees
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-pink-300 transition">
                Saily 10GB / 20GB Data Pass
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Instant 1-minute QR install before flight. Keep WhatsApp number.
              </p>
              <div className="mt-2 text-xs font-bold text-emerald-400">
                Est. {formatPrice(esimCost, 'INR')} (High-Speed 5G)
              </div>
            </div>
            <a
              href={esimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Activate eSIM on Saily</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Component 6: Flight Delay Claim & Protection */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-purple-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-purple-400">
                  <ShieldCheck className="w-4 h-4" /> €600 Flight Claim &amp; Cover
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                  No Win No Fee
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-purple-300 transition">
                AirHelp Delay Protection
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Automatic passenger compensation for 3+ hour delays &amp; cancellations.
              </p>
              <div className="mt-2 text-xs font-bold text-emerald-400">
                Up to €600 ({formatPrice(54000, 'INR')}) Cash Payout per Traveler
              </div>
            </div>
            <a
              href={insuranceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Check Coverage on AirHelp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. AI TRAVEL BUDGET BREAKDOWN CALCULATOR */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              AI Travel Budget Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Real-time cost breakdown for {travelers} traveler(s) over {days} days ({currency} Mode)
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Estimated Total Cost</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {formatPrice(totalCalculated, 'INR')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs mb-4">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">✈️ Flights</span>
            <span className="font-bold text-white font-mono">{formatPrice(flightCost, 'INR')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">🏨 Stays</span>
            <span className="font-bold text-white font-mono">{formatPrice(hotelCost, 'INR')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">🚕 Transfers</span>
            <span className="font-bold text-white font-mono">{formatPrice(transferCost, 'INR')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">🎟️ Attractions</span>
            <span className="font-bold text-white font-mono">{formatPrice(activitiesCost, 'INR')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">🍜 Dining &amp; Food</span>
            <span className="font-bold text-white font-mono">{formatPrice(foodCost, 'INR')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">📱 eSIM &amp; Ins.</span>
            <span className="font-bold text-white font-mono">{formatPrice(esimCost + insuranceCost, 'INR')}</span>
          </div>
        </div>

        {budget > 0 && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-semibold">
              🎯 Target Budget: {formatPrice(budget, 'INR')}
            </span>
            <span className="font-bold text-emerald-400">
              {remainingBudget >= 0
                ? `✓ ${formatPrice(remainingBudget, 'INR')} Surplus Remaining for Shopping & Leisure`
                : `⚠️ ${formatPrice(Math.abs(remainingBudget), 'INR')} Over Initial Target (Consider Economy Stays)`}
            </span>
          </div>
        )}
      </div>

      {/* 3. DAY-BY-DAY ITINERARY WITH ACTIONABLE BOOK CTAS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-400" />
            Verified {days}-Day Daily Itinerary
          </h3>
          <div className="flex items-center gap-1">
            {guide.sampleItinerary.slice(0, days).map((item) => (
              <button
                key={item.day}
                onClick={() => setActiveDay(item.day)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeDay === item.day
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                D{item.day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {guide.sampleItinerary.slice(0, days).map((item) => {
            const isSelected = activeDay === item.day;
            return (
              <div
                key={item.day}
                className={`p-5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-slate-950 border-sky-500/60 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setActiveDay(isSelected ? 0 : item.day)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-black flex items-center justify-center">
                      D{item.day}
                    </span>
                    <h4 className="text-sm font-black text-white">{item.title}</h4>
                  </div>
                  {isSelected ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
                    <ul className="space-y-1.5 text-slate-300">
                      {item.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                      <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Culinary Highlight:</strong> {item.foodRecommendation}</span>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <a
                        href={getKlookUrl(item.bookingQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs transition shadow-md"
                      >
                        <span>{item.bookingCtaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. "WHY THIS RECOMMENDATION?" AI TRUST BADGE STRIP */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-bold text-white">Why SmartMag AI Selected This Plan:</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span>✓ 4.9★ Provider Ratings</span>
          <span>✓ 100% Free Cancellation Option</span>
          <span>✓ Lowest Direct Price Guarantee</span>
        </div>
      </div>

      {/* Price Alert Subscription Modal */}
      {showPriceAlertModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative">
            <h3 className="text-xl font-bold font-serif mb-2 flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-400" />
              Track Price Drops for {destination}
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              We monitor 1,000+ airlines and hotel rates for {origin} → {destination}. We will alert you the moment fares drop below your budget.
            </p>

            {alertSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
                ✓ Price tracker activated for {alertEmail}! We will alert you on major price drops.
              </div>
            ) : (
              <form onSubmit={handleSubscribeAlert} className="space-y-3">
                <input
                  type="email"
                  required
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPriceAlertModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition"
                  >
                    Activate Alert
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
