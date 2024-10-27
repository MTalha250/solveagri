"use client";
import ContactComp from "./contactComp";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div
      className="relative w-full flex h-auto justify-between items-center bg-cover py-20 px-8 md:px-16 bg-center"
      style={{ backgroundImage: "url(/contactus/contactimg.jpeg)" }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Centered Text Div */}
      <div className="relative inset-0 flex flex-col w-full md:w-1/2 z-[100] text-white px-6">
        <h1 className="text-[50px] font-bold mb-4">Contact Us</h1>
        <p className="text-white text-[24px] max-w-[800px]">
          We're here to help with all your dairy and agricultural needs. Reach
          out to us for expert guidance and personalized solutions.
        </p>
      </div>
      <div className="relative z-10 pb-3  w-full md:w-1/2 flex justify-end items-end">
        <ContactComp />
      </div>
    </div>
  );
};

export default Contact;
