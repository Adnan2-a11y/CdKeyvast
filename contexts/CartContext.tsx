"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartItem, Product } from "@/types/woocommerce";
import { toast } from "sonner";
import { useCurrency } from "@/hooks/useCurrency";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  subtotal: number;
  discount: number;
  finalTotal: number;
  appliedCoupon: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discountAmount: number, couponCode: string) => void;
  removeDiscount: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cdkeyvast_cart";
const DISCOUNT_STORAGE_KEY = "cdkeyvast_discount";

interface StoredDiscount {
  amount: number;
  code: string;
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function loadDiscount(): StoredDiscount | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(DISCOUNT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveDiscount(discount: StoredDiscount) {
  localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(discount));
}

function clearDiscount() {
  localStorage.removeItem(DISCOUNT_STORAGE_KEY);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const { convertPrice } = useCurrency();

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setItems(loadCart());
    const storedDiscount = loadDiscount();
    if (storedDiscount) {
      setDiscount(storedDiscount.amount);
      setAppliedCoupon(storedDiscount.code);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) saveCart(items);
  }, [items]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + convertPrice(i.product.price) * i.quantity, 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    toast.success(`${product.name} added to cart`);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
    localStorage.removeItem(CART_STORAGE_KEY);
    clearDiscount();
  }, []);

  const applyDiscount = useCallback((discountAmount: number, couponCode: string) => {
    setDiscount(Math.min(discountAmount, subtotal));
    setAppliedCoupon(couponCode);
    saveDiscount({ amount: Math.min(discountAmount, subtotal), code: couponCode });
  }, [subtotal]);

  const removeDiscount = useCallback(() => {
    setDiscount(0);
    setAppliedCoupon(null);
    clearDiscount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total: subtotal,
        subtotal,
        discount,
        finalTotal,
        appliedCoupon,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyDiscount,
        removeDiscount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
