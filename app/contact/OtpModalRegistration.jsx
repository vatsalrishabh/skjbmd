"use client";
import React, { useState, useEffect, useRef } from 'react';

const OtpModalRegistration = ({ isOpen, onClose, onSubmit, onResend }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);

  const MAX_ATTEMPTS = 3;
  const RESEND_COOLDOWN = 30; // 30 seconds

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError('');
      
      // Auto-submit when 6 digits are entered
      if (value.length === 6) {
        handleSubmit();
      }
    } else {
      setError('केवल 6 अंकों का सकारात्मक OTP दर्ज करें');
    }
  };

  const handleKeyPress = (e) => {
    // Allow only numeric input
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError('OTP ठीक 6 अंकों का होना चाहिए');
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setError(`बहुत अधिक प्रयास। कृपया ${RESEND_COOLDOWN} सेकंड बाद पुनः प्रयास करें।`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSubmit?.(otp);
      setOtp('');
      setAttempts(0);
    } catch (error) {
      setAttempts(prev => prev + 1);
      const remainingAttempts = MAX_ATTEMPTS - attempts - 1;
      
      if (remainingAttempts > 0) {
        setError(`गलत OTP। ${remainingAttempts} प्रयास शेष हैं।`);
      } else {
        setError('बहुत अधिक गलत प्रयास। कृपया नया OTP प्राप्त करें।');
        setResendTimer(RESEND_COOLDOWN);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await onResend?.();
      setResendTimer(RESEND_COOLDOWN);
      setAttempts(0);
      setOtp('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      setError('OTP भेजने में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOtp('');
    setError('');
    setAttempts(0);
    setResendTimer(0);
    setIsLoading(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#ebd7a7] rounded-lg p-6 w-[90%] max-w-md shadow-lg border-2 border-[#870407]">
        <h2 className="text-2xl font-bold text-[#870407] mb-4 text-center">
          कृपया 6 अंको का OTP दर्ज करें
        </h2>
        
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={otp}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="6 अंकों का OTP"
            className="w-full p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#870407] text-center text-lg tracking-widest"
            maxLength={6}
            disabled={isLoading}
            autoComplete="one-time-code"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        )}

        {attempts > 0 && (
          <p className="text-orange-600 text-sm mt-1 text-center">
            प्रयास: {attempts}/{MAX_ATTEMPTS}
          </p>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading || otp.length !== 6}
            className="px-4 py-2 bg-[#870407] text-white rounded hover:bg-[#6e0303] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'सत्यापित कर रहे हैं...' : 'सबमिट करें'}
          </button>
          
          <button
            onClick={handleResend}
            disabled={isLoading || resendTimer > 0}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            {resendTimer > 0 
              ? `${resendTimer} सेकंड बाद पुनः भेजें` 
              : 'पुनः OTP भेजें'
            }
          </button>
          
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            रद्द करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModalRegistration;
