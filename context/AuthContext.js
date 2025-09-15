"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const safeParse = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  // Load user from localStorage on refresh
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 AuthContext: Starting initialization");
      setIsLoading(true);

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

      // Fetch current user from backend if cookies exist
      console.log("🔄 AuthContext: Fetching current user from backend");
      await fetchCurrentUser();
      setIsLoading(false);
      console.log("✅ AuthContext: Initialization complete");
    };

    initializeAuth();
  }, []);

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

      // Also fetch current user to ensure session is valid
      await fetchCurrentUser();
      console.log("✅ Login successful");
    } else {
      console.error("❌ Login failed", data.message);
      throw new Error(data.message || "Login failed");
    }
  };

  const fetchCurrentUser = async () => {
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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    localStorage.removeItem("user");
    console.log("🚪 User logged out successfully");
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
        logout,
        fetchCurrentUser,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
