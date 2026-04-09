"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  debug?: boolean; // Enable debug logging for this image
}

/**
 * SafeImage Component
 * 
 * Wraps next/image with error handling to prevent page crashes.
 * Falls back to a placeholder when images fail to load.
 * 
 * Features:
 * - Graceful error handling without breaking parent components
 * - Placeholder fallback on load failure
 * - Support for both fill and fixed-size modes
 * - Error logging for debugging
 */
export function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = "",
  containerClassName = "",
  priority = false,
  debug = false,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // Debug logging on mount
  useEffect(() => {
    if (debug || process.env.NODE_ENV === "development") {
      const info = `[SafeImage] ${alt}: src="${src?.substring(0, 50)}...", valid=${isValidImageUrl(src)}`;
      console.log(info);
      setDebugInfo(info);
    }
  }, [src, alt, debug]);

  const handleError = useCallback(() => {
    console.warn(`[SafeImage] Failed to load image: ${src?.substring(0, 100)} for "${alt}"`);
    setError(true);
    setIsLoading(false);
  }, [src, alt]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Validate image URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url || url.trim() === "") return false;
    // Allow placeholder images - they're valid fallbacks
    if (url === "/placeholder.svg" || url === "/product-placeholder.svg") return true;
    try {
      // Check if it's a valid URL
      new URL(url);
      return true;
    } catch {
      // Might be a relative path
      return url.startsWith("/");
    }
  };

  const hasValidSrc = isValidImageUrl(src);

  // Show placeholder on error or if no valid src provided
  if (error || !hasValidSrc) {
    const displaySrc = src || "(empty)";
    if (debug || process.env.NODE_ENV === "development") {
      console.warn(`[SafeImage] PLACEHOLDER for "${alt}" - reason: ${error ? 'load-error' : 'invalid-src'}, src: "${displaySrc.substring(0, 60)}"`);
    }
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${
          fill ? "h-full w-full" : ""
        } ${containerClassName}`}
        style={!fill ? { width, height } : undefined}
        title={`${alt}${debugInfo ? ` - ${debugInfo}` : ""}`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <ImageIcon size={24} />
          <span className="text-xs text-center px-2 line-clamp-2">{alt || "Image unavailable"}</span>
          {process.env.NODE_ENV === "development" && (
            <span className="text-[10px] text-red-400 max-w-[80%] truncate" title={displaySrc}>
              {error ? "Load failed" : "Invalid src"}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${containerClassName}`} style={!fill ? { width, height } : undefined}>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className={`absolute inset-0 animate-pulse bg-gray-200 ${
            fill ? "h-full w-full" : ""
          }`}
          style={!fill ? { width, height } : undefined}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        unoptimized={src.includes("data:")} // Don't optimize data URIs
      />
    </div>
  );
}

/**
 * ProductImage - Specialized wrapper for product images with consistent styling
 */
export function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <SafeImage
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-contain ${className}`}
      containerClassName="relative h-full w-full"
    />
  );
}

/**
 * BrandLogo - Specialized wrapper for brand logos
 */
export function BrandLogo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <SafeImage
      src={src}
      alt={alt}
      fill
      sizes="48px"
      className={`object-contain ${className}`}
      containerClassName="relative h-full w-full"
    />
  );
}
