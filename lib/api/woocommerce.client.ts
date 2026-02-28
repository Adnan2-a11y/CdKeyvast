"use client";

import { supabase } from "@/lib/supabase/client";
import { Order, CreateOrderPayload } from "@/types/woocommerce";

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

export async function loginUser(_creds: { username: string; password: string }): Promise<{ token: string }> {
  // Auth via Supabase — extend this with WP JWT Auth plugin when ready
  return { token: "mock-jwt-token" };
}

export async function registerUser(_data: {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}): Promise<{ token: string }> {
  return { token: "mock-jwt-token" };
}
