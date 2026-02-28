import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/api/woocommerce.server";
import ProductsClient from "./ProductsClient";

export const revalidate = 60; // ISR: 60 seconds

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse thousands of cheap game keys, gift cards, and software licenses. Instant digital delivery.",
};

export default async function ProductsPage() {
  const [{ products }, categories] = await Promise.all([
    getProducts({ per_page: 100 }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <ProductsClient initialProducts={products} initialCategories={categories} />
    </div>
  );
}
