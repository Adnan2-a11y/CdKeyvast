"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Gamepad2, 
  Gift, 
  Monitor, 
  CreditCard, 
  ShoppingBag, 
  Smartphone,
  Apple,
  Coins
} from "lucide-react";
import Container from "@/components/ui/container";

const brands = [
  {
    name: "PlayStation",
    description: "Redeem for anything on PlayStation Store games, add-ons, subscriptions and more.",
    bgColor: "bg-blue-600",
    textColor: "text-white",
    icon: Gamepad2,
    slug: "playstation"
  },
  {
    name: "Apple",
    description: "works with all Apple devices.",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    icon: Apple,
    slug: "apple"
  },
  {
    name: "Razer Gold",
    description: "RAZER GOLD",
    subDescription: "GOLD.RAZER.COM",
    bgColor: "bg-green-900",
    textColor: "text-white",
    icon: Coins,
    slug: "razer-gold"
  },
  {
    name: "Nintendo eShop",
    description: "For use on Nintendo systems*",
    bgColor: "bg-red-600",
    textColor: "text-white",
    icon: Gamepad2,
    slug: "nintendo"
  },
  {
    name: "Steam",
    description: "",
    bgColor: "bg-gray-900",
    textColor: "text-white",
    icon: Monitor,
    slug: "steam"
  },
  {
    name: "Xbox Gift Card",
    description: "For Xbox games and more.",
    bgColor: "bg-green-600",
    textColor: "text-white",
    icon: Gamepad2,
    slug: "xbox"
  },
  {
    name: "Roblox",
    description: "Get Robux and more",
    bgColor: "bg-gray-900",
    textColor: "text-white",
    icon: Gamepad2,
    slug: "roblox"
  }
];

const BrandBar = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-3">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link
                href={`/products?category=${brand.slug}`}
                className="block h-full"
              >
                <div className={`${brand.bgColor} ${brand.textColor} rounded-lg p-2 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer relative overflow-hidden`}>
                  {/* Background pattern for some cards */}
                  {(brand.name === "Steam" || brand.name === "Roblox") && (
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-3 grid-rows-3 h-full">
                        {[...Array(9)].map((_, j) => (
                          <div key={j} className="border border-white/20"></div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-1">
                      <brand.icon size={20} className={brand.name === "Apple" ? "text-gray-900" : "text-white"} />
                    </div>
                    
                    {/* Brand Name */}
                    <h3 className="font-bold text-xs mb-0.5 text-center">
                      {brand.name}
                    </h3>
                    
                    {/* Description */}
                    {brand.description && (
                      <p className="text-xs opacity-90 text-center leading-tight">
                        {brand.description}
                      </p>
                    )}
                    
                    {/* Sub Description for Razer Gold */}
                    {brand.subDescription && (
                      <p className="text-xs opacity-75 text-center">
                        {brand.subDescription}
                      </p>
                    )}
                    
                    {/* Nintendo logo indicator */}
                    {brand.name === "Nintendo eShop" && (
                      <div className="absolute bottom-1 right-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">N</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BrandBar;
