"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Coupon } from "@/types/woocommerce";

export interface CouponContextType {
  coupon: Coupon | null;
  discountAmount: number;
  isApplying: boolean;
  error: string | null;
  applyCoupon: (code: string, cartItems: any[], cartTotal: number) => Promise<boolean>;
  removeCoupon: () => void;
  clearError: () => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyCoupon = useCallback(
    async (code: string, cartItems: any[], cartTotal: number): Promise<boolean> => {
      setIsApplying(true);
      setError(null);

      try {
        const response = await fetch("/api/coupons/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            coupon_code: code,
            cart_items: cartItems,
            cart_total: cartTotal,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.error || "Failed to apply coupon");
          return false;
        }

        // Fetch full coupon details
        const couponResponse = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}`);
        const couponData = await couponResponse.json();

        if (couponData.coupon) {
          setCoupon(couponData.coupon);
          setDiscountAmount(data.discount_amount);
          return true;
        }

        return false;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to apply coupon";
        setError(errorMsg);
        return false;
      } finally {
        setIsApplying(false);
      }
    },
    []
  );

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    setDiscountAmount(0);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <CouponContext.Provider
      value={{
        coupon,
        discountAmount,
        isApplying,
        error,
        applyCoupon,
        removeCoupon,
        clearError,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

/**
 * Hook to use coupon functionality
 */
export function useCoupon() {
  const ctx = useContext(CouponContext);
  if (!ctx) {
    throw new Error("useCoupon must be used within CouponProvider");
  }
  return ctx;
}
