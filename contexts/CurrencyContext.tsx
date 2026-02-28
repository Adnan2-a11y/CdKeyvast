"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

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

interface CurrencyContextType {
  currency: CurrencyInfo;
  currencies: CurrencyInfo[];
  setCurrency: (code: string) => void;
  convert: (eurPrice: number) => number;
  formatPrice: (eurPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

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
    if (found) {
      setCurrencyState(found);
      localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

  const convert = useCallback((eurPrice: number) => eurPrice * currency.rate, [currency]);

  const formatPrice = useCallback(
    (eurPrice: number) => `${currency.symbol}${(eurPrice * currency.rate).toFixed(2)}`,
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, currencies: CURRENCIES, setCurrency, convert, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
