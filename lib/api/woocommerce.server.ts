import "server-only";

/**
 * WooCommerce API Facade (Barrel File)
 * 
 * This file serves as the main entry point for the WooCommerce API layer.
 * It re-exports functionality from domain-specific modules to maintain 
 * backwards compatibility and provide a clean external API.
 */

export * from "./woocommerce/client.server";
export * from "./woocommerce/transforms.server";
export * from "./woocommerce/products.server";
export * from "./woocommerce/categories.server";
export * from "./woocommerce/coupons.server";
