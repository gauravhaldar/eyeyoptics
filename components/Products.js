"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Round Frame",
    detail: "Classic round eyeglasses for a retro look",
    image: "/products/shape1.png",
  },
  {
    id: 2,
    name: "Square Frame",
    detail: "Bold square frames for confident style",
    image: "/products/shape2.png",
  },
  {
    id: 3,
    name: "Cat Eye",
    detail: "Feminine cat eye shape for vintage vibes",
    image: "/products/shape3.png",
  },
  {
    id: 4,
    name: "Aviator",
    detail: "Timeless aviator style with sleek metal",
    image: "/products/shape4.png",
  },
  {
    id: 5,
    name: "Rectangle",
    detail: "Sleek rectangular frames for sharp looks",
    image: "/products/shape5.png",
  },
  {
    id: 6,
    name: "Oval",
    detail: "Soft oval frames for everyday elegance",
    image: "/products/shape6.png",
  },
];

export default function Products() {
  return (
    <section className="my-12 px-6 md:px-20">
      {/* Heading */}
      <h1 className="text-4xl font-semibold mb-4 text-center">
        Bestselling Eyeglasses Shapes
      </h1>

      {/* Paragraph */}
      <p className="text-center text-lg max-w-xl mx-auto mb-12 text-gray-700">
        Set new trends around with these eyemazing Eyeglasses Shapes!
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="relative w-70 h-40 mb-4 transition-transform duration-300 hover:scale-110">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
            <p className="text-orange-600 text-center">{product.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
