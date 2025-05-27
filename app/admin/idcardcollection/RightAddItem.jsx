"use client";
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React, { useState, useEffect } from 'react';
import { TextField } from "@mui/material";
import axios from 'axios';

const RightAddItem = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch payments (with or without search)
  const getAllIdcardPayment = async (searchValue = "") => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/admin/getAllIdCardPayment`;

      if (searchValue) {
        if (/^\d{12,}$/.test(searchValue)) {
          url += `?userId=${searchValue}`;
        } else if (/^\d{10}$/.test(searchValue)) {
          url += `?contact=${searchValue}`;
        }
      }

      const response = await axios.get(url);
      setPayments(response.data.data || []);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial load
  useEffect(() => {
    getAllIdcardPayment();
  }, []);

  // Run search after user stops typing (debounce-like behavior)
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      getAllIdcardPayment(searchTerm.trim());
    }, 500); // delay to reduce API calls

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <div className="lg:w-[83%] w-full absolute right-0 min-h-screen bg-gray-100 p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <AdminBreadCrumbs
          links={[{ label: "Admin", href: "/admin" }]}
          name="आईडी कार्ड भुगतान सूची"
        />
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <TextField
          fullWidth
          variant="outlined"
          label="नाम या संपर्क नंबर से खोजें"
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
              <th className="px-4 py-3">नाम</th>
              <th className="px-4 py-3">संपर्क</th>
              <th className="px-4 py-3">राशि</th>
              <th className="px-4 py-3">स्थिति</th>
              <th className="px-4 py-3">तारीख</th>
              <th className="px-4 py-3">ऑर्डर ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={6}>
                  कोई डेटा नहीं मिला
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b hover:bg-gray-100 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium">{payment?.userName || "N/A"}</td>
                  <td className="px-4 py-3">{payment.contact}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">₹{payment.amountPaid}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${payment.paymentStatus === "success"
                          ? "bg-green-600 text-white"
                          : payment.paymentStatus === "pending"
                          ? "bg-yellow-600 text-white"
                          : "bg-red-600 text-white"}
                      `}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(payment.createdAt).toLocaleString("hi-IN")}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">{payment.razorOrderId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RightAddItem;
