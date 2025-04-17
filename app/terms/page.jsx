import React from "react";
import {
  FaExclamationTriangle,
  FaUserShield,
  FaClipboardCheck,
  FaEnvelope,
} from "react-icons/fa";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg mt-10" style={{ backgroundColor: "#ebd7a7" }}>
      <h1 className="text-3xl font-bold text-center mb-4" style={{ color: "#870407" }}>
        Terms & Conditions
      </h1>

      <p className="text-sm text-center mb-6" style={{ color: "#870407" }}>
        Effective Date: March 29, 2025
      </p>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaExclamationTriangle className="text-yellow-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              Use of Platform
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              This platform is intended solely for spiritual and religious engagement. Kindly refrain from using it for any unrelated or inappropriate purposes.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaUserShield className="text-blue-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              Respectful Conduct
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              We expect all visitors and users to maintain mutual respect and humility in their interactions, aligned with our religious and moral values.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaClipboardCheck className="text-green-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              Donation Responsibility
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              Donations made are used for religious and community service activities. Kindly ensure correctness before donating. Refunds are only possible if funds haven’t yet been utilized.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300">
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-700 text-xl" />
          <p className="text-gray-700 text-sm">
            For queries, contact us at:{" "}
            <span className="font-semibold">support@skjbmd.org</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
