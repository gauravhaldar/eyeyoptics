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
  const [isClient, setIsClient] = useState(false);
  const offers = [
    "🎉 Flat 50% Off on Eyeglasses + Extra 10% with Code: EYE10",
    "🕶️ Buy 1 Get 1 Free on Sunglasses!",
    "🚚 Free Shipping on Orders Above ₹999",
  ];

  const [currentOffer, setCurrentOffer] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [eyeglassesOpen, setEyeglassesOpen] = useState(false);
  const [sunglassesOpen, setSunglassesOpen] = useState(false);
  const [computerGlassesOpen, setComputerGlassesOpen] = useState(false);
  const [powerGlassesOpen, setPowerGlassesOpen] = useState(false);
  const [contactLensesOpen, setContactLensesOpen] = useState(false);
  const [mobileEyeglassesOpen, setMobileEyeglassesOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // ✅ Use AuthContext
  const { user, logout } = useAuth();
  const { cartCount } = useCart(); // ✅ Get cart count

  // Add click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown when clicking outside
      if (
        profileDropdownOpen &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  useEffect(() => {
    setIsClient(true); // Set client flag to true after hydration
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
            src="/Eyey Business Card.png"
            alt="Eyey Logo"
            width={120} // Increased width
            height={80} // Increased height
            className="w-60 sm:w-36 h-auto object-contain" // Adjusted Tailwind width classes
            priority
          />
        </Link>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-sm lg:text-base">
          <Link
            href="/contact"
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <span className="hidden lg:inline">Help</span>
          </Link>

          {user ? (
            // ✅ Profile Icon + Dropdown if logged in
            <div className="relative profile-dropdown-container">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="hover:text-gray-900 flex items-center gap-2 focus:outline-none"
              >
                <FaUserCircle className="text-2xl text-gray-700 hover:text-gray-900" />
                <span className="hidden lg:inline">
                  {user.name || "Profile"}
                </span>
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 bg-white shadow-md mt-2 rounded-md border w-40 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
      {isClient && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 border-t border-gray-300 hidden md:block"
        >
          <nav className="w-full bg-white px-4 sm:px-6 py-2 sm:py-3 flex flex-wrap items-center justify-evenly text-gray-800 font-medium shadow-sm text-sm sm:text-base">
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
                    className="absolute left-0 mt-2 w-[32rem] bg-white border border-gray-200 shadow-xl rounded-lg py-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-8 px-6">
                      {/* Gender Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Gender
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/men"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Men
                          </Link>
                          <Link
                            href="/women"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Women
                          </Link>
                          <Link
                            href="/kids"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Kids
                          </Link>
                        </div>
                      </div>

                      {/* Brands Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Brands
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Gucci
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Ray-Ban
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Prada
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Killer
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Vogue
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Tommy Hilfiger
                          </Link>
                        </div>
                      </div>

                      {/* Shop by Frame Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Shop by Frame
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Full Frame
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Half Frame
                          </Link>
                          <Link
                            href="/eyeglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Rimless
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Categories */}
            {/* Sunglasses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSunglassesOpen(true)}
              onMouseLeave={() => setSunglassesOpen(false)}
            >
              <Link
                href="/sunglasses"
                className="hover:text-gray-600 flex items-center gap-1"
              >
                Sunglasses ▾
              </Link>
              <AnimatePresence>
                {sunglassesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-[32rem] bg-white border border-gray-200 shadow-xl rounded-lg py-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-8 px-6">
                      {/* Gender Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Gender
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/men"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Men
                          </Link>
                          <Link
                            href="/women"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Women
                          </Link>
                          <Link
                            href="/kids"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Kids
                          </Link>
                        </div>
                      </div>

                      {/* Brands Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Brands
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Gucci
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Ray-Ban
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Prada
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Killer
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Vogue
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Tommy Hilfiger
                          </Link>
                        </div>
                      </div>

                      {/* Shop by Frame Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Shop by Frame
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Full Frame
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Half Frame
                          </Link>
                          <Link
                            href="/sunglasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Rimless
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Computer Glasses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setComputerGlassesOpen(true)}
              onMouseLeave={() => setComputerGlassesOpen(false)}
            >
              <Link
                href="/computer-glasses"
                className="hover:text-gray-600 flex items-center gap-1"
              >
                Computer Glasses ▾
              </Link>
              <AnimatePresence>
                {computerGlassesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-[32rem] bg-white border border-gray-200 shadow-xl rounded-lg py-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-8 px-6">
                      {/* Gender Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Gender
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/men"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Men
                          </Link>
                          <Link
                            href="/women"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Women
                          </Link>
                          <Link
                            href="/kids"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Kids
                          </Link>
                        </div>
                      </div>

                      {/* Brands Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Brands
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Gucci
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Ray-Ban
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Prada
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Killer
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Vogue
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Tommy Hilfiger
                          </Link>
                        </div>
                      </div>

                      {/* Shop by Frame Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Shop by Frame
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Full Frame
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Half Frame
                          </Link>
                          <Link
                            href="/computer-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Rimless
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Power Glasses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPowerGlassesOpen(true)}
              onMouseLeave={() => setPowerGlassesOpen(false)}
            >
              <Link
                href="/power-glasses"
                className="hover:text-gray-600 flex items-center gap-1"
              >
                Power Glasses ▾
              </Link>
              <AnimatePresence>
                {powerGlassesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-[32rem] bg-white border border-gray-200 shadow-xl rounded-lg py-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-8 px-6">
                      {/* Gender Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Gender
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/men"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Men
                          </Link>
                          <Link
                            href="/women"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Women
                          </Link>
                          <Link
                            href="/kids"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Kids
                          </Link>
                        </div>
                      </div>

                      {/* Brands Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Brands
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Gucci
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Ray-Ban
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Prada
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Killer
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Vogue
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Tommy Hilfiger
                          </Link>
                        </div>
                      </div>

                      {/* Shop by Frame Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Shop by Frame
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Full Frame
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Half Frame
                          </Link>
                          <Link
                            href="/power-glasses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Rimless
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Contact Lenses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setContactLensesOpen(true)}
              onMouseLeave={() => setContactLensesOpen(false)}
            >
              <Link
                href="/contact-lenses"
                className="hover:text-gray-600 flex items-center gap-1"
              >
                Contact Lenses ▾
              </Link>
              <AnimatePresence>
                {contactLensesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-[32rem] bg-white border border-gray-200 shadow-xl rounded-lg py-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-8 px-6">
                      {/* Gender Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Gender
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/men"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Men
                          </Link>
                          <Link
                            href="/women"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Women
                          </Link>
                          <Link
                            href="/kids"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Kids
                          </Link>
                        </div>
                      </div>

                      {/* Brands Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Brands
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Gucci
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Ray-Ban
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Prada
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Killer
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Vogue
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Tommy Hilfiger
                          </Link>
                        </div>
                      </div>

                      {/* Shop by Frame Column */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base uppercase tracking-wide">
                          Shop by Frame
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Full Frame
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Half Frame
                          </Link>
                          <Link
                            href="/contact-lenses"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded text-sm"
                          >
                            Rimless
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/new-arrivals" className="hover:text-gray-600">
              New Arrivals
            </Link>
          </nav>
        </motion.div>
      )}
    </div>
  );
}
