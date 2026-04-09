import "server-only";

import { ProductCategory, CategoryTreeNode, HeaderMenuCategory } from "@/types/woocommerce";
import { logger } from "@/lib/logger";
import { wcFetch } from "./client.server";
import { transformCategory } from "./transforms.server";

/**
 * Fetch all visible WooCommerce categories.
 * ISR: revalidates every 300 seconds (5 min).
 */
export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const result = await wcFetch<Record<string, unknown>[]>({
      endpoint: "/wp-json/wc/v3/products/categories",
      params: { hide_empty: "true" },
      revalidate: 300,
      fetchAll: true,
    });

    const categories = result.data.map(transformCategory);
    logger.info("getCategories", `Returned ${categories.length} categories`);
    return categories;
  } catch (error) {
    logger.error("getCategories", "Failed to fetch categories", error);
    return [];
  }
}

export function buildCategoryTree(categories: ProductCategory[]): CategoryTreeNode[] {
  const nodesById = new Map<number, CategoryTreeNode>();
  for (const c of categories) {
    nodesById.set(c.id, {
      id: c.id,
      name: c.name,
      slug: c.slug,
      parent: c.parent,
      count: c.count,
      children: [],
    });
  }

  const roots: CategoryTreeNode[] = [];
  nodesById.forEach((node) => {
    const parentId = node.parent || 0;
    if (parentId && nodesById.has(parentId)) {
      nodesById.get(parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function categoryTreeToHeaderMenu(
  tree: CategoryTreeNode[],
  options?: {
    categoryHref?: (slug: string) => string;
    subcategoryHref?: (slug: string) => string;
  }
): HeaderMenuCategory[] {
  const categoryHref = options?.categoryHref ?? ((slug) => `/products?category=${encodeURIComponent(slug)}`);
  const subcategoryHref = options?.subcategoryHref ?? ((slug) => `/products?category=${encodeURIComponent(slug)}`);

  return tree.map((parent) => ({
    label: parent.name,
    href: categoryHref(parent.slug),
    children: parent.children.map((child) => ({
      label: child.name,
      href: subcategoryHref(child.slug),
    })),
  }));
}

export async function getHeaderMenuCategories(): Promise<HeaderMenuCategory[]> {
  const categories = await getCategories();
  const tree = buildCategoryTree(categories);
  return categoryTreeToHeaderMenu(tree);
}
