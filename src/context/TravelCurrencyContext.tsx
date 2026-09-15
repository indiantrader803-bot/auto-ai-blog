"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CurrencyInfo,
  SUPPORTED_CURRENCIES,
  CURRENCY_LIST,
  detectUserCurrency,
  convertCurrency,
  formatCurrency,
} from "@/lib/travel/currency";

interface TravelCurrencyContextType {
  currency: string;
  setCurrency: (code: string) => void;
  currencyInfo: CurrencyInfo;
  currencySymbol: string;
  allCurrencies: CurrencyInfo[];
  convertPrice: (amount: number, fromCode?: string) => number;
  formatPrice: (amount: number, fromCode?: string, showCode?: boolean) => string;
}

const TravelCurrencyContext = createContext<TravelCurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  currencyInfo: SUPPORTED_CURRENCIES.USD,
  currencySymbol: "$",
  allCurrencies: CURRENCY_LIST,
  convertPrice: (amount: number) => amount,
  formatPrice: (amount: number) => `$${amount}`,
});

export const TRAVEL_CURRENCY_STORAGE_KEY = "smartmag_travel_currency";

export function TravelCurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>("USD");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TRAVEL_CURRENCY_STORAGE_KEY);
      if (saved && SUPPORTED_CURRENCIES[saved]) {
        setCurrencyState(saved);
      } else {
        const detected = detectUserCurrency();
        setCurrencyState(detected);
      }
    } catch (_) {
      setCurrencyState("USD");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setCurrency = (code: string) => {
    const validCode = SUPPORTED_CURRENCIES[code] ? code : "USD";
    setCurrencyState(validCode);
    try {
      localStorage.setItem(TRAVEL_CURRENCY_STORAGE_KEY, validCode);
    } catch (_) {}
  };

  const currencyInfo = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
  const currencySymbol = currencyInfo.symbol;

  const convertPrice = (amount: number, fromCode: string = "INR"): number => {
    return convertCurrency(amount, fromCode, currency);
  };

  const formatPrice = (
    amount: number,
    fromCode: string = "INR",
    showCode: boolean = false
  ): string => {
    const converted = convertCurrency(amount, fromCode, currency);
    return formatCurrency(converted, currency, showCode);
  };

  return (
    <TravelCurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyInfo,
        currencySymbol,
        allCurrencies: CURRENCY_LIST,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </TravelCurrencyContext.Provider>
  );
}

export function useTravelCurrency() {
  return useContext(TravelCurrencyContext);
}
