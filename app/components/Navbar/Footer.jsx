"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="Footer bg-gray-900 text-gray-300 py-8">
      {/* शीर्ष फ़ुटर */}
      <div className="topFooter grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8">
        {/* कॉलम 1 */}
        <div className="col1">
          <h1 className="text-[#fe6601] text-xl font-semibold mb-4 hover:text-gray-500 transition-all duration-300">
            हमारे बारे में
          </h1>
          <p className="hover:text-gray-100 transition-all duration-300">
            हमारा मिशन दिव्य ज्ञान और आध्यात्मिक मार्गदर्शन फैलाना है। हम धार्मिक शिक्षाएँ, शास्त्र और प्रार्थना के लिए एक शांतिपूर्ण स्थान प्रदान करते हैं।
          </p>
        </div>

        {/* कॉलम 2 */}
        <div className="col2">
          <h1 className="text-[#fe6601] text-xl font-semibold mb-4 hover:text-gray-500 transition-all duration-300">
          टर्म्स एंड कंडीशन 
          </h1>
          <ul className="space-y-2">
         <Link href ="/privacypolicy" ><li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">गोपनीयता नीति</li>  </Link>
         <Link href ="/terms" > <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">नियम और शर्तें </li> </Link>
         <Link href ="/cancelrefund" >  <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">रद्दीकरण और रिफंड नीति</li> </Link> 
         <Link href ="/shippinganddelivery" >   <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">शिपिंग और डिलीवरी नीति</li>  </Link>
          </ul>
        </div>

        {/* कॉलम 3 */}
        <div className="col3">
          <h1 className="text-[#fe6601] text-xl font-semibold mb-4 hover:text-gray-500 transition-all duration-300">
            त्वरित लिंक
          </h1>
          <ul className="space-y-2">
          <Link href="/home">
          <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">मुख्य पृष्ठ</li>
          </Link>
          <Link href="/about">
          <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">हमारे बारे में</li>
          </Link>
          <Link href="/about">
          <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">गैलरी</li>
          </Link>
          <Link href="/about">
          <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">संपर्क करें</li>
          </Link>
          </ul>
        </div>

        {/* कॉलम 4 */}
        <div className="col4">
          <h1 className="text-[#fe6601] text-xl font-semibold mb-4 hover:text-gray-500 transition-all duration-300">
            हमें फ़ॉलो करें
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">फेसबुक</li>
            <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">यूट्यूब</li>
            <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">इंस्टाग्राम</li>
            <li className="hover:text-[#fe6601] transition-all duration-300 cursor-pointer">टेलीग्राम</li>
          </ul>
        </div>
      </div>

      {/* निचला फ़ुटर */}
      <div className="bottomFooter flex flex-col lg:flex-row items-center justify-between mt-8 border-t border-gray-700 pt-4 px-8">
        <div className="bottomFooter-Left text-gray-400">
          विश्वास, प्रेम और ज्ञान फैलाना, एक शांतिपूर्ण जीवन के लिए।
        </div>
        <div className="bottomFooter-Right text-gray-400 mt-4 lg:mt-0">
          © {year} दिव्य मार्ग | सर्वाधिकार सुरक्षित | संचालित द्वारा
        <Link href="https://www.nebulanet.in/"> <span className="text-[#fe6601] hover:text-gray-500 transition-all duration-300 cursor-pointer"> NebulaNet</span></Link> 
        </div>
      </div>
    </div>
  );
};

export default Footer;
