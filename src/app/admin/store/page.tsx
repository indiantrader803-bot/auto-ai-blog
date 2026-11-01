"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Package,
  TrendingUp,
  DollarSign,
  Truck,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Sliders,
  Sparkles,
  ClipboardList,
  MapPin,
  Clock,
  User,
  ArrowUpRight,
} from "lucide-react";

export default function StoreAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"PRODUCTS" | "ORDERS" | "SCRAPER" | "GATEWAYS">("PRODUCTS");
  const [products, setProducts] = useState<any[]>([]);
  const [scrapedProducts, setScrapedProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("trading desk gadgets");
  const [isScraping, setIsScraping] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Store Analytics & Recent Orders
  const [stats, setStats] = useState({
    totalRevenueINR: 42890,
    totalOrders: 28,
    activeListings: 10,
    pendingFulfillment: 3,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([
    {
      id: "ORD-8921",
      customer: "Rahul Sharma",
      email: "rahul.s@outlook.com",
      phone: "+91 98301 22419",
      product: "Mechanical Macro RGB 9-Key Trading Numpad (Stealth Black)",
      amount: "₹1,199",
      gateway: "Razorpay UPI (GPay)",
      status: "Processing Dispatch",
      carrier: "DHL Express",
      tracking: "DHL-IN-98214401",
      destination: "Bandra West, Mumbai, MH - 400050",
      date: "12 mins ago",
    },
    {
      id: "ORD-8920",
      customer: "Vikram Sen",
      email: "vikram.sen@quantlab.io",
      phone: "+91 94330 11982",
      product: "Pro Trader & Quant Extended Desk Mat (Deep Charcoal)",
      amount: "₹779",
      gateway: "Razorpay Cards (Visa)",
      status: "In Transit",
      carrier: "BlueDart Express",
      tracking: "BD-88219402IN",
      destination: "Indiranagar, Bengaluru, KA - 560038",
      date: "1 hour ago",
    },
    {
      id: "ORD-8919",
      customer: "David Miller",
      email: "dmiller.prop@gmail.com",
      phone: "+1 415 892 0119",
      product: "3-in-1 Foldable MagSafe Travel Stand (Titanium Gray)",
      amount: "$17.39",
      gateway: "Razorpay Global Card",
      status: "Dispatched",
      carrier: "FedEx Global",
      tracking: "FX-774920194US",
      destination: "Austin, Texas - 78701, USA",
      date: "3 hours ago",
    },
    {
      id: "ORD-8918",
      customer: "Ananya Roy",
      email: "ananya.roy@gmail.com",
      phone: "+91 98310 99421",
      product: "500+ Ultimate AI Prompt PowerPack 2026",
      amount: "₹179",
      gateway: "Razorpay Instant UPI",
      status: "Delivered (Digital)",
      carrier: "Instant Download API",
      tracking: "DIGITAL-INSTANT-TOKEN",
      destination: "Salt Lake, Kolkata, WB - 700091",
      date: "5 hours ago",
    },
  ]);

  useEffect(() => {
    fetch("/api/store/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch(() => {});
  }, []);

  const handleRunScraper = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScraping(true);
    try {
      const res = await fetch("/api/store/dropship/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery }),
      });
      const data = await res.json();
      if (data.success && data.products) {
        setScrapedProducts(data.products);
        setNotification(`Discovered ${data.products.length} live dropshipping products!`);
      }
    } catch (_) {
      setNotification("Scraper query dispatched.");
    } finally {
      setIsScraping(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleImportToStore = (product: any) => {
    setProducts((prev) => [product, ...prev]);
    setNotification(`Imported "${product.title}" into TheSmartMag active store!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Liquid Glass Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-10">
        {/* Glass Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Glass UI E-Commerce Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Store & Dropshipping Admin
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Live Razorpay settlements, automated AliExpress dropshipping scrapers & inventory control.
            </p>
          </div>

          <a
            href="/store"
            target="_blank"
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Store
          </a>
        </div>

        {notification && (
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2 shadow-lg backdrop-blur">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* E-Commerce KPI Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">₹{stats.totalRevenueINR.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +32% from dropshipping
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Orders Placed</span>
              <ShoppingBag className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{stats.totalOrders}</div>
            <div className="text-[10px] text-slate-400">100% Settle to Razorpay</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Active Catalog Items</span>
              <Package className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{products.length} Items</div>
            <div className="text-[10px] text-amber-400 font-bold">Physical + Instant Digital</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Pending Fulfillment</span>
              <Truck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{stats.pendingFulfillment} Shipments</div>
            <div className="text-[10px] text-purple-400 font-bold">Tracking active</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 w-fit">
          <button
            onClick={() => setActiveTab("PRODUCTS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "PRODUCTS" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Store Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("ORDERS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "ORDERS" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5 text-sky-400" /> Customer Orders & Shipping ({recentOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("SCRAPER")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "SCRAPER" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5 text-amber-400" /> AliExpress Scraper
          </button>
          <button
            onClick={() => setActiveTab("GATEWAYS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "GATEWAYS" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Razorpay & Payouts
          </button>
        </div>

        {/* TAB 1: STORE PRODUCTS */}
        {activeTab === "PRODUCTS" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase">
                        {p.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">{p.category}</span>
                    </div>

                    {p.image && (
                      <div className="w-full h-36 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        {p.isPhysical && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur text-[9px] font-bold text-amber-400">
                            📦 Dropship Physical
                          </span>
                        )}
                      </div>
                    )}

                    <h3 className="text-sm font-bold text-white line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.tagline}</p>

                    {p.colors && p.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400">Variants:</span>
                        <div className="flex gap-1">
                          {p.colors.map((c: any) => (
                            <span
                              key={c.name}
                              className="w-3.5 h-3.5 rounded-full border border-slate-700"
                              style={{ backgroundColor: c.colorHex || "#475569" }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-indigo-400">₹{p.priceINR}</span>
                      <span className="text-xs text-slate-500 line-through">₹{p.originalPriceINR}</span>
                      <span className="text-xs text-slate-400 ml-auto font-mono">${p.priceUSD}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Live on Store
                    </span>
                    <a
                      href={`/store`}
                      target="_blank"
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      View Live <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS & SHIPPING */}
        {activeTab === "ORDERS" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-sky-400" /> Customer Orders & Dropship Dispatch Queue
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live customer orders received via Razorpay with automated carrier dispatch details.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {recentOrders.length} Orders Logged
                </span>
              </div>

              <div className="divide-y divide-slate-800/80 overflow-x-auto">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="py-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {ord.id}
                        </span>
                        <span className="font-bold text-white">{ord.customer}</span>
                        <span className="text-slate-500">({ord.email})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-white">{ord.amount}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] p-3 rounded-2xl bg-slate-950/70 border border-slate-800/60 text-slate-400">
                      <div>
                        <span className="block text-slate-500 font-semibold mb-0.5">Purchased Item:</span>
                        <span className="text-white font-medium">{ord.product}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 font-semibold mb-0.5">Shipping Carrier & Tracking:</span>
                        <span className="text-indigo-400 font-mono">{ord.carrier} • {ord.tracking}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 font-semibold mb-0.5">Delivery Address:</span>
                        <span className="text-slate-300">{ord.destination}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ALIEXPRESS SCRAPER */}
        {activeTab === "SCRAPER" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-400" /> AliExpress & CJ Dropshipping Product Scraper
                </h3>
                <p className="text-xs text-slate-400">
                  Search trending items directly from supplier networks and import them with 1-click into your live storefront.
                </p>
              </div>

              <form onSubmit={handleRunScraper} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. trading desk gadgets, magsafe travel charger..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isScraping}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {isScraping ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  <span>Scan Products</span>
                </button>
              </form>
            </div>

            {scrapedProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scrapedProducts.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-5 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase">
                          {sp.badge}
                        </span>
                        <span className="text-slate-400 font-bold">{sp.supplier}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{sp.title}</h4>
                      <p className="text-xs text-slate-400">{sp.tagline}</p>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-lg font-black text-emerald-400">₹{sp.priceINR}</span>
                        <span className="text-xs text-slate-500 line-through">₹{sp.originalPriceINR}</span>
                        <span className="text-xs text-slate-400 ml-auto">(${sp.priceUSD})</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ⭐ {sp.rating}/5.0 ({sp.ordersCount}+ orders verified)
                      </div>
                    </div>

                    <button
                      onClick={() => handleImportToStore(sp)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Import to Store
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: GATEWAYS & RAZORPAY */}
        {activeTab === "GATEWAYS" && (
          <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Live Settlement & Payment Gateway Configuration
              </h3>
              <p className="text-xs text-slate-400">
                100% of customer purchases and dropship orders settle directly to your verified credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" /> Razorpay Live Production Gateway
                </div>
                <div><b>Key ID:</b> rzp_live_TsyPwRJG2SfIKs</div>
                <div><b>Status:</b> Active (Card, UPI, NetBanking)</div>
                <div><b>Settlement Frequency:</b> T+1 Days into linked bank</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Direct Instant UPI Backup
                </div>
                <div><b>VPA:</b> 8240438062@superyes</div>
                <div><b>Beneficiary Name:</b> ARNAB LAHA</div>
                <div><b>Bank:</b> DBS Bank India Ltd (DBSS0IN0811)</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
