export default function WholesaleGiftCardsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Wholesale Gift Cards</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Bulk Digital Gift Cards for Your Business</h2>
                <p className="text-lg leading-relaxed">
                  CDKeyVast offers competitive wholesale pricing on digital gift cards and game codes for businesses of all sizes. 
                  Whether you're a retailer, corporate buyer, or reseller, our wholesale program provides you with instant access 
                  to digital products at bulk pricing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Our Wholesale Program?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-blue-900">Competitive Pricing</h3>
                    <p>Get bulk discounts on all major gift card brands and game codes with tiered pricing based on volume.</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-green-900">Instant Delivery</h3>
                    <p>All wholesale orders are delivered digitally within minutes, ensuring you can serve your customers immediately.</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-purple-900">Wide Selection</h3>
                    <p>Access our complete catalog of gaming gift cards, digital wallets, and entertainment codes.</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-orange-900">Dedicated Support</h3>
                    <p>Get priority customer service from our wholesale team with dedicated account management.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Available Wholesale Categories</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Gaming Gift Cards (PlayStation, Xbox, Nintendo)",
                    "Digital Wallets (Steam, Google Play, iTunes)",
                    "Entertainment Cards (Netflix, Spotify, etc.)",
                    "Prepaid Cards (Visa, Mastercard Gift Cards)",
                    "Mobile Top-up Cards",
                    "Software & Subscription Cards"
                  ].map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{category}</h3>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Wholesale Pricing Tiers</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Order</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Small (100-500 units)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5-10% off</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$500</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Medium (500-2,000 units)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10-15% off</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$2,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Large (2,000+ units)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15-20% off</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$5,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-900">How to Get Started</h2>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Contact our wholesale team with your business requirements</li>
                  <li>Complete our wholesale application and verification process</li>
                  <li>Receive your wholesale pricing catalog and account setup</li>
                  <li>Place your first bulk order and receive instant delivery</li>
                  <li>Enjoy ongoing wholesale benefits and dedicated support</li>
                </ol>
              </div>

              <div className="text-center bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ready to Start Buying Wholesale?</h2>
                <p className="text-lg mb-6 text-gray-700">Contact our wholesale team today to discuss your business needs and get a custom quote.</p>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900"><strong>Email:</strong> wholesale@cdkeyvast.com</p>
                  <p className="font-semibold text-gray-900"><strong>Phone:</strong> 1-800-257-7221</p>
                  <p className="font-semibold text-gray-900"><strong>Hours:</strong> Monday-Friday, 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
