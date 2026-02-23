import React from "react";
import Hero from "./_components/hero";
import PremiumSelection from "./_components/premium-selection";
import Testimonials from "./_components/testimonials";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <PremiumSelection />
      <Testimonials />
    </div>
  );
};

export default Home;
