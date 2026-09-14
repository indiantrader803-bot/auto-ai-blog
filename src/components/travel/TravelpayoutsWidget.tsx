"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface TravelpayoutsWidgetProps {
  scriptSrc: string;
  minHeight?: string;
  className?: string;
  title?: string;
}

export default function TravelpayoutsWidget({
  scriptSrc,
  minHeight = "280px",
  className = "",
  title,
}: TravelpayoutsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // Normalize script URL if it starts with //
  const normalizedSrc = scriptSrc.startsWith("//") ? `https:${scriptSrc}` : scriptSrc;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous widget content to avoid duplicate rendering on re-renders
    container.innerHTML = "";
    setIsLoading(true);

    const script = document.createElement("script");
    script.src = normalizedSrc;
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      setIsLoading(false);
      setHasLoaded(true);
    };

    script.onerror = () => {
      setIsLoading(false);
    };

    container.appendChild(script);

    // Timeout safety fallback in case script doesn't fire standard onload
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoaded(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [normalizedSrc]);

  return (
    <div className={`relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-4 sm:p-6 overflow-hidden ${className}`}>
      {title && (
        <div className="mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-serif">
            {title}
          </h4>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Live Partner Engine
          </span>
        </div>
      )}

      {isLoading && (
        <div
          className="flex flex-col items-center justify-center gap-3 py-12 text-slate-400 dark:text-slate-500"
          style={{ minHeight }}
        >
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="text-xs font-semibold">Loading real-time travel search engine...</span>
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full transition-opacity duration-300 ${isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}
        style={{ minHeight: isLoading ? "0px" : minHeight }}
      />
    </div>
  );
}
