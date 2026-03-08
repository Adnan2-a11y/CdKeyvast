/**
 * useCategories Hook
 * 
 * Provides memoized category operations and utilities.
 * Handles category enrichment, searching, and filtering.
 * 
 * Usage:
 *   const { categories, searchCategoriesBy, getCategoryInfo } = useCategories(rawCategories);
 */

"use client";

import { useMemo, useCallback, useState } from "react";
import { 
  enrichCategories,
  getCategoryBySlug,
  searchCategories,
  sortCategoriesByCount,
} from "@/lib/category-mapper";
import { ProductCategory, CategoryWithMetadata } from "@/types/woocommerce";

interface UseCategoriesReturn {
  /** Enriched categories with UI metadata */
  categories: CategoryWithMetadata[];
  
  /** Find a specific category by slug */
  getCategoryInfo: (slug: string) => CategoryWithMetadata | undefined;
  
  /** Search categories by name (memoized) */
  searchCategoriesBy: (query: string) => CategoryWithMetadata[];
  
  /** Get categories sorted by product count */
  getPopularCategories: (limit?: number) => CategoryWithMetadata[];
  
  /** Total number of categories */
  totalCount: number;
}

/**
 * Hook that enriches and processes product categories.
 * 
 * @param rawCategories - Categories from WordPress API
 * @returns Category utilities and memoized data
 */
export function useCategories(rawCategories: ProductCategory[]): UseCategoriesReturn {
  // Memoize enriched categories to prevent unnecessary re-renders
  const categories = useMemo(
    () => enrichCategories(rawCategories),
    [rawCategories]
  );

  // Memoize category lookup callback
  const getCategoryInfo = useCallback(
    (slug: string) => getCategoryBySlug(rawCategories, slug),
    [rawCategories]
  );

  // Memoize search callback
  const searchCategoriesBy = useCallback(
    (query: string) => searchCategories(rawCategories, query),
    [rawCategories]
  );

  // Memoize popular categories
  const getPopularCategories = useCallback(
    (limit = 5) => {
      const sorted = sortCategoriesByCount(rawCategories);
      return limit > 0 ? sorted.slice(0, limit) : sorted;
    },
    [rawCategories]
  );

  return {
    categories,
    getCategoryInfo,
    searchCategoriesBy,
    getPopularCategories,
    totalCount: rawCategories.length,
  };
}

/**
 * Hook for managing category filter state.
 * Handles active category selection with type safety.
 * 
 * Usage:
 *   const { activeCategory, setActive, isActive } = useCategoryFilter();
 */
export function useCategoryFilter() {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const setActive = useCallback((categorySlugOrName: string) => {
    setActiveCategory(categorySlugOrName);
  }, []);

  const clearActive = useCallback(() => {
    setActiveCategory("");
  }, []);

  const isActive = useCallback(
    (categorySlugOrName: string) => activeCategory === categorySlugOrName,
    [activeCategory]
  );

  const toggle = useCallback((categorySlugOrName: string) => {
    setActiveCategory((prev) =>
      prev === categorySlugOrName ? "" : categorySlugOrName
    );
  }, []);

  return {
    activeCategory,
    setActive,
    clearActive,
    isActive,
    toggle,
  };
}
