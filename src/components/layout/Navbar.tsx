"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Moon, Sun, Search, LayoutDashboard, Menu, X, Flame } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Auto<span className="gradient-text">AI</span> Chronicle
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Automated
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/category/artificial-intelligence"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              AI & Tech
            </Link>
            <Link
              href="/category/finance-and-markets"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Finance & Markets
            </Link>
            <Link
              href="/category/development-and-engineering"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Development
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Actions: Search, Dark Mode, Admin Button */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Switch */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Dashboard CTA */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-lg shadow transition-all duration-200"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Portal
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-900 dark:text-white"
          >
            Home
          </Link>
          <Link
            href="/category/artificial-intelligence"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300"
          >
            AI & Tech Trends
          </Link>
          <Link
            href="/category/finance-and-markets"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300"
          >
            Finance & Markets
          </Link>
          <Link
            href="/category/development-and-engineering"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300"
          >
            Development
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-300"
          >
            About
          </Link>
          <div className="pt-2">
            <Link
              href="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
