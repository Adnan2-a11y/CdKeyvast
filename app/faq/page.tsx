"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Tag } from "lucide-react";
import { faqItems, productCategories, type Category } from "@/lib/categories";

export default function FAQPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Why CdkeyVast
              </h1>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Game Cards Product Listing
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    At CdkeyVast, we offer a comprehensive selection of game cards and gift cards 
                    for all major gaming platforms. Our extensive inventory includes PlayStation Network 
                    cards, Xbox Live gift cards, Nintendo eShop cards, Steam wallet codes, and many more. 
                    All our digital cards are delivered instantly to your email, ensuring you can start 
                    gaming without any delays.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    24/7 Delivery & Support
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our automated delivery system works around the clock to provide you with instant 
                    access to your purchased game cards. Whether you're gaming late at night or early 
                    in the morning, our system ensures immediate delivery. Our dedicated customer 
                    support team is available 24/7 to assist you with any questions or concerns you 
                    may have about your purchases or our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Secure & Reliable Service
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We prioritize the security of your transactions and personal information. Our 
                    platform uses industry-standard encryption and secure payment gateways to ensure 
                    your data is protected. With years of experience in the digital gaming market, 
                    we've built a reputation for reliability and customer satisfaction.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Competitive Prices & Special Offers
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We work directly with suppliers to offer you the most competitive prices on all 
                    game cards and gift cards. Keep an eye on our special promotions and discount 
                    offers to get even better deals on your favorite gaming products.
                  </p>
                </section>
              </div>
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
                      className="block text-gray-700 hover:text-red-600 transition-colors py-1"
                    >
                      <span className="text-sm font-medium">{item.label}</span>
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
