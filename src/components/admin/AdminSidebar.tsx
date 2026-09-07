"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin",
      label: "Analytics Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/swarm",
      label: "Autonomous Swarm",
      icon: Cpu,
    },
    {
      href: "/admin/generator",
      label: "AI Generation Studio",
      icon: Wand2,
    },
    {
      href: "/admin/promoter",
      label: "Viral Promotion Hub",
      icon: Share2,
    },
    {
      href: "/admin/monetization",
      label: "Monetization & Ads",
      icon: DollarSign,
    },
    {
      href: "/admin/posts",
      label: "Posts & Content",
      icon: FileText,
    },
    {
      href: "/admin/logs",
      label: "Pipeline Logs",
      icon: Activity,
    },
    {
      href: "/admin/settings",
      label: "Settings & API Keys",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                AutoAI Engine
              </span>
              <span className="block text-[10px] uppercase font-bold text-indigo-500 tracking-wider">
                Admin Control
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
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Back to Blog Link & Lock Admin */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={() => {
            localStorage.removeItem("auto_ai_admin_session");
            window.location.href = "/admin";
          }}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
        >
          🔒 Lock Admin Portal
        </button>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Reader Blog
        </Link>
      </div>
    </aside>
  );
}
