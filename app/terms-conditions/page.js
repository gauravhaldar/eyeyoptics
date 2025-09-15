"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsAndConditionsPage() {
  return (
    <section className="py-20 px-6 md:px-20 min-h-screen text-gray-800">
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
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-600"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Terms and Conditions
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-blue-500"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Please read these terms carefully before using www.eyey.in
        </motion.p>
      </motion.div>

      {/* Terms Content */}
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* 1. User Agreement */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            1. User Agreement
          </h2>
          <p>
            By using this Website, you acknowledge that you have read,
            understood, and agree to be bound by these Terms. These Terms
            constitute a binding agreement between you and WWW.EYEY.IN &amp;
            EYEY EVOLVE, governing your use of the Website.
          </p>
        </motion.div>

        {/* 2. Eligibility */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            2. Eligibility
          </h2>
          <p>
            You must be at least 18 years old and capable of entering into a
            legally binding agreement to use this Website. By using the Website,
            you represent and warrant that you meet these eligibility
            requirements.
          </p>
          <p>
            • &quot;Buyer Account&quot; shall mean an electronic account opened
            by the Buyer with the Platform to purchase the Products offered
            through the Platform;
          </p>
        </motion.div>

        {/* 3. Product Information */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            3. Product Information
          </h2>
          <p>
            We strive to provide accurate and up-to-date information about our
            products, including eyewear and prescription lenses, on the Website.
            However, we do not warrant that product descriptions, images, or
            other content on the Website are accurate, complete, reliable,
            current, or error-free.
          </p>
        </motion.div>

        {/* 4. Ordering and Purchasing */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            4. Ordering and Purchasing
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Placing Orders:</strong> By placing an order through the
              Website, you agree to purchase the products selected and abide by
              these Terms.
            </li>
            <li>
              <strong>Prescription Lenses:</strong> When ordering prescription
              lenses, you must provide accurate prescription information as
              prescribed by a qualified optometrist or ophthalmologist.
            </li>
            <li>
              <strong>Payment:</strong> You agree to pay the full price of the
              products, including any applicable taxes and shipping fees, at the
              time of purchase.
            </li>
          </ul>
          <p className="mt-2">
            <strong>How do I obtain my prescription?</strong> You can have your
            eyes tested by your optician. They will provide a thorough eye
            examination and a copy of your Rx for your records.
          </p>
          <p>
            <strong>Delivery Time:</strong> We aim to dispatch glasses within 5
            working days of receiving the order. Some prescriptions may take up
            to 28 working days.
          </p>
        </motion.div>

        {/* 5. Shipping and Delivery */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            5. Shipping and Delivery
          </h2>
          <p>
            <strong>Shipping:</strong> We make commercially reasonable efforts
            to ship orders promptly. Delivery times are not guaranteed.
          </p>
          <p>
            <strong>Delivery:</strong> Delivery times may vary depending on your
            location and shipping method. We are not responsible for lost or
            stolen packages after delivery confirmation.
          </p>
        </motion.div>

        {/* 6. Returns and Refunds */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            6. Returns and Refunds
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Returns: Unused and undamaged products may be returned within
              seven days of delivery in original packaging.
            </li>
            <li>
              All shipping charges and lens/glass charges will be deducted from
              the total amount.
            </li>
            <li>
              Refunds: Refunds will be issued to the original payment method
              after receiving returned products. Shipping fees are
              non-refundable.
            </li>
          </ul>
        </motion.div>

        {/* 7. Intellectual Property */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            7. Intellectual Property
          </h2>
          <p>
            All content on the Website, including text, graphics, logos, images,
            and software, is the property of EYEY OPTICS &amp; EYEY EVOLVE or
            its licensors and protected by copyright and other intellectual
            property laws. You may only use the Website for personal,
            non-commercial purposes and may not reproduce, distribute, or
            exploit content without written consent.
          </p>
        </motion.div>

        {/* 8. Limitation of Liability */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            8. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, we are not liable for any
            direct, indirect, incidental, special, or consequential damages
            arising from your use of the Website or products purchased through
            the Website.
          </p>
        </motion.div>

        {/* 9. Governing Law */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            9. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of Vasai (Dist-Palghar), India, without regard to its
            conflict of law principles.
          </p>
        </motion.div>

        {/* 10. Changes to Terms */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            10. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify or update these Terms at any time
            without prior notice. Changes will be effective immediately upon
            posting on the Website.
          </p>
        </motion.div>

        {/* 11. Contact Information */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            11. Contact Information
          </h2>
          <p>
            If you have questions or concerns about these Terms or the Website,
            please contact us at{" "}
            <a
              href="mailto:eyeyoptics@gmail.com"
              className="text-blue-500 underline"
            >
              eyeyoptics@gmail.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
