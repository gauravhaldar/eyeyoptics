"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function DeliveryPage() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-white">
      {/* Heading */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Delivery & Shipping Terms
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl leading-relaxed"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          At <span className="font-semibold text-blue-600">Eyey</span>, we ensure your product reaches you quickly. 
          All our products are customized, and we have outlined pre-dispatch and post-dispatch timelines below.
        </motion.p>
      </motion.div>

      {/* Pre-dispatch timeline */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 border-l-4 border-blue-400"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Category-wise Pre-Dispatch Timeline
        </h2>
        <p className="text-gray-700 mb-4">
          Here is the order-ready time for your products:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Order Ready Time / Dispatch Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Sunglasses</td>
                <td className="border border-gray-300 px-4 py-2">1-4 Working Days</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Eyeglasses</td>
                <td className="border border-gray-300 px-4 py-2">3-7 Working Days</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Prescription Sunglasses</td>
                <td className="border border-gray-300 px-4 py-2">4-8 Working Days</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Computer Glasses</td>
                <td className="border border-gray-300 px-4 py-2">2-6 Working Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Post-dispatch timeline */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 border-l-4 border-green-400"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          City-wise Post-Dispatch Timeline
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Delivery Time After Dispatch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Mumbai</td>
                <td className="border border-gray-300 px-4 py-2">2-4 Working Days</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Mumbai and Suburban</td>
                <td className="border border-gray-300 px-4 py-2">3-6 Working Days</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Thane, Palghar</td>
                <td className="border border-gray-300 px-4 py-2">6 Working Days</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Navi Mumbai</td>
                <td className="border border-gray-300 px-4 py-2">6 Working Days</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">North East / J&K / ROI</td>
                <td className="border border-gray-300 px-4 py-2">7-15 Working Days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-4">
          We may deliver earlier than mentioned timelines, but this extra time ensures a strict quality check. 
          <span className="text-green-600 font-semibold"> Quality matters for your eyes!</span>
        </p>
      </motion.div>

      {/* Fast Delivery Terms */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 border-l-4 border-yellow-400"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
          Fast Delivery Terms
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Fast Delivery is applicable only for prepaid orders.</li>
          <li>Valid for all power ranges.</li>
          <li>Delivery timeline starts post-prescription confirmation.</li>
          <li>The mentioned date is tentative and subject to change.</li>
        </ul>
      </motion.div>

      {/* Shipping Charges & Non-Serviceable Pin Codes */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-red-400"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Shipping Charges & Non-Serviceable Pin Codes
        </h2>
        <p className="text-gray-700 mb-4">
          At <span className="text-red-600 font-semibold">Eyey</span>, we always use the best materials & services. For non-serviceable pin codes:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Prepaid orders with non-serviceable pin codes are sent through Speed Post.</li>
          <li>Normal delivery & refund schedules do not apply for goods sent via Speed Post.</li>
          <li>Returns for such orders need to be initiated by the customer.</li>
          <li>Rural pin codes served by India Post may take up to 30 days for delivery.</li>
        </ul>
      </motion.div>
    </section>
  );
}
