"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "../../components/Toast";

export default function CartPage() {
  const { user } = useAuth();
  const {
    cartItems,
    cartCount,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  } = useCart();

  const [localLoading, setLocalLoading] = useState({});

  // Fetch cart on component mount
  useEffect(() => {
    if (user?._id) {
      fetchCart();
    }
  }, [user, fetchCart]);

  // Calculate totals
  const cartItemsArray = Object.values(cartItems);
  const subtotal = cartItemsArray.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItemsArray.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const tax = subtotal * 0.18; // 18% tax
  const shipping = subtotal > 999 ? 0 : 99; // Free shipping above ₹999
  const total = subtotal + tax + shipping;

  // Handle quantity update
  const handleUpdateQuantity = async (cartKey, newQuantity) => {
    if (newQuantity < 1) return;

    setLocalLoading((prev) => ({ ...prev, [cartKey]: true }));

    const success = await updateQuantity(cartKey, newQuantity);
    if (success) {
      toast.success("Quantity updated successfully!");
    } else {
      toast.error("Failed to update quantity");
    }

    setLocalLoading((prev) => ({ ...prev, [cartKey]: false }));
  };

  // Handle remove item
  const handleRemoveItem = async (cartKey, itemName) => {
    setLocalLoading((prev) => ({ ...prev, [cartKey]: true }));

    const success = await removeFromCart(cartKey);
    if (success) {
      toast.success(`${itemName} removed from cart!`);
    } else {
      toast.error("Failed to remove item");
    }

    setLocalLoading((prev) => ({ ...prev, [cartKey]: false }));
  };

  // Handle clear cart
  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      const success = await clearCart();
      if (success) {
        toast.success("Cart cleared successfully!");
      } else {
        toast.error("Failed to clear cart");
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  // Loading state
  if (loading && cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!loading && cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart and enjoy great deals!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                {cartCount} item(s) in your cart
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Clear Cart Button */}
              {cartCount > 0 && (
                <div className="flex justify-between items-center mb-6 pb-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                    disabled={loading}
                  >
                    Clear Cart
                  </button>
                </div>
              )}

              {/* Items List */}
              <AnimatePresence mode="popLayout">
                {Object.entries(cartItems).map(([cartKey, item]) => (
                  <motion.div
                    key={cartKey}
                    variants={itemVariants}
                    exit="exit"
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg mb-4 last:mb-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                      <Image
                        src={item.images?.[0]?.url || "/placeholder-image.jpg"}
                        alt={item.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                          {(item.size || item.color) && (
                            <p className="text-sm text-gray-500">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && " • "}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(cartKey, item.name)}
                          disabled={localLoading[cartKey]}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{item.price}
                          </span>
                          {item.originalPrice &&
                            item.originalPrice > item.price && (
                              <span className="text-sm text-gray-400 line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(cartKey, item.quantity - 1)
                            }
                            disabled={
                              item.quantity <= 1 || localLoading[cartKey]
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="font-semibold min-w-[2rem] text-center">
                            {localLoading[cartKey] ? "..." : item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleUpdateQuantity(cartKey, item.quantity + 1)
                            }
                            disabled={localLoading[cartKey]}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-600">Total: </span>
                        <span className="font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6 sticky top-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartCount} items)
                  </span>
                  <span className="font-semibold">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Savings */}
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-semibold">
                      -₹{savings.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Tax */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-semibold">₹{tax.toFixed(0)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {/* Free shipping notice */}
                {shipping > 0 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Add ₹{(1000 - subtotal).toLocaleString()} more for free
                    shipping!
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6">
                  Proceed to Checkout
                </button>

                {/* Security Badge */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  🔒 Secure Checkout • 100% Safe & Secure
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
