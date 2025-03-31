import React from "react";
import { FaNewspaper, FaSun, FaHeartbeat, FaLeaf } from "react-icons/fa";

const Marqueee = () => {
  const newsItems = [
    { text: "धर्म और सेवा में दान का महत्व अति उत्तम है", icon: <FaNewspaper /> },
    { text: "सूर्य नमस्कार से स्वास्थ्य में लाभ", icon: <FaSun /> },
    { text: "सेवा परमो धर्मः - दूसरों की सेवा करना ही सबसे बड़ा धर्म है", icon: <FaHeartbeat /> },
    { text: "प्रकृति संरक्षण से जीवन सुखमय बनता है", icon: <FaLeaf /> },
  ];

  return (
    <div className="w-full bg-[#ebd7a7] py-3 overflow-hidden relative">
      <div className="flex w-full animate-marquee whitespace-nowrap">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center mx-6 text-[#870407] font-semibold text-lg gap-2 bg-[#fe6601] px-4 py-2 rounded-lg shadow-md"
          >
            {item.icon} {item.text}
          </div>
        ))}
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Marqueee;