"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gift, Gamepad2 } from "lucide-react";

const WholesaleBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
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
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                MORE INFO
                <ArrowRight className="w-4 h-4" />
              </Link>

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
              <Link
                href="/egifts"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                MORE INFO
                <ArrowRight className="w-4 h-4" />
              </Link>

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
      </div>
    </section>
  );
};

export default WholesaleBanner;
