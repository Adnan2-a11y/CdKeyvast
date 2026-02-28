import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Digital Gift Cards",
      excerpt: "Everything you need to know about buying and using digital gift cards for gaming and entertainment.",
      date: "February 15, 2026",
      category: "Guides",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Top 10 Games to Buy with Steam Cards",
      excerpt: "Discover the best games you can purchase using Steam wallet cards this month.",
      date: "February 10, 2026",
      category: "Gaming",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Why Digital Delivery is the Future of Gaming",
      excerpt: "Explore the benefits of digital game delivery and how it's changing the gaming industry.",
      date: "February 5, 2026",
      category: "Industry News",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "How to Choose the Right Gift Card for Gamers",
      excerpt: "A comprehensive guide to selecting the perfect gift card for the gamer in your life.",
      date: "January 28, 2026",
      category: "Guides",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "PlayStation vs Xbox: Gift Card Comparison",
      excerpt: "Compare PlayStation Network and Xbox gift cards to find the best option for your needs.",
      date: "January 20, 2026",
      category: "Comparison",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "The Rise of Mobile Gaming Gift Cards",
      excerpt: "How mobile gaming has transformed the gift card market and what it means for consumers.",
      date: "January 15, 2026",
      category: "Industry News",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Guides", "Gaming", "Industry News", "Comparison", "Tips & Tricks"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CDKeyVast Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, guides, and tips about digital gift cards, gaming, and the entertainment industry.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Post Image */}
              <div className="h-48 bg-gray-200">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Post Content */}
              <div className="p-6">
                {/* Category and Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-blue-100">
            Subscribe to our newsletter for the latest blog posts, exclusive deals, and gaming news.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Gaming", "Gift Cards", "Steam", "PlayStation", "Xbox", 
              "Nintendo", "Mobile Gaming", "Digital Delivery", "Deals",
              "Reviews", "Guides", "News", "Tips", "Comparison"
            ].map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
