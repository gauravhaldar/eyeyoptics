"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const safeParse = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = safeParse(savedUser);
      if (parsedUser) setUser(parsedUser);
      else localStorage.removeItem("user");
    }

    // Fetch current user from backend if cookies exist
    fetchCurrentUser();
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
      }
    } catch (error) {
      console.error("❌ Failed to fetch current user", error);
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

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
