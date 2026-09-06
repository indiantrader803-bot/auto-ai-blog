import Link from "next/link";
import { Sparkles, Shield, FileText, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-xl text-slate-900 dark:text-white">
                CHRONICLE<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Global technology, software engineering, and modern intelligence publication providing actionable deep dives.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Topic Hubs
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/category/artificial-intelligence" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/category/development-and-engineering" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Engineering &amp; Coding
                </Link>
              </li>
              <li>
                <Link href="/category/finance-and-markets" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Finance &amp; Wealth
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Gadgets &amp; Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & AdSense Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Contact Editorial Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Engine & Monetization Disclosure */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Editorial Disclosure
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Chronicle is supported by its readership. When you purchase through verified partner links or view sponsor ads, we may earn an affiliate commission at zero additional cost to you.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Chronicle Journal. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Autonomous Intelligence Journal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
