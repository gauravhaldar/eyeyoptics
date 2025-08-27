"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart data when user logs in
  useEffect(() => {
    if (user?._id) {
      fetchCart();
    } else {
      // Clear cart when user logs out
      setCartItems({});
      setCartCount(0);
      setTotalAmount(0);
    }
  }, [user]);

  // Calculate totals whenever cart items change
  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const calculateTotals = () => {
    const items = Object.values(cartItems);
    const count = items.length;
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setCartCount(count);
    setTotalAmount(total);
  };

  const fetchCart = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8000/api/cart/${user._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setCartItems(data.cartData || {});
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch cart");
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId,
    quantity = 1,
    size = null,
    color = null
  ) => {
    if (!user?._id) {
      setError("Please login to add items to cart");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          productId,
          quantity,
          size,
          color,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartItems(data.cartData || {});
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      setError("Failed to add item to cart");
      console.error("Add to cart error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartKey, quantity) => {
    if (!user?._id) return false;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8000/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          cartKey,
          quantity,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartItems(data.cartData || {});
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      setError("Failed to update quantity");
      console.error("Update quantity error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartKey) => {
    if (!user?._id) return false;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          cartKey,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartItems(data.cartData || {});
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      setError("Failed to remove item");
      console.error("Remove from cart error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user?._id) return false;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8000/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartItems({});
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      setError("Failed to clear cart");
      console.error("Clear cart error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (productId, size = null, color = null) => {
    const cartKey =
      size || color
        ? `${productId}_${size || "default"}_${color || "default"}`
        : productId;
    return cartKey in cartItems;
  };

  const getCartItemQuantity = (productId, size = null, color = null) => {
    const cartKey =
      size || color
        ? `${productId}_${size || "default"}_${color || "default"}`
        : productId;
    return cartItems[cartKey]?.quantity || 0;
  };

  const value = {
    cartItems,
    cartCount,
    totalAmount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    isInCart,
    getCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
