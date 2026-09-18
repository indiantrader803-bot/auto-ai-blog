"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";
import {
  TrendingUp,
  ShieldCheck,
  Tag,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Calculator,
  Flame,
  Award,
  DollarSign,
  Percent,
  Sliders,
  ShieldAlert,
  HelpCircle,
  BarChart3,
  Zap,
} from "lucide-react";

export default function TradeSubBrandPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Calculator State
  const [accountSize, setAccountSize] = useState<number>(100000);
  const [monthlyGain, setMonthlyGain] = useState<number>(8);
  const [profitSplitPercent, setProfitSplitPercent] = useState<number>(90);

  // Risk Calculator State
  const [riskAccountSize, setRiskAccountSize] = useState<number>(100000);
  const [dailyDrawdownPercent, setDailyDrawdownPercent] = useState<number>(5);
  const [tradesPerDay, setTradesPerDay] = useState<number>(3);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Profit calculation
  const grossProfit = (accountSize * monthlyGain) / 100;
  const traderPayoutUSD = (grossProfit * profitSplitPercent) / 100;
  const traderPayoutINR = traderPayoutUSD * 86.5;

  // Risk calculation
  const maxDailyLossUSD = (riskAccountSize * dailyDrawdownPercent) / 100;
  const safeRiskPerTradeUSD = maxDailyLossUSD / (tradesPerDay * 1.5);
  const safeRiskPerTradePercent = (safeRiskPerTradeUSD / riskAccountSize) * 100;

  // Extra brokers/platforms
  const additionalTradingPlatforms = [
    {
      id: "aff_po",
      name: "Pocket Option (Fast Payouts & Demo)",
      category: "Options & Binary",
      badge: "50% DEPOSIT BONUS",
      promoCode: "50START",
      rating: 4.8,
      reviews: 3200,
      highlight: "Practice with $10,000 Refillable Free Demo or get 50% Match Bonus",
      url: "https://v4.lands-po.com/en/land/009-QT-09?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      split: "Instant Match",
      minDays: "Instant",
      payoutSpeed: "Under 1 Hour (UPI/Crypto)",
    },
    {
      id: "aff_delta",
      name: "Delta Exchange (Derivatives & Options)",
      category: "Crypto Derivatives",
      badge: "15% FEE DISCOUNT",
      promoCode: "YXQSZA",
      rating: 4.7,
      reviews: 1850,
      highlight: "Institutional-Grade BTC/ETH Options, Futures with 100x Leverage & Direct INR",
      url: "https://www.delta.exchange/?code=YXQSZA",
      split: "Fee Rebate",
      minDays: "Instant",
      payoutSpeed: "Instant Crypto/Bank",
    },
    {
      id: "aff_coinswitch",
      name: "CoinSwitch Pro (INR Multi-Exchange)",
      category: "Spot & Quant Desk",
      badge: "UP TO 50% FEE DISCOUNT",
      promoCode: "NLfEITW",
      rating: 4.7,
      reviews: 4200,
      highlight: "Unified INR Orderbook for Indian Quant Traders & Direct UPI/IMPS Banking",
      url: "https://coinswitch.co/pro/signup?code=NLfEITW",
      split: "Fee Rebate",
      minDays: "Instant",
      payoutSpeed: "Instant IMPS / UPI",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* JSON-LD Structured Data for Google Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://trade.thesmartmag.com/#website",
                url: "https://trade.thesmartmag.com",
                name: "SmartMag Trade: Best Prop Trading Firms & Trader Hub",
                description:
                  "Compare 2026 top prop trading firms, get verified discount promo codes, calculate profit splits and risk per trade.",
                publisher: {
                  "@type": "Organization",
                  name: "SmartMag Tech & Finance Network",
                  url: "https://thesmartmag.com",
                },
              },
              {
                "@type": "ItemList",
                itemListElement: PROPFLOW_MASTER_OFFERS.map((firm, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: firm.name,
                  url: `https://thesmartmag.com/reviews/${firm.slug}`,
                  description: firm.discountSummary,
                })),
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is the best prop firm with the highest profit split in 2026?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "FundedSquad and Equity Edge offer up to 90% profit splits with zero minimum trading days, accompanied by verified discount promo codes.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I claim prop trading firm discount promo codes?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Click 'Copy Code' on any ranked firm card (e.g., code CHARGE for FundedSquad or THESMARTMAG for Equity Edge) and paste it at checkout for instant discounts.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <Navbar />

      {/* Sub-Brand Sticky Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 text-white text-xs py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" />
        <span>
          <strong>SmartMag Trade Sub-Brand:</strong> Exclusive 2026 Prop Firm Discount Codes &amp; 90% Profit Split Leaderboard Active!
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-black">
          VERIFIED TODAY
        </span>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider shadow-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Official 2026 Trader Directory &amp; Prop Firm Rankings</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-slate-900 dark:text-white leading-tight">
            Scale Your Capital to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500">
              $1,500,000+
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The definitive trading resource for serious retail &amp; quant traders. Compare verified payout speeds, 90% profit splits, zero-minimum-day challenges, and claim exclusive partner discount codes.
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] uppercase font-bold text-slate-400">Max Profit Split</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">90% Split</div>
              <div className="text-[10px] text-slate-500">Bi-weekly / On-Demand</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] uppercase font-bold text-slate-400">Time Limits</div>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">0 Days</div>
              <div className="text-[10px] text-slate-500">No Minimum Trading Time</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] uppercase font-bold text-slate-400">Max Allocation</div>
              <div className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">$1.5M - $2M</div>
              <div className="text-[10px] text-slate-500">Fast Scaling Programs</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] uppercase font-bold text-slate-400">Exclusive Codes</div>
              <div className="text-xl font-black text-amber-500 font-mono">Up to 35% OFF</div>
              <div className="text-[10px] text-slate-500">1-Click Verified Deals</div>
            </div>
          </div>
        </div>

        {/* Section 1: Ranked Prop Firm Leaderboard */}
        <section className="space-y-6" id="leaderboard">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                  Top Prop Trading Firms (2026 Leaderboard)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Audited for legitimate payouts, drawdown transparency, and active promotional discounts.
              </p>
            </div>

            <Link
              href="/compare/ftmo-vs-ftm"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Compare FTMO vs FTM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {PROPFLOW_MASTER_OFFERS.map((firm, idx) => (
              <div
                key={firm.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
              >
                {/* Left Firm Info */}
                <div className="space-y-3 max-w-2xl flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs font-mono shadow-xs">
                      #{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      {firm.highlightBadge}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-mono">
                      <span>★ {firm.rating}</span>
                      <span className="text-slate-400 font-normal">({firm.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {firm.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {firm.discountSummary}
                  </p>

                  {/* Badges & Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Profit Split</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{firm.profitSplit}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Max Drawdown</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{firm.maxDrawdown}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Min Days</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{firm.minTradingDays}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Max Account</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">{firm.maxFunding}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Box */}
                <div className="w-full lg:w-72 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shrink-0">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Verified Promo Coupon
                    </div>
                    <button
                      onClick={() => handleCopy(firm.promoCode)}
                      className="mt-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-600 dark:text-amber-400 font-mono font-black text-sm transition-all cursor-pointer group/btn"
                      title="Click to copy coupon code"
                    >
                      <span>Code: <strong>{firm.promoCode}</strong></span>
                      {copiedCode === firm.promoCode ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-amber-500 group-hover/btn:scale-110 transition-transform" />
                      )}
                    </button>
                    {copiedCode === firm.promoCode && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1 animate-pulse">
                        ✓ Copied to clipboard!
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      href={firm.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                    >
                      <span>Claim Deal &amp; Sign Up</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href={`/reviews/${firm.slug}`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs text-center transition-all"
                    >
                      Full 2026 Audit &amp; Rules →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Crypto, Options & Derivatives Desks */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                Top Crypto, Options &amp; Quant Terminals
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct INR gateways, high-leverage crypto options, and instant fee cashback rebates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {additionalTradingPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">
                      {platform.category}
                    </span>
                    <span className="text-amber-500 text-xs font-bold">★ {platform.rating}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-serif">
                    {platform.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {platform.highlight}
                  </p>

                  <div className="text-[11px] space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-slate-500">
                      <span>Payout Speed:</span>
                      <strong className="text-emerald-500">{platform.payoutSpeed}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleCopy(platform.promoCode)}
                    className="w-full py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5"
                  >
                    <span>Code: <strong>{platform.promoCode}</strong></span>
                    {copiedCode === platform.promoCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <span>Open Account</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive Trading Calculators */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="calculators">
          {/* Calculator 1: Profit Split & Payout */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-5 h-5" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-serif">
                Prop Firm Profit &amp; Payout Calculator
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Estimate your monthly take-home payouts based on funded capital, profit targets, and split percentages.
            </p>

            <div className="space-y-4 text-xs font-bold">
              {/* Account Size Selector */}
              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-2">
                  Funded Account Size: <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm font-black">${accountSize.toLocaleString()}</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[10000, 25000, 50000, 100000, 200000, 300000].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setAccountSize(size)}
                      className={`py-2 rounded-xl text-center font-mono text-[11px] transition-all cursor-pointer ${
                        accountSize === size
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      ${size >= 1000 ? `${size / 1000}k` : size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Gain Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Monthly Return Target:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-black">+{monthlyGain}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={monthlyGain}
                  onChange={(e) => setMonthlyGain(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Profit Split Selector */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Profit Split Tier:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 text-sm font-black">{profitSplitPercent}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[80, 85, 90].map((split) => (
                    <button
                      key={split}
                      type="button"
                      onClick={() => setProfitSplitPercent(split)}
                      className={`py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                        profitSplitPercent === split
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {split}% Split
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                  <span>Gross Monthly Profit:</span>
                  <span className="font-mono font-bold">${grossProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-emerald-500/20">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Net Trader Payout</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      ${traderPayoutUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">INR Equivalent</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
                      ₹{traderPayoutINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator 2: Drawdown & Risk Per Trade */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <ShieldAlert className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-serif">
                Drawdown &amp; Safe Risk Per Trade
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ensure you never breach 4% or 5% daily drawdown limits by calculating exact allowable risk per trade.
            </p>

            <div className="space-y-4 text-xs font-bold">
              {/* Account Size */}
              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-2">
                  Account Size: <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm font-black">${riskAccountSize.toLocaleString()}</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {[25000, 50000, 100000, 200000].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setRiskAccountSize(size)}
                      className={`py-2 rounded-xl text-center font-mono text-[11px] transition-all cursor-pointer ${
                        riskAccountSize === size
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      ${size / 1000}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Drawdown Limit */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Daily Drawdown Rule:</span>
                  <span className="font-mono text-amber-500 text-sm font-black">{dailyDrawdownPercent}% Max</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[4, 5, 6].map((dd) => (
                    <button
                      key={dd}
                      type="button"
                      onClick={() => setDailyDrawdownPercent(dd)}
                      className={`py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                        dailyDrawdownPercent === dd
                          ? "bg-amber-500 text-slate-950 font-black"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {dd}% Daily Loss
                    </button>
                  ))}
                </div>
              </div>

              {/* Planned Trades / Day */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Max Intraday Positions:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm font-black">{tradesPerDay} Trades</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={tradesPerDay}
                  onChange={(e) => setTradesPerDay(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Risk Output Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                  <span>Max Allowable Daily Loss:</span>
                  <span className="font-mono font-bold text-rose-500">-${maxDailyLossUSD.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-indigo-500/20">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Safe Risk Per Trade</div>
                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      ${safeRiskPerTradeUSD.toFixed(0)} <span className="text-xs font-normal text-slate-400">({safeRiskPerTradePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Safety Buffer</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ Rule Protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comprehensive Comparison Matrix */}
        <section className="space-y-6" id="matrix">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-serif">
              Full Side-by-Side Prop Firm Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Quick comparison of profit splits, drawdown buffers, minimum trading days, and starting pricing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Prop Firm</th>
                  <th className="p-4">Profit Split</th>
                  <th className="p-4">Daily DD</th>
                  <th className="p-4">Max DD</th>
                  <th className="p-4">Min Days</th>
                  <th className="p-4">Discount Code</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {PROPFLOW_MASTER_OFFERS.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span>{f.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[9px] font-mono">
                          ★{f.rating}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {f.profitSplit}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-mono">{f.dailyDrawdown}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-mono">{f.maxDrawdown}</td>
                    <td className="p-4 text-indigo-600 dark:text-indigo-400 font-bold">{f.minTradingDays}</td>
                    <td className="p-4 font-mono font-black text-amber-500">
                      <button
                        onClick={() => handleCopy(f.promoCode)}
                        className="hover:underline flex items-center gap-1 cursor-pointer"
                        title="Click to copy"
                      >
                        <span>{f.promoCode}</span>
                        {copiedCode === f.promoCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={f.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-[11px] uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1"
                      >
                        <span>Claim</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions (FAQ) */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                Frequently Asked Prop Firm Questions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Essential rules and insights before taking an evaluation challenge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>How do prop trading firm payouts work?</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Once funded, you trade the firm&apos;s capital. Profit splits (ranging from 80% to 90%) are paid out bi-weekly or on-demand directly via Crypto (USDT), Rise, Direct Bank Transfer, or Deel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Are Expert Advisors (EAs) and Algorithmic Bots allowed?</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes, top firms like FundedSquad, Equity Edge, and FTM fully permit algorithmic bots, news trading, and automated EA risk execution strategies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>What is the difference between Daily and Total Drawdown?</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Daily drawdown (usually 4%-5%) resets at midnight and measures your maximum intraday floating loss. Total drawdown (usually 8%-10%) is the absolute maximum loss from your starting balance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>How do I get the maximum discount on challenge fees?</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Use the verified discount coupons listed above (such as code <strong className="text-amber-500">CHARGE</strong> for 35% off or <strong className="text-amber-500">THESMARTMAG</strong>) at the checkout page of the respective prop firm.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
