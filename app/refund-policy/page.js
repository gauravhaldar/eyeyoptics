"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function RefundPolicyPage() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-white">
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
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Refund Policy
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We strive to ensure customer satisfaction. Refunds are applicable only under specific circumstances as outlined below.
        </motion.p>
      </motion.div>

      {/* Refund Details */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-10 border-l-8 border-blue-500"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Duplicate Payment */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Duplicate Payment</h2>
          <p className="text-gray-700">
            If a customer accidentally pays twice for a single transaction, the amount of the duplicate transaction will be refunded via the same source within 15 to 20 working days.
          </p>
        </motion.div>

        {/* Cancellation/Return Conditions */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Cancellation/Return Conditions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Cancellation or return must be initiated within 3 days of product delivery.</li>
            <li>Once approved, the full amount will be refunded via the original payment method within 10 to 20 working days.</li>
            <li>Products must be returned in undamaged, unworn, and brand-new condition.</li>
            <li>All product accessories must be returned for a refund.</li>
            <li>The company may deduct an amount if the returned product is damaged, used, or not in brand-new condition.</li>
          </ul>
        </motion.div>

        {/* Timeframe for Refund */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Timeframe for Refund</h2>
          <p className="text-gray-700">
            Refunds will not be processed for requests made after 3 days of product delivery. The company is not responsible for refunds after this timeframe.
          </p>
        </motion.div>

        {/* Exclusions */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Exclusions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>No refunds for breakage of frames, sunglasses, or lenses, or fading of frame/goggle colors.</li>
            <li>Online transaction charges are non-refundable for order cancellations.</li>
            <li>Products must be unworn, with tags, and in their original case and box.</li>
          </ul>
        </motion.div>

        {/* Contact Us */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Contact Us</h2>
          <p className="text-gray-700">
            Before initiating a return, contact our support team at <span className="font-medium text-blue-600">9594677688</span> (9am to 5pm, Monday to Friday) or email <span className="font-medium text-blue-600">support@eyey.in</span> for assistance.
          </p>
          <p className="text-gray-700 mt-2">
            All products sold by EYEY Optics are authentic, sourced directly from brands, and branded products come with their original warranties.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
