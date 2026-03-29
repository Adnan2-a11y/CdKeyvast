import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import HomepageClient from "./HomepageClient";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Server-side data fetching — fast, cached, never exposes API keys
  // During build time, if the API is unreachable or returns 403,
  // we use empty defaults to allow the build to succeed.
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      getProducts({ per_page: 5 }),
      getCategories(),
    ]);
    products = productsRes.products;
    categories = categoriesRes;
  } catch (error) {
    console.error("[HomePage] Error fetching data:", error);
  }

  return <HomepageClient initialProducts={products} categories={categories} />;
}
