// categories.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Categories() {
  const categories = [
    { name: "Men's Styles", image: "/men.png", link: "/eyeglasses" },
    { name: "Women's Styles", image: "/women.png", link: "/sunglasses" },
    { name: "Premium Brands", image: "/premium.png", link: "/power-glasses" },
    { name: "New Collection", image: "/collection.png", link: "/computer-glasses" },
    { name: "Hot Sellers", image: "/hot.png", link: "/hot-sellers" },
    { name: "$ 0 Glasses", image: "/0.png", link: "/computer-glasses" },
    { name: "Contact Lenses", image: "/cl.png", link: "/contact-lenses" },
  ];

  return (
    <section className="bg-white py-10 px-6 md:px-20">
      {/* --- Mobile Slider --- */}
      <div className="block md:hidden">
        <motion.div
          className="flex gap-10 overflow-x-auto scrollbar-hide px-2"
          drag="x"
          dragConstraints={{ left: -700, right: 0 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="min-w-[140px] text-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={category.link}>
                <div className="flex flex-col items-center">
                  {/* Simple Image Container (No circle/shadow) */}
                  <div className="w-20 h-16 mb-2 flex items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={60}
                      className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  {/* Bold Name Below */}
                  <span className="text-gray-900 font-bold text-sm uppercase tracking-tight">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- Desktop Row --- */}
      <div className="hidden md:flex justify-between items-end max-w-[95%] mx-auto gap-10">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="text-center group cursor-pointer"
          >
            <Link href={category.link}>
              <div className="flex flex-col items-center">
                {/* Simple Image Container (No circle/shadow) */}
                <div className="w-28 h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={120}
                    height={80}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                {/* Bold Name Below */}
                <span className="text-black font-extrabold text-[15px] tracking-tight whitespace-nowrap">
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
