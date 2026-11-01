"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useVip } from "@/context/VipAuthContext";

interface StoreHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  currency: "USD" | "INR";
  setCurrency: (c: "USD" | "INR") => void;
}

export default function StoreHeader({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  currency,
  setCurrency,
}: StoreHeaderProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useVip();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800/80 shadow-xs">
      {/* 1. TOP UTILITY BAR (From Mockup) */}
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

          <div className="flex items-center gap-5 shrink-0 text-[11px]">
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-1.5 py-0.5 rounded ${currency === "INR" ? "bg-indigo-600 text-white" : "hover:text-white"}`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-1.5 py-0.5 rounded ${currency === "USD" ? "bg-indigo-600 text-white" : "hover:text-white"}`}
              >
                $ USD
              </button>
            </div>

            <Link href="/admin/store" className="hover:text-white flex items-center gap-1 transition-colors">
              <Truck className="w-3.5 h-3.5 text-indigo-400" /> Track Order
            </Link>
            <Link href="/contact" className="hover:text-white flex items-center gap-1 transition-colors">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Help & Support
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                TheSmartMag
              </span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
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
            onClick={() => setActiveCategory("Gaming")}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ${
              activeCategory === "Gaming" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
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

        {/* Search Bar Input (Mockup Style with Purple Search Button) */}
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
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Icons: Search, Wishlist, User Account, Shopping Bag Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/vip/profile"
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="My Account"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
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
            <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
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
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">TheSmartMag Store</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <button
                  onClick={() => {
                    setActiveCategory("ALL");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("AI Tools");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  AI Tools & Software
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("Laptops");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Laptops & Computers
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("Gaming");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Gaming Gear
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("Mobile & Accessories");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Mobile & Accessories
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("Wearables");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Wearables
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("Travel Gear");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Travel Gear
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("Deals");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-rose-600 font-bold"
                >
                  Deals & Offers 🔥
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <Link href="/vip/profile" className="block py-2 text-slate-600 dark:text-slate-400 font-medium">
                My Orders
              </Link>
              <Link href="/contact" className="block py-2 text-slate-600 dark:text-slate-400 font-medium">
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
