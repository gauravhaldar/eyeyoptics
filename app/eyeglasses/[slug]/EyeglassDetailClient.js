"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Truck, ShieldCheck, Store } from "lucide-react";
import React from "react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "../../../components/Toast";

export default function EyeglassDetail({ product, slug }) {
  const [selectedImage, setSelectedImage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(""); // For collapsible boxes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLensOptionOpen, setIsLensOptionOpen] = useState(false);
  const [lensType, setLensType] = useState("Single");

  // Cart and Auth context
  const { addToCart, loading: cartLoading, isInCart } = useCart();
  const { user } = useAuth();

  // Check if product is already in cart
  const productInCart = isInCart(product._id);

  // Dynamically get image URLs from the product.images array
  const imageFiles = product.images.map((image) => image.url);

  const lensOptions = [
    "Single",
    "Bifocal",
    "Progressive",
    "Zero Power / Computer Glasses",
  ];
  const powerValues = Array.from({ length: 11 }, (_, i) => (i - 5).toFixed(2));

  const lensPackages = [
    {
      feature: "Lens Features",
      values: [
        "Single vision (plane) spherical 0.25 to 6, cy 2, axis any",
        "Premium single vision coating",
        "Blue cut protection",
        "Ultra thin lenses for you ",
        "Scratch-resistant coating",
        "Anti-glare coating",
      ],
    },
    {
      feature: "Lens + Frame Price",
      values: ["1500.0", "8900.0", "1500.0", "2000.0", "2500.0", "3000.0"],
    },
    {
      feature: "Sale Price",
      values: ["2200.0", "9200.0", "1800.0", "2300.0", "2800.0", "3300.0"],
    },
    {
      feature: "Thickness",
      values: ["1.5", "1.6", "1.5", "1.74", "1.67", "1.5"],
    },
    {
      feature: "Warranty Period",
      values: [
        "3 months",
        "6 months",
        "3 months",
        "1 year",
        "1 year",
        "6 months",
      ],
    },
    {
      feature: "Only Lens Price",
      values: ["1500.0", "8900.0", "1500.0", "2000.0", "2500.0", "3000.0"],
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

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 font-sans min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT - Images */}
        <div>
          <motion.div
            className="bg-white shadow-2xl rounded-2xl p-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          >
            {/* Main Image */}
            <motion.div
              className="relative w-full h-[20rem] sm:h-[28rem] overflow-hidden rounded-xl shadow-lg"
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
                className="object-contain rounded-xl bg-white"
                priority
              />

              {/* Wishlist Icon */}
              <motion.button
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-6 h-6 text-gray-600 hover:text-cyan-500 transition-colors" />
              </motion.button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {imageFiles.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`relative w-full aspect-square cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300
            ${selectedImage === idx + 1
                      ? "ring-4 ring-cyan-500 shadow-xl scale-105"
                      : "hover:scale-105 hover:shadow-lg"
                    }
          `}
                  onClick={() => setSelectedImage(idx + 1)}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${idx + 1}`}
                    fill
                    className={`object-contain rounded-xl transition-all duration-300 bg-white
              ${selectedImage === idx + 1
                        ? "brightness-105"
                        : "hover:brightness-90"
                      }
            `}
                  />
                  {/* Optional gradient overlay on selected */}
                  {selectedImage === idx + 1 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent rounded-xl pointer-events-none" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Product Details */}
        <div className="h-screen overflow-hidden">
          <motion.div
            className="bg-white shadow-lg rounded-xl p-6 space-y-6 h-full overflow-y-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Free Shipping & Secure Payment */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 rounded-lg bg-cyan-50 p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-cyan-800">
                  🚚 Free Shipping
                </h3>
                <p className="text-cyan-700 text-sm">
                  On all orders above ₹999
                </p>
              </div>
              <div className="flex-1 rounded-lg bg-cyan-50 p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-cyan-800">
                  🔒 Secure Payment
                </h3>
                <p className="text-cyan-700 text-sm">
                  100% safe & secure checkout
                </p>
              </div>
            </div>

            <div>
              {product.brand && (
                <span className="text-cyan-600 font-semibold tracking-wide uppercase text-sm">
                  {product.brand}
                </span>
              )}
              <h1 className="text-4xl font-bold capitalize text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </p>
              <span className="text-gray-500 line-through text-lg">
                ₹{(product.price * 1.5).toLocaleString()}
              </span>
              <span className="text-green-600 font-medium text-sm">
                (50% OFF)
              </span>
            </div>

            {/* Seller Information Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <Store className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      Seller
                    </p>
                    <p className="font-bold text-gray-800">
                      {product.sellerName || "EyeyOptics Official"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded-lg gap-1 border border-green-200">
                    <span className="text-green-700 font-bold text-sm">
                      {product.sellerRating || "4.8"}
                    </span>
                    <Star className="w-3 h-3 text-green-700 fill-green-700" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">
                    Verified Seller
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-gray-100 w-full" />

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Expected Delivery
                  </p>
                  <p className="font-semibold text-gray-800 text-sm">
                    {product.deliveryTimeline || "Deliver within 3-5 days"}
                  </p>
                </div>
              </div>
            </div>

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

            <div className="flex gap-4">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${productInCart
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

            {/* Frame Dimensions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Frame Dimensions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Lens Width",
                    value: product.frameDimensions
                      ? `${product.frameDimensions.split(", ")[0]} mm`
                      : "N/A",
                  },
                  {
                    label: "Bridge Width",
                    value: product.frameDimensions
                      ? `${product.frameDimensions.split(", ")[1]} mm`
                      : "N/A",
                  },
                  {
                    label: "Temple Length",
                    value: product.frameDimensions
                      ? `${product.frameDimensions.split(", ")[2]} mm`
                      : "N/A",
                  },
                  {
                    label: "Lens Height",
                    value: product.frameDimensions
                      ? `${product.frameDimensions.split(", ")[3]} mm`
                      : "N/A",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg p-4 shadow-lg text-center bg-white"
                  >
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Returns / Warranty */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
                <span className="text-green-500 text-3xl mb-2">✔</span>
                <p className="text-gray-700 font-medium">7 Days Returns</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
                <span className="text-blue-500 text-3xl mb-2">🔄</span>
                <p className="text-gray-700 font-medium">Exchange at Store</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
                <span className="text-yellow-500 text-3xl mb-2">🛡️</span>
                <p className="text-gray-700 font-medium">3 Months Warranty</p>
              </div>
            </div>

            {/* Dropdown Sections */}
            {[
              {
                title: "Description",
                content: product.description,
              },
              {
                title: "Product Information",
                content: product.productInformation,
              },
              {
                title: "Store Location",
                content: (
                  <div className="mt-2">
                    <p className="text-gray-600 mb-2">
                      Available at select retail stores. Find us here:
                    </p>
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0195418961324!2d-122.41941548468194!3d37.774929279759955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8a1a2b7d%3A0x5f6f6f6f!2sEyewear%20Store!5e0!3m2!1sen!2sin!4v1678654321000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                ),
              },
            ].map((section) => (
              <div
                key={section.title}
                className="p-4 cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white"
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
                      transition={{ duration: 0.3 }}
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

      {/* Step 1 Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 text-white">
                <h2 className="text-3xl font-bold text-center">
                  Enter Your Prescription
                </h2>
                <p className="text-center mt-1 text-sm opacity-90">
                  Select lens type & prescription
                </p>
              </div>

              {/* Lens Options */}
              <div className="flex flex-wrap gap-4 mt-6 px-6 justify-center">
                {lensOptions.map((option) => (
                  <motion.div
                    key={option}
                    className={`px-5 py-2 rounded-xl cursor-pointer font-medium shadow-md ${lensType === option
                        ? "bg-blue-500 text-white shadow-blue-300"
                        : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    onClick={() => setLensType(option)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option}
                  </motion.div>
                ))}
              </div>

              {/* Prescription Table */}
              <div className="overflow-x-auto mt-6 px-6">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border border-gray-300"></th>
                      <th className="p-2 border border-gray-300">Right Eye</th>
                      <th className="p-2 border border-gray-300">Left Eye</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Spherical", "Cylindrical", "Axis"].map((row) => (
                      <tr key={row}>
                        <td className="border border-gray-300 p-2 font-medium">
                          {row}
                        </td>
                        {[0, 1].map((_, idx) => (
                          <td
                            key={`${row}-${idx}`}
                            className="border border-gray-300 p-2"
                          >
                            <select className="border rounded-md p-1 w-full hover:border-blue-400 transition">
                              <option value="">Select</option>
                              {powerValues.map((val) => (
                                <option key={`${row}-${val}`} value={val}>
                                  {val}
                                </option>
                              ))}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-4 px-6 py-4 bg-gray-50">
                <motion.button
                  className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition font-semibold"
                  onClick={() => setIsModalOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsLensOptionOpen(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2 Modal */}
      <AnimatePresence>
        {isLensOptionOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 text-white">
                <h2 className="text-3xl font-bold text-center">
                  Prescription Lens Option
                </h2>
                <p className="text-center mt-1 text-sm opacity-90">
                  Choose your preferred package
                </p>
              </div>

              {/* Lens Options Table */}
              <div className="overflow-x-auto mt-6 px-6">
                <table className="w-full border-collapse text-center text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border border-gray-300">Feature</th>
                      {[...Array(6)].map((_, idx) => (
                        <th
                          key={`option-${idx}`}
                          className="p-2 border border-gray-300"
                        >
                          Option {idx + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lensPackages.map((row, rowIndex) => (
                      <tr
                        key={row.feature}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="border border-gray-300 p-2 font-medium">
                          {row.feature}
                        </td>
                        {row.values.map((val, colIndex) => (
                          <td
                            key={`${row.feature}-${colIndex}`}
                            className="border border-gray-300 p-2"
                          >
                            {row.feature === "Add to Cart" ? (
                              <motion.button
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-xl shadow-md hover:shadow-lg transition"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {val}
                              </motion.button>
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

              {/* Close Button */}
              <div className="mt-6 flex justify-end px-6 py-4 bg-gray-50">
                <motion.button
                  className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition font-semibold"
                  onClick={() => setIsLensOptionOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
