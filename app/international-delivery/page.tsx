export default function InternationalDeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">International Email Delivery</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose max-w-none">
            <div className="space-y-8 text-gray-700">
              
              {/* Hero Section */}
              <div className="text-center mb-12">
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                  CDKeyVast delivers digital gift cards and game codes to customers worldwide via email. 
                  Get instant access to your purchases, no matter where you are located.
                </p>
              </div>

              {/* How It Works */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">How International Delivery Works</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Place Order</h3>
                    <p className="text-sm">Browse and purchase from our global catalog</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Payment</h3>
                    <p className="text-sm">Pay using international payment methods</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Verification</h3>
                    <p className="text-sm">Quick security verification (if needed)</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-600">4</span>
                    </div>
                    <h3 className="font-semibold mb-2">Email Delivery</h3>
                    <p className="text-sm">Receive codes instantly via email</p>
                  </div>
                </div>
              </div>

              {/* Supported Regions */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Global Coverage</h2>
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <p className="text-lg mb-4">
                    We deliver to <strong>195+ countries and territories</strong> worldwide. Our automated 
                    delivery system ensures you receive your digital codes regardless of your location.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">North America</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• United States</li>
                      <li>• Canada</li>
                      <li>• Mexico</li>
                      <li>• Guatemala</li>
                      <li>• Costa Rica</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">Europe</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• United Kingdom</li>
                      <li>• Germany</li>
                      <li>• France</li>
                      <li>• Italy</li>
                      <li>• Spain</li>
                      <li>• Netherlands</li>
                      <li>• Poland</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">Asia Pacific</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Australia</li>
                      <li>• Japan</li>
                      <li>• Singapore</li>
                      <li>• India</li>
                      <li>• South Korea</li>
                      <li>• Malaysia</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Delivery Times */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Delivery Timeframes</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-600">Standard Delivery</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Most Orders:</span>
                        <span className="font-semibold">Instant (5-15 minutes)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>With Verification:</span>
                        <span className="font-semibold">1-2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manual Processing:</span>
                        <span className="font-semibold">2-24 hours</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-orange-600">Factors That May Delay</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• High-volume periods (holidays, sales)</li>
                      <li>• Additional security verification</li>
                      <li>• Payment processing delays</li>
                      <li>• Time zone differences</li>
                      <li>• Regional banking restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">International Payment Methods</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">💳</div>
                    <h3 className="font-semibold text-sm">Credit/Debit Cards</h3>
                    <p className="text-xs text-gray-600 mt-1">Visa, Mastercard, Amex</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <h3 className="font-semibold text-sm">Digital Wallets</h3>
                    <p className="text-xs text-gray-600 mt-1">PayPal, Apple Pay</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🏦</div>
                    <h3 className="font-semibold text-sm">Bank Transfer</h3>
                    <p className="text-xs text-gray-600 mt-1">Wire, SWIFT</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🪙</div>
                    <h3 className="font-semibold text-sm">Cryptocurrency</h3>
                    <p className="text-xs text-gray-600 mt-1">Bitcoin, Ethereum</p>
                  </div>
                </div>
              </div>

              {/* Regional Considerations */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Regional Considerations</h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-900">Important Notes</h3>
                    <ul className="space-y-2 text-yellow-800">
                      <li>• Some digital codes may have regional restrictions</li>
                      <li>• Prices are displayed in USD but charged in your local currency</li>
                      <li>• Your bank may apply currency conversion fees</li>
                      <li>• Certain countries may require additional verification</li>
                      <li>• Local taxes may apply depending on your location</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Language Support */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Language & Currency Support</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">Supported Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Arabic"].map((lang) => (
                        <span key={lang} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">Supported Currencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY", "KRW", "INR", "BRL"].map((currency) => (
                        <span key={currency} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {currency}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Support */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">24/7 International Support</h2>
                <p className="mb-4">
                  Our multilingual customer support team is available around the clock to assist customers 
                  from all over the world.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900">Contact Methods</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Email: support@cdkeyvast.com</li>
                      <li>• Live Chat: Available on website</li>
                      <li>• Phone: +1-800-257-7220 (International rates apply)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900">Support Languages</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• English (24/7)</li>
                      <li>• Spanish (Business hours)</li>
                      <li>• French (Business hours)</li>
                      <li>• German (Business hours)</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
