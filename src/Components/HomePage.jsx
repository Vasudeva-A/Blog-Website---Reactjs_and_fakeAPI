import React from "react";
import Carousel from "./Carousel";
import MultiImageCarousel from "./MultiImageCarousel";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import Newsletter from "./Newsletter";

const HomePage = () => {
  const categories = ["Lifestyle", "Travel", "Food", "Technology", "Health"];

  return (
    <div>
      <Carousel />

      <MultiImageCarousel />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
