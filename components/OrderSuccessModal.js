"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Package, Truck, Clock } from "lucide-react";

export default function OrderSuccessModal({ isOpen, onClose, orderData }) {
  // Debug logging
  console.log("🔔 OrderSuccessModal render:", {
    isOpen,
    orderData: !!orderData,
  });

  const handleClose = () => {
    console.log(
      "🚪 Modal close requested - will clear cart and navigate to home"
    );
    onClose("/"); // Navigate to home
  };

  const handleContinueShopping = () => {
    console.log("🏠 Continue Shopping clicked");
    onClose("/"); // Navigate to home
  };

  const handleViewOrders = () => {
    console.log("📋 View Orders clicked");
    onClose("/profile"); // Navigate to profile
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-6 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600">
                Thank you for your order. We&apos;ve received your order and
                will process it soon.
              </p>
            </div>

            {/* Order Details */}
            {orderData && (
              <div className="px-6 pb-2">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Order ID
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {orderData.orderId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Total Amount
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      ₹
                      {orderData.order?.orderSummary?.total?.toLocaleString() ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Payment Method
                    </span>
                    <span className="text-sm font-semibold text-gray-900 capitalize">
                      {orderData.order?.paymentMethod?.replace("_", " ") ||
                        "Cash on Delivery"}
                    </span>
                  </div>
                </div>

                {/* Order Status Timeline */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    What&apos;s Next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Order Confirmed
                        </p>
                        <p className="text-xs text-gray-500">
                          Your order has been received
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Processing
                        </p>
                        <p className="text-xs text-gray-500">
                          We&apos;re preparing your order
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Shipped
                        </p>
                        <p className="text-xs text-gray-500">
                          On the way to you
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Delivered
                        </p>
                        <p className="text-xs text-gray-500">
                          Expected:{" "}
                          {orderData.order?.estimatedDelivery
                            ? new Date(
                                orderData.order.estimatedDelivery
                              ).toLocaleDateString()
                            : "7-10 business days"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  You will receive an email confirmation shortly.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleContinueShopping}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleViewOrders}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Orders
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
