"use client";

import { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇮🇳" },
  { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
  { code: "fr", name: "Français (French)", flag: "🇫🇷" },
  { code: "de", name: "Deutsch (German)", flag: "🇩🇪" },
  { code: "zh-CN", name: "中文 (Chinese Simplified)", flag: "🇨🇳" },
  { code: "zh-TW", name: "繁體中文 (Chinese Traditional)", flag: "🇹🇼" },
  { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
  { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷" },
  { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
  { code: "pt", name: "Português (Portuguese)", flag: "🇧🇷" },
  { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
  { code: "it", name: "Italiano (Italian)", flag: "🇮🇹" },
  { code: "nl", name: "Nederlands (Dutch)", flag: "🇳🇱" },
  { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)", flag: "🇻🇳" },
  { code: "th", name: "ไทย (Thai)", flag: "🇹🇭" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "pl", name: "Polski (Polish)", flag: "🇵🇱" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Check if Google Translate widget is loaded or cookie set
    const match = document.cookie.match(/googtrans=\/en\/([a-z-A-Z]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Set google translate cookie
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/`;

    // Trigger Google Translate frame if available or reload to apply translation
    const element = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (element) {
      element.value = langCode;
      element.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const currentObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-500" />
        <span>{currentObj.flag}</span>
        <span className="hidden sm:inline">{currentObj.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150 font-sans">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
              Select Language
            </div>
            <div className="max-h-64 overflow-y-auto pt-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                    currentLang === lang.code
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {currentLang === lang.code && (
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
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
