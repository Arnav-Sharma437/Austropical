"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeUpVariants } from "@/lib/animations";
import MagneticButton from "../ui/MagneticButton";
import TropicalBackground from "../ui/TropicalBackground";

const PILLARS = [
  {
    icon: "📦",
    title: "Eco Packaging",
    description: "Our tubs and grab'n go packaging are 100% plant-derived, biodegradable, or fully recyclable.",
  },
  {
    icon: "🤝",
    title: "Ethical Sourcing",
    description: "We source our acai directly from Amazonian cooperatives, ensuring fair wages and protecting wildlife.",
  },
  {
    icon: "🌱",
    title: "Carbon Neutral",
    description: "We calculate and offset 100% of our carbon emissions from rainforest harvests to Australian stores.",
  },
];

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax calculations based on scroll position of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <TropicalBackground color="green">
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-24 md:py-32 text-white"
      >
      {/* Parallax background light glow */}
      <motion.div
        style={{
          y: backgroundY,
          scale: glowScale,
        }}
        className="absolute left-[20%] top-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-brand-green/10 blur-[130px] pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-green">
            OUR PLANET MISSION
          </span>
          <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            BUILDING A BETTER<br />TOMORROW
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm md:text-base text-white/60">
            Austropical believes in doing good while tasting good. We're proud to lead the transition to sustainable ice creams.
          </p>
        </div>

        {/* Pillars Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariants}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 border border-brand-green/20 text-3xl mb-6 select-none shadow-inner">
                {pillar.icon}
              </div>
              <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
                {pillar.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link href="/sustainability">
            <MagneticButton
              className="rounded-full bg-brand-green px-8 py-4 font-display text-xs font-black uppercase tracking-wider text-white shadow-xl hover:bg-brand-green/95 hover:shadow-brand-green/20"
              data-hover="true"
            >
              LEARN ABOUT ECO INITIATIVES
            </MagneticButton>
          </Link>
        </motion.div>

      </div>
      </section>
    </TropicalBackground>
  );
}
