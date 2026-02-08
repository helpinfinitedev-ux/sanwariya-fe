import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="main-container mx-auto mt-[48px]">
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
        </div>
        <div className="flex-1 justify-self-end mt-8">
          <Image src="/hero.png" alt="hero" width={800} height={800} className="object-cover justify-self-end rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
