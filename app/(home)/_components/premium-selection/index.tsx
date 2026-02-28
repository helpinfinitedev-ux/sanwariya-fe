"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { fetchProducts } from "@/store/slices/products";

const PremiumSelection = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const items = useMemo(() => products.slice(0, 3), [products]);

  return (
    <div className="w-full h-auto flex items justify-center">
      <div className="main-container w-full flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 py-1 border-gold border-b-2 w-fit">
            <p className="font-bold text-[32px] sm:text-[40px] lg:text-[56px] py-1 w-fit tracking-[2px] lg:tracking-[3px] logo-gold-pressed">Premium </p>
            <p className="font-bold text-[32px] sm:text-[40px] lg:text-[56px] py-1 w-fit tracking-[2px] lg:tracking-[3px] logo-gold-pressed">Selection </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <div key={item.id} className="w-full h-auto rounded-xl p-4 sm:p-6 glass-card-gold flex flex-col gap-4">
              <div className="relative w-full min-h-72">
                <Image src={item.image} alt={item.name} fill className="w-full h-full object-cover object-top rounded-xl shadow-md" />
              </div>
              <div className="flex px-1 sm:px-2 flex-col gap-1 text-navy font-bold text-xl sm:text-2xl tracking-normal">
                <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <p>{item.name}</p>
                  <p className="logo-gold-pressed text-lg sm:text-xl font-semibold">
                    ₹ {item.price}/{item.unit}
                  </p>
                </div>
                <p className="text-navy font-normal text-sm tracking-normal">{item.description}</p>
              </div>
              <Button asChild className="gold-foil-btn cursor-pointer p-4 py-5 sm:py-6 text-lg sm:text-xl font-semibold rounded-3xl text-navy">
                <Link href={`/collections/${item.id}`}>Buy Now</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumSelection;
