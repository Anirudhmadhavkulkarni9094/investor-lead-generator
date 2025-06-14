"use client";

import { useEffect, useState } from "react";
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

export default function DashboardPage() {

  const [dummyPendingRequests, setDummyPendingRequests] = useState([]);
  const [dummyCompletedRequests, setDummyCompletedRequests] = useState([]);
  const [visitors, setVisitors] = useState();
  const [formSubmissions, setFormSubmissions] = useState();
  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched dashboard data:", data);
        setDummyPendingRequests(data.pendingRequest);
        setDummyCompletedRequests(data.completedRequest);
        setVisitors(data.pageViews);
        setFormSubmissions(data.formSubmissions);

      })
      .catch((error) => {
        console.error("Failed to fetch dashboard data:", error);
      });
  }, []);

  const [modalRequest, setModalRequest] = useState<Request | null>(null);
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllCompleted, setShowAllCompleted] = useState(false);

  const pendingToShow = showAllPending ? dummyPendingRequests : dummyPendingRequests?.slice(0, 5);
  const completedToShow = showAllCompleted ? dummyCompletedRequests : dummyCompletedRequests?.slice(0, 5);

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
          { label: "Visitors", value: visitors },
          { label: "Form Submissions", value: formSubmissions },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 flex flex-col items-center shadow-2xl"
          >
            <p className="text-cyan-300 font-semibold text-xl mb-4">{label}</p>
            Total :<p className="text-6xl font-extrabold drop-shadow-lg"> {value}</p>
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
        {
  <Link
    href="/dashboard/pending"
    className="text-cyan-300 underline hover:text-white font-semibold"
  >
    See more
  </Link>
}
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
        {requests.map((r:any, idx) => (
          <tr
            key={r._id}
            className={`border-t border-white border-opacity-10 ${
              idx % 2 === 0 ? "bg-white/5" : ""
            } hover:bg-white/20 transition-colors duration-300 align-top`}
            onClick={() => onRowClick(r)}
          >
            <td className="px-8 py-5 font-semibold">{r.name}</td>
            <td className="px-8 py-5 text-cyan-300">{r.email}</td>
            <td className="px-8 py-5">{r.phone || "-"}</td>
            <td className="px-8 py-5">{new Date(r.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Modal({ request, onClose }: { request:any; onClose: () => void }) {
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
        <p><strong>Submitted At:</strong> {new Date(request.createdAt).toLocaleString()}</p>

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
  const displayItems = showAll ? items : items?.slice(0, 5);

  return (
    <div>
      <p className="text-cyan-300 font-semibold mb-1">{label}:</p>
      <div className="flex flex-wrap gap-2 max-w-full mb-2">
        {displayItems?.map((item, i) => (
          <span
            key={i}
            className="bg-cyan-600 bg-opacity-50 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      {items?.length > 5 && (
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
