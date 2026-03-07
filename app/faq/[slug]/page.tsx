"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Tag } from "lucide-react";
import { faqItems, productCategories, type Category } from "@/lib/categories";

interface FAQPageProps {
  params: {
    slug: string;
  };
}

export default function FAQDynamicPage({ params }: FAQPageProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const faqItem = faqItems.find(item => 
    item.href === `/faq/${params.slug}`
  );

  if (!faqItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">FAQ Not Found</h1>
            <p className="text-gray-600 mb-6">The FAQ page you're looking for doesn't exist.</p>
            <Link 
              href="/faq" 
              className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Back to FAQ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getFAQContent = (slug: string) => {
    const contentMap: Record<string, { title: string; content: JSX.Element }> = {
      "why-game-card-delivery": {
        title: "Why Cd Key Vast?",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Instant Digital Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Cd Key Vast provides instant digital delivery of all game cards and gift cards. 
                No more waiting for physical cards or shipping delays. Once your payment is confirmed, 
                your digital codes are sent directly to your email within minutes.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                We offer the most comprehensive selection of game cards for all major platforms including 
                PlayStation, Xbox, Nintendo, Steam, Google Play, Apple iTunes, and many more. All your 
                gaming needs in one place.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Competitive Prices</h3>
              <p className="text-gray-600 leading-relaxed">
                Our direct relationships with suppliers allow us to offer competitive prices on all 
                products. We regularly update our prices to ensure you get the best value for your money.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">24/7 Customer Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated customer support team is available 24/7 to help you with any questions 
                or issues. Whether you need help with your order or have questions about our products, 
                we're here to help.
              </p>
            </section>
          </div>
        )
      },
      
      "create-game-accounts": {
        title: "Create Game Accounts",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Step-by-Step Guide</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600">
                <li>Visit the official website of the gaming platform (PlayStation, Xbox, Nintendo, etc.)</li>
                <li>Click on "Sign Up" or "Create Account" button</li>
                <li>Fill in your personal information including email address and password</li>
                <li>Verify your email address by clicking the verification link sent to your email</li>
                <li>Complete your profile with additional information if required</li>
                <li>Set up two-factor authentication for added security</li>
              </ol>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Use a strong, unique password for your gaming accounts</li>
                <li>Keep your account information secure and never share it with others</li>
                <li>Use a valid email address that you have access to</li>
                <li>Enable two-factor authentication when available</li>
                <li>Keep your account information up to date</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Requirements</h3>
              <p className="text-gray-600 leading-relaxed">
                Most gaming platforms require you to be at least 13 years old to create an account. 
                Some platforms may have age restrictions for certain features or content. Make sure 
                to read and understand the terms of service before creating an account.
              </p>
            </section>
          </div>
        )
      },
      
      "redeem-your-gift-card": {
        title: "Redeem Your Gift Card",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Redeem Gift Cards</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">PlayStation Network</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
                    <li>Go to PlayStation Store</li>
                    <li>Select "Redeem Codes" from the menu</li>
                    <li>Enter your 12-digit code</li>
                    <li>Confirm and add funds to your wallet</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Xbox Live</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
                    <li>Press the Xbox button on your controller</li>
                    <li>Navigate to Store</li>
                    <li>Select "Use a code"</li>
                    <li>Enter your 25-character code</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Nintendo eShop</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
                    <li>Open Nintendo eShop</li>
                    <li>Select "Enter Code"</li>
                    <li>Enter your 16-character code</li>
                    <li>Confirm redemption</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Steam</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
                    <li>Open Steam client</li>
                    <li>Click "Games" in the top menu</li>
                    <li>Select "Activate a Product on Steam"</li>
                    <li>Follow the prompts and enter your code</li>
                  </ol>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Gift cards have no expiration date unless otherwise specified</li>
                <li>Codes can only be used once</li>
                <li>Keep your codes secure and don't share them with others</li>
                <li>Make sure you're redeeming the code on the correct platform</li>
                <li>Contact support if you encounter any issues during redemption</li>
              </ul>
            </section>
          </div>
        )
      },
      
      "international-email-delivery": {
        title: "International Email Delivery",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Global Delivery Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Cd Key Vast offers international email delivery to customers worldwide. 
                Our automated delivery system ensures that your digital game cards and gift cards 
                are delivered instantly to your email address, regardless of your location.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Complete your purchase on our website</li>
                <li>Payment confirmation is processed automatically</li>
                <li>Digital codes are generated and sent to your email</li>
                <li>Delivery typically takes 1-5 minutes</li>
                <li>You'll receive a confirmation email with your codes</li>
              </ol>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Supported Countries</h3>
              <p className="text-gray-600 leading-relaxed">
                We deliver to most countries worldwide. However, some game cards may have regional 
                restrictions. Please check the product description for any country-specific limitations 
                before making a purchase.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Issues</h3>
              <p className="text-gray-600 leading-relaxed">
                If you don't receive your codes within 10 minutes of purchase, please check your 
                spam folder. If you still can't find your codes, contact our 24/7 customer support 
                team for immediate assistance.
              </p>
            </section>
          </div>
        )
      },
      
      "what-games-are-supported": {
        title: "What Games Are Supported?",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Supported Platforms</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We support game cards and gift cards for all major gaming platforms:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Console Gaming</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>PlayStation Network (PS4, PS5)</li>
                    <li>Xbox Live (Xbox One, Series X/S)</li>
                    <li>Nintendo eShop (Switch, 3DS)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">PC Gaming</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Steam</li>
                    <li>Blizzard Battle.net</li>
                    <li>EA Origin</li>
                    <li>Epic Games Store</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Mobile Gaming</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Google Play Store</li>
                    <li>Apple App Store / iTunes</li>
                    <li>Razer Gold</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Popular Games</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Fortnite V-Bucks</li>
                    <li>Roblox</li>
                    <li>Minecraft</li>
                    <li>League of Legends (Riot Points)</li>
                    <li>PUBG Mobile (UC)</li>
                    <li>VALORANT</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Regional Compatibility</h3>
              <p className="text-gray-600 leading-relaxed">
                Most of our game cards are region-free or can be used globally. However, some 
                cards may have regional restrictions. Please check the product description for 
                compatibility information before purchasing.
              </p>
            </section>
          </div>
        )
      },
      
      "why-digital-delivery": {
        title: "Why Digital Delivery?",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits of Digital Delivery</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-600">
                <li>
                  <strong>Instant Access:</strong> Get your game codes immediately after purchase. 
                  No waiting for shipping or physical delivery.
                </li>
                <li>
                  <strong>24/7 Availability:</strong> Our automated system works around the clock, 
                  so you can purchase and receive game cards anytime, anywhere.
                </li>
                <li>
                  <strong>Environmentally Friendly:</strong> Digital delivery reduces paper waste 
                  and carbon footprint associated with physical shipping.
                </li>
                <li>
                  <strong>No Shipping Costs:</strong> Save money on shipping fees, making digital 
                  cards more cost-effective.
                </li>
                <li>
                  <strong>Never Lost:</strong> Digital codes are delivered to your email and can 
                  be easily stored or forwarded. No risk of lost physical cards.
                </li>
                <li>
                  <strong>Global Access:</strong> Receive your codes anywhere in the world with 
                  internet access.
                </li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Security & Reliability</h3>
              <p className="text-gray-600 leading-relaxed">
                Our digital delivery system is secure and reliable. All codes are generated 
                through official channels and delivered encrypted to your email. We maintain 
                detailed records of all transactions for your peace of mind.
              </p>
            </section>
          </div>
        )
      },
      
      "how-will-i-receive-my-gift-cards": {
        title: "How Will I Receive My Gift Cards?",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Method</h3>
              <p className="text-gray-600 leading-relaxed">
                All gift cards and game cards are delivered digitally via email. After your 
                payment is confirmed, you'll receive an email containing your digital codes 
                and redemption instructions.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Timeline</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Standard Delivery:</strong> 1-5 minutes after payment confirmation</li>
                <li><strong>Manual Review:</strong> Up to 30 minutes for first-time customers</li>
                <li><strong>High Volume Periods:</strong> May take slightly longer during peak times</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What You'll Receive</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Your email will contain:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Digital code(s) for your purchased gift card(s)</li>
                <li>Redemption instructions for the specific platform</li>
                <li>Order confirmation and receipt</li>
                <li>Customer support contact information</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Troubleshooting</h3>
              <p className="text-gray-600 leading-relaxed">
                If you don't receive your email within 30 minutes, check your spam folder. 
                If you still can't find it, contact our 24/7 customer support team with your 
                order number for immediate assistance.
              </p>
            </section>
          </div>
        )
      },
      
      "why-buy-us-gaming-cards": {
        title: "Why Buy US Gaming Cards?",
        content: (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Advantages of US Gaming Cards</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-600">
                <li>
                  <strong>Best Prices:</strong> US gaming cards often offer the most competitive 
                  prices globally due to the large market size.
                </li>
                <li>
                  <strong>Wide Game Selection:</strong> US stores typically have the largest 
                  selection of games and DLCs available.
                </li>
                <li>
                  <strong>Early Releases:</strong> Many games and content are released earlier 
                  in the US market.
                </li>
                <li>
                  <strong>Universal Compatibility:</strong> Most US gaming cards work globally 
                  or can be easily converted for use in other regions.
                </li>
                <li>
                  <strong>Regular Sales:</strong> US stores frequently offer discounts and 
                  promotional deals.
                </li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Regional Considerations</h3>
              <p className="text-gray-600 leading-relaxed">
                While US gaming cards offer many advantages, it's important to check regional 
                compatibility. Most digital content from US stores works globally, but some 
                region-specific content may have restrictions.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How We Help</h3>
              <p className="text-gray-600 leading-relaxed">
                Cd Key Vast makes it easy to purchase US gaming cards from anywhere 
                in the world. We handle the complexities of international transactions and 
                ensure you receive legitimate codes that work with your accounts.
              </p>
            </section>
          </div>
        )
      }
    };

    return contentMap[slug] || {
      title: faqItem.label,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Content for {faqItem.label} is coming soon. Please check back later or contact 
            our customer support team for more information.
          </p>
        </div>
      )
    };
  };

  const faqContent = getFAQContent(params.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <Tag className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">CATEGORIES</h2>
              </div>
              <div className="p-2">
                {productCategories.map((category: Category) => (
                  <div key={category.name} className="mb-2">
                    <button
                      onClick={() => {
                        setExpandedCategory(expandedCategory === category.name ? null : category.name);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-md transition-colors group hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {category.subcategories && category.subcategories.length > 0 && (
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              expandedCategory === category.name ? "rotate-180" : ""
                            } text-gray-400 group-hover:text-gray-600`} 
                          />
                        )}
                      </div>
                    </button>
                    
                    {/* Subcategories dropdown */}
                    {category.subcategories && category.subcategories.length > 0 && expandedCategory === category.name && (
                      <div className="ml-8 mt-1 space-y-1">
                        {category.subcategories.map((subcategory, index) => (
                          <Link
                            key={index}
                            href={subcategory.href}
                            className="block w-full text-left px-3 py-2 text-sm rounded transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {subcategory.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <nav className="mb-6">
                <Link 
                  href="/faq" 
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  ← Back to FAQ
                </Link>
              </nav>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {faqContent.title}
              </h1>
              
              {faqContent.content}
            </div>
          </div>

          {/* Right Column - FAQ Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                FAQ
              </h2>
              <ul className="space-y-2">
                {faqItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`block py-1 transition-colors ${
                        item.href === `/faq/${params.slug}`
                          ? "text-red-600 font-semibold"
                          : "text-gray-700 hover:text-red-600"
                      }`}
                    >
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
