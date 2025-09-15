"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEdit,
  FaSave,
  FaTimes,
  FaShoppingBag,
  FaCalendarAlt,
  FaEye,
  FaBox,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../../config";

export default function ProfilePage() {
  const {
    user,
    updateProfile,
    fetchCurrentUser,
    isLoading: authLoading,
  } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Order states
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Redirect to signin if not logged in (but only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && !user) {
      console.log("❌ Profile page: User not found, redirecting to signin", {
        authLoading,
        user,
      });
      router.push("/signin");
    } else {
      console.log("✅ Profile page: Auth state", { authLoading, user: !!user });
    }
  }, [user, router, authLoading]);

  // Fetch orders when user is available
  useEffect(() => {
    if (!user?._id || activeTab !== "orders") return;
    
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        console.log("🔄 Fetching orders for user:", user._id);
        console.log("🔄 Using endpoint:", API_ENDPOINTS.ORDERS_USER);
        
        const response = await fetch(API_ENDPOINTS.ORDERS_USER, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This sends cookies automatically
        });

        console.log("📥 Orders API response status:", response.status);
        const data = await response.json();
        console.log("📥 Orders API response data:", data);

        if (data.success) {
          setOrders(data.data.orders || []);
          console.log("✅ Orders fetched successfully:", data.data.orders?.length || 0, "orders");
        } else {
          console.error("❌ Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("🚨 Error fetching orders:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id, activeTab]);

  // Manual fetch orders function for refresh button
  const handleRefreshOrders = async () => {
    if (!user) return;
    
    setOrdersLoading(true);
    try {
      console.log("🔄 Manually refreshing orders for user:", user._id);
      console.log("🔄 Using endpoint:", API_ENDPOINTS.ORDERS_USER);
      
      const response = await fetch(API_ENDPOINTS.ORDERS_USER, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("📥 Orders API response status:", response.status);
      const data = await response.json();
      console.log("📥 Orders API response data:", data);

      if (data.success) {
        setOrders(data.data.orders || []);
        console.log("✅ Orders refreshed successfully:", data.data.orders?.length || 0, "orders");
      } else {
        console.error("❌ Failed to refresh orders:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error refreshing orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Helper functions for orders
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-indigo-100 text-indigo-800 border-indigo-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Debug function to test authentication
  const testAuthentication = async () => {
    console.log("🧪 Testing authentication...");
    console.log("🍪 Document cookies:", document.cookie);
    console.log("👤 User from localStorage:", JSON.parse(localStorage.getItem("user") || "null"));
    
    try {
      // Test the /me endpoint first
      const meResponse = await fetch(`${API_ENDPOINTS.USERS_ME}`, {
        method: "GET",
        credentials: "include",
      });
      console.log("📥 /me response status:", meResponse.status);
      const meData = await meResponse.json();
      console.log("📥 /me response data:", meData);

      if (meResponse.ok) {
        console.log("✅ Authentication working for /me endpoint");
        // Now test orders endpoint
        const ordersResponse = await fetch(API_ENDPOINTS.ORDERS_USER, {
          method: "GET",
          credentials: "include",
        });
        console.log("📥 Orders response status:", ordersResponse.status);
        const ordersData = await ordersResponse.json();
        console.log("📥 Orders response data:", ordersData);
      }
    } catch (error) {
      console.error("🚨 Authentication test error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation
    if (!formData.name.trim()) {
      setMessage("Name is required");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setMessage("Email is required");
      setLoading(false);
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      // Only include password if it's being changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      const result = await updateProfile(
        updateData.name,
        updateData.email,
        updateData.password
      );

      if (result.success) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        setFormData({
          ...formData,
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(result.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("An error occurred while updating profile");
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
    setMessage("");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will trigger redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-600 text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">My Account</h1>
                  <p className="text-gray-200">
                    Manage your profile and order history
                  </p>
                </div>
              </div>
              {!isEditing && activeTab === "profile" && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === "profile"
                    ? "bg-white text-gray-700"
                    : "bg-transparent text-gray-200 hover:text-white"
                }`}
              >
                <FaUser />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === "orders"
                    ? "bg-white text-gray-700"
                    : "bg-transparent text-gray-200 hover:text-white"
                }`}
              >
                <FaShoppingBag />
                <span>Order History</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg ${
                      message.includes("successfully")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                <form onSubmit={handleSave} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      isEditing
                        ? "border-gray-300 bg-white"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      isEditing
                        ? "border-gray-300 bg-white"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password Fields (only shown when editing) */}
              {isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password (optional)
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter new password (leave blank to keep current)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex space-x-4 pt-6">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <FaSave />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </motion.button>
                </div>
              )}
            </form>

                {/* Account Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-semibold text-gray-800">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Items in Cart</p>
                      <p className="font-semibold text-gray-800">
                        {user.cartData ? Object.keys(user.cartData).length : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={testAuthentication}
                      className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Debug Auth
                    </button>
                    <button
                      onClick={handleRefreshOrders}
                      disabled={ordersLoading}
                      className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                    >
                      {ordersLoading ? "Loading..." : "Refresh"}
                    </button>
                    <div className="text-sm text-gray-600">
                      {orders.length} {orders.length === 1 ? "order" : "orders"} found
                    </div>
                  </div>
                </div>

                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FaShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                    <div className="text-xs text-gray-500 mb-4">
                      User ID: {user?._id} | API: {API_ENDPOINTS.ORDERS_USER}
                    </div>
                    <button
                      onClick={() => router.push("/")}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-opacity"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <FaBox className="text-indigo-600 text-xl" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Order #{order.orderId}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <FaCalendarAlt className="text-xs" />
                                <span>{formatDate(order.orderDate)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Items</p>
                            <p className="font-medium">
                              {order.items.length} {order.items.length === 1 ? "item" : "items"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="font-medium text-lg">
                              {formatCurrency(order.orderSummary.total)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Payment</p>
                            <p className="font-medium">
                              {order.paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            {order.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className="w-full h-full flex items-center justify-center" style={{display: item.image ? 'none' : 'flex'}}>
                                  <FaBox className="text-gray-400 text-lg" />
                                </div>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            <FaEye />
                            <span>View Details</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {showOrderDetails && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowOrderDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Order #{selectedOrder.orderId}
                      </h2>
                      <p className="text-gray-600">
                        Placed on {formatDate(selectedOrder.orderDate)}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowOrderDetails(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Order Status */}
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="w-full h-full flex items-center justify-center" style={{display: item.image ? 'none' : 'flex'}}>
                              <FaBox className="text-gray-400 text-xl" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.category && `Category: ${item.category}`}
                              {item.size && ` • Size: ${item.size}`}
                              {item.color && ` • Color: ${item.color}`}
                            </p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.price)}</p>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <p className="text-sm text-gray-500 line-through">
                                {formatCurrency(item.originalPrice)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                      <p className="text-gray-600">{selectedOrder.shippingAddress.email}</p>
                      <p className="text-gray-600">{selectedOrder.shippingAddress.phone}</p>
                      <p className="text-gray-600 mt-2">
                        {selectedOrder.shippingAddress.addressLine1}
                        {selectedOrder.shippingAddress.addressLine2 && (
                          <>, {selectedOrder.shippingAddress.addressLine2}</>
                        )}
                      </p>
                      <p className="text-gray-600">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(selectedOrder.orderSummary.subtotal)}</span>
                      </div>
                      {selectedOrder.orderSummary.couponDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>
                            Coupon Discount 
                            {selectedOrder.orderSummary.couponCode && (
                              <span className="text-xs ml-1">({selectedOrder.orderSummary.couponCode})</span>
                            )}
                          </span>
                          <span>-{formatCurrency(selectedOrder.orderSummary.couponDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>{formatCurrency(selectedOrder.orderSummary.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>{formatCurrency(selectedOrder.orderSummary.shippingCharge)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(selectedOrder.orderSummary.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(selectedOrder.estimatedDelivery || selectedOrder.notes) && (
                    <div className="mt-6 pt-6 border-t">
                      {selectedOrder.estimatedDelivery && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-1">Estimated Delivery</h4>
                          <p className="text-gray-600">{formatDate(selectedOrder.estimatedDelivery)}</p>
                        </div>
                      )}
                      {selectedOrder.notes && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Order Notes</h4>
                          <p className="text-gray-600">{selectedOrder.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
