import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

const CarouselComponent = ({ carousalItems }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3, // Default on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // For tablets/laptops
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // For mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-containe " style={{ width: "80%", margin: "auto" }}>
      <Slider {...settings} className="">
        {(carousalItems.images).map((image, idx) => (
          <div key={idx}>
            <Card image={image} imgHeight="[400px]" noShadow={true}></Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
