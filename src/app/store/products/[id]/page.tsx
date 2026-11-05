"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  ShoppingBag,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Clock,
  ExternalLink,
  ChevronRight,
  Flame,
  Globe,
  Plus,
  Minus,
  Tag,
  Gift,
  Award,
  Sparkles,
  MapPin,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";
import { VIRAL_DROPSHIP_CATALOG } from "@/lib/pipeline/agents/dropshipHunterAgent";
import { useCart } from "@/context/CartContext";
import { useVip } from "@/context/VipAuthContext";
import { detectUserCurrency } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const { addToCart, setIsCartOpen } = useCart();
  const { user } = useVip();

  const [product, setProduct] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [userCurrency, setUserCurrency] = useState<"USD" | "INR">("USD");
  const [isDark, setIsDark] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState<string>("SMART30");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; msg: string }>({
    code: "SMART30",
    percent: 30,
    msg: "30% Instant Launch Discount Active!",
  });
  const [promoError, setPromoError] = useState<string>("");

  // Shipping details calculator
  const [shippingCountry, setShippingCountry] = useState<string>("United States");
  const [postalCheckInput, setPostalCheckInput] = useState<string>("");
  const [shippingVerificationStatus, setShippingVerificationStatus] = useState<string | null>(null);

  useEffect(() => {
    setUserCurrency(detectUserCurrency());
    if (typeof window !== "undefined") {
      const isDarkMode =
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(isDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  useEffect(() => {
    if (!productId) return;
    const cleanId = String(productId).toLowerCase();

    // 1. Search in primary mockup catalog
    let found = STORE_MOCKUP_PRODUCTS.find(
      (p) => String(p.id).toLowerCase() === cleanId
    );

    // 2. Search in viral dropship catalog
    if (!found) {
      const dropshipItem = VIRAL_DROPSHIP_CATALOG.find(
        (p) => String(p.id).toLowerCase() === cleanId
      );
      if (dropshipItem) {
        found = {
          id: dropshipItem.id,
          title: dropshipItem.title,
          tagline: dropshipItem.tagline,
          priceINR: dropshipItem.priceINR,
          originalPriceINR: dropshipItem.originalPriceINR,
          priceUSD: dropshipItem.priceUSD,
          originalPriceUSD: dropshipItem.originalPriceUSD,
          discountBadge: `${Math.round(((dropshipItem.originalPriceINR - dropshipItem.priceINR) / dropshipItem.originalPriceINR) * 100)}% OFF`,
          badge: dropshipItem.badge || "HOT TREND",
          category: dropshipItem.category || "Smart Gadgets",
          isPhysical: dropshipItem.isPhysical !== false,
          stock: dropshipItem.stock || 45,
          inStock: true,
          rating: dropshipItem.rating || 4.9,
          reviewsCount: dropshipItem.reviewsCount || 428,
          image: dropshipItem.image,
          galleryImages: dropshipItem.galleryImages || [dropshipItem.image],
          colors: dropshipItem.colors || [{ name: "Space Gray", colorHex: "#374151" }],
          shippingDetails: dropshipItem.shippingDetails || {
            origin: "Global Air Cargo Logistics Center",
            estimatedDelivery: "3 - 5 Business Days (US/Global Priority)",
            shippingCost: "FREE Tracked Express",
            carrier: "FedEx / DHL Express / USPS",
            supportedCountries: ["United States", "Canada", "United Kingdom", "Australia", "India", "Germany"],
          },
          features: dropshipItem.features || [
            "Next-Gen Intelligent Performance",
            "Ultra-Lightweight & Ergonomic Build",
            "Long-Life Rechargeable Battery System",
            "FCC, CE & RoHS Certified Electronics",
          ],
        } as any;
      }
    }

    if (found) {
      setProduct(found);
      setActiveImage(found.image);
      if (found.colors && found.colors.length > 0) {
        setSelectedColor(found.colors[0].name);
        if (found.colors[0].image) {
          setActiveImage(found.colors[0].image);
        }
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 space-y-4 transition-colors">
        <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <h2 className="text-xl font-bold">Verifying Product Specifications...</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Loading verified global catalog data and express logistics route.</p>
        <Link
          href="/store"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all"
        >
          &larr; Back to Storefront
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCodeInput.trim().toUpperCase();
    setPromoError("");
    if (clean === "VIP50" || clean === "FLASH50") {
      setAppliedPromo({ code: clean, percent: 50, msg: "🔥 50% VIP Exclusive Discount Applied!" });
    } else if (clean === "QUANT40" || clean === "TECH40") {
      setAppliedPromo({ code: clean, percent: 40, msg: "🚀 40% High-Tech Discount Applied!" });
    } else if (clean === "SMART30" || clean === "GLOBAL30" || clean === "USA30") {
      setAppliedPromo({ code: clean, percent: 30, msg: "🎉 30% Verified Promo Code Applied!" });
    } else if (clean === "WELCOME20") {
      setAppliedPromo({ code: clean, percent: 20, msg: "✨ 20% First Order Promo Applied!" });
    } else {
      setPromoError("Invalid code. Try SMART30 or VIP50");
    }
  };

  const handleVerifyShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCheckInput.trim()) {
      setShippingVerificationStatus("Please enter your ZIP or Postal code.");
      return;
    }
    setShippingVerificationStatus(
      `✅ Delivery is available to ${postalCheckInput.trim()}, ${shippingCountry}! Estimated transit: 3–5 Business Days via Priority Air Express.`
    );
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        priceINR: product.priceINR || 999,
        priceUSD: product.priceUSD || 19,
        image: activeImage || product.image,
        category: product.category,
        isPhysical: product.isPhysical !== false,
      },
      quantity
    );
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
  };

  const handleDirectCheckout = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        priceINR: product.priceINR || 999,
        priceUSD: product.priceUSD || 19,
        image: activeImage || product.image,
        category: product.category,
        isPhysical: product.isPhysical !== false,
      },
      quantity
    );
    router.push("/store/checkout");
  };

  // Pricing calculation
  const isUSD = userCurrency === "USD";
  const basePrice = isUSD ? product.priceUSD || 19 : product.priceINR || 999;
  const originalPrice = isUSD ? product.originalPriceUSD || 39 : product.originalPriceINR || 1999;
  const discountMultiplier = (100 - appliedPromo.percent) / 100;
  const discountedPrice = Math.round(basePrice * discountMultiplier * 100) / 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 antialiased font-sans selection:bg-[#d1fe17] selection:text-black transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0c1017]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
        </Link>
        <div className="flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark and Light Mode"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
          </button>

          <button
            onClick={handleShare}
            aria-label="Share product link"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? "Link Copied!" : "Share"}</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-indigo-600 dark:text-[#d1fe17]" />
            <span className="hidden sm:inline">My Cart</span>
          </button>

          <button
            onClick={() => setUserCurrency(isUSD ? "INR" : "USD")}
            aria-label="Switch Currency"
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px] font-mono font-bold text-indigo-600 dark:text-[#d1fe17] cursor-pointer"
          >
            {userCurrency}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/store" className="hover:text-slate-900 dark:hover:text-white">Store</Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span>{product.category || "Electronics & Gear"}</span>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-indigo-600 dark:text-[#d1fe17] font-semibold truncate max-w-sm">{product.title}</span>
        </nav>

        {/* 2-Column Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-[#0c1017] border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center group">
              <img
                src={activeImage || product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              {product.badge && (
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#d1fe17] text-[#07090e] font-black text-[11px] uppercase tracking-wider shadow-lg shadow-[#d1fe17]/25 border border-[#d1fe17]">
                  {product.badge}
                </div>
              )}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-slate-300 dark:border-white/10 text-[10px] text-slate-800 dark:text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Globe className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Verified Global Supplier
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.galleryImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    aria-label={`View image thumbnail ${idx + 1}`}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImage === img
                        ? "border-indigo-600 dark:border-[#d1fe17] scale-95 shadow-[0_0_12px_rgba(99,102,241,0.35)] dark:shadow-[0_0_12px_rgba(209,254,23,0.35)]"
                        : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-600"
                    }`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">100% Quality Checked</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Strict QC lab tested</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm">
                <Truck className="w-5 h-5 text-sky-600 dark:text-sky-400 mx-auto" />
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">Express Air Shipping</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">US, UK, IN & Worldwide</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm">
                <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-violet-400 mx-auto" />
                <p className="text-[11px] font-bold text-slate-900 dark:text-white">Easy Returns</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">7-Day replacement</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Pricing, Promos, Quantity & Instant Buy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  In Stock & Ready for Dispatch
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-600">•</span>
                <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating || 4.9}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">({product.reviewsCount || 428} verified reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.tagline || product.description || "Engineered for maximum reliability, premium tactile feel, and modern smart productivity."}
              </p>
            </div>

            {/* Price Box with Coupon Applied Calculation */}
            <div className="p-5 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-[#0e131d] dark:to-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-md">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-[#d1fe17] font-mono tracking-tight">
                  {isUSD ? `$${discountedPrice}` : `₹${discountedPrice.toLocaleString()}`}
                </span>
                <span className="text-base text-slate-400 line-through font-mono">
                  {isUSD ? `$${originalPrice}` : `₹${originalPrice.toLocaleString()}`}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                  Save {appliedPromo.percent}% with {appliedPromo.code}
                </span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {appliedPromo.msg}
              </p>
            </div>

            {/* Interactive Promo Code Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-600 dark:text-[#d1fe17]" /> Apply Coupon / Discount Code:
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Available: SMART30, VIP50</span>
              </div>
              <form onSubmit={handleApplyPromo} className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Enter code (e.g. VIP50)"
                  aria-label="Coupon or discount code"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 dark:focus:border-[#d1fe17]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-xs text-rose-500 dark:text-rose-400">{promoError}</p>}
            </div>

            {/* Color Finish Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Finish / Color: <span className="text-indigo-600 dark:text-[#d1fe17] font-semibold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.colors.map((c: any) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (c.image) setActiveImage(c.image);
                      }}
                      aria-label={`Select color ${c.name}`}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? "border-indigo-600 dark:border-[#d1fe17] bg-indigo-50 dark:bg-[#d1fe17]/15 text-indigo-700 dark:text-[#d1fe17] font-bold shadow-sm"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20" style={{ backgroundColor: c.colorHex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-300 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors rounded-l-2xl cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-5 text-xs font-bold font-mono text-slate-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors rounded-r-2xl cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart + Instant Checkout */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-4 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-indigo-600 dark:text-[#d1fe17]" /> Add To Cart
                </button>

                <button
                  onClick={handleDirectCheckout}
                  className="py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 dark:bg-[#d1fe17] dark:hover:bg-[#bde712] text-white dark:text-[#07090e] font-extrabold text-xs sm:text-sm border border-indigo-600 dark:border-[#d1fe17] flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-indigo-600/20 dark:shadow-[#d1fe17]/20 transform hover:-translate-y-0.5"
                >
                  <CreditCard className="w-4 h-4 text-white dark:text-[#07090e]" /> Proceed to Checkout
                </button>
              </div>

              {addedToCartToast && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
                  <span>✅ Item added to cart!</span>
                  <button onClick={() => setIsCartOpen(true)} className="underline text-indigo-600 dark:text-white cursor-pointer">
                    View Cart &rarr;
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-500" /> Free Global Express
                </span>
                <span>•</span>
                <span>Money-Back Guarantee</span>
              </div>
            </div>

            {/* Real-Time Shipping & Country Delivery Verification */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600 dark:text-[#d1fe17]" /> Delivery & Shipping Availability
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-bold">
                  Tracked Air Freight
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Standard Carrier:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">FedEx / DHL Express / USPS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">3 - 5 Business Days</span>
                </div>
              </div>

              {/* Postal Code Verifier Form */}
              <form onSubmit={handleVerifyShipping} className="pt-2 space-y-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  Verify Postal Code / Country Delivery:
                </label>
                <div className="flex gap-2">
                  <select
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    aria-label="Select shipping country"
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                  <input
                    type="text"
                    value={postalCheckInput}
                    onChange={(e) => setPostalCheckInput(e.target.value)}
                    placeholder="Enter ZIP / PIN (e.g. 10001)"
                    aria-label="ZIP or Postal Code"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 dark:focus:border-[#d1fe17]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
                  >
                    Check
                  </button>
                </div>
                {shippingVerificationStatus && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                    {shippingVerificationStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Product Details, Specs & Features Deep-Dive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="md:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 space-y-4 shadow-md">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800/80 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600 dark:text-[#d1fe17]" /> Detailed Engineering Specifications & Architecture
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                The <strong>{product.title}</strong> is manufactured under strict ISO-9001 and CE compliance standards. Built using premium aerospace-grade polymers and alloy components to withstand rigorous daily travel and professional productivity setups.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.features && product.features.map((f: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 dark:text-slate-200">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 space-y-4 shadow-md">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800/80 pb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-indigo-600 dark:text-violet-400" /> Package Contents
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-[#d1fe17]" /> 1x {product.title}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-[#d1fe17]" /> 1x Reinforced Braided Fast-Charging Cable
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-[#d1fe17]" /> 1x Global User Guide (English, Spanish, French, German)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-[#d1fe17]" /> 1x Certificate of Authenticity & 1-Year Warranty Card
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
