"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderProps {
  items: { component: React.ReactNode }[];
}

const Slider = ({ items }: SliderProps) => {
  return (
    <div className="w-full py-8 mt-8">
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
        // navigation={true}
        // pagination={{ clickable: true, dynamicBullets: true }}
        className="flex items-center justify-center max-w-[700px]">
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center !max-w-[700px]">
            <div className="bg-transparent flex justify-center items-center rounded-xl">{item.component}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Ensure each slide takes full width */
        .swiper-slide {
          width: 100% !important;
        }
        /* Customizing Swiper navigation arrows to look cleaner */
        .swiper-button-next,
        .swiper-button-prev {
          color: #000;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
      `}</style>
    </div>
  );
};

export default Slider;
