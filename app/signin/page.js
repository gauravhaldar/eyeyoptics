"use client";

import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SignInPage() {
  const { login, signup, user, fetchCurrentUser, isLoggingOut, hasLoggedOut } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Test function to check API connectivity
  const testAPIConnection = async () => {
    try {
      console.log("🔄 Testing API connection...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      console.log("🔄 API Test Response Status:", response.status);
      console.log("🔄 API Test Response Headers:", [
        ...response.headers.entries(),
      ]);

      if (response.status === 401) {
        console.log(
          "✅ API is reachable (401 Unauthorized is expected for unauthenticated requests)"
        );
      } else {
        const data = await response.text();
        console.log("🔄 API Test Response Data:", data);
      }
    } catch (error) {
      console.error("❌ API Test Error:", error);
    }
  };

  // Load current user on page load if logged in
  useEffect(() => {
    console.log("🔄 SignIn page mounting, testing API connection...");
    testAPIConnection();
    
    // Only fetch current user if not logging out or hasn't recently logged out
    if (!isLoggingOut && !hasLoggedOut) {
      fetchCurrentUser();
    } else {
      console.log("🚪 SignIn page: Skipping fetchCurrentUser - user is logging out or has logged out");
    }
  }, [fetchCurrentUser, isLoggingOut, hasLoggedOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔄 Form submission started", { isSignup, form });
    try {
      if (isSignup) {
        console.log("🔄 Attempting signup...");
        await signup(form.name, form.email, form.password);
        console.log("✅ Signup completed successfully");
        alert("Signup successful!");
      } else {
        console.log("🔄 Attempting login...");
        await login(form.email, form.password);
        console.log("✅ Login completed successfully");
        alert("Login successful!");
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      console.error("❌ Error details:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
      });
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isSignup ? "Join us and get started!" : "Login to continue"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        {/* Switch Login/Signup */}
        <p className="text-center mt-6 text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
