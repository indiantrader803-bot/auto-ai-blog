"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useVip } from "@/context/VipAuthContext";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Tag,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { detectUserCurrency } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, totalItems, totalINR, totalUSD } = useCart();
  const { user } = useVip();

  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [shippingAddress, setShippingAddress] = useState("");
  const [buyerName, setBuyerName] = useState(user?.name || "");
  const [buyerEmail, setBuyerEmail] = useState(user?.email || "");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [couponCode, setCouponCode] = useState("GLOBAL30");
  const [discountPercent, setDiscountPercent] = useState(30);
  const [couponMsg, setCouponMsg] = useState("🎉 30% Grand Opening Discount Applied!");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const hasPhysical = cart.some((item) => item.isPhysical);

  useEffect(() => {
    setCurrency(detectUserCurrency());
    if (user) {
      if (user.email && !buyerEmail) setBuyerEmail(user.email);
      if (user.name && !buyerName) setBuyerName(user.name);
    }

    if (!document.getElementById("razorpay-checkout-js")) {
      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [user]);

  const rawTotal = currency === "INR" ? totalINR : totalUSD;
  const discountAmount = (rawTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const formattedFinalTotal =
    currency === "INR" ? `₹${Math.round(finalTotal).toLocaleString()}` : `$${finalTotal.toFixed(2)}`;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === "VIP50" || clean === "FLASH50") {
      setDiscountPercent(50);
      setCouponMsg("🎉 50% VIP Coupon Applied!");
    } else if (clean === "QUANT40") {
      setDiscountPercent(40);
      setCouponMsg("🎉 40% Developer Discount Applied!");
    } else if (clean === "GLOBAL30" || clean === "SMARTMAG30") {
      setDiscountPercent(30);
      setCouponMsg("🎉 30% Promo Applied!");
    } else {
      setDiscountPercent(20);
      setCouponMsg("🎉 20% Special Discount Applied!");
    }
  };

  const handleRazorpayPayment = async () => {
    if (!buyerEmail) {
      alert("Please provide your email address to receive order confirmation.");
      return;
    }
    if (hasPhysical && !shippingAddress.trim()) {
      alert("Please provide your delivery shipping address for physical goods.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on server
      const res = await fetch("/api/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: cart.map((c) => c.id).join(","),
          productTitle: cart.map((c) => `${c.quantity}x ${c.title}`).join(" | "),
          buyerEmail,
          currency,
          shippingAddress,
          isPhysical: hasPhysical,
          paymentMethod: "RAZORPAY",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order creation failed");
      }

      // 2. Open Razorpay Gateway
      const options = {
        key: data.keyId || "rzp_live_TsyPwRJG2SfIKs",
        amount: data.amount,
        currency: data.currency || currency,
        name: "TheSmartMag Store",
        description: `Order for ${totalItems} items`,
        image: "https://thesmartmag.com/icon-512.png",
        order_id: data.orderId,
        handler: async function (response: any) {
          setLoading(true);
          try {
            await fetch("/api/store/checkout", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderId || response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                status: "PAID",
              }),
            });
            setOrderId(response.razorpay_payment_id || `ORD-${Date.now()}`);
            setSuccess(true);
            clearCart();
          } catch {
            setSuccess(true);
            clearCart();
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: buyerName || "Valued Customer",
          email: buyerEmail,
          contact: buyerPhone || "9999999999",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp: any) {
          alert(`Payment failed: ${resp.error.description}`);
          setLoading(false);
        });
        rzp.open();
      } else {
        alert("Razorpay gateway is initializing, please click again in a moment.");
        setLoading(false);
      }
    } catch (err: any) {
      alert(err.message || "Checkout failed");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Payment Successful!</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your order <span className="font-mono text-emerald-600 dark:text-emerald-400">{orderId}</span> has been confirmed.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A receipt and tracking details have been sent to <span className="text-slate-900 dark:text-white font-semibold">{buyerEmail}</span>.
              </p>
            </div>
            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm"
            >
              Back to Store
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Add products to your cart before proceeding to checkout.</p>
            <Link
              href="/store"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
            >
              Browse Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Customer & Shipping Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Arnab Laha"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number (For Delivery Updates)</label>
                <input
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {hasPhysical && (
              <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Dropship Delivery Shipping Address
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Street, Apt, City, State, Postal PIN Code & Country
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Flat 4B, Greenwood Heights, Sector 5, Kolkata, West Bengal - 700091, India"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Direct door-to-door fulfillment with live tracking link dispatched upon order processing.
                  </p>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Payment Gateway
              </h2>
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-500 ring-4 ring-indigo-500/20" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Razorpay Live Gateway</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Cards, UPI (GPay, PhonePe, Paytm), NetBanking & Wallets</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                  Instant
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary: Items & Total */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Order Summary ({totalItems} items)</h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-200 dark:border-slate-800" />
                    )}
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="text-slate-900 dark:text-white font-semibold truncate">{item.title}</p>
                      <p className="text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {currency === "INR"
                        ? `₹${(item.priceINR * item.quantity).toLocaleString()}`
                        : `$${(item.priceUSD * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon Code"
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white uppercase focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {couponMsg && <p className="text-[11px] text-emerald-600 dark:text-emerald-400">{couponMsg}</p>}

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    {currency === "INR" ? `₹${totalINR.toLocaleString()}` : `$${totalUSD.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono">
                    -{currency === "INR" ? `₹${Math.round(discountAmount).toLocaleString()}` : `$${discountAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">{formattedFinalTotal}</span>
                </div>
              </div>

              <button
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                {loading ? "Processing..." : `Pay ${formattedFinalTotal} with Razorpay`}
              </button>

              <p className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 256-Bit SSL Encrypted & Verified Direct Payment
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
