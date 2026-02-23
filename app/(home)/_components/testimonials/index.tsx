"use client";

import { useEffect, useMemo, useState } from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { fetchTestimonials } from "@/store/slices/testimonials";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  const dispatch = useAppDispatch();
  const { testimonials, loading, error } = useAppSelector(
    (state) => state.testimonials
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const visibleCards = useMemo(() => {
    if (!testimonials.length) {
      return [];
    }

    const nextIndex = (activeIndex + 1) % testimonials.length;
    return testimonials.length === 1
      ? [testimonials[activeIndex]]
      : [testimonials[activeIndex], testimonials[nextIndex]];
  }, [activeIndex, testimonials]);

  const moveNext = () => {
    if (testimonials.length <= 1) {
      return;
    }
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const movePrev = () => {
    if (testimonials.length <= 1) {
      return;
    }
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-18">
      <div className="main-container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
          <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8 backdrop-blur-sm">
            <Quote className="size-16 text-gold/45" strokeWidth={1.2} />
            <h2 className="mt-6 text-4xl md:text-5xl leading-tight text-white font-sans font-bold">
              What Our Customers Are Saying
            </h2>
            <div className="mt-10 flex items-center gap-3">
              <Button
                type="button"
                variant="gold-outline"
                size="icon"
                onClick={movePrev}
                aria-label="Previous testimonials"
              >
                <ArrowLeft />
              </Button>
              <div className="h-px w-28 bg-gold/30" />
              <Button
                type="button"
                variant="gold-outline"
                size="icon"
                onClick={moveNext}
                aria-label="Next testimonials"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[340px] rounded-2xl bg-maroon/55"
                />
              ))}
            </div>
          ) : null}

          {!loading && error ? (
            <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8 text-beige">
              <p>{error}</p>
              <Button
                type="button"
                variant="gold-outline"
                className="mt-4"
                onClick={() => dispatch(fetchTestimonials())}
              >
                Retry
              </Button>
            </div>
          ) : null}

          {!loading && !error && !testimonials.length ? (
            <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8 text-beige">
              <p>No testimonials available at the moment.</p>
            </div>
          ) : null}

          {!loading && !error && testimonials.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {visibleCards.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${activeIndex}-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

