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
  count?: number;
}

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
