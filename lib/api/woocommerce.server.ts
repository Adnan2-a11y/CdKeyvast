import "server-only";

import { Product, ProductCategory } from "@/types/woocommerce";
import { logger } from "@/lib/logger";

// ─── Environment ────────────────────────────────────────────────────────────
// These are NOT prefixed with NEXT_PUBLIC_ so they NEVER reach the browser.
const WP_URL = process.env.WORDPRESS_URL!;
const CK = process.env.WC_CONSUMER_KEY!;
const CS = process.env.WC_CONSUMER_SECRET!;

if (!WP_URL || !CK || !CS) {
  logger.error("wc-server", "Missing required env vars: WORDPRESS_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET");
}

// Basic Auth header (server-only — never sent to client)
const AUTH_HEADER = "Basic " + Buffer.from(`${CK}:${CS}`).toString("base64");

// ─── Generic fetcher ────────────────────────────────────────────────────────

interface WcFetchOptions {
  /** WC REST endpoint path, e.g. /wp-json/wc/v3/products */
  endpoint: string;
  /** Query params appended to the URL */
  params?: Record<string, string>;
  /** HTTP method, defaults to GET */
  method?: string;
  /** JSON body for POST/PUT */
  body?: unknown;
  /** Next.js ISR revalidation in seconds (default 60) */
  revalidate?: number | false;
  /** Fetch ALL pages automatically? (pagination) */
  fetchAll?: boolean;
}

interface WcResponse<T> {
  data: T;
  total: number;
  totalPages: number;
}

async function wcFetch<T>(options: WcFetchOptions): Promise<WcResponse<T>> {
  const {
    endpoint,
    params = {},
    method = "GET",
    body,
    revalidate = 60,
    fetchAll = false,
  } = options;

  const url = new URL(endpoint, WP_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const fetchOptions: RequestInit & { next?: { revalidate: number | false } } = {
    method,
    headers: {
      Authorization: AUTH_HEADER,
      "Content-Type": "application/json",
    },
    // Next.js ISR cache directive
    next: { revalidate },
  };

  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  // ─── Single page request ──────────────────────────────────────────────
  if (!fetchAll || method !== "GET") {
    const started = Date.now();
    logger.debug("wc-fetch", `${method} ${url.pathname}${url.search}`);

    const res = await fetch(url.toString(), fetchOptions);

    if (!res.ok) {
      const text = await res.text();
      logger.error("wc-fetch", `HTTP ${res.status}`, { url: url.pathname, body: text.slice(0, 300) });
      throw new Error(`WooCommerce API error ${res.status}: ${text.slice(0, 200)}`);
    }

    const data = (await res.json()) as T;
    const total = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);

    logger.info("wc-fetch", `${method} ${url.pathname} → ${res.status} (${Date.now() - started}ms)`, { total, totalPages });

    return { data, total, totalPages };
  }

  // ─── Paginated: fetch ALL pages ───────────────────────────────────────
  /*let allResults: unknown[] = [];
  let page = 1;
  let totalItems = 0;

  logger.debug("wc-fetch", `Paginating ${url.pathname}${url.search}`);

  while (true) {
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const res = await fetch(url.toString(), fetchOptions);

    if (!res.ok) {
      const text = await res.text();
      logger.error("wc-fetch", `Pagination page ${page} failed: HTTP ${res.status}`, text.slice(0, 200));
      throw new Error(`WooCommerce API error ${res.status}`);
    }

    const pageData = (await res.json()) as unknown[];
    const tp = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    totalItems = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    allResults = [...allResults, ...pageData];

    logger.debug("wc-fetch", `Page ${page}/${tp} — got ${pageData.length} items`);

    if (page >= tp) break;
    page++;
  }

  logger.info("wc-fetch", `Paginated ${url.pathname} complete`, { pages: page, totalItems });

  return { data: allResults as T, total: totalItems, totalPages: page };
}*/
// ─── Paginated: fetch ALL pages (Hardened Architect Version) ────────────────────────
  let allResults: any[] = []; // Using any[] for internal accumulation before cast
  let page = 1;
  let totalItems = 0;
  let totalPages = 1;

  // Maximum items allowed in memory before we force a stop (Safety Guard)
  const MAX_MEMORY_ITEMS = 2000; 

  logger.debug("wc-fetch", `Paginating ${url.pathname}${url.search}`);

  try {
    while (page <= totalPages) {
      url.searchParams.set("per_page", "100");
      url.searchParams.set("page", String(page));

      const res = await fetch(url.toString(), fetchOptions);

      // 1. Better Error Handling: Check for non-JSON responses (502/504 HTML)
      if (!res.ok) {
        const errorText = await res.text();
        logger.error("wc-fetch", `Page ${page} failed: HTTP ${res.status}`, errorText.slice(0, 150));
        throw new Error(`WC_FETCH_ERROR: ${res.status}`);
      }

      const pageData = await res.json();
      
      // 2. Initial Setup: Set boundaries on the first request
      if (page === 1) {
        totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
        totalItems = parseInt(res.headers.get("X-WP-Total") || "0", 10);
      }

      // 3. Memory Protection: Prevent Vercel/Node crash if store grows too large
      if (allResults.length + pageData.length > MAX_MEMORY_ITEMS) {
        logger.warn("wc-fetch", `Memory Guard triggered at ${allResults.length} items. Truncating fetch.`);
        break; 
      }

      allResults.push(...pageData); // More memory efficient than [...spread]

      logger.debug("wc-fetch", `Fetched page ${page}/${totalPages}`);

      page++;
    }

    logger.info("wc-fetch", `Pagination complete`, { 
      pagesFetched: page - 1, 
      totalItemsStored: allResults.length 
    });

    return { 
      data: allResults as T, 
      total: totalItems, 
      totalPages: totalPages 
    };

  } catch (error) {
    logger.error("wc-fetch", "Critical failure during pagination loop", error);
    throw error; // Rethrow so the caller knows the data is incomplete
  }
}


// ─── Transforms ────────────────────────────────────────────────────────────

function transformProduct(raw: Record<string, unknown>): Product {
  const attributes = (raw.attributes as Record<string, unknown>[] | undefined) ?? [];
  return {
    id: raw.id as number,
    name: raw.name as string,
    slug: raw.slug as string,
    description: (raw.description as string) || "",
    short_description: (raw.short_description as string) || "",
    price: parseFloat((raw.price as string) || "0"),
    regular_price: parseFloat((raw.regular_price as string) || "0"),
    sale_price: raw.sale_price ? parseFloat(raw.sale_price as string) : undefined,
    on_sale: (raw.on_sale as boolean) || false,
    images: ((raw.images as Record<string, unknown>[]) || []).map((img) => ({
      id: img.id as number,
      src: img.src as string,
      alt: (img.alt as string) || (raw.name as string),
    })),
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

function transformCategory(raw: Record<string, unknown>): ProductCategory {
  return {
    id: raw.id as number,
    name: raw.name as string,
    slug: raw.slug as string,
    count: (raw.count as number) || 0,
  };
}

// ─── Public API ────────────────────────────────────────────────────────────
// These functions run ONLY on the server (enforced by `server-only` import).
// Next.js `fetch` with `next.revalidate` handles ISR caching automatically.

/**
 * Fetch products with filtering, sorting, and pagination.
 * ISR: revalidates every 60 seconds.
 */
export async function getProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  per_page?: number;
}): Promise<{ products: Product[]; total: number }> {
  try {
    // ── Data Pruning: _fields reduces WC response size by ~70-80% ────────────
    // Without this, WC sends full product objects including description HTML,
    // meta_data arrays, review counts, and downloadable file lists — all unused
    // by the product list UI. This is the primary fix for search latency.
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

    if (params?.category) qp.category = params.category;
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

    const products = result.data.map(transformProduct);
    logger.info("getProducts", `Returned ${products.length} products`);
    return { products, total: result.total || products.length };
  } catch (error) {
    logger.error("getProducts", "Failed to fetch products", error);
    //return { products: [], total: 0 };
    throw new Error("Unable to load products.Please check your connection or try again later.");
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
      const product = transformProduct(result.data[0]);
      logger.info("getProductBySlug", `Found "${product.name}" (id=${product.id})`);
      return product;
    }

    logger.warn("getProductBySlug", `No product found for slug="${slug}"`);
    //return null;
    throw new Error("PRODUCT_NOT_FOUND");
  } catch (error) {
    logger.error("getProductBySlug", "Failed", error);
    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") throw error;

    throw new Error("Could not retrieve product details.");
  }
}

/**
 * Fetch all visible WooCommerce categories.
 * ISR: revalidates every 300 seconds (5 min) — categories change rarely.
 */
export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const result = await wcFetch<Record<string, unknown>[]>({
      endpoint: "/wp-json/wc/v3/products/categories",
      params: { hide_empty: "true" },
      revalidate: 300,
      fetchAll: true,
    });

    const categories = result.data.map(transformCategory);
    logger.info("getCategories", `Returned ${categories.length} categories`);
    return categories;
  } catch (error) {
    logger.error("getCategories", "Failed to fetch categories", error);
    return [];
  }
}

/**
 * Fetch top product slugs for `generateStaticParams`.
 * Used at build time only.
 */
export async function getTopProductSlugs(limit = 50): Promise<string[]> {
  try {
    const { products } = await getProducts({ per_page: limit });
    return products.map((p) => p.slug);
  } catch {
    return [];
  }
}
