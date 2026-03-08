"use client";

import { useState, useEffect } from "react";
import { Loader2, Check, X, TicketX } from "lucide-react";
import { useCouponInput } from "@/hooks/useCoupon";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/types/woocommerce";

interface CouponInputProps {
  items: CartItem[];
  cartTotal: number;
  onCouponApplied?: (discountAmount: number) => void;
  onCouponRemoved?: () => void;
}

/**
 * Professional Coupon Input Component
 * Features:
 * - Real-time validation feedback
 * - Loading states
 * - Error handling
 * - Remove coupon option
 * - Accessible form
 */
export function CouponInput({
  items,
  cartTotal,
  onCouponApplied,
  onCouponRemoved,
}: CouponInputProps) {
  const [inputValue, setInputValue] = useState("");
  const { applyDiscount, removeDiscount } = useCart();
  const {
    couponCode,
    isLoading,
    isApplied,
    error,
    discountAmount,
    discountPercentage,
    apply,
    remove,
    clearError,
  } = useCouponInput();

  // Sync coupon state with cart context
  useEffect(() => {
    if (isApplied && discountAmount > 0) {
      applyDiscount(discountAmount, couponCode);
    }
  }, [isApplied, discountAmount, couponCode, applyDiscount]);

  const handleApply = async () => {
    clearError();
    
    // Debug logging
    console.log("🎟️ Applying coupon:", {
      code: inputValue,
      items_count: items.length,
      cart_total: cartTotal,
      item_details: items.map(i => ({
        product_id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        item_total: i.product.price * i.quantity,
      })),
    });

    const success = await apply(inputValue, items, cartTotal);
    if (success) {
      setInputValue("");
      onCouponApplied?.(discountAmount);
    }
  };

  const handleRemove = () => {
    remove();
    removeDiscount();
    setInputValue("");
    onCouponRemoved?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && !isApplied) {
      handleApply();
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <TicketX className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">Coupon Code</h3>
      </div>

      {!isApplied ? (
        <div className="space-y-2">
          {/* Input and Button Row */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value.toUpperCase());
                clearError();
              }}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isLoading
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-900 border-gray-300"
              } ${error ? "border-red-300" : ""}`}
              aria-label="Coupon code"
              aria-invalid={!!error}
              aria-describedby={error ? "coupon-error" : undefined}
            />
            <button
              onClick={handleApply}
              disabled={isLoading || !inputValue.trim()}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isLoading || !inputValue.trim()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
              }`}
              aria-busy={isLoading}
              aria-label="Apply coupon"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Applying...</span>
                </span>
              ) : (
                "Apply"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              id="coupon-error"
              className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md"
              role="alert"
            >
              <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Helper Text */}
          <p className="text-xs text-gray-500">
            Enter a valid coupon code to receive a discount on your purchase
          </p>
        </div>
      ) : (
        /* Applied State */
        <div className="space-y-3">
          {/* Success Banner */}
          <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">
                Coupon Applied Successfully
              </p>
              <p className="text-sm text-green-700 mt-0.5">
                Code: <span className="font-semibold">{couponCode}</span>
              </p>
            </div>
          </div>

          {/* Discount Details */}
          <div className="bg-white border border-gray-200 rounded-md p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Discount Amount:</span>
              <span className="text-sm font-semibold text-red-600">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
            {discountPercentage !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Discount:</span>
                <span className="text-sm font-medium text-gray-900">
                  {discountPercentage.toFixed(1)}%
                </span>
              </div>
            )}
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Remove coupon"
          >
            Remove Coupon
          </button>
        </div>
      )}
    </div>
  );
}

export default CouponInput;
