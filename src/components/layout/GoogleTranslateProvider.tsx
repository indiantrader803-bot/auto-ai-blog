"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    smartmagTranslate: (langCode: string) => void;
  }
}

export default function GoogleTranslateProvider() {
  useEffect(() => {
    // Expose global translation trigger function
    window.smartmagTranslate = (langCode: string) => {
      const host = window.location.hostname;
      const isLocalhost = host === "localhost" || host === "127.0.0.1";

      const setCookie = (value: string) => {
        const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
        document.cookie = `googtrans=${value}; expires=${expires}; path=/; SameSite=Lax`;
        if (!isLocalhost) {
          document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=${host}; SameSite=Lax`;
          document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=.${host}; SameSite=Lax`;
          const parts = host.split(".");
          if (parts.length > 2) {
            const rootDomain = "." + parts.slice(-2).join(".");
            document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=${rootDomain}; SameSite=Lax`;
          }
        }
      };

      if (langCode === "en") {
        setCookie("/en/en");
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      } else {
        setCookie(`/en/${langCode}`);
        setCookie(`/auto/${langCode}`);
      }

      localStorage.setItem("smartmag_user_lang", langCode);

      // Trigger Google Translate dropdown
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event("change"));
      } else {
        window.location.reload();
      }

      // Notify other listeners (e.g., ArticleAudioPlayer)
      window.dispatchEvent(
        new CustomEvent("smartmag_language_changed", {
          detail: { langCode },
        })
      );
    };

    // Global init handler
    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages:
                "en,bn,hi,es,fr,de,zh-CN,zh-TW,ja,ko,ar,pt,ru,it,nl,tr,vi,th,id,pl,mr,te,ta,gu,kn,pa,ur",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );

          // If a language was previously selected, apply it once element is ready
          const savedLang =
            localStorage.getItem("smartmag_user_lang") ||
            (document.cookie.match(/googtrans=\/(?:en|auto)\/([a-zA-Z_-]+)/) || [])[1];

          if (savedLang && savedLang !== "en") {
            setTimeout(() => {
              const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
              if (combo && combo.value !== savedLang) {
                combo.value = savedLang;
                combo.dispatchEvent(new Event("change"));
              }
            }, 500);
          }
        }
      } catch (err) {
        console.warn("Google Translate initialization note:", err);
      }
    };

    // If script is already in window, call init
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <>
      {/* Hidden offscreen container for Google Translate widget (NOT display:none) */}
      <div
        id="google_translate_element"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -999,
        }}
        aria-hidden="true"
      />
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
