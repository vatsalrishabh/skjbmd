'use client';

import React, { Suspense } from 'react';

// Wrapper component to use Suspense for useSearchParams hook usage
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export const dynamic = 'force-dynamic';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (!data) {
      router.push('/home');
    } else {
      try {
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
      } catch (err) {
        console.error('Error parsing data:', err);
        router.push('/home');
      }
    }
  }, [searchParams, router]);

  if (!userData) return null;

  const {
    userId,
    name,
    designation,
    gender,
    contact,
    address,
    dpUrl,
  } = userData;

  const today = new Date();
  const oneYearLater = new Date(today);
  oneYearLater.setFullYear(today.getFullYear() + 1);
  const validDate = oneYearLater.toLocaleDateString('en-GB');

  const sanitizeColors = (element) => {
    const all = element.querySelectorAll('*');
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      ['color', 'backgroundColor', 'borderColor'].forEach((prop) => {
        const value = style[prop];
        if (value && value.includes('oklch')) {
          el.style[prop] = '#000';
        }
      });
    });
  };

  const downloadCard = () => {
    if (!cardRef.current) return;

    sanitizeColors(cardRef.current);

    html2canvas(cardRef.current, { scale: 2, useCORS: true })
      .then((canvas) => {
        const link = document.createElement('a');
        link.download = `${name}_ID_card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 gap-4 p-4">
      <div
        ref={cardRef}
        className="relative w-[336px] h-[210px] bg-white rounded-md shadow-md"
      >
        {/* Background image */}
        <img
          src="/assets/idcard.png"
          alt="ID Card Template"
          className="w-full h-full object-cover rounded-md"
        />

        {/* User photo */}
        <div className="absolute top-[43px] left-[15px] w-[80px] h-[100px] rounded-sm overflow-hidden bg-white border border-gray-400">
          <img
            src={dpUrl ? `http://localhost:3001${dpUrl}` : '/assets/default-user.png'}
            alt="User"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>

        {/* User details */}
        <div className="absolute inset-0 text-[10px] text-black px-4 py-2 font-semibold leading-tight">
          <div className="absolute top-[35px] left-[180px]">{userId}</div>
          <div className="absolute top-[47px] left-[180px]">{name}</div>
          <div className="absolute top-[61px] left-[180px]">{designation || 'सदस्य'}</div>
          <div className="absolute top-[74px] left-[180px]">{gender}</div>
          <div className="absolute top-[87px] left-[180px]">{contact}</div>
          <div className="absolute top-[101px] left-[180px]">{address?.city}</div>
          <div className="absolute top-[115px] left-[180px]">{address?.state}</div>
          <div className="absolute top-[129px] left-[180px] w-[150px] text-[10px] font-semibold leading-tight break-words line-clamp-2">
            {`${address?.street}, ${address?.city}, ${address?.state} - ${address?.zipCode}, ${address?.country}`}
          </div>
          <div className="absolute top-[200px] left-[290px] text-[5px]">
            {validDate}
          </div>
        </div>
      </div>

      <button
        onClick={downloadCard}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download ID Card
      </button>
    </div>
  );
}
