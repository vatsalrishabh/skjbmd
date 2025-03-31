"use client";
import React, { useEffect, useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import axios from "axios";


const Donationbox = ({donorDetails}) => {
  const [donationType, setDonationType] = useState("Give Once");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [formData, setFormData] = useState({
    userId:donorDetails?.userId,
    name: donorDetails?.name,
    dob: "",
    email: donorDetails?.email,
    mobile: donorDetails?.mobile,
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    pancard: donorDetails?.pancard,
  });
  
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    dob: "",
    pancard: "",
  });
// console.log(donorDetails.userId)
useEffect(()=>{
  const loadUserDetails = () => {
    const storedUserDetails = localStorage.getItem("donorDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      // console.log(storedUserDetails);
     setLoggedInUser(userDetails); // Set the logged-in user with the JWT
    }
  };
  loadUserDetails();

// coming from props donorDetails
 if (donorDetails) {
      setFormData({
        userId: donorDetails.userId || "",
        name: donorDetails.name || "",
        dob: "",
        email: donorDetails.email || "",
        mobile: donorDetails.mobile || "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        pancard: donorDetails.pancard || "",
      });
    }
},[donorDetails]);

  const handleTypeChange = (type) => setDonationType(type);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount if a predefined amount is selected
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name (at least 4 characters)
    if (formData.name.trim().length < 4) {
      newErrors.name = "Name must be at least 4 characters.";
    }

    // Validate mobile (Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    // Validate PAN card (exactly 10 characters)
    const pancardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pancardRegex.test(formData.pancard)) {
      newErrors.pancard = "Please enter a valid PAN card number.";
    }

    // Validate date of birth (18 years or older)
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    if (age < 18) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const donationDetails = {
      donationType,
      amount: customAmount || selectedAmount,
      ...formData,
    };
    console.log("Donation Details:", donationDetails);

    try {
      // Make sure to await the API call
      const response = await axios.post(`/api/donations/donateNow`, donationDetails);

      // const order = response.data; 
     
      const options = {
        key: 'rzp_test_l0gnUnaG8U4VmM',
        amount: (customAmount || selectedAmount) * 100,
        currency: "INR",
        name: 'Dklean HealthCare',
        description: 'Test Transaction',
        order_id: response.data.id,  // Ensure `order.id` exists
        callback_url: `/api/donations/paymentSuccess`,
        prefill: {
          name: formData?.name,
          email: formData?.email,
          contact: formData.mobile,
        },
        theme: {
          color: '#a32121',
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(`/api/donations/verifyPayment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.status === 'ok') {
              window.location.href = '/donate'; // take to donate page
            } else {
              console.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(response.data)
      console.error("Server Error:", error);
    }
  }
};

  

  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (formData.pincode.length === 6) { // Ensure pincode is fully entered
        try {
          const response = await axios.get(
            `http://www.postalpincode.in/api/pincode/${formData.pincode}`
          );
          const { PostOffice, Status } = response.data;
          if (PostOffice.length > 0) {
            const { District: city, State: state, Country: country } = PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city,
              state,
              country,
            }));
          } else {
            console.error("Invalid Pincode or No Data Found");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }
    };
    fetchLocationDetails();
  }, [formData.pincode]);

  



  return (
    <div className="w-full bg-[#ebd7a7] py-10">
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
      <form onSubmit={handleSubmit}>
        {/* Donation Type Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {["एक बार दान दें", "मासिक दान दें"].map((type) => (
            <div
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`cursor-pointer px-6 py-3 rounded-xl text-center font-semibold transition ${
                donationType === type
                  ? "bg-[#870407] text-white"
                  : "bg-white border border-[#870407] text-[#870407] hover:bg-[#870407] hover:text-white"
              }`}
            >
              {type}
            </div>
          ))}
        </div>

        {/* Donation Amount Selection */}
        <div className="text-center mb-4 text-[#870407] font-semibold">
          <HttpsIcon sx={{ color: "#fe6601" }} /> दान की राशि चुनें
        </div>
        <div className="flex justify-center gap-4 mb-6">
          {(donationType === "एक बार दान दें" ? [1200, 2400, 3600, 5000] : [2000, 4000, 6000, 8000]).map((amount) => (
            <div
              key={amount}
              onClick={() => handleAmountClick(amount)}
              className={`cursor-pointer px-6 py-3 rounded-xl text-center font-semibold transition ${
                selectedAmount === amount
                  ? "bg-[#870407] text-white"
                  : "bg-white border border-[#870407] text-[#870407] hover:bg-[#870407] hover:text-white"
              }`}
            >
              ₹ {amount}
            </div>
          ))}
        </div>

        <div className="text-center mb-4 text-[#870407] font-semibold">
          <VolunteerActivismIcon sx={{ color: "#fe6601" }} /> "दानं हि परमं धर्मं यद् दत्तं तत् पुनर् भवेत्।"
          ➝ दान ही परम धर्म है, जो दिया जाता है वह कई गुना होकर पुनः प्राप्त होता है।
        </div>

        {/* Custom Amount Input */}
        <div className="flex justify-center mb-6">
          <input
            type="number"
            placeholder="₹ Other Amount"
            value={customAmount || selectedAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount("");
            }}
            className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-60 focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500"
            required
          />
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500"
            required
          />
        </div>

        {/* Email & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500"
            required
          />
          <input
            type="number"
            name="mobile"
            placeholder="Mobile *"
            value={formData.mobile}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500"
            required
          />
        </div>

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          className="px-4 py-3 mb-6 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500"
          required
        />

        {/* Pincode, City, State */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500" />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500" required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="px-4 py-3 rounded-xl border border-[#870407] text-[#870407] bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#870407] placeholder-gray-500" required />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mb-6">
          <button type="submit" className="px-6 py-3 bg-[#870407] text-white rounded-xl font-semibold w-full sm:w-60">
            Donate {loggedInUser.isloggedIn ? " " : "Anonymously"}
          </button>
        </div>
      </form>
    </div>
  </div>

  );
};

export default Donationbox;
