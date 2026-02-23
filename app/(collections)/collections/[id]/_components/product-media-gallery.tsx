"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProductMediaGalleryProps {
  name: string;
  heroImage: string;
  altImages: string[];
}

const ProductMediaGallery = ({
  name,
  heroImage,
  altImages,
}: ProductMediaGalleryProps) => {
  const images = useMemo(
    () => [heroImage, ...altImages].slice(0, 4),
    [heroImage, altImages]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3200);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length, isPaused]);

  const displayIndex = images.length > 0 ? activeIndex % images.length : 0;
  const activeImage = images[displayIndex] ?? heroImage;

  return (
    <div>
      <div
        className="relative h-[580px] overflow-hidden rounded-2xl border border-gold/20 bg-maroon/40"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.03, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt={name}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, index) => {
          const isActive = displayIndex === index;

          return (
            <Button
              key={`${image}-${index}`}
              type="button"
              variant="ghost"
              className={`relative h-24 w-full overflow-hidden rounded-xl border p-0 ${
                isActive
                  ? "border-gold bg-maroon/70"
                  : "border-gold/20 bg-maroon/40 hover:bg-maroon/70"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image}
                alt={`${name} preview ${index + 1}`}
                fill
                className="object-cover"
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductMediaGallery;
