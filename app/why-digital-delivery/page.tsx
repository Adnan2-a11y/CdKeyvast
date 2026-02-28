export default function WhyDigitalDeliveryPage() {
  const benefits = [
    {
      title: "Instant Access",
      description: "Get your games and gift codes immediately after purchase",
      icon: "⚡",
      features: ["No waiting for shipping", "24/7 automated delivery", "Start gaming right away"]
    },
    {
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint with digital products",
      icon: "🌱",
      features: ["No plastic waste", "No shipping emissions", "Paperless transactions"]
    },
    {
      title: "Never Lost",
      description: "Your digital codes are safe and always accessible",
      icon: "🔒",
      features: ["Email delivery confirmation", "Cloud storage", "Easy recovery options"]
    },
    {
      title: "Global Access",
      description: "Shop from anywhere in the world",
      icon: "🌍",
      features: ["No shipping restrictions", "Instant international delivery", "Multi-currency support"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Why Digital Delivery?</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose max-w-none">
            <div className="space-y-8 text-gray-700">
              
              {/* Hero Section */}
              <div className="text-center mb-12">
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                  Digital delivery is revolutionizing how we buy and play games. Discover why millions of gamers 
                  worldwide are choosing digital over physical products.
                </p>
              </div>

              {/* Main Benefits Grid */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">The Digital Advantage</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{benefit.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
                          <p className="text-gray-600 mb-4">{benefit.description}</p>
                          <ul className="space-y-1">
                            {benefit.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm">
                                <span className="text-green-600 mr-2">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Table */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Digital vs Physical: Side by Side</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital Delivery</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Physical Products</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delivery Time</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Instant</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">3-7 days</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Environmental Impact</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Minimal</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">High</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Storage Space</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Digital</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Physical space needed</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Risk of Loss/Damage</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">None</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Possible</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Resale Value</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Limited</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Available</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Global Access</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Worldwide</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Regional restrictions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Environmental Impact */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Environmental Benefits</h2>
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-green-900">What You Save by Going Digital</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3">🌍</span>
                          <div>
                            <strong>Plastic Reduction:</strong> No plastic cases, discs, or packaging
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3">📦</span>
                          <div>
                            <strong>Shipping Emissions:</strong> No trucks, planes, or ships needed
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3">📄</span>
                          <div>
                            <strong>Paper Waste:</strong> No manuals, inserts, or receipts
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3">⚡</span>
                          <div>
                            <strong>Energy Efficiency:</strong> No manufacturing energy required
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-600 mb-2">1.2M+</div>
                      <p className="text-gray-700">
                        Trees saved annually by gamers choosing digital delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Convenience Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Unmatched Convenience</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <div className="text-3xl mb-3">🕐</div>
                    <h3 className="font-semibold mb-2">24/7 Availability</h3>
                    <p className="text-sm text-gray-600">
                      Buy anytime, anywhere. No store hours to worry about
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <div className="text-3xl mb-3">🔄</div>
                    <h3 className="font-semibold mb-2">Easy Redownloads</h3>
                    <p className="text-sm text-gray-600">
                      Lost your game? Redownload anytime from your account
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg text-center">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="font-semibold mb-2">Easy Gifting</h3>
                    <p className="text-sm text-gray-600">
                      Send digital gifts instantly via email
                    </p>
                  </div>
                </div>
              </div>

              {/* Future of Gaming */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">The Future is Digital</h2>
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Industry Trends</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <span className="text-purple-600 mr-3">📈</span>
                          <span>80% of new game sales are now digital</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-purple-600 mr-3">🎮</span>
                          <span>Major consoles focus on digital-first experiences</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-purple-600 mr-3">☁️</span>
                          <span>Cloud gaming eliminates hardware requirements</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-purple-600 mr-3">📱</span>
                          <span>Cross-platform play becomes standard</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-purple-600 mb-2">2030</div>
                      <p className="text-gray-700">
                        The year physical game media becomes niche
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Safety */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Security & Peace of Mind</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Digital Security</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Encrypted delivery to your email</li>
                      <li>• Secure payment processing</li>
                      <li>• Account protection features</li>
                      <li>• Backup and recovery options</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Physical Risks</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Lost or damaged in shipping</li>
                      <li>• Theft or misplacement</li>
                      <li>• Wear and tear over time</li>
                      <li>• Limited storage space</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Join the Digital Revolution</h2>
                <p className="mb-6 text-blue-100">
                  Experience the convenience, speed, and environmental benefits of digital delivery.
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Browse Digital Products
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
