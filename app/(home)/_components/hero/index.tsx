import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const imageClassName = "object-contain w-full h-full rounded-xl";

const Hero = () => {
  const items = [
    {
      component: (
        <div className="w-full max-w-[680px] h-[260px] sm:h-[380px] lg:h-[580px] flex items-center justify-center overflow-hidden rounded-xl">
          <img src="/hero4.png" alt="hero" className={imageClassName} />
        </div>
      ),
    },
    {
      component: (
        <div className="w-full max-w-[680px] h-[260px] sm:h-[340px] lg:h-[480px] sm:mt-[30px] lg:mt-[50px] flex items-center justify-center overflow-hidden rounded-xl">
          <img src="/hero.png" alt="hero" className={imageClassName} />
        </div>
      ),
    },
    {
      component: (
        <div className="w-full max-w-[780px] h-[260px] sm:h-[360px] lg:h-[520px] sm:mt-[10px] flex items-center justify-center overflow-hidden rounded-xl">
          <img src="/hero1.png" alt="hero" className={imageClassName} />
        </div>
      ),
    },
  ];

  return (
    <div className="main-container mx-auto mt-2 lg:mt-[12px] overflow-hidden">
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-0">
        {/* Text content */}
        <div className="flex flex-col gap-3 sm:gap-4 flex-1 text-center lg:text-left">
          <div className="logo-gold-pressed text-[13px] sm:text-[16px] lg:text-[18px] border-b-2 border-gold tracking-[4px] lg:tracking-[6px] py-[6px] lg:py-[8px] my-4 lg:my-8 w-fit font-semibold mx-auto lg:mx-0 lg:ml-4">
            Master Confectionars
          </div>

          <div className="flex flex-col gap-3 sm:gap-5 lg:gap-8 flex-1 font-bold">
            <p className="text-[36px] sm:text-[56px] lg:text-[96px] leading-[34px] sm:leading-[52px] lg:leading-[80px] text-[#d6c4a8]">Feel The Taste</p>
            <p className="text-[42px] sm:text-[68px] lg:text-[120px] leading-[40px] sm:leading-[64px] lg:leading-[106px] logo-gold-pressed">Of Tradition</p>
          </div>

          <div>
            <p className="text-sm sm:text-base lg:text-xl text-[#F5DAA7] font-semibold py-4 lg:py-8 tracking-[1px] lg:tracking-[2px] leading-[22px] sm:leading-[26px] lg:leading-[32px] max-w-lg mx-auto lg:mx-0">
              Experience the zenith of Indian heritage sweets. Each piece is a masterpiece of gold-pressed elegance and authentic flavor
            </p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Link href="/collections">
              <Button className="text-base lg:text-xl text-navy font-semibold p-4 lg:p-6 px-8 lg:px-10">Buy Now</Button>
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="flex-1 w-full flex items-center justify-center mt-4 lg:mt-8">
          <Slider items={items} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
