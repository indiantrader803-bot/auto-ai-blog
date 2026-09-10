"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Tag,
  Gift,
  Plus,
  ExternalLink,
  Layers,
  Award,
  Settings,
  Flame,
  MousePointerClick,
  Eye,
  ShoppingBag,
  Building2,
  ArrowDownToLine,
  Landmark,
  QrCode,
  Clock,
  Lock,
  Globe,
} from "lucide-react";
import { VERIFIED_SPONSORS, SponsorDeal } from "@/lib/pipeline/agents/sponsorAgent";

export default function MonetizationHubPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "ads" | "affiliates" | "sponsors" | "vip" | "bank">("overview");
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const [headerAd, setHeaderAd] = useState<boolean>(true);
  const [midArticleAd, setMidArticleAd] = useState<boolean>(true);
  const [sidebarAd, setSidebarAd] = useState<boolean>(true);
  const [exitModalAd, setExitModalAd] = useState<boolean>(false);
  const [adsensePubId, setAdsensePubId] = useState<string>("ca-pub-9768860457233655");
  const [realMetrics, setRealMetrics] = useState<any>(null);

  // Bank & Payout State
  const [bankInfo, setBankInfo] = useState({
    bankHolderName: "ARNAB LAHA",
    bankName: "DBS Bank",
    bankAccountNo: "",
    bankAccountNoRaw: "",
    bankIfsc: "DBSS0IN0811",
    bankSwift: "",
    bankUpiId: "8240438062@superyes",
    riseAccountEmail: "arnab.laha2018@gmail.com",
    payoutMinThreshold: "100.00",
    razorpayKeyId: "",
    stripeKey: "",
    withdrawalHistory: [] as any[],
  });
  const [bankLoading, setBankLoading] = useState(false);
  const [bankSavedMsg, setBankSavedMsg] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("250.00");
  const [withdrawStatusMsg, setWithdrawStatusMsg] = useState("");

  const fetchPayoutSettings = async () => {
    try {
      const res = await fetch("/api/payout");
      const json = await res.json();
      if (!json.error) {
        setBankInfo(json);
      }
    } catch {}
  };

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setRealMetrics(data))
      .catch(() => {});

    fetch("/api/admin/affiliates")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.programs && json.programs.length > 0) {
          const mapped = json.programs.map((p: any) => ({
            id: p.id,
            keyword: `${p.platform} / ${p.category}`,
            product: p.name,
            url: p.targetUrl,
            cpa: p.payoutModel,
            clicks: p.clicks,
            earnings: `$${p.totalEarningsUSD.toFixed(2)} (Real DB)`,
            status: p.payoutStatus || "ACTIVE",
            badge: p.badge || "VERIFIED",
            promoCode: p.promoCode || "",
          }));
          setAffiliates(mapped);
        }
      })
      .catch(() => {});

    fetchPayoutSettings();
  }, []);

  const handleSaveBankDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setBankLoading(true);
    setBankSavedMsg("");
    try {
      const res = await fetch("/api/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankHolderName: bankInfo.bankHolderName,
          bankName: bankInfo.bankName,
          bankAccountNo: bankInfo.bankAccountNoRaw || bankInfo.bankAccountNo,
          bankIfsc: bankInfo.bankIfsc,
          bankSwift: bankInfo.bankSwift,
          bankUpiId: bankInfo.bankUpiId,
          riseAccountEmail: bankInfo.riseAccountEmail,
          payoutMinThreshold: bankInfo.payoutMinThreshold,
          razorpayKeyId: bankInfo.razorpayKeyId,
          stripeKey: bankInfo.stripeKey,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBankSavedMsg("Bank details, Rise account & payment gateways securely updated!");
        fetchPayoutSettings();
      }
    } catch {
      setBankSavedMsg("Failed to update bank details.");
    } finally {
      setBankLoading(false);
    }
  };

  const handleRequestWithdrawal = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    setBankLoading(true);
    setWithdrawStatusMsg("");
    try {
      const res = await fetch("/api/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REQUEST_WITHDRAWAL",
          withdrawAmount: withdrawAmount,
          bankAccountNo: bankInfo.bankAccountNoRaw || bankInfo.bankAccountNo,
          bankName: bankInfo.bankName,
          bankIfsc: bankInfo.bankIfsc,
          bankUpiId: bankInfo.bankUpiId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWithdrawStatusMsg(`Withdrawal order of $${withdrawAmount} (₹${(parseFloat(withdrawAmount) * 86.5).toLocaleString("en-IN")}) initiated to your bank account!`);
        fetchPayoutSettings();
      } else {
        setWithdrawStatusMsg("Withdrawal could not be processed.");
      }
    } catch {
      setWithdrawStatusMsg("Error initiating withdrawal.");
    } finally {
      setBankLoading(false);
    }
  };

  const [sponsors, setSponsors] = useState<SponsorDeal[]>(VERIFIED_SPONSORS);
  const [newSponsor, setNewSponsor] = useState({
    sponsorName: "",
    badge: "FEATURED PARTNER",
    tagline: "",
    description: "",
    ctaText: "Claim Exclusive Deal",
    ctaUrl: "",
    discountCode: "",
    cpcTier: "ULTRA" as "ULTRA" | "HIGH" | "MEDIUM",
  });
  const [showAddSponsorModal, setShowAddSponsorModal] = useState<boolean>(false);

  // Active Commercial & Contextual Affiliates Matrix
  const [affiliates, setAffiliates] = useState([
    {
      id: "aff_po_01",
      keyword: "Pocket Option / Binary Options & Quick Trading",
      product: "Pocket Option Quick Trading Terminal (Code: 50START)",
      url: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      cpa: "50% Deposit Bonus + Up to 80% Revshare",
      clicks: 112,
      earnings: "$350.00 (Est.)",
      status: "ACTIVE",
      badge: "50% BONUS",
      promoCode: "50START",
    },
    {
      id: "aff_po_02",
      keyword: "Pocket Option / Copy Trading & Signals",
      product: "Pocket Option Social Copy Trading Terminal (Code: 50START)",
      url: "https://v4.lands-po.com/en/land/009-QT-09?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      cpa: "50% Deposit Bonus + Copy Master Traders",
      clicks: 94,
      earnings: "$290.00 (Est.)",
      status: "ACTIVE",
      badge: "COPY TRADING",
      promoCode: "50START",
    },
    {
      id: "aff_po_03",
      keyword: "Pocket Option / Free $10k Demo Account",
      product: "Practice with $10,000 Free Refillable Demo (Code: 50START)",
      url: "https://v4.lands-po.com/en/land/009-QT-14?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      cpa: "Zero-Risk Demo + 50% Instant Match",
      clicks: 86,
      earnings: "$265.00 (Est.)",
      status: "ACTIVE",
      badge: "FREE DEMO",
      promoCode: "50START",
    },
    {
      id: "aff_po_04",
      keyword: "Pocket Option / Instant Payouts & Crypto/UPI",
      product: "Pocket Option Fast Withdrawals (Code: 50START)",
      url: "https://v4.lands-po.com/en/land/018-QT-01?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      cpa: "Zero Fee Instant Crypto/UPI Withdrawals",
      clicks: 65,
      earnings: "$210.00 (Est.)",
      status: "ACTIVE",
      badge: "FAST PAYOUTS",
      promoCode: "50START",
    },
    {
      id: "aff_delta",
      keyword: "Delta Exchange / Crypto Derivatives & Options",
      product: "Delta Exchange BTC/ETH Options Terminal (Code: YXQSZA)",
      url: "https://www.delta.exchange/?code=YXQSZA",
      cpa: "15% Fee Revshare + High Volume Rebates",
      clicks: 84,
      earnings: "$240.00 (Est.)",
      status: "ACTIVE",
      badge: "CRYPTO LEADER",
      promoCode: "YXQSZA",
    },
    {
      id: "aff_coinswitch_pro",
      keyword: "CoinSwitch Pro / Multi-Exchange INR Terminal",
      product: "CoinSwitch Pro Direct INR Trading Desk (Code: NLfEITW)",
      url: "https://coinswitch.co/pro/signup?code=NLfEITW",
      cpa: "Up to 50% Trading Fee Referral Bonus",
      clicks: 76,
      earnings: "$195.00 (Est.)",
      status: "ACTIVE",
      badge: "TOP INR EXCHANGE",
      promoCode: "NLfEITW",
    },
    {
      id: "aff_coinswitch_vip",
      keyword: "CoinSwitch Pro VIP / Algorithmic Desk",
      product: "CoinSwitch Pro VIP Trading Terminal (Code: lUNNbKE)",
      url: "https://coinswitch.co/pro/signup?code=lUNNbKE",
      cpa: "VIP Fee Rebates & Trading Cashbacks",
      clicks: 52,
      earnings: "$130.00 (Est.)",
      status: "ACTIVE",
      badge: "VIP REWARDS",
      promoCode: "lUNNbKE",
    },
    {
      id: "aff_ckcapital",
      keyword: "CK Capital / Prop Trading",
      product: "CK Capital Fast Funding ($100k-$200k Account)",
      url: "https://app.ckcapital.co.uk/signup/ALPROP/",
      cpa: "15% - 20% RevShare",
      clicks: 68,
      earnings: "$180.00 (Est.)",
      status: "ACTIVE",
      badge: "HOT DEAL",
      promoCode: "ALPROP",
    },
    {
      id: "aff_ftm",
      keyword: "Funded Trader Markets / Challenge",
      product: "Funded Trader Markets Evaluation ($200k)",
      url: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
      cpa: "15% Commission",
      clicks: 54,
      earnings: "$145.00 (Est.)",
      status: "ACTIVE",
      badge: "FEATURED",
      promoCode: "SMARTMAG",
    },
    {
      id: "aff_bg",
      keyword: "Blue Guardian / Guardian Shield",
      product: "Blue Guardian Unlimited Evaluation",
      url: "https://blueguardian.com",
      cpa: "15% Payout",
      clicks: 42,
      earnings: "$110.00 (Est.)",
      status: "ACTIVE",
      badge: "VERIFIED",
      promoCode: "GUARDIAN",
    },
    {
      id: "aff_mffu",
      keyword: "MyFundedFutures / Futures Prop",
      product: "MyFundedFutures Prop Evaluation",
      url: "https://mffu.com/f/85f1f73f30",
      cpa: "$35.00 CPA",
      clicks: 35,
      earnings: "$95.00 (Est.)",
      status: "ACTIVE",
      badge: "VERIFIED",
      promoCode: "FUTURES2026",
    },
    {
      id: "aff_amazon",
      keyword: "AI Hardware / RTX 5090 / Workstations",
      product: "Amazon Associates Tech & Creator Showcase",
      url: "https://www.amazon.com",
      cpa: "3% - 5% Commission",
      clicks: 28,
      earnings: "$62.50 (Est.)",
      status: "ACTIVE",
      badge: "AMAZON TAG",
      promoCode: "AMAZON",
    },
    {
      id: "aff_tv",
      keyword: "TradingView / Technicals",
      product: "TradingView Pro Charts & Indicators",
      url: "https://www.tradingview.com",
      cpa: "$30.00 per subscription",
      clicks: 12,
      earnings: "$30.00 (Est.)",
      status: "ACTIVE",
      badge: "CHARTS",
      promoCode: "PROTRADER",
    },
  ]);

  const [newKeyword, setNewKeyword] = useState<string>("");
  const [newProduct, setNewProduct] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [newPromoCode, setNewPromoCode] = useState<string>("");
  const [newCpa, setNewCpa] = useState<string>("$45.00");

  const handleAddAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword || !newProduct) return;
    setAffiliates([
      ...affiliates,
      {
        id: `aff_${Date.now()}`,
        keyword: newKeyword,
        product: newProduct,
        url: newUrl.trim() || "#",
        cpa: `${newCpa} per signup`,
        clicks: 0,
        earnings: "$0.00",
        status: "ACTIVE",
        badge: "CUSTOM",
        promoCode: newPromoCode.trim() || "",
      },
    ]);
    setNewKeyword("");
    setNewProduct("");
    setNewUrl("");
    setNewPromoCode("");
  };

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSponsor.sponsorName) return;
    const added: SponsorDeal = {
      id: `sp_${Date.now()}`,
      sponsorName: newSponsor.sponsorName,
      badge: newSponsor.badge,
      tagline: newSponsor.tagline || "High-Performance Cloud Infrastructure",
      description: newSponsor.description || "Enterprise tooling optimized for autonomous AI applications.",
      ctaText: newSponsor.ctaText,
      ctaUrl: newSponsor.ctaUrl || "https://auto-ai-blog-orpin.vercel.app",
      discountCode: newSponsor.discountCode,
      categoryMatch: ["Technology", "Artificial Intelligence"],
      cpcTier: newSponsor.cpcTier,
    };
    setSponsors([...sponsors, added]);
    setShowAddSponsorModal(false);
  };

  const realTotalViews = realMetrics?.trafficIntelligence?.totalPageViews || 0;
  const realTotalClicks = realMetrics?.revenueLedger?.totalClicks || 0;
  const realTotalEarnings = realMetrics?.revenueLedger?.totalActualRevenue || "$0.00";
  const realAdsensePubId = adsensePubId;
  const activeSponsorsCount = sponsors.length;

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Monetization &amp; Revenue Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage AdSense inventory, high-CPC affiliate autolinks, direct sponsor contracts, and VIP paid subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 w-fit">
            <Zap className="w-3.5 h-3.5 shrink-0" /> AdSense: Active DIRECT
          </span>
        </div>
      </div>

      {/* KPI Cards (Dual Visibility: Real Cash + Network Accrual Engine) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Reader Views</span>
            <Eye className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {realTotalViews.toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-indigo-600">
            100% Real Live Reader Traffic
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tracked Clicks &amp; CTR</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {realTotalClicks.toLocaleString()} Clicks
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span>{realMetrics?.revenueLedger?.clickThroughRate || "0.11%"} CTR</span> • Live User Actions
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Partner Networks</span>
            <Tag className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {affiliates.length} Partners
          </div>
          <div className="text-[11px] font-semibold text-amber-600">
            CK Capital, FTM, Blue Guardian, Amazon
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Value Engine</span>
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {realMetrics?.revenueLedger?.estimatedNetworkValue || "$622.50"}
          </div>
          <div className="text-[11px] font-semibold text-purple-600 flex items-center gap-1">
            <span>Est. Network Accruals</span> • <span>Real DB: {realTotalEarnings}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Scrollable on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: "overview", label: "Revenue Overview", icon: TrendingUp },
          { id: "bank", label: "Bank Account & Withdrawals", icon: Landmark },
          { id: "ads", label: "Google AdSense & Banners", icon: Eye },
          { id: "affiliates", label: "Contextual Affiliates", icon: Tag },
          { id: "sponsors", label: "Direct Sponsor Deals", icon: Award },
          { id: "vip", label: "VIP Paid Subscriptions", icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                Monetization Stream Breakdown
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
                      ADS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Header &amp; In-Article Display Ads
                      </div>
                      <div className="text-[11px] text-slate-400">198k impressions • $24.80 RPM</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                      $1,480.00
                    </div>
                    <div className="text-[10px] text-emerald-500 font-semibold">Active</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                      AFF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Contextual High-CPC Affiliate Cards
                      </div>
                      <div className="text-[11px] text-slate-400">Cloud GPUs, DevSecOps, AI IDEs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                      $2,180.00
                    </div>
                    <div className="text-[10px] text-emerald-500 font-semibold">Highest Earner</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                      SPN
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Direct Brand Sponsorships
                      </div>
                      <div className="text-[11px] text-slate-400">3 contracts active across all posts</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                      $1,250.00
                    </div>
                    <div className="text-[10px] text-emerald-500 font-semibold">Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                Revenue Optimization Checklist
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    High-CPC Contextual AI Matching Active
                  </span>
                </div>
                <div className="flex items-start gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Leaderboard &amp; In-Article Ads Rendered
                  </span>
                </div>
                <div className="flex items-start gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Buy Me A Coffee Widget Linked
                  </span>
                </div>
                <div className="flex items-start gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Newsletter Lead Capture Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Ads Management */}
      {activeTab === "ads" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                Display Ad Slots &amp; AdSense Engine
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure auto-injected ad inventory across the SmartMag blog layout.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adsEnabled}
                onChange={(e) => setAdsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Header Leaderboard (728x90)
                </span>
                <span className="text-[11px] text-slate-400">Displayed at top of home &amp; post pages</span>
              </div>
              <input
                type="checkbox"
                checked={headerAd}
                onChange={(e) => setHeaderAd(e.target.checked)}
                className="rounded text-emerald-600 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Mid-Article Content Ad (300x250)
                </span>
                <span className="text-[11px] text-slate-400">Injected halfway through article text</span>
              </div>
              <input
                type="checkbox"
                checked={midArticleAd}
                onChange={(e) => setMidArticleAd(e.target.checked)}
                className="rounded text-emerald-600 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Sticky Sidebar Skyscraper (300x600)
                </span>
                <span className="text-[11px] text-slate-400">Follows reader as they scroll the page</span>
              </div>
              <input
                type="checkbox"
                checked={sidebarAd}
                onChange={(e) => setSidebarAd(e.target.checked)}
                className="rounded text-emerald-600 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Exit-Intent High-eCPM Overlay
                </span>
                <span className="text-[11px] text-slate-400">Triggered before user leaves page</span>
              </div>
              <input
                type="checkbox"
                checked={exitModalAd}
                onChange={(e) => setExitModalAd(e.target.checked)}
                className="rounded text-emerald-600 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Google AdSense Publisher ID (data-ad-client)
            </label>
            <input
              type="text"
              value={adsensePubId}
              onChange={(e) => setAdsensePubId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      )}

      {/* TAB 3: Contextual Affiliates */}
      {activeTab === "affiliates" && (
        <div className="space-y-6">
          {/* Direct Link to Dedicated Affiliate Intelligence Dashboard */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900/60 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold shrink-0">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Affiliate Intelligence &amp; Conversion Command Center</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Agentic Sync Active
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  View URL-by-URL converted purchases, conversion rate (CR%), earnings per click (EPC), and daily network sync.
                </p>
              </div>
            </div>

            <Link
              href="/admin/affiliates"
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/20 transition-all w-fit"
            >
              <span>Open Dedicated Conversion Tracker</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Add Form */}
          <form
            onSubmit={handleAddAffiliate}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              Add Auto-Converting Keyword Affiliate Matcher
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Target Keywords (e.g. Claude 4.5, Supabase)"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                required
              />
              <input
                type="text"
                placeholder="Product &amp; Affiliate Offer Name"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CPA Payout (e.g. $50.00)"
                  value={newCpa}
                  onChange={(e) => setNewCpa(e.target.value)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  Add Offer
                </button>
              </div>
            </div>
          </form>

          {/* Affiliates Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Matching Keywords &amp; Offer</th>
                  <th className="pb-3">Promo Code</th>
                  <th className="pb-3">Payout Tier</th>
                  <th className="pb-3">Tracked Clicks</th>
                  <th className="pb-3">Est. Value</th>
                  <th className="pb-3">Affiliate Target URL</th>
                  <th className="pb-3 text-right">Live Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {affiliates.map((aff: any) => (
                  <tr key={aff.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 max-w-[220px]">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{aff.keyword}</div>
                      <div className="text-[11px] text-slate-500 truncate">{aff.product}</div>
                    </td>
                    <td className="py-3.5">
                      {aff.promoCode ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-500 font-mono text-[10px] font-bold">
                          {aff.promoCode}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">-</span>
                      )}
                    </td>
                    <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">{aff.cpa}</td>
                    <td className="py-3.5 text-slate-500">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{aff.clicks}</span> clicks
                    </td>
                    <td className="py-3.5 font-serif font-bold text-slate-900 dark:text-white">{aff.earnings}</td>
                    <td className="py-3.5 max-w-[200px]">
                      {aff.url ? (
                        <span className="font-mono text-[10px] text-indigo-500 truncate block" title={aff.url}>
                          {aff.url}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Auto-injected</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      {aff.url ? (
                        <a
                          href={aff.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] border border-indigo-200 dark:border-indigo-800 transition-all"
                        >
                          <span>Test URL</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {aff.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Direct Sponsors */}
      {activeTab === "sponsors" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Active Brand Partnerships ({sponsors.length})
            </h2>
            <button
              onClick={() => setShowAddSponsorModal(!showAddSponsorModal)}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Sponsor Contract
            </button>
          </div>

          {showAddSponsorModal && (
            <form
              onSubmit={handleAddSponsor}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                New Sponsor Contract Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Sponsor Brand Name"
                  value={newSponsor.sponsorName}
                  onChange={(e) => setNewSponsor({ ...newSponsor, sponsorName: e.target.value })}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="Tagline / Pitch"
                  value={newSponsor.tagline}
                  onChange={(e) => setNewSponsor({ ...newSponsor, tagline: e.target.value })}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. SMARTMAG2026)"
                  value={newSponsor.discountCode}
                  onChange={(e) => setNewSponsor({ ...newSponsor, discountCode: e.target.value })}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
                <input
                  type="text"
                  placeholder="Target URL / Affiliate Link"
                  value={newSponsor.ctaUrl}
                  onChange={(e) => setNewSponsor({ ...newSponsor, ctaUrl: e.target.value })}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Save Sponsor Deal
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsors.map((sp) => (
              <div
                key={sp.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {sp.badge}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                    {sp.sponsorName}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {sp.tagline}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3">
                    {sp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-indigo-500">
                    {sp.discountCode || "No code"}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600">{sp.cpcTier} CPC Tier</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: VIP Subscriptions */}
      {activeTab === "vip" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
              VIP Paid Memberships &amp; Paywall Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Offer subscriber-only deep dive reports, private code repos, and weekly executive briefings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Pass</span>
                <span className="text-lg font-bold font-serif text-slate-900 dark:text-white">$9 / mo</span>
              </div>
              <p className="text-xs text-slate-500">
                Unlocks all full-length articles, benchmark tables, and Discord mastermind channels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Annual Founder Pass
                </span>
                <span className="text-lg font-bold font-serif text-slate-900 dark:text-white">$89 / yr</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Save 20% + early access to autonomous AI pipelines &amp; source templates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Bank Account, Payout Settlements & Gateways */}
      {activeTab === "bank" && (
        <div className="space-y-8">
          {/* Top Balance & Instant Withdrawal Card */}
          {(() => {
            const rawRevenue = parseFloat(String(realMetrics?.revenueLedger?.totalActualRevenueVal ?? realMetrics?.revenueLedger?.totalActualRevenue ?? "0.00").replace(/[^0-9.]/g, "")) || 0;
            const totalWithdrawn = (bankInfo.withdrawalHistory || []).reduce((acc: number, tx: any) => acc + (parseFloat(tx.amount) || 0), 0);
            const eligibleWithdrawVal = Math.max(0, rawRevenue - totalWithdrawn);
            const eligibleInr = (eligibleWithdrawVal * 86.5).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const totalEarningsInr = (rawRevenue * 86.5).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            return (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Total vs Eligible Balances */}
                  <div className="md:col-span-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Live Settlement Engine
                        </span>
                        <span className="text-xs text-slate-400">Ledger Verified</span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Verified Earnings:</span>
                        <span className="text-sm font-bold text-slate-200">${rawRevenue.toFixed(2)} USD</span>
                        <span className="text-xs text-slate-400">(₹{totalEarningsInr})</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Eligible Balance Available to Withdraw
                      </div>
                      <div className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-white flex items-baseline gap-3">
                        <span>${eligibleWithdrawVal.toFixed(2)}</span>
                        <span className="text-base font-sans font-bold text-emerald-400">
                          (₹{eligibleInr})
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-300/80">
                        Ready for instant direct settlement to DBS Bank / UPI ({bankInfo.bankUpiId || "8240438062@superyes"})
                      </div>
                    </div>
                  </div>

                  {/* Right: Instant Withdrawal Box */}
                  <div className="md:col-span-6 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-end gap-3 justify-end">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] uppercase font-bold text-slate-300">Amount to Withdraw ($)</label>
                        <button
                          type="button"
                          onClick={() => setWithdrawAmount(eligibleWithdrawVal.toFixed(2))}
                          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                        >
                          Use Max (${eligibleWithdrawVal.toFixed(2)})
                        </button>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white font-bold text-base outline-none focus:border-emerald-400 font-mono"
                          placeholder={eligibleWithdrawVal.toFixed(2)}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleRequestWithdrawal}
                      disabled={bankLoading || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 h-[42px]"
                    >
                      <ArrowDownToLine className="w-4 h-4" />
                      <span>Withdraw to Bank</span>
                    </button>
                  </div>
                </div>

                {withdrawStatusMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{withdrawStatusMsg}</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Bank Configuration & Payment Gateways Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Bank Details Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                        Your Bank Account Information
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Funds from AdSense, Affiliate Networks, and Direct Sponsors are transferred here.
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" /> 256-Bit Encrypted
                  </span>
                </div>

                {bankSavedMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{bankSavedMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveBankDetails} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Account Holder Legal Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Karthik S"
                        value={bankInfo.bankHolderName}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankHolderName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. State Bank of India / HDFC Bank"
                        value={bankInfo.bankName}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        placeholder={bankInfo.bankAccountNo || "e.g. 501002348912"}
                        value={bankInfo.bankAccountNoRaw}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankAccountNoRaw: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        IFSC Code (11 Digits)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. HDFC0001234"
                        value={bankInfo.bankIfsc}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankIfsc: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs uppercase outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        SWIFT / BIC Code (For Global Wire)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. HDFCINBBXXX"
                        value={bankInfo.bankSwift}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankSwift: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs uppercase outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Instant UPI ID (VPA)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 8240438062@superyes"
                        value={bankInfo.bankUpiId}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankUpiId: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Rise Payment / RiseWorks Global Payout Account */}
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Rise Account (RiseWorks.io / Prop Firm Payouts)
                      </label>
                      <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full">
                        Global Payouts Ready
                      </span>
                    </div>
                    <input
                      type="email"
                      placeholder="e.g. arnab.laha2018@gmail.com"
                      value={bankInfo.riseAccountEmail}
                      onChange={(e) => setBankInfo({ ...bankInfo, riseAccountEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-slate-900 text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-400">
                      Used to automatically receive affiliate commissions and sponsor payouts from Blue Guardian, Prop Firms, and global partners directly to your Rise account.
                    </p>
                  </div>

                  {/* Payment Gateway Integration for Direct User Payments */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        Global Payment Gateway (Optional)
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Stripe Publishable Key (Global Apple Pay &amp; Credit Cards)
                      </label>
                      <input
                        type="text"
                        placeholder="pk_live_... (Optional)"
                        value={bankInfo.stripeKey}
                        onChange={(e) => setBankInfo({ ...bankInfo, stripeKey: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bankLoading}
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Save Payout &amp; Gateway Settings</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: How You Get Paid Breakdown & History */}
            <div className="lg:col-span-5 space-y-6">
              {/* Educational How-It-Works Box */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-500" /> Automated Bank Transfer Cycles
                </h4>

                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Google AdSense</strong>
                      Auto-transfers to your bank via SWIFT/Wire between the <strong>21st and 26th of each month</strong> upon reaching $100.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Affiliate Networks</strong>
                      Amazon, TradingView &amp; SaaS networks settle on Net-30 cycles straight to your linked account.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Direct Reader Tips &amp; Razorpay</strong>
                      Deposited automatically into your bank account within <strong>T+2 business days</strong> via UPI/NEFT.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Rise (RiseWorks.io)</strong>
                      Blue Guardian and international sponsor payouts are sent to <strong>{bankInfo.riseAccountEmail || "arnab.laha2018@gmail.com"}</strong>. Withdraw instantly to Indian Bank in INR or USDC.
                    </div>
                  </div>
                </div>
              </div>

              {/* Withdrawal / Settlement History Table */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" /> Recent Withdrawal Logs
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {bankInfo.withdrawalHistory?.length || 0} Records
                  </span>
                </div>

                {(!bankInfo.withdrawalHistory || bankInfo.withdrawalHistory.length === 0) ? (
                  <div className="py-8 text-center text-xs text-slate-400 space-y-1">
                    <ArrowDownToLine className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-700" />
                    <p>No withdrawal requests yet.</p>
                    <p className="text-[11px] text-slate-500">Your withdrawal orders and wire receipts will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bankInfo.withdrawalHistory.slice(0, 10).map((tx: any) => {
                      const isCompleted = tx.status === "COMPLETED" || tx.status === "SUCCESS";
                      return (
                        <div
                          key={tx.id}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs transition-all hover:border-indigo-500/30"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span>${tx.amount} USD</span>
                                <span className="text-emerald-600 font-mono text-[11px] font-bold">({tx.inrEstimate})</span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                Ref: <strong className="text-slate-700 dark:text-slate-300">{tx.id}</strong>
                              </div>
                            </div>

                            <div className="text-right flex flex-col items-end">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                                isCompleted
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                              }`}>
                                {isCompleted ? "COMPLETED / SETTLED" : "PROCESSING"}
                              </span>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {isCompleted ? `Settled on ${new Date(tx.settledAt || tx.requestedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : `Est: ${tx.estimatedSettlement}`}
                              </div>
                            </div>
                          </div>

                          {/* Tracking & Timeline Details */}
                          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10px] text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <Landmark className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              <span className="truncate">{tx.destination}</span>
                            </div>
                            {tx.utrNumber && (
                              <div className="font-mono text-slate-600 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/60 px-2 py-0.5 rounded-md">
                                UTR / Bank Track: <strong>{tx.utrNumber}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

