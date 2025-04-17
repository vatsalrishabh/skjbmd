'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    referenceId: '',
    fullName: '',
    fatherOrHusband: '',
    age: '',
    aadhaarNumber: '',
    contactNumber: '',
    email: '',
    state: '',
    address: '',
    profilePhoto: null,
    district: '',
    streetAddress: '',
    pincode: '',
    fullAddress: '',
  });

  const [selectedCountry, setSelectedCountry] = useState('');
  const [showIndiaAddress, setShowIndiaAddress] = useState(false);

  // Update handler


  // Pincode logic
  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (formData.pincode.length === 6) {
        try {
          const res = await axios.get(`https://pinlookup.in/api/pincode?pincode=${formData.pincode}`);
          const data = res.data?.data;
          console.log(res.data)
          if (data) {
            setFormData((prev) => ({
              ...prev,
              district: data.district_name,
              state: data.state_name,
            }));
          }
        } catch (error) {
          console.error('Error fetching pincode data:', error);
        }
      }
    };

    fetchPincodeDetails();
  }, [formData.pincode]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setShowIndiaAddress(country === 'India');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for contact number (India - 10 digits)
    const contactNumberRegex = /^[6-9]\d{9}$/;
    if (!contactNumberRegex.test(formData.contactNumber)) {
      alert('कृपया सही 10 अंकों का संपर्क नंबर दर्ज करें।');
      return;
    }

    // Validation for Aadhaar number (12 digits)
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(formData.aadhaarNumber)) {
      alert('कृपया सही आधार नंबर दर्ज करें (12 अंक)।');
      return;
    }

    // Validation for email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('कृपया सही ईमेल पता दर्ज करें।');
      return;
    }

    // Validation for India-specific address fields if selected
    if (selectedCountry === 'India') {
      if (!formData.state || !formData.district || !formData.streetAddress || !formData.pincode) {
        alert('कृपया सभी पते के विवरण भरें (राज्य, जिला, सड़क का पता, पिनकोड)।');
        return;
      }

      // Validate pincode (Indian format: 6 digits)
      const pincodeRegex = /^[1-9][0-9]{5}$/;
      if (!pincodeRegex.test(formData.pincode)) {
        alert('कृपया सही पिनकोड दर्ज करें।');
        return;
      }
    }

    // Validation for full address if a country other than India is selected
    if (selectedCountry && selectedCountry !== 'India' && !formData.fullAddress) {
      alert('कृपया अपना पूरा पता दर्ज करें।');
      return;
    }

    console.log('Form Data Submitted:', formData);
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
              name="referenceId"
              placeholder="रिफरेंस आईडी"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="पूरा नाम"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fatherOrHusband"
              placeholder="पिता / पति का नाम"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="उम्र"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="आधार नंबर"
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
              required
            />
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="ई-मेल एड्रेस"
              className="p-3 sm:mb-2 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="state"
              placeholder="राज्य"
              className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="district"
              placeholder="जिला"
              className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="streetAddress"
            placeholder="सड़क का पता"
            className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
            onChange={handleChange}
            required
          />
         <input
  type="text"
  name="pincode"
  placeholder="पिनकोड"
  className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
  value={formData.pincode} // <-- controlled input
  onChange={(e) => {
    // Only allow numeric values up to 6 digits
    const val = e.target.value;
    if (/^\d{0,6}$/.test(val)) {
      handleChange(e);
    }
  }}
  required
/>

        </div>
      )}

      {/* Fields for other countries */}
      {selectedCountry && selectedCountry !== 'India' && (
        <div>
          <label className="block text-black font-semibold mb-2">Apna Pura Pata</label>
          <input
            type="text"
            name="fullAddress"
            placeholder="अपना पूरा पता"
            className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
            onChange={handleChange}
            required
          />
        </div>
      )}
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 w-full"
            onChange={handleFileChange}
          />

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
    </div>
  );
};

export default ContactUs;
