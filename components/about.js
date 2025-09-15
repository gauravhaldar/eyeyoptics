"use client";
import { motion } from "framer-motion";

export default function About() {
  const faqQuestions = [
    "Is Eyey a legit website?",
    "When can I expect my order?",
    "How do I contact customer support?",
  ];

  return (
    <section className="my-12 px-6 md:px-20 max-w-6xl mx-auto bg-gradient-to-br from-[#fff8e7] via-white to-[#fff8e7] rounded-xl shadow-lg p-8">
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center text-blue-900 drop-shadow-md"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        WIDE RANGE OF <span className="text-orange-500">EYEWEAR</span> ON EYEY!
      </motion.h1>

      <motion.p
        className="mb-6 text-lg text-gray-800 leading-relaxed max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Eyey is disrupting the eyewear industry. No more spending excessively to get a pair of quality eyewear. Get the best of eyeglasses from major brands on one platform. With offers like <span className="font-semibold text-orange-500">Blink</span> you can Buy 1 &amp; get 1 free. <span className="font-semibold text-orange-500">EMELuxe</span> membership program gets you priority offers, discounts and deals.
      </motion.p>

      <motion.p
        className="mb-10 text-base text-gray-700 max-w-3xl mx-auto text-center italic border-l-4 border-orange-400 pl-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Get 14 days no questions asked refunds on every purchase! Eyey an international eyewear retailer is now <span className="font-semibold">4,00,000+</span> customers strong and is one of the fastest growing platforms.
      </motion.p>

      {/* Horizontal scroll container */}
      <motion.div
        className="flex space-x-10 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Main sections */}
        {[
          {
            title: "Eyeglasses - Browse, Click, Buy eyeglasses & frames that flatter your face and flaunt them",
            text: "Get your essential eye accessory fix with top-notch Eyeglasses range on EyeMyEye.us. With a range of eyeglasses for men and women, get access to the most stylish range of prices starting from Rs.0/- only. We also have different shapes like Full Rim Eyeglasses, Half Rim Eyeglasses, Rimless Eyeglasses, Cat Eye Glasses and more with top brands like Nerdlane and Mirar.",
          },
          {
            title: "Computer glasses - Protect your eyes from harmful blue light",
            text: "Discover computer glasses that protect your eyes from harmful UV rays, Blue rays and glare. Use your digital devices worry free with utmost eye comfort. Computer glasses have become a necessity for the current era. Explore EMELuxe options with Priority features like access to new releases, luxury brands on discounts, offers and more. Buy 1 get 1 offer with Blink. Click to explore.",
          },
          {
            title: "Blink - Get Savings & Rewards in a Blink",
            text: "A subscription program that has been tailor-made for EyeMyEye users with high “Eye-Q” - EyeMyEye Blink Membership helps you save more & shop more. Join the clan to enjoy amazing benefits & rewards on your favourite eyewear. We pamper our loyal members with Buy 1 Get 1, free gifts, additional discounts, and special offers. From much-awaited deals, priority support to exclusive vouchers – Blink has everything & more for your eyes. Ready to grab the best of the rest?",
          },
        ].map((section, index) => (
          <motion.section
            key={index}
            className="min-w-[320px] max-w-sm flex-shrink-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 * index }}
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-800 border-b-2 border-orange-400 inline-block pb-1">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">{section.text}</p>
          </motion.section>
        ))}
      </motion.div>

      <motion.h2
        className="text-3xl font-bold mt-12 mb-6 text-center text-blue-900 drop-shadow-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Frequently Asked Questions
      </motion.h2>

      {/* Horizontal FAQ */}
      <motion.ul
        className="flex space-x-6 overflow-x-auto max-w-4xl mx-auto pb-6 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {faqQuestions.map((q, i) => (
          <motion.li
            key={i}
            className="min-w-[240px] bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-orange-400 flex-shrink-0"
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <strong className="text-orange-500">{q}</strong>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
