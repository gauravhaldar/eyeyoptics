// offersslider.js
"use client";
import { motion } from "framer-motion";

export default function OffersSlider() {
  const offers = [
    "🎉 Flat 50% Off on Eyeglasses + Extra 10% with Code: EYE10",
    "🕶️ Buy 1 Get 1 Free on Sunglasses!",
    "🚚 Free Shipping on Orders Above ₹999",
    "💎 Premium Frames at Affordable Prices!",
    "🕶️ Limited Time Offer: 20% Off on New Arrivals",
  ];

  return (
    <div
      className="overflow-hidden py-2 md:py-3 relative"
      style={{ background: "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)" }}
    >
      <motion.div
        className="flex whitespace-nowrap gap-4 md:gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }} // faster speed
      >
        {offers.concat(offers).map((offer, index) => (
          <motion.span
            key={index}
            className="px-3 md:px-6 py-1 md:py-2 bg-white/70 backdrop-blur-md rounded-full shadow-md text-blue-900 font-medium text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
          >
            {offer}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
