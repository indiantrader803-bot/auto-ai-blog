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

      {/* Main Luxury Navigation Bar (SmartMag Tech Style) */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg border-slate-200/80 dark:border-slate-800"
            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo with SmartMag Tech badge */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                    SMART<span className="text-indigo-600 dark:text-indigo-400">MAG</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[9px] font-black uppercase tracking-wider">
                    TECH
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400 dark:text-slate-400">
                  Autonomous AI &amp; Editorial Chronicle
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2 border-b-2 border-transparent hover:border-indigo-600"
              >
                Home
              </Link>
              <Link
                href="/category/artificial-intelligence"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 py-2"
              >
                <span>AI &amp; Models</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              </Link>
              <Link
                href="/category/development-and-engineering"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                Engineering
              </Link>
              <Link
                href="/category/finance-and-markets"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                Markets
              </Link>
              <Link
                href="/category/technology"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                Reviews &amp; Gadgets
              </Link>
              <Link
                href="/about"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                Editorial
              </Link>
            </nav>

            {/* Right Action Icons: Live Search, Theme Switcher, Subscribe CTA */}
            <div className="flex items-center gap-3">
              {/* Search Modal Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-xs font-medium group"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Subscribe CTA Button */}
              <Link
                href="#newsletter-subscribe"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Subscribe</span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
