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

export default function ComputerGlassDetail({ product, slug }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLensOptionOpen, setIsLensOptionOpen] = useState(false);
  const [lensType, setLensType] = useState("Zero Power / Computer Glasses");
  const [selectedImage, setSelectedImage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("");

  // Cart and Auth context
  const { addToCart, loading: cartLoading, isInCart } = useCart();
  const { user } = useAuth();

  // Check if product is already in cart
  const productInCart = isInCart(product._id);

  const lensOptions = [
    "Zero Power / Computer Glasses",
    "Blue Cut Protection",
    "Photochromatic",
  ];

  const lensPackages = [
    {
      feature: "Lens Features",
      values: [
        "Anti-glare & scratch resistant",
        "Blue cut protection",
        "Ultra thin & lightweight",
        "Photochromatic (day-night protection)",
        "UV 400 protection",
        "Premium single vision coating",
      ],
    },
    {
      feature: "Lens + Frame Price",
      values: ["1599", "2499", "2999", "3499", "3999", "4999"],
    },
    {
      feature: "Sale Price",
      values: ["1399", "2299", "2799", "3299", "3799", "4799"],
    },
    {
      feature: "Thickness",
      values: ["1.5", "1.56", "1.6", "1.67", "1.74", "1.74"],
    },
    {
      feature: "Warranty Period",
      values: [
        "6 months",
        "1 year",
        "1 year",
        "1 year",
        "1.5 years",
        "2 years",
      ],
    },
    {
      feature: "Add to Cart",
      values: Array(6).fill("Add to Cart"),
    },
  ];

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
        {/* LEFT - Product Images */}
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
              transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
            >
              <Image
                src={imageFiles[selectedImage - 1]}
                alt={product.name}
                fill
                className="object-contain md:object-cover rounded-xl"
              />
              <motion.button
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Heart className="w-6 h-6 text-gray-600 hover:text-cyan-500 transition-colors" />
              </motion.button>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {imageFiles.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`relative w-full h-20 sm:h-24 md:h-28 cursor-pointer overflow-hidden rounded-xl shadow-md
            ${
              selectedImage === idx + 1
                ? "ring-4 ring-cyan-500 shadow-xl scale-105"
                : "hover:scale-105 hover:shadow-lg"
            }`}
                  onClick={() => setSelectedImage(idx + 1)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${idx + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Details */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold capitalize">{product.name}</h1>
          <p className="text-3xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            ₹{product.price}
          </p>

          {/* Quantity + Actions */}
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
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Buy With Power Lens
            </button>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              {product.blueLightProtection && <li>✅ Blue Light Protection</li>}
              {product.reducesEyeStrain && <li>✅ Reduces Eye Strain</li>}
              {product.lightweight && <li>✅ Lightweight & Comfortable</li>}
              {product.scratchResistant && <li>✅ Scratch Resistant</li>}
              {product.uvProtection && <li>✅ 100% UV Protection</li>}
              {/* Add more dynamic features based on your product data */}
            </ul>
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
          ].map((section) => (
            <div
              key={section.title}
              className="p-4 rounded-lg shadow-lg bg-white cursor-pointer"
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
          {/* Store Location removed if not dynamically available */}
        </motion.div>
      </div>

      {/* Modal - Step 1: Lens Type */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 text-white text-center">
                <h2 className="text-3xl font-bold">Choose Lens Type</h2>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 px-6 justify-center">
                {lensOptions.map((option) => (
                  <motion.div
                    key={option}
                    className={`px-5 py-2 rounded-xl cursor-pointer font-medium shadow-md ${
                      lensType === option
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setLensType(option)}
                  >
                    {option}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex justify-end px-6 py-4">
                <button
                  className="px-6 py-2 bg-gray-300 rounded-xl mr-3"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-cyan-500 text-white rounded-xl"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsLensOptionOpen(true);
                  }}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal - Step 2: Packages */}
      <AnimatePresence>
        {isLensOptionOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 text-white text-center">
                <h2 className="text-3xl font-bold">Choose Your Package</h2>
              </div>

              <div className="overflow-x-auto mt-6 px-6">
                <table className="w-full border-collapse text-center text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Feature</th>
                      {[...Array(6)].map((_, i) => (
                        <th key={i} className="p-2 border">
                          Option {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lensPackages.map((row, i) => (
                      <tr key={i}>
                        <td className="border p-2 font-medium">
                          {row.feature}
                        </td>
                        {row.values.map((val, j) => (
                          <td key={j} className="border p-2">
                            {row.feature === "Add to Cart" ? (
                              <button className="bg-cyan-500 text-white px-3 py-1 rounded-lg">
                                {val}
                              </button>
                            ) : (
                              val
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end px-6 py-4">
                <button
                  className="px-6 py-2 bg-gray-300 rounded-xl"
                  onClick={() => setIsLensOptionOpen(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
