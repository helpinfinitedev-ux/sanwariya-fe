"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/services/testimonials/index.service";
import { StringFormatService } from "@/utils/StringFormat";

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

  const testimonialLocation = StringFormatService.capitalizeName(testimonial.customerLocation);
  const testimonialName = StringFormatService.capitalizeName(testimonial.customerName);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full bg-gold-gradient">
      <Card className="relative h-full border border-gold/20 bg-white py-0 text-maroon shadow-xl">
        <div className="p-4 px-8">
          <p className="text-[30px] leading-[44px] font-sans text-maroon">“{testimonial.message}”</p>
          <div className="mt-6 flex items-center gap-1 text-gold-primary">
            {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
              <Star key={starIndex} className="size-4 fill-current" />
            ))}
          </div>
        </div>

        <div className="absolute left-8 top-full -mt-px size-5 rotate-45 border-r border-b border-gold/20 bg-white/95" />

        <div className="flex items-center gap-3 p-8 pt-5">
          <Avatar size="lg">
            <AvatarFallback className="bg-maroon text-beige">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-2xl font-sans font-semibold leading-none text-maroon">{testimonialName}</p>
            <p className="mt-1 text-[20px] font-sans text-maroon/70">
              {testimonial.postedAt} • {testimonialLocation}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
