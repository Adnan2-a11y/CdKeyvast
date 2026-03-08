import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/api/woocommerce.server";
import { CartItem, ApplyCouponPayload } from "@/types/woocommerce";
import { logger } from "@/lib/logger";

/**
 * POST /api/coupons/apply
 * Validate coupon against cart and calculate discount
 * Server-side validation for security
 * 
 * Request body:
 * {
 *   "coupon_code": "SAVE10",
 *   "cart_items": [{ product: {...}, quantity: 2 }],
 *   "cart_total": 99.99
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json() as ApplyCouponPayload;
    const { coupon_code, cart_items, cart_total } = body;

    // Debug logging
    logger.debug("api/coupons/apply", "Request received", {
      coupon_code,
      cart_total,
      cart_items_count: cart_items?.length,
    });

    // Validation: coupon code
    if (!coupon_code || typeof coupon_code !== "string" || coupon_code.trim() === "") {
      logger.warn("api/coupons/apply", "Invalid coupon code");
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    // Validation: cart items
    if (!Array.isArray(cart_items) || cart_items.length === 0) {
      logger.warn("api/coupons/apply", "Cart is empty");
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 400 }
      );
    }

    // Validation: cart total
    if (typeof cart_total !== "number" || cart_total <= 0) {
      logger.warn("api/coupons/apply", "Invalid cart total", { cart_total, type: typeof cart_total });
      return NextResponse.json(
        { error: "Invalid cart total" },
        { status: 400 }
      );
    }

    // Server-side validation with comprehensive checks
    const validation = await validateCoupon(coupon_code, cart_items as CartItem[], cart_total);

    if (!validation.valid) {
      const duration = Date.now() - startTime;
      logger.warn("api/coupons/apply", `Validation failed (${duration}ms)`, {
        coupon_code,
        reason: validation.reason,
        error: validation.error,
      });

      return NextResponse.json(
        {
          success: false,
          coupon_code,
          discount_amount: 0,
          discount_type: "fixed_cart",
          new_total: cart_total,
          error: validation.error || "Coupon validation failed",
        },
        { status: 400 }
      );
    }

    // Success: calculate final total
    const discountAmount = validation.discount || 0;
    const newTotal = Math.max(0, cart_total - discountAmount);
    const duration = Date.now() - startTime;

    logger.info("api/coupons/apply", `✓ Success (${duration}ms)`, {
      coupon_code,
      discount_amount: discountAmount.toFixed(2),
      new_total: newTotal.toFixed(2),
      discount_type: validation.coupon?.discount_type,
    });

    return NextResponse.json({
      success: true,
      coupon_code,
      discount_amount: discountAmount,
      discount_type: validation.coupon?.discount_type || "fixed_cart",
      new_total: newTotal,
      message: `Coupon applied! You saved $${discountAmount.toFixed(2)}`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("api/coupons/apply", `Exception (${duration}ms)`, error);
    
    return NextResponse.json(
      { error: "Failed to apply coupon. Please try again." },
      { status: 500 }
    );
  }
}
