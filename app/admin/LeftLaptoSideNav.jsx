"use client"; // Mark as client component

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // ID card fee
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"; // Donation
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"; // Rank
import CollectionsIcon from "@mui/icons-material/Collections"; // Gallery
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // WhatsApp Linking
import LogoutIcon from "@mui/icons-material/Logout"; // Logout
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BadgeIcon from "@mui/icons-material/Badge"; // ID Card (new icon)

const LeftLaptoSideNav = () => {
  const router = useRouter();

  const adminLogout = () => {
    localStorage.removeItem("adminDetails");
    window.location.reload();
  };

  const navItems = [
    {
      href: "/admin/idcardcollection",
      label: "आईडी कार्ड शुल्क",
      icon: <MonetizationOnIcon />,
    },
    {
      href: "/admin/donation",
      label: "दान राशि",
      icon: <VolunteerActivismIcon />,
    },
    {
      href: "/admin/giverank",
      label: "पद प्रदान करें",
      icon: <MilitaryTechIcon />,
    },
    {
      href: "/admin/gallery",
      label: "गैलरी",
      icon: <CollectionsIcon />,
    },
    {
      href: "/admin/whatsapp",
      label: "व्हाट्सएप लिंकिंग",
      icon: <WhatsAppIcon />,
    },
    {
      href: "/admin/idCard",
      label: "आईडी कार्ड",
      icon: <BadgeIcon />,
    },
  ];

  return (
    <div className="lg:block hidden w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0">
      <h2 className="text-xl font-semibold mb-6 text-center">Admin Panel</h2>

      <nav>
        <ul className="space-y-4">
          {navItems.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={adminLogout}
              className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <ExitToAppIcon />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftLaptoSideNav;
