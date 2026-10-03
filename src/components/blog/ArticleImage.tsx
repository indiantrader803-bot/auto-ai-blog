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
  // Bright, naturally lit, meaningful editorial photography & modern clean journalism style
  let styleContext = "bright natural daylight photography, clear airy atmosphere, soft sunlight, crisp focus, clean editorial journalism aesthetic, professional Hasselblad camera, 8k resolution, vibrant lifelike colors, no dark shadows";

  if (lower.includes("prop") || lower.includes("trad") || lower.includes("forex") || lower.includes("market") || lower.includes("stock") || lower.includes("finance") || lower.includes("ftm") || lower.includes("atlas")) {
    styleContext = "modern sunlit corporate trading desk with sleek monitors displaying clean colorful financial charts, bright natural morning daylight from large floor-to-ceiling office windows, contemporary glass architecture, crisp sharp photography, vibrant and professional";
  } else if (lower.includes("ai") || lower.includes("model") || lower.includes("llm") || lower.includes("claude") || lower.includes("gpt") || lower.includes("agent") || lower.includes("swarm")) {
    styleContext = "bright futuristic innovation lab with gleaming white architecture, clean crystalline holographic neural network diagrams, soft ambient daylight, modern clean tech photography, inspiring and transparent, vibrant cyan and warm gold accents";
  } else if (lower.includes("code") || lower.includes("engineer") || lower.includes("software") || lower.includes("dev") || lower.includes("api") || lower.includes("cloud") || lower.includes("server")) {
    styleContext = "bright modern Scandinavian software engineering workspace, warm natural daylight, oak wood desk with dual high-res screens showing clean modern code and UI, indoor greenery, crisp depth of field, inviting and bright";
  } else if (lower.includes("security") || lower.includes("privacy") || lower.includes("safe") || lower.includes("defense")) {
    styleContext = "bright high-tech corporate cybersecurity control room, clean white and bright blue lighting, pristine glass interfaces, crystalline security architecture diagrams, professional daylight aesthetic";
  } else if (lower.includes("gadget") || lower.includes("hardware") || lower.includes("phone") || lower.includes("apple") || lower.includes("chip") || lower.includes("nvidia")) {
    styleContext = "premium commercial product photography on a clean light marble surface, soft natural studio lightbox illumination, pristine reflections, crisp macro details, luxurious and bright";
  } else if (lower.includes("travel") || lower.includes("expedition") || lower.includes("flight") || lower.includes("destination") || lower.includes("hotel")) {
    styleContext = "breathtaking panoramic travel photography, golden morning sunlight, crystal clear azure waters and lush green landscapes, vibrant natural daylight, National Geographic magazine cover quality";
  } else if (lower.includes("game") || lower.includes("gaming") || lower.includes("unreal")) {
    styleContext = "vibrant next-gen game environment, bright golden hour sunlight, majestic open world landscape, Unreal Engine 5.5 photorealism, crystal clear skies, colorful and uplifting";
  } else if (lower.includes("animation") || lower.includes("anime") || lower.includes("art") || lower.includes("music")) {
    styleContext = "vibrant artistic studio scene, bright daylight pouring through artist loft windows, colorful palettes, inspiring modern creative atmosphere, rich warm natural light";
  }

  const prompt = `award-winning bright editorial photograph illustrating ${cleanTitle}, ${styleContext}, clean composition, 16:9 widescreen, crystal clear focus, bright and inviting, no dark moody shadows, no watermarks`;
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
      const prompt = `award winning bright editorial photography illustrating ${alt.slice(0, 50)}, soft natural morning sunlight, clean bright background, vibrant colors, crystal clear 8k focus`;
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

