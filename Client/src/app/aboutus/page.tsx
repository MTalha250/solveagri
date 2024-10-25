import React from 'react'
import AboutUs from '@/components/aboutus-content/aboutuspage'
import Navbar from '@/components/navbar'

export default function About() {
  return (
    <div>
       <div className="fixed w-full" style={{ zIndex: "999" }}>
      <Navbar/>
          
      </div>
      <AboutUs/>
    </div>
  )
}
