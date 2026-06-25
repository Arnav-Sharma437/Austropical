"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import TropicalBackground from "../ui/TropicalBackground";
import SpinningBadges from "../ui/SpinningBadge";

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// Decorative floaters with slight drift animation
const floatingElements = [
  { emoji: "🌿", className: "top-[15%] left-[8%] text-4xl opacity-60", delay: 0, duration: 5 },
  { emoji: "🍍", className: "top-[65%] left-[5%] text-5xl opacity-40", delay: 1.5, duration: 6 },
  { emoji: "🥭", className: "top-[20%] right-[10%] text-4xl opacity-50", delay: 0.8, duration: 5.5 },
  { emoji: "🥥", className: "bottom-[15%] right-[12%] text-5xl opacity-45", delay: 2, duration: 7 },
  { emoji: "🍃", className: "bottom-[20%] left-[25%] text-3xl opacity-30", delay: 1.2, duration: 4.8 },
];

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("featured-flavours");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <TropicalBackground color="orange">
      <section data-cursor-theme="purple" className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pt-24 md:px-12 lg:px-24">
      
      {/* Wave Overlay Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C15,80 35,80 50,100 C65,120 85,120 100,100 L100,100 L0,100 Z" fill="#000" />
        </svg>
      </div>

      {/* Floating Tropical Elements */}
      {floatingElements.map((item, idx) => (
        <motion.div
          key={idx}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          className={`absolute pointer-events-none select-none ${item.className}`}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        
        {/* Left Side: Staggered Typography and CTAs */}
        <div className="flex flex-col items-start lg:col-span-7">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1 className="hero-heading flex flex-col">
              <motion.span variants={wordVariants} className="block">AUSTRALIA'S</motion.span>
              <motion.span variants={wordVariants} className="block text-brand-yellow drop-shadow-md">BRIGHTER</motion.span>
              <motion.span variants={wordVariants} className="block">SNACK CHOICE</motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 max-w-lg font-body text-base md:text-lg text-white/90 leading-relaxed drop-shadow-sm"
          >
            Premium, vibrant, acai and tropical superfood ice cream built for sun-chasers. Made in Australia, 100% plant-powered, zero dairy, and pure joy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 120 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/products">
              <MagneticButton
                className="rounded-full bg-white px-8 py-4 font-display text-sm font-black uppercase tracking-wider text-brand-orange shadow-2xl hover:shadow-white/20 transition-all hover:scale-105"
                data-hover="true"
              >
                SHOP NOW
              </MagneticButton>
            </Link>
            <Link href="/about">
              <MagneticButton
                className="rounded-full border-2 border-white/40 px-8 py-4 font-display text-sm font-black uppercase tracking-wider text-white hover:border-white hover:bg-white/10 transition-all hover:scale-105"
                data-hover="true"
              >
                OUR STORY
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Floating Product Image & Spinning Badges */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px]">
            
            {/* 6 Custom CSS Keyframe Spinning Badges */}
            <SpinningBadges />

            {/* Floating Product Image Container */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full w-full flex items-center justify-center"
            >
              <div className="absolute h-[80%] w-[80%] rounded-full bg-white/5 blur-3xl pointer-events-none" />
              <Image
                src="https://placehold.co/600x600/4B0082/FFFFFF?text=Austropical+Acai"
                alt="Austropical Acai Bowl Product Mockup"
                width={400}
                height={400}
                className="relative z-10 object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.5)] select-none pointer-events-none"
                priority
              />
            </motion.div>

          </div>
        </div>

      </div>

      {/* Scroll Down Arrow Indicator */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-1 select-none">
        <span className="font-display text-[10px] font-bold tracking-widest text-white/50 uppercase">
          SCROLL DOWN
        </span>
        <motion.button
          onClick={scrollToProducts}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          data-hover="true"
        >
          <ArrowDown size={16} />
        </motion.button>
      </div>

    </section>
    </TropicalBackground>
  );
}
