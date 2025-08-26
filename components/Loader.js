"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <Image
          src="/logo.png" // 👈 replace with your actual logo path
          alt="Eyey Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
