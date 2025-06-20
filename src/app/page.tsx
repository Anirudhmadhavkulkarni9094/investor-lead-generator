"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { toast } from "react-toastify";

type FormGroupProps = {
  title: string;
  options: string[];
  selected: string[];
  onChange: (option: string) => void;
};

export default function Home() {
  function FormGroup({ title, options, selected, onChange }: FormGroupProps) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <p className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
          {title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-2 py-1 bg-white border rounded hover:bg-orange-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="accent-orange-500 w-4 h-4"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  const [showModal, setShowModal] = useState(false);
  const nicheSectionRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State for each filter group
  const [investorType, setInvestorType] = useState<string[]>([""]);
  const [geography, setGeography] = useState<string[]>([""]);
  const [industry, setIndustry] = useState<string[]>([""]);
  const [stage, setStage] = useState<string[]>([""]);
  const [investmentSize, setInvestmentSize] = useState<string[]>([""]);
  const [status, setStatus] = useState<string[]>([""]);
  const [additionalInfo, setAdditionalDetails] = useState("");


  const toggle =
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      current: string[]
    ) =>
    (option: string) => {
      setter(
        current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option]
      );
    };

  useEffect(() => {
    fetch("/api/track/page", { method: "POST" }).catch((err) =>
      console.warn("Page view tracking failed:", err)
    );
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fire-and-forget tracking (no await, no blocking)
    fetch("/api/track/button").catch((err) =>
      console.warn("Tracking failed:", err)
    );

    const formData = {
      name,
      email,
      phone,
      investorType,
      geography,
      industry,
      stage,
      investmentSize,
      status,
      additionalInfo
    };

    console.log("Submitting lead:", formData);
    // Basic validation

    try {
      const res = await fetch("/api/investor-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Lead submitted successfully!");
        setEmail("");
        setName("");
        setPhone("");
        setInvestorType([]);
        setGeography([]);
        setIndustry([]);
        setStage([]);
        setInvestmentSize([]);
        setStatus([]);
        setShowModal(false);
      } else {
        toast.error(
          result.error || "Lead submission failed. Please try again later."
        );
      }
    } catch (err) {
      toast.error("Lead submission failed. Please try again later.");
    }
  };

  const handleScrollToNiches = () => {
    if (nicheSectionRef.current) {
      nicheSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const investorTypes = [
    { label: "Angel Investors", icon: "🧑‍💼" },
    { label: "Family Offices", icon: "🏠" },
    { label: "Corporate Venture Arms", icon: "🏢" },
    { label: "Accelerators & Incubators", icon: "🚀" },
    { label: "Private Equity Firms", icon: "💼" },
    { label: "Venture Capital Firms", icon: "📈" },
    { label: "M&A-Focused Buyers", icon: "🤝" },
    { label: "Syndicates & Investment Clubs", icon: "👥" },
  ];
  const bouncingCircles = Array.from({ length: 6 }).map((_, i) => {
    const top = Math.random() * 80 + 10; // 10%–90%
    const left = Math.random() * 80 + 10; // 10%–90%
    const size = Math.random() * 40 + 40; // 40px–80px
    const delay = Math.random() * 2; // 0s–2s delay

    return (
      <div
        key={i}
        className="absolute bg-white rounded-full animate-bounce z-0"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          opacity: 0.1,
          mixBlendMode: "overlay",
        }}
      />
    );
  });

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
     <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white relative overflow-hidden"
>
  {/* Decorative blurred shapes */}
  <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-400/30 rounded-full blur-3xl z-0"></div>
  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-300/20 rounded-full blur-2xl z-0"></div>

  <div className="absolute top-20 left-20 animate-bounce bg-white/30 h-24 w-24 rounded-full shadow-2xl blur-lg"></div>
  <div className="absolute top-20 right-20 animate-bounce bg-white/30 h-24 w-24 rounded-full shadow-2xl blur-lg"></div>
  <div className="absolute bottom-20 left-60 animate-bounce bg-white/30 h-24 w-24 rounded-full shadow-2xl blur-lg"></div>
  <div className="absolute bottom-20 right-60 animate-bounce bg-white/30 h-24 w-24 rounded-full shadow-2xl blur-lg"></div>

  {/* Glass Card */}
  <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl px-8 py-16 max-w-3xl text-center w-full">
    <img src="/Logo.png" alt="Logo" className="h-10 mb-6 mx-auto" />

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md"
    >
      ✨ Connect with <span className="text-cyan-300">100,000+</span>{" "}
      Elite Startup Investors
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-lg mt-4 sm:mt-6 text-blue-100 max-w-xl mx-auto"
    >
      Skip the guesswork — get investor leads tailored to your startup’s niche, stage, and geography.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-blue-100 max-w-xl mx-auto backdrop-blur-md shadow-sm"
    >
      🔍 Backed by research from premium investor databases like{" "}
      <span className="text-white font-medium">PitchBook</span>,{" "}
      <span className="text-white font-medium">Preqin</span>, and other verified sources. Data is ethically gathered and fully compliant with platform terms.
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
    >
      <button
        onClick={() => setShowModal(true)}
        className="relative bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-400 hover:to-cyan-500 text-white py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <span className="z-10">Get Your curated investor leads</span>
        <ArrowRight size={18} className="z-10" />
        <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm opacity-50 hover:opacity-30 transition-all duration-300"></div>
      </button>

      <button
        onClick={handleScrollToNiches}
        type="button"
        className="relative bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-6 rounded-xl shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <Search size={18} /> View Investor Niches
      </button>
    </motion.div>
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

              <form
                onSubmit={handleSubmit}
                className="space-y-4 overflow-y-auto text-left p-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                  />
                </div>

                <div className="my-4 border-t border-gray-200" />

                <div className="space-y-6 mt-4 max-h-[50vh] overflow-y-auto pr-2">
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
                    selected={investorType}
                    onChange={toggle(setInvestorType, investorType)}
                  />

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
                    selected={geography}
                    onChange={toggle(setGeography, geography)}
                  />

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
                    selected={industry}
                    onChange={toggle(setIndustry, industry)}
                  />

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
                    selected={stage}
                    onChange={toggle(setStage, stage)}
                  />

                  <FormGroup
                    title="💰 By Investment Size"
                    options={[
                      "Small Investments (<$1M)",
                      "Medium Investments ($1M - $10M)",
                      "Large Investments (>$10M)",
                    ]}
                    selected={investmentSize}
                    onChange={toggle(setInvestmentSize, investmentSize)}
                  />

                  <FormGroup
                    title="🟢 By Investor Status"
                    options={[
                      "Active Investors",
                      "Passive Investors",
                      "Inactive Investors (Retired/Not Currently Investing)",
                    ]}
                    selected={status}
                    onChange={toggle(setStatus, status)}
                  />
                  <div className="space-y-2 p-5">

                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Additional details"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
                    ></textarea>
                    </div>
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

      <section className="px-6 sm:px-12 py-16 bg-gray-50" ref={nicheSectionRef}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-black">
          Featured Investor Types
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {investorTypes.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                {item.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

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
        name: "Vlad Rascanu",
        title: "The Friendly Brokers",
        text: "Outstanding service—fast, reliable, and truly unique. Delivered exactly what I needed with impressive speed and quality. Highly recommended!",
        image: "/vlad.jpeg", // replace with actual image path if available
        linkedin: "https://www.linkedin.com/in/vladrascanu/?originalSubdomain=ca",
      },
      {
        name: "Jake Kelder",
        title: "Independent Force",
        text: "Excellent work—delivered just what I needed. Very satisfied and will definitely use this service again. Thank you!",
        image: "/jake.jpeg", // replace with actual image path if available
        linkedin: "https://www.linkedin.com/in/jakekelder/",
      },
      {
        name: "Houston Jones",
        title: "Shadow Magic Studios",
        text: "Dunno how many more times I need to say this haha. This is my 3rd order with Mo, with a 4th one in queue. Obviously he's great to work with.",
        image: "/houstan.jpeg", // replace with actual image path if available
        linkedin: "https://www.linkedin.com/in/houstonjones3/",
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
            <a href={t.linkedin} target="_blank" rel="noopener noreferrer">
              <p className="font-semibold hover:underline">{t.name}</p>
            </a>
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
        <div onClick={() => setShowModal(true)} className="inline-block">
          <button className="bg-black hover:bg-gray-900 text-white py-3 px-6 rounded-lg">
            Get Started Now
          </button>
        </div>
      </motion.section>
    </div>
  );
}
