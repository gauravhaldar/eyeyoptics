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

export default function ContactLensDetail({ product, slug }) {
  const [selectedImage, setSelectedImage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(false); // Close modal after successful addition
    } else {
      toast.error("Failed to add product to cart");
    }
  };

  const imageFiles = product.images.map((image) => image.url);

  const lensDetails = [
    { label: "Type", value: product.lensType || "N/A" },
    { label: "Material", value: product.lensMaterial || "N/A" },
    { label: "Water Content", value: product.waterContent || "N/A" },
    {
      label: "Oxygen Permeability",
      value: product.oxygenPermeability || "N/A",
    },
    { label: "Base Curve", value: product.baseCurve || "N/A" },
    { label: "Diameter", value: product.diameter || "N/A" },
    { label: "UV Protection", value: product.uvProtection ? "Yes" : "No" },
  ];

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 font-sans min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT - Product Images */}
        <div>
          <motion.div
            className="bg-white shadow-2xl rounded-2xl p-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Main Image */}
            <motion.div
              className="relative w-full h-[22rem] md:h-[26rem] overflow-hidden rounded-xl shadow-lg"
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
            >
              <Image
                src={imageFiles[selectedImage - 1]}
                alt={product.name}
                fill
                className="object-contain rounded-xl"
              />
              {/* Wishlist Button */}
              <motion.button
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.15, rotate: 8 }}
              >
                <Heart className="w-6 h-6 text-gray-600 hover:text-cyan-500 transition-colors" />
              </motion.button>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {imageFiles.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`relative w-full h-20 md:h-24 cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300
            ${
              selectedImage === idx + 1
                ? "ring-4 ring-cyan-500 scale-105 shadow-lg"
                : "hover:scale-105 hover:shadow-lg"
            }
          `}
                  onClick={() => setSelectedImage(idx + 1)}
                  whileHover={{ y: -4 }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${idx + 1}`}
                    fill
                    className="object-contain rounded-xl bg-white"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Product Details */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold capitalize">{product.name}</h1>
          <p className="text-3xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="rounded-lg px-3 py-2 w-20 shadow-md focus:shadow-lg outline-none"
            />
          </div>

          <div className="flex justify-start">
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Buy Now
            </button>
          </div>

          {/* Key Specs */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Lens Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {lensDetails.map((item, idx) => (
                <div
                  key={item.label}
                  className="rounded-lg p-4 shadow-md text-center bg-gray-50"
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
              title: "Usage & Care",
              content:
                product.usageAndCare ||
                "No usage and care information available.",
            },
          ].map((section) => (
            <div
              key={section.title}
              className="p-4 cursor-pointer rounded-lg shadow-md bg-white"
              onClick={() =>
                setOpenSection(
                  openSection === section.title ? "" : section.title
                )
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl">{section.title}</h3>
                <span className="text-xl">
                  {openSection === section.title ? "-" : "+"}
                </span>
              </div>
              <AnimatePresence>
                {openSection === section.title && (
                  <motion.div
                    className="mt-2 text-gray-600 text-base"
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
          {/* Store Location removed if not dynamically available */}
        </motion.div>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-center mb-4">
                Confirm Your Order
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Contact Lenses - {product.name}
              </p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-2 rounded-xl font-semibold transition ${
                    productInCart
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-700"
                  }`}
                  onClick={handleAddToCart}
                  disabled={cartLoading || productInCart}
                >
                  {cartLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding to Cart...
                    </span>
                  ) : productInCart ? (
                    "✓ In Cart"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
