"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const FormGroup = ({ title, options }: { title: string; options: string[] }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <p className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 px-2 py-1 bg-white border rounded hover:bg-orange-50 transition-colors"
          >
            <input
              type="checkbox"
              value={opt}
              className="accent-orange-500 w-4 h-4"
            />
            <span className="text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};


  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen px-8 py-24 flex flex-col justify-center items-center text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold max-w-3xl">
          Discover and connect with 100,000+ niche startup investors
        </h1>
        <p className="text-lg mt-4 max-w-xl">
          Get curated investor leads based on your startup’s stage, niche, and
          region.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg"
            >
              Get 100 Free Investor Leads
            </button>
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg">
            View Investor Niches
          </button>
        </div>
      </motion.section>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
          <motion.div
            className="bg-white text-black max-w-3xl w-full rounded-2xl p-6 overflow-y-auto max-h-[90vh] relative shadow-2xl border border-gray-200"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors duration-200 shadow-md border border-gray-200"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              Get Your Curated Investor List
            </h2>

            <form className="space-y-4 overflow-y-auto text-left p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone (Optional)"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                />
              </div>

              <div className="my-4 border-t border-gray-200" />

              {/* Grouped Filters */}
              <div className="space-y-6 mt-4 max-h-[50vh] overflow-y-auto pr-2">
                {/* Investor Type */}
                <FormGroup
                  title="🔹 By Investor Type"
                  options={[
                    "Angel Investors",
                    "Family Offices",
                    "Corporate Venture Arms",
                    "Accelerators & Incubators",
                    "Private Equity Firms",
                    "Venture Capital Firms",
                    "M&A-Focused Buyers",
                    "Syndicates & Investment Clubs",
                  ]}
                />

                {/* Geography */}
                <FormGroup
                  title="🌍 By Geography"
                  options={[
                    "US-Based Investors",
                    "Europe-Based Investors",
                    "Middle East Investors",
                    "Asia-Pacific Investors",
                    "Canada & LatAm Investors",
                    "Africa-Focused Investors",
                    "Global Cross-Border Funds",
                  ]}
                />

                {/* Industry */}
                <FormGroup
                  title="💼 By Industry Focus"
                  options={[
                    "SaaS Investors",
                    "Fintech Investors",
                    "HealthTech & MedTech Investors",
                    "Consumer & DTC Investors",
                    "AI & Deep Tech Investors",
                    "Real Estate Investors",
                    "GreenTech / Climate Investors",
                    "Web3 / Crypto-Focused Investors",
                    "Manufacturing / Industrial Investors",
                  ]}
                />

                {/* Stage */}
                <FormGroup
                  title="📊 By Stage & Focus"
                  options={[
                    "Pre-Seed & Seed Investors",
                    "Series A / B Investors",
                    "Growth Stage (Series C+)",
                    "Revenue-Based Investors",
                    "Buyout / Acquisition Focused Investors",
                    "Strategic Investors (e.g., Corporates)",
                  ]}
                />

                {/* Investment Size */}
                <FormGroup
                  title="💰 By Investment Size"
                  options={[
                    "Small Investments (<$1M)",
                    "Medium Investments ($1M - $10M)",
                    "Large Investments (>$10M)",
                  ]}
                />

                {/* Status */}
                <FormGroup
                  title="🟢 By Investor Status"
                  options={[
                    "Active Investors",
                    "Passive Investors",
                    "Inactive Investors (Retired/Not Currently Investing)",
                  ]}
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-150 shadow-lg text-lg tracking-wide active:scale-95"
              >
                Get My Investor Leads
              </button>
            </form>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trusted Logos */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white text-black py-10 px-6"
      >
        <p className="text-center font-medium mb-6">
          Our data is trusted by teams at:
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <img src="/logos/microsoft.svg" className="h-8" alt="Microsoft" />
          <img
            src="/logos/ycombinator.svg"
            className="h-8"
            alt="Y Combinator"
          />
          <img src="/logos/sequoiacap.svg" className="h-8" alt="Sequoia" />
          <img src="/logos/techstars.svg" className="h-8" alt="Techstars" />
          <img src="/logos/googlevc.svg" className="h-8" alt="GV" />
        </div>
      </motion.section>

      {/* How it Works */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-gray-900 text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {[
            {
              title: "1. Choose Your Niche",
              desc: "Select the type of investors you’re looking for – SaaS, Fintech, Healthtech, etc.",
            },
            {
              title: "2. Fill a Short Form",
              desc: "Tell us about your startup, stage, and preferred investor region.",
            },
            {
              title: "3. Get Sample Leads",
              desc: "Download 100 high-quality investor contacts. We follow up with custom matches.",
            },
          ].map(({ title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white text-black py-16 px-6 text-center"
      >
        <h2 className="text-3xl font-semibold mb-8">Why Founders Trust Us</h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {[
            {
              title: "Verified & Accurate",
              desc: "All leads are manually researched and verified via LinkedIn and Crunchbase.",
            },
            {
              title: "Niche-Specific",
              desc: "We segment investors by niche and stage, so you connect with the right match.",
            },
            {
              title: "Manual Follow-up",
              desc: "Your form data is used to tailor follow-up emails, not just dumped in a DB.",
            },
          ].map(({ title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-100 p-6 rounded-xl"
            >
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white text-black"
      >
        <h2 className="text-3xl font-semibold text-center mb-10">
          What Founders Are Saying
        </h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Ravi Mehta",
              title: "Founder, SaaSly",
              text: "I got in touch with 3 active SaaS investors within 48 hours of downloading the leads. This platform is a game changer.",
              image: "/testimonials/ravi.jpg",
            },
            {
              name: "Sara Kapoor",
              title: "CEO, FinEdge",
              text: "The investors were incredibly relevant to our space. It’s like you already knew who we wanted to talk to!",
              image: "/testimonials/sara.jpg",
            },
            {
              name: "Arjun Desai",
              title: "Co-Founder, HealthLink",
              text: "This saved us months of cold outreach. We got personalized follow-ups and even closed one angel within a week.",
              image: "/testimonials/arjun.jpg",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-100 p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.title}</p>
                </div>
              </div>
              <p className="text-gray-800 italic">“{t.text}”</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-900 text-white py-16 px-6"
      >
        <h2 className="text-3xl font-semibold text-center mb-8">
          How We Compare
        </h2>
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Feature</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Our Platform
                </th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Other Services
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lead Source", "Aggregated from 50+ tools", "Scraped/spammed"],
                ["Verification", "Manually checked", "Unverified"],
                ["Niche Matching", "Yes", "No"],
                ["Follow-up", "Personalized", "None"],
              ].map(([feature, ours, others], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-800" : ""}>
                  <td className="py-2 px-4">{feature}</td>
                  <td className="py-2 px-4">{ours}</td>
                  <td className="py-2 px-4">{others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 px-6 text-center bg-orange-500 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Discover Your Next Investor?
        </h2>
        <p className="mb-6">
          Submit your startup details and download 100 free investor leads
          instantly.
        </p>
        <Link href="/form">
          <button className="bg-black hover:bg-gray-900 text-white py-3 px-6 rounded-lg">
            Get Started Now
          </button>
        </Link>
      </motion.section>
    </div>
  );
}
