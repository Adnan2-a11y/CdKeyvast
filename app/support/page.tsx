"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "WILL MY CARD WORK IN MY COUNTRY?",
    answer: "Most of our digital gift cards work internationally. However, some cards may have regional restrictions. Please check the product description for specific regional information before purchasing."
  },
  {
    question: "WHEN WILL I RECEIVE MY GIFT CARD?",
    answer: "Digital gift cards are typically delivered instantly to your email after payment verification. In some cases, it may take up to 24 hours for delivery due to security verification."
  },
  {
    question: "HELP! MY GIFT CARD ISN'T WORKING",
    answer: "If your gift card isn't working, please double-check the code you entered. If the issue persists, contact our support team with your order number and we'll help resolve the issue immediately."
  },
  {
    question: "WHY DO I HAVE TO VERIFY MY ORDER?",
    answer: "We verify orders to prevent fraud and protect both our customers and our business. This ensures secure transactions and maintains the integrity of our service."
  },
  {
    question: "RETURNS & EXCHANGES",
    answer: "Due to the digital nature of our products, we generally don't offer returns or exchanges. However, if you receive a defective or invalid code, we'll provide a replacement or refund."
  },
  {
    question: "HOW DO I ACCESS MY GIFT CARDS?",
    answer: "Your gift cards are delivered to your email address. You can also access them by logging into your account on our website and viewing your order history."
  },
  {
    question: "HOW DO I REDEEM MY GIFT CARD?",
    answer: "Redemption instructions vary by platform. Each gift card comes with specific redemption instructions. Generally, you'll need to enter the code on the respective platform's store or website."
  }
];

export default function SupportPage() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orderNumber: "",
    message: "",
    faqChecked: false
  });

  const toggleFAQ = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-3">
              {faqData.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">{item.question}</span>
                    <span className="text-gray-500">
                      {expandedItem === index ? '−' : '+'}
                    </span>
                  </button>
                  {expandedItem === index && (
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <p className="text-sm text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">CONTACT OUR 24/7 SUPPORT TEAM</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Order # (if you made a purchase)
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Leave us a message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="faqChecked"
                  name="faqChecked"
                  checked={formData.faqChecked}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="faqChecked" className="ml-2 text-sm text-gray-700">
                  I have read the FAQ and my question was not answered
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                SUBMIT
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> 1-800-257-7220
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> support@CdkeyVast.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
