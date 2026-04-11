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
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }

    // Safe description extraction
    const description = product.short_description
      ? product.short_description.replace(/<[^>]*>/g, "").slice(0, 160)
      : product.name.slice(0, 160);

    return {
      title: product.name,
      description,
      openGraph: {
        title: product.name,
        description,
        images: product.images?.[0]?.src ? [{ url: product.images[0].src }] : [],
        type: "website",
      },
      other: {
        "script:ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description,
          image: product.images?.[0]?.src,
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
  } catch (error) {
    console.error("[generateMetadata] Error generating metadata:", error);
    return {
      title: "Product Not Available",
      description: "This product is temporarily unavailable. Please try again later.",
    };
  }
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
