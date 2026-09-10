"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Wand2,
  FileText,
  Settings,
  Activity,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Share2,
  DollarSign,
  Cpu,
  Menu,
  X,
  Lock,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileDrawerOpen]);

  const navItems = [
    {
      href: "/admin",
      label: "Analytics Overview",
      shortLabel: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/swarm",
      label: "Autonomous Swarm",
      shortLabel: "Swarm",
      icon: Cpu,
    },
    {
      href: "/admin/generator",
      label: "AI Generation Studio",
      shortLabel: "Studio",
      icon: Wand2,
    },
    {
      href: "/admin/monetization",
      label: "Monetization & Ads",
      shortLabel: "Revenue",
      icon: DollarSign,
    },
    {
      href: "/admin/affiliates",
      label: "Affiliate Tracker & CR",
      shortLabel: "Affiliates",
      icon: TrendingUp,
    },
    {
      href: "/admin/posts",
      label: "Posts & Content",
      shortLabel: "Posts",
      icon: FileText,
    },
    {
      href: "/admin/promoter",
      label: "Viral Promotion Hub",
      shortLabel: "Promote",
      icon: Share2,
    },
    {
      href: "/admin/logs",
      label: "Pipeline Logs",
      shortLabel: "Logs",
      icon: Activity,
    },
    {
      href: "/admin/settings",
      label: "Settings & API Keys",
      shortLabel: "Settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    if (confirm("Lock the admin session and sign out?")) {
      localStorage.removeItem("auto_ai_admin_session");
      window.location.href = "/admin";
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE & TABLET TOP HEADER (< lg)                                      */}
      {/* ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Open admin navigation menu"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-sm text-slate-900 dark:text-white font-serif tracking-tight">
                AutoAI <span className="text-indigo-600 dark:text-indigo-400">Admin</span>
              </span>
              <span className="flex items-center gap-1 text-[9px] uppercase font-bold text-emerald-500 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Fleet Active
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
            title="View Live Blog"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline text-[11px]">Blog</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
            title="Lock Portal"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE SLIDE-OVER DRAWER (< lg)                                        */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full z-10 shadow-2xl p-4 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header */}
              <div className="pb-4 mb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      AutoAI Engine
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-indigo-500 tracking-wider">
                      Control Portal
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-50 ${isActive ? "text-white" : ""}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" /> Lock Admin Portal
              </button>
              <Link
                href="/"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Reader Blog
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DESKTOP STICKY SIDEBAR (>= lg)                                         */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex-col justify-between h-screen sticky top-0 shrink-0 z-30">
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-black text-base text-slate-900 dark:text-white font-serif tracking-tight">
                  AutoAI <span className="text-indigo-600 dark:text-indigo-400">Engine</span>
                </span>
                <span className="block text-[10px] uppercase font-bold text-emerald-500 tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Admin Fleet Active
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Back to Blog Link & Lock Admin */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" /> Lock Admin Portal
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reader Blog
          </Link>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 4. MOBILE BOTTOM QUICK NAVIGATION BAR (< lg)                              */}
      {/* ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
        {[
          { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
          { href: "/admin/swarm", label: "Swarm", icon: Cpu },
          { href: "/admin/generator", label: "Studio", icon: Wand2 },
          { href: "/admin/monetization", label: "Revenue", icon: DollarSign },
          { href: "/admin/posts", label: "Posts", icon: FileText },
        ].map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[54px] ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? "bg-indigo-50 dark:bg-indigo-950/80" : ""}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </Link>
          );
        })}

        {/* More Button to trigger full drawer */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all min-w-[54px] cursor-pointer"
        >
          <div className="p-1 rounded-lg">
            <MoreHorizontal className="w-4 h-4" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">More</span>
        </button>
      </nav>
    </>
  );
}
