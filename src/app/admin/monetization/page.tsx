import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
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
} from "lucide-react";
import { VERIFIED_SPONSORS, SponsorDeal } from "@/lib/pipeline/agents/sponsorAgent";

export default function MonetizationHubPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "ads" | "affiliates" | "sponsors" | "vip">("overview");
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const [headerAd, setHeaderAd] = useState<boolean>(true);
  const [midArticleAd, setMidArticleAd] = useState<boolean>(true);
  const [sidebarAd, setSidebarAd] = useState<boolean>(true);
  const [exitModalAd, setExitModalAd] = useState<boolean>(false);
  const [adsensePubId, setAdsensePubId] = useState<string>("ca-pub-9768860457233655");
  const [realMetrics, setRealMetrics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setRealMetrics(data))
      .catch(() => {});
  }, []);

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

  // Real Contextual Affiliates
  const [affiliates, setAffiliates] = useState([
    {
      id: "aff_1",
      keyword: "Cloud GPU / H100",
      product: "HyperCompute Serverless GPUs",
      cpa: "$50.00 per signup",
      clicks: 0,
      earnings: "$0.00",
      status: "ACTIVE",
    },
    {
      id: "aff_2",
      keyword: "Next.js / Vercel Hosting",
      product: "Vercel Enterprise Tier",
      cpa: "$35.00 per seat",
      clicks: 0,
      earnings: "$0.00",
      status: "ACTIVE",
    },
    {
      id: "aff_3",
      keyword: "Cursor / AI Code Editor",
      product: "Cursor Pro Yearly Pass",
      cpa: "$25.00 per conversion",
      clicks: 0,
      earnings: "$0.00",
      status: "ACTIVE",
    },
    {
      id: "aff_4",
      keyword: "Kubernetes / DevSecOps",
      product: "ArmorGuard Zero-Trust",
      cpa: "$80.00 per demo",
      clicks: 0,
      earnings: "$0.00",
      status: "ACTIVE",
    },
  ]);
      product: "Cursor Pro Yearly Pass",
      cpa: "$25.00 per conversion",
      clicks: 610,
      earnings: "$1,225.00",
      status: "ACTIVE",
    },
    {
      id: "aff_4",
      keyword: "Kubernetes / DevSecOps",
      product: "ArmorGuard Zero-Trust",
      cpa: "$80.00 per demo",
      clicks: 194,
      earnings: "$1,360.00",
      status: "ACTIVE",
    },
  ]);

  const realTotalViews = realMetrics?.summary?.totalViews || 0;
  const realAdsensePubId = adsensePubId;
  const activeSponsorsCount = sponsors.length;

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Monetization &amp; Revenue Generation Hub
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage AdSense inventory, high-CPC affiliate autolinks, direct sponsor contracts, and VIP paid subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> AdSense Status: Active DIRECT
          </span>
        </div>
      </div>

      {/* KPI Cards (Real Telemetry) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Live AdSense Inventory</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {realAdsensePubId ? "Connected" : "Pending"}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> pub-9768860457233655 DIRECT
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Live Real Impressions</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {realTotalViews.toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-slate-400">
            Verified database page views
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Affiliate Rules</span>
            <MousePointerClick className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {affiliates.length}
          </div>
          <div className="text-[11px] font-semibold text-indigo-600">
            Contextually embedded by AI
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Brand Sponsors</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {activeSponsorsCount}
          </div>
          <div className="text-[11px] font-semibold text-purple-600">
            Live high-CPC contextual deals
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: "overview", label: "Revenue Overview", icon: TrendingUp },
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
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
                  <th className="pb-3">Matching Keywords</th>
                  <th className="pb-3">Product / Network</th>
                  <th className="pb-3">Payout Tier</th>
                  <th className="pb-3">Clicks</th>
                  <th className="pb-3">Est. Earnings</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {affiliates.map((aff) => (
                  <tr key={aff.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{aff.keyword}</td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">{aff.product}</td>
                    <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">{aff.cpa}</td>
                    <td className="py-3.5 text-slate-500">{aff.clicks} clicks</td>
                    <td className="py-3.5 font-serif font-bold text-slate-900 dark:text-white">{aff.earnings}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {aff.status}
                      </span>
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
    </div>
  );
}

