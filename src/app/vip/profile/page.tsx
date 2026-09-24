import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCurrentUser, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Crown,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Download,
  Plane,
  TrendingUp,
  Settings,
  LogOut,
  FileCode2,
} from "lucide-react";
import ChangePasswordForm from "@/components/vip/ChangePasswordForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My VIP Profile | TheSmartMag",
  description: "Manage your VIP membership profile, tier, benefits, and security settings.",
};

export default async function VipProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/vip/login");
  }

  // Fetch user's recent session count
  let sessionCount = 0;
  try {
    sessionCount = await prisma.session.count({ where: { userId: user.id } });
  } catch {}

  const superAdmin = isSuperAdmin(user);
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const tierBadgeClasses: Record<string, string> = {
    VIP_MEMBER: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700",
    VIP_ELITE: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700",
    SUPERADMIN: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700",
  };

  const tierClass = tierBadgeClasses[user.vipTier || "VIP_MEMBER"] || tierBadgeClasses.VIP_MEMBER;

  const vipPrivileges = [
    { icon: FileCode2, label: "SmartMag Order-Flow Reversal Pine Script (v4.2)", color: "text-teal-600 dark:text-teal-400" },
    { icon: TrendingUp, label: "2026 Sovereign Compute & TSMC Taiwan Strait Dossier (38-page PDF)", color: "text-cyan-600 dark:text-cyan-400" },
    { icon: Plane, label: "VIP Hotel Flash Coupons & 20% eSIM Promo (Code: SMARTVIP2026)", color: "text-purple-600 dark:text-purple-400" },
    { icon: Download, label: "Full Access to Proprietary Algorithm Library", color: "text-indigo-600 dark:text-indigo-400" },
    { icon: Sparkles, label: "Unrestricted Access to All Exclusive Articles & Research", color: "text-amber-600 dark:text-amber-400" },
    { icon: Crown, label: "Private Quant Trading Intelligence Briefings", color: "text-rose-600 dark:text-rose-400" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">

        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <User className="w-7 h-7 text-teal-500" />
              My VIP Profile
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage your account, tier, and exclusive benefits.</p>
          </div>
          <Link
            href="/vip"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            ← VIP Lounge
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Account Info Card */}
          <div className="lg:col-span-1 space-y-4">

            {/* Account Info */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">{user.name || "VIP Member"}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${tierClass}`}>
                  <Crown className="w-3.5 h-3.5 fill-current" />
                  {user.vipTier?.replace(/_/g, " ") || "VIP Member"}
                </span>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Info Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xs">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-slate-900 dark:text-white font-semibold break-all">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Member Since</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{memberSince}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Status</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-black">Active & Verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <Settings className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Active Sessions</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{sessionCount} device(s)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Account Actions</h3>
              <Link
                href="/vip/forgot-password"
                className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Change Password
              </Link>
              {superAdmin && (
                <Link
                  href="/admin/vip"
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-xs font-semibold border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                  Superadmin VIP Panel
                </Link>
              )}
              {superAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-xs font-semibold border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Admin Dashboard
                </Link>
              )}
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-xs font-semibold border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out of VIP
                </button>
              </form>
            </div>
          </div>

          {/* Right: VIP Benefits & Content Access */}
          <div className="lg:col-span-2 space-y-4">

            {/* VIP Privileges */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <Crown className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Your VIP Privileges</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700">
                  All Unlocked
                </span>
              </div>
              <div className="space-y-3">
                {vipPrivileges.map((privilege, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <privilege.icon className={`w-4 h-4 mt-0.5 shrink-0 ${privilege.color}`} />
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{privilege.label}</p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 ml-auto mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Membership Tier Comparison */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">Membership Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { tier: "VIP Member", desc: "Free tier — Pine scripts, PDFs, travel promo codes.", color: "border-teal-200 dark:border-teal-800", active: user.vipTier === "VIP_MEMBER" },
                  { tier: "VIP Elite", desc: "Priority access, exclusive trade signals, and VIP-only deep dives.", color: "border-amber-200 dark:border-amber-800", active: user.vipTier === "VIP_ELITE" },
                  { tier: "Superadmin", desc: "Full platform control, user management, and all content.", color: "border-purple-200 dark:border-purple-800", active: user.vipTier === "SUPERADMIN" || superAdmin },
                ].map((t) => (
                  <div
                    key={t.tier}
                    className={`rounded-xl p-4 border-2 ${t.color} ${t.active ? "bg-teal-50 dark:bg-teal-900/20" : "bg-slate-50 dark:bg-slate-800/30"} transition-all`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className={`w-4 h-4 ${t.active ? "text-amber-500" : "text-slate-400"}`} />
                      <p className="text-xs font-black text-slate-900 dark:text-white">{t.tier}</p>
                      {t.active && (
                        <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Change Password & Security */}
            <ChangePasswordForm />

            {/* Quick Links */}
            <div className="rounded-2xl bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-900/20 dark:to-indigo-900/20 border border-teal-200 dark:border-teal-800/50 p-6">
              <h2 className="text-sm font-black text-slate-900 dark:text-white mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "VIP Lounge", href: "/vip", icon: Crown },
                  { label: "Latest Articles", href: "/blog", icon: Sparkles },
                  { label: "Trade Hub", href: "/trade", icon: TrendingUp },
                  { label: "Travel Deals", href: "/travel", icon: Plane },
                  { label: "Download Scripts", href: "/downloads/smartmag-orderflow-reversal.pine", icon: Download },
                  { label: "AI Tools", href: "/best-ai-tools", icon: Settings },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-teal-400/60 hover:text-teal-700 dark:hover:text-teal-300 transition-all shadow-xs"
                  >
                    <link.icon className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
