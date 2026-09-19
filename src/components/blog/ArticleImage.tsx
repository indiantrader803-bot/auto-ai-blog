"use client";

import { useState } from "react";

function getTopicSpecificAiImage(altOrTitle: string): string {
  const cleanTitle = (altOrTitle || "Frontier Technology & Financial Markets")
    .replace(/[^\w\s-]/gi, " ")
    .trim()
    .slice(0, 70);

  // Deterministic seed for reproducible, high-quality images per article
  const hash = Math.abs(
    cleanTitle.split("").reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0)
  );

  const lower = cleanTitle.toLowerCase();
  let styleContext = "award-winning editorial journalism photography, Hasselblad medium format, cinematic lighting, 8k resolution, ultra realistic";

  if (lower.includes("prop") || lower.includes("trad") || lower.includes("forex") || lower.includes("market") || lower.includes("stock") || lower.includes("finance") || lower.includes("ftm") || lower.includes("atlas")) {
    styleContext = "modern quantitative trading floor with high-definition financial candlestick charts on curved screens, dark atmospheric lighting, Wall Street Bloomberg terminal aesthetic, photorealistic 8k";
  } else if (lower.includes("ai") || lower.includes("model") || lower.includes("llm") || lower.includes("claude") || lower.includes("gpt") || lower.includes("agent") || lower.includes("swarm")) {
    styleContext = "futuristic neural intelligence optical processor chip, glowing photonic laser circuits, ultra-detailed quantum computing hardware photography, cinematic cyberpunk lighting";
  } else if (lower.includes("code") || lower.includes("engineer") || lower.includes("software") || lower.includes("dev") || lower.includes("api") || lower.includes("cloud") || lower.includes("server")) {
    styleContext = "sleek minimalist multi-monitor developer workstation in modern glass architecture office at twilight, neon code telemetry, hyper-detailed photography";
  } else if (lower.includes("security") || lower.includes("hack") || lower.includes("privacy") || lower.includes("safe")) {
    styleContext = "advanced cybersecurity data defense matrix, glowing digital firewall shields, biometric cryptography, moody cinematic lighting";
  } else if (lower.includes("gadget") || lower.includes("hardware") || lower.includes("phone") || lower.includes("apple") || lower.includes("chip") || lower.includes("nvidia")) {
    styleContext = "luxury industrial product photography, machined aerospace titanium and glass chassis, clean studio lighting, 8k commercial magazine quality";
  }

  const prompt = `editorial 4k visual of ${cleanTitle}, ${styleContext}, 16:9 widescreen, hyper realistic, no watermarks, master photography`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&seed=${hash}&nologo=true`;
}

interface ArticleImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

export default function ArticleImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  loading = "lazy",
  priority = false,
}: ArticleImageProps) {
  // If no src is given or it's a generic static placeholder, generate a bespoke topic-matched visual
  const isGeneric =
    !src ||
    src.includes("photo-1618005182384-a83a8bd57fbe") ||
    src.includes("placeholder") ||
    src.includes("dummy");

  const initialSource = isGeneric ? getTopicSpecificAiImage(alt) : src;

  const [imgSrc, setImgSrc] = useState<string>(initialSource);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      // Fallback 1: Topic-specific high quality Pollinations AI image
      setImgSrc(getTopicSpecificAiImage(alt));
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Fallback 2: Deterministic High-Resolution Art Visual
      const hash = Math.abs(
        alt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      );
      const prompt = `award winning high resolution digital art representing ${alt.slice(0, 50)}, volumetric light, cinematic, 8k`;
      setImgSrc(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&seed=${hash + 101}&nologo=true`);
      setErrorCount(2);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={1200}
      height={675}
      decoding="async"
      loading={priority ? "eager" : loading}
      // @ts-ignore
      fetchPriority={priority ? "high" : "auto"}
      className={`${className} aspect-video`}
      onError={handleError}
    />
  );
}

