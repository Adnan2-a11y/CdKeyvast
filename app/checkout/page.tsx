"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, CreditCard, Shield, Zap, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { createOrder, getPaymentGateways } from "@/lib/api/woocommerce.client";
import { BillingAddress } from "@/types/woocommerce";
import { toast } from "sonner";
import { CouponInput } from "@/components/CouponInput";

const gatewayIcons: Record<string, typeof CreditCard> = {
  stripe: CreditCard,
  paypal: Shield,
  bacs: CreditCard,
  cod: Zap,
};

export default function CheckoutPage() {
  const { items, subtotal, finalTotal, discount, appliedCoupon, applyDiscount, removeDiscount } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [gateways, setGateways] = useState<{ id: string; title: string; description: string; enabled: boolean }[]>([]);
  const [gatewaysLoading, setGatewaysLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [billing, setBilling] = useState<BillingAddress>({
    first_name: "", last_name: "", email: "", phone: "",
    address_1: "", city: "", state: "", postcode: "", country: "",
  });

  useEffect(() => {
    getPaymentGateways()
      .then((g) => { setGateways(g); if (g.length > 0) setSelectedPayment(g[0].id); })
      .finally(() => setGatewaysLoading(false));
  }, []);

  const updateField = (field: keyof BillingAddress, value: string) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !selectedPayment) return;
    setLoading(true);
    try {
      const gateway = gateways.find((g) => g.id === selectedPayment);
      
      // Log order creation details for debugging
      console.log("📋 Creating order with:", {
        items_count: items.length,
        subtotal,
        discount,
        finalTotal,
        applied_coupon: appliedCoupon,
      });

      // ✅ FIX: Include coupon_lines in the order payload
      const order = await createOrder({
        billing,
        line_items: items.map((i) => ({ product_id: i.product.id, quantity: i.quantity })),
        coupon_lines: appliedCoupon 
          ? [{ code: appliedCoupon }]  // Include coupon code
          : [],                         // No coupon
        payment_method: selectedPayment,
        payment_method_title: gateway?.title || selectedPayment,
      });

      console.log("✅ Order created successfully:", { 
        order_id: order.id,
        order_total: order.total,
      });

      // Clear cart, discount, and coupon when order is placed
      removeDiscount();
      
      const offlineGateways = ["cod", "bacs", "cheque"];
      if (offlineGateways.includes(selectedPayment)) {
        toast.success("Order placed successfully!");
        router.push("/success");
      } else if (order.payment_url && order.payment_url.startsWith("http")) {
        toast.success("Redirecting to payment...");
        // Capture payment URL before async operation to preserve type safety
        const paymentUrl = order.payment_url;
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = paymentUrl;
          }
        }, 100);
      } else {
        toast.success("Order placed successfully!");
        router.push("/success");
      }
    } catch (error) {
      console.error("❌ Order creation failed:", error);
      const errorMsg = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMsg || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20">
        <p className="mb-4 text-lg text-muted-foreground">Your cart is empty</p>
        <Link href="/products" className="text-primary hover:text-primary/80">Browse Games →</Link>
      </div>
    );
  }

  const fields: { key: keyof BillingAddress; label: string; type?: string; half?: boolean; placeholder?: string }[] = [
    { key: "first_name", label: "First Name", half: true, placeholder: "John" },
    { key: "last_name", label: "Last Name", half: true, placeholder: "Doe" },
    { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (234) 567-890" },
    { key: "address_1", label: "Street Address", placeholder: "123 Main St" },
    { key: "city", label: "City", half: true, placeholder: "New York" },
    { key: "state", label: "State / Region", half: true, placeholder: "NY" },
    { key: "postcode", label: "Postal Code", half: true, placeholder: "10001" },
    { key: "country", label: "Country", half: true, placeholder: "US" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/cart" className="hover:text-primary">Cart</Link>
        <span>/</span>
        <span className="text-foreground">Checkout</span>
      </div>
      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-wider text-foreground">
        Secure <span className="text-primary">Checkout</span>
      </h1>
      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Billing Details</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(({ key, label, type, half, placeholder }) => (
                <div key={key} className={half ? "" : "sm:col-span-2"}>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
                  <input type={type || "text"} required value={billing[key]} onChange={(e) => updateField(key, e.target.value)} placeholder={placeholder}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Payment Method</h2>
            </div>
            {gatewaysLoading ? (
              <div className="flex items-center justify-center py-8"><Loader2 size={24} className="animate-spin text-primary" /><span className="ml-2 text-sm text-muted-foreground">Loading payment methods...</span></div>
            ) : gateways.length === 0 ? (
              <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">No payment gateways enabled.</div>
            ) : (
              <div className="space-y-3">
                {gateways.map((gateway) => {
                  const Icon = gatewayIcons[gateway.id] || CreditCard;
                  const isSelected = selectedPayment === gateway.id;
                  return (
                    <button key={gateway.id} type="button" onClick={() => setSelectedPayment(gateway.id)}
                      className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${isSelected ? "border-primary bg-primary/5 shadow-sm shadow-primary/10" : "border-border bg-secondary/30 hover:border-muted-foreground/30"}`}>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isSelected ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}><Icon size={20} /></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{gateway.title}</p>
                        {gateway.description && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: gateway.description }} />}
                      </div>
                      {isSelected && <CheckCircle size={18} className="shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2">
          <div className="sticky top-28 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-foreground">Order Summary</h3>

            {/* Coupon Input Component */}
            <div className="mb-6">
              <CouponInput
                items={items}
                cartTotal={subtotal}
                onCouponApplied={(discountAmount) => {
                  // Note: The actual coupon code is handled inside CouponInput
                  // This callback is for custom logic if needed
                }}
                onCouponRemoved={() => {
                  removeDiscount();
                }}
              />
            </div>

            <div className="mb-4 max-h-60 space-y-3 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img src={product.images[0]?.src} alt="" className="h-14 w-10 rounded object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{quantity}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-medium text-foreground">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground">{product.platform}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-price-green">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="text-foreground">{formatPrice(subtotal)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-1">
                    Discount
                    {appliedCoupon && <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">{appliedCoupon}</span>}
                  </span>
                  <span className="font-medium text-red-600">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="font-medium text-price-green">Instant / Free</span></div>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="price-glow font-display text-2xl font-bold text-price-green">{formatPrice(finalTotal)}</span>
            </div>
            <button type="submit" disabled={loading || !selectedPayment}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:neon-glow disabled:opacity-50">
              {loading ? (<><Loader2 size={14} className="animate-spin" /> Processing...</>) : (<><Lock size={14} /> Place Order &amp; Pay</>)}
            </button>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">🔒 256-bit SSL encrypted • Money-back guarantee</p>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
