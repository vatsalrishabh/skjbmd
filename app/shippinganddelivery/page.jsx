import React from "react";
import { FaTruck, FaHandsHelping, FaEnvelope } from "react-icons/fa";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg mt-10" style={{ backgroundColor: "#ebd7a7" }}>
      <h1 className="text-3xl font-bold text-center mb-4" style={{ color: "#870407" }}>
        Shipping Policy
      </h1>

      <p className="text-sm text-center mb-6" style={{ color: "#870407" }}>
        Effective Date: March 29, 2025
      </p>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaTruck className="text-pink-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              No Physical Shipments
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              As a religious and charitable organization, we do not offer or deliver any physical products or goods. Hence, no shipping is applicable.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaHandsHelping className="text-green-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              Donations Only
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              All contributions made through this website are considered as voluntary donations and are used exclusively for religious and community service purposes.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaEnvelope className="text-gray-700 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              Questions?
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              For any concerns or clarifications, please feel free to contact us at <span className="font-semibold">support@skjbmd.org</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
