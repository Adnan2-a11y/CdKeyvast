"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gift, Gamepad2, ChevronDown, ChevronUp } from "lucide-react";
import Container from "@/components/ui/container";
import { useState } from "react";

const WholesaleBanner = () => {
  const [showWholesaleDetails, setShowWholesaleDetails] = useState(false);
  const [showEgiftsDetails, setShowEgiftsDetails] = useState(false);
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Wholesale Welcome Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border rounded-lg p-6 md:p-8 text-white relative overflow-hidden shadow-sm"
            style={{ backgroundColor: "#374754" }}
          >
            <div className="relative z-10">
              
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center w-16 h-16 bg-red-600 rounded-lg">
                <Gift className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Wholesale Welcome!
              </h3>

              {/* Subtitle */}
              <p className="text-lg text-gray-200 mb-4">
                Bulk Prices on Available Wholesale Gift Cards!
              </p>

              {/* Description */}
              <p className="text-sm text-gray-200 mb-6 leading-relaxed">
                Purchase gift cards in bulk for your business or organization.
                Enjoy competitive wholesale pricing and flexible ordering options
                for all your gifting needs.
              </p>

              {/* Button */}
              <button
                onClick={() => setShowWholesaleDetails(!showWholesaleDetails)}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                MORE INFO
                {showWholesaleDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Expandable Details */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: showWholesaleDetails ? "auto" : 0,
                  opacity: showWholesaleDetails ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="pt-4 border-t border-gray-600">
                  <h4 className="text-lg font-semibold mb-3 text-white">Wholesale Benefits:</h4>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Volume discounts starting at just 10 cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Custom branding options available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Bulk delivery via email or physical cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Dedicated account manager support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Flexible payment terms for qualified businesses</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                  </div>
                </div>
              </motion.div>

              {/* Bottom Stats */}
              <div className="mt-8 flex items-center gap-4">
                <div className="text-3xl font-bold">$$$</div>
                <div className="text-lg font-semibold text-gray-200">
                  Buy in Bulk
                </div>
              </div>
            </div>
          </motion.div>

          {/* eGifts Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border rounded-lg p-6 md:p-8 text-white relative overflow-hidden shadow-sm"
            style={{ backgroundColor: "#27343F" }}
          >
            <div className="relative z-10">
              
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center w-16 h-16 bg-red-600 rounded-lg">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                eGifts for Friends & Family!
              </h3>

              {/* Subtitle */}
              <p className="text-lg text-gray-200 mb-4">
                Our Gift & Game Cards Make the Perfect Gift!
              </p>

              {/* Description */}
              <p className="text-sm text-gray-200 mb-6 leading-relaxed">
                Send digital gift cards for birthdays, holidays, or just as a
                gesture of thanks. Instant delivery and easy redemption make
                our eGifts the perfect choice for any occasion.
              </p>

              {/* Button */}
              <button
                onClick={() => setShowEgiftsDetails(!showEgiftsDetails)}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                MORE INFO
                {showEgiftsDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Expandable Details */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: showEgiftsDetails ? "auto" : 0,
                  opacity: showEgiftsDetails ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="pt-4 border-t border-gray-600">
                  <h4 className="text-lg font-semibold mb-3 text-white">eGift Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Instant delivery via email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Personalized messages and scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Wide variety of gaming and retail brands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>No expiration dates on most cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Track gift card status and redemption</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                  </div>
                </div>
              </motion.div>

              {/* Bottom Stats */}
              <div className="mt-8 flex items-center gap-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-lg font-semibold text-gray-200">
                  Safe & Secure
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default WholesaleBanner;