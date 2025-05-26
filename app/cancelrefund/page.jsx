import React from "react";
import {
  EnvelopeIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";

const Page = () => {
  return (
 <>
  <Navbar/>
   <div className="min-h-screen p-6 flex justify-center" style={{ backgroundColor: "#ebd7a7" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: "#870407" }}>
          रद्दीकरण और वापसी नीति
        </h1>
        <p className="text-center mb-6" style={{ color: "#870407" }}>
          यह नीति गलती से की गई दान की प्रक्रिया को दर्शाती है।
        </p>

        <div className="space-y-6">
          {/* Donation Refund Policy */}
          <div className="p-4 bg-[#f8f1db] rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="h-6 w-6" style={{ color: "#870407" }} />
              <h2 className="text-lg font-semibold" style={{ color: "#870407" }}>
                दान वापसी की पात्रता
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              <strong>skjbmd.org</strong> को किया गया दान यदि धार्मिक या परोपकारी गतिविधियों में उपयोग नहीं हुआ है,
              तो वापसी के लिए अनुरोध किया जा सकता है।
            </p>
          </div>

          {/* How to Request a Refund */}
          <div className="p-4 bg-[#f8f1db] rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6" style={{ color: "#870407" }} />
              <h2 className="text-lg font-semibold" style={{ color: "#870407" }}>
                वापसी के लिए कैसे अनुरोध करें
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              वापसी के लिए कृपया हमें WhatsApp के माध्यम से <strong>80526 88885</strong> पर या
              <strong> support@skjbmd.org </strong> पर ईमेल करके अपने दान का विवरण भेजें।
            </p>
          </div>

          {/* Refund Timeline */}
          <div className="p-4 bg-[#f8f1db] rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6" style={{ color: "#870407" }} />
              <h2 className="text-lg font-semibold" style={{ color: "#870407" }}>
                वापसी की समय-सीमा
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              स्वीकृत वापसी अनुरोधों की प्रक्रिया <strong>7–15 कार्यदिवसों</strong> के भीतर की जाएगी।
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          किसी भी सहायता के लिए कृपया WhatsApp पर संपर्क करें:{" "}
          <strong>80526 88885</strong> या ईमेल करें:{" "}
          <strong>support@skjbmd.org</strong>
        </div>
      </div>
    </div>
  <Footer/>
 </>
  );
};

export default Page;
