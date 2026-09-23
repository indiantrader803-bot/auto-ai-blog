import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, CheckCircle2, FileText, Search, AlertCircle, RefreshCw, Sparkles, Scale, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy & Fact-Checking Standards | TheSmartMag",
  description: "TheSmartMag's rigorous editorial guidelines, AI ethics statement, multi-layer fact-checking workflow, primary research methodology, and corrections policy.",
  alternates: {
    canonical: "https://thesmartmag.com/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> EEAT Editorial Quality Assurance
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
            Editorial Guidelines &amp; Fact-Checking Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our commitment to technical rigor, quantitative precision, responsible AI disclosure, and journalistic transparency across every published guide.
          </p>
        </header>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Primary Sourcing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We ground all reporting in SEC filings, whitepapers, official APIs, repository benchmarks, and direct interviews rather than secondary commentary.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Independent Testing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Prop firm rules, broker spreads, AI model latencies, and travel itineraries undergo hands-on verification before inclusion in our rankings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Continuous Auditing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our automated crawlers and human researchers audit published guides bi-weekly to update pricing, promo codes, and software version shifts.
            </p>
          </div>
        </div>

        {/* Detailed Policy Text */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-500" /> 1. The Fact-Checking Workflow
            </h2>
            <p>
              At <strong>TheSmartMag</strong>, accuracy is our foundational premise. Before any article or technical comparison is published, it passes through a multi-tier review process:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Source Verification:</strong> Claims regarding benchmark throughput, model weights, or regulatory compliance must cite verifiable documentation, Git repositories, or regulatory registries.</li>
              <li><strong>Quantitative Cross-Checking:</strong> Financial data, including prop firm challenge drawdowns, evaluation fee structures, and trading rules, are cross-referenced directly with platform terms of service.</li>
              <li><strong>Live Reproduction:</strong> Code samples, cloud infrastructure setups, and AI prompts are executed in isolated testing environments to ensure developer reproducibility.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" /> 2. AI Ethics &amp; Synthesis Disclosure
            </h2>
            <p>
              We believe in complete transparency regarding the intersection of artificial intelligence and journalism. TheSmartMag utilizes proprietary autonomous intelligence pipelines to parse vast volumes of breaking research papers, commit logs, and market telemetry.
            </p>
            <p>
              However, <strong>zero unverified generative AI output is published directly</strong>. Every synthesized draft is subjected to strict structural quality guardrails:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Automated hallucination filters eliminate fictitious APIs, fabricated citations, or non-existent coupon codes.</li>
              <li>Every guide must exceed comprehensive minimum depth requirements (1,200 to 5,000+ words depending on publication type).</li>
              <li>Articles feature bespoke comparison matrices, pros/cons, and curated interactive components created for reader utility.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> 3. Commercial Independence &amp; Affiliate Disclosure
            </h2>
            <p>
              TheSmartMag participates in partner and affiliate programs (including prop firm evaluation codes, travel booking platforms, and hardware marketplaces). When readers make a purchase or book an itinerary through our links, we may earn an affiliate commission at no additional cost to the reader.
            </p>
            <p>
              Our editorial assessments and product rankings remain strictly independent:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Commercial partnerships do not influence our objective rating scores, drawback assessments, or negative review findings.</li>
              <li>Firms with opaque drawdown rules, delayed payouts, or poor customer ratings are flagged candidly or excluded from our top recommendations.</li>
              <li>Every affiliate link is marked with appropriate <code>rel=&quot;nofollow sponsored&quot;</code> attributes in compliance with Google Webmaster Guidelines.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> 4. Corrections &amp; Updates Policy
            </h2>
            <p>
              Technology and financial markets evolve with unprecedented speed. If we identify an inaccuracy or if a reader brings an outdated metric to our attention, our policy is to promptly verify and correct the content:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Factual errors are updated directly in the article body with an updated timestamp indicated in the metadata.</li>
              <li>Readers can report inaccuracies, expired discount codes, or broken links directly by emailing <a href="mailto:contact@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">contact@thesmartmag.com</a>.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
