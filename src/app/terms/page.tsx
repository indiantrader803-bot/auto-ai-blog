import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Scale, ShieldCheck, FileCheck, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | TheSmartMag",
  description:
    "Terms of service, user agreements, intellectual property rights, disclaimer of financial/travel advice, and acceptable use policies for TheSmartMag.",
  alternates: {
    canonical: "https://thesmartmag.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Scale className="w-4 h-4" /> Legal &amp; Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before accessing or using TheSmartMag, our subdomains, and related digital properties.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <Link href="/privacy" className="hover:text-indigo-500 underline underline-offset-4">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/editorial-policy" className="hover:text-indigo-500 underline underline-offset-4">
              Editorial Policy
            </Link>
          </div>
        </header>

        {/* Legal Sections */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-500" /> 1. Acceptance of Agreement
            </h2>
            <p>
              By accessing, browsing, or utilizing <strong>TheSmartMag</strong> (including <code>thesmartmag.com</code>, <code>trade.thesmartmag.com</code>, <code>travel.thesmartmag.com</code>, and associated APIs or feeds), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p>
              If you do not agree to all provisions contained within these terms, you must immediately discontinue use of our websites and services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-500" /> 2. Disclaimer of Financial &amp; Travel Advice
            </h2>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm text-purple-900 dark:text-purple-200 space-y-2">
              <p className="font-bold">⚠️ IMPORTANT REGULATORY NOTICE:</p>
              <p>
                The information provided across TheSmartMag is published exclusively for educational, journalistic, and informational purposes. None of our content constitutes investment advice, financial advisory, legal guidance, or endorsement of high-risk speculative trading instruments.
              </p>
            </div>
            <p>
              Trading financial markets, foreign exchange, commodities, derivatives, and participating in proprietary trading firm evaluations carry significant risk of capital loss. Readers must conduct independent due diligence and consult licensed financial fiduciaries before deploying capital.
            </p>
            <p>
              Similarly, travel schedules, flight tariffs, visa rules, and hotel booking rates are subject to dynamic changes by third-party airlines and operators. Travelers are responsible for verifying valid passport validity, visa clearances, and insurance coverages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-500" /> 3. Intellectual Property Rights
            </h2>
            <p>
              All original journalistic articles, architectural benchmarks, proprietary comparison matrices, visual design assets, code tutorials, and custom graphics published on TheSmartMag are the property of TheSmartMag Media Network and are protected under international copyright and intellectual property conventions.
            </p>
            <p>
              You may quote excerpts (up to 150 words) provided direct, followable attribution and a clickable link to the canonical source URL on TheSmartMag is provided. Bulk automated scraping, uncredited republication, or unauthorized mirror deployment is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" /> 4. Third-Party Integrations &amp; Commercial Links
            </h2>
            <p>
              Our websites contain outbound links to third-party providers, including prop firm challenge portals, flight booking engines (Aviasales, Travelpayouts), hotel networks (Booking.com, Agoda), and affiliate networks.
            </p>
            <p>
              TheSmartMag does not operate or control third-party platforms and assumes no liability for their terms, privacy practices, refund disputes, service outages, or contractual fulfillments. Any transactions conducted on external platforms are governed solely by the respective third-party terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" /> 5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, TheSmartMag and its editors, developers, and partners shall not be held liable for any direct, indirect, punitive, or consequential damages resulting from the use or inability to use our platform or reliance upon any published information.
            </p>
          </section>
        </div>

        {/* Contact Strip */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Questions About These Terms?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Reach our legal and compliance desk for any contractual queries.</p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shrink-0"
          >
            Contact Legal Team
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
