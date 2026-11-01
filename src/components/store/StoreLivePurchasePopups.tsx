"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle, ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface RecentPurchase {
  id: string;
  customerName: string;
  city: string;
  country: string;
  productTitle: string;
  productImage: string;
  price: string;
  timeAgo: string;
}

const RECENT_PURCHASES: RecentPurchase[] = [
  {
    id: "p1",
    customerName: "Rahul S.",
    city: "Mumbai",
    country: "India",
    productTitle: "Wireless ANC Headphones with Deep Bass",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    price: "₹2,399",
    timeAgo: "2 minutes ago",
  },
  {
    id: "p2",
    customerName: "David M.",
    city: "Austin, Texas",
    country: "USA",
    productTitle: "RGB Mechanical Gaming Keyboard",
    productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    price: "$16.99",
    timeAgo: "5 minutes ago",
  },
  {
    id: "p3",
    customerName: "Vikram S.",
    city: "Bengaluru",
    country: "India",
    productTitle: "Portable Power Station 600W (Fast Charging)",
    productImage: "https://images.unsplash.com/photo-1681263576084-e054b2d89903?w=800&auto=format&fit=crop&q=80",
    price: "₹21,999",
    timeAgo: "12 minutes ago",
  },
  {
    id: "p4",
    customerName: "Sophie L.",
    city: "London",
    country: "UK",
    productTitle: "Universal Travel Adapter (150+ Countries)",
    productImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    price: "$14.99",
    timeAgo: "18 minutes ago",
  },
  {
    id: "p5",
    customerName: "Ananya R.",
    city: "Kolkata",
    country: "India",
    productTitle: "Smart Watch Pro (Health & Fitness AMOLED)",
    productImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    price: "₹2,799",
    timeAgo: "24 minutes ago",
  },
  {
    id: "p6",
    customerName: "Marcus B.",
    city: "Sydney",
    country: "Australia",
    productTitle: "4K Camera Drone with GPS & Auto Return",
    productImage: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=800&auto=format&fit=crop&q=80",
    price: "$229.99",
    timeAgo: "31 minutes ago",
  },
];

export default function StoreLivePurchasePopups() {
  const [currentNotification, setCurrentNotification] = useState<RecentPurchase | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial popup after 4 seconds
    const initialTimer = setTimeout(() => {
      showRandomPopup();
    }, 4000);

    // Recurring interval to show popup every 20-30 seconds
    const interval = setInterval(() => {
      showRandomPopup();
    }, 24000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  const showRandomPopup = () => {
    const randomItem = RECENT_PURCHASES[Math.floor(Math.random() * RECENT_PURCHASES.length)];
    setCurrentNotification(randomItem);
    setIsVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl flex items-center gap-3 relative">
        <button
          onClick={() => {
            setIsVisible(false);
            setDismissed(true);
          }}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white text-[10px] cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Product Thumbnail */}
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
          <img
            src={currentNotification.productImage}
            alt={currentNotification.productTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 dark:text-white">
            <span className="truncate">{currentNotification.customerName}</span>
            <span className="text-[10px] text-slate-400 font-normal">from {currentNotification.city}</span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
            Purchased <span className="font-semibold text-indigo-600 dark:text-indigo-400">{currentNotification.productTitle}</span>
          </p>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle className="w-2.5 h-2.5" /> Verified Order ({currentNotification.price})
            </span>
            <span>{currentNotification.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
