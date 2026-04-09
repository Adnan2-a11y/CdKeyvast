import "server-only";

import { Product, ProductCategory, Coupon } from "@/types/woocommerce";
import { logger } from "@/lib/logger";

/**
 * Normalizes a raw WooCommerce image src string into a valid absolute URL.
 * Handles protocol-relative URLs (//...) by prefixing with https:.
 */
export function normalizeImageSrc(src: unknown): string | null {
  if (!src || typeof src !== "string") return null;
  const trimmed = src.trim();
  if (
    trimmed === "" ||
    trimmed === "false" ||
    trimmed.toLowerCase().includes("undefined") ||
    trimmed.toLowerCase().includes("null")
  ) return null;

  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  
  return null;
}

export function transformProduct(raw: Record<string, unknown>): Product {
  const attributes = (raw.attributes as Record<string, unknown>[] | undefined) ?? [];
  const rawImages = raw.images as Record<string, unknown>[] | undefined;
  const productName = raw.name as string;
  const productId = raw.id as number;

  if (!rawImages || rawImages.length === 0) {
    logger.warn("transformProduct", `No images for product: ${productName} (ID: ${productId})`);
  }

  // Filter out images with empty or invalid src
  const validImages = (rawImages || [])
    .filter((img) => {
      const src = img.src as string;
      return src && src.trim() !== "" && src !== "false" && !src.includes("undefined");
    })
    .map((img) => ({
      id: img.id as number,
      src: normalizeImageSrc(img.src) || (img.src as string),
      alt: (img.alt as string) || productName,
    }));

  if (rawImages && rawImages.length > 0 && validImages.length === 0) {
    logger.warn("transformProduct", `All images had invalid src for: ${productName} (ID: ${productId})`);
  }

  return {
    id: productId,
    name: productName,
    slug: raw.slug as string,
    description: (raw.description as string) || "",
    short_description: (raw.short_description as string) || "",
    price: parseFloat((raw.price as string) || "0"),
    regular_price: parseFloat((raw.regular_price as string) || "0"),
    sale_price: raw.sale_price ? parseFloat(raw.sale_price as string) : undefined,
    on_sale: (raw.on_sale as boolean) || false,
    images: validImages,
    categories: ((raw.categories as Record<string, unknown>[]) || []).map((cat) => ({
      id: cat.id as number,
      name: cat.name as string,
      slug: cat.slug as string,
    })),
    platform:
      (attributes.find((a) => (a.name as string)?.toLowerCase() === "platform")?.options as string[])?.[0] || "PC",
    stock_status: (raw.stock_status as "instock" | "outofstock" | "onbackorder") || "instock",
    average_rating: parseFloat((raw.average_rating as string) || "0"),
    rating_count: (raw.rating_count as number) || 0,
    sku: (raw.sku as string) || "",
    tags: ((raw.tags as Record<string, unknown>[]) || []).map(
      (t) => (t.name as string)?.toLowerCase() || (t.slug as string)
    ),
  };
}

export function transformCategory(raw: Record<string, unknown>): ProductCategory {
  return {
    id: raw.id as number,
    name: raw.name as string,
    slug: raw.slug as string,
    parent: (raw.parent as number) || 0,
    count: (raw.count as number) || 0,
  };
}

export function transformCoupon(raw: Record<string, unknown>): Coupon {
  return {
    id: raw.id as number,
    code: raw.code as string,
    discount_type: (raw.discount_type as string) as Coupon["discount_type"],
    amount: String(raw.amount || "0"),
    description: (raw.description as string) || undefined,
    date_expires: (raw.date_expires as string) || null,
    usage_limit: (raw.usage_limit as number) || null,
    usage_limit_per_user: (raw.usage_limit_per_user as number) || null,
    used_by: ((raw.used_by as string[]) || []),
    usage_count: (raw.usage_count as number) || 0,
    enable_free_shipping: (raw.free_shipping as boolean) || false,
    exclude_sale_items: (raw.exclude_sale_items as boolean) || false,
    minimum_amount: (raw.minimum_amount as string) || undefined,
    maximum_amount: (raw.maximum_amount as string) || undefined,
    product_ids: ((raw.product_ids as number[]) || []),
    excluded_product_ids: ((raw.excluded_product_ids as number[]) || []),
    product_categories: ((raw.product_categories as number[]) || []),
    excluded_product_categories: ((raw.excluded_product_categories as number[]) || []),
    status: ((raw.status as string) || "publish") as "publish" | "draft",
  };
}
