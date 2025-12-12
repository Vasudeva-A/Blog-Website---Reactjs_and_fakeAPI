import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import DescriptionCard from "./DescriptionCard"; // import your component
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const MultiImageCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "30px",
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 600, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "15px",
        },
      },
    ],
  };

  const data = [
    { id: 1, img: "https://picsum.photos/id/1015/600/400", title: "Mountain View", desc: "Beautiful nature scenery with fresh air and peaceful environment. A perfect spot to relax and enjoy nature." },
    { id: 2, img: "https://picsum.photos/id/1016/600/400", title: "Forest Path", desc: "A calm and green forest walk path where you can feel the breeze and the sound of birds." },
    { id: 3, img: "https://picsum.photos/id/1018/600/400", title: "City Lights", desc: "Night view of the city with glowing lights and beautiful skyscrapers." },
    { id: 4, img: "https://picsum.photos/id/1020/600/400", title: "River Side", desc: "Relaxing river side view with cool wind and peaceful sound of flowing water." },
    { id: 5, img: "https://picsum.photos/id/1024/600/400", title: "Sunset Beach", desc: "Golden sunset view on the beach with calm waves." },
    { id: 6, img: "https://picsum.photos/id/1027/600/400", title: "Snowy Mountains", desc: "Snow-covered mountains with a serene atmosphere." },
  ];

  return (
    <Box sx={{ width: { xs: "95%", sm: "90%", md: "1000px" }, margin: "auto", borderRadius: 4 }}>
      <Slider {...settings}>
        {data.map((item) => (
          <Box key={item.id} px={1}>
            <DescriptionCard item={item} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MultiImageCarousel;

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIos
      onClick={onClick}
      className={className}
      style={{ right: "-15px", zIndex: 10, cursor: "pointer", color: "#1976d2", fontSize: "22px" }}
    />
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIos
      onClick={onClick}
      className={className}
      style={{ left: "-15px", zIndex: 10, cursor: "pointer", color: "#1976d2", fontSize: "22px" }}
    />
  );
}
