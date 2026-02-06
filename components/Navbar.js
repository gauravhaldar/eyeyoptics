"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiSearch, FiHelpCircle } from "react-icons/fi";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context

export default function Navbar() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [eyeglassesOpen, setEyeglassesOpen] = useState(false);
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


  const handleLogout = async () => {
    await logout();
    router.push("/"); // Use Next.js router instead of window.location.href
  };

  return (
    <div className="w-full flex flex-col font-nunito">
      {/* --- Row 1: Top Navbar --- */}
      <div className="bg-[#F2ECE4] flex items-center justify-between pl-4 md:pl-16 pr-4 md:pr-16 py-3 gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Eyey Business Card.png"
            alt="EyeMyEye Logo"
            width={120}
            height={40}
            className="w-32 md:w-48 h-auto object-contain"
            priority
          />
        </Link>

        {/* Search Bar (Centered) */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search for stylish eyeglasses.."
            className="w-full h-9 px-4 py-2 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 font-bold text-black placeholder:text-black"
          />
        </div>

        {/* Top Right Icons */}
        <div className="flex items-center gap-4 md:gap-8 text-gray-700 font-medium">
          <Link href="/help" className="hidden md:flex items-center gap-1 text-black font-bold text-sm">
            Help
          </Link>

          {user ? (
            <div className="relative profile-dropdown-container">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="text-black flex items-center gap-1 focus:outline-none text-sm font-bold"
              >
                {user.name ? `Hi, ${user.name.split(" ")[0]}` : "Profile"}
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 bg-white shadow-lg mt-2 rounded-sm border w-48 z-50 py-2">
                  <div className="px-4 py-2 border-b text-xs text-gray-500 font-bold uppercase">
                    Welcome, {user.name}
                  </div>
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
            <Link href="/signin" className="hover:text-black text-sm font-semibold whitespace-nowrap">
              Sign In
            </Link>
          )}

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative group">
              <div className="w-5 h-5 rounded-full bg-[#4DA9FF] flex items-center justify-center text-white text-[10px] font-bold">
                {cartCount}
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-800 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* --- Row 2: Guaranteed Lowest Price Banner --- */}
      <div className="bg-[#4A5B67] py-1.5 flex items-center justify-center gap-2">
        <span className="text-white text-base md:text-lg font-bold tracking-wide">
          Guaranteed Lowest Price
        </span>
        {/* <div className="bg-[#F9A825] text-[10px] font-extrabold px-1 rounded-sm text-white skew-x-[-10deg] leading-tight">
          LOWEST<br />PRICE
        </div> */}
      </div>

      {/* --- Row 3: Navigation & 3D Try On --- */}
      {isClient && (
        <div className="bg-[#F9F9F9] hidden md:block border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between py-2 text-gray-800 font-bold text-[15px]">
            {/* Eyeglasses */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setEyeglassesOpen(true)}
              onMouseLeave={() => setEyeglassesOpen(false)}
            >
              <Link href="/eyeglasses" className="hover:text-gray-600 flex items-center gap-1">
                Eyeglasses
              </Link>
              <AnimatePresence>
                {eyeglassesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-[40rem] bg-white border border-gray-200 shadow-2xl rounded-sm py-8 z-50 font-normal"
                  >
                    <div className="grid grid-cols-3 gap-10 px-8">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider border-b pb-2">Gender</h3>
                        <div className="space-y-3">
                          <Link href="/men" className="block text-gray-700 hover:text-blue-600 text-sm">Men</Link>
                          <Link href="/women" className="block text-gray-700 hover:text-blue-600 text-sm">Women</Link>
                          <Link href="/kids" className="block text-gray-700 hover:text-blue-600 text-sm">Kids</Link>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider border-b pb-2">Brands</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Ray-Ban</Link>
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Gucci</Link>
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Prada</Link>
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Oakley</Link>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider border-b pb-2">Frame Type</h3>
                        <div className="space-y-3">
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Full Frame</Link>
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Half Frame</Link>
                          <Link href="/eyeglasses" className="block text-gray-700 hover:text-blue-600 text-sm">Rimless</Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/computer-glasses" className="hover:text-gray-600 py-2">Computer Glasses</Link>
            <Link href="/contact-lenses" className="hover:text-gray-600 py-2">Contact Lenses</Link>
            <Link href="/color-blind" className="hover:text-gray-600 py-2 whitespace-nowrap">Color Blind Glasses</Link>
            <Link href="/more" className="hover:text-gray-600 py-2">More...</Link>

            {/* 3D Try On Button */}
            <button className="bg-gradient-to-r from-[#59a4dc] to-[#30cbd1] text-white px-5 py-2 rounded-md flex items-center gap-2 font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
              <span className="text-lg">👓</span>
              3D Try On
            </button>
          </div>
        </div>
      )}

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 flex flex-col p-4 gap-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 px-4 py-2 bg-gray-100 rounded-sm text-sm focus:outline-none"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="flex flex-col gap-3 py-2 border-b border-gray-50">
              <Link href="/eyeglasses" className="font-bold text-gray-800">Eyeglasses</Link>
              <Link href="/computer-glasses" className="font-bold text-gray-800">Computer Glasses</Link>
              <Link href="/contact-lenses" className="font-bold text-gray-800">Contact Lenses</Link>
            </div>

            <div className="flex flex-col gap-3 py-2 border-b border-gray-50">
              {user ? (
                <>
                  <div className="text-sm text-gray-500 font-bold">WELCOME, {user.name}</div>
                  <Link href="/profile" className="text-gray-700">My Account</Link>
                  <button onClick={handleLogout} className="text-red-500 text-left">Logout</button>
                </>
              ) : (
                <Link href="/signin" className="font-bold text-gray-800">Sign In</Link>
              )}
              <Link href="/cart" className="text-gray-700">Cart ({cartCount})</Link>
              <Link href="/help" className="text-gray-700">Help Center</Link>
            </div>

            <button className="bg-gradient-to-r from-[#59a4dc] to-[#30cbd1] text-white px-4 py-2 rounded-md font-bold text-center mt-2">
              3D Try On
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
