'use client';
import React, { useEffect, useState } from 'react';

type Request = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  investorType: string[];
  geography: string[];
  industry: string[];
  stage: string[];
  investmentSize: string[];
  status: string[];
  requestCompleted: boolean;
  additionalInfo: string;
  createdAt: string;
};

const ITEMS_PER_PAGE = 10;

export default function DashboardRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completingId, setCompletingId] = useState<string | null>(null);

  const cleanArray = (arr: string[]) =>
    arr.filter((item) => item && !item.toLowerCase().includes('anirudh'));

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setRequests(data.pendingRequest || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch requests.');
        setLoading(false);
      });
  }, []);

  const filteredRequests = requests.filter((r) => !r.requestCompleted);
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  async function handleComplete(id: string) {
    setCompletingId(id);
    try {
      const res = await fetch('/api/dashboard', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to complete');
      // Remove completed request from list
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      alert('Failed to mark complete');
    } finally {
      setCompletingId(null);
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Investor Requests</h1>

      <table className="min-w-[1200px] w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Investor Type</th>
            <th className="p-3">Geography</th>
            <th className="p-3">Industry</th>
            <th className="p-3">Stage</th>
            <th className="p-3">Investment Size</th>
            <th className="p-3">Status</th>
            <th className="p-3">Additional Info</th>
            <th className="p-3">Submitted</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRequests.map((req) => (
            <tr key={req._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{req.name}</td>
              <td className="p-3">{req.email}</td>
              <td className="p-3">{req.phone || 'N/A'}</td>
              <td className="p-3">{cleanArray(req.investorType).join(', ')}</td>
              <td className="p-3">{cleanArray(req.geography).join(', ')}</td>
              <td className="p-3">{cleanArray(req.industry).join(', ')}</td>
              <td className="p-3">{cleanArray(req.stage).join(', ')}</td>
              <td className="p-3">{cleanArray(req.investmentSize).join(', ')}</td>
              <td className="p-3">{cleanArray(req.status).join(', ')}</td>
              <td className="p-3">{req.additionalInfo || 'N/A'}</td>
              <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
              <td className="p-3">
                <button
                  disabled={completingId === req._id}
                  onClick={() => handleComplete(req._id)}
                  className={`px-3 py-1 rounded text-white ${
                    completingId === req._id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {completingId === req._id ? 'Completing...' : 'Complete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
