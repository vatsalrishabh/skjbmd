"use client";
import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ 
  length = 6, 
  onComplete, 
  onResend, 
  isLoading = false,
  error = '',
  disabled = false,
  autoFocus = true,
  className = ''
}) => {
  const [otp, setOtp] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRef = useRef(null);

  const MAX_ATTEMPTS = 3;
  const RESEND_COOLDOWN = 30; // 30 seconds

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to specified length
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      
      // Auto-submit when complete
      if (value.length === length) {
        handleSubmit(value);
      }
    }
  };

  const handleKeyPress = (e) => {
    // Allow only numeric input
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (otpValue = otp) => {
    if (otpValue.length !== length) {
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      return;
    }

    try {
      await onComplete?.(otpValue);
      setOtp('');
      setAttempts(0);
    } catch (error) {
      setAttempts(prev => prev + 1);
      const remainingAttempts = MAX_ATTEMPTS - attempts - 1;
      
      if (remainingAttempts <= 0) {
        setResendTimer(RESEND_COOLDOWN);
      }
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    try {
      await onResend?.();
      setResendTimer(RESEND_COOLDOWN);
      setAttempts(0);
      setOtp('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  const getInputClassName = () => {
    let baseClass = "w-full p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#870407] text-center text-lg tracking-widest";
    
    if (disabled) {
      baseClass += " opacity-50 cursor-not-allowed";
    }
    
    if (error) {
      baseClass += " border-red-500 focus:ring-red-500";
    }
    
    return `${baseClass} ${className}`;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={otp}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={`${length} अंकों का OTP`}
          className={getInputClassName()}
          maxLength={length}
          disabled={disabled || isLoading}
          autoComplete="one-time-code"
        />
        
        {otp.length > 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            {otp.length}/{length}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      {attempts > 0 && (
        <p className="text-orange-600 text-sm text-center">
          प्रयास: {attempts}/{MAX_ATTEMPTS}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading || otp.length !== length || disabled}
          className="px-4 py-2 bg-[#870407] text-white rounded hover:bg-[#6e0303] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'सत्यापित कर रहे हैं...' : 'सबमिट करें'}
        </button>
        
        {onResend && (
          <button
            onClick={handleResend}
            disabled={isLoading || resendTimer > 0 || disabled}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            {resendTimer > 0 
              ? `${resendTimer} सेकंड बाद पुनः भेजें` 
              : 'पुनः OTP भेजें'
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpInput; 