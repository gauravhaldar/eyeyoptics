"use client";

import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { login, signup, googleLogin, user, fetchCurrentUser, isLoggingOut, hasLoggedOut } = useAuth();
  const router = useRouter();
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

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !isLoggingOut && !hasLoggedOut) {
      console.log("👤 User already logged in, redirecting to home...");
      router.push("/");
    }
  }, [user, isLoggingOut, hasLoggedOut, router]);

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
        router.push("/");
      } else {
        console.log("🔄 Attempting login...");
        await login(form.email, form.password);
        console.log("✅ Login completed successfully");
        router.push("/");
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

  const handleGoogleLogin = async () => {
    try {
      console.log("🔄 Attempting Google Login...");
      await googleLogin();
      console.log("✅ Google Login successful");
      router.push("/");
    } catch (err) {
      console.error("❌ Google Login error:", err);
      alert(`Google Login Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isSignup ? "Join us and get started!" : "Login to continue to Eyey"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all"
              required
            />
          </div>

          {!isSignup && (
            <div className="flex justify-end">
              {/* <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer font-medium">
                Forgot password?
              </span> */}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
          >
            {isSignup ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        {/* Or Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Login Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-50 transition-all"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Google
        </motion.button>

        {/* Switch Login/Signup */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-gray-600">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-orange-600 font-bold cursor-pointer hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
