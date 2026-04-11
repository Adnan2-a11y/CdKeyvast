import "server-only";

import { Product } from "@/types/woocommerce";
import { logger } from "@/lib/logger";
import { wcFetch } from "./client.server";
import { transformProduct } from "./transforms.server";

/**
 * Fetch products with filtering, sorting, and pagination.
 * ISR: revalidates every 60 seconds.
 * 
 * Note: Category filtering is done client-side by slug because:
 * 1. WooCommerce API expects category IDs, not slugs
 * 2. Products already contain their categories data
 * 3. More efficient than making an extra API call to lookup category ID
 */
export async function getProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  per_page?: number;
}): Promise<{ products: Product[]; total: number }> {
  try {
    const PRODUCT_LIST_FIELDS = [
      "id", "name", "slug", "price", "regular_price", "sale_price",
      "on_sale", "images", "categories", "attributes",
      "stock_status", "average_rating", "rating_count", "sku", "tags",
    ].join(",");

    const qp: Record<string, string> = {
      status: "publish",
      per_page: String(params?.per_page || 100),
      page: String(params?.page || 1),
      _fields: PRODUCT_LIST_FIELDS,
    };

    // Note: We don't pass category to WooCommerce API here because it expects IDs, not slugs
    // Category filtering is applied after fetching using the embedded category data
    if (params?.search) qp.search = params.search;

    if (params?.sort === "price-asc") {
      qp.orderby = "price";
      qp.order = "asc";
    } else if (params?.sort === "price-desc") {
      qp.orderby = "price";
      qp.order = "desc";
    } else if (params?.sort === "rating") {
      qp.orderby = "rating";
      qp.order = "desc";
    }

    const result = await wcFetch<Record<string, unknown>[]>({
      endpoint: "/wp-json/wc/v3/products",
      params: qp,
      revalidate: 60,
      fetchAll: !params?.page,
    });

    let products = result.data.map(transformProduct);
    
    // Filter by category slug if provided
    // This works because products contain their categories with slugs
    if (params?.category) {
      const categorySlug = params.category.toLowerCase();
      const beforeCount = products.length;
      products = products.filter(product => 
        product.categories.some(cat => 
          cat.slug.toLowerCase() === categorySlug ||
          cat.name.toLowerCase() === categorySlug
        )
      );
      logger.debug("getProducts", `Category filter "${categorySlug}": ${beforeCount} → ${products.length} products`);
    }
    
    const productsWithoutImages = products.filter(p => !p.images || p.images.length === 0);
    
    if (productsWithoutImages.length > 0) {
      logger.warn("getProducts", `${productsWithoutImages.length} products have no images`);
    }

    logger.info("getProducts", `Returned ${products.length} products, ${productsWithoutImages.length} without images`);
    return { products, total: products.length };
  } catch (error) {
    logger.error("getProducts", "Failed to fetch products", error);
    return { products: [], total: 0 };
  }
}

/**
 * Fetch a single product by its URL slug.
 * ISR: revalidates every 60 seconds.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    logger.debug("getProductBySlug", `Fetching slug="${slug}"`);

    const result = await wcFetch<Record<string, unknown>[]>({
      endpoint: "/wp-json/wc/v3/products",
      params: { slug, status: "publish" },
      revalidate: 60,
    });

    if (result.data && result.data.length > 0) {
      const rawProduct = result.data[0];
      const product = transformProduct(rawProduct);

      logger.info("getProductBySlug", `Found "${product.name}" (id=${product.id}), images: ${product.images?.length || 0}`);
      return product;
    }

    logger.warn("getProductBySlug", `No product found for slug="${slug}"`);
    throw new Error("PRODUCT_NOT_FOUND");
  } catch (error) {
    logger.error("getProductBySlug", "Failed", error);
    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") throw error;
    return null;
  }
}

/**
 * Fetch top product slugs for static path generation.
 */
export async function getTopProductSlugs(limit = 50): Promise<string[]> {
  try {
    const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(100, Math.floor(limit))) : 50;

    const result = await wcFetch<Array<{ slug?: unknown }>>({
      endpoint: "/wp-json/wc/v3/products",
      params: {
        status: "publish",
        per_page: String(safeLimit),
        orderby: "popularity",
        order: "desc",
        _fields: "slug",
      },
      revalidate: 300,
    });

    return (result.data ?? [])
      .map((p) => (typeof p.slug === "string" ? p.slug : null))
      .filter((s): s is string => Boolean(s));
  } catch (error) {
    logger.error("getTopProductSlugs", "Failed to fetch top product slugs", error);
    return [];
  }
}
