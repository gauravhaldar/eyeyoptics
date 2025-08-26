"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-blue-500"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Additional Terms Applicable Only to Registered Users
        </motion.p>
      </motion.div>

      {/* Policy Details */}
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Service Availability and Security */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            Service Availability and Security
          </h2>
          <p>
            The Site does not warrant that the functions contained in the service provided by the Site will be uninterrupted or error-free. Users acknowledge that the Site cannot guarantee that defects will be corrected promptly or that the service or the server that makes it available will be free of viruses or other harmful components.
          </p>
        </motion.div>

        {/* Registration Process */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            Registration Process
          </h2>
          <p>
            As part of the registration process, each user will select a password (&quot;Password&quot;) and Login Name (&quot;Login Name&quot;). Users must provide accurate, complete, and updated account information. Failure to do so constitutes a breach of this Terms of Use, which may result in immediate termination of the user&apos;s account.
          </p>
        </motion.div>

        {/* Login Name Restrictions */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            Login Name Restrictions
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Selecting or using a Login Name of another person with the intent to impersonate that person is prohibited.</li>
            <li>Using a name subject to the rights of any other person without authorization is prohibited.</li>
            <li>Using a Login Name that the Site deems inappropriate or offensive is prohibited.</li>
          </ul>
        </motion.div>

        {/* Account Security */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.3 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Account Security</h2>
          <p>
            Users must notify the Site of any known or suspected unauthorized use(s) of their account or any known or suspected breach of security, including loss, theft, or unauthorized disclosure of their password. Users are responsible for maintaining the confidentiality of their Password.
          </p>
        </motion.div>

        {/* Termination of Account */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Termination of Account</h2>
          <p>
            Any fraudulent, abusive, or illegal activity may be grounds for termination of the user&apos;s account, at the Site’s sole discretion. Users engaging in such activity may be reported to appropriate law enforcement agencies.
          </p>
        </motion.div>

        {/* Users Disputes */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.5 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Users Disputes</h2>
          <p>
            Users are solely responsible for their interactions with other users. The Site reserves the right, but has no obligation, to monitor disputes between users.
          </p>
        </motion.div>

        {/* Contact Address */}
        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.6 }}>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Contact Information</h2>
          <p>
            EYEY EVOLVE, Shop No 1, Utsav Shopping Center, Opp Ankita Cable, Madhuban Township, Vasai East, Dist Palghar, Maharashtra, India 401208
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
