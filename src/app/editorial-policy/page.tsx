import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Award, CheckCircle2, FileText, Scale, RefreshCw, Mail, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy & Fact-Checking Standards | TheSmartMag",
  description:
    "Our editorial standards, multi-source verification protocols, AI usage disclosure, fact-checking methodology, and corrections policy.",
  alternates: {
    canonical: "https://thesmartmag.com/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-4 h-4" /> EEAT &amp; Journalistic Integrity
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Editorial Policy &amp; Fact-Checking Standards
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            TheSmartMag upholds rigorous accuracy, multi-agent algorithmic research integrity, independent analysis, and transparent disclosure across all published reports.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Lead Editor: Editorial Board</span>
            <span>•</span>
            <Link href="/about" className="hover:text-indigo-500 underline underline-offset-4">
              About the Newsroom
            </Link>
          </div>
        </header>

        {/* Core Principles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Primary Source Verification</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every data point, benchmark, SEC disclosure, and benchmark statistic is cross-referenced with official documentation, code repos, or regulatory filings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Commercial Independence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Affiliate partnerships and sponsor relationships never influence our critical verdicts, benchmark rankings, or pros/cons evaluations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Continuous Updating</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Articles and comparison tables are audited and refreshed periodically as software updates, firmware upgrades, and pricing tiers evolve.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> 1. Editorial Integrity &amp; Research Protocol
            </h2>
            <p>
              At <strong>TheSmartMag</strong>, our primary commitment is to our readers. Whether analyzing machine learning breakthroughs, quantum computing hardware, proprietary prop firm risk rules, or global flight itineraries, we provide uncompromised clarity and objective insights.
            </p>
            <p>
              Our editorial staff and quantitative contributors test frameworks, review trading challenge rulebooks, and audit developer documentation directly. We reject superficial press releases in favor of stress-tested performance benchmarks, latency measurements, and verifiable metrics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" /> 2. AI Synthesis &amp; Human Expert Oversight
            </h2>
            <p>
              TheSmartMag leverages state-of-the-art multi-agent research tools to scout global research papers, SEC filings, GitHub repositories, and flight inventory feeds. However, artificial intelligence is strictly a research and synthesis aid.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li><strong>Zero Unchecked Generation:</strong> All AI-synthesized research outlines pass through deterministic validation routines, style guidelines, and editorial review.</li>
              <li><strong>Anti-Hallucination Guardrails:</strong> Technical specifications (e.g. GPU TFLOPs, model parameter counts, discount codes, profit splits) are validated against official developer portals.</li>
              <li><strong>Distinct Voice:</strong> We prohibit generic AI platitudes and insist on deep technical commentary, mathematical precision, and actionable guidance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" /> 3. Fact-Checking &amp; Verification Protocol
            </h2>
            <p>
              Before any deep-dive article or comparison table goes live, our review process applies a 4-tier verification protocol:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
              <li><strong>Data Origin Check:</strong> Confirming benchmark numbers, pricing, and claims originate from primary releases rather than second-hand aggregators.</li>
              <li><strong>Calculations &amp; Math Audits:</strong> Recalculating margins, profit targets, drawdown thresholds, flight costs, and discount percentages.</li>
              <li><strong>Contextual Completeness:</strong> Ensuring opposing tradeoffs (cons, fees, platform limitations, server downtimes) are explicitly documented alongside advantages.</li>
              <li><strong>Link &amp; Source Inspection:</strong> Verifying all outbound citations route to authoritative sources and that security certificates are valid.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> 4. Corrections &amp; Clarification Policy
            </h2>
            <p>
              When a factual inaccuracy, broken parameter, or outdated rule is identified, TheSmartMag updates the content immediately. For material changes, an explicit correction note is appended at the bottom or top of the article documenting:
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-semibold">Example Correction Transparency Note:</p>
              <p className="font-mono italic">
                &quot;Update (September 2026): Corrected maximum drawdown rules for the \$100k tier to reflect updated firm terms released on September 15.&quot;
              </p>
            </div>
            <p className="text-xs sm:text-sm">
              Readers are encouraged to submit correction tips and updates to our editorial desk at{" "}
              <a href="mailto:contact@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                contact@thesmartmag.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" /> 5. Commercial Disclosure &amp; Affiliate Transparency
            </h2>
            <p>
              To maintain our platform without charging subscription paywalls, TheSmartMag participates in selective affiliate partner programs (e.g. Prop firm discount codes, Travelpayouts flight &amp; hotel engines, Airalo eSIMs, and Amazon hardware).
            </p>
            <p>
              When a reader purchases an evaluation challenge, books a verified hotel, or orders hardware through our links, we may receive a commission at <strong>no extra cost to the reader</strong>. In many cases, our partner agreements provide exclusive discounts (such as codes like <code>CHARGE</code> or <code>THESMARTMAG</code>) that reduce the reader&apos;s cost below standard retail pricing.
            </p>
            <p>
              We only recommend platforms, tools, and itineraries that our research confirms provide authentic utility and institutional reliability.
            </p>
          </section>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900 border border-indigo-500/30 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Have Questions or Editorial Inquiries?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Our newsroom is open to suggestions, data contributions, press inquiries, and constructive feedback from our global readership.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg"
            >
              Contact Editorial Desk
            </Link>
            <Link
              href="/about"
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
