"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, X, ArrowLeft, ShoppingBag, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [coupon, setCoupon] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft size={14} /> Continue Shopping
      </Link>
      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-wider text-foreground">
        Shopping <span className="text-primary">Cart</span>
      </h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag size={64} className="mb-4 text-muted-foreground/30" />
          <p className="mb-2 text-lg text-muted-foreground">Your cart is empty</p>
          <p className="mb-6 text-sm text-muted-foreground">Add some games to get started!</p>
          <Link href="/products" className="rounded-lg bg-primary px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:neon-glow">
            Browse Games
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-3 hidden grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-lg bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Subtotal</span>
              <span className="w-8" />
            </div>
            <div className="space-y-3">
              {items.map(({ product, quantity }, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-center"
                >
                  <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                    <Link href={`/product/${product.slug}`} className="shrink-0">
                      <img src={product.images[0]?.src} alt={product.name} className="h-16 w-12 rounded object-cover sm:h-20 sm:w-14" />
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary">{product.name}</Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">{product.platform}</p>
                    </div>
                  </div>
                  <div className="hidden text-center sm:block">
                    <span className="text-sm font-medium text-foreground">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center rounded-lg border border-border">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-2 py-1.5 text-muted-foreground hover:text-primary"><Minus size={14} /></button>
                      <span className="min-w-[2rem] text-center text-sm font-medium text-foreground">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-2 py-1.5 text-muted-foreground hover:text-primary"><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-sm font-bold text-price-green sm:text-base">{formatPrice(product.price * quantity)}</span>
                  </div>
                  <button onClick={() => removeItem(product.id)} className="flex items-center justify-center text-muted-foreground hover:text-destructive"><X size={16} /></button>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive">Clear Cart</button>
              <Link href="/products" className="text-xs text-primary hover:text-primary/80">+ Add more items</Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"><Tag size={14} className="text-primary" />Coupon Code</div>
              <div className="flex gap-2">
                <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter code" className="flex-1 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">Apply</button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span><span className="text-foreground">{formatPrice(total)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="font-medium text-price-green">Instant / Free</span></div>
              </div>
              <div className="my-4 border-t border-border" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="price-glow font-display text-2xl font-bold text-price-green">{formatPrice(total)}</span>
              </div>
              <Link href="/checkout" className="mt-4 block rounded-lg bg-primary py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:neon-glow">
                Proceed to Checkout
              </Link>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">🔒 100% secure checkout • Instant digital delivery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
