import "server-only";

import { Product, ProductCategory, Coupon, CartItem, CategoryTreeNode, HeaderMenuCategory } from "@/types/woocommerce";
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
const USER_AGENT = "NextJS-WooCommerce-Client/1.0";

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

type WcRetryOptions = {
  retries: number;
  baseDelayMs: number;
  maxDelayMs: number;
};

// Rate limiting queue to prevent overwhelming the server
class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private running = 0;
  private maxConcurrent: number;
  private delayBetweenRequests: number;

  constructor(maxConcurrent: number = 2, delayBetweenRequests: number = 500) {
    this.maxConcurrent = maxConcurrent;
    this.delayBetweenRequests = delayBetweenRequests;
  }

  async execute<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const task = this.queue.shift();

    if (task) {
      try {
        await task();
      } finally {
        this.running--;
        // Add delay between requests
        setTimeout(() => this.process(), this.delayBetweenRequests);
      }
    }
  }
}

// Global rate limiter instance - configurable via environment variables
const maxConcurrent = parseInt(process.env.WC_MAX_CONCURRENT_REQUESTS || "2");
const delayBetweenRequests = parseInt(process.env.WC_DELAY_BETWEEN_REQUESTS || "500");
const rateLimiter = new RateLimiter(maxConcurrent, delayBetweenRequests);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientHttpStatus(status: number): boolean {
  return status === 429 || status === 502 || status === 503 || status === 504;
}

async function fetchWithRetry(
  url: string,
  fetchOptions: RequestInit & { next?: { revalidate: number | false } },
  meta: { tag: string; method: string; pathname: string; search: string },
  retryOptions?: Partial<WcRetryOptions>
): Promise<Response> {
  const opts: WcRetryOptions = {
    retries: retryOptions?.retries ?? 5, // Increased retries for build time
    baseDelayMs: retryOptions?.baseDelayMs ?? 500, // Increased base delay
    maxDelayMs: retryOptions?.maxDelayMs ?? 8000, // Increased max delay
  };

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetch(url, fetchOptions);
      if (!res.ok && isTransientHttpStatus(res.status) && attempt < opts.retries) {
        const delay = Math.min(opts.maxDelayMs, opts.baseDelayMs * Math.pow(2, attempt));
        logger.warn(meta.tag, `HTTP ${res.status} (transient) — retrying in ${delay}ms`, {
          url: meta.pathname,
          attempt: attempt + 1,
          retries: opts.retries,
        });
        await sleep(delay);
        attempt++;
        continue;
      }
      return res;
    } catch (error) {
      if (attempt < opts.retries) {
        const delay = Math.min(opts.maxDelayMs, opts.baseDelayMs * Math.pow(2, attempt));
        logger.warn(meta.tag, `Fetch failed (network) — retrying in ${delay}ms`, {
          url: meta.pathname,
          attempt: attempt + 1,
          retries: opts.retries,
        });
        await sleep(delay);
        attempt++;
        continue;
      }
      throw error;
    }
  }
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
      //"Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "Referer": WP_URL,
      "Origin": WP_URL,
      ...(body && method !== "GET" ? { "Content-Type": "application/json" } : {}),
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

    // Wrap the fetch call with rate limiting
    const res = await rateLimiter.execute(async () => {
      return await fetchWithRetry(
        url.toString(),
        fetchOptions,
        { tag: "wc-fetch", method, pathname: url.pathname, search: url.search },
        { retries: 5, baseDelayMs: 500, maxDelayMs: 8000 }
      );
    });

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
  const allResults: unknown[] = [];
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

      // Wrap each paginated request with rate limiting
      const res = await rateLimiter.execute(async () => {
        return await fetchWithRetry(
          url.toString(),
          fetchOptions,
          { tag: "wc-fetch", method: "GET", pathname: url.pathname, search: url.search },
          { retries: 5, baseDelayMs: 500, maxDelayMs: 8000 }
        );
      });

      // 1. Better Error Handling: Check for non-JSON responses (502/504 HTML)
      if (!res.ok) {
        const errorText = await res.text();
        logger.error("wc-fetch", `Page ${page} failed: HTTP ${res.status}`, {
          url: url.pathname,
          body: errorText.slice(0, 150),
        });
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

  // Debug logging for image issues
  const rawImages = raw.images as Record<string, unknown>[] | undefined;
  const productName = raw.name as string;
  const productId = raw.id as number;

  if (!rawImages || rawImages.length === 0) {
    logger.warn("transformProduct", `No images for product: ${productName} (ID: ${productId})`);
  } else {
    logger.debug("transformProduct", `Product: ${productName} (ID: ${productId}), Images: ${rawImages.length}`, {
      firstImage: rawImages[0]?.src,
      allImages: rawImages.map(img => ({ id: img.id, src: img.src })),
    });
  }

  // Filter out images with empty or invalid src
  const validImages = ((rawImages) || []).filter((img) => {
    const src = img.src as string;
    return src && src.trim() !== "" && src !== "false" && !src.includes("undefined");
  }).map((img) => ({
    id: img.id as number,
    src: img.src as string,
    alt: (img.alt as string) || productName,
  }));

  // Log if we filtered out invalid images
  if (rawImages && rawImages.length > 0 && validImages.length === 0) {
    logger.warn("transformProduct", `All images had invalid src for: ${productName} (ID: ${productId})`, {
      rawImages: rawImages.map(img => ({ id: img.id, src: img.src })),
    });
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

function transformCategory(raw: Record<string, unknown>): ProductCategory {
  return {
    id: raw.id as number,
    name: raw.name as string,
    slug: raw.slug as string,
    parent: (raw.parent as number) || 0,
    count: (raw.count as number) || 0,
  };
}

function transformCoupon(raw: Record<string, unknown>): Coupon {
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

// ─── Public API ────────────────────────────────────────────────────────────
/**
 * These functions run ONLY on the server (enforced by `server-only` import).
 * Next.js `fetch` with `next.revalidate` handles ISR caching automatically.
 */

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

    // Debug: Log first product's image data to verify API response
    if (result.data.length > 0) {
      const firstProduct = result.data[0];
      logger.debug("getProducts", `First product: ${firstProduct.name}`, {
        id: firstProduct.id,
        imagesCount: (firstProduct.images as unknown[])?.length || 0,
        firstImageSrc: (firstProduct.images as Record<string, unknown>[])?.[0]?.src,
        hasImages: !!(firstProduct.images as unknown[])?.length,
      });
    }

    const products = result.data.map(transformProduct);

    // Debug: Log products without images
    const productsWithoutImages = products.filter(p => !p.images || p.images.length === 0);
    if (productsWithoutImages.length > 0) {
      logger.warn("getProducts", `${productsWithoutImages.length} products have no images`, {
        products: productsWithoutImages.map(p => ({ id: p.id, name: p.name })),
      });
    }

    logger.info("getProducts", `Returned ${products.length} products, ${productsWithoutImages.length} without images`);
    return { products, total: result.total || products.length };
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

      // Debug: Log raw image data before transformation
      logger.debug("getProductBySlug", `Raw product data for "${rawProduct.name}"`, {
        id: rawProduct.id,
        rawImages: rawProduct.images,
        imagesCount: (rawProduct.images as unknown[])?.length || 0,
      });

      const product = transformProduct(rawProduct);

      // Debug: Log transformed image data
      logger.info("getProductBySlug", `Found "${product.name}" (id=${product.id}), images: ${product.images?.length || 0}`, {
        firstImageSrc: product.images?.[0]?.src,
        hasImages: product.images && product.images.length > 0,
      });

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

export function buildCategoryTree(categories: ProductCategory[]): CategoryTreeNode[] {
  const nodesById = new Map<number, CategoryTreeNode>();
  for (const c of categories) {
    nodesById.set(c.id, {
      id: c.id,
      name: c.name,
      slug: c.slug,
      parent: c.parent,
      count: c.count,
      children: [],
    });
  }

  const roots: CategoryTreeNode[] = [];
  nodesById.forEach((node) => {
    const parentId = node.parent || 0;
    if (parentId && nodesById.has(parentId)) {
      nodesById.get(parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function categoryTreeToHeaderMenu(
  tree: CategoryTreeNode[],
  options?: {
    categoryHref?: (slug: string) => string;
    subcategoryHref?: (slug: string) => string;
  }
): HeaderMenuCategory[] {
  const categoryHref = options?.categoryHref ?? ((slug) => `/products?category=${encodeURIComponent(slug)}`);
  const subcategoryHref = options?.subcategoryHref ?? ((slug) => `/products?category=${encodeURIComponent(slug)}`);

  return tree.map((parent) => ({
    label: parent.name,
    href: categoryHref(parent.slug),
    children: parent.children.map((child) => ({
      label: child.name,
      href: subcategoryHref(child.slug),
    })),
  }));
}

export async function getHeaderMenuCategories(): Promise<HeaderMenuCategory[]> {
  const categories = await getCategories();
  const tree = buildCategoryTree(categories);
  return categoryTreeToHeaderMenu(tree);
}

/**
 * Fetch coupon by code from WooCommerce
 * Returns null if not found or invalid
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

    // Validate coupon is active
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
 * Get all active coupons from WooCommerce
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
      revalidate: 300, // Cache for 5 minutes
      fetchAll: false,
    });

    const coupons = result.data
      .map(transformCoupon)
      .filter((c) => {
        // Filter expired coupons
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
 * Advanced coupon validation with full restriction checking
 * Server-side validation for security
 * 
 * Validates:
 * - Coupon existence and status
 * - Expiry date
 * - Usage limits
 * - Minimum/maximum spend
 * - Product restrictions
 * - Category restrictions
 * 
 * Returns detailed validation result with discount calculation
 */
export async function validateCoupon(
  code: string,
  cartItems: CartItem[],
  cartTotal: number
): Promise<{ valid: boolean; coupon?: Coupon; discount?: number; error?: string; reason?: string }> {
  try {
    // Input validation
    if (!code || code.trim() === "") {
      return { valid: false, error: "Coupon code is required", reason: "empty_code" };
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return { valid: false, error: "Cart is empty", reason: "empty_cart" };
    }

    if (typeof cartTotal !== "number" || cartTotal <= 0) {
      return { valid: false, error: "Invalid cart total", reason: "invalid_total" };
    }

    logger.debug("validateCoupon", `Starting validation`, {
      code,
      cartTotal,
      cartItemsCount: cartItems.length,
    });

    // Fetch coupon from WooCommerce
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      logger.warn("validateCoupon", `Coupon not found: ${code}`);
      return { valid: false, error: "Coupon code does not exist", reason: "not_found" };
    }

    logger.debug("validateCoupon", `Coupon found: ${code}`, {
      discount_type: coupon.discount_type,
      amount: coupon.amount,
      status: coupon.status,
    });

    // Check if coupon is published
    if (coupon.status !== "publish") {
      logger.warn("validateCoupon", `Coupon not published: ${code} | Status: ${coupon.status}`);
      return { valid: false, coupon, error: "This coupon is no longer active", reason: "inactive" };
    }

    // Check expiry date
    if (coupon.date_expires) {
      const now = new Date();
      const expiryDate = new Date(coupon.date_expires);

      if (expiryDate < now) {
        logger.warn("validateCoupon", `Coupon expired: ${code}`);
        return {
          valid: false,
          coupon,
          error: `This coupon expired on ${expiryDate.toLocaleDateString()}`,
          reason: "expired"
        };
      }
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      logger.warn("validateCoupon", `Usage limit exceeded: ${code}`);
      return {
        valid: false,
        coupon,
        error: "This coupon has reached its usage limit",
        reason: "usage_limit"
      };
    }

    // Check minimum cart amount
    if (coupon.minimum_amount) {
      const minAmount = parseFloat(coupon.minimum_amount);
      if (cartTotal < minAmount) {
        logger.warn("validateCoupon", `Below minimum spend: ${code} | Cart: $${cartTotal} | Min: $${minAmount}`);
        return {
          valid: false,
          coupon,
          error: `Minimum order value of $${minAmount.toFixed(2)} required`,
          reason: "minimum_spend",
        };
      }
    }

    // Check maximum cart amount
    // ⚠️ IMPORTANT: maximum_amount of null/empty/"0" means no restriction
    if (coupon.maximum_amount && coupon.maximum_amount !== "0" && coupon.maximum_amount !== "") {
      const maxAmount = parseFloat(coupon.maximum_amount);
      if (maxAmount > 0 && cartTotal > maxAmount) {
        logger.warn("validateCoupon", `Exceeds maximum spend: ${code} | Cart: $${cartTotal} | Max: $${maxAmount}`);
        return {
          valid: false,
          coupon,
          error: `Order total cannot exceed $${maxAmount.toFixed(2)} for this coupon`,
          reason: "maximum_spend",
        };
      }
    }

    // Check product restrictions
    if (coupon.product_ids && coupon.product_ids.length > 0) {
      const cartProductIds = cartItems.map(item => item.product.id);
      const hasAllowedProduct = cartProductIds.some(id => coupon.product_ids?.includes(id));

      if (!hasAllowedProduct) {
        logger.warn("validateCoupon", `Product not in allowed list: ${code}`);
        return {
          valid: false,
          coupon,
          error: "This coupon is not valid for the products in your cart",
          reason: "product_restriction",
        };
      }
    }

    // Check excluded products
    if (coupon.excluded_product_ids && coupon.excluded_product_ids.length > 0) {
      const cartProductIds = cartItems.map(item => item.product.id);
      const hasExcludedProduct = cartProductIds.some(id => coupon.excluded_product_ids?.includes(id));

      if (hasExcludedProduct) {
        logger.warn("validateCoupon", `Excluded product in cart: ${code}`);
        return {
          valid: false,
          coupon,
          error: "This coupon cannot be applied to some items in your cart",
          reason: "product_restriction",
        };
      }
    }

    // Check category restrictions
    if (coupon.product_categories && coupon.product_categories.length > 0) {
      const cartCategoryIds = cartItems.flatMap(item =>
        item.product.categories?.map(cat => cat.id) || []
      );
      const hasAllowedCategory = cartCategoryIds.some(id => coupon.product_categories?.includes(id));

      if (!hasAllowedCategory) {
        logger.warn("validateCoupon", `No matching category: ${code}`);
        return {
          valid: false,
          coupon,
          error: "This coupon is not valid for your product categories",
          reason: "category_restriction",
        };
      }
    }

    // Check excluded categories
    if (coupon.excluded_product_categories && coupon.excluded_product_categories.length > 0) {
      const cartCategoryIds = cartItems.flatMap(item =>
        item.product.categories?.map(cat => cat.id) || []
      );
      const hasExcludedCategory = cartCategoryIds.some(id => coupon.excluded_product_categories?.includes(id));

      if (hasExcludedCategory) {
        logger.warn("validateCoupon", `Excluded category in cart: ${code}`);
        return {
          valid: false,
          coupon,
          error: "This coupon cannot be applied to some product categories",
          reason: "category_restriction",
        };
      }
    }

    // Calculate discount based on type
    let discount = 0;
    if (coupon.discount_type === "percent") {
      const percentage = parseFloat(coupon.amount) / 100;
      discount = cartTotal * percentage;
      logger.debug("validateCoupon", `Percent discount calculated`, {
        percentage: coupon.amount,
        cartTotal,
        discount: discount.toFixed(2),
      });
    } else if (coupon.discount_type === "fixed_cart") {
      discount = parseFloat(coupon.amount);
      logger.debug("validateCoupon", `Fixed cart discount`, { discount: discount.toFixed(2) });
    } else {
      // fixed_product - discount per item quantity
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      discount = parseFloat(coupon.amount) * totalQuantity;
      logger.debug("validateCoupon", `Fixed per-item discount`, {
        perItem: coupon.amount,
        totalQuantity,
        discount: discount.toFixed(2),
      });
    }

    // Ensure discount doesn't exceed cart total
    discount = Math.min(discount, cartTotal);

    logger.info("validateCoupon", `✓ Validation successful: ${code}`, {
      discountAmount: discount.toFixed(2),
      cartTotal: cartTotal.toFixed(2),
      finalTotal: (cartTotal - discount).toFixed(2),
    });

    return { valid: true, coupon, discount };
  } catch (error) {
    logger.error("validateCoupon", `Failed to validate coupon ${code}`, error);
    return { valid: false, error: "Failed to validate coupon. Please try again.", reason: "server_error" };
  }
}
