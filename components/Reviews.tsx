"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/container";

const reviews = [
  {
    title: "Speed is the Key",
    text: "I'm from Guatemala and it is really nice to have you as a source of gamecards. Here in Guatemala it is kind of difficult to access them. The delivery is instant!",
    author: "D.R.",
    date: "February 10, 2026",
  },
  {
    title: "Purchase for Amazon Gift Card",
    text: "It is my first purchase through CDKeyVast and the truth is that the satisfaction is total, it was fast easy and safe. For all the aforementioned I do not hesitate to recommend this platform.",
    author: "J.M.",
    date: "February 8, 2026",
  },
  {
    title: "Quick and Excellent Service",
    text: "I have been purchasing cards from CDKeyVast for some time now, and they have never failed to deliver. They are very quick, and they provide excellent service.",
    author: "Z.",
    date: "January 28, 2026",
  },
];

const Reviews = () => {
  return (
    <section className="border-b border-gray-300 bg-white py-10 md:py-14">
      <Container>
        <div className="mb-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300" />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-base font-bold uppercase tracking-widest text-black md:text-lg"
          >
            <span className="text-blue-600">Reviews</span>
          </motion.h2>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="mb-8 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-blue-600">8,547</span> CDKeyVast Reviews
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-gray-700">5 STAR RATING!</span>
              <div className="flex gap-px">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
            </div>
            <Link
              href="/reviews"
              className="rounded border border-blue-600 bg-blue-50 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
            >
              View All Reviews
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map(({ title, text, author, date }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-lg border border-gray-300 bg-white p-5"
            >
              <h4 className="mb-1.5 text-sm font-bold text-black">{title}</h4>
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={11} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
              <p className="mb-3 text-xs leading-relaxed text-gray-700">{text}</p>
              <p className="text-[10px] text-gray-700">— {author}</p>
              <p className="text-[10px] uppercase tracking-wide text-gray-500">{date}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
