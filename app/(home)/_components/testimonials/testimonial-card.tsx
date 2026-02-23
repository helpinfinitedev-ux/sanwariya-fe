"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/services/testimonials/index.service";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const initials = testimonial.customerName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="relative h-full border border-gold/20 bg-white/95 py-0 text-maroon shadow-xl">
        <div className="p-8">
          <p className="text-[30px] leading-[44px] font-sans text-maroon">
            “{testimonial.message}”
          </p>
          <div className="mt-6 flex items-center gap-1 text-emerald-500">
            {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
              <Star key={starIndex} className="size-4 fill-current" />
            ))}
          </div>
        </div>

        <div className="absolute left-8 top-full -mt-px size-5 rotate-45 border-r border-b border-gold/20 bg-white/95" />

        <div className="flex items-center gap-3 p-8 pt-5">
          <Avatar size="lg">
            <AvatarFallback className="bg-maroon text-beige">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[30px] font-sans font-semibold leading-none text-maroon">
              {testimonial.customerName}
            </p>
            <p className="mt-1 text-[20px] font-sans text-maroon/70">
              {testimonial.postedAt} • {testimonial.location}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
