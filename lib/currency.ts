"use client";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
];

export const DEFAULT_CURRENCY = CURRENCIES[0]; // USD

export const STORAGE_KEY = "selected_currency";

// Exchange rate API configuration
export const EXCHANGE_RATE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// Fallback rates in case API fails (relative to USD)
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  BDT: 109.5,
};

// Utility to get currency info by code
export function getCurrencyByCode(code: string): CurrencyInfo | undefined {
  return CURRENCIES.find(currency => currency.code === code);
}

// Format price with currency symbol
export function formatPrice(amount: number, currency: CurrencyInfo): string {
  return `${currency.symbol}${amount.toFixed(2)}`;
}

// Convert price from USD to target currency
export function convertPrice(usdPrice: number, rate: number): number {
  return usdPrice * rate;
}

// Auto-detect currency based on user's location
export async function detectUserCurrency(): Promise<string> {
  try {
    // Use ipapi.co for IP-based geolocation (free tier)
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    // Map country to currency
    const countryCurrencyMap: Record<string, string> = {
      US: "USD",
      GB: "GBP",
      DE: "EUR",
      FR: "EUR",
      IT: "EUR",
      ES: "EUR",
      BD: "BDT",
      // Add more mappings as needed
    };

    const detectedCurrency = countryCurrencyMap[data.country_code] || "USD";
    return detectedCurrency;
  } catch (error) {
    console.warn("Failed to detect user currency:", error);
    return "USD";
  }
}