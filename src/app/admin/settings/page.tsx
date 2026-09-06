"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle, Key, DollarSign, Clock, Sliders, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    GEMINI_API_KEY: "",
    OPENAI_API_KEY: "",
    UNSPLASH_ACCESS_KEY: "",
    YOUTUBE_API_KEY: "",
    NEXT_PUBLIC_ADSENSE_CLIENT_ID: "",
    NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME: "",
    DEFAULT_NICHE: "Artificial Intelligence, Tech Gadgets & Software",
    AUTO_PUBLISH_DEFAULT: "true",
    POST_LANGUAGE: "English",
    TARGET_WORD_COUNT: "1600",
    CRON_SCHEDULE: "0 8 * * *",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings);
        }
      });
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      alert("Error updating settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600" /> Platform & Engine Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage AI providers, monetization IDs, automation triggers, and default generation parameters.
        </p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: AI Provider Keys */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            <Key className="w-4 h-4 text-indigo-600" /> AI Engine Credentials
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Google Gemini API Key (Recommended)
              </label>
              <input
                type="text"
                value={settings.GEMINI_API_KEY}
                onChange={(e) => handleChange("GEMINI_API_KEY", e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Get a free key from Google AI Studio (aistudio.google.com).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                OpenAI API Key (Optional Fallback)
              </label>
              <input
                type="text"
                value={settings.OPENAI_API_KEY}
                onChange={(e) => handleChange("OPENAI_API_KEY", e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Monetization Setup */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            <DollarSign className="w-4 h-4 text-emerald-600" /> Monetization Settings
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Google AdSense Publisher ID
              </label>
              <input
                type="text"
                value={settings.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                onChange={(e) =>
                  handleChange("NEXT_PUBLIC_ADSENSE_CLIENT_ID", e.target.value)
                }
                placeholder="ca-pub-1234567890123456"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Buy Me A Coffee Username
              </label>
              <input
                type="text"
                value={settings.NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME}
                onChange={(e) =>
                  handleChange(
                    "NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME",
                    e.target.value
                  )
                }
                placeholder="e.g. techpulse"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Generation Defaults */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-indigo-600" /> Pipeline Defaults & Niche
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Default Target Niche Focus
              </label>
              <input
                type="text"
                value={settings.DEFAULT_NICHE}
                onChange={(e) => handleChange("DEFAULT_NICHE", e.target.value)}
                placeholder="e.g. Artificial Intelligence, Cloud Engineering, Productivity"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Word Count
                </label>
                <input
                  type="text"
                  value={settings.TARGET_WORD_COUNT}
                  onChange={(e) =>
                    handleChange("TARGET_WORD_COUNT", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Daily Cron Schedule (5-part cron)
                </label>
                <input
                  type="text"
                  value={settings.CRON_SCHEDULE}
                  onChange={(e) => handleChange("CRON_SCHEDULE", e.target.value)}
                  placeholder="0 8 * * * (Daily at 8 AM)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md flex items-center justify-center gap-2"
        >
          {saved ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {saved ? "Settings Saved Successfully!" : "Save All Configurations"}
        </button>
      </form>
    </div>
  );
}
