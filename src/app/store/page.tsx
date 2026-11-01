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
  PackageCheck,
  Check,
  RotateCcw,
  Plus,
  Minus,
  Eye,
  SlidersHorizontal,
  Lock,
  Headphones,
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

  // Selected variant/color & quantity per product (keyed by product ID)
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Quick View Product Modal
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  useEffect(() => {
    setCurrency(detectUserCurrency());

    fetch("/api/store/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
          setAppliedDiscount(data.discountPercentage || 30);

          // Initialize default colors and quantities
          const initColors: { [key: string]: string } = {};
          const initQty: { [key: string]: number } = {};
          data.products.forEach((p: any) => {
            if (p.colors && p.colors.length > 0) {
              initColors[p.id] = p.colors[0].name;
            }
            initQty[p.id] = 1;
          });
          setSelectedColors(initColors);
          setQuantities(initQty);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddToCart = (product: any) => {
    const qty = quantities[product.id] || 1;
    const selectedColor = selectedColors[product.id] || (product.colors?.[0]?.name ?? "Standard");

    addToCart(
      {
        ...product,
        title: `${product.title} (${selectedColor})`,
        image: product.image,
        isPhysical: product.isPhysical,
      },
      qty
    );

    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const calculateFinalPrice = (product: any) => {
    const base = currency === "USD" ? product.priceUSD || 19.99 : product.priceINR || 1499;
    if (appliedDiscount > 0) {
      return currency === "USD"
        ? parseFloat((base * (1 - appliedDiscount / 100)).toFixed(2))
        : Math.round(base * (1 - appliedDiscount / 100));
    }
    return base;
  };

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(10, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const filteredProducts = products
    .filter((p) => {
      if (activeCategory === "DROPSHIP" && !p.isPhysical) return false;
      if (activeCategory === "DIGITAL" && p.isPhysical) return false;
      if (
        activeCategory !== "ALL" &&
        activeCategory !== "DROPSHIP" &&
        activeCategory !== "DIGITAL" &&
        p.category !== activeCategory
      ) {
        return false;
      }

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Navbar />
      <CartDrawer currency={currency} />

      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-950 py-2.5 px-4 text-center text-xs font-semibold text-white dark:text-indigo-200 flex items-center justify-center gap-2 shadow-sm border-b border-indigo-500/20">
        <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Grand Opening: Free Tracked Worldwide Doorstep Express Shipping + 30% OFF using code </span>
        <span className="font-mono font-black text-white bg-white/20 dark:bg-white/10 px-2 py-0.5 rounded border border-white/30">
          GLOBAL30
        </span>
      </div>

      {/* E-Commerce Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-slate-100 to-white dark:from-slate-900/60 dark:via-[#070b14] dark:to-[#070b14] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Official Verified E-Commerce Store
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Verified Dropshipping Hardware & <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Quant Systems</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct-from-manufacturer hardware dropshipped to your doorstep with courier tracking, plus instant quantitative trading toolkits.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Razorpay Verified Merchant
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Free Door-to-Door Delivery
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <RotateCcw className="w-4 h-4 text-purple-600 dark:text-purple-400" /> 30-Day Money-Back Guarantee
                </span>
              </div>
            </div>

            {/* Quick Currency & Cart Summary Card */}
            <div className="w-full lg:w-auto bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xl dark:shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Currency</span>
                <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold">
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      currency === "USD" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency("INR")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      currency === "INR" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    INR (₹)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl flex items-center gap-2 text-xs">
                    <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-slate-900 dark:text-white font-semibold truncate">{user.name || user.email}</span>
                  </div>
                ) : (
                  <div className="flex-1 flex gap-2">
                    <Link
                      href="/store/login"
                      className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-white transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/store/register"
                      className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors shadow-sm"
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
            </div>
          </div>
        </div>
      </section>

      {/* Main E-Commerce Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 flex-1">
        {/* Filter, Search & Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "ALL"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory("Desk Setup")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "Desk Setup"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Desk Setup
            </button>
            <button
              onClick={() => setActiveCategory("Mobile Accessories")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "Mobile Accessories"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Mobile & MagSafe
            </button>
            <button
              onClick={() => setActiveCategory("Wearables & Audio")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "Wearables & Audio"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              AI Wearables
            </button>
            <button
              onClick={() => setActiveCategory("Travel & Lifestyle")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "Travel & Lifestyle"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Travel Chargers
            </button>
            <button
              onClick={() => setActiveCategory("Hardware & Security")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "Hardware & Security"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Cold Storage Security
            </button>
            <button
              onClick={() => setActiveCategory("AI & Quant Toolkits")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeCategory === "AI & Quant Toolkits"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Download className="w-3 h-3 text-emerald-400" /> Quant Toolkits
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products & specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* E-Commerce Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const finalPrice = calculateFinalPrice(prod);
            const originalPrice = currency === "USD" ? prod.originalPriceUSD : prod.originalPriceINR;
            const symbol = currency === "USD" ? "$" : "₹";
            const qty = quantities[prod.id] || 1;
            const currentColor = selectedColors[prod.id] || prod.colors?.[0]?.name;

            return (
              <div
                key={prod.id}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 p-5 transition-all duration-300 shadow-md dark:shadow-xl group hover:-translate-y-1 relative"
              >
                <div>
                  {/* Badge & Shipping Type */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase">
                      {prod.badge || "FEATURED"}
                    </span>
                    {prod.isPhysical ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-500/20">
                        <Truck className="w-2.5 h-2.5" /> Doorstep Delivery
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                        <Download className="w-2.5 h-2.5" /> Instant Delivery
                      </span>
                    )}
                  </div>

                  {/* Product Image with Quick View Trigger */}
                  <div className="w-full h-48 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden mb-4 relative group-hover:border-indigo-500/30 transition-colors">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {prod.rating && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-white/90 dark:bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {prod.rating} ({prod.reviewsCount})
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setQuickViewProduct(prod);
                        setActiveGalleryIndex(0);
                      }}
                      className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-bold text-white backdrop-blur-xs cursor-pointer"
                    >
                      <Eye className="w-4 h-4" /> Quick View
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">{prod.tagline}</p>

                  {/* Color / Variant Swatches */}
                  {prod.colors && prod.colors.length > 0 && (
                    <div className="mb-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">Variant:</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{currentColor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {prod.colors.map((c: any) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColors((prev) => ({ ...prev, [prod.id]: c.name }))}
                            className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                              currentColor === c.name
                                ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/30 scale-110"
                                : "border-slate-300 dark:border-slate-700 hover:border-slate-400"
                            }`}
                            style={{ backgroundColor: c.colorHex || "#334155" }}
                            title={c.name}
                          >
                            {currentColor === c.name && <Check className="w-3 h-3 text-white drop-shadow" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shipping & Delivery Estimates */}
                  {prod.shippingDetails && (
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1 mb-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> Delivery:
                        </span>
                        <span className="text-slate-900 dark:text-white font-medium">{prod.shippingDetails.estimatedDelivery}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Shipping:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{prod.shippingDetails.shippingCost}</span>
                      </div>
                      {prod.shippingDetails.supportedCountries && (
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px]">
                          <span className="text-slate-500">Ships to:</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                            {prod.shippingDetails.supportedCountries.slice(0, 4).join(", ")} +more
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pricing Box */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 mb-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-950 dark:text-white font-mono">
                        {symbol}{finalPrice}
                      </span>
                      {originalPrice && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 line-through ml-2 font-mono">
                          {symbol}{originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      SAVE 30%
                    </span>
                  </div>
                </div>

                {/* E-Commerce Actions: Quantity + Add to Cart + Instant Checkout */}
                <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Quantity:</span>
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950">
                      <button
                        onClick={() => handleQtyChange(prod.id, -1)}
                        className="p-1 px-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900 dark:text-white">{qty}</span>
                      <button
                        onClick={() => handleQtyChange(prod.id, 1)}
                        className="p-1 px-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{addedItem === prod.id ? "Added to Cart! ✓" : `Add to Cart (${qty})`}</span>
                  </button>

                  <Link
                    href="/store/checkout"
                    onClick={() => handleAddToCart(prod)}
                    className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Instant Checkout</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-5 top-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gallery */}
                <div className="space-y-3">
                  <div className="w-full h-64 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <img
                      src={quickViewProduct.galleryImages?.[activeGalleryIndex] || quickViewProduct.image}
                      alt={quickViewProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {quickViewProduct.galleryImages && quickViewProduct.galleryImages.length > 1 && (
                    <div className="flex gap-2">
                      {quickViewProduct.galleryImages.map((img: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => setActiveGalleryIndex(i)}
                          className={`w-14 h-14 rounded-xl border-2 overflow-hidden cursor-pointer ${
                            activeGalleryIndex === i ? "border-indigo-600 dark:border-indigo-500" : "border-slate-200 dark:border-slate-800"
                          }`}
                        >
                          <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs */}
                <div className="space-y-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase">
                      {quickViewProduct.badge}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{quickViewProduct.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{quickViewProduct.tagline}</p>
                  </div>

                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {currency === "USD" ? "$" : "₹"}
                    {calculateFinalPrice(quickViewProduct)}
                  </div>

                  {quickViewProduct.shippingDetails && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                      <div>Carrier: <span className="text-slate-900 dark:text-white font-medium">{quickViewProduct.shippingDetails.carrier}</span></div>
                      <div>Estimated Arrival: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{quickViewProduct.shippingDetails.estimatedDelivery}</span></div>
                      <div>Dispatch: <span className="text-slate-700 dark:text-slate-300">{quickViewProduct.shippingDetails.origin}</span></div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
