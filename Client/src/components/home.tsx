'use client'
import React from 'react'
import Hero from './hero'
import About from './about'
import Partners from './partners'
import Contact from './contact-page-components/contactus'
import ProductCat from './product-component.tsx/productCards'
import ServiceCat from './services-component/servicesCat'
import ProjectsCat from './project-components/projectsCat'
export default function Home() {
  return (
    <div className="overflow-hidden w-full">
        <Hero/>
        <div className="relative w-full bg-LG">
        <About />
      </div>
      <div className="bg-DB">
        <ProductCat />
      </div>
      <div className="bg-LG">
        <ServiceCat />
      </div>
      <div className="bg-DB">
        <ProjectsCat />
      </div>
      <div className="md:px-20 py-10 px-8 bg-white">
        <Partners />
      </div>

      <div className="md:pb-32 pb-10 bg-DB">
        <Contact />
      </div>

    </div>
  )
}
