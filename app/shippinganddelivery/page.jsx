import React from "react";
import { FaTruck, FaHandsHelping, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";

const page = () => {
  return (
 <>
 <Navbar/>

  <div className="max-w-4xl mx-auto p-6 rounded-lg mt-10" style={{ backgroundColor: "#ebd7a7" }}>
      <h1 className="text-3xl font-bold text-center mb-4" style={{ color: "#870407" }}>
        शिपिंग नीति
      </h1>

      <p className="text-sm text-center mb-6" style={{ color: "#870407" }}>
        प्रभावी तिथि: 29 मार्च, 2025
      </p>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaTruck className="text-pink-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              कोई भौतिक शिपमेंट नहीं
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              एक धार्मिक और परोपकारी संगठन होने के नाते, हम कोई भौतिक उत्पाद या वस्तुएँ नहीं बेचते या वितरित करते हैं। इसलिए, शिपिंग लागू नहीं है।
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaHandsHelping className="text-green-600 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              केवल दान
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              इस वेबसाइट के माध्यम से किए गए सभी योगदान स्वैच्छिक दान माने जाते हैं और केवल धार्मिक एवं सामुदायिक सेवा के उद्देश्यों के लिए उपयोग किए जाते हैं।
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <FaEnvelope className="text-gray-700 text-2xl mt-1" />
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
              कोई प्रश्न है?
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              यदि आपके कोई सवाल या शंकाएँ हों, तो कृपया हमसे <span className="font-semibold">support@skjbmd.org</span> पर संपर्क करें।
            </p>
          </div>
        </div>
      </div>
    </div>
 <Footer/>

 </>
  );
};

export default page;
