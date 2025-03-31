"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LeftImgAbout = ({ img, heading, description, readMore }) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={img}
          alt="About"
          className="w-full md:w-[90%] h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Right Side - Heading & Description */}
      <div className="w-full md:w-1/2 p-6 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#8f1b1b] mb-4">{heading}</h2>
        <p className="text-gray-700 text-lg">{description}</p>
        {readMore&& <Link href="/about"><button className="p-3 bg-[#8f1b1b] text-white mt-8">आगे पढ़े</button></Link> }
      </div>
    </motion.div>
  );
};

export default LeftImgAbout;