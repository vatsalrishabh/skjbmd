'use client';
import React from 'react';
import { FaHandsHelping, FaSeedling, FaPrayingHands, FaClinicMedical, FaHome, FaUsers, FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import "animate.css";
import donate1 from "@/public/donate/donate1.jpg";
import donate2 from "@/public/donate/donate2.jpg";

const LeftDonationMot = () => {
  return (
    <div className="bg-[#ebd7a7] lg:p-6 rounded-lg shadow-md w-full">
      <div className='flex justify-between items-center'>
        <h2 className="text-3xl font-bold text-[#870407] mb-4 font-cursive">
          धर्म रक्षा और गौ सेवा हेतु आपका योगदान
        </h2>
        <div className="text-center animate__animated animate__bounce animate__infinite">
          <Link href="/donorlogin">
            <button className="bg-[#fe6601] text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-[#870407] transition">
              दान करें
            </button>
          </Link>
        </div>
      </div>

      <Image src={donate1} alt="गौ सेवा" width={600} height={300} className="rounded-lg mb-4" />

      <h3 className="text-xl font-semibold text-[#870407] mb-3 font-cursive">गौ सेवा - सनातन धर्म का आधार</h3>
      <p className="text-lg text-gray-700 mb-4">
        गौ माता की सेवा सनातन धर्म की महत्वपूर्ण परंपरा है। हमारे द्वारा संचालित गोशालाओं में अनेकों निराश्रित गाएँ,
        बछड़े और वृद्ध गाएँ आश्रय पाती हैं। आपका दान इनके लिए चारा, चिकित्सा और देखभाल में सहायक होगा।
      </p>

      <h3 className="text-xl font-semibold text-[#870407] mb-3 font-cursive">धार्मिक और सामाजिक सेवा कार्य</h3>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li><FaHandsHelping className="inline mr-2 text-[#870407]" /> निर्धनों के विवाह संस्कार</li>
        <li><FaPrayingHands className="inline mr-2 text-[#870407]" /> यज्ञ और हवन का आयोजन</li>
        <li><FaClinicMedical className="inline mr-2 text-[#870407]" /> गरीबों के लिए मुफ्त चिकित्सा सेवा</li>
        <li><FaHome className="inline mr-2 text-[#870407]" /> वृद्धाश्रम एवं अनाथालय सहायता</li>
        <li><FaUsers className="inline mr-2 text-[#870407]" /> जरूरतमंदों के लिए भोजन वितरण</li>
      </ul>

      <Image src={donate2} alt="धार्मिक सेवा कार्य" width={600} height={300} className="rounded-lg mb-4" />

      <h3 className="text-xl font-semibold text-[#870407] mb-3 font-cursive">सनातन संस्कृति की रक्षा में योगदान</h3>
      <p className="text-lg text-gray-700 mb-4">
        आपका सहयोग हमें सनातन धर्म के मूल्यों को बचाने और आगे बढ़ाने में मदद करेगा। दान राशि का उपयोग धार्मिक ग्रंथों के
        प्रचार, गरीब विद्यार्थियों की शिक्षा, मंदिर निर्माण एवं मरम्मत, तथा धार्मिक अनुष्ठानों के आयोजन में किया जाता है।
      </p>

      <h3 className="text-xl font-semibold text-[#870407] mb-3 font-cursive">आपका योगदान कैसे मदद करता है?</h3>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li><FaSeedling className="inline mr-2 text-[#870407]" /> गोशालाओं में गौ माता के भरण-पोषण हेतु</li>
        <li><FaBookOpen className="inline mr-2 text-[#870407]" /> निर्धन बच्चों की शिक्षा के लिए</li>
        <li><FaClinicMedical className="inline mr-2 text-[#870407]" /> मुफ्त चिकित्सा शिविर के संचालन में</li>
        <li><FaPrayingHands className="inline mr-2 text-[#870407]" /> यज्ञ, हवन, तथा अन्य धार्मिक अनुष्ठानों में</li>
      </ul>

      <p className="text-lg text-gray-700 mb-4">
        जब आप धर्म और समाज के हित में दान करते हैं, तो वह केवल एक आर्थिक सहयोग नहीं बल्कि पुण्य का कार्य भी होता है।
        महादान, अन्नदान, विद्यादान, और गौदान को सनातन धर्म में सर्वश्रेष्ठ दान माना गया है।
      </p>

      <div className="text-center mt-6 animate__animated animate__pulse animate__infinite">
        <Link href="/donorlogin">
          <button className="bg-[#fe6601] text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-[#870407] transition">
            अभी दान करें
          </button>
        </Link> 
      </div>
    </div>
  );
};

export default LeftDonationMot;
