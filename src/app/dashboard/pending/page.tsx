'use client';
import React, { useState } from 'react';
import data from "./dummy_requests_25.json";

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
  additionalMessage?: string;
};

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const [requests, setRequests] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(requests.filter(r => r.status === "pending").length / ITEMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = requests
    .filter(r => r.status === "pending")
    .slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleComplete = async (id: string) => {
    // Simulate API call
    try {
      // Example: await fetch(`/api/complete/${id}`, { method: "POST" });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

      // Update state to mark as completed
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "completed" } : r))
      );
      alert("Request completed successfully");
    } catch (error) {
      console.error("Failed to complete request", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Submitted At</th>
              <th className="border px-4 py-2">Investor Type</th>
              <th className="border px-4 py-2">Geography</th>
              <th className="border px-4 py-2">Industry</th>
              <th className="border px-4 py-2">Stage</th>
              <th className="border px-4 py-2">Investment Size</th>
              <th className="border px-4 py-2">Status Filters</th>
              <th className="border px-4 py-2">Additional Message</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{request.name}</td>
                <td className="border px-4 py-2">{request.email}</td>
                <td className="border px-4 py-2">{request.phone || '-'}</td>
                <td className="border px-4 py-2">
                  {new Date(request.submittedAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{request.investorType.join(', ')}</td>
                <td className="border px-4 py-2">{request.geography.join(', ')}</td>
                <td className="border px-4 py-2">{request.industry.join(', ')}</td>
                <td className="border px-4 py-2">{request.stage.join(', ')}</td>
                <td className="border px-4 py-2">{request.investmentSize.join(', ')}</td>
                <td className="border px-4 py-2">{request.statusFilters.join(', ')}</td>
                <td className="border px-4 py-2">{request.additionalMessage || '-'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleComplete(request.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
