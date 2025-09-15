"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

let showToast = null;
let toastCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showToast = (message, type = "success") => {
      const id = `toast-${Date.now()}-${++toastCounter}`;
      const newToast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, removeToast };
};

export const toast = {
  success: (message) => showToast && showToast(message, "success"),
  error: (message) => showToast && showToast(message, "error"),
  info: (message) => showToast && showToast(message, "info"),
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`px-4 py-3 rounded-lg shadow-lg max-w-sm cursor-pointer ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {toast.type === "success"
                  ? "✅"
                  : toast.type === "error"
                  ? "❌"
                  : "ℹ️"}
              </span>
              <span className="text-sm">{toast.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
