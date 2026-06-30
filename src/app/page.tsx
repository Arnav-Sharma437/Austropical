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

import { motion } from "framer-motion";

export default function Home() {
  const scrollReveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" as any }
  };

  return (
    <div className="overflow-visible bg-[#FDF6ED]">
      {/* SECTION 1: Hero */}
      <Hero />

      {/* SECTION 2: Our Finest Flavours (Product Carousel) */}
      <motion.div {...scrollReveal}>
        <FeaturedProducts />
      </motion.div>

      {/* SECTION 3: Feature Strip (4 columns) */}
      <motion.div {...scrollReveal}>
        <FeatureStrip />
      </motion.div>

      {/* SECTION 4: Crafted for the Sun-Chasers (Brand Story) */}
      <motion.div {...scrollReveal}>
        <OurStoryTeaser />
      </motion.div>

      {/* SECTION 5: Superfruits & Sorbets (Recipe Grid) */}
      <motion.div {...scrollReveal}>
        <RecipesGrid />
      </motion.div>

      {/* SECTION 6: Unmatched Excellence (Product Showcase) */}
      <motion.div {...scrollReveal}>
        <Showcase />
      </motion.div>

      {/* SECTION 7: Grab & Go Packs (Product Strip) */}
      <motion.div {...scrollReveal}>
        <GrabGoPacks />
      </motion.div>

      {/* SECTION 8: Newsletter CTA */}
      <motion.div {...scrollReveal}>
        <NewsletterCTA />
      </motion.div>
    </div>
  );
}
