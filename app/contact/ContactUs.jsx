'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import krishnaImage from "../../public/assets/krishna.png";

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="bg-[#ebd7a7] min-h-screen flex flex-col lg:flex-row items-center p-6 gap-6">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2 max-w-2xl">
        <h2 className="text-2xl font-bold text-[#870407] mb-6 text-center">
          श्री कृष्ण जन्म भूमि मुक्ति दल - हमसे जुड़ें
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="referenceId" placeholder="रिफरेंस आईडी" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="text" name="fullName" placeholder="पूरा नाम" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="text" name="fatherOrHusband" placeholder="पिता / पति का नाम" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="number" name="age" placeholder="उम्र" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="text" name="aadhaarNumber" placeholder="आधार नंबर" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="tel" name="contactNumber" placeholder="संपर्क नंबर" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="email" name="email" placeholder="ई-मेल एड्रेस" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <input type="text" name="state" placeholder="कृपया प्रदेश दर्ज करें" className="p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100" onChange={handleChange} required />
          <textarea name="address" placeholder="पूरा पता" className="col-span-2 p-3 border rounded-lg text-black placeholder-gray-700 bg-gray-100 resize-none" onChange={handleChange} required></textarea>
          <input type="file" name="profilePhoto" accept="image/*" className="col-span-2 p-3 border rounded-lg bg-gray-100" onChange={handleFileChange} required />
          <button type="submit" className="col-span-2 bg-[#fe6601] text-white p-3 rounded-lg text-lg font-semibold hover:bg-[#870407] transition">
            पंजीकरण करें
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          पहले से पंजीकृत हैं? <Link href="/login" className="text-[#870407] font-bold">लॉगिन करें</Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <Image src={krishnaImage} alt="श्री कृष्ण" width={400} height={400} className="rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default ContactUs;
