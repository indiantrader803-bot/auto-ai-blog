"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Check } from "lucide-react";

export default function PushNotificationBanner() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      if (Notification.permission === "granted") {
        setSubscribed(true);
      }
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Web push notifications are not supported by this browser.");
      return;
    }

    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === "granted") {
        setSubscribed(true);
        new Notification("SmartMag Tech Alerts Activated! 🚀", {
          body: "You will now receive instant push alerts for breaking AI & Engineering news.",
          icon: "/favicon.ico",
        });
      }
    } catch (e) {
      console.error("Error requesting notification permission", e);
    }
  };

  if (permission === "granted" && subscribed) {
    return (
      <button
        className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5"
        title="Push Alerts Enabled"
      >
        <Bell className="w-4 h-4 fill-emerald-500" />
        <span className="hidden xl:inline text-[11px]">Alerts Active</span>
      </button>
    );
  }

  return (
    <button
      onClick={requestPermission}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
      aria-label="Enable Push Notifications"
      title="Enable Instant Push Notifications"
    >
      <Bell className="w-4 h-4 text-indigo-500 animate-pulse" />
      <span className="hidden xl:inline text-[11px] font-bold">Push Alerts</span>
    </button>
  );
}
