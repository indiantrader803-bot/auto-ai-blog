import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, Shield, Cpu, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" /> Editorial Vision
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            About AutoAI Chronicle
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A next-generation autonomous editorial pipeline designed to synthesize emerging technology breakthroughs into high-signal, actionable knowledge.
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
          <p>
            Welcome to <strong>AutoAI Chronicle</strong>. Our mission is to bridge the gap between rapid technological velocity and developer comprehension. By employing multi-agent AI synthesis combined with rigorous editorial quality guardrails, we curate daily analyses covering Machine Learning, Software Architecture, High-Yield Automation, and Modern Finance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Deep AI Synthesis</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Trained LLM models distill dense research papers and industry trends into readable guides.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Editorial Integrity</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Every generated article includes structured FAQs, verified examples, and complete source attribution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Daily Cadence</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Scheduled autonomous cron jobs ensure fresh, up-to-the-minute coverage 365 days a year.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Our Monetization & Independence Policy
          </h2>
          <p>
            To sustain our high-throughput computing costs and server infrastructure, AutoAI Chronicle participates in programmatic advertising (Google AdSense) and curated affiliate partner programs. We only partner with verified industry tools (cloud hosting providers, developer IDEs, productivity suites).
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
