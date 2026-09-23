import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, ShieldCheck, Cpu, Zap, Globe, Award, CheckCircle2, User, Users, Compass, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TheSmartMag | Editorial Mission, Tech & Travel Intelligence",
  description:
    "Learn about TheSmartMag: our editorial mission, multi-disciplinary research team, AI fact-checking standards, and financial & luxury travel coverage.",
  alternates: {
    canonical: "https://thesmartmag.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" /> Editorial Vision &amp; Organization
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            About TheSmartMag
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The premier digital intelligence network delivering deep-dive technical reports on artificial intelligence, algorithmic finance, verified prop trading firms, and global luxury travel itineraries.
          </p>
        </header>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">AI &amp; Tech Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Synthesizing breakthrough AI papers, quantum architecture, and next-gen silicon into actionable engineering breakdowns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">SmartMag Trade</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Unbiased reviews of proprietary trading firms, risk parameters, drawdown rules, and exclusive community discounts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">SmartMag Travel</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verified day-by-day itineraries, flight comparison radar, eSIM packages, and budget planning tools for 25+ destinations.
            </p>
          </div>
        </div>

        {/* Narrative & EEAT Details */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Our Purpose &amp; Editorial Standards
          </h2>
          <p>
            Founded to bridge the information gap in rapidly accelerating markets, <strong>TheSmartMag</strong> operates as an independent digital newsroom. We serve millions of developers, quants, travelers, and tech enthusiasts worldwide who demand substance over sensationalism.
          </p>
          <p>
            Unlike typical aggregators, our articles undergo rigorous verification. We analyze code repositories, stress-test trading challenge rules, inspect flight availability matrices, and cross-reference multiple primary sources before publishing.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Editorial Team &amp; Research Board
          </h2>
          <p>
            Our publication is steered by a dedicated editorial collective comprised of experienced quantitative developers, travel writers, and systems architects:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Lead Technology Editor</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Chief Systems &amp; AI Architect</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Specializing in distributed computing, generative reasoning models, and cloud infrastructure benchmarks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Quantitative &amp; Market Analyst</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Senior Financial Editor</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Focusing on proprietary firm evaluations, algorithmic risk controls, drawdowns, and macro liquidity trends.
              </p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Editorial Policies &amp; Governance
          </h2>
          <p>
            TheSmartMag maintains transparent operational policies to guarantee reader trust and search quality:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/editorial-policy" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Editorial &amp; Fact-Checking Policy
              </Link>: Details our 4-tier verification protocol and corrections policy.
            </li>
            <li>
              <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Privacy Policy &amp; Cookie Compliance
              </Link>: Explains how telemetry and subscriber data are protected.
            </li>
            <li>
              <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Terms of Service
              </Link>: Our intellectual property, disclaimers, and user agreements.
            </li>
            <li>
              <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Contact &amp; Newsroom Desk
              </Link>: Direct channels for press inquiries, correction tips, and partnerships.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
