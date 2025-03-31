"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SquareLoader } from "react-spinners";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#8f1b1b");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <SquareLoader
        color={color}
        loading={loading}
        size={60}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
