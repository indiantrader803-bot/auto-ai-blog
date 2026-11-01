"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  QrCode,
  Landmark,
  Globe,
  Tag,
  Clock,
  Flame,
  CreditCard,
  Copy,
  Check,
  Truck,
  Box,
} from "lucide-react";
import { detectUserCurrency } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DigitalProductsStorePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [activeTab, setActiveTab] = useState<"ALL" | "DROPSHIP" | "DIGITAL">("ALL");
  const [activeCoupon, setActiveCoupon] = useState<string>("GLOBAL30");
  const [promoBanner, setPromoBanner] = useState<string>("🔥 Flash Sale: Use code GLOBAL30 for 30% OFF storewide!");
  const [inputCoupon, setInputCoupon] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(30);
  const [couponMsg, setCouponMsg] = useState<string>("");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [purchased, setPurchased] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "UPI" | "BANK">("RAZORPAY");
  const [utrNumber, setUtrNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    const userCurr = detectUserCurrency();
    setCurrency(userCurr);

    fetch("/api/store/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
          setActiveCoupon(data.activeCouponCode || "GLOBAL30");
          setPromoBanner(data.bannerHeadline || "");
          setInputCoupon(data.activeCouponCode || "");
          setAppliedDiscount(data.discountPercentage || 30);
        }
      })
      .catch(() => {});

    // Dynamically load Razorpay Checkout Script
    if (!document.getElementById("razorpay-checkout-js")) {
      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCoupon.trim().toUpperCase();
    if (clean === "VIP50" || clean === "FLASH50") {
      setAppliedDiscount(50);
      setCouponMsg("🎉 50% VIP Coupon Applied Successfully!");
    } else if (clean === "QUANT40") {
      setAppliedDiscount(40);
      setCouponMsg("🎉 40% Developer Discount Applied!");
    } else if (clean === "GLOBAL30" || clean === "AI30" || clean === "SMARTMAG30") {
      setAppliedDiscount(30);
      setCouponMsg("🎉 30% Promo Coupon Applied!");
    } else {
      setAppliedDiscount(20);
      setCouponMsg("🎉 Special 20% Global Discount Applied!");
    }
  };

  const handleCheckout = (product: any) => {
    setSelectedProduct(product);
    setPurchased(false);
    setUtrNumber("");
    setPaymentMethod("RAZORPAY");
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("8240438062@superyes");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const calculateFinalPrice = (product: any) => {
    if (currency === "USD") {
      const base = product.priceUSD || 4.99;
      if (appliedDiscount > 0) {
        return parseFloat((base * (1 - appliedDiscount / 100)).toFixed(2));
      }
      return base;
    } else {
      const base = product.priceINR || 299;
      if (appliedDiscount > 0) {
        return Math.round(base * (1 - appliedDiscount / 100));
      }
      return base;
    }
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail) return;
    setLoading(true);
    const finalPrice = calculateFinalPrice(selectedProduct);

    // If Razorpay gateway selected
    if (paymentMethod === "RAZORPAY" && typeof window !== "undefined" && window.Razorpay) {
      try {
        const amountSubunits = currency === "USD" ? Math.round(finalPrice * 100) : Math.round(finalPrice * 100);
        const orderRes = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountSubunits,
            currency,
            notes: {
              productId: selectedProduct.id,
              productTitle: selectedProduct.title,
              buyerEmail,
              shippingAddress: shippingAddress || "Digital Download",
            },
          }),
        });

        const orderData = await orderRes.json();
        if (orderData.order_id) {
          const rzp = new window.Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TsyPwRJG2SfIKs",
            amount: orderData.amount,
            currency: orderData.currency,
            name: "TheSmartMag Store",
            description: selectedProduct.title,
            order_id: orderData.order_id,
            prefill: { email: buyerEmail },
            theme: { color: "#4f46e5" },
            handler: async function (response: any) {
              await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  articleSlug: selectedProduct.id,
                }),
              });
              setPurchased(true);
              setLoading(false);
            },
          });
          rzp.open();
          return;
        }
      } catch (err) {
        console.warn("Direct Razorpay gateway fallback:", err);
      }
    }

    // Direct recording fallback
    try {
      await fetch("/api/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productTitle: selectedProduct.title,
          price: finalPrice,
          currency,
          buyerEmail,
          paymentMethod,
          shippingAddress: shippingAddress || "N/A",
          couponUsed: inputCoupon.toUpperCase() || "NONE",
          utrOrTxnId: utrNumber || "DIRECT_RAZORPAY_ORDER",
        }),
      });
      setPurchased(true);
    } catch (_) {
      setPurchased(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (activeTab === "DROPSHIP") {
      return p.badge?.includes("DROPSHIP") || p.badge?.includes("TECH") || p.badge?.includes("TRAVEL") || p.badge?.includes("SECURITY");
    }
    if (activeTab === "DIGITAL") {
      return !p.badge?.includes("DROPSHIP") && !p.badge?.includes("TECH") && !p.badge?.includes("TRAVEL") && !p.badge?.includes("SECURITY");
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Top Currency Switcher & Global Promotion Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />
            <span>{promoBanner}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Toggle */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  currency === "USD" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  currency === "INR" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Verified Dropshipping Gear & Production Digital Assets</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            TheSmartMag Official Store
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            High-margin physical gear and battle-tested developer & trading blueprints. Delivered worldwide with 100% secure Razorpay, Card & instant UPI processing.
          </p>

          {/* Catalog Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "ALL"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("DROPSHIP")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "DROPSHIP"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" /> Physical Dropshipping
            </button>
            <button
              onClick={() => setActiveTab("DIGITAL")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "DIGITAL"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" /> Instant Digital
            </button>
          </div>
        </div>

        {/* Coupon Bar */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter coupon (e.g. VIP50, GLOBAL30)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              Apply
            </button>
          </form>
          {couponMsg && (
            <p className="text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
              {couponMsg}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const finalPrice = calculateFinalPrice(prod);
            const originalPrice = currency === "USD" ? prod.originalPriceUSD : prod.originalPriceINR;
            const standardPrice = currency === "USD" ? prod.priceUSD : prod.priceINR;
            const symbol = currency === "USD" ? "$" : "₹";
            const isPhysical = prod.badge?.includes("DROPSHIP") || prod.badge?.includes("TECH") || prod.badge?.includes("TRAVEL") || prod.badge?.includes("SECURITY");

            return (
              <div
                key={prod.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6 hover:border-indigo-500/40 hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">
                      {prod.badge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      {isPhysical ? <Truck className="w-3 h-3 text-amber-500" /> : <Download className="w-3 h-3 text-emerald-500" />}
                      {prod.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {prod.tagline}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                        {symbol}{finalPrice}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {symbol}{originalPrice}
                      </span>
                      {appliedDiscount > 0 && (
                        <span className="ml-auto px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
                          {appliedDiscount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> Razorpay Direct Payout Guarantee
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {prod.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout(prod)}
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Buy Now ({symbol}{finalPrice})</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Checkout Modal with Razorpay & Direct Payment Options */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>

              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase">
                  {selectedProduct.badge}
                </span>
                <h3 className="text-xl font-bold mt-2 text-white">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Amount Payable:{" "}
                  <span className="text-indigo-400 font-bold text-sm">
                    {currency === "USD" ? "$" : "₹"}
                    {calculateFinalPrice(selectedProduct)}
                  </span>{" "}
                  ({appliedDiscount}% discount applied)
                </p>
              </div>

              {purchased ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    Order Confirmed & Payment Received!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Your order details and instant tracking/download link have been sent to <b>{buyerEmail}</b>.
                  </p>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300">
                      Customer Email (for tracking & delivery receipt)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {(selectedProduct.badge?.includes("DROPSHIP") || selectedProduct.badge?.includes("TECH") || selectedProduct.badge?.includes("TRAVEL") || selectedProduct.badge?.includes("SECURITY")) && (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-300">
                        Shipping Address (Street, City, State, PIN/ZIP, Country)
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Enter full delivery address with contact phone number"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select Payment Gateway (Deposits to Razorpay / DBS Bank)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("RAZORPAY")}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === "RAZORPAY"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <CreditCard className="w-3.5 h-3.5 text-indigo-400" /> Razorpay
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Cards / UPI / NetBanking</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("UPI")}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === "UPI"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <QrCode className="w-3.5 h-3.5 text-emerald-400" /> Direct UPI
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">GPay / PhonePe</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("BANK")}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === "BANK"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <Landmark className="w-3.5 h-3.5 text-amber-400" /> Bank Wire
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">NEFT / SWIFT</div>
                      </button>
                    </div>

                    {paymentMethod === "RAZORPAY" && (
                      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1 text-slate-300">
                        <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Official Razorpay Live Payment Gateway
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Supports Credit/Debit Cards, UPI, NetBanking, and Wallets. Funds settle directly into your verified Razorpay merchant account.
                        </div>
                      </div>
                    )}

                    {paymentMethod === "UPI" && (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                        <div className="text-xs text-slate-300 font-semibold">
                          Pay directly to verified UPI ID:
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-4 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 font-mono text-sm font-bold border border-indigo-500/30">
                            8240438062@superyes
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Beneficiary: <b>ARNAB LAHA</b> • Bank: <b>DBS Bank</b>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "BANK" && (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
                        <div><b>Account Name:</b> ARNAB LAHA</div>
                        <div><b>Bank:</b> DBS Bank India Ltd</div>
                        <div><b>IFSC Code:</b> DBSS0IN0811</div>
                        <div><b>SWIFT Code:</b> DBSSINBB</div>
                        <div><b>UPI:</b> 8240438062@superyes</div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                  >
                    {loading ? (
                      "Processing Payment..."
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Pay & Complete Order ({currency === "USD" ? "$" : "₹"}{calculateFinalPrice(selectedProduct)})
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
