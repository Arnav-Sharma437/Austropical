"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import MarqueeText from "@/components/ui/MarqueeText";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WalkingBanner from "@/components/sections/WalkingBanner";
import BannerMarquee from "@/components/sections/BannerMarquee";
import WhyAustropical from "@/components/sections/WhyAustropical";
import OurStoryTeaser from "@/components/sections/OurStoryTeaser";
import SustainabilitySection from "@/components/sections/Sustainability";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  const marqueeContent = "SUPERFOOD ICE CREAM • 100% VEGAN • GLUTEN FREE • CERTIFIED ORGANIC • ";

  return (
    <div className="overflow-visible">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. MarqueeText Strip (slanted, double rows) */}
      <div className="relative -my-6 z-20 overflow-hidden bg-brand-purple py-6 md:py-8 shadow-2xl scale-[1.05] -rotate-1 select-none">
        <div className="flex flex-col gap-2">
          {/* Row 1: Left scrolling */}
          <MarqueeText
            text={marqueeContent}
            speed={35}
            direction="left"
            textClassName="font-display text-lg sm:text-2xl md:text-3xl font-black uppercase text-white tracking-wider"
          />
          {/* Row 2: Right scrolling */}
          <MarqueeText
            text={marqueeContent}
            speed={40}
            direction="right"
            textClassName="font-display text-lg sm:text-2xl md:text-3xl font-black uppercase text-brand-yellow tracking-wider"
          />
        </div>
      </div>

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* Banner Marquee Section */}
      <BannerMarquee />

      {/* 4. Why Austropical */}
      <WhyAustropical />

      {/* 5. Our Story Teaser */}
      <OurStoryTeaser />

      {/* 6. Sustainability Section */}
      <SustainabilitySection />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. CTA Banner */}
      <CTABanner />

      {/* Animated Walking Banner */}
      <WalkingBanner />
    </div>
  );
}
