"use client";  // Ensure this runs only on the client

import React from "react";
import Image from "next/image";  // Next.js optimized image handling

const teamMembers = [
  {
    name: "अशोक वत्स",
    designation: "राष्ट्रीय कार्यकारी अध्यक्ष",
    img: "/members/ashok.jpg",
    contact: "8052688885",
  },
  {
    name: "राजेश मणि त्रिपाठी ",
    designation: "राष्ट्रीय अध्यक्ष ",
    img: "/members/head.jpeg",
   
  },
  {
    name: "अनूप कुमार मिश्रा ",
    designation: "संस्थापक सदस्य ",
    img: "/members/anoop.jpeg",
    contact: "+91 8052688885",
  },

];

const Members = () => {
  return (
    <div className="p-8 bg-gray-100 flex flex-col items-center  ">
      <h2 className="text-4xl font-bold text-center text-[#8f1b1b] mb-8">
     <p>श्री कृष्ण जन्म भूमि मुक्ति दल</p> 
     <p> (प्रमुख सदस्य)</p>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center place-items-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:bg-[#8f1b1b] hover:text-white w-80"
          >
            <Image
              src={member.img}
              alt={member.name}
              width={128}
              height={128}
              className="rounded-full shadow-md mb-4 transition-all duration-300 hover:scale-110 border-4 border-gray-300"
            />
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white">
              {member.name}
            </h3>
            <p className="text-gray-500 group-hover:text-gray-200 text-sm mb-2">
              {member.designation}
            </p>
            <span className="text-gray-700 group-hover:text-gray-300 text-sm">
              📞 {member.contact||"उपलब्ध नहीं |"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
