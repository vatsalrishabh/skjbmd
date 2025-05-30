"use client";
import React, { useEffect, useState } from "react";
import LeftLaptoSideNav from "../LeftLaptoSideNav";
import MobileAdminNav from "../MobileAdminNav";
import RightGallery from "./RightGallery";
import {jwtDecode} from "jwt-decode";
import AdminLoginPage from "./AdminLoginPage";


const page = () => {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
       
         const checkAuth = () => {
           let storedAdmin = localStorage.getItem("adminDetails");
       
           if (storedAdmin) {
             try {
               storedAdmin = JSON.parse(storedAdmin);
               const decodedToken = jwtDecode(storedAdmin.token);
       
               // Check if token is expired
               if (decodedToken.exp * 1000 < Date.now()) {
                 console.log("Session expired. Logging out...");
                 logoutAdmin();
               } else {
                 setIsAuthenticated(true);
               }
             } catch (error) {
               console.error("Invalid token:", error);
               logoutAdmin();
             }
           } else {
             setIsAuthenticated(false);
           }
         };
       
         const logoutAdmin = () => {
           localStorage.removeItem("adminDetails");
           setIsAuthenticated(false);
         };
       
         useEffect(() => {
           checkAuth();
       
           // Listen for storage changes (e.g., logout from another tab)
           window.addEventListener("storage", checkAuth);
           return () => {
             window.removeEventListener("storage", checkAuth);
           };
         }, []);
  return (
  

       <div>
      {isAuthenticated ? (
        <>
          <div>
      <div>
        <MobileAdminNav />
      </div>

      <div className="flex">
        <LeftLaptoSideNav />{" "}{/* left side admin panel which changes right side component */}

{/* Below add componet with lg:w-[83%]  w-full */}
      <RightGallery />
      </div>
    </div>
        </>
      ) : (
        <AdminLoginPage />
      )}
    </div>
  );
};

export default page;
