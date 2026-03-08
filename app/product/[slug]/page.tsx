import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getTopProductSlugs } from "@/lib/api/woocommerce.server";
import ProductDetailClient from "./ProductDetailClient";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

// Pre-render top products at build time
export async function generateStaticParams() {
  const slugs = await getTopProductSlugs(50);
  return slugs.map((slug) => ({ slug }));
}

// Dynamic SEO metadata with Open Graph + JSON-LD
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const description = product.short_description.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.images[0]?.src ? [{ url: product.images[0].src }] : [],
      type: "website",
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description,
        image: product.images[0]?.src,
        sku: product.sku,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
          availability:
            product.stock_status === "instock"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
        aggregateRating: product.rating_count > 0
          ? {
              "@type": "AggregateRating",
              ratingValue: product.average_rating,
              reviewCount: product.rating_count,
            }
          : undefined,
      }),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
