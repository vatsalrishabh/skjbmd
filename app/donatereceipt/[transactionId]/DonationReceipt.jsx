"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "next/navigation";

import logo from "../../../public/assets/skjmbb.jpg";

const DonationReceipt = () => {
  const params = useParams();
  const transactionId = params.transactionId;

  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      setLoading(true);
      try {
        const storedDetails = JSON.parse(localStorage.getItem("donorDetails"));
        let res;
        if (transactionId) {
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_BaseUrl}/api/donations/donationReceipt/${transactionId}`
          );
          setDonors([res.data]);
          console.log(res.data);
        } else {
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_BaseUrl}/api/donations/donationReceipt`,
            {
              params: { email: storedDetails?.email },
            }
          );
          setDonors(res.data);
          console.log(res.data);
        }
      } catch (err) {
        console.error("Error fetching receipt:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, [transactionId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

const handlePrint = () => {
  const printWindow = window.open("", "_blank", "width=800,height=600");
  if (!printWindow) {
    alert("Popup blocked! Please allow popups for this website.");
    return;
  }
  const content = document.getElementById("printable-receipt").innerHTML;

  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Donation Receipt</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
          body {
            font-family: 'Roboto', sans-serif;
            background: #ebd7a7;
            margin: 0;
            padding: 40px;
            color: #333;
          }
          .receipt-card {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgb(135 4 7 / 0.3);
            border: 2px solid #870407;
            padding: 30px 40px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header img {
            max-height: 60px;
            margin-bottom: 15px;
          }
          .title {
            font-size: 28px;
            font-weight: 700;
            color: #870407;
            margin: 0;
            letter-spacing: 1.2px;
          }
          .details {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 20px;
          }
          .details div {
            margin-bottom: 12px;
          }
          .label {
            font-weight: 700;
            color: #870407;
          }
          .status {
            display: inline-flex;
            align-items: center;
            font-weight: 700;
            margin-top: 15px;
            font-size: 18px;
          }
          .status-paid {
            color: #008000;
          }
          .status-pending {
            color: #fe6601;
          }
          .footer {
            font-size: 13px;
            font-style: italic;
            color: #555;
            text-align: center;
            margin-top: 40px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
          }
          /* Icon styles in print */
          svg {
            fill: #870407;
            margin-right: 8px;
          }
        </style>
      </head>
      <body>
        <div class="receipt-card">
          <div class="header">
       
            <h1 class="title">Donation Receipt</h1>
          </div>
          <div class="details">
            ${content}
          </div>
          <p class="footer">
            This is a computer-generated receipt. Thank you for your donation!
          </p>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();

  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
  };
};



  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-500">Loading receipt...</div>
      ) : (
        <>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 rounded-lg bg-[#870407] text-white hover:bg-[#fe6601] transition"
            >
              View / Print Receipt
            </button>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh] border border-[#870407]">
                <div id="printable-receipt">
                  {donors.map((donor, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border-2 border-[#870407] p-6 shadow-md mb-6"
                    >
                      <div className="flex justify-center mb-4">
                        <Image
                          src={logo}
                          alt="NGO Logo"
                          height={64}
                          width={150}
                          priority
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-center text-[#870407] mb-4">
                        Donation Receipt
                      </h2>

                      <div
                        className="flex flex-col gap-3 text-gray-800"
                        style={{ backgroundColor: "#ebd7a7", padding: "10px", borderRadius: "8px" }}
                      >
                        <div>
                          <FaUser className="inline mr-2 text-[#870407]" />
                          <span className="font-semibold">Name:</span> {donor.donorName}
                        </div>
                        <div>
                          <FaEnvelope className="inline mr-2 text-[#870407]" />
                          <span className="font-semibold">Email:</span> {donor.donorEmail}
                        </div>
                        <div>
                          <FaMoneyBillWave className="inline mr-2 text-[#870407]" />
                          <span className="font-semibold">Amount:</span> ₹{donor.donationAmount}
                        </div>
                        <div>
                          <FaCalendarAlt className="inline mr-2 text-[#870407]" />
                          <span className="font-semibold">Date:</span> {formatDate(donor.donationDate)}
                        </div>
                        <div>
                          <FaReceipt className="inline mr-2 text-[#870407]" />
                          <span className="font-semibold">Transaction ID:</span> {donor.transactionId}
                        </div>
                          <div>
                          <FaReceipt className="inline mr-2 text-[#870407]" />
                          <span className="font-semibold">Pan Card:</span> {donor.pancard}
                        </div>
                        <div>
                          {donor.paymentStatus === "pending" ? (
                            <FaTimesCircle className="inline mr-2 text-[#fe6601]" />
                          ) : (
                            <FaCheckCircle className="inline mr-2 text-[#870407]" />
                          )}
                          <span className="font-semibold">Status:</span> {donor.paymentStatus}
                        </div>
                        {donor.donationMessage && (
                          <div>
                            <span className="font-semibold">Message:</span> {donor.donationMessage}
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-center mt-6 italic text-gray-500">
                        This is a computer-generated receipt. Thank you for your donation!
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-[#870407] text-white rounded-lg hover:bg-[#fe6601] transition"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DonationReceipt;
