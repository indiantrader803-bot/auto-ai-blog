"use client";

import { useState, useEffect } from "react";

// Curated high-availability, instant-loading CDN visuals for every editorial pillar
const TOPIC_PHOTO_POOLS: Record<string, string[]> = {
  finance: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&auto=format&fit=crop&q=80",
  ],
  ai: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
  ],
  dev: [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
  ],
  hardware: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1567591414240-e223c6f4553b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
  ],
  travel: [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=1200&auto=format&fit=crop&q=80",
  ],
  defense: [
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f4?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
  ],
  gaming: [
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
  ],
  anime: [
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80",
  ],
  entertainment: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
  ],
  general: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80",
  ],
};

function getBespokeArticleImage(titleOrAlt: string): string {
  const text = (titleOrAlt || "TheSmartMag Editorial Article").toLowerCase();
  const hash = Math.abs(
    titleOrAlt.split("").reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0)
  );

  let pool = TOPIC_PHOTO_POOLS.general;
  if (
    text.includes("trad") ||
    text.includes("prop") ||
    text.includes("forex") ||
    text.includes("market") ||
    text.includes("stock") ||
    text.includes("finance") ||
    text.includes("nifty") ||
    text.includes("sensex") ||
    text.includes("crypto") ||
    text.includes("ftm") ||
    text.includes("atlas")
  ) {
    pool = TOPIC_PHOTO_POOLS.finance;
  } else if (
    text.includes("ai") ||
    text.includes("gpt") ||
    text.includes("claude") ||
    text.includes("llm") ||
    text.includes("model") ||
    text.includes("swarm") ||
    text.includes("agent") ||
    text.includes("deepseek") ||
    text.includes("neural")
  ) {
    pool = TOPIC_PHOTO_POOLS.ai;
  } else if (
    text.includes("code") ||
    text.includes("dev") ||
    text.includes("engineer") ||
    text.includes("typescript") ||
    text.includes("python") ||
    text.includes("software") ||
    text.includes("microservice") ||
    text.includes("cloud") ||
    text.includes("server")
  ) {
    pool = TOPIC_PHOTO_POOLS.dev;
  } else if (
    text.includes("apple") ||
    text.includes("iphone") ||
    text.includes("macbook") ||
    text.includes("chip") ||
    text.includes("nvidia") ||
    text.includes("gadget") ||
    text.includes("hardware") ||
    text.includes("watch") ||
    text.includes("airpods")
  ) {
    pool = TOPIC_PHOTO_POOLS.hardware;
  } else if (
    text.includes("travel") ||
    text.includes("destination") ||
    text.includes("hotel") ||
    text.includes("trip") ||
    text.includes("itinerary") ||
    text.includes("flight") ||
    text.includes("tour") ||
    text.includes("beach") ||
    text.includes("manali") ||
    text.includes("goa") ||
    text.includes("kerala")
  ) {
    pool = TOPIC_PHOTO_POOLS.travel;
  } else if (
    text.includes("defence") ||
    text.includes("defense") ||
    text.includes("missile") ||
    text.includes("radar") ||
    text.includes("s-400") ||
    text.includes("patriot") ||
    text.includes("iron dome") ||
    text.includes("kusha") ||
    text.includes("aerospace") ||
    text.includes("military")
  ) {
    pool = TOPIC_PHOTO_POOLS.defense;
  } else if (
    text.includes("game") ||
    text.includes("gaming") ||
    text.includes("playstation") ||
    text.includes("ps5") ||
    text.includes("xbox") ||
    text.includes("nintendo") ||
    text.includes("gta") ||
    text.includes("esport")
  ) {
    pool = TOPIC_PHOTO_POOLS.gaming;
  } else if (
    text.includes("anime") ||
    text.includes("manga") ||
    text.includes("animation") ||
    text.includes("cartoon") ||
    text.includes("ghibli") ||
    text.includes("jujutsu") ||
    text.includes("one piece")
  ) {
    pool = TOPIC_PHOTO_POOLS.anime;
  } else if (
    text.includes("tv") ||
    text.includes("movie") ||
    text.includes("cinema") ||
    text.includes("netflix") ||
    text.includes("ott") ||
    text.includes("streaming") ||
    text.includes("music") ||
    text.includes("song") ||
    text.includes("celebrity") ||
    text.includes("hollywood") ||
    text.includes("album")
  ) {
    pool = TOPIC_PHOTO_POOLS.entertainment;
  }

  const index = hash % pool.length;
  return pool[index];
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
  // If no src is given or it's the repetitive old placeholder or pollations-blocked URL, resolve a unique topic image
  const isRepetitiveOrGeneric =
    !src ||
    src.includes("photo-1618005182384-a83a8bd57fbe") ||
    src.includes("placeholder") ||
    src.includes("dummy");

  const resolvedSource = isRepetitiveOrGeneric ? getBespokeArticleImage(alt) : src;

  const [imgSrc, setImgSrc] = useState<string>(resolvedSource);
  const [hasError, setHasError] = useState(false);

  // Sync state if src or alt changes on navigation
  useEffect(() => {
    const updated = isRepetitiveOrGeneric ? getBespokeArticleImage(alt) : src;
    if (updated) {
      setImgSrc(updated);
      setHasError(false);
    }
  }, [src, alt, isRepetitiveOrGeneric]);

  const handleError = () => {
    if (!hasError) {
      // Guaranteed instant fallback to a distinct topic image from our CDN pool
      const fallback = getBespokeArticleImage(alt + " fallback");
      setImgSrc(fallback);
      setHasError(true);
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
