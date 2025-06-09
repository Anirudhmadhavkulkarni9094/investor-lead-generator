// components/OTPVerification.tsx

'use client';

import { useState } from "react";

export default function OTPVerification({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    setLoading(false);

    if (res.ok) {
      onVerified();
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <p className="text-gray-600">
        Enter the OTP sent to <span className="font-semibold">{email}</span>
      </p>
      <input
        type="text"
        required
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}
