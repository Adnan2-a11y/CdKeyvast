import "server-only";

import { Coupon, CartItem } from "@/types/woocommerce";
import { logger } from "@/lib/logger";
import { wcFetch } from "./client.server";
import { transformCoupon } from "./transforms.server";

/**
 * Fetch coupon by code from WooCommerce.
 * Returns null if not found or invalid.
 */
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  try {
    logger.debug("getCouponByCode", `Fetching coupon: ${code}`);

    const result = await wcFetch<Record<string, unknown>[]>({
      endpoint: "/wp-json/wc/v3/coupons",
      params: { search: code, per_page: "1" },
      revalidate: false, // Coupons change frequently, don't cache
    });

    if (result.data.length === 0) {
      logger.warn("getCouponByCode", `Coupon not found: ${code}`);
      return null;
    }

    const coupon = transformCoupon(result.data[0]);

    if (coupon.status !== "publish") {
      logger.warn("getCouponByCode", `Coupon inactive: ${code}`);
      return null;
    }

    logger.info("getCouponByCode", `Found coupon: ${code}`);
    return coupon;
  } catch (error) {
    logger.error("getCouponByCode", `Failed to fetch coupon ${code}`, error);
    return null;
  }
}

/**
 * Get all active coupons from WooCommerce.
 */
export async function getActiveCoupons(): Promise<Coupon[]> {
  try {
    logger.debug("getActiveCoupons", "Fetching all active coupons");
    const now = new Date().toISOString();

    const result = await wcFetch<Record<string, unknown>[]>({
      endpoint: "/wp-json/wc/v3/coupons",
      params: {
        per_page: "100",
        status: "publish",
        _order: "desc",
        _orderby: "date",
      },
      revalidate: 300, 
    });

    const coupons = result.data
      .map(transformCoupon)
      .filter((c) => {
        if (c.date_expires && new Date(c.date_expires) < new Date(now)) {
          return false;
        }
        return true;
      });

    logger.info("getActiveCoupons", `Returned ${coupons.length} active coupons`);
    return coupons;
  } catch (error) {
    logger.error("getActiveCoupons", "Failed to fetch coupons", error);
    return [];
  }
}

/**
 * Advanced server-side coupon validation.
 */
export async function validateCoupon(
  code: string,
  cartItems: CartItem[],
  cartTotal: number
): Promise<{ valid: boolean; coupon?: Coupon; discount?: number; error?: string; reason?: string }> {
  try {
    if (!code || code.trim() === "") {
      return { valid: false, error: "Coupon code is required", reason: "empty_code" };
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return { valid: false, error: "Cart is empty", reason: "empty_cart" };
    }

    if (typeof cartTotal !== "number" || cartTotal <= 0) {
      return { valid: false, error: "Invalid cart total", reason: "invalid_total" };
    }

    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return { valid: false, error: "Coupon code does not exist", reason: "not_found" };
    }

    if (coupon.status !== "publish") {
      return { valid: false, coupon, error: "This coupon is no longer active", reason: "inactive" };
    }

    // Expiry
    if (coupon.date_expires) {
      const now = new Date();
      const expiryDate = new Date(coupon.date_expires);
      if (expiryDate < now) {
        return {
          valid: false,
          coupon,
          error: `This coupon expired on ${expiryDate.toLocaleDateString()}`,
          reason: "expired"
        };
      }
    }

    // Usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return {
        valid: false,
        coupon,
        error: "This coupon has reached its usage limit",
        reason: "usage_limit"
      };
    }

    // Min spend
    if (coupon.minimum_amount) {
      const minAmount = parseFloat(coupon.minimum_amount);
      if (cartTotal < minAmount) {
        return {
          valid: false,
          coupon,
          error: `Minimum order value of $${minAmount.toFixed(2)} required`,
          reason: "minimum_spend",
        };
      }
    }

    // Max spend
    if (coupon.maximum_amount && coupon.maximum_amount !== "0" && coupon.maximum_amount !== "") {
      const maxAmount = parseFloat(coupon.maximum_amount);
      if (maxAmount > 0 && cartTotal > maxAmount) {
        return {
          valid: false,
          coupon,
          error: `Order total cannot exceed $${maxAmount.toFixed(2)} for this coupon`,
          reason: "maximum_spend",
        };
      }
    }

    // Product restrictions
    if (coupon.product_ids && coupon.product_ids.length > 0) {
      const cartProductIds = cartItems.map(item => item.product.id);
      const hasAllowedProduct = cartProductIds.some(id => coupon.product_ids?.includes(id));
      if (!hasAllowedProduct) {
        return {
          valid: false,
          coupon,
          error: "This coupon is not valid for the products in your cart",
          reason: "product_restriction",
        };
      }
    }

    // Excluded products
    if (coupon.excluded_product_ids && coupon.excluded_product_ids.length > 0) {
      const cartProductIds = cartItems.map(item => item.product.id);
      const hasExcludedProduct = cartProductIds.some(id => coupon.excluded_product_ids?.includes(id));
      if (hasExcludedProduct) {
        return {
          valid: false,
          coupon,
          error: "This coupon cannot be applied to some items in your cart",
          reason: "product_restriction",
        };
      }
    }

    // Category restrictions
    if (coupon.product_categories && coupon.product_categories.length > 0) {
      const cartCategoryIds = cartItems.flatMap(item =>
        item.product.categories?.map(cat => cat.id) || []
      );
      const hasAllowedCategory = cartCategoryIds.some(id => coupon.product_categories?.includes(id));
      if (!hasAllowedCategory) {
        return {
          valid: false,
          coupon,
          error: "This coupon is not valid for your product categories",
          reason: "category_restriction",
        };
      }
    }

    // Excluded categories
    if (coupon.excluded_product_categories && coupon.excluded_product_categories.length > 0) {
      const cartCategoryIds = cartItems.flatMap(item =>
        item.product.categories?.map(cat => cat.id) || []
      );
      const hasExcludedCategory = cartCategoryIds.some(id => coupon.excluded_product_categories?.includes(id));
      if (hasExcludedCategory) {
        return {
          valid: false,
          coupon,
          error: "This coupon cannot be applied to some product categories",
          reason: "category_restriction",
        };
      }
    }

    // Discount Calculation
    let discount = 0;
    if (coupon.discount_type === "percent") {
      discount = cartTotal * (parseFloat(coupon.amount) / 100);
    } else if (coupon.discount_type === "fixed_cart") {
      discount = parseFloat(coupon.amount);
    } else {
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      discount = parseFloat(coupon.amount) * totalQuantity;
    }

    discount = Math.min(discount, cartTotal);
    return { valid: true, coupon, discount };
  } catch (error) {
    logger.error("validateCoupon", `Failed to validate coupon ${code}`, error);
    return { valid: false, error: "Failed to validate coupon.", reason: "server_error" };
  }
}
