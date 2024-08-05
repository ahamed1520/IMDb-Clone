import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import data from "../Assets/MockData.json";

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {data.map((slides) => {
        return (
          <SwiperSlide key={slides.id}>
            <img
              src={slides.image}
              alt={slides.title}
              className="h-[20vh] md:h-[80vh] w-[100%] small-screen:h-[50vh] tablet-screen:h-[80vh]"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
