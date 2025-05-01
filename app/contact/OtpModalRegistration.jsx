"use client";
import React, { useState } from 'react';

const OtpModalRegistration = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError('');
    } else {
      setError('केवल 6 अंकों का सकारात्मक OTP दर्ज करें');
    }
  };

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError('OTP ठीक 6 अंकों का होना चाहिए');
    } else {
      onSubmit?.(otp);
      setOtp('');
    //   onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-[#ebd7a7] rounded-lg p-6 w-[90%] max-w-md shadow-lg border-2 border-[#870407]">
        <h2 className="text-2xl font-bold text-[#870407] mb-4 text-center">
          कृपया 6 अंको का OTP दर्ज करें
        </h2>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="6 अंकों का OTP"
          className="w-full p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#870407]"
          maxLength={6}
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            रद्द करें
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#870407] text-white rounded hover:bg-[#6e0303]"
          >
            सबमिट करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModalRegistration;
