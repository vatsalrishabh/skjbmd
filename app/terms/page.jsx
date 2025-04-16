import React from "react";
import { FaExclamationTriangle, FaUserShield, FaClipboardCheck, FaEnvelope } from "react-icons/fa";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
      
      <p className="text-gray-600 text-sm text-center mb-4">Effective Date: March 29, 2025</p>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 hover:bg-gray-100 rounded-lg transition">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
          <div>
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p className="text-gray-600 text-sm">
              We are not responsible for any damages arising from the use of our website.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 p-4 hover:bg-gray-100 rounded-lg transition">
          <FaUserShield className="text-blue-500 text-2xl" />
          <div>
            <h2 className="text-xl font-semibold">Rules of Conduct</h2>
            <p className="text-gray-600 text-sm">
              Users must comply with all applicable laws and regulations while using our services.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 p-4 hover:bg-gray-100 rounded-lg transition">
          <FaClipboardCheck className="text-green-500 text-2xl" />
          <div>
            <h2 className="text-xl font-semibold">User Restrictions</h2>
            <p className="text-gray-600 text-sm">
              Users cannot use our platform for illegal activities, harassment, or spam.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-700 text-xl" />
          <p className="text-gray-600">Contact us at: <span className="font-semibold">support@example.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default page;
