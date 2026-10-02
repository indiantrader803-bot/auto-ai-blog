"use client";

import { useEffect, useRef } from "react";

interface Props {
  slug: string;
  title: string;
}

export default function ArticleTracker({ slug, title }: Props) {
  const trackedDepths = useRef<Set<number>>(new Set());
  const dwellTimers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!slug) return;

    // 1. Initial Page View tracking
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "PAGE_VIEW",
          slug,
          referrer: document.referrer || "direct",
          metadata: {
            title,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
            screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : undefined,
          },
        }),
      }).catch(() => {});
    } catch (_) {}

    // 2. Scroll Depth Milestone Tracking (25%, 50%, 75%, 100%)
    const handleScroll = () => {
      try {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const scrollPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
        const milestones = [25, 50, 75, 100];

        milestones.forEach((milestone) => {
          if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
            trackedDepths.current.add(milestone);
            fetch("/api/analytics/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                eventType: "SCROLL_DEPTH",
                slug,
                referrer: document.referrer || "direct",
                metadata: {
                  title,
                  milestone: `${milestone}%`,
                  scrollPercent,
                },
              }),
            }).catch(() => {});
          }
        });
      } catch (_) {}
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Reader Dwell Time Tracking (15s, 45s, 90s, 180s)
    const dwellMilestones = [
      { seconds: 15, label: "15s Quick Read" },
      { seconds: 45, label: "45s Engaged Reader" },
      { seconds: 90, label: "90s Deep Reader" },
      { seconds: 180, label: "3m Complete Read" },
    ];

    dwellMilestones.forEach(({ seconds, label }) => {
      const timer = setTimeout(() => {
        try {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventType: "DWELL_TIME",
              slug,
              referrer: document.referrer || "direct",
              metadata: {
                title,
                dwellSeconds: seconds,
                engagementTier: label,
              },
            }),
          }).catch(() => {});
        } catch (_) {}
      }, seconds * 1000);

      dwellTimers.current.push(timer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      dwellTimers.current.forEach((t) => clearTimeout(t));
      dwellTimers.current = [];
    };
  }, [slug, title]);

  return null;
}
