"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, MessageSquare, X, ChevronRight, Volume2, HelpCircle } from "lucide-react";

interface SmartCompanionProps {
  onOpenAssistant?: () => void;
}

export default function SmartCompanion3D({ onOpenAssistant }: SmartCompanionProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [bubbleText, setBubbleText] = useState<string>("Hi! I'm Sparky, your AI reading guide ✨");
  const [showBubble, setShowBubble] = useState(true);
  const [position, setPosition] = useState({ x: 28, y: 120 }); // offset from bottom-right (px)
  const [isPatrolling, setIsPatrolling] = useState(true);

  // Disable on admin pages for clean editor focus
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Context-aware speech bubbles based on what the user is reading
  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout;

    if (pathname === "/") {
      setBubbleText("Exploring top stories? Click me for quick summaries & live markets 📈");
    } else if (pathname?.startsWith("/blog/")) {
      setBubbleText("Need key takeaways or code breakdown? Tap me anytime! 💡");
    } else if (pathname?.startsWith("/apple")) {
      setBubbleText("Looking for the latest Apple M5 specs & best prices? Ask me! 🍎");
    } else if (pathname?.startsWith("/trade") || pathname?.startsWith("/best-prop-firms")) {
      setBubbleText("Need coupon codes for FTM or Atlas Funded? I have them! 💰");
    } else if (pathname?.startsWith("/travel")) {
      setBubbleText("Need an instant trip itinerary or cheap flight radar? Let's plan! ✈️");
    } else {
      setBubbleText("How can I help you today? Ask me anything about this page ✨");
    }

    setShowBubble(true);
    timer = setTimeout(() => {
      setShowBubble(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, [pathname, mounted]);

  // Smooth floating motion across the page when reading/scrolling
  useEffect(() => {
    if (!mounted || !isPatrolling || isHovered) return;

    const interval = setInterval(() => {
      // Gentle floating physics along the right side margin
      const randomY = 90 + Math.sin(Date.now() / 2500) * 45;
      const randomX = 24 + Math.cos(Date.now() / 3200) * 12;
      setPosition({ x: randomX, y: randomY });
    }, 150);

    return () => clearInterval(interval);
  }, [mounted, isPatrolling, isHovered]);

  if (!mounted || isAdmin || isMinimized) return null;

  const handleLaunchAI = () => {
    if (onOpenAssistant) {
      onOpenAssistant();
    } else {
      // Dispatch event to GlobalBlogAssistant
      window.dispatchEvent(new CustomEvent("open-smarttravel-chat"));
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: `${position.x}px`,
        bottom: `${position.y}px`,
        zIndex: 990,
        transition: "bottom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), right 0.8s ease-out",
      }}
      className="select-none pointer-events-auto"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowBubble(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Interactive Speech Balloon */}
      {showBubble && (
        <div className="absolute right-0 bottom-full mb-3 w-56 sm:w-64 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xl shadow-indigo-500/20 text-slate-800 dark:text-slate-100 text-xs animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-start justify-between gap-1 mb-1">
            <span className="font-black text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              SmartMag Companion
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="leading-relaxed font-medium">{bubbleText}</p>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handleLaunchAI}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Ask AI Agent</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <span className="text-[9px] text-slate-400">Click bot to talk</span>
          </div>

          {/* Speech bubble pointer */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/95 dark:bg-slate-900/95 border-r border-b border-indigo-200/80 dark:border-indigo-800/80 transform rotate-45" />
        </div>
      )}

      {/* 3D Animated Character Container */}
      <div
        onClick={handleLaunchAI}
        role="button"
        tabIndex={0}
        aria-label="Ask AI Companion"
        className="relative group cursor-pointer"
      >
        {/* Soft 3D Energy Aura / Halo */}
        <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-lg group-hover:blur-xl group-hover:scale-125 transition-all duration-500 animate-pulse" />

        {/* 3D Isometric Robot Avatar with Dynamic SVG Layers */}
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 transition-transform duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-active:scale-95">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 15px 25px rgba(99, 102, 241, 0.45))",
            }}
          >
            <defs>
              {/* Metallic Head Gradients */}
              <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#e0e7ff" />
                <stop offset="70%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>

              {/* Visor Cyan Neon Gradient */}
              <linearGradient id="neonVisor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>

              {/* Ear Pod Gradients */}
              <linearGradient id="earPod" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>

              {/* Jet Thruster Glow */}
              <radialGradient id="thrusterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Floating Energy Thruster (Flame & Particles) */}
            <g className="animate-pulse">
              <ellipse cx="60" cy="104" rx="14" ry="6" fill="url(#thrusterGlow)" />
              <path
                d="M 52 98 Q 60 115 68 98 Z"
                fill="#38bdf8"
                className="opacity-90"
              />
            </g>

            {/* Robot Floating Torso */}
            <path
              d="M 46 82 L 74 82 L 68 98 L 52 98 Z"
              fill="url(#metalBody)"
              stroke="#312e81"
              strokeWidth="2"
            />
            <circle cx="60" cy="90" r="3.5" fill="#38bdf8" />

            {/* Hover Floating Bob Head Group */}
            <g>
              {/* Antenna */}
              <line
                x1="60"
                y1="34"
                x2="60"
                y2="20"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="17" r="5" fill="#f43f5e">
                <animate
                  attributeName="fill"
                  values="#f43f5e;#38bdf8;#f59e0b;#f43f5e"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Left & Right Audio Ear Pods */}
              <rect x="22" y="48" width="8" height="22" rx="4" fill="url(#earPod)" />
              <rect x="90" y="48" width="8" height="22" rx="4" fill="url(#earPod)" />

              {/* Spherical Robot Head Base */}
              <rect
                x="28"
                y="34"
                width="64"
                height="50"
                rx="24"
                fill="url(#metalBody)"
                stroke="#3730a3"
                strokeWidth="2.5"
              />

              {/* Shiny Glass Highlight on Head */}
              <path
                d="M 36 40 Q 60 36 84 40"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
                fill="none"
              />

              {/* Digital Curved Visor (Dark Screen) */}
              <rect
                x="35"
                y="46"
                width="50"
                height="28"
                rx="12"
                fill="#0f172a"
                stroke="#1e1b4b"
                strokeWidth="1.5"
              />

              {/* Futuristic Cyber Eyes (Blinking & Animated) */}
              <g>
                <ellipse cx="48" cy="60" rx="5" ry="6.5" fill="url(#neonVisor)">
                  <animate
                    attributeName="ry"
                    values="6.5;6.5;0.5;6.5"
                    keyTimes="0;0.92;0.96;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                <ellipse cx="72" cy="60" rx="5" ry="6.5" fill="url(#neonVisor)">
                  <animate
                    attributeName="ry"
                    values="6.5;6.5;0.5;6.5"
                    keyTimes="0;0.92;0.96;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                {/* Cheerful Mouth Curve */}
                <path
                  d="M 55 67 Q 60 70 65 67"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Head Highlights / Reflections */}
              <ellipse cx="45" cy="50" rx="3" ry="1.5" fill="#ffffff" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Floating Mini Status Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900/90 text-white border border-indigo-500/50 shadow-md text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Guide</span>
        </div>
      </div>
    </div>
  );
}
