"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import TestimonialCard from "./testimonial-card";
import type { Testimonial } from "@/services/testimonials/index.service";

interface TestimonialSwiperProps {
  testimonials: Testimonial[];
  onSwiperReady?: (swiper: SwiperType) => void;
}

const TestimonialSwiper = ({ testimonials, onSwiperReady }: TestimonialSwiperProps) => {
  return (
    <Swiper
      modules={[Autoplay, A11y]}
      onSwiper={onSwiperReady}
      slidesPerView={1}
      spaceBetween={24}
      loop={testimonials.length > 2}
      autoplay={
        testimonials.length > 1
          ? {
              delay: 4200,
              disableOnInteraction: false,
            }
          : false
      }
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
      className="w-full">
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={`${testimonial.id}-${index}`} className="h-auto">
          <TestimonialCard testimonial={testimonial} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSwiper;
