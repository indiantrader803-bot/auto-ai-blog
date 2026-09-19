"use client";

import { useEffect, useRef } from "react";

interface GoogleAdUnitProps {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAdUnit({
  slotId = "default-slot",
  format = "auto",
  responsive = true,
  className = "",
  style = { display: "block" },
}: GoogleAdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !isLoadedRef.current) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoadedRef.current = true;
      }
    } catch (err) {
      console.warn("Google AdSense notice:", err);
    }
  }, []);

  return (
    <div className={`my-6 flex justify-center items-center overflow-hidden min-h-[90px] [contain:layout] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9768860457233655"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
