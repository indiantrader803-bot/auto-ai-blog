'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useVip } from '@/context/VipAuthContext';

interface BiceaBannerProps {
  size?: '160x300' | '160x600' | '300x250' | '320x50' | '468x60' | '728x90' | 'native';
  className?: string;
}

export default function BiceaBanner({ size = '300x250', className = '' }: BiceaBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isVip } = useVip();
  const [isBotOrAdmin, setIsBotOrAdmin] = useState(false);

  const isTravel = Boolean(
    pathname?.startsWith('/travel') ||
    (typeof window !== 'undefined' && window.location.hostname.startsWith('travel.'))
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isAdmin = pathname?.startsWith('/admin');
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|mediapartners-google/i.test(
      navigator.userAgent || ''
    );
    setIsBotOrAdmin(Boolean(isAdmin || isBot));
  }, [pathname]);

  useEffect(() => {
    if (isVip || isBotOrAdmin || !containerRef.current) return;

    const el = containerRef.current;
    el.innerHTML = ''; // Clear previous content

    if (size === 'native') {
      const scriptUrl = isTravel
        ? 'https://bicea.org/21/472a6f9195501ee6c2f99c22d5eef506'
        : 'https://bicea.org/21/744a8c4c2b60a46144abf402929dbca8';

      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.dataset.adNetwork = 'bicea';
      el.appendChild(script);
      return;
    }

    // Display banner sizes
    // Dimensions mapping
    const [widthStr, heightStr] = size.split('x');
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);

    // Fallback/Sponsor container if ad is loaded inside standard dimensions
    const adBox = document.createElement('div');
    adBox.style.width = `${width}px`;
    adBox.style.height = `${height}px`;
    adBox.style.maxWidth = '100%';
    adBox.className = 'flex items-center justify-center overflow-hidden mx-auto';

    el.appendChild(adBox);
  }, [size, isTravel, isVip, isBotOrAdmin]);

  if (isVip || isBotOrAdmin) {
    return null;
  }

  return (
    <div
      className={`bicea-ad-container my-4 text-center overflow-hidden ${className}`}
      ref={containerRef}
      data-size={size}
    />
  );
}
