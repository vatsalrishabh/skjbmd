import React from "react";
import Donationbox from "./Donationbox";
import LeftDonationMot from "./LeftDonationMot";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";

const page = () => {
  return (
    <>
    <Navbar/>
      <div className="lg:flex justify-end bg-[#ebd7a7] p-4">
        <div className="lg:w-2/3">
          <LeftDonationMot />
        </div>
        <div className="lg:w-1/3">
          <Donationbox /> {/* Handles anonymous donations */}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default page;
