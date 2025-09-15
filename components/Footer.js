"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const sections = [
    {
      title: "Let's Get Social",
      links: [
        { name: "Facebook", url: "https://www.facebook.com/eyeyoptics" },
        { name: "Instagram", url: "https://www.instagram.com/eyeyoptics" },
        { name: "Twitter", url: "https://twitter.com" },
        { name: "LinkedIn", url: "https://linkedin.com" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Home", url: "/" },
        { name: "EyeGlasses", url: "/eyeglasses" },
        { name: "About Us", url: "/about" },
        { name: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Delivery & Shipping Terms", url: "/delivery-page" },
        { name: "Refund Policy", url: "/refund-policy" },
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Terms And Conditions", url: "/terms-conditions" },
      ],
    },
    {
      title: "Explore",
      links: [{ name: "FAQ", url: "/faq" }],
    },
    {
      title: "Eyey",
      text: "Your one-stop destination for stylish, affordable eyewear. Quality you can trust, style you'll love.",
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      className="bg-black text-gray-200 py-12 px-6 md:px-20"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {sections.map((section, index) => (
          <motion.div key={index} variants={item}>
            <h3 className="text-xl font-semibold mb-4 text-[#1CA9C9]">
              {section.title}
            </h3>

            {section.links ? (
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith("http") ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-500"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.url}
                        className="hover:text-orange-500"
                        onClick={() => (window.location.href = link.url)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 max-w-xs">{section.text}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Haldar AI & IT. All rights reserved.
      </div>
    </motion.footer>
  );
}
