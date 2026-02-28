"use client";

import { useState } from "react";
import { Star, MessageSquare, X } from "lucide-react";
import { motion } from "framer-motion";

const reviewData = {
  totalReviews: 17675,
  productReviews: 16333,
  siteReviews: 1342,
  categories: [
    { id: "product", name: "PRODUCT REVIEWS", count: 16333, active: true },
    { id: "site", name: "SITE REVIEWS", count: 1342, active: false }
  ],
  reviews: [
    {
      id: 1,
      productImage: "/placeholder.svg",
      productName: "undefined Gift Card",
      date: "02/16/2026",
      rating: 5,
      reviewer: "Priscilla Montoya",
      verified: true,
      title: "Best best",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      productImage: "/placeholder.svg",
      productName: "$50 USA PlayStation Network Card",
      date: "02/15/2026",
      rating: 5,
      reviewer: "Tayah",
      verified: true,
      title: "Amazing site",
      comment: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 3,
      productImage: "/placeholder.svg",
      productName: "undefined Gift Card",
      date: "02/14/2026",
      rating: 5,
      reviewer: "William Johnson IV",
      verified: true,
      title: "Awesome",
      comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      id: 4,
      productImage: "/placeholder.svg",
      productName: "Steam Card",
      date: "02/13/2026",
      rating: 5,
      reviewer: "Christine Quintana",
      verified: true,
      title: "Steam card",
      comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 5,
      productImage: "/placeholder.svg",
      productName: "undefined Gift Card",
      date: "02/12/2026",
      rating: 5,
      reviewer: "Marko",
      verified: true,
      title: "Good service",
      comment: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    },
    {
      id: 6,
      productImage: "/placeholder.svg",
      productName: "PlayStation Gift Card",
      date: "02/11/2026",
      rating: 5,
      reviewer: "Shaquille Williams",
      verified: true,
      title: "Fast delivery",
      comment: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos."
    }
  ]
};

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState("product");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-4 font-display text-3xl font-bold uppercase tracking-wider text-foreground md:text-4xl">
            Reviews from our <span className="text-primary">Customers!</span>
          </h1>
          <p className="text-2xl font-semibold text-foreground">
            Total of <span className="text-primary">{reviewData.totalReviews.toLocaleString()}</span> reviews
          </p>
        </motion.div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-4">
          {reviewData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-secondary text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {category.count} - {category.name}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviewData.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              {/* Product Info */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                  <img 
                    src={review.productImage} 
                    alt={review.productName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{review.productName}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Reviewer Info */}
              <div className="mb-3 flex items-center gap-2">
                <span className="font-semibold text-foreground">{review.reviewer}</span>
                {review.verified && (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    Verified Buyer
                  </span>
                )}
              </div>

              {/* Review Title */}
              <h3 className="mb-2 font-bold text-foreground">{review.title}</h3>

              {/* Review Comment */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="rounded-lg border border-primary bg-primary/10 px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
