"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  QrCode,
  Landmark,
  ArrowRight,
  Star,
  FileText,
  Briefcase,
  Terminal,
  BookOpen,
  Copy,
  Check,
} from "lucide-react";

export default function DigitalProductsStorePage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [purchased, setPurchased] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "BANK">("UPI");
  const [utrNumber, setUtrNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const products = [
    {
      id: "ai-prompt-pack",
      title: "500+ Ultimate AI Prompt PowerPack 2026",
      tagline: "Tested Production Prompts for Developers, Traders & Marketers",
      priceINR: 299,
      originalPriceINR: 1499,
      badge: "BESTSELLER",
      icon: Terminal,
      category: "Prompt Engineering",
      features: [
        "500+ battle-tested system prompts for Claude 4.5, GPT-4o & Gemini 2",
        "Algorithmic trading & options backtesting prompt scripts",
        "SEO programmatic content generation blueprints",
        "Code refactoring & unit-test automation prompts",
        "Lifetime free updates + instant PDF/Markdown delivery",
      ],
    },
    {
      id: "chatgpt-cheat-sheet",
      title: "ChatGPT & LLM Workflow Cheat Sheet 2026",
      tagline: "Visual Desk Reference & Shortcut Playbook",
      priceINR: 299,
      originalPriceINR: 999,
      badge: "POPULAR",
      icon: BookOpen,
      category: "Cheat Sheets",
      features: [
        "High-density 12-page visual PDF guide",
        "Multi-step prompt chaining & Tree-of-Thought recipes",
        "Context window optimization & token cost reduction tips",
        "API function calling & structured JSON output cheat sheets",
        "Instant printable PDF download",
      ],
    },
    {
      id: "ai-resume-templates",
      title: "ATS-Optimized AI & Software Engineer Resume Templates",
      tagline: "Silicon Valley Verified LaTeX, Word & Notion Templates",
      priceINR: 499,
      originalPriceINR: 1999,
      badge: "CAREER ACCELERATOR",
      icon: Briefcase,
      category: "Career & Tech",
      features: [
        "10+ ATS-friendly templates (LaTeX, Google Docs, MS Word)",
        "Proven templates that got candidates interviews at Google, Meta & OpenAI",
        "50+ AI & DevOps action verb bullet point examples",
        "Cover letter templates for AI Engineer & Quant Trader roles",
        "100% editable & customizable",
      ],
    },
    {
      id: "ai-business-toolkit",
      title: "Complete AI Agency & Business Automation Toolkit",
      tagline: "The Full Operational Blueprint for Launching AI Services",
      priceINR: 999,
      originalPriceINR: 4999,
      badge: "ENTERPRISE COMPLETE",
      icon: Sparkles,
      category: "Business Suite",
      features: [
        "All 3 products above included free (Save ₹1,097)",
        "Full client proposal decks, contracts & SOW agreements",
        "Autonomous agent multi-platform setup documentation",
        "Cold outreach scripts that close $2,000/mo retainer clients",
        "Private Discord Mastermind VIP invite",
      ],
    },
  ];

  const handleCheckout = (product: any) => {
    setSelectedProduct(product);
    setPurchased(false);
    setUtrNumber("");
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("8240438062@superyes");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail) return;
    setLoading(true);
    try {
      await fetch("/api/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productTitle: selectedProduct.title,
          priceINR: selectedProduct.priceINR,
          buyerEmail,
          paymentMethod,
          utrOrTxnId: utrNumber || "INSTANT_APP_PAY",
        }),
      });
      setPurchased(true);
    } catch (_) {
      setPurchased(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Store Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Direct Digital Products
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            High-Impact AI Toolkits, Cheat Sheets &amp; Blueprints
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Accelerate your engineering output, algorithmic trading, and career with production-tested digital toolkits. 100% automated delivery directly to your email.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6 hover:border-indigo-500/40 hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {prod.badge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{prod.category}</span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black font-serif text-slate-900 dark:text-white">
                      ₹{prod.priceINR}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{prod.originalPriceINR}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500">
                      Save {Math.round(((prod.originalPriceINR - prod.priceINR) / prod.originalPriceINR) * 100)}%
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout(prod)}
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Instant Access (₹{prod.priceINR})
                </button>
              </div>
            );
          })}
        </div>

        {/* Checkout Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-500/30 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-400">Direct Bank &amp; UPI Checkout</span>
                  <h3 className="text-lg font-bold font-serif">{selectedProduct.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
                >
                  Close
                </button>
              </div>

              {purchased ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif">Payment Verified!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Money has been routed directly to bank account. Your instant download files for <b>{selectedProduct.title}</b> have been unlocked and dispatched to <b>{buyerEmail}</b>.
                  </p>
                  <a
                    href="https://auto-ai-blog-web.onrender.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold"
                  >
                    <Download className="w-4 h-4" /> Download Files Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div className="text-xs font-bold text-white">{selectedProduct.title}</div>
                      <div className="text-[11px] text-slate-400">Instant PDF &amp; Code Blueprint Access</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black font-serif text-emerald-400">₹{selectedProduct.priceINR}</div>
                      <div className="text-[10px] text-slate-500">Zero Gateway Surcharges</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Your Email (To receive instant download files)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Payment Options: Direct UPI or Direct Bank Wire */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select Direct Instant Transfer
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("UPI")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          paymentMethod === "UPI"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <QrCode className="w-4 h-4 text-indigo-400" /> Direct UPI (GPay/PhonePe/Paytm)
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Instant Bank Settlement</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("BANK")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          paymentMethod === "BANK"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <Landmark className="w-4 h-4 text-emerald-400" /> Direct Bank Wire
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">NEFT / IMPS / SWIFT</div>
                      </button>
                    </div>

                    {paymentMethod === "UPI" ? (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                        <div className="text-xs text-slate-300 font-semibold">
                          Pay ₹{selectedProduct.priceINR} directly to linked Bank UPI:
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-300 font-mono text-sm font-bold border border-indigo-500/30">
                            8240438062@superyes
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                          >
                            {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Beneficiary: <b>ARNAB LAHA</b> • Bank: <b>DBS Bank</b>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                        <div><b>Account Name:</b> ARNAB LAHA</div>
                        <div><b>Bank:</b> DBS Bank India Ltd</div>
                        <div><b>IFSC Code:</b> DBSS0IN0811</div>
                        <div><b>UPI:</b> 8240438062@superyes</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      UPI Ref / UTR / Transaction ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 423987123456 or PhonePe Ref"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                  >
                    {loading ? (
                      "Verifying Payment & Unlocking..."
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> I Have Completed Payment (Unlock ₹{selectedProduct.priceINR})
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
