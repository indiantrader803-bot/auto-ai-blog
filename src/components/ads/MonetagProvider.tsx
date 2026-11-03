"use client";

import React, { createContext, useContext } from 'react';

// Monetag has been completely removed across the entire site.
// Clean stub provider returning children directly with zero external scripts.
interface MonetagContextType {
  hasVignetteFired: boolean;
}

const MonetagContext = createContext<MonetagContextType>({ hasVignetteFired: false });
export const useMonetagContext = () => useContext(MonetagContext);

export default function MonetagProvider({ children }: { children: React.ReactNode }) {
  return (
    <MonetagContext.Provider value={{ hasVignetteFired: false }}>
      {children}
    </MonetagContext.Provider>
  );
}
