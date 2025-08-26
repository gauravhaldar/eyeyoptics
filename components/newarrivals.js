"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NewArrivals() {
  const products = [
    { id: 1, image: "/bb4.jpg", name: "Stylish Sunglasses", description: "Trendy & UV Protected", price: "₹1,499", slug: "stylish-sunglasses" },
    { id: 2, image: "/bb7.jpg", name: "Classic Frames", description: "Durable & Lightweight", price: "₹999", slug: "classic-frames" },
    { id: 3, image: "/bb8.jpg", name: "Modern Eyewear", description: "Perfect for daily use", price: "₹1,299", slug: "modern-eyewear" },
    { id: 4, image: "/bb6.jpg", name: "Retro Glasses", description: "Vintage yet classy", price: "₹1,799", slug: "retro-glasses" },
    { id: 5, image: "/bb3.jpg", name: "Premium Shades", description: "Luxurious & stylish", price: "₹2,499", slug: "premium-shades" },
    { id: 6, image: "/bb5.jpg", name: "Blue Light Glasses", description: "Protects from screen glare", price: "₹1,199", slug: "blue-light-glasses" },
  ];

  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // ✅ Adjust items per view based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // Tablet
      } else {
        setItemsPerView(4); // Desktop
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? products.length - itemsPerView : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= products.length - itemsPerView ? 0 : prev + 1
    );
  };

  return (
    <section className="py-10 px-4 sm:px-6 md:px-20 bg-[#e7f6f8]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Heading */}
        <div className="flex flex-col items-start">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            New Arrivals
          </h2>
          <Link
            href="/new-arrivals"
            className="text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:underline mt-1"
          >
            View All
          </Link>
        </div>

        {/* Slider */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${current * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ width: `${products.length * (100 / itemsPerView)}%` }}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/new-arrivals/${product.slug}`}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                {/* Product Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                  {/* Product Image */}
                  <div className="relative h-44 sm:h-48 md:h-52">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-3 text-center">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-cyan-600 mt-1">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition z-20"
          >
            <FaChevronLeft size={18} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition z-20"
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
