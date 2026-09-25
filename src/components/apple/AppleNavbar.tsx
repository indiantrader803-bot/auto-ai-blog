"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, Tag, Zap, Cpu } from "lucide-react";

export default function AppleNavbar() {
  const pathname = usePathname();

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/85 text-white border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Hub Title */}
          <Link
            href="/apple"
            className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:opacity-85 transition-opacity shrink-0 group"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-zinc-700 via-zinc-800 to-zinc-900 border border-white/20 flex items-center justify-center shadow-inner group-hover:border-white/40 transition-colors">
              <span className="text-sm font-black"></span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif tracking-normal text-base font-extrabold text-white">
                Apple<span className="text-zinc-400 font-light">Hub</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800/90 text-zinc-300 border border-white/10">
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
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "text-zinc-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-black text-white"
                          : link.badge === "Live" || link.badge === "Hot"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="flex items-center gap-2">
            <Link
              href="/apple/deals"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs hover:opacity-90 transition-all shadow-sm shadow-emerald-500/20"
            >
              <Tag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Best Deals</span>
              <span className="sm:hidden">Deals</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Secondary Menu */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? "bg-white text-black font-bold"
                    : "text-zinc-400 hover:text-white bg-zinc-900/60 border border-white/5"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[8px] font-mono px-1 rounded bg-zinc-800 text-zinc-300">
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
