'use client';

import React from "react";
import Footer from "../components/Navbar/Footer";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import vrindavanImage from "../../public/assets/vrindavan.jpg";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full">
        {/* Google Map Section */}
        <div className="relative w-full h-[80vh] flex justify-center items-center p-4 pb-0">
          <iframe
            title="श्री कृष्ण जन्मभूमि मुक्ति दल स्थान"
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60064.380720918685!2d77.57404763117799!3d27.56152375980409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736fcb5e9a2309%3A0x9868374c5faaf3ce!2sVrindavan%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1743416834160!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute top-6 left-6 text-white bg-black bg-opacity-50 p-3 rounded-lg">
            <h2 className="text-xl font-bold">वृन्दावन धाम</h2>
            <p>"सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः"</p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="h-auto w-full flex flex-col lg:flex-row justify-center items-center py-16 gap-8">
          {/* Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image src={vrindavanImage} alt="वृन्दावन धाम" className="rounded-lg shadow-lg" />
          </div>

          {/* Contact Details */}
          <div className="bg-[#870407] text-white lg:w-1/3 p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold">📍 
            श्री कृष्ण जन्म भूमि मथुरा , उत्तर प्रदेश, भारत</h1>
            <p className="text-lg mt-2">(श्री कृष्ण जन्म भूमि मुक्ति दल संपर्क केंद्र)</p>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold">🏠 पूर्ण पता:</h4>
              <p className="text-sm">वृन्दावन, मथुरा, उत्तर प्रदेश</p>
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold">📧 ईमेल:</h4>
              <p className="text-sm">skjbmdorg@gmail.com</p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">📞 संपर्क करें:</h4>
              <p className="text-lg font-bold text-yellow-300">+91-8052688885</p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">⏰ कार्य समय:</h4>
              <p className="text-sm">सोमवार - शनिवार: प्रातः 9 बजे - सायं 6 बजे</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
