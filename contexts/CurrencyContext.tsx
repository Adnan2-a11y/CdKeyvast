"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
<<<<<<< HEAD

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

const CURRENCIES: CurrencyInfo[] = [
  { code: "EUR", symbol: "€", rate: 1 },
  { code: "USD", symbol: "$", rate: 1.08 },
  { code: "GBP", symbol: "£", rate: 0.86 },
  { code: "BDT", symbol: "৳", rate: 118.5 },
  { code: "INR", symbol: "₹", rate: 90.2 },
  { code: "SAR", symbol: "﷼", rate: 4.05 },
];

const STORAGE_KEY = "cdkeyvast_currency";

=======
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

>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
interface CurrencyContextType {
  currency: CurrencyInfo;
  currencies: CurrencyInfo[];
  setCurrency: (code: string) => void;
<<<<<<< HEAD
  convert: (eurPrice: number) => number;
  formatPrice: (eurPrice: number) => string;
=======
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  isLoading: boolean;
  error: string | null;
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

<<<<<<< HEAD
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(CURRENCIES[0]);

  // Hydrate from localStorage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      const found = CURRENCIES.find((c) => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  const setCurrency = useCallback((code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
=======
export { CurrencyContext };

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
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
    if (found) {
      setCurrencyState(found);
      localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

<<<<<<< HEAD
  const convert = useCallback((eurPrice: number) => eurPrice * currency.rate, [currency]);

  const formatPrice = useCallback(
    (eurPrice: number) => `${currency.symbol}${(eurPrice * currency.rate).toFixed(2)}`,
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, currencies: CURRENCIES, setCurrency, convert, formatPrice }}>
=======
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
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
      {children}
    </CurrencyContext.Provider>
  );
}
<<<<<<< HEAD

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
=======
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
