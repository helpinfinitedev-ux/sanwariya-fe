"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderProps {
  items: { component: React.ReactNode }[];
}

const Slider = ({ items }: SliderProps) => {
  return (
    <div className="custom-slider w-full py-4 sm:py-6 lg:py-8 mt-4 lg:mt-8">
      <Swiper
        modules={[Navigation, Pagination, FreeMode, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        className="flex items-center justify-center w-full max-w-full lg:max-w-[700px]"
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center"
          >
            <div className="bg-transparent flex justify-center items-center rounded-xl">
              {item.component}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .custom-slider .swiper-slide {
          width: 100% !important;
        }
        .custom-slider .swiper-button-next,
        .custom-slider .swiper-button-prev {
          color: #000;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .custom-slider .swiper-button-next:after,
        .custom-slider .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .custom-slider .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
      `}</style>
    </div>
  );
};

export default Slider;
