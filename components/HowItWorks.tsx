"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, CreditCard, Mail, Gift } from "lucide-react";
import Container from "@/components/ui/container";

// Custom icon components to match the screenshot design
const ChooseIcon = () => (
  <div className="relative">
    <Monitor size={32} className="text-primary" />
    <Smartphone size={16} className="absolute -bottom-1 -right-1 text-primary" />
  </div>
);

const PaymentIcon = () => (
  <div className="flex items-center gap-1">
    <CreditCard size={20} className="text-primary" />
    <div className="h-4 w-6 rounded bg-primary/80" />
  </div>
);

const DeliveryIcon = () => (
  <div className="relative">
    <Mail size={28} className="text-primary" />
    <Gift size={12} className="absolute -top-1 -right-1 text-primary" />
  </div>
);

const steps = [
  {
    icon: ChooseIcon,
    title: "Choose a Game/Gift Card",
    description:
      "Choose from a broad selection of game and gift cards including: iTunes, Google Play, Steam, Nintendo and many more! Find the perfect gift for a loved-one, or a treat for yourself, at home, or on the go with our mobile friendly website!",
  },
  {
    icon: PaymentIcon,
    title: "Payment & Approval",
    description:
      "We accept direct PayPal transactions, VISA, MasterCard, Discover, and American Express. All payments are securely processed via PayPal and not directly on our website, however you do not need a PayPal account to complete your purchase.",
  },
  {
    icon: DeliveryIcon,
    title: "Fastest Online Email Delivery",
    description:
      "All of our gift and game cards are authentic USA cards, digitally scanned into our system and delivered to you via email within minutes! Save the trip to the store to catch the best deals on an online sale by purchasing directly from CdkeyVast for the fastest online delivery service on the market!",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white border-b border-gray-300 py-10 md:py-14">
      <Container>
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300" />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-base font-bold uppercase tracking-widest text-black md:text-lg"
          >
            How It <span className="text-primary">Works</span>
          </motion.h2>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                <Icon />
              </div>
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-black">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-700">{description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
