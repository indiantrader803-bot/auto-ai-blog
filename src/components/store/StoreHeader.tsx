"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Truck,
  HelpCircle,
  Menu,
  X,
  Layers,
  Sparkles,
  ChevronDown,
  Sun,
  Moon,
  Palette,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useVip } from "@/context/VipAuthContext";

export interface AccentTheme {
  id: string;
  name: string;
  primaryClass: string;
  bgGradient: string;
  hex: string;
}

export const STORE_ACCENT_COLORS: AccentTheme[] = [
  { id: "higgs", name: "Higgsfield Volt", primaryClass: "text-[#d1fe17]", bgGradient: "from-[#d1fe17] to-emerald-400", hex: "#d1fe17" },
  { id: "purple", name: "Cyber Purple", primaryClass: "indigo-600", bgGradient: "from-indigo-600 to-purple-600", hex: "#6366f1" },
  { id: "emerald", name: "Emerald Tech", primaryClass: "emerald-600", bgGradient: "from-emerald-500 to-teal-600", hex: "#10b981" },
  { id: "ocean", name: "Electric Blue", primaryClass: "sky-500", bgGradient: "from-blue-600 to-cyan-500", hex: "#0ea5e9" },
  { id: "rose", name: "Neon Rose", primaryClass: "rose-600", bgGradient: "from-rose-500 to-pink-600", hex: "#f43f5e" },
  { id: "amber", name: "Solar Amber", primaryClass: "amber-500", bgGradient: "from-amber-500 to-orange-600", hex: "#f59e0b" },
];

interface StoreHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  currency: "USD" | "INR";
  setCurrency: (c: "USD" | "INR") => void;
  currentColorTheme?: string;
  onColorThemeChange?: (themeId: string) => void;
}

export default function StoreHeader({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  currency,
  setCurrency,
  currentColorTheme = "purple",
  onColorThemeChange,
}: StoreHeaderProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useVip();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(currentColorTheme);

  // Sync with html dark class & localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkMode =
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(isDarkMode);

      const savedTheme = localStorage.getItem("store_color_theme");
      if (savedTheme) {
        setSelectedTheme(savedTheme);
        if (onColorThemeChange) onColorThemeChange(savedTheme);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const handleSelectColor = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem("store_color_theme", themeId);
    if (onColorThemeChange) {
      onColorThemeChange(themeId);
    }
    setIsColorMenuOpen(false);
  };

  const currentAccent = STORE_ACCENT_COLORS.find((t) => t.id === selectedTheme) || STORE_ACCENT_COLORS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800/80 shadow-xs transition-colors duration-200">
      {/* 1. TOP UTILITY BAR (From Mockup with Mode Toggle & Color Switcher) */}
      <div className="bg-[#0b0c16] text-[#cbd5e1] text-[11px] py-2 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-indigo-400" /> Free Worldwide Shipping on Orders Over $99
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              • 30-Day Easy Returns
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              • Secure Encrypted Payment
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 shrink-0 text-[11px]">
            {/* Color Accent Picker Button */}
            <div className="relative">
              <button
                onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
                title="Theme Colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-xs"
                  style={{ backgroundColor: currentAccent.hex }}
                />
                <span className="hidden sm:inline text-[10px]">{currentAccent.name}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isColorMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Store Accent Theme
                  </div>
                  <div className="space-y-1">
                    {STORE_ACCENT_COLORS.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleSelectColor(theme.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          selectedTheme === theme.id
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                            style={{ backgroundColor: theme.hex }}
                          />
                          <span>{theme.name}</span>
                        </div>
                        {selectedTheme === theme.id && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1 px-2 cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline text-[10px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  <span className="hidden sm:inline text-[10px]">Dark</span>
                </>
              )}
            </button>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  currency === "INR" ? "bg-indigo-600 text-white" : "hover:text-white"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  currency === "USD" ? "bg-indigo-600 text-white" : "hover:text-white"
                }`}
              >
                $ USD
              </button>
            </div>

            <Link href="/admin/store" className="hover:text-white hidden sm:flex items-center gap-1 transition-colors">
              <Truck className="w-3.5 h-3.5 text-indigo-400" /> Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY MAIN STORE NAVIGATION BAR (From Mockup) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo with 3D Cube Icon */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/store" className="flex items-center gap-2.5 group">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentAccent.bgGradient} flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform`}
            >
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                TheSmartMag
              </span>
              <span className="text-lg font-bold" style={{ color: currentAccent.hex }}>
                Store
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Category Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ${
              activeCategory === "ALL" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            Shop <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={() => setActiveCategory("AI Tools")}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ${
              activeCategory === "AI Tools" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            AI Tools
          </button>
          <button
            onClick={() => setActiveCategory("Laptops")}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ${
              activeCategory === "Laptops" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            Tech & Gadgets
          </button>
          <button
            onClick={() => setActiveCategory("Gaming")}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ${
              activeCategory === "Gaming" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            Gaming
          </button>
          <button
            onClick={() => setActiveCategory("Travel Gear")}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ${
              activeCategory === "Travel Gear" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            Travel Gear
          </button>
          <button
            onClick={() => setActiveCategory("Deals")}
            className="flex items-center gap-1.5 text-rose-600 font-bold cursor-pointer"
          >
            <span>Deals</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider">
              Hot
            </span>
          </button>
        </nav>

        {/* Search Bar Input (Mockup Style with Themed Search Button) */}
        <div className="flex-1 max-w-md hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-4 pr-12 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="button"
            style={{ backgroundColor: currentAccent.hex }}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-white flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Icons: Light/Dark toggle, Wishlist, User Account, Shopping Bag Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors md:hidden cursor-pointer"
            title="Toggle Light/Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {user ? (
            <Link
              href="/vip/profile"
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="My Account & Orders"
            >
              <User className="w-5 h-5 text-indigo-500" />
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/store/login"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/store/register"
                style={{ backgroundColor: currentAccent.hex }}
                className="text-xs font-bold text-white px-3 py-1.5 rounded-full shadow-xs hover:opacity-95 transition-all"
              >
                Register
              </Link>
            </div>
          )}

          <button
            onClick={() => setActiveCategory("ALL")}
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>

          {/* Cart Bag Icon with Real-Time Counter Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" style={{ color: currentAccent.hex }} />
            {totalItems > 0 && (
              <span
                style={{ backgroundColor: currentAccent.hex }}
                className="absolute top-1 right-1 w-4 h-4 rounded-full text-white text-[10px] font-black flex items-center justify-center shadow-xs"
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SLIDEOUT DRAWER NAVIGATION (From Mobile Mockup) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex">
          <div className="w-80 max-w-[85vw] bg-white dark:bg-[#0b0f19] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentAccent.bgGradient} flex items-center justify-center text-white`}
                  >
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">TheSmartMag Store</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme & Mode Selector inside Mobile Drawer */}
              <div className="py-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Theme Appearance</span>
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Accent Color</span>
                  <div className="flex items-center gap-2">
                    {STORE_ACCENT_COLORS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectColor(t.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
                          selectedTheme === t.id ? "scale-110 ring-2 ring-offset-2 ring-indigo-500" : ""
                        }`}
                        style={{ backgroundColor: t.hex }}
                      >
                        {selectedTheme === t.id && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category links */}
              <div className="py-4 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Categories</span>
                {[
                  { id: "ALL", label: "Shop All" },
                  { id: "AI Tools", label: "AI Tools & Software" },
                  { id: "Laptops", label: "Laptops & Computers" },
                  { id: "Gaming", label: "Gaming Gear" },
                  { id: "Mobile & Accessories", label: "Mobile & Accessories" },
                  { id: "Wearables", label: "Wearables" },
                  { id: "Travel Gear", label: "Travel Gear" },
                  { id: "Deals", label: "Deals & Offers (Hot)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      activeCategory === item.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <Link
                href="/admin/store"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" /> Track My Order
              </Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
