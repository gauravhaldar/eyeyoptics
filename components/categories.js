// categories.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Categories() {
  const categories = [
    { name: "Eyeglasses", image: "/men.png", link: "/eyeglasses" },
    { name: "Sunglasses", image: "/women.png", link: "/sunglasses" },
    { name: "Power glasses", image: "/premium.png", link: "/power-glasses" },
    { name: "Computer Glasses", image: "/collection.png", link: "/computer-glasses" },
    { name: "Hot Sellers", image: "/hot.png", link: "/hot-sellers" },
    { name: "0 Glasses", image: "/0.png", link: "/computer-glasses" },
    { name: "Contact Lenses", image: "/cl.png", link: "/contact-lenses" },
  ];

  return (
    <section className="bg-[#e7f6f8] py-16 px-6 md:px-20">
      {/* Heading */}
      <h2 className="text-gray-800 text-3xl md:text-xl font-bold mb-2">
        Find Your Perfect Pair
      </h2>

      {/* Subheading */}
      <p className="text-gray-800 text-4xl md:text-3xl font-extrabold mb-10">
        The Right Eyewear for Every Need
      </p>

      {/* --- Mobile Slider --- */}
      <div className="block md:hidden">
        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          drag="x"
          dragConstraints={{ left: -500, right: 0 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="min-w-[120px] text-center flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={category.link}>
                <div>
                  {/* Circle Image Container */}
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 bg-white flex items-center justify-center shadow-sm">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>

                  {/* Name Below Circle */}
                  <span className="text-gray-800 font-medium text-sm block mt-1">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- Desktop Grid --- */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center cursor-pointer"
          >
            <Link href={category.link}>
              <div>
                {/* Circle Image Container */}
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden mb-2 bg-white flex items-center justify-center shadow-sm">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>

                {/* Name Below Circle */}
                <span className="text-gray-800 font-medium text-sm md:text-base block mt-1">
                  {category.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
