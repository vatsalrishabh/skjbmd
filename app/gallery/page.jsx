import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Navbar/Footer'
import GalleryOne from './GalleryOne'

const page = () => {
  return (
    <div className='Gallery'>
      <Navbar/>
       <GalleryOne/>
       <Footer/>
    </div>
  )
}

export default page
