"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/container";

const ModernHeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Dark gaming themed gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated background particles/glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse-neon" />
        <div className="absolute top-40 right-32 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl animate-pulse-neon" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/2 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl animate-pulse-neon" style={{ animationDelay: "2s" }} />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent" />

      <Container className="relative py-8 md:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[400px]">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm px-4 py-2 text-sm text-red-400"
            >
              <Sparkles size={16} className="animate-pulse" />
              Instant Digital Delivery
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight tracking-tight text-white"
            >
              Buy Now.
              <br />
              <span className="neon-text text-red-500">Play Now.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed"
            >
              Buy digital game cards instantly and receive them by email within minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500 hover:neon-glow hover:scale-105 shadow-lg shadow-red-600/25"
              >
                Browse Game Cards
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-gray-300 transition-all hover:border-red-500/50 hover:text-red-400 hover:bg-gray-800/70"
              >
                View Gift Cards
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Floating Gaming Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] lg:h-[450px] flex items-center justify-center"
          >
            {/* Steam Card - Front */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="absolute z-30 w-64 h-40 lg:w-80 lg:h-48 rounded-2xl overflow-hidden shadow-2xl shadow-red-600/20 border border-red-500/20 backdrop-blur-sm bg-gradient-to-br from-red-900/20 to-red-800/10"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/steam.webp"
                  alt="Steam Gift Card"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* PlayStation Card - Behind */}
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="absolute z-20 w-64 h-40 lg:w-80 lg:h-48 rounded-2xl overflow-hidden shadow-2xl shadow-blue-600/20 border border-blue-500/20 backdrop-blur-sm bg-gradient-to-br from-blue-900/20 to-blue-800/10"
              style={{
                top: "20%",
                left: "15%",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/playstation.webp"
                  alt="PlayStation Gift Card"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Razer Gold Card - Overlapping */}
            <motion.div
              animate={{
                y: [0, -25, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="absolute z-40 w-64 h-40 lg:w-80 lg:h-48 rounded-2xl overflow-hidden shadow-2xl shadow-green-600/20 border border-green-500/20 backdrop-blur-sm bg-gradient-to-br from-green-900/20 to-green-800/10"
              style={{
                top: "35%",
                right: "10%",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/razer-gold.webp"
                  alt="Razer Gold Gift Card"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Floating glow effects */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-neon" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-2xl animate-pulse-neon" style={{ animationDelay: "1.5s" }} />
            <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-green-500/8 rounded-full blur-2xl animate-pulse-neon" style={{ animationDelay: "2.5s" }} />
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
};

export default ModernHeroSection;
