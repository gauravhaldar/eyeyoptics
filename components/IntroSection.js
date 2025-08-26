"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="bg-white py-5 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          Your Every Moment in Focus
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 text-lg mb-8 leading-relaxed"
        >
          Enjoy stylish, affordable & precise eyeglasses tailored for every
          version of you. Shop with confidence with 14 days no questions asked
          returns, unbeatable deals & checkout 1000s of frames, starting from
          $0!
        </motion.p>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {/* Money Back */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center text-center"
          >
            <Image
              src="/money.svg"
              alt="100% Money Back Guarantee"
              width={48}
              height={48}
              className="mb-2"
            />
            <h3 className="font-semibold text-gray-800">
              100% Money Back Guarantee
            </h3>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center text-center"
          >
            <Image
              src="/trust.svg"
              alt="4.6 Plus Star Rating"
              width={128}
              height={64}
              className="mb-2"
            />
            <h3 className="font-semibold text-gray-800">
              4.6 Plus Star Rating
            </h3>
          </motion.div>

          {/* Happy Customers */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center text-center"
          >
            <Image
              src="/customer.svg"
              alt="Happy Customers"
              width={48}
              height={48}
              className="mb-2"
            />
            <h3 className="font-semibold text-gray-800">
              200,000+ Happy Customers
            </h3>
          </motion.div>
        </motion.div>

        {/* Button */}
        <Link href="/eyeglasses" passHref>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Browse Styles
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
