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
  ChevronRight,
  Mail,
  Zap,
  Radio,
  Github,
  Twitter,
  Youtube,
  Linkedin,
  Facebook,
  Instagram,
  MessageSquare,
  Bot,
  Compass,
  Plane,
  Crown,
  User,
  LogOut,
  KeyRound,
} from "lucide-react";
import SearchModal from "./SearchModal";
import LanguageSelector from "./LanguageSelector";
import PushNotificationBanner from "../common/PushNotificationBanner";
import { useVip } from "@/context/VipAuthContext";

export interface NavCategory {
  id?: string;
  name: string;
  slug: string;
  isHot?: boolean;
  count?: number;
}

interface NavbarProps {
  hotTopicPost?: {
    title: string;
    slug: string;
  };
  trendingCategories?: NavCategory[];
}

const DEFAULT_CATEGORIES: NavCategory[] = [
  { name: "⚡ Technology", slug: "technology", isHot: true, count: 96 },
  { name: "🤖 Artificial Intelligence", slug: "artificial-intelligence", isHot: true, count: 77 },
  { name: "✈️ Travel & Expeditions", slug: "travel-and-expeditions", isHot: true, count: 12 },
  { name: "🎉 Festivals & Culture", slug: "festivals-and-culture", isHot: true, count: 10 },
  { name: "📱 Tech & Gadgets", slug: "tech-and-gadgets", isHot: true, count: 20 },
  { name: "🪙 Commodities", slug: "commodities", isHot: true, count: 5 },
  { name: "💻 Development", slug: "development-and-engineering", isHot: true, count: 4 },
  { name: "🎮 Gaming Platforms", slug: "gaming-and-platforms", isHot: true, count: 8 },
  { name: "🎬 Animation & Cinema", slug: "animation-and-cinema", isHot: true, count: 6 },
  { name: "🇮🇳 Indian Markets", slug: "indian-markets", isHot: true, count: 3 },
  { name: "📡 Telecom & 5G", slug: "telecom-and-connectivity", isHot: false, count: 2 },
];

export default function Navbar({ hotTopicPost, trendingCategories }: NavbarProps) {
  const { isVip, user, refreshVipStatus } = useVip();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<NavCategory[]>(trendingCategories || DEFAULT_CATEGORIES);
  const [tickerPost, setTickerPost] = useState<{ title: string; slug: string }>(
    hotTopicPost || {
      title: "Astra for Coding: Why Are We Doing This Again?",
      slug: "astra-for-coding-why-are-we-doing-this-again",
    }
  );

  // Fetch live prioritized categories from real DB
  useEffect(() => {
    const fetchLiveNavData = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success && json.categories?.length > 0) {
          setCategories(json.categories);
        }
        if (json.topTrendingPost && !hotTopicPost) {
          setTickerPost(json.topTrendingPost);
        }
      } catch (err) {
        console.warn("Notice loading dynamic nav categories:", err);
      }
    };
    fetchLiveNavData();
  }, [hotTopicPost]);

  useEffect(() => {
    if (trendingCategories && trendingCategories.length > 0) {
      setCategories(trendingCategories);
    }
    if (hotTopicPost) {
      setTickerPost(hotTopicPost);
    }
  }, [trendingCategories, hotTopicPost]);

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
      <div className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-200 dark:border-slate-800/80 font-sans select-none overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
          {/* Left: Trending Ticker */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0 flex-1">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1 sm:gap-1.5 shadow-sm shadow-rose-500/20">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
              </span>
              TRENDING
            </span>
            <div className="flex items-center gap-1.5 truncate text-[11px] text-slate-700 dark:text-slate-300 min-w-0 flex-1">
              <Link
                href={`/blog/${tickerPost.slug}`}
                className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors truncate font-medium flex items-center gap-1.5 min-w-0"
              >
                <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0 animate-pulse" />
                <span className="truncate">{tickerPost.title}</span>
              </Link>
            </div>
          </div>

          {/* Right: Date, Socials & Quick Actions */}
          <div className="hidden xl:flex items-center gap-5 text-slate-500 dark:text-slate-400 text-[11px] shrink-0 font-medium">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">LIVE 24/7 AGENT FLEET</span>
            </div>

            <a
              href="https://x.com/Theindainta9go"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-800 pl-4"
              title="Follow @Theindainta9go on X"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-500" />
              <span>@Theindainta9go</span>
            </a>

            <a
              href="https://www.linkedin.com/in/indian-trader-804333436/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-800 pl-3"
              title="Connect on LinkedIn (Indian Trader)"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61594475423154"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-800 pl-3"
              title="Follow Indian Trader on Facebook"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-600" />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/indiantrader8032026/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-800 pl-3"
              title="Follow @indiantrader8032026 on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.reddit.com/user/Indiantrader803/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-800 pl-3"
              title="Follow u/Indiantrader803 on Reddit"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-orange-500 text-[9px] font-black text-white flex items-center justify-center">r</span>
              <span>Reddit</span>
            </a>

            <a
              href="#newsletter"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-4"
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo with Badge */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all duration-300">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                  SMART<span className="text-indigo-600 dark:text-indigo-400">MAG</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                  TECH
                </span>
              </div>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.18em] font-bold text-slate-400 dark:text-slate-400">
                Autonomous AI Chronicle
              </span>
            </div>
          </Link>

          {/* Right Actions Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-950 transition-all text-xs font-medium group cursor-pointer"
              aria-label="Search articles"
            >
              <Search className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 font-mono shrink-0 ml-0.5">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector (Tablet & Desktop) */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Push Notifications (Desktop xl+) */}
            <div className="hidden xl:block">
              <PushNotificationBanner />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors shrink-0 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* VIP Authentication / Profile Area */}
            {user && isVip ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-indigo-500/15 border border-amber-500/40 hover:border-amber-400 text-slate-900 dark:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="VIP Member Menu"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[90px] truncate text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {user.name?.split(" ")[0] || "VIP"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                      <div className="p-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          <span className="truncate">{user.name || "VIP Member"}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                          {user.vipTier || "VIP Member"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/vip/profile"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-teal-500" />
                          <span>My VIP Profile</span>
                        </Link>

                        <Link
                          href="/vip"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                        >
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          <span>VIP Lounge &amp; Perks</span>
                        </Link>

                        <Link
                          href="/vip/profile#security"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Change Password</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={async () => {
                            setIsProfileMenuOpen(false);
                            await fetch("/api/auth/logout", { method: "POST" });
                            await refreshVipStatus();
                            window.location.href = "/";
                          }}
                          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold transition-colors cursor-pointer text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/vip/login"
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
              >
                <span>👑 VIP</span>
              </Link>
            )}

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shrink-0 cursor-pointer shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <>
                  <Menu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-black uppercase tracking-wider hidden xs:inline">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tier 2: Category Navigation Bar with Edge-Fade & Zero Scrollbar */}
        <div className="hidden lg:block border-t border-slate-100 dark:border-slate-900 bg-slate-50/70 dark:bg-slate-950/70 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <nav className="flex items-center gap-5 xl:gap-6 py-2.5 overflow-x-auto text-xs font-bold uppercase tracking-wider no-scrollbar scrollbar-none">
              <Link
                href="/"
                className="text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>🏠 Home</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
                >
                  <span>{cat.name}</span>
                  {cat.isHot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse group-hover:scale-125 transition-transform" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* 📱 Full-Featured Luxury Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl px-4 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto font-sans">
            {/* Top Controls Row (Language, Notifications, Search) */}
            <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language</span>
                <LanguageSelector />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Push Alerts</span>
                <PushNotificationBanner />
              </div>
            </div>

            {/* Quick Interactive Tiles (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/apple"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-white/20 hover:border-white/40 flex flex-col gap-1.5 transition-all text-white"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-black"></span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black">18 PRO</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Apple Hub 2026</div>
                  <div className="text-[10px] text-zinc-400">iPhone 18 &amp; Deals</div>
                </div>
              </Link>

              <Link
                href="/travel"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-slate-900/20 border border-sky-500/30 hover:border-sky-500 flex flex-col gap-1.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <Plane className="w-4 h-4 text-sky-500" />
                  <span className="px-1.5 py-0.5 rounded-full bg-sky-500 text-slate-950 text-[9px] font-black">0% FEE</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Travel Deals</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Flights &amp; Hotels</div>
                </div>
              </Link>

              <Link
                href="/tools"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/20 border border-indigo-500/30 hover:border-indigo-500 flex flex-col gap-1.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="px-1.5 py-0.5 rounded-full bg-indigo-500 text-white text-[9px] font-black">TOOLS</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">AI Tools Hub</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Calculators &amp; Code</div>
                </div>
              </Link>

              <Link
                href="/community"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-slate-900/20 border border-indigo-500/30 hover:border-indigo-500 flex flex-col gap-1.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Community</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Mastermind Chat</div>
                </div>
              </Link>

              <Link
                href="/trade"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-slate-900/20 border border-emerald-500/30 hover:border-emerald-500 flex flex-col gap-1.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black">90% SPLIT</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">SmartMag Trade</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Prop Firms &amp; Codes</div>
                </div>
              </Link>
            </div>

            {/* Category Navigation Links */}
            <div className="space-y-1 pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Explore Editorial Channels
              </div>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white transition-colors"
              >
                <span>📰 Featured Stories</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{cat.name}</span>
                  {cat.isHot ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                      HOT
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </Link>
              ))}
            </div>

            {/* Static Pages Links */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-500 text-center py-1">
                About Us
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-500 text-center py-1">
                Contact
              </Link>
              <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-500 text-center py-1">
                Privacy
              </Link>
            </div>

            {/* Follow Us / Social Links */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-slate-400">
              <a
                href="https://x.com/Theindainta9go"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-sky-400 transition-colors"
                title="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/indian-trader-804333436/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594475423154"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-500 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/indiantrader8032026/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.reddit.com/user/Indiantrader803/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-orange-500 transition-colors"
                title="Reddit"
              >
                <span className="w-4 h-4 rounded-full bg-orange-500 text-[9px] font-black text-white flex items-center justify-center">r</span>
              </a>
            </div>

            {/* Mobile VIP Area */}
            {user && isVip ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name || "VIP Member"}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/vip/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 text-center"
                  >
                    <User className="w-3.5 h-3.5 text-teal-500" /> Profile
                  </Link>
                  <Link
                    href="/vip"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider text-center"
                  >
                    <Crown className="w-3.5 h-3.5" /> Lounge
                  </Link>
                </div>
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await fetch("/api/auth/logout", { method: "POST" });
                    await refreshVipStatus();
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-rose-600 dark:text-rose-400 text-[11px] font-bold border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-3 h-3" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  href="/vip/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider w-full shadow-lg shadow-amber-500/20 text-center"
                >
                  <Crown className="w-4 h-4 fill-current" />
                  <span>Join VIP Free Forever</span>
                </Link>
                <Link
                  href="/vip/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-xs text-teal-600 dark:text-teal-400 font-bold py-1"
                >
                  Already VIP? Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}

