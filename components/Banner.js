"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="my-12 px-0">
      <motion.div
        className="relative w-full h-40 md:h-60 rounded-md overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/ban.svg"
          alt="Promotional Banner"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  );
}
