import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import HomepageClient from "./HomepageClient";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Server-side data fetching — fast, cached, never exposes API keys
  const [{ products }, categories] = await Promise.all([
    getProducts({ per_page: 5 }),
    getCategories(),
  ]);

  return <HomepageClient initialProducts={products} categories={categories} />;
}
