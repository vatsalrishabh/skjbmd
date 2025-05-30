"use client";

import React from "react";
import { useParams } from "next/navigation";
import DonationReceipt from "./DonationReceipt";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Navbar/Footer";

const Page = () => {
  const params = useParams();
  const transactionId = params.transactionId;

  console.log(transactionId);

  return (
    <div>
        <Navbar/>
      <DonationReceipt transactionId={transactionId} />
      <Footer/>
    </div>
  );
};

export default Page;
