"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./navbar";

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [images, setImages] = useState<string[]>([]);
  const [scrollPos, setScrollPos] = useState(0); // Track scroll position

  const fetchHeroImages = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hero-images?populate[heroImages][fields][0]=url&populate[heroImages][fields][1]=alternativeText`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const imageUrls = data.data[0]?.heroImages.map((imgObj: any) => {
        console.log(imgObj);
        return imgObj.url;
      });

      setImages(imageUrls || []);
    } catch (error) {
      console.error("Error fetching hero images:", error);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPos(scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (inView) {
    controls.start("visible");
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  // Calculate zoom scale for the image container based on scroll
  const zoomScale = Math.max(1 - scrollPos / 1000, 0.8);

  return (
    <div>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>

      <div className="flex w-full items-center h-screen justify-center bg-[#A8CF45]">
        {/* Zoom effect applied to image container */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            transform: `scale(${zoomScale})`,
            transition: "transform 0.2s ease-out", // Smooth transition
            width: "96vw",
            height: "96vh",
          }}
        >
          {/* Slider */}
          {images.length > 0 ? (
            <Slider {...settings}>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex w-full h-screen justify-center items-center relative"
                >
                  <img
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover object-center"
                    style={{
                      borderRadius: "20px", // Adjust as needed
                      overflow: "hidden",
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>Loading images...</p>
          )}

          {/* Animated Text */}
          <motion.div
            className="absolute bg-black bg-opacity-30 top-0 left-0 w-full h-full flex px-8 md:px-20 xl:px-40"
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -100 },
            }}
            transition={{ duration: 1 }}
          >
            <div className="flex px-4 gap-[20px] flex-col w-full md:mt-20 justify-center items-start">
              <p className="text-white text-[36px]">
                <strong className="text-[#A8CF45] text-[36px]">SOLVE</strong> -
                Solutions for Livestock <br /> Value-added Enterprises
              </p>
              <p className="text-white w-[60%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci doloremque tempora quae, laborum sunt quam rerum magnam
                itaque impedit dolorem!
              </p>

              <a href="/projects">
                <button className="bg-LG text-white py-2 px-3 text-lg rounded-lg">
                  Explore More
                </button>
              </a>
            </div>
          </motion.div>

          {/* Bouncing Icon */}
          <div className="absolute bottom-10 w-full flex animate-bounce justify-center items-center">
            <BsChevronCompactDown className="text-white text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
