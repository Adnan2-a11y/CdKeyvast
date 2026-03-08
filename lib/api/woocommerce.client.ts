"use client";

import { supabase } from "@/lib/supabase/client";
import { Order, CreateOrderPayload, ApplyCouponPayload, Coupon, ApplyCouponResponse } from "@/types/woocommerce";

// Client-side proxy helper — WC keys never leave the Supabase Edge Function
async function wcProxy<T>(payload: {
  endpoint: string;
  method?: string;
  body?: unknown;
}): Promise<{ data: T; total?: number }> {
  const { data, error } = await supabase.functions.invoke("woocommerce-proxy", {
    body: payload,
  });

  if (error) throw new Error(error.message || "Failed to fetch from WooCommerce");
  if (data?.error) throw new Error(data.error);

  return data;
}

export async function getPaymentGateways(): Promise<
  { id: string; title: string; description: string; enabled: boolean }[]
> {
  try {
    const result = await wcProxy<Record<string, unknown>[]>({
      endpoint: `/wp-json/wc/v3/payment_gateways`,
    });
    return (result.data || [])
      .filter((g) => g.enabled)
      .map((g) => ({
        id: g.id as string,
        title: (g.title as string) || (g.id as string),
        description: (g.description as string) || "",
        enabled: g.enabled as boolean,
      }));
  } catch (error) {
    console.error("Failed to fetch payment gateways:", error);
    return [
      { id: "cod", title: "Cash on Delivery", description: "Pay on delivery.", enabled: true },
    ];
  }
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const result = await wcProxy<Record<string, unknown>>({
    endpoint: `/wp-json/wc/v3/orders`,
    method: "POST",
    body: payload,
  });

  return {
    id: result.data.id as number,
    status: result.data.status as string,
    total: result.data.total as string,
    date_created: result.data.date_created as string,
    billing: result.data.billing as Order["billing"],
    line_items: result.data.line_items as Order["line_items"],
    payment_url: (result.data.payment_url as string) || "",
  };
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const result = await wcProxy<Record<string, unknown>[]>({
      endpoint: `/wp-json/wc/v3/orders?search=${encodeURIComponent(email)}&per_page=20&orderby=date&order=desc`,
    });

    return (result.data || []).map((o) => ({
      id: o.id as number,
      status: o.status as string,
      total: o.total as string,
      date_created: o.date_created as string,
      billing: o.billing as Order["billing"],
      line_items: ((o.line_items as Record<string, unknown>[]) || []).map((li) => ({
        product_id: li.product_id as number,
        quantity: li.quantity as number,
        name: li.name as string | undefined,
        total: li.total as string | undefined,
      })),
      payment_url: (o.payment_url as string) || "",
    }));
  } catch (error) {
    console.error("getOrdersByEmail failed:", error);
    return [];
  }
}

export type LoginUserPayload = {
  username: string;
  password: string;
};

export type RegisterUserPayload = {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
};

export async function loginUser(payload: LoginUserPayload): Promise<{ token: string }> {
  // Auth via Supabase — extend this with WP JWT Auth plugin when ready
  void payload;
  return { token: "mock-jwt-token" };
}

export async function registerUser(payload: RegisterUserPayload): Promise<{ token: string }> {
  void payload;
  return { token: "mock-jwt-token" };
}

// ──────────────── COUPON SYSTEM ────────────────

/**
 * Validate and apply coupon to cart
 * Calls server-side API for security
 */
export async function applyCoupon(payload: ApplyCouponPayload): Promise<ApplyCouponResponse> {
  try {
    const response = await fetch("/api/coupons/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        coupon_code: payload.coupon_code,
        discount_amount: 0,
        discount_type: "fixed_cart",
        new_total: payload.cart_total,
        error: error.error || "Failed to apply coupon",
      };
    }

    return await response.json();
  } catch (error) {
    console.error("applyCoupon error:", error);
    return {
      success: false,
      coupon_code: payload.coupon_code,
      discount_amount: 0,
      discount_type: "fixed_cart",
      new_total: payload.cart_total,
      error: "Failed to apply coupon",
    };
  }
}

/**
 * Get coupon by code (server-side validation)
 */
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  try {
    const response = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.coupon || null;
  } catch (error) {
    console.error("getCouponByCode error:", error);
    return null;
  }
}

/**
 * Get all active coupons (for reference/promotional display)
 */
export async function getActiveCoupons(): Promise<Coupon[]> {
  try {
    const response = await fetch("/api/coupons/list");
    if (!response.ok) return [];
    const data = await response.json();
    return data.coupons || [];
  } catch (error) {
    console.error("getActiveCoupons error:", error);
    return [];
  }
}