"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PopularCategory() {
  const categories = [
    { name: "Men’s Styles", image: "/bb1.jpg", group: "Men", url: "/men" },
    { name: "New Arrivals", image: "/w1.jpg", group: "Women", url: "/women" },
    { name: "Eyeglasses", image: "/bb3.jpg", group: "Men", url: "/eyeglasses" },
    { name: "Computer Glasses", image: "/bb4.jpg", group: "Men", url: "/computer-glasses" },
    { name: "Computer Glasses", image: "/k.jpg", group: "Kids", url: "/kids" },
    { name: "Hot Sellers", image: "/w2.jpg", group: "Women", url: "/hot-sellers" },
    { name: "Hot Sellers", image: "/bb5.jpg", group: "Men", url: "/hot-sellers" },
    { name: "0 Glasses", image: "/bb6.jpg", group: "Men", url: "/men" },
    { name: "Power Glasses", image: "/bb7.jpg", group: "Women", url: "/women" },
    { name: "Power Glasses", image: "/bb7.jpg", group: "Men", url: "/power-glasses" },
    { name: "New Arrivals", image: "/bb2.jpg", group: "Men", url: "/new-arrivals" },
  ];

  const [selected, setSelected] = useState("Men");

  // Filter categories based on selected group
  const filteredCategories = categories.filter(
    (category) => category.group === selected
  );

  return (
    <section className="bg-gray-50 py-5 px-6 md:px-20">
      {/* Heading */}
      <h2 className="text-gray-800 text-3xl md:text-4xl font-bold mb-4">
        Shop By Category
      </h2>

      {/* Men/Women/Kids Row below heading */}
      <div className="flex gap-12 md:gap-20 mb-5 text-gray-600 text-lg md:text-xl">
        {["Men", "Women", "Kids"].map((item) => (
          <span
            key={item}
            onClick={() => setSelected(item)}
            className={`cursor-pointer pb-1 relative hover:text-gray-800 transition ${
              selected === item ? "text-[#0077b6]" : ""
            }`}
          >
            {item}
            {selected === item && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#0077b6] rounded-full"></span>
            )}
          </span>
        ))}
      </div>

      {/* Category Cards */}
      {/* ✅ Mobile: Slider | ✅ Desktop: Grid */}
      <div className="block md:hidden">
        <motion.div
          className="flex gap-6 overflow-x-auto no-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-28 text-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={category.url}>
                {/* Circle Image */}
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                {/* Name */}
                <span className="text-gray-800 font-medium text-sm block mt-1">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center cursor-pointer"
          >
            <Link href={category.url}>
              {/* Circle Image */}
              <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden mb-2 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>

              {/* Name */}
              <span className="text-gray-800 font-medium text-sm md:text-base block mt-1">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
