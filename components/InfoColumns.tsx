"use client";

import { motion } from "framer-motion";
import { Gift, CreditCard, Zap, Play } from "lucide-react";
import Container from "@/components/ui/container";

const features = [
  {
    icon: "game-card",
    title: "Game Cards",
    description:
      "Browse our extensive selection of game cards to purchase games, in-game add-ons, and the newest game releases to get the most out of your gaming experience, on all of your favorite consoles and devices.",
    items: [
      { name: "PlayStation Game Cards", color: "text-blue-600" },
      { name: "Steam Game Cards", color: "text-gray-900" },
      { name: "Nintendo eShop Game Cards", color: "text-orange-500" },
      { name: "View All Game Cards", color: "text-red-600" }
    ],
  },
  {
    icon: "gift-card",
    title: "Gift Cards",
    description:
      "If you are looking for the perfect gift for a loved-one, or to purchase something for yourself; explore our wide collection of gift cards to find exactly what you need.",
    items: [
      { name: "iTunes Gift Cards", color: "text-blue-600" },
      { name: "Google Play Gift Cards", color: "text-gray-900" },
      { name: "Amazon Gift Cards", color: "text-orange-500" },
      { name: "View All Game Cards", color: "text-red-600" }
    ],
  },
  {
    icon: "instant-delivery",
    title: "Instant Delivery",
    description:
      "Our excellent support team is dedicated to providing a fast and secure purchasing experience for our valued customers. Customer support is available 24 hours a day by email at support@CdkeyVast.com",
    items: [
      { name: "Purchasing With PayPal", color: "text-red-600" },
      { name: "Why Digital Delivery?", color: "text-red-600" },
      { name: "How Will I Receive My Gift?", color: "text-red-600" }
    ],
  },
];

const InfoColumns = () => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "game-card":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
            <div className="h-4 w-3 rounded-sm bg-white"></div>
          </div>
        );
      case "gift-card":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
            <Gift size={16} className="text-white" />
          </div>
        );
      case "instant-delivery":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600">
            <Zap size={16} className="text-white" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-white border-b border-border py-10 md:py-14">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon, title, description, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-lg border border-border bg-white p-5"
            >
              <div className="mb-3 flex items-center gap-2.5">
                {getIcon(icon)}
                <h3 className="font-display text-xs font-bold uppercase tracking-widest text-black">{title}</h3>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-black">{description}</p>
              <ul className="space-y-1.5">
                {items.map((item, index) => (
                  <li key={`${item.name}-${index}`} className="flex cursor-pointer items-center gap-2 text-xs text-black transition-colors hover:text-primary">
                    <Play size={12} className={item.color} fill="currentColor" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-black">GAME CARD BEST SELLERS</h2>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default InfoColumns;
