"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Anjali Sharma",
    image: "/clients/client1.png",
    review:
      "Amazing service and quality eyeglasses! The frames fit perfectly and look stylish. Highly recommended!",
  },
  {
    id: 2,
    name: "Rohit Verma",
    image: "/clients/client2.jpg",
    review:
      "I love the variety of styles available. Customer support was very helpful in choosing the right lenses.",
  },
  {
    id: 3,
    name: "Sanjeev Gupta",
    image: "/clients/client3.jpg",
    review:
      "Fast delivery and excellent packaging. The eyeglasses feel premium and comfortable to wear all day.",
  },
];

export default function Customers() {
  return (
    <section className="my-16 px-6 md:px-20">
      {/* Heading */}
      <h2 className="text-4xl font-semibold mb-2 text-center">Customer Reviews</h2>

      {/* Paragraph */}
      <p className="text-center text-lg max-w-xl mx-auto mb-12 text-gray-700">
        Hear from our happy customers who love their eyeglasses!
      </p>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {reviews.map(({ id, name, image, review }, index) => (
          <motion.div
            key={id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-700 italic">&quot;{review}&quot;</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
