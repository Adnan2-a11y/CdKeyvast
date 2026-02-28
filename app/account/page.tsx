"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, User, LogOut, Settings, Heart, Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { getOrdersByEmail } from "@/lib/api/woocommerce.client";
import { Order } from "@/types/woocommerce";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  completed: "bg-green-500/15 text-green-400",
  processing: "bg-blue-500/15 text-blue-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  "on-hold": "bg-orange-500/15 text-orange-400",
  cancelled: "bg-destructive/15 text-destructive",
  refunded: "bg-muted text-muted-foreground",
  failed: "bg-destructive/15 text-destructive",
};

const menuItems = [
  { icon: Package, label: "My Orders", description: "View and track your orders" },
  { icon: Heart, label: "Wishlist", description: "Games you want to buy later" },
  { icon: Settings, label: "Settings", description: "Update your profile and preferences" },
  { icon: User, label: "Profile", description: "Manage your account details" },
];

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("account_email") || "";
      setEmail(saved);
      if (saved) fetchOrders(saved);
    }
  }, []);

  const fetchOrders = async (userEmail: string) => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const result = await getOrdersByEmail(userEmail);
      setOrders(result);
      setHasFetched(true);
      localStorage.setItem("account_email", userEmail);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email.trim()) fetchOrders(email.trim()); };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-wider text-foreground">My <span className="text-primary">Account</span></h1>
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-border bg-card p-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20"><User size={32} className="text-primary" /></div>
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label htmlFor="account-email" className="text-xs text-muted-foreground">Your Email (used for checkout)</label>
              <input id="account-email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:neon-glow disabled:opacity-50">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Package size={14} />}{loading ? "Loading..." : "Load My Orders"}
            </button>
          </form>
          <button onClick={() => { setEmail(""); setOrders([]); setHasFetched(false); localStorage.removeItem("account_email"); }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-sm text-muted-foreground hover:border-destructive hover:text-destructive">
            <LogOut size={14} /> Sign Out
          </button>
        </motion.div>
        <div className="space-y-3 md:col-span-2">
          {menuItems.map(({ icon: Icon, label, description }, i) => (
            <motion.a key={label} href="#" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="neon-border flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Icon size={20} className="text-primary" /></div>
              <div><h3 className="font-semibold text-foreground">{label}</h3><p className="text-sm text-muted-foreground">{description}</p></div>
            </motion.a>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-foreground">Order History</h2>
        {loading ? (
          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-12"><Loader2 size={28} className="animate-spin text-primary" /><span className="ml-3 text-muted-foreground">Loading orders...</span></div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-foreground">#{order.id}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>{order.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{new Date(order.date_created).toLocaleDateString()}</span>
                    <span className="font-display text-sm font-bold text-price-green">€{parseFloat(order.total).toFixed(2)}</span>
                  </div>
                </div>
                {order.line_items && order.line_items.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                    {order.line_items.map((li, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{li.name || `Product #${li.product_id}`}<span className="ml-1 text-muted-foreground/60">×{li.quantity}</span></span>
                        {li.total && <span className="text-foreground">€{parseFloat(li.total).toFixed(2)}</span>}
                      </div>
                    ))}
                  </div>
                )}
                {order.payment_url && order.status === "pending" && (
                  <a href={order.payment_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80">Complete Payment <ExternalLink size={12} /></a>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            <Package size={40} className="mx-auto mb-3 text-muted-foreground/30" />
            {hasFetched ? <p>No orders found for this email.</p> : <p>Enter your email above to view orders, or <Link href="/products" className="text-primary hover:text-primary/80">start shopping!</Link></p>}
          </div>
        )}
      </div>
    </div>
  );
}
