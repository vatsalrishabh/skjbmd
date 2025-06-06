"use client";
import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import AdminLoginPage from "./AdminLoginPage";
import LeftLaptoSideNav from "../LeftLaptoSideNav";
import MobileAdminNav from "../MobileAdminNav";
import RightGiveRank from "./RightGiveRank";



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
          <MobileAdminNav />
          <div className="flex laptop">
            <LeftLaptoSideNav />
            <RightGiveRank />
          </div>
        </>
      ) : (
        <AdminLoginPage />
      )}
    </div>
  );
};

export default page;
