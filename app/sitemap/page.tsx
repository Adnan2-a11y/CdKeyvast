import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Sitemap</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <div className="space-y-8">
              
              {/* Main Pages */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Main Pages</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/products" className="text-blue-600 hover:text-blue-800 underline">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/cart" className="text-blue-600 hover:text-blue-800 underline">
                        Shopping Cart
                      </Link>
                    </li>
                    <li>
                      <Link href="/checkout" className="text-blue-600 hover:text-blue-800 underline">
                        Checkout
                      </Link>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/account" className="text-blue-600 hover:text-blue-800 underline">
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" className="text-blue-600 hover:text-blue-800 underline">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/reviews" className="text-blue-600 hover:text-blue-800 underline">
                        Customer Reviews
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-blue-600 hover:text-blue-800 underline">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Product Categories */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Product Categories</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products?category=game-cards" className="text-blue-600 hover:text-blue-800 underline">
                        Game Cards
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=gift-cards" className="text-blue-600 hover:text-blue-800 underline">
                        Gift Cards
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=itunes" className="text-blue-600 hover:text-blue-800 underline">
                        iTunes Cards
                      </Link>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products?category=google-play" className="text-blue-600 hover:text-blue-800 underline">
                        Google Play Cards
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=steam" className="text-blue-600 hover:text-blue-800 underline">
                        Steam Cards
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=pc" className="text-blue-600 hover:text-blue-800 underline">
                        PC Gaming
                      </Link>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products?category=playstation" className="text-blue-600 hover:text-blue-800 underline">
                        PlayStation
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=xbox" className="text-blue-600 hover:text-blue-800 underline">
                        Xbox
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=nintendo" className="text-blue-600 hover:text-blue-800 underline">
                        Nintendo
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Information Pages */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Information & Support</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li>
                      <Link href="/wholesale-gift-cards" className="text-blue-600 hover:text-blue-800 underline">
                        Wholesale Gift Cards
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="text-blue-600 hover:text-blue-800 underline">
                        Customer Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/returns-and-refund-policy" className="text-blue-600 hover:text-blue-800 underline">
                        Returns & Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/international-delivery" className="text-blue-600 hover:text-blue-800 underline">
                        International Email Delivery
                      </Link>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/supported-games" className="text-blue-600 hover:text-blue-800 underline">
                        What Games Are Supported?
                      </Link>
                    </li>
                    <li>
                      <Link href="/why-digital-delivery" className="text-blue-600 hover:text-blue-800 underline">
                        Why Digital Delivery?
                      </Link>
                    </li>
                    <li>
                      <Link href="/why-cdkeyvast" className="text-blue-600 hover:text-blue-800 underline">
                        Why CDKeyVast?
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Legal Pages */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Legal & Policies</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li>
                      <Link href="/terms-and-conditions" className="text-blue-600 hover:text-blue-800 underline">
                        Terms and Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800 underline">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/blog" className="text-blue-600 hover:text-blue-800 underline">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/sitemap" className="text-blue-600 hover:text-blue-800 underline">
                        Sitemap
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Need Help?</h2>
                <p className="text-gray-700 mb-4">
                  If you can't find what you're looking for, our customer support team is here to help 24/7.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    <strong>Email:</strong> support@cdkeyvast.com
                  </p>
                  <p className="font-semibold text-gray-900">
                    <strong>Phone:</strong> 1-800-257-7220
                  </p>
                  <p className="font-semibold text-gray-900">
                    <strong>Hours:</strong> 24/7/365
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
