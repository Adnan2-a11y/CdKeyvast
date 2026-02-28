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

// ISR handled by the Server Component wrapper — this is the interactive client layer
export const dynamic = "force-dynamic"; // products page uses URL searchParams


const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Highest Rated" },
];

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
  const [sort, setSort] = useState(searchParams.get("sort") || "popular");

  // Sync state with URL parameters
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const searchQuery = searchParams.get("search") || "";
    const sortQuery = searchParams.get("sort") || "popular";
    
    setActiveCategory(category);
    setSearch(searchQuery);
    setSort(sortQuery);
  }, [searchParams]);

  // Fetch products when filters change
  useEffect(() => {
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
  }, [activeCategory, search, sort]);

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
                      onClick={() => {
                        const newCategory = activeCategory === category.name ? "" : category.name;
                        setActiveCategory(newCategory);
                        const params = new URLSearchParams(searchParams.toString());
                        if (newCategory) {
                          params.set("category", newCategory);
                        } else {
                          params.delete("category");
                        }
                        router.push(`/products?${params.toString()}`);
                      }}
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
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid - 4 columns */}
            {loading ? (
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
            ) : products.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-lg">No games found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
