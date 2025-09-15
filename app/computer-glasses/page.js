"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "../../components/Toast";

export default function ComputerGlassesPage() {
  const [sort, setSort] = useState("featured");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Cart and Auth context
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();

  // Sidebar filter options
  const filters = {
    "Frame Style": ["Full Rim", "Half Rim", "Rimless"],
    "Frame Shape": ["Rectangle", "Round", "Square"],
    "Frame Color": ["Black", "Blue", "Brown", "Transparent"],
    "Frame Material": ["Metal", "Plastic", "TR90"],
    Brands: ["BluGuard", "EyeZen", "Fastrack", "Titan"],
    Collections: ["Blue Light Blocker", "Premium", "Budget"],
    "Frame Size": ["Small", "Medium", "Large"],
    Price: ["Under ₹999", "₹1000 - ₹1999", "₹2000 - ₹2999", "Above ₹3000"],
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/api/products?category=Computer Glasses`,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch computer glasses");
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching computer glasses:", err);
        setError("Failed to load computer glasses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  // Handle filter change
  const handleFilterChange = (category, option, checked) => {
    setSelectedFilters((prev) => {
      const prevOptions = prev[category] || [];
      let newOptions = [];
      if (checked) {
        newOptions = [...prevOptions, option];
      } else {
        newOptions = prevOptions.filter((o) => o !== option);
      }
      return { ...prev, [category]: newOptions };
    });
  };

  // Handle add to cart
  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    try {
      await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url || "/placeholder-image.jpg",
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  // Filter + Sort Products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    for (const [category, options] of Object.entries(selectedFilters)) {
      if (options.length === 0) continue;
      filtered = filtered.filter((product) => {
        switch (category) {
          case "Frame Style":
            return options.includes(product.style);
          case "Frame Shape":
            return options.includes(product.shape);
          case "Frame Color":
            return options.includes(product.color);
          case "Frame Material":
            return options.includes(product.material);
          case "Brands":
            return options.includes(product.brand);
          case "Collections":
            return options.includes(product.collection);
          case "Frame Size":
            return options.includes(product.size);
          case "Price":
            return options.some((priceRange) => {
              if (priceRange === "Under ₹999") return product.price < 999;
              if (priceRange === "₹1000 - ₹1999")
                return product.price >= 1000 && product.price <= 1999;
              if (priceRange === "₹2000 - ₹2999")
                return product.price >= 2000 && product.price <= 2999;
              if (priceRange === "Above ₹3000") return product.price > 3000;
            });
          default:
            return true;
        }
      });
    }

    if (sort === "low-to-high") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high-to-low") filtered.sort((a, b) => b.price - a.price);
    if (sort === "new") filtered.sort((a, b) => b.id - a.id);

    return filtered;
  }, [products, selectedFilters, sort]); // ✅ FIXED

  // Motion Variants
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const productVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Top Banner */}
      <motion.div
        className="relative w-full h-48 md:h-64 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/cb.png"
          alt="Computer Glasses Banner"
          fill
          className="object-cover scale-105 transition-transform duration-700 ease-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-gray-800/20 to-transparent"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <motion.aside
          className="w-full md:w-72 bg-gradient-to-b from-gray-100 to-gray-200 p-5 space-y-6 md:min-h-screen shadow-inner"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
            Filters
          </h2>

          {Object.entries(filters).map(([key, options]) => (
            <FilterDropdown
              key={key}
              title={key}
              options={options}
              selectedOptions={selectedFilters[key] || []}
              onChange={handleFilterChange}
            />
          ))}
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Sorting */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-3">
            <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
              Computer Glasses
            </h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="new">Newest First</option>
            </select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="col-span-full text-center py-10 text-lg text-gray-600">
              Loading computer glasses...
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10 text-lg text-red-500">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-10 text-lg text-gray-600">
              No computer glasses found.
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="show"
              variants={containerVariants}
            >
              {filteredProducts.map((product, index) => {
                const discount = Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                );

                return (
                  <motion.div
                    key={product._id || product.id || index}
                    variants={productVariants}
                  >
                    <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300">
                      {product.bestSeller && (
                        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          Best Seller
                        </span>
                      )}

                      <Link
                        href={`/computer-glasses/${slugify(product.name)}`}
                        className="block"
                      >
                        <div className="relative w-full h-64 bg-gray-50 z-0">
                          {product.images && product.images.length > 0 && (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              className="object-contain p-6 transition-transform duration-300 hover:scale-105"
                            />
                          )}
                        </div>

                        <div className="p-5 space-y-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.size}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                            {product.originalPrice && discount > 0 && (
                              <span className="text-sm text-green-600 font-medium">
                                ({discount}% OFF)
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

/* Sidebar Dropdown Component */
function FilterDropdown({ title, options, selectedOptions, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-gray-700 font-semibold hover:text-gray-900 transition"
      >
        <span>{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-1 overflow-hidden"
          >
            {options.map((option, index) => (
              <li
                key={`${title}-${option}`}
                className="flex items-center gap-2 hover:text-gray-900 transition-colors"
              >
                <input
                  type="checkbox"
                  id={`${title}-${index}`}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => onChange(title, option, e.target.checked)}
                  className="accent-gray-700"
                />
                <label
                  htmlFor={`${title}-${index}`}
                  className="text-sm text-gray-600"
                >
                  {option}
                </label>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
