"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/contact/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        alert("Thank you for your message! We'll get back to you soon.");

        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Heading */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-purple-700 mb-4"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-purple-900 text-lg md:text-xl"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have questions or feedback? We&apos;d love to hear from you! Fill out
          the form below and we&apos;ll get back to you as soon as possible.
        </motion.p>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div
          className="max-w-4xl mx-auto mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ✅ Thank you for your message! We&apos;ll get back to you soon.
        </motion.div>
      )}

      {/* Contact Form */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12 border-2 border-purple-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-purple-800 font-medium mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-purple-800 font-medium mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-purple-800 font-medium mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              placeholder="Your Message"
              className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50"
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-500 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>

        {/* Contact Info */}
        <motion.div
          className="mt-12 text-center text-purple-900 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>
            Email:{" "}
            <span className="font-medium text-purple-700">
              eyeyoptics@gmail.com
            </span>
          </p>
          <p>
            Phone:{" "}
            <span className="font-medium text-purple-700">+91 9594677688</span>
          </p>
          <p>
            Address:{" "}
            <span className="font-medium text-purple-700">
              Shop no 1, Utsav shopping centre, opp Ankita cable, Madhuban
              Township, opp Evershine city Gate, Vasai East 401208
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
