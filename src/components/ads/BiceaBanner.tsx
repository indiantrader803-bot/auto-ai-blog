'use client';

import React from 'react';

interface BiceaBannerProps {
  size?: '160x300' | '160x600' | '300x250' | '320x50' | '468x60' | '728x90' | 'native';
  className?: string;
}

/**
 * Clean banner stub. Intrusive bicea.org scripts have been disabled.
 */
export default function BiceaBanner({ className = '' }: BiceaBannerProps) {
  return null;
}
