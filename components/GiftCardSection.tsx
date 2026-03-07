"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/ui/container";

export default function GiftCardSection() {
  return (
    <section className="bg-gray-900 py-8 md:py-12">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center font-display text-lg font-bold uppercase tracking-widest text-white"
        >
          Popular <span className="text-red-500">Gift Cards</span>
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {/* Apple Gift Card Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-purple-100 to-orange-100 shadow-2xl"
          >
            <div className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">Apple Gift Cards</h3>
                <p className="text-sm text-gray-600">Apps, games, music & more</p>
              </div>
              <Link
                href="/products?category=apple-gift-cards"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-600"
              >
                BUY NOW
              </Link>
            </div>
          </motion.div>

          {/* Razer Gold Gift Card Banner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900 via-green-800 to-green-900 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent"></div>
            <div className="relative flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500">
                <div className="h-5 w-5 rounded-full bg-green-900 flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-500">R</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">RAZER GOLD</h3>
                <p className="text-sm text-green-100">Ultimate gaming currency</p>
              </div>
              <Link
                href="/products?category=razer-gold"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-600"
              >
                BUY NOW
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
