"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background (hero-bg image removed; pure CSS gradient) */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      <div className="container relative mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Flame size={14} className="animate-pulse" />
            Hot Deals — Up to 90% off
          </div>

          <h1 className="mb-4 font-display text-3xl font-black uppercase leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Best Online Source for <br />
            <span className="neon-text text-primary">Digital Keys</span> <br />
            &amp; Gift Cards
          </h1>

          <p className="mb-6 max-w-lg text-base text-muted-foreground md:text-lg">
            Buy Now. Play Now. Instant delivery on game keys, software licenses, and gift cards at unbeatable prices.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:neon-glow"
            >
              Browse Deals
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="rounded-lg border border-border bg-secondary px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-secondary-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              View All Products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
