"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StoreHeader, { STORE_ACCENT_COLORS } from "@/components/store/StoreHeader";
import CartDrawer from "@/components/store/CartDrawer";
import StoreLivePurchasePopups from "@/components/store/StoreLivePurchasePopups";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useVip } from "@/context/VipAuthContext";
import {
  ShoppingBag,
  Heart,
  Star,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  Sparkles,
  Laptop,
  Smartphone,
  Gamepad2,
  Watch,
  Home,
  Luggage,
  HardDrive,
  ShieldAlert,
  Tag,
  Cpu,
  Clock,
  Compass,
  CheckCircle2,
  Minus,
  Plus,
  Eye,
  ChevronRight,
  ExternalLink,
  Layers,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { detectUserCurrency } from "@/lib/utils";

// Category Pill List from Mockup
const CATEGORIES = [
  { id: "ALL", label: "All Products", icon: Sparkles },
  { id: "AI Tools", label: "AI Tools", icon: Cpu },
  { id: "Laptops", label: "Laptops", icon: Laptop },
  { id: "Mobile & Accessories", label: "Mobile & Accessories", icon: Smartphone },
  { id: "Gaming", label: "Gaming", icon: Gamepad2 },
  { id: "Wearables", label: "Wearables", icon: Watch },
  { id: "Smart Home", label: "Smart Home", icon: Home },
  { id: "Travel Gear", label: "Travel Gear", icon: Luggage },
  { id: "Storage", label: "Storage", icon: HardDrive },
  { id: "Security", label: "Security", icon: ShieldAlert },
  { id: "Deals", label: "Deals", icon: Tag },
];

export default function StoreHomePage() {
  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const { user } = useVip();

  const [products, setProducts] = useState<any[]>([]);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [colorTheme, setColorTheme] = useState<string>("purple");

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [quickViewQty, setQuickViewQty] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string>("Standard");

  // Countdown timer for Flash Deals (from mockup: 12 Hours : 34 Mins : 56 Secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    // Detect currency default
    setCurrency(detectUserCurrency());

    // Restore saved accent color theme
    const savedTheme = localStorage.getItem("store_color_theme");
    if (savedTheme) {
      setColorTheme(savedTheme);
    }

    // Fetch catalog products
    fetch("/api/store/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          // Strictly verify only products with images show
          const valid = data.products.filter(
            (p: any) => p.image && typeof p.image === "string" && p.image.startsWith("http")
          );
          setProducts(valid);
        }
      })
      .catch((err) => console.error("Error loading products:", err));

    // Flash timer interval
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: any, qty: number = 1, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(
      {
        ...product,
        title: product.title,
        image: product.image,
        isPhysical: product.isPhysical !== false,
      },
      qty
    );
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const openQuickView = (product: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setQuickViewProduct(product);
    setActiveGalleryIndex(0);
    setQuickViewQty(1);
    setSelectedVariant(product.colors?.[0]?.name || "Standard");
  };

  const formatPrice = (p: any, type: "current" | "original" = "current") => {
    if (currency === "USD") {
      const val = type === "current" ? p.priceUSD || 29.99 : p.originalPriceUSD || 49.99;
      return `$${val.toFixed(2)}`;
    } else {
      const val = type === "current" ? p.priceINR || 2399 : p.originalPriceINR || 3999;
      return `₹${val.toLocaleString("en-IN")}`;
    }
  };

  const activeAccent = STORE_ACCENT_COLORS.find((t) => t.id === colorTheme) || STORE_ACCENT_COLORS[0];

  // Filtered lists
  const flashDeals = products.filter((p) => p.isFlashDeal || p.category === "Gaming" || p.category === "Mobile & Accessories").slice(0, 4);
  const trendingProducts = products.filter((p) => {
    if (activeCategory !== "ALL" && p.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* 1. MOCKUP TOP HEADER & NAVIGATION WITH LIGHT/DARK & MULTI-COLOR ACCENTS */}
      <StoreHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        currency={currency}
        setCurrency={setCurrency}
        currentColorTheme={colorTheme}
        onColorThemeChange={(id) => setColorTheme(id)}
      />

      <CartDrawer currency={currency} />
      <StoreLivePurchasePopups />

      <main className="flex-1 pb-24 md:pb-16">
        {/* 2. HERO SECTION (Desktop & Mobile Adaptive) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Large Dark Neon Banner */}
            <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#0b0c16] via-[#101426] to-[#1e1b4b] border border-white/10 dark:border-indigo-500/20 p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[380px] sm:min-h-[440px]">
              {/* Background ambient lighting */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: activeAccent.hex }}
              />
              <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Foreground Hero Image Overlay on the Right side */}
              <div className="hidden sm:block absolute right-4 bottom-2 w-80 lg:w-[420px] pointer-events-none opacity-90 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Next-Gen Tech Essentials"
                  className="w-full h-auto object-contain transform -rotate-6 scale-95"
                />
              </div>

              {/* Hero Content */}
              <div className="relative z-10 max-w-lg space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> New Arrivals 2026
                </span>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                  Next-Gen Tech & <br />
                  <span
                    className="bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, #ffffff, ${activeAccent.hex}, #f472b6)`,
                    }}
                  >
                    AI Essentials
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Discover smart gadgets, AI tools and productivity gear for work, travel and everyday life.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("trending-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{ backgroundColor: activeAccent.hex }}
                    className="px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 hover:opacity-95"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveCategory("AI Tools")}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all cursor-pointer"
                  >
                    Explore AI Tools
                  </button>
                </div>
              </div>

              {/* Dots Slider Indicator */}
              <div className="relative z-10 flex items-center gap-2 pt-6">
                <span className="w-6 h-2 rounded-full" style={{ backgroundColor: activeAccent.hex }} />
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Right Featured Items List */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
              {[
                {
                  title: "Latest Tech",
                  subtitle: "New & trending gadgets",
                  icon: Zap,
                  cat: "Laptops",
                  color: "from-blue-500/20 to-indigo-500/20 text-blue-500",
                },
                {
                  title: "AI Tools",
                  subtitle: "Boost productivity",
                  icon: Cpu,
                  cat: "AI Tools",
                  color: "from-purple-500/20 to-pink-500/20 text-purple-500",
                },
                {
                  title: "Travel Essentials",
                  subtitle: "Smart travel gear",
                  icon: Luggage,
                  cat: "Travel Gear",
                  color: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
                },
                {
                  title: "Gaming Gear",
                  subtitle: "Level up your setup",
                  icon: Gamepad2,
                  cat: "Gaming",
                  color: "from-amber-500/20 to-rose-500/20 text-amber-500",
                },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(item.cat)}
                    className="flex-1 flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md transition-all group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white transition-colors group-hover:underline">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. CIRCULAR CATEGORY CAROUSEL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer focus:outline-hidden"
                >
                  <div
                    style={isActive ? { backgroundColor: activeAccent.hex, borderColor: activeAccent.hex } : {}}
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-200 border ${
                      isActive
                        ? "text-white shadow-lg scale-105"
                        : "bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-sm"
                    }`}
                  >
                    <IconComp className={`w-7 h-7 sm:w-8 sm:h-8 ${isActive ? "text-white" : "group-hover:scale-105 transition-transform"}`} />
                  </div>
                  <span
                    style={isActive ? { color: activeAccent.hex } : {}}
                    className={`text-xs font-semibold whitespace-nowrap ${
                      isActive ? "font-bold" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. FLASH DEALS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Flash Deals Box with Accent Dynamic Colors */}
            <div
              style={{
                background: `linear-gradient(135deg, ${activeAccent.hex}, #4338ca)`,
              }}
              className="lg:col-span-3 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl min-h-[280px]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <h3 className="text-xl font-black tracking-tight text-white">Flash Deals</h3>
                </div>
                <p className="text-xs text-white/90 font-medium">Limited Time Offer</p>
              </div>

              {/* Countdown timer numbers */}
              <div className="my-6">
                <div className="flex items-center justify-between text-center gap-1.5">
                  <div className="flex-1 bg-black/25 backdrop-blur-sm rounded-xl py-2 px-1 border border-white/10">
                    <span className="block text-xl font-black font-mono">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-white/80 font-medium uppercase">Hours</span>
                  </div>
                  <span className="text-lg font-black text-white/50">:</span>
                  <div className="flex-1 bg-black/25 backdrop-blur-sm rounded-xl py-2 px-1 border border-white/10">
                    <span className="block text-xl font-black font-mono">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-white/80 font-medium uppercase">Mins</span>
                  </div>
                  <span className="text-lg font-black text-white/50">:</span>
                  <div className="flex-1 bg-black/25 backdrop-blur-sm rounded-xl py-2 px-1 border border-white/10">
                    <span className="block text-xl font-black font-mono">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-white/80 font-medium uppercase">Secs</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveCategory("Deals")}
                style={{ color: activeAccent.hex }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>View All Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Horizontal Product Cards */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {flashDeals.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => openQuickView(prod)}
                  className="group rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-800/90 p-3.5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all cursor-pointer relative"
                >
                  {/* Discount tag badge */}
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-black tracking-tight shadow-sm">
                    {prod.discountBadge || "-40%"}
                  </span>

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => toggleWishlist(prod.id, e)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        wishlist.includes(prod.id) ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-900/50 mb-3 overflow-hidden flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      onError={(e: any) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {prod.title}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{prod.rating || 4.8}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-normal">
                        ({prod.reviewsCount || "2.4K"})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
                        {formatPrice(prod, "current")}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 line-through font-mono">
                        {formatPrice(prod, "original")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TRENDING NOW SECTION */}
        <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Trending Now
            </h2>

            {/* Category filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {["ALL", "AI Tools", "Gadgets", "Gaming", "Travel", "Accessories"].map((catName) => {
                const matchCat =
                  catName === "ALL"
                    ? "ALL"
                    : catName === "Gadgets"
                    ? "Laptops"
                    : catName === "Travel"
                    ? "Travel Gear"
                    : catName === "Accessories"
                    ? "Mobile & Accessories"
                    : catName;
                const active = activeCategory === matchCat;
                return (
                  <button
                    key={catName}
                    onClick={() => setActiveCategory(matchCat)}
                    style={active ? { backgroundColor: activeAccent.hex, color: "#ffffff" } : {}}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? "shadow-xs"
                        : "bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400"
                    }`}
                  >
                    {catName === "ALL" ? "All" : catName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => openQuickView(prod)}
                className="group rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-800/90 p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all cursor-pointer relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(prod.id, e)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 transition-colors shadow-xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.includes(prod.id) ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="w-full aspect-square rounded-2xl bg-slate-50 dark:bg-slate-900/50 mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    onError={(e: any) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info & Price */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {prod.title}
                    </h3>

                    {/* Star Rating & Review count */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{prod.rating || 4.7}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-normal">
                        ({prod.reviewsCount || "865"})
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                        {formatPrice(prod, "current")}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-mono">
                        {formatPrice(prod, "original")}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {prod.discountBadge || "24% OFF"}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => handleAddToCart(prod, 1, e)}
                      style={{ backgroundColor: activeAccent.hex }}
                      className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:opacity-90"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{addedItem === prod.id ? "Added to Cart! ✓" : "Add to Cart 🛒"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. DUAL PROMO BANNERS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner 1: AI Productivity Tools */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0c0f24] via-[#15193b] to-[#1e1b4b] border border-white/10 dark:border-indigo-500/20 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[220px]">
              <div className="space-y-3 relative z-10 max-w-sm">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  AI Productivity Tools
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Top AI software & toolkits for work, content & business automation.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveCategory("AI Tools")}
                    style={{ backgroundColor: activeAccent.hex }}
                    className="px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md hover:opacity-90"
                  >
                    <span>Explore AI Tools</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Glowing AI Chip Graphic */}
              <div className="absolute right-6 bottom-4 w-36 h-36 bg-gradient-to-tr from-purple-500/30 to-indigo-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40 shadow-inner">
                <Cpu className="w-16 h-16 text-indigo-300 animate-pulse" />
              </div>
            </div>

            {/* Banner 2: Travel Smart */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0c2429] via-[#0f343c] to-[#0c1a24] border border-teal-500/20 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[220px]">
              <div className="space-y-3 relative z-10 max-w-sm">
                <h3 className="text-2xl font-black text-white tracking-tight">Travel Smart</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Essentials for your next adventure. Universal adapters, power banks & travel tech.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveCategory("Travel Gear")}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Shop Travel Gear</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Traveler graphic on right */}
              <div className="absolute right-4 bottom-2 w-36 h-36 opacity-80 pointer-events-none">
                <Luggage className="w-20 h-20 text-teal-400/50 absolute right-4 bottom-4" />
              </div>
            </div>
          </div>
        </section>

        {/* 7. VALUE PROPOSITION FOOTER TRUST BADGES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center sm:text-left">
            {[
              { title: "Free Shipping", subtitle: "On orders over ₹8,000 / $99", icon: Truck },
              { title: "Easy Returns", subtitle: "30-day hassle-free policy", icon: RotateCcw },
              { title: "Secure Payment", subtitle: "100% safe & encrypted", icon: ShieldCheck },
              { title: "Verified Products", subtitle: "Genuine & quality assured", icon: CheckCircle2 },
              { title: "Global Delivery", subtitle: "To 100+ countries tracked", icon: Compass },
            ].map((trust, idx) => {
              const IconComp = trust.icon;
              return (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-3">
                  <div
                    style={{ color: activeAccent.hex }}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-xs"
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {trust.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {trust.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. QUICK VIEW MODAL */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Gallery */}
                <div className="space-y-3">
                  <div className="w-full aspect-square rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <img
                      src={quickViewProduct.galleryImages?.[activeGalleryIndex] || quickViewProduct.image}
                      alt={quickViewProduct.title}
                      onError={(e: any) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {quickViewProduct.galleryImages && quickViewProduct.galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {quickViewProduct.galleryImages.map((img: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => setActiveGalleryIndex(i)}
                          style={activeGalleryIndex === i ? { borderColor: activeAccent.hex } : {}}
                          className={`w-14 h-14 rounded-xl border-2 overflow-hidden shrink-0 cursor-pointer ${
                            activeGalleryIndex === i
                              ? ""
                              : "border-slate-200 dark:border-slate-800"
                          }`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details & Purchase Form */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <span
                      style={{ color: activeAccent.hex }}
                      className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wider"
                    >
                      {quickViewProduct.badge || "Bestseller"}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                      {quickViewProduct.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {quickViewProduct.tagline}
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mt-2">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{quickViewProduct.rating || 4.8}</span>
                      <span className="text-slate-400 font-normal">
                        ({quickViewProduct.reviewsCount || 2418} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {formatPrice(quickViewProduct, "current")}
                      </span>
                      <span className="text-sm text-slate-400 line-through font-mono">
                        {formatPrice(quickViewProduct, "original")}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {quickViewProduct.discountBadge || "Save 40%"}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Info Card */}
                  {quickViewProduct.shippingDetails && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                      <div>
                        Carrier:{" "}
                        <span className="text-slate-900 dark:text-white font-medium">
                          {quickViewProduct.shippingDetails.carrier}
                        </span>
                      </div>
                      <div>
                        Estimated Arrival:{" "}
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          {quickViewProduct.shippingDetails.estimatedDelivery}
                        </span>
                      </div>
                      <div>
                        Dispatch:{" "}
                        <span className="text-slate-700 dark:text-slate-300">
                          {quickViewProduct.shippingDetails.origin}
                        </span>
                      </div>
                      {quickViewProduct.supplier && (
                        <div className="pt-1 mt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Dropship Verified:</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                            ✓ {quickViewProduct.supplier}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quantity and Actions */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
                        <button
                          onClick={() => setQuickViewQty((q) => Math.max(1, q - 1))}
                          className="p-1.5 px-3 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">
                          {quickViewQty}
                        </span>
                        <button
                          onClick={() => setQuickViewQty((q) => Math.min(10, q + 1))}
                          className="p-1.5 px-3 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          handleAddToCart(quickViewProduct, quickViewQty);
                          setQuickViewProduct(null);
                        }}
                        style={{ backgroundColor: activeAccent.hex }}
                        className="py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:opacity-90"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>

                      <Link
                        href="/store/checkout"
                        onClick={() => {
                          handleAddToCart(quickViewProduct, quickViewQty);
                          setQuickViewProduct(null);
                        }}
                        className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                      >
                        Buy Now
                      </Link>
                    </div>

                    <div className="pt-2 text-center">
                      <Link
                        href={`/store/products/${quickViewProduct.id}`}
                        className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
                      >
                        View Full Product Page &amp; Technical Specs &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 9. MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b0c16]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800/80 py-2 px-6 flex items-center justify-between text-center">
        <button
          onClick={() => {
            setActiveCategory("ALL");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={activeCategory === "ALL" ? { color: activeAccent.hex } : {}}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold cursor-pointer ${
            activeCategory === "ALL" ? "font-bold" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            const el = document.getElementById("trending-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 cursor-pointer"
        >
          <Layers className="w-5 h-5" />
          <span>Categories</span>
        </button>

        <button
          onClick={() => setActiveCategory("Deals")}
          style={activeCategory === "Deals" ? { color: activeAccent.hex } : {}}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold cursor-pointer ${
            activeCategory === "Deals" ? "font-bold" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <Tag className="w-5 h-5" />
          <span>Deals</span>
        </button>

        <Link
          href={user ? "/admin/store" : "/store/login"}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400"
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
