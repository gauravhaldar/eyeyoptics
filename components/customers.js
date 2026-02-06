"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    title: "Love Them!",
    reviewer: "Leslie.T",
    source: "Sitejabbar",
    image: "/clients/client1.png",
    review:
      "I love both pairs of glasses I received. They are so comfortable and my prescription is perfect. I will definitely be ordering again",
  },
  {
    id: 2,
    title: "Great Website",
    reviewer: "GI",
    source: "Sitejabbar",
    image: "/clients/client2.jpg",
    review:
      "I liked that it takes less than 3 steps to choose lenses. Also the prices are very low. The quality is decent for the price paid.",
  },
  {
    id: 3,
    title: "Keep up the great work",
    reviewer: "Gibson",
    source: "Instagram",
    image: "/clients/client3.jpg",
    review:
      "Hey eyemyeye_usa Team, Just wanted to give a big shoutout for the awesome product I got from you guys! Seriously, it's top-notch quality and totally blew me away. Keep up the great work!",
  },
  {
    id: 4,
    title: "Perfect Fit",
    reviewer: "Sarah.M",
    source: "Facebook",
    image: "/clients/client1.png",
    review:
      "The virtual try-on tool was so accurate! My frames arrived exactly as they looked online and the fit is just perfect.",
  },
];

export default function Customers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="my-16 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-2 text-center text-black">
          Customer Reviews
        </h2>

        {/* Subheading */}
        <p className="text-center text-base max-w-2xl mx-auto mb-16 text-black">
          Set new trends around with these eyemazing Eyeglasses Shapes!
        </p>

        {/* Slider Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-[-20px] md:left-[-40px] z-10 p-2 text-gray-400 hover:text-black transition-colors"
          >
            <FiChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Desktop View (3 Cards) */}
          <div className="hidden md:grid grid-cols-3 gap-8 w-full">
            {reviews.slice(currentIndex, currentIndex + 3).concat(
              reviews.slice(0, Math.max(0, (currentIndex + 3) - reviews.length))
            ).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Mobile View (1 Card) */}
          <div className="md:hidden w-full">
            <ReviewCard review={reviews[currentIndex]} />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-[-20px] md:right-[-40px] z-10 p-2 text-gray-400 hover:text-black transition-colors"
          >
            <FiChevronRight size={48} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-start gap-4 text-left"
    >
      {/* Avatar Placeholder */}
      <div className="flex-shrink-0 w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden">
        {/* We can use a colored circle or a light gray bg if image is missing */}
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
          {/* If you have images, use them here. Otherwise a circle as per design */}
          <div className="w-[90%] h-[90%] rounded-full border border-gray-100"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-black mb-2">{review.title}</h3>
        <p className="text-gray-500 text-[13px] leading-relaxed mb-3">
          {review.review}
        </p>
        <p className="text-black font-bold text-sm">
          {review.reviewer}, <span className="font-bold">{review.source}</span>
        </p>
      </div>
    </motion.div>
  );
}
