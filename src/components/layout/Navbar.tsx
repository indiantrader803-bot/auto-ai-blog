"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  Flame,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Mail,
  Zap,
  Radio,
  Github,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import SearchModal from "./SearchModal";
import LanguageSelector from "./LanguageSelector";
import PushNotificationBanner from "../common/PushNotificationBanner";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Top Flash Bar / Trending Ticker (SmartMag Style) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80 font-sans select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Trending Ticker */}
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-sm shadow-rose-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              TRENDING
            </span>
            <div className="flex items-center gap-2 truncate text-[11px] text-slate-300">
              <Link
                href="/blog/the-agentic-revolution-autonomous-ai-swarms"
                className="hover:text-amber-300 transition-colors truncate font-medium"
              >
                Next-Gen Autonomous Agentic Swarms &amp; Edge Inference Transforming Modern Engineering
              </Link>
            </div>
          </div>

          {/* Right: Date, Socials & Quick Actions */}
          <div className="hidden md:flex items-center gap-5 text-slate-400 text-[11px] shrink-0 font-medium">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">LIVE 24/7 DISPATCH</span>
            </div>

            <a
              href="#newsletter"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 border-l border-slate-800 pl-4"
            >
              <Sparkles className="w-3 h-3" /> Get VIP Daily Briefing →
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-slate-200/80 dark:border-slate-800"
            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        }`}
      >
        {/* Tier 1: Logo & Actions Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo with Badge */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                  SMART<span className="text-indigo-600 dark:text-indigo-400">MAG</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[9px] font-black uppercase tracking-wider">
                  TECH
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-400">
                Autonomous AI Chronicle
              </span>
            </div>
          </Link>

          {/* Right Actions Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-950 transition-all text-xs font-medium group min-w-[120px] sm:min-w-[200px]"
              aria-label="Search"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">Search AI topics...</span>
              </div>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 font-mono shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Web Push Alerts */}
            <PushNotificationBanner />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Subscribe CTA Button */}
            <Link
              href="#newsletter-subscribe"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tier 2: Category Navigation Menu Bar */}
        <div className="hidden lg:block border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-7 py-2.5 overflow-x-auto text-xs font-bold uppercase tracking-wider">
              <Link
                href="/"
                className="text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <Link
                href="/category/indian-markets"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>🇮🇳 Indian Markets</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </Link>
              <Link
                href="/category/us-markets"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>🇺🇸 US Markets</span>
              </Link>
              <Link
                href="/category/forex-and-currencies"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
              >
                Forex (USD/INR)
              </Link>
              <Link
                href="/category/commodities"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
              >
                Commodities (Gold/Crude)
              </Link>
              <Link
                href="/category/artificial-intelligence"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>AI &amp; Tech</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white"
            >
              Featured Stories
            </Link>
            <Link
              href="/category/artificial-intelligence"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              AI &amp; Models
            </Link>
            <Link
              href="/category/development-and-engineering"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Software Engineering
            </Link>
            <Link
              href="/category/finance-and-markets"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Markets &amp; Wealth
            </Link>
            <Link
              href="/category/technology"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Reviews &amp; Gadgets
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Editorial &amp; About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <a
                href="#newsletter"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider w-full text-center"
              >
                Join VIP Newsletter Free
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
