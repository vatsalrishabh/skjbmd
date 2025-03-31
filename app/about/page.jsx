import React from 'react'
import MapTooltip from './MapTooltip'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Navbar/Footer'
import Members from './Members'

const page = () => {
  return (
    <div className="w-full">
    {/* 1. Background Image Section */}
    <motion.div
      className="flex flex-col justify-center items-center h-[70vh] bg-cover bg-center text-white text-center"
      style={{ backgroundImage: `url(${aboutBg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="font-bold text-5xl md:text-6xl mb-4 drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Dklean Healthcare
      </motion.h1>
      
      <motion.h2
        className="font-semibold text-3xl md:text-4xl drop-shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        About Dklean
      </motion.h2>
    </motion.div>
    {/* Background Image Section ends */}

    {/* 2. Members Section */}
    {/* <Members /> */}

    {/* 3. About Sections (Alternating Left-Right Layout) */}
    <LeftImgAbout 
      img="https://savechildlife.org/uploads/who-we-are-1.png"
      heading="Who We Are"
      description="Dklean Health Care Public Charitable Trust (N.G.O.) is dedicated to revolutionizing the medical industry by providing top-tier healthcare services tailored to every patient’s needs. Our team consists of highly skilled professionals who are committed to delivering exceptional medical care. We focus on patient-centered approaches, ensuring that our services prioritize comfort, accessibility, and efficiency."
    />

    <RightImgAbout 
      img="https://ak.picdn.net/shutterstock/videos/1021087117/thumb/11.jpg"
      heading="Our Vision"
      description="Our vision is to make quality healthcare accessible to everyone, everywhere. We strive to bridge the gap between medical professionals and patients by offering state-of-the-art healthcare solutions. With our innovative approach and commitment to excellence, we aim to create a future where high-quality medical care is available at your doorstep."
    />

    <LeftImgAbout 
      img="https://www.healthcarefinancenews.com/sites/healthcarefinancenews.com/files/styles/companion_top/public/Digital%20Composite%20Image%20Of%20Surgeon%20Touching%20Interface_HFN%20-%20Getty%20.jpg?itok=EX7iFnvf"
      heading="Innovative Healthcare Solutions"
      description="We embrace technological advancements to enhance healthcare services. Our platform integrates the latest medical technologies to ensure efficient diagnostics, treatment, and patient management. From AI-powered health assessments to telemedicine consultations, we continuously innovate to improve patient outcomes and satisfaction."
    />

    <RightImgAbout 
      img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7aoWenGMWoMl_MfO3q5JkjUR0poKSz5eDw&s"
      heading="Our Dedicated Team"
      description="At Dklean Healthcare, our team is our biggest strength. We bring together experienced doctors, skilled nurses, and dedicated healthcare professionals who work tirelessly to provide the best medical services. Our team members are driven by passion, empathy, and a commitment to improving lives through quality healthcare."
    />

    <LeftImgAbout 
      img="https://www.camh.ca/-/media/professionals-images/conditions-disorders/patient-family-care-graphic-feb2023-png.png?h=500&w=521&hash=D7AA57B197E439E77702104A17896969"
      heading="Patient-Centered Approach"
      description="We understand that each patient is unique, and so are their medical needs. Our patient-centered approach ensures that we provide personalized healthcare solutions. Whether it's routine check-ups, specialized treatments, or emergency care, we prioritize the well-being and comfort of our patients above all else."
    />

    <RightImgAbout 
      img="https://visualmodo.com/wp-content/uploads/2018/10/How-To-Expand-Your-Business-Reach.jpg"
      heading="Expanding Our Reach"
      description="We believe that quality healthcare should not be limited by geography. Our services extend beyond local boundaries, bringing world-class medical care to communities that need it the most. By leveraging digital healthcare solutions and an extensive network of medical professionals, we aim to make a global impact."
    />

    <LeftImgAbout 
      img="https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22572_16533781526443229.jpg"
      heading="Shaping the Future of Healthcare"
      description="Healthcare is evolving, and so are we. Our mission is to be at the forefront of this transformation by continuously improving and adapting to new medical advancements. We envision a world where healthcare is more accessible, efficient, and patient-friendly. Join us in shaping the future of healthcare."
    />
  </div>
  )
}

export default page
