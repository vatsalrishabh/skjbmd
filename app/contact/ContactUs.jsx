"use client";
import React, { useEffect, useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import Image from "next/image";
import axios from "axios";
import OtpModalRegistration from "./OtpModalRegistration";
import SnackBarr from "../components/SnackBarr";

const ContactUs = () => {

  const [showSnackBar, setShowSnackBar] = useState(false);
   const [snackMessage, setSnackMessage] = useState("");
    const [statusCode, setStatusCode] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    fullName: "",
    fatherOrHusband: "",
    age: "",
    gender: "",
    aadhaarNumber: "",
    contactNumber: "",
    email: "",
    state: "",
    address: "",
    profilePhoto: null,
    district: "",
    streetAddress: "",
    pincode: "",
    fullAddress: "",
  });
  const [modalOpen, setModalOpen] = useState(false); //Modal OTP
  const [showPassword, setShowPassword] = useState(false);
  const [pincode, setPincode] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [showIndiaAddress, setShowIndiaAddress] = useState(false);

  // Update handler

  // Pincode logic
  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (pincode.length === 6) {
        try {
          const res = await axios.get(
            `https://pinlookup.in/api/pincode?pincode=${pincode}`
          );
          const data = res.data?.data;
          if (data) {
            setFormData((prev) => ({
              ...prev,
              district: data.district_name,
              state: data.state_name,
            }));
          }
        } catch (error) {
          console.error("Error fetching pincode data:", error);
        }
      }
    };

    fetchPincodeDetails();
  }, [pincode]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setShowIndiaAddress(country === "India");
  };

  // a function which when place in an element
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //keep the old data and add/update new data
  };
  //a function to change the formData add new entried without affectin old ones

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
    console.log(e.target.files)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for contact number (India - 10 digits)
    const contactNumberRegex = /^[6-9]\d{9}$/;
    if (!contactNumberRegex.test(formData.contactNumber)) {
      alert("कृपया सही 10 अंकों का संपर्क नंबर दर्ज करें।");
      return;
    }

    // Validation for Aadhaar number (12 digits)
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(formData.aadhaarNumber)) {
      alert("कृपया सही आधार नंबर दर्ज करें (12 अंक)।");
      return;
    }

    // Validation for email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("कृपया सही ईमेल पता दर्ज करें।");
      return;
    }

    // Validation for India-specific address fields if selected
    if (selectedCountry === "India") {
      if (
        !formData.state ||
        !formData.district ||
        !formData.streetAddress ||
        !formData.pincode
      ) {
        alert(
          "कृपया सभी पते के विवरण भरें (राज्य, जिला, सड़क का पता, पिनकोड)।"
        );
        return;
      }

      // Validate pincode (Indian format: 6 digits)
      const pincodeRegex = /^[1-9][0-9]{5}$/;
      if (!pincodeRegex.test(formData.pincode)) {
        alert("कृपया सही पिनकोड दर्ज करें।");
        return;
      }
    }

    // Validation for full address if a country other than India is selected
    if (
      selectedCountry &&
      selectedCountry !== "India" &&
      !formData.fullAddress
    ) {
      alert("कृपया अपना पूरा पता दर्ज करें।");
      return;
    }
    try {
      // console.log("formData object:", formData);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          data.append(key, value);
        }
      });

      console.log("FormData contents:");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/registerUser`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        console.log(response.data);
        alert("फॉर्म सफलतापूर्वक सबमिट हो गया है।");
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Server error:", error);
      setSnackMessage("रजिस्ट्रेशन विफल हुआ। कृपया पुनः प्रयास करें।");
      setStatusCode(error.response?.status || 500);
      setShowSnackBar(true);
    }
    // console.log("Form Data Submitted:", formData);
  };
  const handleOtpSubmit = async (otp) => {
    console.log("OTP received:", otp);
    try {
      const data = new FormData();
      data.append("otp", otp);
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          data.append(key, value);
        }
      });
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/verifyOtp`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.status === 201) {
        setModalOpen(false); // close OTP modal
        window.alert("✅ मेम्बर सफलतापूर्वक पंजीकृत");
      }
    } catch (error) {
      console.error("Server error:", error);
  
      if (error.response) {
        // Backend returned error
        const { status, data } = error.response;
  
        if (status === 400) {
          window.alert("❌ ओटीपी अमान्य है या समाप्त हो गया है।");
        } else if (status === 409) {
          window.alert("⚠️ यह ईमेल पहले से पंजीकृत है।");
        } else if (status === 500) {
          window.alert("⚠️ सर्वर में समस्या है। कृपया पुनः प्रयास करें।");
        } else {
          window.alert(data.message || "अज्ञात त्रुटि हुई।");
        }
      } else {
        // No response (network error, timeout etc.)
        window.alert("🌐 नेटवर्क त्रुटि। कृपया इंटरनेट कनेक्शन जांचें।");
      }
    }
  };
  

  

  return (
    <div className="bg-[#ebd7a7] min-h-screen flex flex-col lg:flex-row items-center p-6 gap-6">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2 max-w-2xl">
        <h2 className="text-2xl font-bold text-[#870407] mb-6 text-center">
          श्री कृष्ण जन्म भूमि मुक्ति दल - हमसे जुड़ें
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="पूरा नाम"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="fatherOrHusband"
              placeholder="पिता / पति का नाम"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="age"
              placeholder="उम्र"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="contactNumber"
              placeholder="संपर्क नंबर"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              pattern="[6-9]{1}[0-9]{9}"
              inputMode="numeric"
              maxLength={10}
              required
            />
          </div>

          {/* third Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="ई-मेल एड्रेस"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />

            {/* the hidden password  */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="py-2.5 sm:py-3 ps-4 pe-10 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 end-0 flex items-center px-3 text-gray-400 hover:text-blue-600 dark:text-neutral-600 dark:hover:text-blue-500"
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
            {/* the hidden password ends  */}
          </div>

          {/* fourth Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="आधार नंबर"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              pattern="\d{12}"
              inputMode="numeric"
              maxLength={12}
              required
            />
            <div>
              <select
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
              >
                <option value="">--कृपया देश चुनें--</option>
                <option value="India">भारत</option>
                <option value="USA">अमेरिका</option>
                <option value="UK">यूनाइटेड किंगडम</option>
                <option value="Australia">ऑस्ट्रेलिया</option>
                <option value="Canada">कनाडा</option>
                <option value="Germany">जर्मनी</option>
                <option value="France">फ्रांस</option>
                <option value="Japan">जापान</option>
                <option value="Russia">रूस</option>
                <option value="China">चीन</option>
              </select>
            </div>
          </div>

          {/* Address and Profile Photo */}
          {/* Fields for India */}
          {showIndiaAddress && (
            <div>
              <label className="block text-black font-semibold mb-2">पता</label>

              <input
                type="text"
                name="pincode"
                placeholder="पिनकोड"
                className="p-3 mb-4 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,6}$/.test(val)) {
                    setPincode(val);
                    setFormData((prev) => ({ ...prev, pincode: val }));
                  }
                }}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="state"
                  placeholder="राज्य"
                  value={formData.state}
                  className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="district"
                  placeholder="जिला"
                  value={formData.district}
                  className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="सड़क का पता"
                  className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
                  onChange={handleChange}
                  required
                />
                <select
                  name="gender"
                  className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
                  onChange={handleChange}
                  required
                >
                  <option value="">लिंग चुनें</option>
                  <option value="male">पुरुष</option>
                  <option value="female">महिला</option>
                  <option value="other">अन्य</option>
                </select>
              </div>
            </div>
          )}

          {/* Fields for other countries */}
          {selectedCountry && selectedCountry !== "India" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="fullAddress"
                placeholder="अपना पूरा पता"
                className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
                onChange={handleChange}
                required
              />
              <select
                name="gender"
                className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
                onChange={handleChange}
                required
              >
                <option value="">लिंग चुनें</option>
                <option value="male">पुरुष</option>
                <option value="female">महिला</option>
                <option value="other">अन्य</option>
              </select>
            </div>
          )}

        <div className="mb-4">
      <label htmlFor="profilePhoto" className="block mb-2 text-sm font-medium text-black">
        प्रोफ़ाइल फोटो <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name="profilePhoto"
        id="profilePhoto"
        required
        accept="image/*"
        className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
        onChange={handleFileChange}
    
      />
      {formData?.profilePhoto && (
        <div className="mt-3 w-24 h-24 relative border rounded overflow-hidden">
          <Image
            src={formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : ""}
            alt="Preview"
            fill
            className="object-cover rounded"
          />
        </div>
      )}
    </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#870407] text-white w-full py-3 rounded-lg mt-6 hover:bg-[#a81b1b]"
          >
            सबमिट करें
          </button>
        </form>
      </div>
      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center mt-6 lg:mt-0">
        <Image
          src="/assets/krishna.png"
          alt="श्री कृष्ण"
          className="rounded-lg shadow-lg"
          width={400}
          height={400}
        />
      </div>
      {/* OTP MODAL */}
      <OtpModalRegistration
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleOtpSubmit}
      />
      {/* OTP Modal */}

      {/* the snackbar code  */}
      <SnackBarr
        message={snackMessage}
        statusCode={statusCode}
        showSnackBar={showSnackBar}
      />

    </div>
  );
};

export default ContactUs;
