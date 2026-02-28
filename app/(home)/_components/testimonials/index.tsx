"use client";

import { useCallback, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { fetchTestimonials } from "@/store/slices/testimonials";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import TestimonialSwiper from "./testimonial-swiper";

const Testimonials = () => {
  const dispatch = useAppDispatch();
  const { testimonials, loading, error } = useAppSelector((state) => state.testimonials);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (!testimonials.length) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, testimonials.length]);

  const moveNext = () => {
    swiper?.slideNext();
  };

  const movePrev = () => {
    swiper?.slidePrev();
  };

  const handleSwiperReady = useCallback((instance: SwiperType) => {
    setSwiper(instance);
  }, []);

  return (
    <section className="w-full py-18">
      <div className="main-container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
          <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8 backdrop-blur-sm">
            {/* <Quote className="size-16 text-gold/45" strokeWidth={1.2} /> */}
            <h2 className="mt-6 text-4xl md:text-5xl leading-tight text-white font-sans font-bold">What Our Customers Are Saying</h2>
            <div className="mt-10 flex items-center gap-3">
              <Button type="button" variant="gold-outline" size="icon" onClick={movePrev} aria-label="Previous testimonials" disabled={testimonials.length <= 1}>
                <ArrowLeft />
              </Button>
              <div className="h-px w-28 bg-gold/30" />
              <Button type="button" variant="gold-outline" size="icon" onClick={moveNext} aria-label="Next testimonials" disabled={testimonials.length <= 1}>
                <ArrowRight />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-[340px] rounded-2xl bg-maroon/55" />
              ))}
            </div>
          ) : null}

          {!loading && error ? (
            <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8 text-beige">
              <p>{error}</p>
              <Button type="button" variant="gold-outline" className="mt-4" onClick={() => dispatch(fetchTestimonials())}>
                Retry
              </Button>
            </div>
          ) : null}

          {!loading && !error && !testimonials.length ? (
            <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8 text-beige">
              <p>No testimonials available at the moment.</p>
            </div>
          ) : null}

          {!loading && !error && testimonials.length ? <TestimonialSwiper testimonials={testimonials} onSwiperReady={handleSwiperReady} /> : null}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
