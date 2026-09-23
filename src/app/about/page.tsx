import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, Shield, Cpu, Zap, Globe, Award, CheckCircle2, UserCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About TheSmartMag | Mission, Editorial Team & Research Methodology",
  description: "Learn about TheSmartMag: A premier digital publication delivering rigorous technical reports on artificial intelligence, algorithmic trading, prop firms, software architecture, and luxury travel.",
  alternates: {
    canonical: "https://thesmartmag.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" /> Editorial Vision &amp; Standards
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
            About TheSmartMag
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A premier digital publication delivering high-signal, deeply researched intelligence across Artificial Intelligence, Algorithmic Finance, Software Engineering, and Luxury Travel.
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Founded with the conviction that technical readers deserve authentic depth over surface-level commentary, <strong>TheSmartMag</strong> bridges the divide between cutting-edge technological velocity and practical implementation. Whether stress-testing 70-billion-parameter neural models on local Apple silicon, analyzing prop firm payout mechanisms, or formulating budget-optimized Himalayan travel routes, our coverage is anchored in concrete data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Frontier AI Engineering</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Benchmark comparisons of LLMs, agentic swarms, inference frameworks (vLLM, Ollama), and full-stack TypeScript microservice architecture.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Quantitative Finance &amp; Prop Trading</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Exhaustive, unbiased evaluations of modern prop trading firms, drawdown rules, payout speed benchmarks, and algorithmic trading bots.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Curated Luxury &amp; Expeditions</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Interactive trip planners, budget calculators, cheap flight radar, and verified local attraction passes across 25+ global destinations.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Our Research &amp; Benchmark Methodology
          </h2>
          <p>
            Every guide published on TheSmartMag adheres to strict, empirical testing guidelines:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Reproducible Benchmarks:</strong> All code examples, Docker configs, and algorithmic trading scripts are tested in production environments prior to publication.</li>
            <li><strong>Verified Financial Rules:</strong> We cross-reference drawdown rules, broker spreads, and payment gateways directly with live evaluation dashboards.</li>
            <li><strong>Zero Thin Content Policy:</strong> We do not publish generic 300-word summaries. Our guides range from 1,200 to 5,000+ words with rich tables, actionable pros/cons, and structured FAQs.</li>
          </ul>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 not-prose space-y-3 my-8">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Journalistic Independence &amp; Trust
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We maintain strict separation between our independent editorial findings and our commercial partnerships. Learn more about our fact-checking procedures, source verification, and corrections policy in our dedicated guidelines.
            </p>
            <div className="pt-2">
              <Link
                href="/editorial-policy"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Read our Editorial Guidelines &amp; Fact-Checking Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
