"use client";

import Link from "next/link";
import {
  Sparkles,
  Shield,
  FileText,
  Mail,
  ArrowUp,
  Twitter,
  Youtube,
  Github,
  Linkedin,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-300 mt-20 font-sans">
      {/* 4-Column Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand Bio & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl text-white tracking-tight">
                  SMART<span className="text-indigo-400">MAG</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400">
                  Tech &amp; AI Intelligence
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              SmartMag Tech Edition is an autonomous editorial publication delivering real-time breakdowns of frontier AI models, cloud infrastructure, developer frameworks, and tech hardware.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com/indiantrader803-bot/auto-ai-blog" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Topic Hubs */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Topic Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/category/artificial-intelligence" className="hover:text-indigo-400 transition-colors flex items-center justify-between">
                  <span>Artificial Intelligence</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-slate-500">24</span>
                </Link>
              </li>
              <li>
                <Link href="/category/development-and-engineering" className="hover:text-indigo-400 transition-colors flex items-center justify-between">
                  <span>Software Engineering</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-slate-500">18</span>
                </Link>
              </li>
              <li>
                <Link href="/category/finance-and-markets" className="hover:text-indigo-400 transition-colors flex items-center justify-between">
                  <span>Finance &amp; Quant Markets</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-slate-500">12</span>
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="hover:text-indigo-400 transition-colors flex items-center justify-between">
                  <span>Reviews &amp; Hardware Labs</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-slate-500">15</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Editorial & Trust */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Editorial Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Privacy Policy &amp; GDPR
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" /> Editorial Integrity &amp; AI Fact Check
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Press Inquiries &amp; Corrections
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Privacy &amp; Data Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Monetization Transparency */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Reader Supported
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When you purchase products through our independent benchmark reviews or partner links, we may earn an affiliate commission at zero additional cost to you.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
              <Shield className="w-3.5 h-3.5" /> 100% Independent Editorial Rigor
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} SmartMag Tech Edition. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white transition-colors text-xs font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
