import React from "react";
import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaShareAlt,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";

const page = () => {
  return (
 <>
<Navbar/>
<div className="min-h-screen py-10 px-5 md:px-20" style={{ backgroundColor: "#ebd7a7" }}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: "#870407" }}>
          गोपनीयता नीति
        </h1>
        <p className="text-center mb-6 text-sm" style={{ color: "#870407" }}>
          प्रभावी तिथि: मार्च 2025
        </p>

        <div className="space-y-6">
          <section className="flex items-start space-x-4">
            <FaUserShield style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                हम कौन सी जानकारी एकत्र करते हैं
              </h2>
              <p className="text-gray-700">
                जब आप हमारी वेबसाइट के साथ इंटरैक्ट करते हैं तो हम आपका नाम, ईमेल और फ़ोन नंबर जैसी व्यक्तिगत जानकारी एकत्र करते हैं।
              </p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaDatabase style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                हम जानकारी कैसे एकत्र करते हैं
              </h2>
              <p className="text-gray-700">
                जानकारी फ़ॉर्म, कुकीज़ और उपयोगकर्ता इंटरैक्शन के माध्यम से एकत्र की जाती है।
              </p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaLock style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                हम आपकी जानकारी को सुरक्षित कैसे रखते हैं
              </h2>
              <p className="text-gray-700">
                हम एन्क्रिप्शन, सुरक्षित सर्वर और एक्सेस कंट्रोल का उपयोग करके आपकी जानकारी की सुरक्षा करते हैं।
              </p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaShareAlt style={{ color: "#870407" }} className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#870407" }}>
                तीसरे पक्ष के साथ जानकारी साझा करना
              </h2>
              <p className="text-gray-700">
                हम आपकी व्यक्तिगत जानकारी को आपकी सहमति के बिना किसी तीसरे पक्ष के साथ साझा नहीं करते, सिवाय जब यह कानून द्वारा आवश्यक हो।
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <FaEnvelope style={{ color: "#870407" }} className="text-3xl mx-auto" />
          <p className="mt-2 text-gray-700">किसी भी प्रश्न के लिए, हमसे संपर्क करें:</p>
          <a
            href="mailto:support@skjbmd.org"
            className="font-semibold hover:underline"
            style={{ color: "#870407" }}
          >
            support@skjbmd.org
          </a>
        </div>
      </div>
    </div>
<Footer/>
 </>
  );
};

export default page;
