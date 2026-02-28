"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Product, ProductCategory } from "@/types/woocommerce";
import ProductCard from "@/components/ProductCard";
import ModernHeroSection from "@/components/ModernHeroSection";
import BrandBar from "@/components/BrandBar";
import InfoColumns from "@/components/InfoColumns";
import BestSellersSection from "@/components/BestSellersSection";
import WholesaleBanner from "@/components/WholesaleBanner";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import GiftCardSection from "@/components/GiftCardSection";
import Container from "@/components/ui/container";

interface HomepageClientProps {
  initialProducts: Product[];
  categories: ProductCategory[];
}

export default function HomepageClient({ initialProducts, categories }: HomepageClientProps) {
  const { addItem } = useCart();

  return (
    <>
      <ModernHeroSection />
      <BrandBar />

      {/* Tagline Section */}
      <section className="bg-white py-8">
        <Container className="text-center">
          <h2 className="font-display text-lg font-bold text-gray-900 md:text-xl">
            The Best Source for <span className="text-red-600">US Game Cards</span>
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-32 bg-red-600" />
          <p className="mt-3 text-sm font-medium text-gray-700">Buy Now. Play Now.</p>
        </Container>
      </section>

      <GiftCardSection />

      <InfoColumns />

      <BestSellersSection initialProducts={initialProducts} />

      <WholesaleBanner />
      <HowItWorks />
      <Reviews />

      {/* Newsletter */}
      <section className="bg-white border-y border-border py-14">
        <Container className="text-center">
          <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-widest text-black md:text-2xl">
            Never Miss a <span className="neon-text text-primary">Deal</span>
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
            Subscribe to get exclusive offers, flash sales, and new release alerts.
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="rounded-lg bg-primary px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:neon-glow">
              Subscribe
            </button>
          </div>
        </Container>
      </section>
    </>
  );
}
