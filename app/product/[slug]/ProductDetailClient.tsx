"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star, Shield, Zap, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { Product } from "@/types/woocommerce";
import { SanitizedHTML } from "@/components/SanitizedHTML";


interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const discount = product.on_sale
    ? Math.round((1 - product.price / product.regular_price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} />
        Back to Store
      </Link>

      {/* Product Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {product.platform}
          </span>
          {product.categories.map((c) => (
            <span key={c.id} className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {c.name}
            </span>
          ))}
        </div>

        <h1 className="mb-3 font-display text-2xl font-bold text-foreground md:text-3xl">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(product.average_rating) ? "fill-gold text-gold" : "text-muted-foreground/30"}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.average_rating} ({product.rating_count.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Image Section - Takes 1 column on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-lg border border-border lg:col-span-1"
        >
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[0]?.src}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {discount > 0 && (
            <div className="absolute left-3 top-3 rounded bg-discount-red px-3 py-1 font-display text-sm font-bold text-foreground">
              -{discount}%
            </div>
          )}
        </motion.div>

        {/* Short Description and Actions - Takes 2 columns on desktop, positioned beside image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col lg:col-span-2"
        >
          {/* Price */}
          <div className="mb-6 rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex items-baseline gap-3">
              <span className="price-glow font-display text-3xl font-bold text-price-green">
                {formatPrice(product.price)}
              </span>
              {product.on_sale && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.regular_price)}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded bg-discount-red/20 px-2 py-0.5 text-sm font-semibold text-discount-red">
                  Save {discount}%
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => addItem(product)}
            className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:neon-glow"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          {/* Trust badges */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { icon: Zap, label: "Instant Delivery" },
              { icon: Shield, label: "100% Authentic" },
              { icon: Tag, label: "Best Price" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/30 py-3">
                <Icon size={18} className="text-primary" />
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Short Description */}
          {product.short_description && (
            <div className="rounded-lg border border-border bg-secondary/30 p-4 lg:p-6">
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                Overview
              </h3>
              <SanitizedHTML 
                html={product.short_description}
                className="text-sm leading-relaxed text-muted-foreground"
              />
            </div>
          )}

          {/* SKU */}
          <div className="mt-4 text-xs text-muted-foreground">SKU: {product.sku}</div>
        </motion.div>
      </div>

      {/* Full Description - Spans full width below */}
      {product.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 rounded-lg border border-border bg-secondary/20 p-6 lg:p-8"
        >
          <h2 className="mb-4 font-display text-lg font-semibold uppercase tracking-wider text-foreground">
            Full Description
          </h2>
          <SanitizedHTML 
            html={product.description}
            className="prose prose-sm prose-invert max-w-none text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_h2]:text-foreground [&_h3]:text-foreground [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-4"
          />
        </motion.div>
      )}
    </div>
  );
}
