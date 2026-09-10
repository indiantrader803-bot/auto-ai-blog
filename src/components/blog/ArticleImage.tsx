"use client";

import { useState } from "react";

function getTopicSpecificAiImage(altOrTitle: string): string {
  const cleanTitle = (altOrTitle || "Modern Technology & Markets")
    .replace(/[^\w\s-]/gi, " ")
    .trim()
    .slice(0, 65);

  const hash = Math.abs(
    cleanTitle.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );

  const prompt = `editorial 4k cinematic photo of ${cleanTitle}, modern magazine aesthetic, photorealistic 8k render, studio lighting, hyper detailed, 16:9 aspect ratio`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&seed=${hash}&nologo=true`;
}

interface ArticleImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export default function ArticleImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  loading = "lazy",
}: ArticleImageProps) {
  // If no src is given or it's the generic default, generate a distinct topic-matched AI visual
  const initialSource =
    src && !src.includes("photo-1618005182384-a83a8bd57fbe")
      ? src
      : getTopicSpecificAiImage(alt);

  const [imgSrc, setImgSrc] = useState<string>(initialSource);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      // Fallback 1: Topic-specific high quality Pollinations AI image
      setImgSrc(getTopicSpecificAiImage(alt));
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Fallback 2: Dynamic Seeded High-Resolution AI Wallpaper
      const hash = Math.abs(
        alt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      );
      const prompt = `award winning high resolution digital art representing ${alt.slice(0, 50)}, volumetric light, cinematic, 8k`;
      setImgSrc(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&seed=${hash + 42}&nologo=true`);
      setErrorCount(2);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
}
