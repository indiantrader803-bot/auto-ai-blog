"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LanguageSelector from "@/components/layout/LanguageSelector";
import {
  Plane,
  Car,
  Ticket,
  Wifi,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  Flame,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Globe,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function TravelNavbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Transfers", href: "#transfers", icon: Car },
    { name: "Flights", href: "#flights", icon: Plane },
    { name: "Attractions", href: "#attractions", icon: Ticket },
    { name: "eSIM Data", href: "#esim", icon: Wifi },
    { name: "€600 Claim", href: "#compensation", icon: ShieldCheck },
    { name: "Destinations", href: "#destinations", icon: MapPin },
    { name: "Essentials", href: "#essentials", icon: Compass },
  ];

  return (
    <>
      {/* 🌟 Slim Top Travel Deals Announcement Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 text-white text-[11px] font-semibold py-1.5 px-4 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-black uppercase text-[9px] tracking-wider flex items-center gap-1 shrink-0">
              <Flame className="w-3 h-3 text-amber-300" /> PROMO
            </span>
            <span className="truncate">
              Save up to 60% on Klook &amp; Tiqets passes • $3.99 instant eSIMs • Up to €600 flight delay compensation
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Best Price Guarantee
            </span>
            <span className="text-white/30">|</span>
            <span className="text-sky-100">175+ Countries Served</span>
          </div>
        </div>
      </div>

      {/* ✈️ Dedicated Standalone Travel Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b font-sans ${
          scrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-slate-200 dark:border-slate-800"
            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
            {/* 🏷️ Standalone Travel Logo */}
            <Link href="/travel" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
                <Plane className="w-5 h-5 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>

              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                    SMART<span className="text-sky-500 dark:text-sky-400">TRAVEL</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-[9px] font-black uppercase tracking-wider">
                    HUB
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.16em] font-semibold text-slate-400">
                  Global Booking Portal
                </span>
              </div>
            </Link>

            {/* 🌐 Desktop Category Links (Clean & Spacious) */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300">
              {navLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 rounded-xl hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-sky-500" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* ⚙️ Right Utility Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language Selector */}
              <LanguageSelector />

              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-500" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                    {["USD ($)", "EUR (€)", "GBP (£)", "AUD ($)", "CAD ($)", "INR (₹)", "JPY (¥)", "AED (د.إ)"].map((curr) => {
                      const code = curr.split(" ")[0];
                      return (
                        <button
                          key={curr}
                          onClick={() => {
                            setCurrency(code);
                            setIsCurrencyOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            currency === code
                              ? "bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {curr}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* News Link */}
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all border border-slate-200 dark:border-slate-700/60"
              >
                <span>News</span>
              </Link>

              {/* Mobile Drawer Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                aria-label="Open travel menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 py-5 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200 font-sans">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Language:</span>
              <LanguageSelector />
            </div>

            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkIcon className="w-4 h-4 text-sky-500" />
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              );
            })}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"
              >
                <span>← Back to SmartMag News &amp; Articles</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
