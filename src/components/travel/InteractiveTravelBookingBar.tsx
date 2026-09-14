"use client";

import { useState } from "react";
import {
  Plane,
  Building2,
  Ticket,
  Car,
  ShieldCheck,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
  Flame,
} from "lucide-react";
import TravelpayoutsWidget from "./TravelpayoutsWidget";

export interface BookingWidgetTab {
  id: string;
  name: string;
  badge: string;
  icon: any;
  scriptSrc: string;
  description: string;
  minHeight: string;
}

export const BOOKING_WIDGET_TABS: BookingWidgetTab[] = [
  {
    id: "flights",
    name: "Cheap Flights",
    badge: "1,000+ AIRLINES",
    icon: Plane,
    scriptSrc:
      "https://tpemb.com/content?currency=USD&trs=573745&shmarker=777349&language=en&theme=1&powered_by=true&campaign_id=1&promo_id=1486",
    description: "Search and compare real-time airfares with lowest price guarantee across all global airlines.",
    minHeight: "320px",
  },
  {
    id: "hotels",
    name: "Hotels & Stays",
    badge: "BEST PRICE MATCH",
    icon: Building2,
    scriptSrc:
      "https://tpemb.com/content?trs=573745&shmarker=777349&locale=en&width=100&height=100&powered_by=true&campaign_id=10&promo_id=2082",
    description: "Book luxury resorts, boutique hotels, and apartments with instant confirmation & free cancellation.",
    minHeight: "340px",
  },
  {
    id: "klook",
    name: "Klook Tours & Passes",
    badge: "SAVE UP TO 60%",
    icon: Ticket,
    scriptSrc:
      "https://tpemb.com/content?currency=USD&trs=573745&shmarker=777349&locale=en&city_id=2&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497",
    description: "Skip-the-line attraction tickets, JR Rail Passes, theme parks, and day excursions with instant QR vouchers.",
    minHeight: "360px",
  },
  {
    id: "cars",
    name: "Car Rentals",
    badge: "20,000+ HUBS",
    icon: Car,
    scriptSrc:
      "https://tpemb.com/content?currency=usd&trs=573745&shmarker=777349&powered_by=true&locale=en&campaign_id=111&promo_id=4484",
    description: "Compare Hertz, Avis, Sixt, Europcar, and local rental agencies with zero hidden credit card fees.",
    minHeight: "320px",
  },
  {
    id: "airhelp",
    name: "Flight Delay Claim",
    badge: "UP TO €600",
    icon: ShieldCheck,
    scriptSrc:
      "https://tpemb.com/content?trs=573745&shmarker=777349&locale=en&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=5&plain=false&no_labels=true&promo_id=8588&campaign_id=541",
    description: "Check if your delayed, cancelled, or overbooked flight qualifies for up to €600 in cash compensation.",
    minHeight: "320px",
  },
  {
    id: "tiqets",
    name: "Museums & Sights",
    badge: "MOBILE PASS",
    icon: MapPin,
    scriptSrc:
      "https://tpemb.com/content?currency=USD&trs=573745&shmarker=777349&language=en&layout=full&orientation=vertical&powered_by=true&campaign_id=89&promo_id=3984",
    description: "Instant mobile entry passes to the world's most famous museums, landmarks, and cultural monuments.",
    minHeight: "380px",
  },
  {
    id: "schedule",
    name: "Flight Calendar",
    badge: "PRICE CALENDAR",
    icon: Calendar,
    scriptSrc:
      "https://tpemb.com/content?currency=USD&trs=573745&shmarker=777349&locale=en&from=&to=&country=&powered_by=true&height=&wtype=true&transfers_limit=10&bg_color=%23f5f5f5&button_color=%23239a54&button_font_color=%23ffffff&button_hover_color=%230274da&border_color=%23f9ac1a&input_font_color=%23c8ced4&input_bg_color=%23ffffff&input_label_color=%23c8ced4&icon_bg_color=%23ffffff&icon_arrow_color=%236c7c8c&icon_bg_color_mobile=%23f9ac1a&icon_arrow_color_mobile=%23ffffff&autocomplete_font_color=%23373f47&autocomplete_bg_color=%23ffffff&autocomplete_font_color_active=%23ffffff&autocomplete_bg_color_active=%23239a54&loader_color=%23f9ac1a&empty_color=%23373f47&info_bg_color=%23fff0cc&info_icon_color=%234a4a4a&info_caption_color=%234a4a4a&class_background=%23ffffff&class_font_color=%23373f47&class_header_color=%236c7c8c&class_button_background=%2326a65b&class_button_font_color=%23ffffff&class_button_background_hover=%230274da&class_comment_background=%23bfc0c4&class_comment_font=%23bfc0c4&more_background=&more_background_hover=&more_font_color=%230267c1&notification_background=%23f6f1ec&notification_border_color=%23e37f17&notification_color=%23373f47&transfer_background=%23f6f7f8&transfer_background_hover=%23f6f7f8&transfer_font_color=%23373f47&campaign_id=1&promo_id=2949",
    description: "Track monthly price drops, direct flight schedules, and transfer stopovers worldwide.",
    minHeight: "360px",
  },
];

interface InteractiveTravelBookingBarProps {
  defaultTab?: string;
  className?: string;
  title?: string;
}

export default function InteractiveTravelBookingBar({
  defaultTab = "flights",
  className = "",
  title = "⚡ Live Flight, Hotel & Activity Search Engine",
}: InteractiveTravelBookingBarProps) {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTab);

  const activeTab = BOOKING_WIDGET_TABS.find((t) => t.id === activeTabId) || BOOKING_WIDGET_TABS[0];
  const IconComponent = activeTab.icon;

  return (
    <div className={`my-10 rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden font-sans ${className}`}>
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/30 text-sky-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
              Direct Travelpayouts Partner Engine
            </span>
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <Flame className="w-3 h-3" /> Live Real-Time Pricing
            </span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black font-serif text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {activeTab.description}
          </p>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none relative z-10">
        {BOOKING_WIDGET_TABS.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 scale-105"
                  : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60"
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Widget Render Container */}
      <div className="relative z-10">
        <TravelpayoutsWidget
          key={activeTab.id}
          scriptSrc={activeTab.scriptSrc}
          minHeight={activeTab.minHeight}
          className="!bg-slate-950/90 !border-slate-800 text-white"
        />
      </div>
    </div>
  );
}
