import { NextRequest, NextResponse } from "next/server";
import { getProducts, getCategories } from "@/lib/api/woocommerce.server";

// Client-side fetches hit this route for product filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "100", 10);

  try {
    const { products, total } = await getProducts({ category, search, sort, page, per_page: perPage });
    return NextResponse.json({ products, total });
  } catch (error) {
    console.error("API /api/products error:", error);
    return NextResponse.json({ products: [], total: 0 }, { status: 500 });
  }
}
