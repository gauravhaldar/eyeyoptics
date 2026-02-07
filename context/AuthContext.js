"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(() => {
    // Check if user has recently logged out (persist across reloads)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasLoggedOut') === 'true';
    }
    return false;
  });

  const safeParse = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  // Google Login
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setHasLoggedOut(false);
        localStorage.removeItem("hasLoggedOut");
        localStorage.removeItem("logoutTime");
        return { success: true };
      } else {
        throw new Error(data.message || "Google Login failed");
      }
    } catch (error) {
      console.error("❌ Google Login Error:", error);
      throw error;
    }
  };

  // Load user from localStorage on refresh
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 AuthContext: Starting initialization");
      setIsLoading(true);

      // Check if logout flag has expired (5 minutes)
      const logoutTime = localStorage.getItem('logoutTime');
      if (logoutTime) {
        const timeSinceLogout = Date.now() - parseInt(logoutTime);
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (timeSinceLogout > fiveMinutes) {
          console.log("🕒 Logout flag expired, clearing it");
          localStorage.removeItem('hasLoggedOut');
          localStorage.removeItem('logoutTime');
          setHasLoggedOut(false);
        }
      }

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = safeParse(savedUser);
        if (parsedUser) {
          console.log("✅ AuthContext: Found user in localStorage", parsedUser);
          setUser(parsedUser);
        } else {
          console.log(
            "❌ AuthContext: Invalid user data in localStorage, removing"
          );
          localStorage.removeItem("user");
        }
      } else {
        console.log("❌ AuthContext: No user found in localStorage");
      }

      // Always fetch current user from backend on initialization
      console.log("🔄 AuthContext: Fetching current user from backend");
      await fetchCurrentUser();
      setIsLoading(false);
      console.log("✅ AuthContext: Initialization complete");
    };

    initializeAuth();
  }, []); // Empty dependency array - only run once on mount

  const signup = async (name, email, password) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      console.log("✅ Signup successful", data);
    } else {
      console.error("❌ Signup failed", data.message);
      throw new Error(data.message || "Signup failed");
    }
  };

  const login = async (email, password) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Login response received:", data);

      // Set user data immediately from login response
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setHasLoggedOut(false); // Reset logout flag on successful login
      localStorage.removeItem('hasLoggedOut'); // Clear persisted logout state
      localStorage.removeItem('logoutTime'); // Clear logout timestamp

      // Also fetch current user to ensure session is valid
      await fetchCurrentUser();
      console.log("✅ Login successful");
    } else {
      console.error("❌ Login failed", data.message);
      throw new Error(data.message || "Login failed");
    }
  };

  const fetchCurrentUser = async () => {
    // Don't fetch if user is logging out or has recently logged out
    if (isLoggingOut || hasLoggedOut) {
      console.log("🚪 fetchCurrentUser: Skipping - user is logging out or has logged out");
      return null;
    }

    try {
      console.log(
        "🔄 Fetching current user from:",
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`
      );
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      console.log("🔄 fetchCurrentUser response status:", res.status);
      console.log("🔄 fetchCurrentUser response headers:", [
        ...res.headers.entries(),
      ]);

      const data = await res.json();
      console.log("🔄 fetchCurrentUser response data:", data);

      if (res.ok) {
        // If backend returns { user: {...} }, adjust this line
        const currentUser = data.user || data;
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        console.log("✅ Current user fetched", currentUser);
        return currentUser;
      } else {
        // If backend says user is not authenticated, clear local storage
        console.log("❌ User not authenticated, clearing local storage");
        setUser(null);
        localStorage.removeItem("user");
        return null;
      }
    } catch (error) {
      console.error("❌ Failed to fetch current user", error);
      return null;
    }
  };

  const logout = async () => {
    console.log("🚪 Starting logout process");
    setIsLoggingOut(true);
    setHasLoggedOut(true);
    localStorage.setItem('hasLoggedOut', 'true'); // Persist logout state
    localStorage.setItem('logoutTime', Date.now().toString()); // Store logout timestamp

    try {
      // Try to logout from backend, but don't fail if it doesn't work
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      console.log("✅ Backend logout successful");
    } catch (error) {
      console.log("⚠️ Backend logout failed, but continuing with local logout:", error);
    }

    // Always clear local state regardless of backend response
    setUser(null);
    localStorage.removeItem("user");
    console.log("🚪 User logged out successfully");

    // Reset the logging out flag after a short delay
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 1000);
  };

  const updateProfile = async (name, email, password) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("✅ Profile updated successfully", data);
        return { success: true, data };
      } else {
        console.error("❌ Profile update failed", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("❌ Profile update error", error);
      return { success: false, message: "Network error" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        googleLogin,
        logout,
        fetchCurrentUser,
        updateProfile,
        isLoading,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
