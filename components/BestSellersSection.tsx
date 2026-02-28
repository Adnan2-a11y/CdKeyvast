"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/woocommerce";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/container";

interface BestSellersSectionProps {
  initialProducts: Product[];
}

export default function BestSellersSection({
  initialProducts,
}: BestSellersSectionProps) {
  const { addItem } = useCart();

  return (
    <section className="bg-white border-b border-border py-10 md:py-14">
      <Container>

        {/* Section Title */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-base font-bold uppercase tracking-widest text-foreground md:text-lg"
          >
            <span className="text-black">Game Card</span>{" "}
            <span className="text-primary">Best Sellers</span>
          </motion.h2>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Loading Skeleton */}
        {initialProducts?.length === 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border border-border bg-card"
              >
                <div className="h-8 bg-secondary" />
                <div className="aspect-square bg-muted" />

                <div className="space-y-2 p-3">
                  <div className="h-3 w-3/4 rounded bg-muted" />
                  <div className="h-8 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {initialProducts.slice(0, 5).map((product, i) => {
              const regularPrice = Number(product.regular_price);
              const price = Number(product.price);

              const discount =
                product.on_sale && regularPrice > 0
                  ? Math.round((1 - price / regularPrice) * 100)
                  : undefined;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProductCard
                    title={product.name}
                    image={product.images?.[0]?.src || ""}
                    brandImage={product.images?.[0]?.src || ""}
                    brandName={product.categories?.[0]?.name || "Game Card"}
                    deliveryMethod="FAST EMAIL DELIVERY"
                    price={price}
                    originalPrice={regularPrice}
                    discount={discount}
                    platform={product.platform}
                    slug={product.slug}
                    rating={product.average_rating}
                    ratingCount={product.rating_count}
                    onAddToCart={() => addItem(product)}
                    onBuyNow={() => addItem(product)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex rounded-lg border border-primary bg-primary/10 px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View All Products →
          </Link>
        </div>
      </Container>
    </section>
  );
}