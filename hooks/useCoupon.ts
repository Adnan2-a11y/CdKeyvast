"use client";

import { useState, useCallback } from "react";
import { applyCoupon as apiApplyCoupon } from "@/lib/api/woocommerce.client";
import { CartItem } from "@/types/woocommerce";

export interface UseCouponState {
  couponCode: string;
  isLoading: boolean;
  isApplied: boolean;
  error: string | null;
  discountAmount: number;
  discountPercentage?: number;
}

/**
 * Custom hook for managing coupon application
 * Can be used independently or with CouponContext
 */
export function useCouponInput() {
  const [state, setState] = useState<UseCouponState>({
    couponCode: "",
    isLoading: false,
    isApplied: false,
    error: null,
    discountAmount: 0,
  });

  const apply = useCallback(async (code: string, cartItems: CartItem[], cartTotal: number) => {
    if (!code.trim()) {
      setState((prev) => ({ ...prev, error: "Please enter a coupon code" }));
      return false;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log("📤 Sending coupon apply request:", {
        coupon_code: code.trim().toUpperCase(),
        cart_total: cartTotal,
        cart_items_count: cartItems.length,
      });

      const result = await apiApplyCoupon({
        coupon_code: code.trim().toUpperCase(),
        cart_items: cartItems,
        cart_total: cartTotal,
      });

      console.log("📥 Coupon apply response:", result);

      if (result.success) {
        console.log("✅ Coupon applied successfully:", {
          code: result.coupon_code,
          discount: result.discount_amount,
          new_total: result.new_total,
        });

        setState({
          couponCode: code.trim().toUpperCase(),
          isLoading: false,
          isApplied: true,
          error: null,
          discountAmount: result.discount_amount,
          discountPercentage:
            result.discount_type === "percent"
              ? parseFloat(result.discount_amount.toString()) / cartTotal * 100
              : undefined,
        });
        return true;
      } else {
        console.warn("❌ Coupon apply failed:", {
          code: code.trim().toUpperCase(),
          error: result.error,
          response: result,
        });

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: result.error || "Failed to apply coupon",
        }));
        return false;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to apply coupon";
      console.error("🚨 Coupon apply exception:", error);
      setState((prev) => ({ ...prev, isLoading: false, error: errorMsg }));
      return false;
    }
  }, []);

  const remove = useCallback(() => {
    setState({
      couponCode: "",
      isLoading: false,
      isApplied: false,
      error: null,
      discountAmount: 0,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    apply,
    remove,
    clearError,
  };
}
