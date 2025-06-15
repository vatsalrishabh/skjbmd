'use client';

import Sanscript from '@sanskrit-coders/sanscript';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import html2canvas from 'html2canvas';

export const dynamic = 'force-dynamic';

// Suspense wrapper for server compatibility
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [validDate, setValidDate] = useState('');
  const cardRef = useRef(null);

  const roleToHindiMap = {
  // National Level
  rashtriyapramukh: 'राष्ट्रीय प्रमुख',
  sahpramukh: 'सह प्रमुख',
  sangathanmantri: 'संगठन मंत्री',
  sahsangathanmantri: 'सह संगठन मंत्री',
  koshadhaksh: 'कोषाध्यक्ष',
  karyalaysachiv: 'कार्यालय सचिव',
  rashtriyapracharak: 'राष्ट्रीय प्रचारक',
  sahpracharak: 'सह प्रचारक',
  mediaprabhari: 'मीडिया प्रभारी',

  // State Level
  pradeshpramukh: 'प्रदेश प्रमुख',
  pradeshsahpramukh: 'प्रदेश सह प्रमुख',
  pradeshsangathanmantri: 'प्रदेश संगठन मंत्री',
  pradeshsahsangathanmantri: 'प्रदेश सह संगठन मंत्री',
  pradeshkoshadhaksh: 'प्रदेश कोषाध्यक्ष',
  pradeshkaryalaysachiv: 'प्रदेश कार्यालय सचिव',
  pradeshpracharak: 'प्रदेश प्रचारक',
  pradeshsahpracharak: 'प्रदेश सह प्रचारक',
  pradeshmediaprabhari: 'प्रदेश मीडिया प्रभारी',

  // District Level
  jilapramukh: 'जिला प्रमुख',
  sahjilapramukh: 'सह जिला प्रमुख',
  jilasangathanmantri: 'जिला संगठन मंत्री',
  jilasahsangathanmantri: 'जिला सह संगठन मंत्री',
  jilakoshadhaksh: 'जिला कोषाध्यक्ष',
  jilakaryalaysachiv: 'जिला कार्यालय सचिव',
  jilapracharak: 'जिला प्रचारक',
  jilasahpracharak: 'जिला सह प्रचारक',
  districtmediaprabhari: 'जिला मीडिया प्रभारी',

  // General
  member: 'सदस्य',
};


  // Parse query param data
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


  // Set expiry date only on client
  useEffect(() => {
    const today = new Date();
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);
    setValidDate(oneYearLater.toLocaleDateString('en-GB'));
  }, []);

  // Don't render if userData hasn't loaded yet
  if (!userData) return null;

  const {
    userId,
    name,
    role,
    gender,
    contact,
    fatherName,
    address,
    dpUrl,
  } = userData;
  console.log(userData)
  
  // Sanitize unsupported CSS color formats before generating image
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[794px] h-[1123px]" ref={cardRef}>
        {/* Background Appointment Letter Template */}
        <Image
          src="/assets/appletter.png"
          alt="Appointment Letter Template"
          fill
          className="object-cover rounded-md"
        />

        {/* Overlayed Text Fields */}
        <div className="absolute inset-0 text-[16px] text-black font-medium leading-tight px-10 py-8">
          {/* Example Positioned Fields */}
          <div className="absolute top-[0px] left-[600px]">
            समाप्ति तिथि: {validDate}
          </div>
          <div
            className="absolute top-[270px] left-[230px] font-bold"
            style={{ color: '#e11f1f' }}
          >
            {name} S/o {fatherName}
          </div>
          <div
            className="absolute top-[352px] left-[45px] font-bold"
            style={{ color: '#e11f1f' }}
          >
          {roleToHindiMap[role] || role}
          </div>
        </div>
      </div>
    </div>
  );
}
