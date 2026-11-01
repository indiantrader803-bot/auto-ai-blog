"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import { useCart } from "@/context/CartContext";
import { useVip } from "@/context/VipAuthContext";
import {
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  CreditCard,
  Truck,
  Box,
  Flame,
  Star,
  Search,
  Filter,
  ArrowRight,
  User,
  SlidersHorizontal,
  PackageCheck,
  RefreshCw,
} from "lucide-react";
import { detectUserCurrency } from "@/lib/utils";

export default function StoreHomePage() {
  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const { user } = useVip();

  const [products, setProducts] = useState<any[]>([]);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(30);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  useEffect(() => {
    setCurrency(detectUserCurrency());

    fetch("/api/store/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
          setAppliedDiscount(data.discountPercentage || 30);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddToCart = (product: any) => {
    const isPhysical =
      product.isPhysical ||
      product.badge?.includes("DROPSHIP") ||
      product.badge?.includes("TECH") ||
      product.badge?.includes("TRAVEL") ||
      product.badge?.includes("SECURITY");

    addToCart({
      ...product,
      isPhysical,
    });

    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const calculateFinalPrice = (product: any) => {
    const base = currency === "USD" ? product.priceUSD || 9.99 : product.priceINR || 799;
    if (appliedDiscount > 0) {
      return currency === "USD"
        ? parseFloat((base * (1 - appliedDiscount / 100)).toFixed(2))
        : Math.round(base * (1 - appliedDiscount / 100));
    }
    return base;
  };

  const filteredProducts = products
    .filter((p) => {
      const isPhysical =
        p.isPhysical ||
        p.badge?.includes("DROPSHIP") ||
        p.badge?.includes("TECH") ||
        p.badge?.includes("TRAVEL") ||
        p.badge?.includes("SECURITY");

      if (activeCategory === "DROPSHIP" && !isPhysical) return false;
      if (activeCategory === "DIGITAL" && isPhysical) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = currency === "USD" ? a.priceUSD : a.priceINR;
      const priceB = currency === "USD" ? b.priceUSD : b.priceINR;
      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <CartDrawer currency={currency} />

      {/* Top E-Commerce Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Direct Global Dropshipping & Quant Store
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Curated Tech, Hardware & <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Quant Trading Tools</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Premium dropshipped hardware dispatched worldwide with live tracking, plus production-grade quantitative codebases and trading systems.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Razorpay Verified Merchant
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Truck className="w-4 h-4 text-indigo-400" /> Free Global Doorstep Shipping
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <PackageCheck className="w-4 h-4 text-purple-400" /> Verified Quality Guarantee
                </span>
              </div>
            </div>

            {/* Quick Action Box: Currency & Account / Cart */}
            <div className="w-full lg:w-auto bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-400">Currency</span>
                <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold">
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      currency === "USD" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency("INR")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      currency === "INR" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    INR (₹)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl flex items-center gap-2 text-xs">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span className="text-white font-semibold truncate">{user.name || user.email}</span>
                  </div>
                ) : (
                  <div className="flex-1 flex gap-2">
                    <Link
                      href="/store/login"
                      className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/store/register"
                      className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 text-xs font-bold shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cart ({totalItems})</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-center justify-between">
                <span>🔥 Code GLOBAL30 Active</span>
                <span className="font-bold">30% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main E-Commerce Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 flex-1">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "ALL"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800/70 text-slate-400 hover:text-white"
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory("DROPSHIP")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeCategory === "DROPSHIP"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800/70 text-slate-400 hover:text-white"
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" /> Physical Dropshipping
            </button>
            <button
              onClick={() => setActiveCategory("DIGITAL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeCategory === "DIGITAL"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800/70 text-slate-400 hover:text-white"
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" /> Quant & Digital
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const finalPrice = calculateFinalPrice(prod);
            const originalPrice = currency === "USD" ? prod.originalPriceUSD : prod.originalPriceINR;
            const standardPrice = currency === "USD" ? prod.priceUSD : prod.priceINR;
            const symbol = currency === "USD" ? "$" : "₹";
            const isPhysical =
              prod.isPhysical ||
              prod.badge?.includes("DROPSHIP") ||
              prod.badge?.includes("TECH") ||
              prod.badge?.includes("TRAVEL") ||
              prod.badge?.includes("SECURITY");

            return (
              <div
                key={prod.id}
                className="flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-5 transition-all duration-300 shadow-xl group hover:-translate-y-1 relative"
              >
                <div>
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-wider uppercase">
                      {prod.badge || "PRO"}
                    </span>
                    {isPhysical ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <Truck className="w-2.5 h-2.5" /> Dropshipping
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Download className="w-2.5 h-2.5" /> Instant Delivery
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mb-4 relative group-hover:border-indigo-500/30 transition-colors">
                    <img
                      src={prod.image || "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80"}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {prod.rating && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {prod.rating}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug line-clamp-2 mb-1 group-hover:text-indigo-400 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{prod.tagline}</p>

                  {/* Pricing Box */}
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-black text-white font-mono">
                        {symbol}{finalPrice}
                      </span>
                      {originalPrice && (
                        <span className="text-xs text-slate-500 line-through ml-2 font-mono">
                          {symbol}{originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
                      SAVE 30%
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 text-xs text-slate-300 mb-6">
                    {(prod.features || []).slice(0, 3).map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Cart / Buy Now Action */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{addedItem === prod.id ? "Added to Cart! ✓" : "Add to Cart"}</span>
                  </button>

                  <Link
                    href="/store/checkout"
                    onClick={() => handleAddToCart(prod)}
                    className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Instant Checkout</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Footer Banner for Store Admin */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <h4 className="text-sm font-bold text-white">Store Administration & Dropshipping Control</h4>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Manage inventory, view live Razorpay orders, scrape new AliExpress products, and configure dropship suppliers.
          </p>
          <Link
            href="/admin/store"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            Open Glass Store Admin <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
