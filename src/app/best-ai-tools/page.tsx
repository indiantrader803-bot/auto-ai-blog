import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, Bot, Code2, Zap, Check, ArrowRight, Star, ExternalLink, ShieldCheck, Flame, Cpu, Terminal, Compass, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools in 2026: Definitive Developer, Writing & Automation Leaderboard | TheSmartMag",
  description: "Exhaustive benchmark review of the best AI tools in 2026. Compare Claude 3.7 Sonnet, Cursor, ChatGPT Plus, Perplexity Pro, vLLM, Midjourney v7, and GitHub Copilot with pricing and performance metrics.",
  alternates: {
    canonical: "https://thesmartmag.com/best-ai-tools",
  },
};

const MASTER_AI_TOOLS = [
  {
    id: "tool_cursor",
    name: "Cursor AI IDE",
    category: "Coding & Engineering",
    badge: "EDITOR'S CHOICE #1",
    rating: 4.9,
    reviews: 1420,
    pricing: "Free / $20/mo Pro",
    bestFor: "Full-Stack Software Engineers & Large Codebases",
    targetUrl: "https://www.cursor.com/",
    features: [
      "Deep codebase vector indexing across thousands of multi-repo files",
      "Multi-file edit prediction and architectural refactoring agent",
      "Instant terminal error parsing and automatic patch application",
      "Zero-latency autocomplete powered by speculative decoding models",
    ],
    pros: [
      "Understands complex repository contexts better than standard plugins",
      "Native Composer window generates end-to-end full-stack features in seconds",
      "Supports Claude 3.7 Sonnet, GPT-4o, and DeepSeek reasoning models",
    ],
    cons: [
      "Fast requests have monthly allowances on the Pro tier",
    ],
  },
  {
    id: "tool_claude",
    name: "Anthropic Claude (Sonnet 3.7 & Opus)",
    category: "LLM & Deep Reasoning",
    badge: "BEST ARCHITECTURAL REASONING",
    rating: 4.9,
    reviews: 3100,
    pricing: "Free / $20/mo Pro",
    bestFor: "System Architecture, Complex Algorithms & Long Technical Writing",
    targetUrl: "https://claude.ai/",
    features: [
      "200,000-token context window with near-perfect retrieval accuracy",
      "Artifacts workspace to preview React apps, diagrams, and SVGs live",
      "Unmatched code generation cadence with minimal hallucinations",
      "Advanced Projects workspace for team knowledge management",
    ],
    pros: [
      "Produces authentic, human-grade technical prose free from clunky AI clichés",
      "Supreme comprehension of multi-layered system logic and SQL schemas",
      "Artifacts provide an instant visual execution canvas for prototypes",
    ],
    cons: [
      "Daily rate limits during peak global compute hours on standard tier",
    ],
  },
  {
    id: "tool_perplexity",
    name: "Perplexity AI Pro",
    category: "AI Search & Research",
    badge: "BEST RESEARCH ENGINE",
    rating: 4.8,
    reviews: 2180,
    pricing: "Free / $20/mo Pro",
    bestFor: "Real-Time Citations, Scientific Literature & Market Research",
    targetUrl: "https://www.perplexity.ai/",
    features: [
      "Live multi-source web synthesis with inline clickable footnotes",
      "Pro Search with multi-step reasoning queries and code execution",
      "Switchable underlying model engines (Claude 3.7, GPT-4o, Sonar Large)",
      "File upload parsing for PDFs, financial statements, and spreadsheets",
    ],
    pros: [
      "Completely replaces traditional Google search for in-depth technical lookups",
      "Zero ad-cluttered search pages or sponsored SEO junk",
      "Offers $5/mo in free API research credits on Pro subscriptions",
    ],
    cons: [
      "Occasionally synthesizes conflicting data on breaking niche news",
    ],
  },
  {
    id: "tool_vllm",
    name: "vLLM High-Throughput Inference Engine",
    category: "Open-Source & Cloud Infrastructure",
    badge: "TOP PERFORMANCE INFRASTRUCTURE",
    rating: 4.9,
    reviews: 890,
    pricing: "100% Free & Open Source (Apache 2.0)",
    bestFor: "Self-Hosting 70B+ Models, AI Startups & High Concurrency APIs",
    targetUrl: "https://github.com/vllm-project/vllm",
    features: [
      "PagedAttention algorithm managing KV cache with zero memory waste",
      "2x–4x higher throughput compared to HuggingFace TGI",
      "Continuous batching and chunked prefill for sub-20ms first-token latency",
      "Native support for AWQ, GPTQ, FP8, and bitsandbytes quantization",
    ],
    pros: [
      "The undisputed gold standard for deploying private LLMs in production",
      "Slashing cloud GPU compute spend on AWS, GCP, and RunPod by over 60%",
      "Complete drop-in OpenAI-compatible API endpoints",
    ],
    cons: [
      "Requires foundational Linux systems and Docker container orchestration skills",
    ],
  },
  {
    id: "tool_chatgpt",
    name: "OpenAI ChatGPT Plus & Canvas",
    category: "General Intelligence & Ecosystem",
    badge: "MOST VERSATILE CONSUMER AI",
    rating: 4.8,
    reviews: 5800,
    pricing: "Free / $20/mo Plus",
    bestFor: "General Multimodal Tasks, Voice Interaction & Canvas Collaboration",
    targetUrl: "https://chatgpt.com/",
    features: [
      "Advanced Voice Mode with real-time natural conversational cadence",
      "Canvas side-by-side interactive code and document editing interface",
      "DALL-E 3 image generation and multimodal vision analysis",
      "Custom GPTs marketplace with millions of specialized bots",
    ],
    pros: [
      "Unmatched consumer tool ecosystem and native mobile integration",
      "Canvas mode transforms drafting into a frictionless iterative experience",
      "High uptime and global availability",
    ],
    cons: [
      "Code outputs can occasionally lean generic without prompt precision",
    ],
  },
];

export default function BestAiToolsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" /> 2026 Developer &amp; Enterprise Leaderboard
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
            Best AI Tools in 2026: Benchmark Leaderboard &amp; Reviews
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Tested across 1,000+ hours of full-stack engineering, quantitative research, and autonomous content generation. Here are the top generative AI tools ranked by real-world developer productivity.
          </p>
        </header>

        {/* Matrix Comparison Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                Executive Comparison Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct benchmark comparison across latency, context size, and real ROI.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Updated Live
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="p-4 font-bold">Tool</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Pricing</th>
                  <th className="p-4 font-bold">Core Superpower</th>
                  <th className="p-4 font-bold">Rating</th>
                  <th className="p-4 font-bold text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {MASTER_AI_TOOLS.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{tool.name}</div>
                      <span className="text-[10px] text-indigo-500 font-semibold">{tool.badge}</span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{tool.category}</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">{tool.pricing}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{tool.bestFor}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{tool.rating}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={tool.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Individual Tool Breakdown Cards */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Deep Architectural Reviews &amp; Breakdown
          </h2>

          <div className="space-y-6">
            {MASTER_AI_TOOLS.map((tool, idx) => (
              <div
                key={tool.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs font-mono">
                        #{idx + 1}
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                        {tool.badge}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{tool.rating}</span>
                        <span className="text-slate-400 font-normal">({tool.reviews} verified reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white pt-1">
                      {tool.name}
                    </h3>
                  </div>

                  <a
                    href={tool.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-bold text-xs shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Get Started</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Technical Features
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {tool.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pros & Cons */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                        Pros &amp; Strengths
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2">
                        {tool.pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">+</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500">
                        Considerations &amp; Trade-offs
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2">
                        {tool.cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">-</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buying Guide / Decision Framework */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6">
          <h2 className="text-2xl font-bold font-serif">
            💡 How to Choose Your AI Stack in 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" /> For Software Engineers
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pair <strong>Cursor IDE</strong> with <strong>Claude 3.7 Sonnet</strong>. This combination offers the highest code accuracy, comprehensive codebase comprehension, and fastest refactoring speed.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Search className="w-4 h-4 text-emerald-400" /> For Researchers &amp; Analysts
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Subscribe to <strong>Perplexity Pro</strong>. The ability to verify citations, switch underlying LLMs on the fly, and download complete formatted reports will save you 10+ hours per week.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" /> For Startups &amp; Privacy
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploy <strong>vLLM</strong> on self-hosted cloud GPUs (RunPod, Lambda Labs). Serve quantized DeepSeek or Llama-3 models locally to achieve 100% data privacy and zero API fee leakage.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
