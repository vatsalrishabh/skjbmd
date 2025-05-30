"use client";
import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import io from "socket.io-client";
import LeftLaptoSideNav from "../LeftLaptoSideNav";
import AdminLoginPage from "../additems/AdminLoginPage";

const page = () => {
  const [status, setStatus] = useState("Connecting...");
  const [qrCode, setQrCode] = useState(null);
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

  useEffect(() => {
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);


    // Listen for QR code from the server
    socket.on("qr", (qr) => {
      setQrCode(qr);
    });

    // Listen for WhatsApp status
    socket.on("status", (status) => {
      setStatus(status);
    });

    // Cleanup the socket connection when component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (


     <div>
          {isAuthenticated ? (
            <>
          <div className="flex">
<LeftLaptoSideNav />
{/* Right-side QR and Status */}
<div className="lg:w-[83%] w-full absolute right-0 h-screen bg-slate-100 p-6 overflow-y-auto">
  <div className="max-w-xl mx-auto text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">WhatsApp Status</h1>

    <div className="mb-4">
      <span className="text-lg font-medium text-gray-700">Current Status: </span>
      <span
        className={`text-lg font-semibold ${
          status === "ready"
            ? "text-green-600"
            : status === "authenticated"
            ? "text-blue-600"
            : status === "disconnected"
            ? "text-red-600"
            : "text-gray-600"
        }`}
      >
        {status}
      </span>
    </div>

    {status === "ready" && (
      <p className="text-green-700 font-medium mb-4">✅ WhatsApp is ready to use!</p>
    )}

    {status === "authenticated" && (
      <p className="text-blue-700 font-medium mb-4">🔐 WhatsApp is authenticated.</p>
    )}

    {status === "disconnected" && (
      <p className="text-red-700 font-medium mb-4">⚠️ WhatsApp is disconnected. Trying to reconnect...</p>
    )}

    {qrCode && status !== "ready" && (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📲 Scan this QR Code to log in</h2>
        <div className="border rounded-xl p-4 inline-block bg-white shadow-md">
          <img src={qrCode} alt="WhatsApp QR Code" className="w-64 h-64 object-contain" />
        </div>
      </div>
    )}
  </div>
</div>
{/* Right-side QR and Status */}

    </div>
            </>
          ) : (
            <AdminLoginPage />
          )}
        </div>
  );
};

export default page;
