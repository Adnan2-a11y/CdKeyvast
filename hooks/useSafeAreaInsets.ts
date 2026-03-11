"use client";

import { useState, useEffect } from "react";

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function useSafeAreaInsets(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const getSafeAreaInsets = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const top = parseInt(computedStyle.getPropertyValue("--safe-area-inset-top") || "0", 10);
      const right = parseInt(computedStyle.getPropertyValue("--safe-area-inset-right") || "0", 10);
      const bottom = parseInt(computedStyle.getPropertyValue("--safe-area-inset-bottom") || "0", 10);
      const left = parseInt(computedStyle.getPropertyValue("--safe-area-inset-left") || "0", 10);

      setInsets({ top, right, bottom, left });
    };

    // Initial calculation
    getSafeAreaInsets();

    // Recalculate on window resize and orientation change
    const handleResize = () => {
      getSafeAreaInsets();
    };

    const handleOrientationChange = () => {
      // Small delay to ensure CSS variables are updated
      setTimeout(getSafeAreaInsets, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return insets;
}
