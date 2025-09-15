"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Motion variants for text and list items
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Heading and Intro */}
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          About Eyey
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Eyey is your one-stop destination for high-quality eyeglasses, computer glasses, 
          sunglasses, and more. We are passionate about providing our customers with stylish, 
          comfortable, and durable eyewear to enhance your vision and your look.
        </motion.p>
      </motion.div>

      {/* Image + Content */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/about-image.png" // replace with your own image
            alt="Eyey About Us"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2 space-y-6 text-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-2xl font-bold text-purple-600"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h2>
          <motion.p variants={fadeInUp} transition={{ duration: 0.8, delay: 0.1 }}>
            At Eyey, our mission is to make quality eyewear accessible to everyone. 
            We carefully select each product for style, comfort, and durability, 
            ensuring our customers receive only the best.
          </motion.p>

          <motion.h2
            className="text-2xl font-bold text-purple-600 mt-6"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.ul className="list-disc list-inside space-y-2" variants={staggerContainer}>
            {[
              "High-quality and trendy eyewear",
              "Affordable prices without compromise",
              "Secure online shopping experience",
              "Fast delivery across India",
              "Dedicated customer support",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
