// WooCommerce / Product Types
export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
<<<<<<< HEAD
  count?: number;
}

=======
  parent?: number;
  count?: number;
}

/**
 * Enhanced category for UI rendering with metadata.
 * Extends ProductCategory with optional display properties (icon, subcategories).
 * Used in components like ProductsClient for rendering with custom styling.
 */
export interface CategoryWithMetadata extends ProductCategory {
  icon?: string; // Emoji or icon identifier
  subcategories?: NavItem[];
}

/**
 * Navigation item (used in category subcategories and menus).
 */
export interface NavItem {
  label: string;
  href: string;
}

export interface CategoryTreeNode {
  id: number;
  name: string;
  slug: string;
  parent?: number;
  count?: number;
  children: CategoryTreeNode[];
}

export interface HeaderMenuCategory {
  label: string;
  href: string;
  children: NavItem[];
}

>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  regular_price: number;
  sale_price?: number;
  on_sale: boolean;
  images: ProductImage[];
  categories: ProductCategory[];
  platform: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  average_rating: number;
  rating_count: number;
  sku: string;
  tags: string[];
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Order Types
export interface BillingAddress {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface OrderLineItem {
  product_id: number;
  quantity: number;
  name?: string;
  total?: string;
}

export interface CreateOrderPayload {
  billing: BillingAddress;
  line_items: OrderLineItem[];
<<<<<<< HEAD
=======
  coupon_lines?: Array<{ code: string }>;  // Optional coupon lines for order
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
  payment_method: string;
  payment_method_title: string;
}

export interface Order {
  id: number;
  status: string;
  total: string;
  date_created: string;
  billing: BillingAddress;
  line_items: OrderLineItem[];
  payment_url?: string;
}

// Auth Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
<<<<<<< HEAD
=======
// Coupon Types
export interface Coupon {
  id: number;
  code: string;
  discount_type: "percent" | "fixed_cart" | "fixed_product";
  amount: string;
  description?: string;
  date_expires?: string | null;
  usage_limit?: number | null;
  usage_limit_per_user?: number | null;
  used_by?: string[];
  usage_count: number;
  enable_free_shipping: boolean;
  exclude_sale_items: boolean;
  minimum_amount?: string;
  maximum_amount?: string;
  product_ids?: number[];
  excluded_product_ids?: number[];
  product_categories?: number[];
  excluded_product_categories?: number[];
  status?: "publish" | "draft";
}

export interface ApplyCouponPayload {
  coupon_code: string;
  cart_items: CartItem[];
  cart_total: number;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  discount_amount?: number;
  discount_percentage?: number;
  error_message?: string;
  reason?: "expired" | "usage_limit" | "minimum_amount" | "not_found" | "invalid" | "other";
}

export interface ApplyCouponResponse {
  success: boolean;
  coupon_code: string;
  discount_amount: number;
  discount_type: "percent" | "fixed_cart" | "fixed_product";
  new_total: number;
  message?: string;
  error?: string;
}
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
