"use client";

import { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";

export const LANGUAGES = [
  { code: "en", name: "English (US)", flag: "🇺🇸", ttsCode: "en", bcp47: "en-US" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇮🇳", ttsCode: "bn", bcp47: "bn-IN" },
  { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳", ttsCode: "hi", bcp47: "hi-IN" },
  { code: "es", name: "Español (Spanish)", flag: "🇪🇸", ttsCode: "es", bcp47: "es-ES" },
  { code: "fr", name: "Français (French)", flag: "🇫🇷", ttsCode: "fr", bcp47: "fr-FR" },
  { code: "de", name: "Deutsch (German)", flag: "🇩🇪", ttsCode: "de", bcp47: "de-DE" },
  { code: "zh-CN", name: "中文 (Chinese)", flag: "🇨🇳", ttsCode: "zh-CN", bcp47: "zh-CN" },
  { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵", ttsCode: "ja", bcp47: "ja-JP" },
  { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷", ttsCode: "ko", bcp47: "ko-KR" },
  { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦", ttsCode: "ar", bcp47: "ar-SA" },
  { code: "pt", name: "Português (Portuguese)", flag: "🇧🇷", ttsCode: "pt", bcp47: "pt-BR" },
  { code: "ru", name: "Русский (Russian)", flag: "🇷🇺", ttsCode: "ru", bcp47: "ru-RU" },
  { code: "it", name: "Italiano (Italian)", flag: "🇮🇹", ttsCode: "it", bcp47: "it-IT" },
  { code: "nl", name: "Nederlands (Dutch)", flag: "🇳🇱", ttsCode: "nl", bcp47: "nl-NL" },
  { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷", ttsCode: "tr", bcp47: "tr-TR" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)", flag: "🇻🇳", ttsCode: "vi", bcp47: "vi-VN" },
  { code: "th", name: "ไทย (Thai)", flag: "🇹🇭", ttsCode: "th", bcp47: "th-TH" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", ttsCode: "id", bcp47: "id-ID" },
  { code: "pl", name: "Polski (Polish)", flag: "🇵🇱", ttsCode: "pl", bcp47: "pl-PL" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳", ttsCode: "mr", bcp47: "mr-IN" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳", ttsCode: "ta", bcp47: "ta-IN" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳", ttsCode: "te", bcp47: "te-IN" },
  { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳", ttsCode: "gu", bcp47: "gu-IN" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳", ttsCode: "kn", bcp47: "kn-IN" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳", ttsCode: "pa", bcp47: "pa-IN" },
  { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰", ttsCode: "ur", bcp47: "ur-PK" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const detectCurrentLanguage = () => {
      // 1. Check googtrans cookie
      const match = document.cookie.match(/googtrans=\/(?:en|auto)\/([a-zA-Z_-]+)/);
      if (match && match[1]) {
        setCurrentLang(match[1]);
        return;
      }
      // 2. Check localStorage
      const saved = localStorage.getItem("smartmag_user_lang");
      if (saved) {
        setCurrentLang(saved);
        return;
      }
      setCurrentLang("en");
    };

    detectCurrentLanguage();
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    if (typeof window !== "undefined" && typeof window.smartmagTranslate === "function") {
      window.smartmagTranslate(langCode);
      return;
    }

    localStorage.setItem("smartmag_user_lang", langCode);
    const host = window.location.hostname;
    const isLocalhost = host === "localhost" || host === "127.0.0.1";

    // Set google translation cookie on all path variations
    const setCookie = (name: string, value: string, days = 365) => {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
      if (!isLocalhost) {
        document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=${host}; SameSite=Lax`;
        const parts = host.split(".");
        if (parts.length > 2) {
          const domain = "." + parts.slice(-2).join(".");
          document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=${domain}; SameSite=Lax`;
        }
      }
    };

    if (langCode === "en") {
      setCookie("googtrans", "/en/en");
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
    } else {
      setCookie("googtrans", `/en/${langCode}`);
      setCookie("googtrans", `/auto/${langCode}`);
    }

    window.dispatchEvent(
      new CustomEvent("smartmag_language_changed", {
        detail: { langCode },
      })
    );

    const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const currentObj = LANGUAGES.find((l) => l.code.toLowerCase() === currentLang.toLowerCase()) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-500" />
        <span>{currentObj.flag}</span>
        <span className="hidden sm:inline font-sans">{currentObj.name}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150 font-sans">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Select Language</span>
              <span className="text-[9px] text-indigo-500 font-mono">Auto Translate</span>
            </div>
            <div className="max-h-64 overflow-y-auto pt-1 scrollbar-thin">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                    currentLang.toLowerCase() === lang.code.toLowerCase()
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {currentLang.toLowerCase() === lang.code.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
