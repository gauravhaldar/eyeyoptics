"use client";

import { useState, useEffect, useCallback } from "react";
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
  Tag,
  X,
  MapPin,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "../../components/Toast";
import CouponModal from "../../components/CouponModal";
import AddressModal from "../../components/AddressModal";

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

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [suggestedCoupons, setSuggestedCoupons] = useState([]);

  // Address state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);

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
  const tax = (subtotal - couponDiscount) * 0.18; // 18% tax after coupon discount

  // Calculate shipping based on selected address or default rules
  let shipping = 0;
  if (selectedAddress && selectedAddress.shippingInfo) {
    // Use shipping cost from selected address
    shipping = selectedAddress.shippingInfo.finalCharge;
  } else {
    // Default shipping rules (free shipping above ₹999 after discount)
    shipping = subtotal - couponDiscount > 999 ? 0 : 99;
  }

  const total = subtotal - couponDiscount + tax + shipping;

  // Fetch suggested coupons
  const fetchSuggestedCoupons = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/coupons?status=active&limit=3`
      );
      const data = await response.json();

      if (data.success) {
        // Filter coupons that are applicable for current cart total
        const applicableCoupons = data.data
          .filter(
            (coupon) =>
              subtotal >= coupon.minValue &&
              subtotal <= coupon.maxValue &&
              coupon.usedCount < coupon.usageLimit
          )
          .slice(0, 2); // Show only 2 suggestions

        setSuggestedCoupons(applicableCoupons);
      }
    } catch (error) {
      console.error("Error fetching suggested coupons:", error);
    }
  }, [subtotal]);

  // Fetch cart on component mount
  useEffect(() => {
    if (user?._id) {
      fetchCart();
    }
  }, [user, fetchCart]);

  // Fetch suggested coupons when subtotal changes
  useEffect(() => {
    if (subtotal > 0 && !appliedCoupon) {
      fetchSuggestedCoupons();
    }
  }, [subtotal, appliedCoupon, fetchSuggestedCoupons]);

  // Reset coupon when cart items change
  useEffect(() => {
    if (appliedCoupon) {
      // Re-validate coupon when cart total changes
      const newSubtotal = Object.values(cartItems).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (newSubtotal < appliedCoupon.minValue) {
        handleRemoveCoupon();
        toast.error(
          `Cart total is below minimum value for coupon ${appliedCoupon.code}`
        );
      } else if (newSubtotal > appliedCoupon.maxValue) {
        handleRemoveCoupon();
        toast.error(
          `Cart total exceeds maximum value for coupon ${appliedCoupon.code}`
        );
      }
    }
  }, [cartItems]);

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

  // Handle apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/coupons/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: couponCode.trim(),
            orderAmount: subtotal,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAppliedCoupon(data.data.couponDetails);
        setCouponDiscount(data.data.discount);
        toast.success(`Coupon applied! You saved ₹${data.data.discount}`);
      } else {
        toast.error(data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Handle coupon selection from modal
  const handleSelectCouponFromModal = async (code) => {
    setCouponCode(code);

    // Apply the coupon directly
    setCouponLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/coupons/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            orderAmount: subtotal,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAppliedCoupon(data.data.couponDetails);
        setCouponDiscount(data.data.discount);
        toast.success(
          `Coupon ${code} applied! You saved ₹${data.data.discount}`
        );
      } else {
        toast.error(data.message || "Invalid coupon code");
        setCouponCode("");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
      setCouponCode("");
    } finally {
      setCouponLoading(false);
    }
  };

  // Handle address added
  const handleAddressAdded = (address) => {
    setSelectedAddress(address);
    setDeliveryAvailable(true);
    console.log("Address added:", address);
  };

  // Handle remove address
  const handleRemoveAddress = () => {
    setSelectedAddress(null);
    setDeliveryAvailable(true);
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

              {/* Coupon Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Apply Coupon Code
                  </h3>
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Available
                  </button>
                </div>

                {!appliedCoupon ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code (e.g., SAVE10)"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                        disabled={couponLoading}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleApplyCoupon()
                        }
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors min-w-[60px]"
                      >
                        {couponLoading ? (
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
                        ) : (
                          "Apply"
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Enter your coupon code to get discount on your order
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-green-800">
                          {appliedCoupon.code}
                        </span>
                        <p className="text-xs text-green-600">
                          {appliedCoupon.name} • Saved ₹
                          {couponDiscount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
                      title="Remove coupon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Suggested Coupons */}
              {!appliedCoupon && suggestedCoupons.length > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    Recommended for You
                  </h3>
                  <div className="space-y-2">
                    {suggestedCoupons.map((coupon) => (
                      <div
                        key={coupon._id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 cursor-pointer transition-colors"
                        onClick={() => handleSelectCouponFromModal(coupon.code)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-blue-100 rounded">
                            <Tag className="w-3 h-3 text-blue-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              {coupon.code}
                            </span>
                            <p className="text-xs text-gray-600">
                              {coupon.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            Save ₹
                            {coupon.type === "flat"
                              ? coupon.amount
                              : Math.floor((subtotal * coupon.amount) / 100)}
                          </p>
                          <p className="text-xs text-blue-600">
                            Click to apply
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </h3>
                </div>

                {!selectedAddress ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Add Delivery Address
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      We'll check if we deliver to your location
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {selectedAddress.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                            ✓ Available
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {selectedAddress.addressLine1}
                          {selectedAddress.addressLine2 &&
                            `, ${selectedAddress.addressLine2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedAddress.city}, {selectedAddress.state} -{" "}
                          {selectedAddress.zipCode}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedAddress.phone} • {selectedAddress.email}
                        </p>
                        {selectedAddress.shippingInfo && (
                          <p className="text-xs text-blue-600 mt-1">
                            Shipping: ₹
                            {selectedAddress.shippingInfo.finalCharge} to{" "}
                            {selectedAddress.shippingInfo.state}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handleRemoveAddress}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors ml-2"
                        title="Remove address"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="w-full px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Change Address
                    </button>
                  </div>
                )}
              </div>

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

                {/* Coupon Discount */}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold">
                      -₹{couponDiscount.toLocaleString()}
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
                  <span className="text-gray-600">
                    Shipping
                    {selectedAddress && selectedAddress.shippingInfo && (
                      <span className="text-xs text-gray-500 block">
                        to {selectedAddress.shippingInfo.state}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {/* Free shipping notice */}
                {shipping > 0 && !selectedAddress?.shippingInfo && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Add ₹{(1000 - (subtotal - couponDiscount)).toLocaleString()}{" "}
                    more for free shipping!
                  </div>
                )}

                {/* Location-based shipping info */}
                {selectedAddress?.shippingInfo && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    📍 Shipping to {selectedAddress.shippingInfo.state}: ₹
                    {selectedAddress.shippingInfo.finalCharge}
                    {selectedAddress.shippingInfo.finalCharge === 0 && (
                      <span className="text-green-600 ml-1">(Free)</span>
                    )}
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                {!selectedAddress ? (
                  <div className="mt-6 space-y-2">
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Add Address to Proceed
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      Please add a delivery address to continue
                    </p>
                  </div>
                ) : !deliveryAvailable ? (
                  <div className="mt-6 space-y-2">
                    <button
                      disabled
                      className="w-full bg-red-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Delivery Not Available
                    </button>
                    <p className="text-xs text-center text-red-600">
                      We don't deliver to this location yet
                    </p>
                  </div>
                ) : (
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6">
                    Proceed to Checkout
                  </button>
                )}

                {/* Security Badge */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  🔒 Secure Checkout • 100% Safe & Secure
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onSelectCoupon={handleSelectCouponFromModal}
        currentTotal={subtotal}
      />

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onAddressAdded={handleAddressAdded}
        currentUser={user}
      />
    </div>
  );
}
