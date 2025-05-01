"use client";
import React, { useState } from "react";
import { Button, TextField, CircularProgress, MenuItem } from "@mui/material";
import axios from "axios";
import SnackBarr from "@/app/components/SnackBarr";
import { jwtDecode } from "jwt-decode";

const AdminLoginPage = () => {
  const [changeTheForm, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [snackMessage, setSnackMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const roles = [
    { label: 'राष्ट्रीय प्रमुख', value: 'rashtriyapramukh' },
    { label: 'सह प्रमुख', value: 'sahpramukh' },
    { label: 'संगठन मंत्री', value: 'sangathanmantri' },
    { label: 'सह संगठन मंत्री', value: 'sahsangathanmantri' },
    { label: 'कोषाध्यक्ष', value: 'koshadhaksh' },
    { label: 'कार्यालय सचिव', value: 'karyalaysachiv' },
    { label: 'राष्ट्रीय प्रचारक', value: 'rashtriyapracharak' },
    { label: 'सह प्रचारक', value: 'sahpracharak' },
    { label: 'मीडिया प्रभारी', value: 'mediaprabhari' },
  
    { label: 'प्रदेश प्रमुख', value: 'pradeshpramukh' },
    { label: 'प्रदेश सह प्रमुख', value: 'pradeshsahpramukh' },
    { label: 'प्रदेश संगठन मंत्री', value: 'pradeshsangathanmantri' },
    { label: 'प्रदेश सह संगठन मंत्री', value: 'pradeshsahsangathanmantri' },
    { label: 'प्रदेश कोषाध्यक्ष', value: 'pradeshkoshadhaksh' },
    { label: 'प्रदेश कार्यालय सचिव', value: 'pradeshkaryalaysachiv' },
    { label: 'प्रदेश प्रचारक', value: 'pradeshpracharak' },
    { label: 'प्रदेश सह प्रचारक', value: 'pradeshsahpracharak' },
    { label: 'प्रदेश मीडिया प्रभारी', value: 'pradeshmediaprabhari' },
  
    { label: 'जिला प्रमुख', value: 'jilapramukh' },
    { label: 'सह जिला प्रमुख', value: 'sahjilapramukh' },
    { label: 'जिला संगठन मंत्री', value: 'jilasangathanmantri' },
    { label: 'जिला सह संगठन मंत्री', value: 'jilasahsangathanmantri' },
    { label: 'जिला कोषाध्यक्ष', value: 'jilakoshadhaksh' },
    { label: 'जिला कार्यालय सचिव', value: 'jilakaryalaysachiv' },
    { label: 'जिला प्रचारक', value: 'jilapracharak' },
    { label: 'जिला सह प्रचारक', value: 'jilasahpracharak' },
    { label: 'जिला मीडिया प्रभारी', value: 'districtmediaprabhari' },
  
    { label: 'सदस्य', value: 'member' },
  ];
  

  const handleSnackBar = (message, status) => {
    setSnackMessage(message);
    setStatusCode(status);
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 3000); // Auto-close after 3 seconds
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!changeTheForm) {
        // Step 1: Login request
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/loginUser`, {
          email: formData.email,
          password: formData.password,
          role:formData.role,
          
        });
        localStorage.setItem(
          "adminDetails",
          JSON.stringify({ token: response.data.token })
        );
        handleSnackBar("Login successful!", 200);
    window.location.reload();

      } else {
        if (step === 1) {
          // Step 2: Send OTP request
          await axios.post(`${process.env.NEXT_PUBLIC_BaseUrl}/api/admin/sendotp`, {
            email: formData.email,
            role: "admin",
          });
          handleSnackBar("OTP sent successfully!", 200);
          setStep(2);
        } else if (step === 2) {
          // Step 3: Reset Password request
          await axios.post(`${process.env.NEXT_PUBLIC_BaseUrl}/api/admin/resetpassword`, {
            email: formData.email,
            role:formData.role,
            newPassword: formData.newPassword,
            otp: formData.otp,
            confirmPassword: formData.confirmPassword,
          });
          handleSnackBar("Password reset successful!", 200);
          setIsForgotPassword(false);
          setStep(1);
          setFormData({ email: "", password: "", otp: "", newPassword: "", confirmPassword: "" });
        }
      }
    } catch (error) {
      handleSnackBar(
        error.response?.data?.message || "Something went wrong.",
        400
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">

      <div className="w-96 p-6 bg-gray-900 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-400">
          {changeTheForm
            ? step === 3
              ? "Reset Password"
              : "Forgot Password"
            : "Admin Login"}
        </h2>
        <div className="mt-6 space-y-4 ">
        <div className="mb-3">
        <TextField
            name="email"
            type="email"
            label="Admin Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            InputProps={{ style: { color: "white" } }}
            className="bg-white text-white " 
          />
        </div>

{/* login roles */}
        <div>
        <div className="mb-3">
        <TextField
  select
  label="अपना पद चुने"
  name="role"
  value={formData.role}
  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
  fullWidth
  variant="outlined"
  sx={{
    backgroundColor: 'white',
    borderRadius: 1,
    '& .MuiInputBase-input': { color: 'black' },
    '& .MuiInputLabel-root': { color: 'black' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc',
    },
    '& .MuiSvgIcon-root': {
      color: 'black',
    },
  }}
>
  <MenuItem value="" disabled>
    अपना पद चुने
  </MenuItem>
  {roles.map((role) => (
    <MenuItem key={role.value} value={role.value} sx={{ color: 'black' }}>
      {role.label}
    </MenuItem>
  ))}
</TextField>

      </div>

        </div>
{/* login roles    */}
          
          {/* Show password only in login mode */}
          {!changeTheForm && (

<div className="mb-3">
            <TextField
              name="password"
              type="password"
              label="Admin Password"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{ style: { color: "white" } }}
              className="bg-gray-800 text-white"
            />
            </div>
          )}

          {/* Step 2: OTP Input */}
          {changeTheForm && step === 2 && (
            <TextField
              name="otp"
              type="text"
              label="Enter OTP"
              fullWidth
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              InputProps={{ style: { color: "white" } }}
              className="bg-gray-800 text-white"
            />
          )}

          {/* Step 3: Reset Password Inputs */}
          {changeTheForm && step === 2 && (
            <>
              <TextField
                name="newPassword"
                type="password"
                label="New Password"
                fullWidth
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                InputProps={{ style: { color: "white" } }}
                className="bg-gray-800 text-white"
              />
              <TextField
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                fullWidth
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                InputProps={{ style: { color: "white" } }}
                className="bg-gray-800 text-white"
              />
            </>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            className="mt-4 py-3 bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 
              !changeTheForm ? "Login" : 
              step === 1 ? "Send OTP" : 
              "Reset Password"}
          </Button>

          {/* Toggle between Login and Forgot Password */}
          <p
            className="mt-4 text-blue-400 hover:underline cursor-pointer"
            onClick={() => {
              setIsForgotPassword(!changeTheForm);
              setStep(1);
              setFormData({ email: "", password: "", otp: "", newPassword: "", confirmPassword: "" });
            }}
          >
            {changeTheForm ? "Back to Login" : "Forgot Password?"}
          </p>
        </div>
      </div>

      {/* Snackbar for notifications */}
      {showSnackBar && (
        <SnackBarr message={snackMessage} statusCode={statusCode} showSnackBar={showSnackBar} />
      )}
    </div>
  );
};

export default AdminLoginPage;
