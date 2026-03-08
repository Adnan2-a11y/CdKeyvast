import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import HomepageClient from "./HomepageClient";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Server-side data fetching — fast, cached, never exposes API keys
  const [{ products }, categories] = await Promise.all([
<<<<<<< HEAD
    getProducts({ per_page: 5, page: 1 }),   // page:1 → fetchAll:false → fast single-fetch path
=======
    getProducts({ per_page: 5 }),
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
    getCategories(),
  ]);

  return <HomepageClient initialProducts={products} categories={categories} />;
}
