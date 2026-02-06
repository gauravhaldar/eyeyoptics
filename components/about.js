import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

export default function About() {
  const faqQuestions = [
    "Is Eyey a legit website?",
    "When can I expect my order?",
    "How do I contact customer support?",
  ];

  return (
    <section className="my-8 px-4 md:px-6 max-w-[95%] mx-auto bg-white">
      {/* Main Header */}
      <h2 className="text-xl font-bold mb-3 text-black border-b border-gray-100 pb-2">
        WIDE RANGE OF EYEWEAR ON EYEY!
      </h2>

      {/* Intro Text */}
      <div className="space-y-3 mb-6 text-[13px] text-gray-500 leading-relaxed font-normal">
        <p>
          Eyey is disrupting the eyewear industry. No more spending excessively to get a pair of quality eyewear. Get the best of <span className="text-blue-500 cursor-pointer">eyeglasses</span> from major brands on one platform. With offers like Blink you can Buy 1 & get 1 free. EMELuxe membership program gets you priority offers, discounts and deals.
        </p>
        <p>
          Get 14 days no questions asked refunds on every purchase! Eyey an international eyewear retailer is now 4,00,000+ customers strong and is one of the fastest growing platforms.
        </p>
      </div>

      {/* Category Sections */}
      <div className="space-y-4 mb-8">
        <div>
          <h3 className="text-base font-bold text-black mb-1">
            Eyeglasses - Browse, Click, Buy eyeglasses & frames that flatter your face and flaunt them
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Get your essential eye accessory fix with top-notch Eyeglasses range on Eyey.us. With a range of <span className="text-blue-500 cursor-pointer">eyeglasses for men</span> and <span className="text-blue-500 cursor-pointer">women</span>, get access to the most stylish range of prices starting from $0/- only. We also have different shapes like <span className="text-blue-500 cursor-pointer">Full Rim Eyeglasses</span>, <span className="text-blue-500 cursor-pointer">Half Rim Eyeglasses</span>, <span className="text-blue-500 cursor-pointer">Rimless Eyeglasses</span>, <span className="text-blue-500 cursor-pointer">Cat Eye Glasses</span> and more with top brands like Nerdlane and Mirar.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-black mb-1">
            Computer glasses - Protect your eyes from harmful blue light
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Discover <span className="text-blue-500 cursor-pointer">computer glasses</span> that protect your eyes from harmful UV rays, Blue rays and glare. Use your digital devices worry free with utmost eye comfort. Computer glasses have become a necessity for the current era.
            <br />
            Explore EMELuxe options with Priority features like access to new releases, luxury brands on discounts, offers and more. Buy 1 get 1 offer with Blink. <span className="text-blue-500 cursor-pointer">Click to explore.</span>
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-black mb-1">
            Blink - Get Savings & Rewards in a Blink
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            A subscription program that has been tailor-made for Eyey users with high "Eye-Q" - Eyey Blink Membership helps you save more & shop more. Join the clan to enjoy amazing benefits & rewards on your favourite eyewear. We pamper our loyal members with Buy 1 Get 1, free gifts, additional discounts, and special offers. From much-awaited deals, priority support to exclusive vouchers – Blink has everything & more for your eyes Ready to grab the best of the rest?
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#F9F9F9] p-4 md:p-6 rounded-sm">
        <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-tight">FAQ</h2>
        <div className="space-y-2">
          {faqQuestions.map((q, i) => (
            <div
              key={i}
              className="bg-white border-b border-gray-100 p-3 md:p-4 flex items-center justify-between shadow-sm cursor-pointer group hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-bold text-gray-800">{q}</span>
              <FiChevronRight className="text-gray-400 group-hover:text-black transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
