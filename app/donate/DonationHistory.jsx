"use client";
import React, { useState } from "react";
import { Card, Divider, Typography, Grid, Tooltip, IconButton } from "@mui/material";
import {
  AccountCircle,
  CreditCard,
  LocationOn,
  Business,
  AccessTime,
  CheckCircle,
  Logout,
} from "@mui/icons-material";
import { BreadCrumb } from "../DoctorDashboard/BreadCrumb";
import DonationModal from "./DonationModal";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const DonationHistory = ({ donorDetails, transactions }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const logout = () => {
    console.log("Logout clicked");
    localStorage.clear();
    location.reload();
  };

  const handleCopy = () => {
    if (donorDetails?.userId) {
      navigator.clipboard.writeText(donorDetails.userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate total successful and unsuccessful donations

  const totalSuccessfulDonation = transactions
    ?.filter(txn => txn.status === "success")
    .reduce((acc, txn) => acc + txn.amount, 0) || 0;

  const totalUnsuccessfulDonation = transactions
    ?.filter(txn => txn.status === "failed")
    .reduce((acc, txn) => acc + txn.amount, 0) || 0;

    
  const totalPendingDonation = transactions
  ?.filter(txn => txn.status === "Pending")
  .reduce((acc, txn) => acc + txn.amount, 0) || 0;

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-5">
        <BreadCrumb
          first="Patient Dashboard"
          second="Donation Page"
          firstLink="/donorlogin"
          secondLink="/donorlogin"
        />
      </div>

      {/* Logout Button */}
      <div className="flex justify-end">
        <button className="bg-custom-maroon rounded-lg p-2 text-white" onClick={logout}>
          <Logout /> Logout
        </button>
      </div>

      {/* Donation Modal */}
      <DonationModal open={open} handleClose={() => setOpen(false)} />

      {/* Main Layout */}
      <div className="flex w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
        <Grid container spacing={6}>
          {/* Donor Details Section */}
          <Grid item xs={12} md={4}>
            <Card className="p-6 bg-white shadow-xl rounded-lg">
              <Typography variant="h5" className="text-maroon font-bold mb-4 flex items-center">
                <AccountCircle sx={{ fontSize: 28, color: "#8f1b1b", marginRight: 1 }} />
                Donor Details{" "}
                <div className="p-2 ml-16" onClick={() => setOpen(true)}>
                  <EditIcon sx={{ color: "maroon" }} />
                </div>
              </Typography>
              <Divider className="mb-4" />

              <div className="mb-4">
                <Typography variant="h6" className="text-maroon font-semibold">
                  {donorDetails?.name || "N/A"}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  <CreditCard sx={{ fontSize: 20, color: "#8f1b1b", marginRight: 1 }} />
                  Pan Card - {donorDetails?.pancard || "N/A"}
                </Typography>
              </div>

              <div className="mb-4">
                <Typography variant="body2" className="text-gray-600">
                  <AccessTime sx={{ fontSize: 20, color: "#8f1b1b", marginRight: 1 }} />
                  Age: <span className="font-semibold">{donorDetails?.age || "N/A"} yrs</span>
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  <Business sx={{ fontSize: 20, color: "#8f1b1b", marginRight: 1 }} />
                  Gender: <span className="font-semibold">{donorDetails?.gender || "N/A"}</span>
                </Typography>
              </div>

              <div className="mb-4">
                <Typography variant="body2" className="text-gray-600">
                  <LocationOn sx={{ fontSize: 20, color: "#8f1b1b", marginRight: 1 }} />
                  Address: <span className="font-semibold">{donorDetails?.address?.city || "N/A"},{" "}{donorDetails?.address?.country || "N/A"}</span>
                </Typography>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <Typography variant="body2" className="text-gray-600">
                  <CreditCard sx={{ fontSize: 20, color: "#8f1b1b", marginRight: 1 }} />
                  Donor ID: <span className="font-semibold">{donorDetails?.userId || "N/A"}</span>
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon sx={{ color: "#8f1b1b" }} />
                  </IconButton>
                </Tooltip>
              </div>
            </Card>
          </Grid>

          {/* Donation Transactions Section */}
          <Grid item xs={12} md={8}>
            <Card className="p-6 bg-white shadow-xl rounded-lg">
              <Typography variant="h5" className="text-maroon font-bold mb-4 flex items-center">
                <CheckCircle sx={{ fontSize: 28, color: "#8f1b1b", marginRight: 1 }} />
                Donation Transactions
              </Typography>
              <Divider className="mb-4" />

              <div className="mb-4">
                <Typography variant="h6" className="text-gray-700 font-semibold">
                  Total Successful Donations:{" "}
                  <span className="text-green-600">₹ {totalSuccessfulDonation}</span>
                </Typography>
                <Typography variant="h6" className="text-gray-700 font-semibold">
                  Total Unsuccessful Donations:{" "}
                  <span className="text-red-600">₹ {totalUnsuccessfulDonation}</span>
                </Typography>
                <Typography variant="h6" className="text-gray-700 font-semibold">
                  Total Pending Donations:{" "}
                  <span className="text-yellow-600">₹ {totalPendingDonation}</span>
                </Typography>
              </div>

              {/* Transaction List */}
              <div className="space-y-6 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                {transactions && transactions.length > 0 ? (
                  transactions.map((txn, index) => (
                    <div key={index} className="transaction-item bg-gray-50 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl">
                      <div className="flex justify-between mb-2">
                        <Typography variant="body1" className="text-maroon font-semibold">
                          Amount: ₹{txn.amount}
                        </Typography>
                        <Typography variant="body2" className={`font-semibold ${txn.status === "success" ? "text-green-600" : "text-red-600"}`}>
                          {txn.status === "success" ? "Successful" : "Failed"}
                        </Typography>
                      </div>
                      <Typography variant="body2" className="text-gray-600">
                        Transaction ID: {txn.transactionId || "N/A"}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Date: {new Date(txn.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" className="text-gray-600">No transactions found.</Typography>
                )}
              </div>
            </Card>
          </Grid>
          
        </Grid>
      </div>
    </>
  );
};

export default DonationHistory;
