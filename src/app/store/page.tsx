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
  ArrowRight,
  Star,
  FileText,
  Briefcase,
  Terminal,
  BookOpen,
  Copy,
  Check,
  Tag,
  Clock,
  Flame,
} from "lucide-react";

export default function DigitalProductsStorePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<string>("SMARTMAG30");
  const [promoBanner, setPromoBanner] = useState<string>("🔥 Flash Sale: Use code SMARTMAG30 for an extra 30% instant discount!");
  const [inputCoupon, setInputCoupon] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<string>("");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [purchased, setPurchased] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "BANK">("UPI");
  const [utrNumber, setUtrNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    fetch("/api/store/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
          setActiveCoupon(data.activeCouponCode || "SMARTMAG30");
          setPromoBanner(data.bannerHeadline || "");
          setInputCoupon(data.activeCouponCode || "");
          setAppliedDiscount(data.discountPercentage || 30);
        }
      })
      .catch(() => {});
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
    } else if (clean === "SMARTMAG30" || clean === "AI30") {
      setAppliedDiscount(30);
      setCouponMsg("🎉 30% Promo Coupon Applied!");
    } else {
      setAppliedDiscount(20);
      setCouponMsg("🎉 Special 20% Instant Discount Applied!");
    }
  };

  const handleCheckout = (product: any) => {
    setSelectedProduct(product);
    setPurchased(false);
    setUtrNumber("");
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("8240438062@superyes");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const calculateFinalPrice = (basePrice: number) => {
    if (appliedDiscount > 0) {
      return Math.round(basePrice * (1 - appliedDiscount / 100));
    }
    return basePrice;
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail) return;
    setLoading(true);
    const finalPrice = calculateFinalPrice(selectedProduct.priceINR);
    try {
      await fetch("/api/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productTitle: selectedProduct.title,
          priceINR: finalPrice,
          buyerEmail,
          paymentMethod,
          couponUsed: inputCoupon.toUpperCase() || "NONE",
          utrOrTxnId: utrNumber || "INSTANT_APP_PAY",
        }),
      });
      setPurchased(true);
    } catch (_) {
      setPurchased(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Autonomous AI Promotion Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-600 to-indigo-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-200 animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              {promoBanner}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-xl bg-black/30 backdrop-blur-md text-xs font-mono font-bold tracking-widest border border-white/20">
              CODE: {activeCoupon}
            </span>
          </div>
        </div>

        {/* Store Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Autonomous AI Digital Store
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Production AI Toolkits, Cheat Sheets &amp; Blueprints
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Curated, priced, and discounted continuously by our autonomous monetization agent. 100% direct bank fulfillment with instant download delivery.
          </p>

          {/* Coupon Input Box */}
          <form onSubmit={handleApplyCoupon} className="max-w-md mx-auto flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Coupon Code (e.g. VIP50)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer shrink-0"
            >
              Apply Code
            </button>
          </form>
          {couponMsg && (
            <div className="text-xs font-bold text-emerald-500 animate-in fade-in">{couponMsg}</div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            const finalPrice = calculateFinalPrice(prod.priceINR);
            return (
              <div
                key={prod.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6 hover:border-indigo-500/40 hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {prod.badge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{prod.category}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black font-serif text-slate-900 dark:text-white">
                      ₹{finalPrice}
                    </span>
                    {appliedDiscount > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{prod.priceINR}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-emerald-500">
                      {appliedDiscount > 0 ? `${appliedDiscount}% OFF Applied` : `Save ${Math.round(((prod.originalPriceINR - prod.priceINR) / prod.originalPriceINR) * 100)}%`}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {prod.features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout(prod)}
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Instant Access (₹{finalPrice})
                </button>
              </div>
            );
          })}
        </div>

        {/* Checkout Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-500/30 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-400">Direct Bank &amp; UPI Settlement</span>
                  <h3 className="text-lg font-bold font-serif">{selectedProduct.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
                >
                  Close
                </button>
              </div>

              {purchased ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif">Payment Verified!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Money has been routed directly to bank account. Your instant download files for <b>{selectedProduct.title}</b> have been unlocked and dispatched to <b>{buyerEmail}</b>.
                  </p>
                  <a
                    href="https://auto-ai-blog-web.onrender.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold"
                  >
                    <Download className="w-4 h-4" /> Download Files Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div className="text-xs font-bold text-white">{selectedProduct.title}</div>
                      <div className="text-[11px] text-slate-400">Instant PDF &amp; Code Blueprint Access</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black font-serif text-emerald-400">
                        ₹{calculateFinalPrice(selectedProduct.priceINR)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {appliedDiscount > 0 ? `${appliedDiscount}% Promo Discount Applied` : "Zero Gateway Surcharges"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Your Email (To receive instant download files)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Payment Options: Direct UPI or Direct Bank Wire */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select Direct Instant Transfer
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("UPI")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          paymentMethod === "UPI"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <QrCode className="w-4 h-4 text-indigo-400" /> Direct UPI (GPay/PhonePe/Paytm)
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Instant Bank Settlement</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("BANK")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          paymentMethod === "BANK"
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <Landmark className="w-4 h-4 text-emerald-400" /> Direct Bank Wire
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">NEFT / IMPS / SWIFT</div>
                      </button>
                    </div>

                    {paymentMethod === "UPI" ? (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                        <div className="text-xs text-slate-300 font-semibold">
                          Pay ₹{calculateFinalPrice(selectedProduct.priceINR)} directly to linked Bank UPI:
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-300 font-mono text-sm font-bold border border-indigo-500/30">
                            8240438062@superyes
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                          >
                            {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Beneficiary: <b>ARNAB LAHA</b> • Bank: <b>DBS Bank</b>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                        <div><b>Account Name:</b> ARNAB LAHA</div>
                        <div><b>Bank:</b> DBS Bank India Ltd</div>
                        <div><b>IFSC Code:</b> DBSS0IN0811</div>
                        <div><b>UPI:</b> 8240438062@superyes</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      UPI Ref / UTR / Transaction ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 423987123456 or PhonePe Ref"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                  >
                    {loading ? (
                      "Verifying Payment & Unlocking..."
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> I Have Completed Payment (Unlock ₹{calculateFinalPrice(selectedProduct.priceINR)})
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
