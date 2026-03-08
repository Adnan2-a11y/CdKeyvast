import type { Metadata } from "next";
<<<<<<< HEAD
import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import ProductsClient from "./ProductsClient";

export const dynamic = 'force-dynamic';
=======
import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import ProductsClient from "./ProductsClient";

>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
export const revalidate = 60; // ISR: 60 seconds

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse thousands of cheap game keys, gift cards, and software licenses. Instant digital delivery.",
};

<<<<<<< HEAD
=======
// Fallback component while ProductsClient loads
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading products...</p>
      </div>
    </div>
  );
}

>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
export default async function ProductsPage() {
  const [{ products }, categories] = await Promise.all([
    getProducts({ per_page: 100 }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
<<<<<<< HEAD
      <ProductsClient initialProducts={products} initialCategories={categories} />
=======
      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient initialProducts={products} initialCategories={categories} />
      </Suspense>
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
    </div>
  );
}
