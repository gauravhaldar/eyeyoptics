"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context

export default function Navbar() {
  const offers = [
    "🎉 Flat 50% Off on Eyeglasses + Extra 10% with Code: EYE10",
    "🕶️ Buy 1 Get 1 Free on Sunglasses!",
    "🚚 Free Shipping on Orders Above ₹999",
  ];

  const [currentOffer, setCurrentOffer] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [eyeglassesOpen, setEyeglassesOpen] = useState(false);
  const [mobileEyeglassesOpen, setMobileEyeglassesOpen] = useState(false);

  // ✅ Use AuthContext
  const { user, logout, fetchCurrentUser } = useAuth();
  // ✅ Use CartContext
  const { cartCount } = useCart();

  useEffect(() => {
    fetchCurrentUser(); // Load current user if logged in
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [offers.length]);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/"; // redirect after logout
  };

  return (
    <div className="shadow-md">
      {/* --- Main Navbar --- */}
      <div className="bg-gray-100 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
        {/* Brand Logo */}
        <Link href="/" className="inline-block flex-shrink-0">
          <Image
            src="/logoe.png"
            alt="Eyey Logo"
            width={120} // Increased width
            height={60} // Increased height
            className="w-28 sm:w-36 h-auto" // Adjusted Tailwind width classes
            priority
          />
        </Link>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-sm lg:text-base">
          <Link
            href="/help"
            className="hover:text-gray-900 flex items-center gap-1"
          >
            ❓ <span className="hidden lg:inline">Help</span>
          </Link>

          {user ? (
            // ✅ Profile Icon + Dropdown if logged in
            <div className="relative group">
              <button className="hover:text-gray-900 flex items-center gap-2 focus:outline-none">
                <FaUserCircle className="text-2xl text-gray-700 hover:text-gray-900" />
                <span className="hidden lg:inline">
                  {user.name || "Profile"}
                </span>
              </button>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-md mt-2 rounded-md border w-40 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // ✅ Show Sign In if not logged in
            <Link
              href="/signin"
              className="hover:text-gray-900 flex items-center gap-1"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden lg:inline">Sign In</span>
            </Link>
          )}

          <Link
            href="/cart"
            className="hover:text-gray-900 flex items-center gap-1 relative"
          >
            🛒
            <span className="hidden lg:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 text-2xl ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-gray-200 text-gray-900 px-4 py-3 space-y-3 overflow-hidden"
          >
            <Link href="/help" className="block hover:text-gray-700">
              ❓ Help
            </Link>

            {user ? (
              <>
                <Link href="/profile" className="block hover:text-gray-700">
                  👤 My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 hover:text-red-800"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link href="/signin" className="block hover:text-gray-700">
                👤 Sign In
              </Link>
            )}

            <Link href="/cart" className="block hover:text-gray-700 relative">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Categories */}
            <div>
              <button
                onClick={() => setMobileEyeglassesOpen(!mobileEyeglassesOpen)}
                className="flex items-center justify-between w-full hover:text-gray-700"
              >
                Eyeglasses{" "}
                <FiChevronDown
                  className={`transition-transform ${
                    mobileEyeglassesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {mobileEyeglassesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2 space-y-2 pl-4 text-gray-700"
                  >
                    <Link href="/men" className="block hover:text-gray-900">
                      Men
                    </Link>
                    <Link href="/women" className="block hover:text-gray-900">
                      Women
                    </Link>
                    <Link href="/kids" className="block hover:text-gray-900">
                      Kids
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/sunglasses" className="block hover:text-gray-700">
              Sunglasses
            </Link>
            <Link
              href="/computer-glasses"
              className="block hover:text-gray-700"
            >
              Computer Glasses
            </Link>
            <Link href="/power-glasses" className="block hover:text-gray-700">
              Power Glasses
            </Link>
            <Link href="/contact-lenses" className="block hover:text-gray-700">
              Contact Lenses
            </Link>
            <Link href="/new-arrivals" className="block hover:text-gray-700">
              New Arrivals
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Top Offer Bar --- */}
      <div className="bg-gray-700 text-white text-xs sm:text-sm py-2 text-center font-medium relative h-[30px] flex items-center justify-center px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOffer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute text-center px-2"
          >
            {offers[currentOffer]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Category Navbar (Desktop) --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 border-t border-gray-300 hidden md:block"
      >
        <nav className="w-full bg-white px-4 sm:px-6 py-2 sm:py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-800 font-medium shadow-sm text-sm sm:text-base">
          {/* Eyeglasses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setEyeglassesOpen(true)}
            onMouseLeave={() => setEyeglassesOpen(false)}
          >
            <Link
              href="/eyeglasses"
              className="hover:text-gray-600 flex items-center gap-1"
            >
              Eyeglasses ▾
            </Link>
            <AnimatePresence>
              {eyeglassesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50"
                >
                  <Link
                    href="/men"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Men
                  </Link>
                  <Link
                    href="/women"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Women
                  </Link>
                  <Link
                    href="/kids"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Kids
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Categories */}
          <Link href="/sunglasses" className="hover:text-gray-600">
            Sunglasses
          </Link>
          <Link href="/computer-glasses" className="hover:text-gray-600">
            Computer Glasses
          </Link>
          <Link href="/power-glasses" className="hover:text-gray-600">
            Power Glasses
          </Link>
          <Link href="/contact-lenses" className="hover:text-gray-600">
            Contact Lenses
          </Link>
          <Link href="/new-arrivals" className="hover:text-gray-600">
            New Arrivals
          </Link>
        </nav>
      </motion.div>
    </div>
  );
}
