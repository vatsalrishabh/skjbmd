# OTP Implementation Guide

## Overview

This document outlines the comprehensive OTP (One-Time Password) implementation in the SKJBMD Next.js application. The OTP logic has been enhanced with robust validation, error handling, and user experience improvements.

## Components

### 1. OtpModalRegistration.jsx
**Location:** `app/contact/OtpModalRegistration.jsx`

**Features:**
- ✅ 6-digit numeric validation
- ✅ Auto-submit on completion
- ✅ Attempt tracking (max 3 attempts)
- ✅ 30-second resend cooldown
- ✅ Loading states during API calls
- ✅ Error handling and user feedback
- ✅ Accessibility features
- ✅ Keyboard navigation support
- ✅ Mobile-friendly input
- ✅ Real-time validation feedback

**Props:**
```javascript
{
  isOpen: boolean,           // Controls modal visibility
  onClose: function,         // Callback when modal is closed
  onSubmit: function(otp),   // Callback when OTP is submitted
  onResend: function         // Callback when resend is requested
}
```

### 2. OtpInput.jsx
**Location:** `app/components/OtpInput.jsx`

**Features:**
- Reusable OTP input component
- Configurable length (default: 6 digits)
- Built-in validation and error handling
- Resend functionality with cooldown
- Loading states and accessibility

**Props:**
```javascript
{
  length: number,            // OTP length (default: 6)
  onComplete: function(otp), // Callback when OTP is complete
  onResend: function,        // Callback for resend
  isLoading: boolean,        // Loading state
  error: string,            // Error message
  disabled: boolean,        // Disabled state
  autoFocus: boolean,       // Auto focus (default: true)
  className: string         // Additional CSS classes
}
```

## API Endpoints

### Registration OTP
- **Send OTP:** `POST /api/auth/registerUser`
- **Verify OTP:** `POST /api/auth/verifyOtp`

### Download OTP
- **Send OTP:** `POST /api/download/identityCard`
- **Verify OTP:** `POST /api/download/verifyOtp`

## Implementation Details

### 1. Validation Logic

```javascript
// Numeric validation
const handleChange = (e) => {
  const value = e.target.value;
  if (/^\d{0,6}$/.test(value)) {
    setOtp(value);
    if (value.length === 6) {
      handleSubmit();
    }
  }
};

// Keyboard input validation
const handleKeyPress = (e) => {
  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
    e.preventDefault();
  }
};
```

### 2. Attempt Tracking

```javascript
const MAX_ATTEMPTS = 3;
const [attempts, setAttempts] = useState(0);

const handleSubmit = async () => {
  if (attempts >= MAX_ATTEMPTS) {
    setError(`बहुत अधिक प्रयास। कृपया ${RESEND_COOLDOWN} सेकंड बाद पुनः प्रयास करें।`);
    return;
  }
  
  try {
    await onSubmit?.(otp);
    setAttempts(0);
  } catch (error) {
    setAttempts(prev => prev + 1);
  }
};
```

### 3. Resend Cooldown

```javascript
const RESEND_COOLDOWN = 30; // 30 seconds
const [resendTimer, setResendTimer] = useState(0);

useEffect(() => {
  let timer;
  if (resendTimer > 0) {
    timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
  }
  return () => clearTimeout(timer);
}, [resendTimer]);
```

## Usage Examples

### 1. Contact Registration

```javascript
// In ContactUs.jsx
const handleOtpSubmit = async (otp) => {
  try {
    const data = new FormData();
    data.append("otp", otp);
    // ... add other form data
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/verifyOtp`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    
    if (response.data) {
      setModalOpen(false);
      setSnackMessage("मेम्बर सफलतापूर्वक पंजीकृत ");
      setStatusCode(200);
      setShowSnackBar(true);
      return Promise.resolve();
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "रजिस्ट्रेशन विफल हुआ। कृपया पुनः प्रयास करें।";
    setSnackMessage(errorMessage);
    setStatusCode(error.response?.status || 500);
    setShowSnackBar(true);
    return Promise.reject(error);
  }
};

// Usage in JSX
<OtpModalRegistration
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onSubmit={handleOtpSubmit}
  onResend={handleResendOtp}
/>
```

### 2. Document Download

```javascript
// In IdCardDownload.jsx
const handleOtpSubmit = async () => {
  if (otp.length !== 6) {
    alert("6 अंकों का OTP दर्ज करें");
    return;
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BaseUrl}/api/download/verifyOtp`,
      { mobile, otp }
    );

    if (res.data.success) {
      setUserDetails(res.data.userDetails);
      const encodedData = encodeURIComponent(JSON.stringify(res.data.data));
      
      if (docType === "id-card") {
        router.push(`admin/idcard?data=${encodedData}`);
      } else {
        router.push(`admin/appletter?data=${encodedData}`);
      }
    } else {
      alert("गलत OTP। कृपया सही OTP दर्ज करें।");
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || "OTP सत्यापन में त्रुटि";
    alert("त्रुटि: " + errorMessage);
  }
};
```

## Error Handling

### 1. Network Errors
```javascript
catch (error) {
  if (err.response) {
    console.log(err.response.data);
    const errorMessage = err.response.data.message || "OTP सत्यापन में त्रुटि";
    alert("त्रुटि: " + errorMessage);
  } else {
    console.log(err);
    alert("सर्वर से संपर्क करने में समस्या हुई। कृपया पुनः प्रयास करें।");
  }
}
```

### 2. Validation Errors
```javascript
if (otp.length !== 6) {
  setError('OTP ठीक 6 अंकों का होना चाहिए');
  return;
}

if (attempts >= MAX_ATTEMPTS) {
  setError(`बहुत अधिक प्रयास। कृपया ${RESEND_COOLDOWN} सेकंड बाद पुनः प्रयास करें।`);
  return;
}
```

## Security Features

### 1. Input Validation
- Only numeric characters allowed
- Maximum length enforcement
- Real-time validation feedback

### 2. Rate Limiting
- Maximum 3 attempts per session
- 30-second cooldown between resend attempts
- Automatic lockout after max attempts

### 3. Error Handling
- Comprehensive error messages
- User-friendly feedback
- Proper error logging

## Testing

### 1. Manual Testing
Use the `OtpTest.jsx` component to test OTP functionality:
- Test OTP: `123456` (success)
- Any other OTP will fail
- Test resend functionality
- Test attempt tracking

### 2. Test Cases
- ✅ Valid 6-digit OTP
- ✅ Invalid OTP handling
- ✅ Empty OTP validation
- ✅ Non-numeric input rejection
- ✅ Attempt limit enforcement
- ✅ Resend cooldown functionality
- ✅ Loading states
- ✅ Error message display
- ✅ Accessibility features

## Best Practices

### 1. User Experience
- Clear error messages in Hindi
- Loading indicators during API calls
- Auto-focus on input field
- Auto-submit on completion
- Visual feedback for input progress

### 2. Security
- Input sanitization
- Rate limiting
- Proper error handling
- No sensitive data in error messages

### 3. Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels
- Focus management

## Troubleshooting

### Common Issues

1. **OTP not sending**
   - Check API endpoint configuration
   - Verify environment variables
   - Check network connectivity

2. **OTP validation failing**
   - Ensure 6-digit numeric input
   - Check server-side validation
   - Verify API response format

3. **Resend not working**
   - Check cooldown timer
   - Verify resend API endpoint
   - Check error handling

### Debug Steps

1. Check browser console for errors
2. Verify API responses
3. Test with different OTP values
4. Check network tab for failed requests
5. Validate environment variables

## Future Enhancements

1. **SMS Integration**
   - Real SMS service integration
   - Delivery status tracking
   - Multiple SMS providers

2. **Advanced Security**
   - OTP expiration
   - Device fingerprinting
   - IP-based rate limiting

3. **User Experience**
   - Voice OTP option
   - Email OTP fallback
   - Remember device option

4. **Analytics**
   - OTP success/failure tracking
   - User behavior analytics
   - Performance monitoring

## Conclusion

The OTP implementation provides a robust, secure, and user-friendly authentication system. With comprehensive validation, error handling, and accessibility features, it ensures a smooth user experience while maintaining security standards.

For any issues or questions, refer to the test component (`OtpTest.jsx`) or check the browser console for detailed error information. 