"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }} className="mb-6">
        <CheckCircle size={80} className="text-price-green" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-3 font-display text-3xl font-bold text-foreground">
        Order Confirmed!
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8 max-w-md text-center text-muted-foreground">
        Your game keys will be delivered to your email address. Check your inbox for activation instructions.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-4">
        <Link href="/account" className="rounded-lg border border-border bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground hover:border-primary/50">View Orders</Link>
        <Link href="/products" className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:neon-glow">
          Continue Shopping <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
