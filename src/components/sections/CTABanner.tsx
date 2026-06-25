"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import TropicalBackground from "../ui/TropicalBackground";

export default function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate diagonal parallax movement
  const textX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <TropicalBackground color="pink">
      <section
        ref={containerRef}
        className="relative overflow-hidden py-32 text-center text-white"
      >

      {/* Decorative Parallax Text in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-5 pointer-events-none select-none">
        <motion.div
          style={{ x: textX }}
          className="font-display text-[22vw] font-black leading-none uppercase tracking-tighter whitespace-nowrap"
        >
          AUSTROPICAL AUSTROPICAL
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-yellow drop-shadow-sm">
          REFRESHMENT AWAITS
        </span>
        <h2 className="mt-4 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-md">
          TASTE THE TROPICS.
        </h2>
        <p className="mx-auto mt-6 max-w-md font-body text-base md:text-lg text-white/90 leading-relaxed drop-shadow-sm">
          Shop Australia's premium dairy-free superfood ice cream. Bursting with real fruits and clean tropical energy.
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/products">
            <MagneticButton
              className="rounded-full bg-white px-10 py-5 font-display text-sm font-black uppercase tracking-wider text-brand-orange shadow-2xl hover:scale-105 transition-all"
              data-hover="true"
            >
              SHOP NOW
            </MagneticButton>
          </Link>
        </div>
      </div>
      </section>
    </TropicalBackground>
  );
}
