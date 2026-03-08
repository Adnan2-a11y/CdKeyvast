"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/hooks/useCurrency";

interface ProductCardProps {
  title: string;
  image: string;
  brandImage?: string;
  brandName?: string;
  deliveryMethod?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  platform?: string;
  slug?: string;
  rating?: number;
  ratingCount?: number;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

const ProductCard = ({
  title,
  image,
  brandImage,
  brandName,
  deliveryMethod,
  price,
  originalPrice,
  discount,
  platform,
  slug,
  rating = 0,
  ratingCount = 0,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) => {
  const { formatPrice } = useCurrency();

  const hasDiscount = discount && discount > 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* Price Label Top */}
      <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1 rounded-full shadow-md border border-gray-200">
        <span className="text-sm font-bold text-gray-900">{formatPrice(price)}</span>
      </div>

      {/* Brand Logo Area */}
      <div className="relative bg-gray-50 p-6">
        {brandImage && (
          <div className="absolute top-2 right-2 h-12 w-12 overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <img
              src={brandImage}
              alt={brandName || "Brand"}
              className="h-full w-full object-contain"
            />
          </div>
        )}
        
        {/* Product Image */}
        <div className="mx-auto h-40 w-40">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Product Title */}
        <Link
          href={slug ? `/product/${slug}` : "#"}
          className="mb-4 line-clamp-3 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
        >
          {title}
        </Link>

        {/* BUY NOW Button */}
        <button
          onClick={onBuyNow || onAddToCart}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-95"
        >
          <ShoppingCart size={16} />
          BUY NOW
        </button>

        {/* Pricing Section */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">ORIGINAL:</span>
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(originalPrice || price)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">NOW:</span>
            <span className="text-sm font-bold text-red-600">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{ratingCount} Reviews</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
