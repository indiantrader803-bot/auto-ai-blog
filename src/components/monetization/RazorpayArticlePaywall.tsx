"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { Lock, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Zap, Crown } from "lucide-react";

interface RazorpayArticlePaywallProps {
  articleTitle: string;
  articleSlug?: string;
  onPaymentSuccess?: (paymentId: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayArticlePaywall({
  articleTitle,
  articleSlug = "",
  onPaymentSuccess,
}: RazorpayArticlePaywallProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<"pass" | "all_access">("pass");

  // Tier 1: Single Article Lifetime Pass (₹19 / 1900 paise)
  // Tier 2: VIP All-Access 30-Day Pass (₹99 / 9900 paise)
  const tierConfig = {
    pass: {
      amount: 1900,
      displayPrice: "₹19",
      label: "Single Deep-Dive Pass",
      sublabel: "Instant 1-Click Access to Full Technical Analysis & Code",
    },
    all_access: {
      amount: 9900,
      displayPrice: "₹99",
      label: "All-Access 30-Day VIP Pass",
      sublabel: "Read ALL Articles, Pine Script Indicators & Research PDFs",
    },
  };

  const handlePayNow = async () => {
    setErrorMsg(null);
    setLoading(true);

    try {
      const selected = tierConfig[selectedTier];

      // 1. Call Backend Order Creation
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selected.amount,
          currency: "INR",
          receipt: `art_${articleSlug.slice(0, 20) || "pay"}_${Date.now()}`,
          notes: {
            articleTitle: articleTitle.slice(0, 40),
            articleSlug,
            plan: selectedTier,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to initiate Razorpay order");
      }

      const keyId =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TsxnO9B7Va26ks";

      // 2. Open Razorpay Standard Checkout Modal
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "TheSmartMag Premium",
        description: `${selected.label}: ${articleTitle.slice(0, 35)}...`,
        image: "https://thesmartmag.com/icon-512.png",
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            // 3. Verify Signature with Backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                articleSlug,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              // Store unlock locally in localStorage
              if (typeof window !== "undefined") {
                const unlockedList = JSON.parse(
                  localStorage.getItem("unlocked_articles") || "[]"
                );
                if (!unlockedList.includes(articleSlug)) {
                  unlockedList.push(articleSlug);
                  localStorage.setItem(
                    "unlocked_articles",
                    JSON.stringify(unlockedList)
                  );
                }
                if (selectedTier === "all_access") {
                  localStorage.setItem("vip_all_access_paid", "true");
                }
              }

              if (onPaymentSuccess) {
                onPaymentSuccess(response.razorpay_payment_id);
              } else {
                window.location.reload();
              }
            } else {
              setErrorMsg(
                verifyData.error || "Payment verification failed. Please contact support."
              );
            }
          } catch (e: any) {
            setErrorMsg(`Verification error: ${e.message}`);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "SmartMag Reader",
          email: "reader@thesmartmag.com",
        },
        theme: {
          color: "#0f172a",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      if (typeof window.Razorpay !== "undefined") {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          setErrorMsg(
            response?.error?.description || "Payment failed. Please try again."
          );
          setLoading(false);
        });
        rzp.open();
      } else {
        throw new Error(
          "Razorpay SDK is loading. Please click pay again in 2 seconds."
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="my-8 rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Premium Editorial Paywall</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight leading-snug">
            Unlock Full Technical Blueprint &amp; Research Analysis
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            You have reached the free preview boundary. Unlock the complete unredacted analysis, Pine Script indicators, and production benchmarks.
          </p>

          {/* Pricing Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
            <button
              type="button"
              onClick={() => setSelectedTier("pass")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedTier === "pass"
                  ? "border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">This Article</span>
                <span className="text-lg font-black text-amber-400 font-mono">₹19</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Instant access to this specific article forever.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier("all_access")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedTier === "all_access"
                  ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">30-Day VIP Pass</span>
                </div>
                <span className="text-lg font-black text-emerald-400 font-mono">₹99</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Unlimited access to ALL articles, guides &amp; indicators.
              </p>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Pay Button */}
          <div className="pt-2">
            <button
              onClick={handlePayNow}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing Razorpay Checkout...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>
                    Pay {tierConfig[selectedTier].displayPrice} via Razorpay (UPI, Cards, NetBanking)
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure 256-Bit Razorpay
            </span>
            <span>•</span>
            <span>UPI / GPay / PhonePe / Cards</span>
            <span>•</span>
            <span>Instant Unlock</span>
          </div>
        </div>
      </div>
    </>
  );
}
