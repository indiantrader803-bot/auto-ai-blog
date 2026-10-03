"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Tag, Zap, Cpu, Sun, Moon } from "lucide-react";

export default function AppleNavbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState<boolean>(true);

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

  const navLinks = [
    { name: "Overview", href: "/apple" },
    { name: "iPhone 18", href: "/apple/iphone-18", badge: "2nm A20" },
    { name: "Review", href: "/apple/iphone-18-pro-max-review" },
    { name: "18 vs 17 Pro", href: "/apple/iphone-18-vs-iphone-17-pro-max", badge: "VS" },
    { name: "MacBook", href: "/apple/macbook" },
    { name: "iPad", href: "/apple/ipad" },
    { name: "Watch", href: "/apple/apple-watch" },
    { name: "AirPods", href: "/apple/airpods" },
    { name: "Daily Deals", href: "/apple/deals", badge: "Live" },
    { name: "Accessories", href: "/apple/accessories", badge: "Hot" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-black/85 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Hub Title */}
          <Link
            href="/apple"
            className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-85 transition-opacity shrink-0 group"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 border border-slate-300 dark:border-white/20 flex items-center justify-center shadow-xs dark:shadow-inner group-hover:border-slate-400 dark:group-hover:border-white/40 transition-colors">
              <span className="text-sm font-black text-slate-900 dark:text-white"></span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif tracking-normal text-base font-extrabold text-slate-900 dark:text-white">
                Apple<span className="text-slate-500 dark:text-zinc-400 font-light">Hub</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/90 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                2026
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                      : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-slate-800 text-slate-200 dark:bg-black dark:text-white"
                          : link.badge === "Live" || link.badge === "Hot"
                          ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 hover:bg-slate-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 transition-colors shadow-xs"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            <Link
              href="/apple/deals"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-all shadow-sm shadow-emerald-500/20"
            >
              <Tag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Best Deals</span>
              <span className="sm:hidden">Deals</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Secondary Menu */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-slate-200/60 dark:border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-900/60 border border-slate-200/60 dark:border-white/5"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[8px] font-mono px-1 rounded bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
