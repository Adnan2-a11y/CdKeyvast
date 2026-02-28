import { NextRequest } from "next/server";
import { getProducts } from "@/lib/api/woocommerce.server";

// ── Cache Strategy ────────────────────────────────────────────────────────────
// s-maxage=60:              CDN/Edge caches serve this response for 60 seconds.
// stale-while-revalidate=300: After 60s, serve stale data instantly while a
//                           background request silently fetches fresh data.
// Result: the browser never waits for WordPress during a cache hit.
// Search queries benefit most — repeated searches are effectively instant.
const SWR_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

// Client-side fetches hit this route for product filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search   = searchParams.get("search")   || undefined;
  const sort     = searchParams.get("sort")     || undefined;
  const page     = parseInt(searchParams.get("page")     || "1",   10);
  const perPage  = parseInt(searchParams.get("per_page") || "100", 10);

  try {
    const { products, total } = await getProducts({ category, search, sort, page, per_page: perPage });

    // Use native Response so we can attach cache headers —
    // NextResponse.json does not expose a clean header API for this.
    return Response.json({ products, total }, { headers: SWR_HEADERS });
  } catch (error) {
    console.error("[/api/products] error:", error);
    // Errors must NOT be cached — always return a fresh failure signal
    return Response.json(
      { products: [], total: 0, error: "Failed to load products" },
      { status: 500 },
    );
  }
}
