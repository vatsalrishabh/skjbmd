"use client";  // ✅ Ensures this runs only on the client

import React from "react";
import { motion } from "framer-motion";  // ✅ Ensure motion is imported
import Image from "next/image";  // ✅ Next.js optimized image handling

const teamMembers = [
  {
    name: "Mr. D. Kumar",
    designation: "Path Lab & Physiotherapist",
    img: "/members/dkum.jpeg",
    contact: "8510090506",
  },
  {
    name: "Dr. Mayank Kumar (PT)",
    designation: "Physiotherapist (BPT, DNYS, CMS-ED, EMT)",
    img: "/members/pramukh.jpeg",
    contact: "+91 88822 28599",
  },
  {
    name: "Dr. Ashwani Kumar Rai",
    designation: "MBBS, MS Orthopaedics",
    img: "/members/pramukh.jpeg",
    contact: "+91 85959 93431",
  },
];

const Members = () => {
  return (
    <div className="p-8 bg-gray-100 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center text-[#8f1b1b] mb-8">
        Meet Our Experts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center place-items-center">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:bg-[#8f1b1b] hover:text-white w-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
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
              📞 {member.contact}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Members;
