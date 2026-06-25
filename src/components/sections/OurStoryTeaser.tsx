"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

export default function OurStoryTeaser() {
  const [teaserImage, setTeaserImage] = useState<string>("https://placehold.co/800x600/4B0082/FFFFFF?text=Austropical+Spoon");

  useEffect(() => {
    async function loadTeaserImage() {
      try {
        const res = await fetch("/api/page-assets?page=about");
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          // Look for any file containing 'spoon', 'story', or 'teaser'
          const match = data.files.find((file: string) => 
            file.toLowerCase().includes("spoon") || 
            file.toLowerCase().includes("story") || 
            file.toLowerCase().includes("teaser")
          ) || data.files[0];
          
          if (match) {
            setTeaserImage(`/about/${match}`);
          }
        }
      } catch (err) {
        console.error("Failed to load teaser image:", err);
      }
    }
    loadTeaserImage();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FCF9F2] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Left Text: Slides from Left */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
              MADE IN AUSTRALIA
            </span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-tight tracking-tight text-brand-dark sm:text-5xl md:text-6xl">
              CRAFTED FOR THE<br />SUN-CHASERS
            </h2>
            
            <p className="mt-6 font-body text-sm md:text-base text-brand-dark/70 leading-relaxed">
              Austropical was born under the hot Australian sun. We wanted a snack that was as bright, refreshing, and clean as our beaches, without sacrificing the premium, creamy texture of traditional ice creams.
            </p>
            <p className="mt-4 font-body text-sm md:text-base text-brand-dark/70 leading-relaxed">
              We sourced the finest wild acai berries from the Amazon rainforest and combined them with local Australian mangoes, passionfruit, and strawberries to create the ultimate dairy-free tropical treat.
            </p>

            <Link href="/about" className="mt-8">
              <MagneticButton
                className="rounded-full bg-brand-dark px-8 py-4 font-display text-xs font-black uppercase tracking-wider text-white hover:bg-brand-orange hover:text-white hover:shadow-brand-orange/20"
                data-hover="true"
              >
                READ OUR STORY
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Right Image: Slides from Right */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[350px] w-full items-center justify-center sm:h-[450px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-orange/20 to-brand-pink/20 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-brand-dark/10 bg-brand-dark/[0.02]">
              <Image
                src={teaserImage}
                alt="Austropical Acai Scoop"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                unoptimized
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
