import React from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import HomePageStructure from './HomePageStructure'
import Carousel from './Carousel'
import MultiImageCarousel from './MultiImageCarousel'
import Footer from './Footer'
import HeroSection from './HeroSection '
import Categories from './Categories '
import Newsletter from './Newsletter '

const HomePage = () => {
    const categories = ["Lifestyle", "Travel", "Food", "Technology", "Health"];

  return (
    <div>
      <Carousel/>
     
      <MultiImageCarousel/>
?      <Newsletter />
      {/* <HeroSection/> */}
      <Footer/>
    </div>
  )
}

export default HomePage
