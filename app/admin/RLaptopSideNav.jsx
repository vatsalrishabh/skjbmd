"use client";
import React from "react";
import DashboardCard from "./DashboardCard";

// Import New Icons
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CollectionsIcon from "@mui/icons-material/Collections";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Admin breadcrumb if needed
import AdminBreadCrumbs from "../components/Admin/AdminBreadCrumbs";

// New Data Array for Cards
const cardData = [
  {
    heading: "आईडी कार्ड शुल्क",
    number: 250,
    Icon: MonetizationOnIcon,
    bgColor: "#4A90E2",
    link: "/admin/idcardcollection",
  },
  {
    heading: "दान राशि",
    number: "₹1,02,000",
    Icon: VolunteerActivismIcon,
    bgColor: "#16a34a",
    link: "/admin/donation",
  },
  {
    heading: "पद प्रदान करें",
    number: 58,
    Icon: MilitaryTechIcon,
    bgColor: "#d97706",
    link: "/admin/giverank",
  },
  {
    heading: "गैलरी",
    number: 112,
    Icon: CollectionsIcon,
    bgColor: "#9333ea",
    link: "/admin/gallery",
  },
  {
    heading: "व्हाट्सएप लिंकिंग",
    number: 35,
    Icon: WhatsAppIcon,
    bgColor: "#22c55e",
    link: "/admin/whatsapp",
  },
];



const breadcrumbLinks = [
    { label: "Admin", href: "/admin" },
    // { label: "Manage Orders", href: "/admin/manageorder" },
  ];
const RLaptopSideNav = () => {
  // const products = useSelector((state) => state.allProducts.products);
  // console.log(products);
  return (
    <div className="lg:w-[84%] h-[100vh] w-full absolute right-0  bg-slate-200 p-6">
      {/* Grid Layout: 3 Columns on Large Screens, 1 Column on Small Screens */}
      <div className="p-4">
      <AdminBreadCrumbs links={breadcrumbLinks} name="Admin Dashboard" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default RLaptopSideNav;
