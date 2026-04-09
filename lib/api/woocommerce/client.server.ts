import "server-only";

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

export interface WcFetchOptions {
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

export interface WcResponse<T> {
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

export async function wcFetch<T>(options: WcFetchOptions): Promise<WcResponse<T>> {
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
