"use client";
import React, { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import logo from "../../../public/assets/skjmbb.jpg";
import Image from "next/image";
import Link from "next/link";
import { orange } from "@mui/material/colors";

const AnNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const tabs = [
    { name: "होम", path: "/home" },
    { name: "हमारे बारे में", path: "/about" },
    { name: "सेवा", path: "/ourwork" },
    { name: "गैलरी", path: "/gallery" },
    { name: "संपर्क करें", path: "/contact" }
  ];

  return (
    <nav className="bg-[#ecdec5] shadow-md p-1 w-full fixed top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Image src={logo} alt="Logo" width={150} height={150} />

        {/* Menu Button */}
        <button onClick={toggleMenu} className="text-[#970403] focus:outline-none">
          {isOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
        </button>
      </div>

      {/* Menu Items */}
      {isOpen && (
        <div className="mt-4 flex flex-col space-y-4 text-lg font-semibold">
          {tabs.map((tab) => (
            <Link key={tab.name} href={tab.path}>
              <p className="cursor-pointer p-2 rounded-lg text-[#970403] hover:bg-[#f4a800] hover:text-white transition-all duration-300">
                {tab.name}
              </p>
            </Link>
          ))}

          {/* Donate Button */}
          <Link href="/donate">
            <button className="mt-2 bg-[#fe6601] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#970403] transition-all">
              दान करें
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AnNavbar;

