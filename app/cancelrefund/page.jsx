import React from "react";
import { EnvelopeIcon, ClockIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
          Cancellation & Refund Policy
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Our policy ensures a seamless experience for our valued customers.
        </p>
        
        <div className="space-y-6">
          {/* Return & Exchange Policy */}
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="h-6 w-6 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-800">Return & Exchange</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Items can be returned or exchanged within <strong>14 days</strong> of the purchase date.
            </p>
          </div>
          
          {/* Initiate a Return */}
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-800">How to Initiate a Return</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Email us at <strong>support@syledivaa.com</strong> with your order details to start a return or exchange request.
            </p>
          </div>
          
          {/* Refund Processing Time */}
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-800">Refund Processing Time</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Refunds will be processed within <strong>7-15 days</strong> after approval of the request.
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-600 text-sm">
          For further assistance, contact us at <strong>support@syledivaa.com</strong>.
        </div>
      </div>
    </div>
  );
};

export default Page;
