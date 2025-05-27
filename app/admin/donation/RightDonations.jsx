"use client";
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React, { useState, useEffect } from 'react';
import { TextField } from "@mui/material";

const RightDonations = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data using the new schema
  useEffect(() => {
    const sampleData = [
      {
        _id: "1",
        donorName: "राहुल शर्मा",
        donorEmail: "rahul@example.com",
        donationAmount: 500,
        donationDate: new Date(),
        donationMessage: "सभी के कल्याण के लिए",
        paymentStatus: "completed",
        anonymous: false,
        receiptSent: true,
        razorpayId: "razorpay_123",
        transactionId: "txn_123",
        userId: "user_001"
      },
      {
        _id: "2",
        donorName: "सीमा वर्मा",
        donorEmail: "seema@example.com",
        donationAmount: 0,
        donationDate: new Date(),
        donationMessage: "",
        paymentStatus: "pending",
        anonymous: true,
        receiptSent: false,
        razorpayId: "razorpay_456",
        transactionId: "txn_456",
        userId: "user_002"
      }
    ];

    setDonations(sampleData);
  }, []);

  const filteredDonations = donations.filter((donation) =>
    donation.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donorEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:w-[84%] w-full absolute right-0 min-h-screen bg-gray-100 p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <AdminBreadCrumbs
          links={[{ label: "Admin", href: "/admin" }]}
          name="डोनेशन सूची"
        />
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <TextField
          fullWidth
          variant="outlined"
          label="नाम या ईमेल से खोजें"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: "#ffffff",
              color: "#1f2937",
              borderRadius: "8px"
            }
          }}
          InputLabelProps={{
            style: { color: "#374151" }
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-300">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-800 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3">डोनर नाम</th>
              <th className="px-4 py-3">ईमेल</th>
              <th className="px-4 py-3">राशि (₹)</th>
              <th className="px-4 py-3">स्थिति</th>
              <th className="px-4 py-3">तारीख</th>
              <th className="px-4 py-3">अनन्य?</th>
              <th className="px-4 py-3">रसीद भेजी?</th>
              <th className="px-4 py-3">Razorpay ID</th>
              <th className="px-4 py-3">Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={9}>
                  कोई डेटा नहीं मिला
                </td>
              </tr>
            ) : (
              filteredDonations.map((donation) => (
                <tr key={donation._id} className="border-b hover:bg-gray-100 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium">{donation.anonymous ? "गोपनीय" : donation.donorName}</td>
                  <td className="px-4 py-3">{donation.donorEmail}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">₹{donation.donationAmount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${donation.paymentStatus === "completed" ? "bg-green-600 text-white" :
                        donation.paymentStatus === "pending" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"}`}>
                      {donation.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(donation.donationDate).toLocaleString("hi-IN")}</td>
                  <td className="px-4 py-3">{donation.anonymous ? "हाँ" : "नहीं"}</td>
                  <td className="px-4 py-3">{donation.receiptSent ? "हाँ" : "नहीं"}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{donation.razorpayId}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{donation.transactionId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RightDonations;
