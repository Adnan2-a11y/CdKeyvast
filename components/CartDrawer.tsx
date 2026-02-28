"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { items, itemCount, total, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag size={48} className="mb-4 text-muted-foreground/40" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      <img
                        src={product.images[0]?.src}
                        alt={product.name}
                        className="h-20 w-16 rounded object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{product.platform}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="rounded border border-border p-0.5 text-muted-foreground hover:border-primary hover:text-primary"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-medium text-foreground">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="rounded border border-border p-0.5 text-muted-foreground hover:border-primary hover:text-primary"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold text-price-green">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="self-start text-muted-foreground hover:text-destructive"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-xl font-bold text-price-green price-glow">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg bg-primary py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:neon-glow"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg border border-border bg-secondary py-2.5 text-center text-sm font-medium text-secondary-foreground transition-colors hover:border-primary/50"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
