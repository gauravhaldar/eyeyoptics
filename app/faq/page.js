"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I obtain my prescription?",
    answer:
      "You can have your eyes tested by your optician or Doctor. The optician will provide you with a thorough eye examination and will provide you with a copy of your Rx for your records. You are not under any obligation to purchase your glasses from your optician - so do not feel pressured into doing so!",
  },
  {
    question: "Why are prices so low on your site?",
    answer:
      "Our prices are significantly lower than what you would find in high street stores. We are an online shop, so we can take advantage of lower costs of operation - which means no renting expensive prime location property, or paying for the upkeep of numerous items of expensive eye testing machinery.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We accept all major credit and debit cards which are kept secure with the strongest level of encryption commercially available. We don't store your card details on our server: all our payments are processed by Stripe, the world's leading secure payment processor. This makes all transactions 100% safe and secure.",
  },
  {
    question: "How long will it take me to receive my Rx glasses?",
    answer:
      "We aim to dispatch glasses within 5 working days of receiving the order. However, kindly note that it may take up to 30 working days for some prescriptions.",
  },
  {
    question: "What is the cost of postage & packaging?",
    answer:
      "The cost of postage and packaging within India is 500 Rs for each order. Note that, you can choose a delivery address that is different from the billing address. So, for example, your billing address can be your home address, but you can choose to have the glasses delivered to your office.",
  },
  {
    question: "Do I need to send you a copy of my Rx?",
    answer:
      "No - as long as you have a current up-to-date prescription (i.e. not more than two years old when ordering).",
  },
  {
    question: "What if I have any further questions?",
    answer:
      "If you have any further questions not answered in this section, please contact us directly on our contact number from the Contact Us Page.",
  },
  {
    question: "I can find an - addition - reading on my prescription - what do I do?",
    answer:
      "If your glasses are for distance only, you do not need to worry about the addition. The addition value is only required if the glasses are going to be used for reading or other close-distance work. Sometimes opticians use the word -ADD- or -Near- instead of -addition-. They may also write it just once, but since it normally applies to both eyes and is almost always the same value for both, you would need to enter the same value in both places in the form. (e.g. Add +2.50 - should be entered for both L and R eyes).",
  },
  {
    question: "Do you sell prescription glasses for children?",
    answer:
      "No. We do not sell prescription glasses for children.",
  },
  {
    question: "Are my payment details kept secure?",
    answer:
      "Yes, all your payment details are entered in a secure internet site that our website links with, and is managed by Stripe. Optically does not record customer payment details. All this information is held in a secure server managed by Stripe. Our shop uses 128 bit SSL, the strongest level of encryption commercially available; all transactions are guaranteed to be 100% safe and secure.",
  },
  {
    question: "What sort of frames will suit me?",
    answer:
      "The shape of your face is the most important factor when choosing any frame. The list below should give a broad idea as to frame designs:\n\nRound Faces - Rectangular frames would be most suitable\n\nOval Faces - Most frames suit this face shape; size is the most important point when deciding here\n\nTriangular Faces - Rectangular frames would be most suitable\n\nSquare Faces - Oval or round frames would be most suitable\n\nRectangular Faces - Oval and round frames would be most suitable with medium - or larger-sized models",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-teal-600">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-white border-l-4 border-teal-400 rounded-xl p-5 shadow-lg hover:scale-105 transition-transform duration-300 relative"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h2 className="text-lg font-semibold text-teal-700">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <ChevronUp className="text-blue-500 transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-blue-500 transition-transform duration-300" />
              )}
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 text-gray-700 whitespace-pre-line"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Decorative bubble */}
            <motion.div
              className="absolute w-6 h-6 bg-blue-200 rounded-full top-3 -left-3 opacity-50"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-blue-300 rounded-full bottom-3 -right-3 opacity-60"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
