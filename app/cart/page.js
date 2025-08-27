"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CartPage = () => {
  const { user } = useAuth();
  const {
    cartItems,
    cartCount,
    totalAmount,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showAddress, setShowAddress] = React.useState(false);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  // Convert cartItems object to array for easier rendering
  const cartItemsArray = Object.entries(cartItems).map(([cartKey, item]) => ({
    cartKey,
    ...item,
  }));

  const tax = Math.round(totalAmount * 0.02);
  const grandTotal = totalAmount + tax - discount;

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(10);
    } else if (coupon === "SAVE50") {
      setDiscount(50);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  const handleQuantityChange = async (cartKey, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(cartKey, newQuantity);
  };

  const handleRemoveItem = async (cartKey) => {
    await removeFromCart(cartKey);
  };

  // Show login message if user is not authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please Login
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your cart
          </p>
          <Link
            href="/signin"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show empty cart
  if (cartCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some amazing eyewear to get started!
          </p>
          <Link
            href="/eyeglasses"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Shop Eyeglasses
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* Left - Cart */}
      <div className="flex-1 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-medium">
            Shopping Cart{" "}
            <span className="text-sm text-gray-700">{cartCount} Items</span>
          </h1>
          {cartCount > 0 && (
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartItemsArray.map((item) => (
          <motion.div
            key={item.cartKey}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-b pb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <Image
                  src={item.images?.[0]?.url || "/placeholder-image.jpg"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="max-w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold text-gray-900">
                  {item.name}
                </p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Category: <span>{item.category}</span>
                  </p>
                  {item.size && (
                    <p>
                      Size: <span>{item.size}</span>
                    </p>
                  )}
                  {item.color && (
                    <p>
                      Color: <span>{item.color}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <p>Qty:</p>
                    <select
                      className="outline-none border border-gray-300 rounded px-2 py-1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.cartKey,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-semibold">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
            <button
              className="cursor-pointer mx-auto hover:scale-110 transition-transform"
              onClick={() => handleRemoveItem(item.cartKey)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        ))}

        <Link
          href="/eyeglasses"
          className="group cursor-pointer flex items-center mt-8 gap-2 text-gray-500 font-medium hover:text-gray-700"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>

      {/* Right - Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address Section */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-gray-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-gray-500 p-2 hover:bg-gray-100"
                >
                  New York, USA
                </p>
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-gray-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Coupon */}
        <div className="mb-5">
          <p className="text-sm font-medium uppercase mb-2">Apply Coupon</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 outline-none"
              placeholder="Enter coupon code"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-gray-500 text-white font-medium hover:bg-gray-600 transition"
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-sm mt-2">
              Coupon applied: -₹{discount}
            </p>
          )}
        </div>

        <hr className="border-gray-300" />

        {/* Price Breakdown */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax}</span>
          </p>
          {discount > 0 && (
            <p className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </p>
          )}
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-gray-700 text-white font-medium hover:bg-gray-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
