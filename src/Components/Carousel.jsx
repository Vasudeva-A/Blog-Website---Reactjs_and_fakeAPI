import React from "react";
import Slider from "react-slick";
import Navbar from "./Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import HomePageStructure from "./HomePageStructure";

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    arrows: false,
  };

  return (
    <div className="hero-carousel">
      {/* NAVBAR OVERLAY */}
      

      <Slider {...settings}>
        <HomePageStructure/>
        

       
      </Slider>
    </div>
  );
};

export default HeroCarousel;
