"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeatureStrip from "@/components/sections/FeatureStrip";
import OurStoryTeaser from "@/components/sections/OurStoryTeaser";
import RecipesGrid from "@/components/sections/RecipesGrid";
import Showcase from "@/components/sections/Showcase";
import GrabGoPacks from "@/components/sections/GrabGoPacks";
import NewsletterCTA from "@/components/sections/NewsletterCTA";

export default function Home() {
  return (
    <div className="overflow-visible bg-[#FDF6ED]">
      {/* SECTION 1: Hero */}
      <Hero />

      {/* SECTION 2: Our Finest Flavours (Product Carousel) */}
      <FeaturedProducts />

      {/* SECTION 3: Feature Strip (4 columns) */}
      <FeatureStrip />

      {/* SECTION 4: Crafted for the Sun-Chasers (Brand Story) */}
      <OurStoryTeaser />

      {/* SECTION 5: Superfruits & Sorbets (Recipe Grid) */}
      <RecipesGrid />

      {/* SECTION 6: Unmatched Excellence (Product Showcase) */}
      <Showcase />

      {/* SECTION 7: Grab & Go Packs (Product Strip) */}
      <GrabGoPacks />

      {/* SECTION 8: Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
}
