"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, Search, Menu, X, Flame, TrendingUp, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      {/* Top Breaking News Bar */}
      <div className="bg-slate-900 dark:bg-black text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-300" /> Breaking
            </span>
            <span className="text-slate-300 truncate text-[11px]">
              Next-Gen Autonomous Agentic Swarms & Edge Compute Reshaping Modern Software Engineering
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px] shrink-0">
            <span>{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">Editorial Board</Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-slate-200/80 dark:border-slate-800"
            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                  CHRONICLE<span className="text-indigo-600 dark:text-indigo-400">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400">
                  Global Intelligence Journal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Featured
              </Link>
              <Link
                href="/category/artificial-intelligence"
                className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
              >
                AI &amp; Models
              </Link>
              <Link
                href="/category/development-and-engineering"
                className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Engineering
              </Link>
              <Link
                href="/category/finance-and-markets"
                className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Markets
              </Link>
              <Link
                href="/category/technology"
                className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Tech &amp; Gadgets
              </Link>
            </nav>

            {/* Actions: Dark Mode, Search, Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-6 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-bold text-slate-900 dark:text-white"
            >
              Featured Stories
            </Link>
            <Link
              href="/category/artificial-intelligence"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300"
            >
              AI &amp; Machine Learning
            </Link>
            <Link
              href="/category/development-and-engineering"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300"
            >
              Software Engineering
            </Link>
            <Link
              href="/category/finance-and-markets"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300"
            >
              Markets &amp; Wealth
            </Link>
            <Link
              href="/category/technology"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300"
            >
              Technology Trends
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300"
            >
              About &amp; Editorial Policy
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
