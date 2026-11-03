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
  Minus
} from "lucide-react";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (!productId) return;
    const found = STORE_MOCKUP_PRODUCTS.find(
      (p) => String(p.id).toLowerCase() === String(productId).toLowerCase()
    );
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
      if (found.colors && found.colors.length > 0) {
        setSelectedColor(found.colors[0].name);
      }
    }
  }, [productId]);

  // Load Razorpay Script
  useEffect(() => {
    if (!document.querySelector("#razorpay-checkout-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-checkout-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f1117] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="text-xl font-bold">Looking up Product Specifications...</h2>
        <p className="text-xs text-slate-400">Loading verified dropshipping catalog details.</p>
        <Link
          href="/store"
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold transition-all"
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

  const handleDirectBuy = async () => {
    setIsProcessingPayment(true);
    try {
      if (typeof window.Razorpay === "undefined") {
        alert("Payment gateway is initializing. Please try again in 2 seconds.");
        setIsProcessingPayment(false);
        return;
      }

      const totalAmount = (product.priceINR || 999) * quantity;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TsyPwRJG2SfIKs",
        amount: totalAmount * 100, // paisa
        currency: "INR",
        name: "TheSmartMag Store",
        description: `Order: ${product.title} (Qty: ${quantity})`,
        image: product.image,
        handler: function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          router.push(`/store?order_success=true&payment_id=${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Customer",
          email: "customer@thesmartmag.com",
          contact: "+919876543210",
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert("Error initializing checkout: " + err.message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 antialiased font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0f1219]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? "Link Copied!" : "Share"}</span>
          </button>
          <Link
            href="/store"
            className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white shadow-xs"
          >
            All Products
          </Link>
        </div>
      </header>

      {/* Main Product Details Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/store" className="hover:text-slate-300">Store</Link>
          <ChevronRight className="w-3 h-3" />
          <span>{product.category || "Smart Electronics"}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-300 font-medium truncate max-w-xs">{product.title}</span>
        </div>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center">
              <img
                src={activeImage || product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-violet-600/90 text-white font-black text-[10px] uppercase tracking-wider backdrop-blur-md">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImage === img ? "border-violet-500 scale-95" : "border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Specs & Purchase CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                  Verified In Stock
                </span>
                <span className="text-xs text-slate-500">•</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating || 4.8}</span>
                  <span className="text-slate-500">({product.reviewsCount || 2400} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {product.tagline || product.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-[#131620] border border-slate-800 flex items-baseline gap-4">
              <span className="text-3xl font-black text-white font-mono">
                ₹{(product.priceINR || 999).toLocaleString("en-IN")}
              </span>
              {product.originalPriceINR && (
                <span className="text-base text-slate-500 line-through font-mono">
                  ₹{product.originalPriceINR.toLocaleString("en-IN")}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                Save {product.discountBadge || "40% OFF"}
              </span>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  Select Finish: <span className="text-violet-400">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c: any) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? "border-violet-500 bg-violet-500/20 text-white font-bold"
                          : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.colorHex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-slate-800 text-slate-300 transition-colors rounded-l-xl cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold font-mono text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="p-2 hover:bg-slate-800 text-slate-300 transition-colors rounded-r-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Payment & Buy Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDirectBuy}
                disabled={isProcessingPayment}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-violet-600/25 flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Initializing Live Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" /> Instant Buy Now (Razorpay Secure)
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Gateway
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-400" /> Free Express Courier
                </span>
                <span>•</span>
                <span>7-Day Replacement</span>
              </div>
            </div>

            {/* Shipping & Fulfillment Specs Box */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 text-xs">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-violet-400" /> Dropship Dispatch & Delivery Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
                <div>
                  <span className="text-slate-500 block text-[10px]">Express Carrier:</span>
                  <span className="font-medium text-slate-200">
                    {product.shippingDetails?.carrier || "DHL Express / SafeXpress"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Estimated Arrival:</span>
                  <span className="font-medium text-emerald-400">
                    {product.shippingDetails?.estimatedDelivery || "3 - 6 Business Days"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Fulfillment Center:</span>
                  <span className="font-medium text-slate-200">
                    {product.shippingDetails?.origin || "Global Air Cargo Logistics Hub"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Tracking Number:</span>
                  <span className="font-medium text-slate-200">Provided upon dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Specification Tabs */}
        <div className="p-6 rounded-2xl bg-[#0f1219] border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Product Specifications & Technical Features
          </h3>
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4">
            <p className="leading-relaxed">
              The <strong>{product.title}</strong> is precision-engineered for maximum performance, ergonomic durability, and seamless connectivity. Sourced directly from tier-1 electronics manufacturers with rigorous quality assurance checks prior to air dispatch.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-slate-300">
              <li><strong>Manufacturer Grade:</strong> Aerospace Aluminum & High-Density Polymer</li>
              <li><strong>Power & Efficiency:</strong> Low-power consumption microcontrollers</li>
              <li><strong>Global Compliance:</strong> CE, RoHS, FCC Certified</li>
              <li><strong>Warranty:</strong> 1-Year Comprehensive Manufacturer Protection</li>
              <li><strong>In The Box:</strong> 1x {product.title}, QuickStart Guide, Braided Cable</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
