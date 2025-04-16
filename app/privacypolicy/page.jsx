import React from "react";
import { FaUserShield, FaDatabase, FaLock, FaShareAlt, FaEnvelope } from "react-icons/fa";

const page = () => {
  return (
    <div className="bg-pink-100 min-h-screen py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">Privacy Policy</h1>
        <p className="text-gray-600 text-center mb-6">Effective Date: March 2025</p>
        
        <div className="space-y-6">
          <section className="flex items-start space-x-4">
            <FaUserShield className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Information We Collect</h2>
              <p className="text-gray-600">We collect personal details such as your name, email, and phone number when you interact with our website.</p>
            </div>
          </section>
          
          <section className="flex items-start space-x-4">
            <FaDatabase className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">How We Collect Information</h2>
              <p className="text-gray-600">Information is collected via forms, cookies, and user interactions on our platform.</p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaLock className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">How We Keep Your Information Safe</h2>
              <p className="text-gray-600">We use encryption, secure servers, and access controls to protect your data.</p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaShareAlt className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Sharing With Third Parties</h2>
              <p className="text-gray-600">We do not share your personal data with third parties without your consent, except where required by law.</p>
            </div>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <FaEnvelope className="text-pink-500 text-3xl mx-auto" />
          <p className="text-gray-700 mt-2">For any queries, contact us at:</p>
          <a href="mailto:support@syledivaa.com" className="text-pink-600 font-semibold hover:underline">
            support@syledivaa.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
