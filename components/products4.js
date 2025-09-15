"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "KILLER",
    price: 999,
    image: "/products2/pocket1.png",
    imageHover: "/products2/pocket1-hover.png",
  },
  {
    id: 2,
    name: "MIYAMA",
    price: 1299,
    image: "/products2/pocket2.png",
    imageHover: "/products2/pocket2-hover.png",
  },
  {
    id: 3,
    name: "INTEGRITI",
    price: 899,
    image: "/products/eyeglass3.png",
    imageHover: "/products/eyeglass3-hover.png",
  },
];

export default function Products4() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="my-12 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Responsive Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-center">
        Premium in your Pocket
      </h1>

      {/* Responsive Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-full h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Image
              src={hoveredId === product.id ? product.imageHover : product.image}
              alt={product.name}
              width={600}
              height={384}
              className="object-contain w-full h-full transition-transform duration-300"
              priority
            />

            {/* Product Info */}
            <div className="absolute bottom-0 bg-white bg-opacity-90 w-full p-3 sm:p-4 text-center">
              <p className="text-base sm:text-lg font-medium">{product.name}</p>
              <p className="text-orange-600 font-semibold mt-1 text-sm sm:text-base">
                ₹{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Responsive Button */}
      <div className="mt-8 flex justify-center">
        <Link href="/computer-glasses">
  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-semibold transition">
    View More
  </button>
</Link>
      </div>
    </section>
  );
}
