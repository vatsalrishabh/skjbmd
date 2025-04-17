import React from "react";
import {
  EnvelopeIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <div className="min-h-screen p-6 flex justify-center" style={{ backgroundColor: "#ebd7a7" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: "#870407" }}>
          Cancellation & Refund Policy
        </h1>
        <p className="text-center mb-6" style={{ color: "#870407" }}>
          This policy outlines our approach to handling mistaken donations.
        </p>

        <div className="space-y-6">
          {/* Donation Refund Policy */}
          <div className="p-4 bg-[#f8f1db] rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="h-6 w-6" style={{ color: "#870407" }} />
              <h2 className="text-lg font-semibold" style={{ color: "#870407" }}>
                Donation Refund Eligibility
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              Donations made to <strong>skjbmd.org</strong> can be refunded upon request if the amount has not yet been utilized for religious or charitable activities.
            </p>
          </div>

          {/* How to Request a Refund */}
          <div className="p-4 bg-[#f8f1db] rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6" style={{ color: "#870407" }} />
              <h2 className="text-lg font-semibold" style={{ color: "#870407" }}>
                How to Request a Refund
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              To request a refund, please contact us via WhatsApp at{" "}
              <strong>80526 88885</strong> or email us at{" "}
              <strong>support@skjbmd.org</strong> with your donation details.
            </p>
          </div>

          {/* Refund Timeline */}
          <div className="p-4 bg-[#f8f1db] rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6" style={{ color: "#870407" }} />
              <h2 className="text-lg font-semibold" style={{ color: "#870407" }}>
                Refund Timeline
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              Approved refund requests will be processed within{" "}
              <strong>7–15 business days</strong>.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          For any assistance, please reach out via WhatsApp:{" "}
          <strong>80526 88885</strong> or email:{" "}
          <strong>support@skjbmd.org</strong>
        </div>
      </div>
    </div>
  );
};

export default Page;
