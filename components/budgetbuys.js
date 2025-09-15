"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BudgetBuys() {
  const slides = [
    { id: 1, image: "/bb1.jpg" },
    { id: 2, image: "/bb2.jpg" },
    { id: 3, image: "/bb3.jpg" },
    { id: 4, image: "/bb4.jpg" },
    { id: 5, image: "/bb5.jpg" },
    { id: 6, image: "/bb6.jpg" },
    { id: 7, image: "/bb7.jpg" },
    { id: 8, image: "/bb8.jpg" },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? Math.max(0, slides.length - 4) : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= slides.length - 4 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full py-6 px-4 md:px-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Budget Buys
        </h2>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 p-3 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
        >
          <FaChevronLeft className="text-gray-700 text-lg" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 p-3 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
        >
          <FaChevronRight className="text-gray-700 text-lg" />
        </button>

        {/* Motion Slider */}
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${current * 25}%` }} // shift by % (25% since 4 items per row = 100/4)
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-[25%] h-48 md:h-64 relative rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
