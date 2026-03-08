import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import ProductsClient from "./ProductsClient";

export const revalidate = 60; // ISR: 60 seconds

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse thousands of cheap game keys, gift cards, and software licenses. Instant digital delivery.",
};

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

export default async function ProductsPage() {
  const [{ products }, categories] = await Promise.all([
    getProducts({ per_page: 100 }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient initialProducts={products} initialCategories={categories} />
      </Suspense>
    </div>
  );
}
