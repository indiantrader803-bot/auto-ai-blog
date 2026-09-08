"use client";

import { useEffect } from "react";

interface Props {
  slug: string;
  title: string;
}

export default function ArticleTracker({ slug, title }: Props) {
  useEffect(() => {
    if (!slug) return;

    // Dispatch real page view event with referrer
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "PAGE_VIEW",
          slug,
          referrer: document.referrer || "direct",
          metadata: { title },
        }),
      }).catch(() => {});
    } catch (_) {}
  }, [slug, title]);

  return null;
}
