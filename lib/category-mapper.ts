/**
 * Category Mapper Utility
 * 
 * Merges dynamic WordPress product categories with static UI metadata (icons, subcategories).
 * This allows categories to be fully dynamic from WordPress while maintaining rich UI features.
 * 
 * Architecture:
 * - WordPress provides: id, name, slug, count (dynamic data)
 * - Static metadata provides: icon, subcategories (UI enhancements)
 * - Mapper combines both for rendering
 */

import { ProductCategory, CategoryWithMetadata, NavItem } from "@/types/woocommerce";

/**
 * Static category metadata mapping.
 * Keyed by category slug for fast lookups.
 * When the category exists in WordPress, we merge this metadata with the dynamic data.
 */
const CATEGORY_METADATA: Record<string, { icon: string; subcategories?: NavItem[] }> = {
  "game-cards": {
    icon: "🎮",
    subcategories: [
      { label: "Apple/iTunes Gift Cards", href: "/products?category=Apple%20%2F%20iTunes" },
      { label: "Google Play Gift Cards", href: "/products?category=Google%20Play" },
      { label: "Playstation Gift Cards", href: "/products?category=Playstation" },
      { label: "Nintendo eShop Gift Cards", href: "/products?category=Game%20Cards" },
      { label: "Xbox Gift Cards", href: "/products?category=Game%20Cards" },
      { label: "Minecraft Game Cards", href: "/products?category=Game%20Cards" },
      { label: "Karma Koin Game Cards", href: "/products?category=Game%20Cards" },
      { label: "Nexon Game Cards", href: "/products?category=Game%20Cards" },
      { label: "League Of Legends Game Cards", href: "/products?category=Game%20Cards" },
      { label: "EA Gift Cards", href: "/products?category=Game%20Cards" },
      { label: "Blizzard Game Cards", href: "/products?category=Game%20Cards" },
      { label: "Facebook Gift Cards", href: "/products?category=Game%20Cards" },
      { label: "Razer Gold Game Cards", href: "/products?category=Game%20Cards" },
      { label: "IMVU Game Cards", href: "/products?category=Game%20Cards" },
      { label: "Roblox Game Cards", href: "/products?category=Game%20Cards" },
      { label: "Final Fantasy XIV - 60 Day Time Cards", href: "/products?category=Game%20Cards" },
      { label: "UC PUBG Mobile Game Cards", href: "/products?category=Game%20Cards" },
      { label: "VALORANT Game Cards", href: "/products?category=Game%20Cards" },
      { label: "Webkinz Gift Cards", href: "/products?category=Game%20Cards" },
      { label: "Fortnite V-Bucks", href: "/products?category=Game%20Cards" },
      { label: "Steam Game Cards", href: "/products?category=Steam" },
    ],
  },
  "gift-cards": {
    icon: "🎁",
    subcategories: [
      { label: "Amazon Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "Skype Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "Hulu Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "Spotify Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "Netflix Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "eBay Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "MLB.TV Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "Vudu Gift Cards", href: "/products?category=Gift%20Cards" },
      { label: "Binance USDT Gift Cards", href: "/products?category=Gift%20Cards" },
    ],
  },
  playstation: { icon: "🎯" },
  "google-play": { icon: "📱" },
  steam: { icon: "🚂" },
  xbox: { icon: "🎮" },
  apple: { icon: "🍎" },
  amazon: { icon: "📦" },
  netflix: { icon: "🎬" },
  spotify: { icon: "🎵" },
};

/**
 * Merges a WordPress ProductCategory with optional UI metadata.
 * 
 * @param category - The product category from WordPress
 * @returns CategoryWithMetadata - Category with merged metadata
 */
export function enrichCategory(category: ProductCategory): CategoryWithMetadata {
  const metadata = CATEGORY_METADATA[category.slug] || {};
  
  return {
    ...category,
    icon: metadata.icon,
    subcategories: metadata.subcategories,
  };
}

/**
 * Enriches an array of WordPress categories with UI metadata.
 * 
 * @param categories - Array of categories from WordPress
 * @returns Array of enriched categories for UI rendering
 */
export function enrichCategories(
  categories: ProductCategory[]
): CategoryWithMetadata[] {
  return categories.map(enrichCategory);
}

/**
 * Gets a category by slug with metadata enriched.
 * Useful for dynamic lookups throughout the app.
 * 
 * @param categories - Available categories (usually from server)
 * @param slug - Category slug to find
 * @returns The enriched category or undefined
 */
export function getCategoryBySlug(
  categories: ProductCategory[],
  slug: string
): CategoryWithMetadata | undefined {
  const category = categories.find((c) => c.slug === slug);
  return category ? enrichCategory(category) : undefined;
}

/**
 * Generates navigation items for primary categories.
 * Used in Header/Navigation components.
 * 
 * @param categories - Categories to convert to nav items
 * @returns Array of navigation items
 */
export function categoriesToNavItems(categories: ProductCategory[]): NavItem[] {
  return categories.map((cat) => ({
    label: cat.name,
    href: `/products?category=${encodeURIComponent(cat.slug)}`,
  }));
}

/**
 * Searches for categories matching a query string.
 * Case-insensitive partial match on name.
 * 
 * @param categories - Categories to search
 * @param query - Search query
 * @returns Matching categories
 */
export function searchCategories(
  categories: ProductCategory[],
  query: string
): CategoryWithMetadata[] {
  const lowerQuery = query.toLowerCase();
  return categories
    .filter((cat) => cat.name.toLowerCase().includes(lowerQuery))
    .map(enrichCategory);
}

/**
 * Gets top/featured category for homepage or marketing pages.
 * @param categories - Available categories
 * @param slug - Slug of featured category (defaults to "game-cards")
 * @returns The featured category or first category
 */
export function getFeaturedCategory(
  categories: ProductCategory[],
  slug: string = "game-cards"
): CategoryWithMetadata {
  const featured =
    categories.find((c) => c.slug === slug) || categories[0];
  return enrichCategory(featured);
}

/**
 * Sort categories by product count (descending).
 * Useful for displaying popular categories first.
 * 
 * @param categories - Categories to sort
 * @returns Sorted categories
 */
export function sortCategoriesByCount(
  categories: ProductCategory[]
): CategoryWithMetadata[] {
  return [...categories]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .map(enrichCategory);
}

/**
 * Legacy support: Convert enriched categories to old format.
 * Used for gradual migration from hardcoded categories.
 * 
 * @param categories - Enriched categories
 * @returns Categories in legacy format
 * @deprecated Use CategoryWithMetadata directly; this is for backwards compatibility only.
 */
export function toLegacyFormat(
  categories: CategoryWithMetadata[]
): Array<{ name: string; icon?: string; subcategories?: NavItem[] }> {
  return categories.map((cat) => ({
    name: cat.name,
    icon: cat.icon,
    subcategories: cat.subcategories,
  }));
}
