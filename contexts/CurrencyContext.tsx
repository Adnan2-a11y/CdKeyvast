"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CurrencyInfo,
  CURRENCIES,
  DEFAULT_CURRENCY,
  STORAGE_KEY,
  EXCHANGE_RATE_API_URL,
  FALLBACK_RATES,
  getCurrencyByCode,
  detectUserCurrency,
} from "@/lib/currency";

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: CurrencyInfo;
  currencies: CurrencyInfo[];
  setCurrency: (code: string) => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  isLoading: boolean;
  error: string | null;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);


// Fetch exchange rates
async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(EXCHANGE_RATE_API_URL);
    if (!response.ok) throw new Error("Failed to fetch exchange rates");

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.warn("Exchange rate API failed, using fallback rates:", error);
    return FALLBACK_RATES;
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(DEFAULT_CURRENCY);

  // Fetch exchange rates with React Query for caching
  const {
    data: rates = FALLBACK_RATES,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });

  // Auto-detect and load currency on mount
  useEffect(() => {
    const initializeCurrency = async () => {
      if (typeof window === "undefined") return;

      // Check localStorage first
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && getCurrencyByCode(saved)) {
        setCurrencyState(getCurrencyByCode(saved)!);
        return;
      }

      // Auto-detect if no saved currency
      try {
        const detectedCode = await detectUserCurrency();
        const detectedCurrency = getCurrencyByCode(detectedCode);
        if (detectedCurrency) {
          setCurrencyState(detectedCurrency);
          localStorage.setItem(STORAGE_KEY, detectedCode);
        }
      } catch (error) {
        console.warn("Failed to auto-detect currency:", error);
      }
    };

    initializeCurrency();
  }, []);

  const setCurrency = useCallback((code: string) => {
    const found = getCurrencyByCode(code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

  const convertPrice = useCallback(
    (usdPrice: number) => {
      const rate = rates[currency.code] || 1;
      return usdPrice * rate;
    },
    [currency.code, rates]
  );

  const formatPrice = useCallback(
    (usdPrice: number) => {
      const converted = convertPrice(usdPrice);
      return `${currency.symbol}${converted.toFixed(2)}`;
    },
    [currency, convertPrice]
  );

  const contextValue: CurrencyContextType = {
    currency,
    currencies: CURRENCIES,
    setCurrency,
    convertPrice,
    formatPrice,
    isLoading,
    error: error ? "Failed to load exchange rates" : null,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}
