import { Button } from "@/components/ui/button";
import React from "react";

const PremiumSelection = () => {
  const items = [
    {
      id: 1,
      image: "/premium-selection/1.png",
      description: "Premium Selection 1 description",
      title: "Premium Selection 1",
      price: 100,
    },
    {
      id: 2,
      image: "/premium-selection/2.png",
      description: "Premium Selection 2 description",
      title: "Premium Selection 2",
      price: 200,
    },
    {
      id: 3,
      image: "/premium-selection/3.png",
      description: "Premium Selection 3 description",
      title: "Premium Selection 3",
      price: 300,
    },
  ];

  return (
    <div className="w-full h-auto flex items-center justify-center">
      <div className="main-container flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 py-1 border-gold border-b-2 w-fit">
            <p className="font-bold text-[32px] sm:text-[40px] lg:text-[56px] py-1 w-fit tracking-[2px] lg:tracking-[3px] logo-gold-pressed">
              Premium{" "}
            </p>
            <p className="font-bold text-[32px] sm:text-[40px] lg:text-[56px] py-1 w-fit tracking-[2px] lg:tracking-[3px] logo-gold-pressed">
              Selection{" "}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full h-auto rounded-xl p-4 sm:p-6 glass-card-gold flex flex-col gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
              <div className="flex px-1 sm:px-2 flex-col gap-1 text-navy font-bold text-xl sm:text-2xl tracking-normal">
                <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <p>{item.title}</p>
                  <p className="logo-gold-pressed text-lg sm:text-xl font-semibold">
                    ₹ {item.price}/kg
                  </p>
                </div>
                <p className="text-navy font-normal text-sm tracking-normal">
                  {item.description}
                </p>
              </div>
              <Button className="gold-foil-btn cursor-pointer p-4 py-5 sm:py-6 text-lg sm:text-xl font-semibold rounded-3xl text-navy">
                Buy Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumSelection;
