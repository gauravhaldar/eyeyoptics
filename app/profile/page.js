"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

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
                  <h1 className="text-2xl font-bold text-white">My Profile</h1>
                  <p className="text-gray-200">
                    Manage your account information
                  </p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
