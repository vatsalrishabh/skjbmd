"use client"; // Ensure it's a client component

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // ID Card fee
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"; // Donation
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"; // Rank
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // WhatsApp Linking
import LogoutIcon from "@mui/icons-material/Logout"; // Logout

const MobileAdminNav = () => {
  const router = useRouter();

  const adminLogout = () => {
    localStorage.removeItem("adminDetails");
    window.location.reload();
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white p-2 flex justify-around items-center shadow-md z-10">
      
      <Link href="/admin/idcardcollection" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <MonetizationOnIcon />
        <span>आईडी शुल्क</span>
      </Link>

      <Link href="/admin/donation" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <VolunteerActivismIcon />
        <span>दान राशि</span>
      </Link>

      <Link href="/admin/giverank" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <MilitaryTechIcon />
        <span>पद दें</span>
      </Link>

      <Link href="/admin/whatsapp" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <WhatsAppIcon />
        <span>व्हाट्सएप</span>
      </Link>

      <button
        onClick={adminLogout}
        className="flex flex-col items-center text-xs hover:text-gray-300 transition"
      >
        <LogoutIcon />
        <span>लॉगआउट</span>
      </button>
    </div>
  );
};

export default MobileAdminNav;
