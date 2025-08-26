// FrequentlyBought.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function FrequentlyBought() {
  const products = [
    { id: 1, slug: "classic", name: "Classic", detail: "High-quality product", price: "₹499", image: "/fb1.png" },
    { id: 2, slug: "retro", name: "Retro", detail: "Comfortable and durable", price: "₹599", image: "/fb2.png", bestSeller: true },
    { id: 3, slug: "killer", name: "Killer", detail: "Best seller item", price: "₹399", image: "/fb3.png" },
    { id: 4, slug: "modern", name: "Modern", detail: "Limited edition", price: "₹699", image: "/fb4.png", bestSeller: true },
    { id: 5, slug: "ray-ban", name: "Ray-ban", detail: "Customer favorite", price: "₹299", image: "/fb5.png" },
    { id: 6, slug: "air", name: "Air", detail: "Premium quality", price: "₹999", image: "/fb6.png" },
    { id: 7, slug: "hustler", name: "Hustler", detail: "Highly recommended", price: "₹549", image: "/fb7.png" },
    { id: 8, slug: "john", name: "JOhn", detail: "Top rated", price: "₹649", image: "/fb8.png" },
  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-20 px-6 md:px-20 relative"
      style={{ background: "linear-gradient(to bottom, #FEDC56, white)" }}
    >
      <h2 className="text-gray-800 text-3xl md:text-4xl font-bold mb-8">
        Frequently Bought Together
      </h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white transition z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white transition z-10"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-6">
          {products.map((product, index) => (
            <Link key={product.id} href={`/eyeglasses/${product.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-4 flex-shrink-0 w-[200px] md:w-[220px] cursor-pointer hover:scale-105 transform transition-transform relative"
              >
                {/* Best Seller Tag */}
                {product.bestSeller && (
                  <div
                    className="absolute top-2 left-2 px-2 py-1 text-white text-xs font-semibold rounded-md"
                    style={{ background: "linear-gradient(90deg, #00c6ff, #0072ff)" }}
                  >
                    Best Seller
                  </div>
                )}

                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-gray-800 font-semibold text-sm md:text-base">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  {product.detail}
                </p>
                <p className="text-black-500 font-semibold mt-2">{product.price}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
}
