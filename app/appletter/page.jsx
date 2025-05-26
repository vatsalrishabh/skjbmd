import Image from 'next/image';
import React from 'react';

const Page = () => {
  const data = {
    name: 'Vatsalya Rishabh Pandey',
    father:'Nagesh Pandey',
    designation: 'Software Developer',
    date: '09 May 2025',
    address: 'G-02 Lake View Apartment, Chikkabanavara, Bangalore',
    joiningDate: '15 May 2025',
    signature: 'Shri Krishna Janm Bhumi Muktidal'
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[794px] h-[1123px]">
        {/* Background Appointment Letter Template */}
        <Image
          src="/assets/appletter.png"
          alt="Appointment Letter Template"
          fill
          className="object-cover rounded-md"
        />

        {/* Overlayed Text Fields */}
        <div className="absolute inset-0 text-[16px] text-black font-medium leading-tight px-10 py-8">
          {/* Example Positions (adjust according to your template) */}
          <div className="absolute top-[0px] left-[600px]">समाप्ति तिथि:{data.date}</div>
          <div className="absolute top-[270px] left-[230px] font-bold" style={{ color: '#e11f1f' }}>
  {data.name} पुत्र श्री {data.father}
</div>
<div className="absolute top-[352px] left-[45px] font-bold" style={{ color: '#e11f1f' }}>
  {data.designation}
</div>


          
        </div>
      </div>
    </div>
  );
};

export default Page;
