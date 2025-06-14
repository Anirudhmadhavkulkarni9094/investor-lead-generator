"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Request = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "completed";
  submittedAt: string;
  investorType: string[];
  geography: string[];
  industry: string[];
  stage: string[];
  investmentSize: string[];
  statusFilters: string[];
};

const dummyStats = {
  visitors: 1523,
  clicks: 437,
  submissions: 128,
};

const dummyPendingRequests: Request[] = [
  {
    id: "1",
    name: "Anirudh Kulkarni",
    email: "anirudh@example.com",
    phone: "1234567890",
    status: "pending",
    submittedAt: "2025-06-10T14:32:00Z",
    investorType: ["Accelerators & Incubators", "Venture Capital Firms"],
    geography: ["Asia-Pacific Investors", "Europe-Based Investors"],
    industry: ["Consumer & DTC Investors", "Real Estate Investors"],
    stage: ["Strategic Investors (e.g., Corporates)", "Revenue-Based Investors"],
    investmentSize: ["Small Investments (<$1M)", "Medium Investments ($1M - $10M)"],
    statusFilters: ["Passive Investors", "Active Investors"],
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "",
    status: "pending",
    submittedAt: "2025-06-11T09:15:00Z",
    investorType: ["Angel Investors", "Family Offices"],
    geography: ["US-Based Investors"],
    industry: ["SaaS Investors", "Fintech Investors"],
    stage: ["Pre-Seed & Seed Investors"],
    investmentSize: ["Large Investments (>$10M)"],
    statusFilters: ["Active Investors"],
  },
  {
    id: "5",
    name: "Emily Zhang",
    email: "emily.zhang@example.com",
    phone: "5551234567",
    status: "pending",
    submittedAt: "2025-06-12T10:00:00Z",
    investorType: ["Private Equity Firms"],
    geography: ["Europe-Based Investors"],
    industry: ["HealthTech & MedTech Investors"],
    stage: ["Series A / B Investors"],
    investmentSize: ["Medium Investments ($1M - $10M)"],
    statusFilters: ["Active Investors"],
  },
  {
    id: "6",
    name: "Carlos Rivera",
    email: "carlos.rivera@example.com",
    phone: "",
    status: "pending",
    submittedAt: "2025-06-12T11:30:00Z",
    investorType: ["Syndicates & Investment Clubs"],
    geography: ["Canada & LatAm Investors"],
    industry: ["GreenTech / Climate Investors"],
    stage: ["Growth Stage (Series C+)", "Buyout / Acquisition Focused Investors"],
    investmentSize: ["Large Investments (>$10M)"],
    statusFilters: ["Passive Investors"],
  },
  {
    id: "7",
    name: "Fatima Al-Farsi",
    email: "fatima.alfarsi@example.com",
    phone: "9876543210",
    status: "pending",
    submittedAt: "2025-06-12T12:45:00Z",
    investorType: ["Angel Investors", "Accelerators & Incubators"],
    geography: ["Middle East Investors"],
    industry: ["AI & Deep Tech Investors"],
    stage: ["Pre-Seed & Seed Investors"],
    investmentSize: ["Small Investments (<$1M)"],
    statusFilters: ["Active Investors"],
  },
  {
    id: "8",
    name: "George Lee",
    email: "george.lee@example.com",
    phone: "",
    status: "pending",
    submittedAt: "2025-06-12T13:15:00Z",
    investorType: ["Family Offices"],
    geography: ["US-Based Investors"],
    industry: ["Fintech Investors"],
    stage: ["Series A / B Investors"],
    investmentSize: ["Medium Investments ($1M - $10M)"],
    statusFilters: ["Passive Investors"],
  },
  {
    id: "9",
    name: "Hiro Tanaka",
    email: "hiro.tanaka@example.com",
    phone: "1231231234",
    status: "pending",
    submittedAt: "2025-06-12T14:00:00Z",
    investorType: ["Corporate Venture Arms"],
    geography: ["Asia-Pacific Investors"],
    industry: ["Manufacturing / Industrial Investors"],
    stage: ["Strategic Investors (e.g., Corporates)"],
    investmentSize: ["Large Investments (>$10M)"],
    statusFilters: ["Inactive Investors (Retired/Not Currently Investing)"],
  },
  {
    id: "10",
    name: "Isabella Rossi",
    email: "isabella.rossi@example.com",
    phone: "",
    status: "pending",
    submittedAt: "2025-06-12T15:20:00Z",
    investorType: ["Venture Capital Firms"],
    geography: ["Europe-Based Investors"],
    industry: ["Web3 / Crypto-Focused Investors"],
    stage: ["Series A / B Investors"],
    investmentSize: ["Medium Investments ($1M - $10M)"],
    statusFilters: ["Active Investors"],
  },
  {
    id: "11",
    name: "Julia Müller",
    email: "julia.muller@example.com",
    phone: "5559876543",
    status: "pending",
    submittedAt: "2025-06-12T16:10:00Z",
    investorType: ["Private Equity Firms", "Angel Investors"],
    geography: ["Europe-Based Investors", "US-Based Investors"],
    industry: ["Consumer & DTC Investors", "SaaS Investors"],
    stage: ["Growth Stage (Series C+)", "Revenue-Based Investors"],
    investmentSize: ["Large Investments (>$10M)", "Medium Investments ($1M - $10M)"],
    statusFilters: ["Active Investors", "Passive Investors"],
  },
  {
    id: "12",
    name: "Kofi Mensah",
    email: "kofi.mensah@example.com",
    phone: "",
    status: "pending",
    submittedAt: "2025-06-12T17:00:00Z",
    investorType: ["Syndicates & Investment Clubs"],
    geography: ["Africa-Focused Investors"],
    industry: ["GreenTech / Climate Investors"],
    stage: ["Buyout / Acquisition Focused Investors"],
    investmentSize: ["Small Investments (<$1M)"],
    statusFilters: ["Passive Investors"],
  },
];

const dummyCompletedRequests: Request[] = [
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "9876543210",
    status: "completed",
    submittedAt: "2025-06-05T16:47:00Z",
    investorType: ["Private Equity Firms", "Syndicates & Investment Clubs"],
    geography: ["Global Cross-Border Funds"],
    industry: ["AI & Deep Tech Investors", "Web3 / Crypto-Focused Investors"],
    stage: ["Series A / B Investors", "Growth Stage (Series C+)"],
    investmentSize: ["Medium Investments ($1M - $10M)"],
    statusFilters: ["Inactive Investors (Retired/Not Currently Investing)"],
  },
  {
    id: "4",
    name: "Dana White",
    email: "dana@example.com",
    phone: "",
    status: "completed",
    submittedAt: "2025-06-07T12:22:00Z",
    investorType: ["Corporate Venture Arms"],
    geography: ["Canada & LatAm Investors", "Africa-Focused Investors"],
    industry: ["HealthTech & MedTech Investors", "GreenTech / Climate Investors"],
    stage: ["Buyout / Acquisition Focused Investors"],
    investmentSize: ["Small Investments (<$1M)"],
    statusFilters: ["Passive Investors"],
  },
];
export default function DashboardPage() {
  const [modalRequest, setModalRequest] = useState<Request | null>(null);
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllCompleted, setShowAllCompleted] = useState(false);

  const pendingToShow = showAllPending ? dummyPendingRequests : dummyPendingRequests.slice(0, 5);
  const completedToShow = showAllCompleted ? dummyCompletedRequests : dummyCompletedRequests.slice(0, 5);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white px-6 py-16 mx-auto space-y-20">
      {/* Analytics */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {[
          { label: "Visitors", value: dummyStats.visitors },
          { label: "Clicks", value: dummyStats.clicks },
          { label: "Form Submissions", value: dummyStats.submissions },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 flex flex-col items-center shadow-2xl"
          >
            <p className="text-cyan-300 font-semibold text-xl mb-4">{label}</p>
            <p className="text-6xl font-extrabold drop-shadow-lg">{value}</p>
          </div>
        ))}
      </motion.section>

      {/* Pending Requests */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-4xl font-bold text-white drop-shadow-md">Pending Requests</h2>
        <RequestTable requests={pendingToShow} onRowClick={setModalRequest} />
        {dummyPendingRequests.length > 5 && (
  <Link
    href="/dashboard/pending"
    className="text-cyan-300 underline hover:text-white font-semibold"
  >
    See more
  </Link>
)}
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-4xl font-bold text-white drop-shadow-md">Recently Completed Requests</h2>
        <RequestTable requests={completedToShow} onRowClick={setModalRequest} />
        {dummyCompletedRequests.length > 5 && (
  <Link
    href="/dashboard/completed"
    className="text-cyan-300 underline hover:text-white font-semibold"
  >
    See more
  </Link>
)}
      </motion.section>

      {/* Modal */}
      {modalRequest && (
        <Modal request={modalRequest} onClose={() => setModalRequest(null)} />
      )}
    </main>
  );
}

function RequestTable({
  requests,
  onRowClick,
}: {
  requests: Request[];
  onRowClick: (request: Request) => void;
}) {
  if (!requests.length) {
    return <p className="text-blue-200 text-xl">No requests found.</p>;
  }

  return (
    <table className="min-w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-lg bg-white/10 text-white cursor-pointer">
      <thead className="bg-white/20">
        <tr>
          <th className="px-8 py-4 text-left text-cyan-300 font-semibold tracking-wide">Name</th>
          <th className="px-8 py-4 text-left text-cyan-300 font-semibold tracking-wide">Email</th>
          <th className="px-8 py-4 text-left text-cyan-300 font-semibold tracking-wide">Phone</th>
          <th className="px-8 py-4 text-left text-cyan-300 font-semibold tracking-wide">Submitted At</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r, idx) => (
          <tr
            key={r.id}
            className={`border-t border-white border-opacity-10 ${
              idx % 2 === 0 ? "bg-white/5" : ""
            } hover:bg-white/20 transition-colors duration-300 align-top`}
            onClick={() => onRowClick(r)}
          >
            <td className="px-8 py-5 font-semibold">{r.name}</td>
            <td className="px-8 py-5 text-cyan-300">{r.email}</td>
            <td className="px-8 py-5">{r.phone || "-"}</td>
            <td className="px-8 py-5">{new Date(r.submittedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Modal({ request, onClose }: { request: Request; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1e3a8a] rounded-3xl p-8 max-w-xl w-full text-white shadow-lg"
      >
        <h3 className="text-3xl font-bold mb-6">{request.name}</h3>
        <p><strong>Email:</strong> {request.email}</p>
        <p><strong>Phone:</strong> {request.phone || "-"}</p>
        <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleString()}</p>

        <div className="mt-6 space-y-4 max-h-64 overflow-auto">
          {renderCategory("Investor Type", request.investorType)}
          {renderCategory("Geography", request.geography)}
          {renderCategory("Industry", request.industry)}
          {renderCategory("Stage", request.stage)}
          {renderCategory("Investment Size", request.investmentSize)}
          {renderCategory("Status", request.statusFilters)}
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-full font-semibold transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

function renderCategory(label: string, items: string[]) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 5);

  return (
    <div>
      <p className="text-cyan-300 font-semibold mb-1">{label}:</p>
      <div className="flex flex-wrap gap-2 max-w-full mb-2">
        {displayItems.map((item, i) => (
          <span
            key={i}
            className="bg-cyan-600 bg-opacity-50 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      {items.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-cyan-300 hover:underline"
        >
          {showAll ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
