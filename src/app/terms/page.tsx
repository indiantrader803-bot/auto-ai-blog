import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, FileCheck, AlertTriangle, Scale, Lock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | TheSmartMag",
  description: "Terms of service, user agreement, acceptable use policy, and intellectual property terms for TheSmartMag.",
  alternates: {
    canonical: "https://thesmartmag.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Scale className="w-3.5 h-3.5" /> Legal Terms
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
            Terms of Service &amp; User Agreement
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last Updated: September 2026
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or using <strong>TheSmartMag</strong> (including <code>thesmartmag.com</code>, <code>travel.thesmartmag.com</code>, and associated tools), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a> and <a href="/editorial-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Editorial Guidelines</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              2. Nature of Information &amp; Financial Disclaimer
            </h2>
            <p>
              The content provided across TheSmartMag—including prop firm reviews, quantitative trading analysis, software benchmarks, and travel itineraries—is published strictly for <strong>educational and informational purposes</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs sm:text-sm space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Important Financial Risk Notice:
              </div>
              <p>
                Trading financial instruments, prop firm evaluations, forex, commodities, and digital assets involves significant risk of capital loss and is not suitable for all investors. Nothing on this website constitutes financial, investment, legal, or tax advice. Always conduct your own due diligence or consult a licensed financial advisor before allocating capital.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              3. Intellectual Property Rights
            </h2>
            <p>
              All original text, technical diagrams, architectural flowcharts, curated databases, and website source code are the proprietary intellectual property of TheSmartMag Media Network and are protected under international copyright, trademark, and unfair competition laws.
            </p>
            <p>
              You may quote excerpts or share links with appropriate attribution and a visible hyperlink back to the original article on <code>thesmartmag.com</code>. Automated scraping or commercial republication without prior written authorization is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              4. External Links &amp; Third-Party Services
            </h2>
            <p>
              Our guides contain outbound links to third-party platforms, airline aggregators, hotels, software repositories, and prop trading providers. While we strive to verify partner reputation, we do not operate, control, or assume liability for third-party practices, service uptime, or commercial terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              5. Governing Law &amp; Contact
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws. If you have any inquiries regarding these terms, please contact our legal desk via email at <a href="mailto:contact@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">contact@thesmartmag.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
