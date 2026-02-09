import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import React from "react";

const imageClassName = "object-contain w-full h-full rounded-xl";

const Hero = () => {
  const items = [
    {
      component: (
        <div className="w-[680px] h-[580px] flex items-center justify-center overflow-hidden rounded-xl">
          <img src="/hero4.png" alt="hero" className={imageClassName} />
        </div>
      ),
    },
    {
      component: (
        <div className="w-[680px] h-[480px] mt-[50px] flex items-center justify-center overflow-hidden rounded-xl">
          <img src="/hero.png" alt="hero" className={imageClassName} />
        </div>
      ),
    },
    {
      component: (
        <div className="w-[780px] h-[520px] mt-[10px] flex items-center justify-center overflow-hidden rounded-xl">
          <img src="/hero1.png" alt="hero" className={imageClassName} />
        </div>
      ),
    },
  ];
  return (
    <div className="main-container mx-auto mt-[12px] overflow-hidden">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex flex-col gap-4 flex-1">
          <div className="logo-gold-pressed text-[18px] border-b-2 border-gold tracking-[6px] py-[8px] my-8 w-fit font-semibold ml-4">Master Confectionars</div>

          <div className="flex flex-col gap-8 flex-1  font-bold">
            <p className="text-[96px] leading-[80px] text-[#d6c4a8]">Feel The Taste</p>
            <p className="text-[120px] leading-[106px] logo-gold-pressed">Of Tradition</p>
          </div>
          <div>
            <p className="text-xl text-[#F5DAA7] font-semibold py-8 tracking-[2px] leading-[32px]">
              Experience the zenith of Indian heritage sweets. Each piece is a masterpiece of gold-pressed elegance and authentic flavor
            </p>
          </div>
          <div>
            <Button className="text-xl text-navy font-semibold p-6 -mt-6 px-10">Buy Now</Button>
          </div>
        </div>
        <div className="flex-1 justify-self-end flex items-center justify-center mt-8">
          <Slider items={items} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
