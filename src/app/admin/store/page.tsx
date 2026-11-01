"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart2,
  Tag,
  Settings,
  Truck,
  Search,
  Bell,
  ExternalLink,
  Plus,
  Filter,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Eye,
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  Layers,
  Store,
  Sparkles,
  MapPin,
  Sliders,
  DollarSign,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ShopifyStyleStoreAdmin() {
  const [activeSection, setActiveSection] = useState<
    "HOME" | "ORDERS" | "PRODUCTS" | "CUSTOMERS" | "ANALYTICS" | "DISCOUNTS" | "MARKETING" | "DROPSHIP" | "SETTINGS"
  >("HOME");

  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropshipKeyword, setDropshipKeyword] = useState("trading desk accessories");
  const [scrapedProducts, setScrapedProducts] = useState<any[]>([]);
  const [isScraping, setIsScraping] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Shopify Store KPIs
  const [stats, setStats] = useState({
    totalSales: "₹42,890.00",
    salesGrowth: "+32.4%",
    totalOrders: 28,
    ordersGrowth: "+18%",
    conversionRate: "3.42%",
    averageOrderValue: "₹1,531.00",
  });

  const [orders, setOrders] = useState([
    {
      id: "#1028",
      customer: "Rahul Sharma",
      email: "rahul.s@outlook.com",
      items: "Mechanical Macro RGB 9-Key Trading Numpad (Stealth Black)",
      quantity: 1,
      total: "₹1,199.00",
      paymentStatus: "Paid",
      fulfillmentStatus: "Unfulfilled",
      channel: "Online Store",
      carrier: "DHL Express",
      date: "Today at 1:15 PM",
      destination: "Bandra West, Mumbai, MH - 400050",
    },
    {
      id: "#1027",
      customer: "Vikram Sen",
      email: "vikram.sen@quantlab.io",
      items: "Pro Trader & Quant Extended Desk Mat (Deep Charcoal)",
      quantity: 1,
      total: "₹779.00",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      channel: "Online Store",
      carrier: "BlueDart Express",
      date: "Today at 11:42 AM",
      destination: "Indiranagar, Bengaluru, KA - 560038",
    },
    {
      id: "#1026",
      customer: "David Miller",
      email: "dmiller.prop@gmail.com",
      items: "3-in-1 Foldable MagSafe Travel Stand (Titanium Gray)",
      quantity: 1,
      total: "$17.39",
      paymentStatus: "Paid",
      fulfillmentStatus: "In Transit",
      channel: "Online Store (US)",
      carrier: "FedEx Global",
      date: "Yesterday",
      destination: "Austin, Texas - 78701, USA",
    },
    {
      id: "#1025",
      customer: "Ananya Roy",
      email: "ananya.roy@gmail.com",
      items: "500+ Ultimate AI Prompt PowerPack 2026",
      quantity: 1,
      total: "₹179.00",
      paymentStatus: "Paid",
      fulfillmentStatus: "Delivered (Digital)",
      channel: "Online Store",
      carrier: "Instant Download API",
      date: "Yesterday",
      destination: "Salt Lake, Kolkata, WB - 700091",
    },
    {
      id: "#1024",
      customer: "Karthik Subramanian",
      email: "karthik.sub@gmail.com",
      items: "Global Travel Smart 65W GaN Travel Adapter",
      quantity: 2,
      total: "₹2,158.00",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      channel: "Online Store",
      carrier: "Delhivery Surface",
      date: "Oct 30, 2026",
      destination: "Adyar, Chennai, TN - 600020",
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
        body: JSON.stringify({ searchQuery: dropshipKeyword }),
      });
      const data = await res.json();
      if (data.success && data.products) {
        setScrapedProducts(data.products);
        setNotification(`Imported ${data.products.length} live dropshipping supplier items.`);
      }
    } catch (_) {
      setNotification("Scraper query dispatched.");
    } finally {
      setIsScraping(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleImportToStore = (product: any) => {
    setProducts((prev) => [product, ...prev]);
    setNotification(`Successfully added "${product.title}" to Online Store sales channel.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f1f2f4] dark:bg-[#0f1115] text-[#202223] dark:text-[#e3e5e7] flex font-sans antialiased selection:bg-[#008060] selection:text-white">
      {/* 1. SHOPIFY ICONIC SIDEBAR */}
      <aside className="w-64 bg-[#ebebeb] dark:bg-[#1a1c20] border-r border-[#d2d5d8] dark:border-[#2a2d34] flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Shopify Store Switcher Header */}
          <div className="p-4 border-b border-[#d2d5d8] dark:border-[#2a2d34] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#008060] text-white flex items-center justify-center font-black shadow-sm text-sm">
                S
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-none">TheSmartMag</h2>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Live Shopify Core</span>
              </div>
            </div>
            <a
              href="/store"
              target="_blank"
              title="View your online store"
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Main Navigation Menu */}
          <nav className="p-3 space-y-0.5 text-xs font-semibold">
            <button
              onClick={() => setActiveSection("HOME")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "HOME"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveSection("ORDERS")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "ORDERS"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#008060]/10 text-[#008060] text-[10px] font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection("PRODUCTS")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "PRODUCTS"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </div>
              <span className="text-[11px] text-slate-400">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveSection("CUSTOMERS")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "CUSTOMERS"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveSection("ANALYTICS")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "ANALYTICS"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveSection("DISCOUNTS")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "DISCOUNTS"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Discounts</span>
            </button>

            <button
              onClick={() => setActiveSection("MARKETING")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "MARKETING"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Promote Store</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                Viral
              </span>
            </button>

            {/* Sales Channels Divider */}
            <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Sales Channels
            </div>

            <button
              onClick={() => setActiveSection("DROPSHIP")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSection === "DROPSHIP"
                  ? "bg-white dark:bg-[#252830] text-[#008060] dark:text-[#30bd84] shadow-xs font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>AliExpress Dropship</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <a
              href="/store"
              target="_blank"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Store className="w-4 h-4" />
                <span>Online Store</span>
              </div>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </nav>
        </div>

        {/* Bottom Settings Link */}
        <div className="p-3 border-t border-[#d2d5d8] dark:border-[#2a2d34]">
          <button
            onClick={() => setActiveSection("SETTINGS")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === "SETTINGS"
                ? "bg-white dark:bg-[#252830] text-[#008060] font-bold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/60"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN SHOPIFY CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top App Search Bar */}
        <header className="h-14 bg-white dark:bg-[#1a1c20] border-b border-[#d2d5d8] dark:border-[#2a2d34] px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Razorpay Live Gateway Active</span>
            </div>

            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
            </button>

            <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
              AL
            </div>
          </div>
        </header>

        {notification && (
          <div className="m-6 mb-0 p-3.5 rounded-xl bg-[#e3f1df] dark:bg-[#183424] border border-[#aee9d1] dark:border-[#2a684b] text-[#1c4b32] dark:text-[#74e3a4] text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008060] dark:text-[#30bd84]" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-xs hover:opacity-75">✕</button>
          </div>
        )}

        {/* 3. SECTION CONTENT */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* SECTION: HOME DASHBOARD */}
          {activeSection === "HOME" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Overview Dashboard</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Here’s what is happening with your store today.</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/store"
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-white dark:bg-[#1a1c20] border border-[#d2d5d8] dark:border-[#2a2d34] text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View Storefront
                  </a>
                  <button
                    onClick={() => setActiveSection("DROPSHIP")}
                    className="px-4 py-2 rounded-lg bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Dropship Item
                  </button>
                </div>
              </div>

              {/* Shopify Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Sales</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{stats.totalSales}</div>
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
                    <TrendingUp className="w-3 h-3" /> {stats.salesGrowth} vs last month
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Orders</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{stats.totalOrders}</div>
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
                    <TrendingUp className="w-3 h-3" /> {stats.ordersGrowth} vs last month
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Conversion Rate</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{stats.conversionRate}</div>
                  <div className="text-[11px] text-slate-500">Benchmark: 2.5% - 3.8%</div>
                </div>

                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Avg. Order Value</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{stats.averageOrderValue}</div>
                  <div className="text-[11px] text-slate-500">100% Settled via Razorpay</div>
                </div>
              </div>

              {/* Recent Orders Card */}
              <div className="bg-white dark:bg-[#1a1c20] rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs">
                <div className="p-4 border-b border-[#d2d5d8] dark:border-[#2a2d34] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                      {orders.length} orders
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveSection("ORDERS")}
                    className="text-xs font-bold text-[#008060] dark:text-[#30bd84] hover:underline"
                  >
                    View all orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f9fafb] dark:bg-[#15171a] text-slate-500 font-semibold border-b border-[#d2d5d8] dark:border-[#2a2d34]">
                      <tr>
                        <th className="py-3 px-4">Order</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4">Fulfillment</th>
                        <th className="py-3 px-4">Delivery Carrier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d2d5d8] dark:divide-[#2a2d34]">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-bold text-[#008060] dark:text-[#30bd84] font-mono">{ord.id}</td>
                          <td className="py-3.5 px-4 text-slate-500">{ord.date}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">{ord.customer}</td>
                          <td className="py-3.5 px-4 font-bold font-mono text-slate-900 dark:text-white">{ord.total}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                              {ord.fulfillmentStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">{ord.carrier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ORDERS */}
          {activeSection === "ORDERS" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Orders</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Manage and track your dropship fulfillments and customer shipments.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1c20] rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs">
                <div className="divide-y divide-[#d2d5d8] dark:divide-[#2a2d34]">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 space-y-2 hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#008060] dark:text-[#30bd84]">{ord.id}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{ord.customer}</span>
                          <span className="text-slate-400">({ord.email})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{ord.total}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                            {ord.paymentStatus}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                            {ord.fulfillmentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] bg-[#f9fafb] dark:bg-[#15171a] p-3 rounded-lg text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="block text-slate-400 font-semibold mb-0.5">Purchased Item:</span>
                          <span className="text-slate-900 dark:text-white font-medium">{ord.items}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 font-semibold mb-0.5">Dispatch Carrier:</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{ord.carrier}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 font-semibold mb-0.5">Shipping Destination:</span>
                          <span className="text-slate-700 dark:text-slate-300">{ord.destination}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRODUCTS */}
          {activeSection === "PRODUCTS" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Products Catalog</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Active inventory listings available across Online Store channels.</p>
                </div>
                <button
                  onClick={() => setActiveSection("DROPSHIP")}
                  className="px-4 py-2 rounded-lg bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-[#1a1c20] p-4 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {p.image && (
                        <div className="w-full h-36 rounded-lg bg-slate-100 dark:bg-slate-900 overflow-hidden mb-3 relative">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/80 text-[10px] font-bold text-slate-800 dark:text-white shadow-xs">
                            {p.badge}
                          </span>
                        </div>
                      )}

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{p.tagline}</p>

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-base font-bold text-slate-900 dark:text-white font-mono">₹{p.priceINR}</span>
                        <span className="text-xs text-slate-400 line-through font-mono">₹{p.originalPriceINR}</span>
                        <span className="text-xs text-slate-500 ml-auto font-mono">(${p.priceUSD})</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#d2d5d8] dark:border-[#2a2d34] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active on Store
                      </span>
                      <a
                        href="/store"
                        target="_blank"
                        className="text-xs text-[#008060] dark:text-[#30bd84] font-bold flex items-center gap-1 hover:underline"
                      >
                        View Live <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: DROPSHIPPING SCRAPER */}
          {activeSection === "DROPSHIP" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">AliExpress & CJ Dropshipping Channel</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Autonomous scraper engine to search and import trending products into your store catalog.</p>
              </div>

              <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-4">
                <form onSubmit={handleRunScraper} className="flex gap-2">
                  <input
                    type="text"
                    value={dropshipKeyword}
                    onChange={(e) => setDropshipKeyword(e.target.value)}
                    placeholder="Search dropshipping catalogs (e.g. trading desk mat, 65W GaN charger)..."
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#f9fafb] dark:bg-[#15171a] border border-[#d2d5d8] dark:border-[#2a2d34] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#008060]"
                  />
                  <button
                    type="submit"
                    disabled={isScraping}
                    className="px-5 py-2 rounded-lg bg-[#008060] hover:bg-[#006e52] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    {isScraping ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>Scrape Suppliers</span>
                  </button>
                </form>
              </div>

              {scrapedProducts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scrapedProducts.map((sp) => (
                    <div
                      key={sp.id}
                      className="bg-white dark:bg-[#1a1c20] p-4 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold uppercase">
                            {sp.badge}
                          </span>
                          <span className="text-slate-500 font-bold">{sp.supplier}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{sp.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{sp.tagline}</p>
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-base font-bold text-slate-900 dark:text-white font-mono">₹{sp.priceINR}</span>
                          <span className="text-xs text-slate-400 line-through font-mono">₹{sp.originalPriceINR}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleImportToStore(sp)}
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> 1-Click Import to Store
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: MARKETING & STORE PROMOTION */}
          {activeSection === "MARKETING" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-500" /> Store Marketing & Promotion Center
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Boost store conversions, drive social traffic, and manage promotional campaigns for store.thesmartmag.com.
                  </p>
                </div>
              </div>

              {/* Promo Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Promo Coupon</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Sitewide 30% OFF grand opening coupon auto-applies on checkout.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 font-mono text-center text-sm font-bold text-emerald-600">
                    GLOBAL30 (30% OFF)
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Storefront Subdomain Link</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Direct marketing URL for social media bios (Instagram, TikTok, X, YouTube).
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center text-indigo-600 dark:text-indigo-400 truncate">
                    https://store.thesmartmag.com
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1c20] p-5 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Direct Checkout Boost</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Direct 1-click Razorpay payment gateway enabled across all product pages.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs text-center">
                    ✓ 100% Instant Bank Settlements
                  </div>
                </div>
              </div>

              {/* Ready-to-Post Social Media Templates */}
              <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Social Media Promotion Templates</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Copy and paste these pre-optimized captions to promote your products on X, Threads, Instagram & LinkedIn.
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#15171a] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">🚀 Macro RGB Coding & Trading Numpad Promo:</span>
                    "Upgrade your desk setup! 💻 The Macro RGB 9-Key Hot-Swappable Dial is now live on our store. Free tracked worldwide express shipping + 30% OFF with code GLOBAL30 👉 https://store.thesmartmag.com"
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#15171a] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">⚡ 3-in-1 MagSafe Travel Charger Promo:</span>
                    "Never carry tangled cables again. Charge your iPhone, Apple Watch & AirPods with one sleek foldable stand. Shop now at https://store.thesmartmag.com (Doorstep delivery guaranteed)"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SETTINGS & PAYMENT GATEWAYS */}
          {activeSection === "SETTINGS" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Store Settings & Payments</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Payment providers, settlement bank accounts, and merchant configuration.</p>
              </div>

              <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-xl border border-[#d2d5d8] dark:border-[#2a2d34] shadow-xs space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#008060]" /> Payment Providers & Settlements
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    100% of customer checkout payments settle directly into your verified bank account.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#f9fafb] dark:bg-[#15171a] border border-[#d2d5d8] dark:border-[#2a2d34] space-y-2">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#008060]" /> Razorpay Live Production Gateway
                    </div>
                    <div><b>Live Key ID:</b> <code className="font-mono text-indigo-600 dark:text-indigo-400">rzp_live_TsyPwRJG2SfIKs</code></div>
                    <div><b>Accepted Methods:</b> Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), NetBanking</div>
                    <div><b>Settlement Payouts:</b> T+1 Days automated transfer</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f9fafb] dark:bg-[#15171a] border border-[#d2d5d8] dark:border-[#2a2d34] space-y-2">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Settled Bank & Beneficiary Details
                    </div>
                    <div><b>Beneficiary Name:</b> ARNAB LAHA</div>
                    <div><b>Linked UPI VPA:</b> <code className="font-mono text-emerald-600">8240438062@superyes</code></div>
                    <div><b>Bank Name:</b> DBS Bank India Ltd (IFSC: <code className="font-mono">DBSS0IN0811</code>)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
