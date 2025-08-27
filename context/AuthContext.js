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
    const res = await fetch("http://localhost:8000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

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
    const res = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Immediately fetch current user after login
      await fetchCurrentUser();
      console.log("✅ Login successful");
    } else {
      console.error("❌ Login failed", data.message);
      throw new Error(data.message || "Login failed");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

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
    await fetch("http://localhost:8000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    localStorage.removeItem("user");
    console.log("🚪 User logged out successfully");
  };

  const updateProfile = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:8000/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

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
