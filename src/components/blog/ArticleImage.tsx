"use client";

import { useState } from "react";

const RELIABLE_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
];

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
  const [imgSrc, setImgSrc] = useState<string>(
    src || RELIABLE_FALLBACK_IMAGES[0]
  );
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount < RELIABLE_FALLBACK_IMAGES.length) {
      // Pick next deterministic fallback based on alt string hash
      const hash = Math.abs(
        alt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      );
      const nextIndex = (hash + errorCount) % RELIABLE_FALLBACK_IMAGES.length;
      setImgSrc(RELIABLE_FALLBACK_IMAGES[nextIndex]);
      setErrorCount((prev) => prev + 1);
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
