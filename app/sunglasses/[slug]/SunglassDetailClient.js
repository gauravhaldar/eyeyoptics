"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import React from "react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "../../../components/Toast";

export default function SunglassDetail({ product, slug }) {
  const [selectedImage, setSelectedImage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("");

  // Cart and Auth context
  const { addToCart, loading: cartLoading, isInCart } = useCart();
  const { user } = useAuth();

  // Check if product is already in cart
  const productInCart = isInCart(product._id);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    const success = await addToCart(product._id, quantity);
    if (success) {
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Failed to add product to cart");
    }
  };

  const imageFiles = product.images.map((image) => image.url);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 font-sans min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT - Images */}
        <div>
          <motion.div
            className="bg-white shadow-2xl rounded-2xl p-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Main Image */}
            <motion.div
              className="relative w-full h-64 sm:h-80 md:h-[28rem] overflow-hidden rounded-xl shadow-lg"
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Image
                src={imageFiles[selectedImage - 1]}
                alt={product.name}
                fill
                className="object-contain sm:object-cover rounded-xl"
              />
              {/* Wishlist Icon */}
              <motion.button
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Heart className="w-6 h-6 text-gray-600 hover:text-cyan-500" />
              </motion.button>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-4">
              {imageFiles.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`relative w-full h-20 sm:h-24 md:h-28 cursor-pointer rounded-xl shadow-md overflow-hidden
            ${
              selectedImage === idx + 1
                ? "ring-2 sm:ring-4 ring-cyan-500 shadow-xl scale-105"
                : "hover:scale-105"
            }
          `}
                  onClick={() => setSelectedImage(idx + 1)}
                  whileHover={{ y: -5 }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${idx + 1}`}
                    fill
                    className="object-contain sm:object-cover rounded-xl"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Details */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 space-y-6 h-full overflow-y-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Info Banners */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 rounded-lg bg-cyan-50 p-4 text-center shadow-md">
              <h3 className="font-semibold text-cyan-800">
                ☀️ 100% UV Protection
              </h3>
              <p className="text-cyan-700 text-sm">Polarized lenses included</p>
            </div>
            <div className="flex-1 rounded-lg bg-cyan-50 p-4 text-center shadow-md">
              <h3 className="font-semibold text-cyan-800">🚚 Free Shipping</h3>
              <p className="text-cyan-700 text-sm">On all orders above ₹999</p>
            </div>
          </div>

          {/* Title & Price */}
          <h1 className="text-4xl font-bold capitalize">{product.name}</h1>
          <p className="text-3xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            ₹{product.price}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="rounded-lg px-3 py-2 w-20 shadow-md outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                productInCart
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
              onClick={handleAddToCart}
              disabled={cartLoading || productInCart}
            >
              {cartLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </span>
              ) : productInCart ? (
                "✓ In Cart"
              ) : (
                "Buy Frame Only"
              )}
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
              Buy With Power Lens
            </button>
          </div>

          {/* Specs */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Frame Material",
                  value: product.frameMaterial || "N/A",
                },
                {
                  label: "Lens Material",
                  value: product.lensMaterial || "N/A",
                },
                { label: "Lens Type", value: product.lensType || "N/A" },
                { label: "Warranty", value: product.warranty || "N/A" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-4 shadow-md bg-gray-50 text-center"
                >
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Sections */}
          {[
            {
              title: "Description",
              content: product.description || "No description available.",
            },
            {
              title: "Product Information",
              content:
                product.productInformation ||
                "No product information available.",
            },
            {
              title: "Store Location",
              content: (
                <div className="w-full h-64 mt-2 rounded-lg overflow-hidden shadow">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              ),
            },
          ].map((section) => (
            <div
              key={section.title}
              className="p-4 rounded-lg shadow-md bg-white cursor-pointer"
              onClick={() =>
                setOpenSection(
                  openSection === section.title ? "" : section.title
                )
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl">{section.title}</h3>
                <span>{openSection === section.title ? "-" : "+"}</span>
              </div>
              <AnimatePresence>
                {openSection === section.title && (
                  <motion.div
                    className="mt-2 text-gray-600"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
