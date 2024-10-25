import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";

const Partners: React.FC = () => {
  const imageArray = [
    "/partners/test1.jpg",
    "/partners/test2.jpg",
    "/partners/test3.jpg",
    "/partners/test4.jpg",
    "/partners/test5.jpg",
    "/partners/test6.jpg",
  ];

  const [slidesToShow, setSlidesToShow] = useState<number>(6);
  const [activeSlide, setActiveSlide] = useState<number>(0); // Track the active slide

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth > 768 ? 6 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,

    // Properly typed event parameters
    beforeChange: (current: number, next: number) => setActiveSlide(next),

    // Custom dot pagination with dashes
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "8px",
        }}
      >
        {dots}
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "30px",
          height: "3px",
          backgroundColor: activeSlide === i ? "#000" : "#CCCDCF",
          borderRadius: "5px",
          transition: "all 0.3s ease-in-out",
        }}
      />
    ),
  };

  return (
    <Slider {...settings}>
      {imageArray.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`partner ${index + 1}`}
            className="object-cover h-40 mx-auto"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Partners;
