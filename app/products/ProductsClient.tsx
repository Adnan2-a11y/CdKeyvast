"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, ShoppingCart, Star, Tag, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product, ProductCategory } from "@/types/woocommerce";
import { useCart } from "@/contexts/CartContext";
import { productCategories, type Category } from "@/lib/categories";
import { useDebounce } from "use-debounce";

// ISR handled by the Server Component wrapper — this is the interactive client layer
export const dynamic = "force-dynamic"; // products page uses URL searchParams


// ── Sort Types & Options ────────────────────────────────────────────────────
// SortValue is derived from the array — adding a new option here automatically
// expands the type. No need to maintain a separate type union manually.
const SORT_OPTIONS = [
  { value: "popular",    label: "Most Popular" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Highest Rated" },
] as const;

type SortValue = typeof SORT_OPTIONS[number]["value"]; // "popular" | "price-asc" | "price-desc" | "rating"

/** Type-guard: rejects any string not in SORT_OPTIONS (e.g. from a tampered URL) */
function isValidSort(value: string | null): value is SortValue {
  return SORT_OPTIONS.some((o) => o.value === value);
}

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategories: ProductCategory[];
}

export default function ProductsClient({ initialProducts, initialCategories }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  // Initialized directly from URL — Back/Forward browser navigation automatically
  // triggers searchParams to change, which re-runs the sync useEffect below.
  const rawSort = searchParams.get("sort");
  const [sort, setSort] = useState<SortValue>(isValidSort(rawSort) ? rawSort : "popular");
  
  // Logic State:Only updates after 500ms of silence
  const [debouncedSearch] = useDebounce(search, 500);

  // 3. URL Sync: Update the address bar only when the user is done typing
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  
  // Only update if the value actually changed to prevent loops
  if (params.get("search") === debouncedSearch) return;

  if (debouncedSearch) {
    params.set("search", debouncedSearch);
  } else {
    params.delete("search");
  }
  
  router.push(`?${params.toString()}`, { scroll: false });
}, [debouncedSearch, router]);

  // ── URL → State Sync (handles Back/Forward navigation) ───────────────────
  // This is the ONLY place setSort and setActiveCategory are called.
  // It fires on every URL change, making browser history work for free.
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const rawSortParam = searchParams.get("sort");

    setActiveCategory(category);
    // Validate sort from URL before trusting it — prevents invalid WC API calls
    setSort(isValidSort(rawSortParam) ? rawSortParam : "popular");
  }, [searchParams]);

  // Fetch products when filters change
  /*useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory) params.set("category", activeCategory);
        if (search) params.set("search", search);
        if (sort && sort !== "popular") params.set("sort", sort);

        const response = await fetch(`/api/products?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, search, sort]);*/
  // ── Optimized Fetch: Fires only on debounced/URL-driven state changes ────
  // WooCommerce API mapping:
  //   sort="popular"    → (no orderby param)      → WC default (date)
  //   sort="price-asc"  → orderby=price&order=asc  → handled in woocommerce.server.ts
  //   sort="price-desc" → orderby=price&order=desc → handled in woocommerce.server.ts
  //   sort="rating"     → orderby=rating&order=desc→ handled in woocommerce.server.ts
  // The API route at /api/products passes `sort` through to getProducts(), which
  // does the WC param translation — no duplication needed here.
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory) params.set("category", activeCategory);
        if (debouncedSearch) params.set("search", debouncedSearch);
        // Only append sort if it differs from the default — keeps URLs cleaner
        if (sort && sort !== "popular") params.set("sort", sort);

        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) {
          // Surface HTTP errors (500, 503) to the console with context
          console.error(`[products] API error ${response.status}:`, await response.text());
          return;
        }
        const data = await response.json();
        setProducts(data.products ?? []);
      } catch (err) {
        console.error("[products] Network error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, debouncedSearch, sort]);

  // ── URL-First Handlers ─────────────────────────────────────────────────────
  // These ONLY update the URL. The searchParams useEffect above reads the URL
  // and updates local state, which then triggers the fetch useEffect.
  // This is the single source of truth pattern — no state duplication.

  const handleSortChange = (newSort: string) => {
    // Reject any value not in SORT_OPTIONS — guards against DOM manipulation
    if (!isValidSort(newSort)) return;

    const params = new URLSearchParams(window.location.search);
    // Keep the URL clean: omit the param entirely when it's the default
    if (newSort !== "popular") {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }
    // scroll: false prevents jarring page-top jump on sort change
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(window.location.search);
    // Toggle logic: clicking the active category deselects it
    const newCategory = activeCategory === categoryName ? "" : categoryName;
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - 260px width */}
          <div className="w-64 flex-shrink-0">
            {/* Categories Card */}
            <div className="bg-white rounded-lg border border-gray-200 mb-4">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <h3 className="font-bold text-gray-900 uppercase tracking-wide">CATEGORIES</h3>
                </div>
              </div>
              <div className="p-2">
                {productCategories.map((category: Category) => (
                  <div key={category.name} className="mb-2">
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setExpandedCategory(expandedCategory === category.name ? null : category.name);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-md transition-colors group ${
                        activeCategory === category.name
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className={`text-sm font-medium ${
                          activeCategory === category.name
                            ? "text-blue-700"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {category.subcategories && category.subcategories.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCategory(expandedCategory === category.name ? null : category.name);
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform ${
                                expandedCategory === category.name ? "rotate-180" : ""
                              } text-gray-400 group-hover:text-gray-600`} 
                            />
                          </button>
                        )}
                      </div>
                    </button>
                    
                    {/* Subcategories dropdown */}
                    {category.subcategories && category.subcategories.length > 0 && expandedCategory === category.name && (
                      <div className="ml-8 mt-1 space-y-1">
                        {category.subcategories.map((subcategory, index) => (
                          <Link
                            key={index}
                            href={subcategory.href}
                            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                              activeCategory === subcategory.label
                                ? "text-blue-700 bg-blue-50 font-medium"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {subcategory.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Promotion Card - $1 OFF */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-4 mb-4 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">$1 OFF</div>
                <div className="text-sm mb-3">TOTAL ORDER</div>
                <div className="border-t border-red-500 pt-3">
                  <div className="text-xs font-semibold mb-1">NEW CUSTOMER COUPON</div>
                  <div className="text-lg font-bold">NEW79</div>
                  <div className="text-xs mt-2 opacity-90">Valid Jan 1st to March 31st</div>
                </div>
              </div>
            </div>

            {/* Xbox Promotion Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 text-white">
              <div className="text-center">
                <div className="text-lg font-bold mb-1">XBOX ONE</div>
                <div className="text-2xl font-bold mb-2">BUY NOW!</div>
                <div className="text-lg font-semibold">PLAY NOW!</div>
                <div className="mt-3 flex justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-lg p-8 mb-6 text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Buy Game Cards Online</h1>
              <p className="text-gray-300">Browse thousands of digital keys at unbeatable prices</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  disabled={loading}
                  className={`rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none transition-opacity ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid - 4 columns */}
            {/* Loading uses opacity overlay instead of replacing the grid with skeletons.
                This prevents layout shift on sort/filter changes — the cards stay in place
                and dim to signal that new data is incoming. Skeletons only show on the
                very first load when there are no products to display yet. */}
            {!loading && products.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-lg">No games found matching your criteria.</p>
              </div>
            ) : loading && products.length === 0 ? (
              // First-load skeleton — only shown when there's nothing to overlay
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="h-48 bg-gray-200" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-8 bg-red-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Overlay pattern: grid stays visible but dims during re-fetches
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${
                  loading ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}
              >
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard
                      title={product.name}
                      image={product.images[0]?.src || ""}
                      brandImage={product.images[0]?.src || ""}
                      brandName={product.platform || "Digital"}
                      deliveryMethod="Email Delivery"
                      price={Number(product.price)}
                      originalPrice={product.regular_price ? Number(product.regular_price) : undefined}
                      discount={
                        product.on_sale && product.regular_price
                          ? Math.round((1 - Number(product.price) / Number(product.regular_price)) * 100)
                          : undefined
                      }
                      platform={product.platform}
                      slug={product.slug}
                      rating={product.average_rating}
                      ratingCount={product.rating_count}
                      onAddToCart={() => addItem(product)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
