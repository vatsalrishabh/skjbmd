import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-[#ebd7a7] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#6b240c] mb-4">हमारे कार्य</h1>
      
      <p className="text-xl text-[#3e3e3e] mb-8 max-w-2xl">
        हम अपने उद्देश्यों की पूर्ति की दिशा में लगातार कार्य कर रहे हैं। हमारा प्रयास है कि
        श्रीकृष्ण जन्मभूमि की वास्तविकता को सबके सामने लाया जाए और सनातन संस्कृति को संजोया जाए |
      </p>
      
      <div className="bg-[#fffaf0] shadow-lg border border-[#d1a464] rounded-xl p-6">
        <p className="text-2xl font-semibold text-[#6b240c]">🙏 हमारे काम जल्द ही दिखाई देंगे... 🙏</p>
        <p className="text-sm text-[#6b240c] mt-2 italic">आपके सहयोग और विश्वास के लिए धन्यवाद।</p>
      </div>
    </div>
  );
}
