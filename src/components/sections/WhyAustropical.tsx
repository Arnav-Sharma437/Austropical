"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariants } from "@/lib/animations";

const BENEFITS = [
  {
    icon: "🌿",
    title: "Zero Dairy",
    description: "Ultra-creamy texture made entirely from organic acai, super fruits, and rich coconut milk. 100% vegan.",
    glowColor: "#00A86B", // brand-green
  },
  {
    icon: "🚫",
    title: "Zero Sugar Added",
    description: "Naturally sweetened with real organic fruits and low-GI nectar. Absolutely no artificial sweeteners.",
    glowColor: "#FF1493", // brand-pink
  },
  {
    icon: "🔥",
    title: "Low Calories",
    description: "Indulge without the baggage. Average of 75-90 calories per serving so you can snack brighter daily.",
    glowColor: "#FF6B00", // brand-orange
  },
  {
    icon: "⭐",
    title: "Premium Taste",
    description: "Crafted to match high-end artisanal gelato standards, bringing you the authentic sun-kissed tropics.",
    glowColor: "#FFD700", // brand-yellow
  },
];

export default function WhyAustropical() {
  return (
    <section className="relative overflow-hidden bg-[#15002a] py-24 md:py-32">
      {/* Background radial ambient lights */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-pink">
            WHAT WE STAND FOR
          </span>
          <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            WHY AUSTROPICAL?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm md:text-base text-white/50">
            We've reinvented ice cream. Every tub is a booster pack of energy, vitamins, and tropical goodness.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariants}
              whileHover={{
                y: -10,
                borderColor: item.glowColor,
                boxShadow: `0 15px 35px -10px ${item.glowColor}30`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative flex flex-col items-start rounded-2xl border border-white/5 bg-white/[0.04] p-8 backdrop-blur-md transition-colors duration-300"
              style={{
                // Let's attach a custom property for hover-border glows
                "--glow-color": item.glowColor,
              } as React.CSSProperties}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-3xl select-none mb-6">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
