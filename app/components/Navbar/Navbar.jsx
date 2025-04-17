"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart } from "@mui/icons-material";
import logo from "../../../public/assets/skjmbb.jpg";
import AnNavbar from "./AnNavbar";
import Link from "next/link";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [scrollNum, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 55);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            setLoggedInUser(await res.json());
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  const tabs = [
    { name: "होम", path: "/home" },
    { name: "हमारे बारे में", path: "/about" },
    { name: "सेवा", path: "/ourwork" },
    { name: "गैलरी", path: "/gallery" },
    { name: "संपर्क करे", path: "/contact" }
  ];

  return (
    <div className="w-full h-[11vh] bg-[#ebd7a7] text-gray-800  ">
      {/* Laptop Navigation */}
      <div className={`hidden lg:flex w-full fixed z-20 top-0 ${scrollNum ? "shadow-md" : ""} bg-[#ebd7a7] justify-center`}>
        <div className={`w-full h-[12vh] flex items-center px-10 ${scrollNum ? "shadow-lg" : ""}`}>
          {/* Logo */}
          <div className="w-1/6 flex justify-center">
            <Image src={logo} alt="Logo" width={150} height={150} />
          </div>

          {/* Navigation Links */}
          <div className="w-4/6 flex justify-around text-lg font-semibold">
            {tabs.map((tab) => (
           <Link key={tab.name} href={tab.path} className="cursor-pointer">
           <p
             onClick={() => setActiveTab(tab.name)}
             className={`px-4 py-2 rounded-md transition-all duration-300 ${
               activeTab === tab.name ? "bg-[#fe6601] text-white" : "hover:bg-[#f4a800] hover:text-white"
             }`}
           >
             {tab.name}
           </p>
         </Link>
            ))}
          </div>

          {/* Icons & Login */}
          <div className="flex items-center space-x-6">
            {/* <Search className="cursor-pointer text-[#970403] hover:text-[#fe6601] transition-all" />
            <ShoppingCart className="cursor-pointer text-[#970403] hover:text-[#fe6601] transition-all" /> */}

            {/* Login Button */}
            <Link href="/donate">
            <button className="ml-4 bg-[#fe6601] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#970403] transition-all">
              
            दान करें
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <AnNavbar />
      </div>
    </div>
  );
};

export default Navbar;
