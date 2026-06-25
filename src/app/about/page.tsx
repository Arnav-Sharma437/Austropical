"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";
import MagneticButton from "@/components/ui/MagneticButton";

const solidColorBlurDataURL = 
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const TEAM = [
  { name: "Jack Harrison", role: "Co-Founder & CEO", emoji: "🏄‍♂️", color: "#FF6B00" },
  { name: "Mia Chen", role: "Head of Product & Flavours", emoji: "🥭", color: "#FF1493" },
  { name: "Kai Thompson", role: "Sourcing & Sustainability", emoji: "🌿", color: "#00A86B" }
];

const VALUES = [
  { icon: "🛡️", title: "100% Transparency", text: "We trace every ingredient back to its source, ensuring ethical, clean harvesting." },
  { icon: "🥥", title: "Plant-Powered Joy", text: "No dairy, no artificial junk. Just the absolute best that nature has to offer." },
  { icon: "🐨", title: "Australian Pride", text: "Hand-blended and packaged locally under solar-powered facility standards." }
];

const MILESTONES = [
  {
    year: "2018",
    title: "The Foundation",
    description: "Started as a small food truck on Bondi Beach, selling hand-blended acai bowls to local surfers.",
    side: "left"
  },
  {
    year: "2020",
    title: "Café Latte Launch",
    description: "Expanded our distribution to local health stores and launched our first Grab'n Go line.",
    side: "right"
  },
  {
    year: "Today",
    title: "The Sun-Chaser Collection",
    description: "Available nationwide with our 9 signature sorbets, smoothie cubes, and premium pops.",
    side: "left"
  }
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Calculate scroll progress for drawing the vertical line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-[#FCF9F2] min-h-screen text-brand-dark overflow-visible">
      
      {/* 1. Page Hero */}
      <section className="relative flex h-[60vh] min-h-[450px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-orange via-brand-pink to-brand-purple px-6 text-center">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="https://placehold.co/1920x1080/4B0082/FFFFFF?text=Austropical+Bondi"
          alt="Bondi Beach Sunrise"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-20 mx-auto max-w-4xl px-4">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-yellow drop-shadow-md">
            WHO WE ARE
          </span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-lg">
            OUR STORY
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/90 drop-shadow-md">
            Born on the Australian sand. Powered by Amazonian superfoods. Crafted for clean, bright, refreshing snack times.
          </p>
        </div>
      </section>

      {/* 2. Philosophy (Alternating Sections) */}
      <section id="philosophy" className="py-24 px-6 md:px-12 bg-[#FCF9F2]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            
            {/* Text */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <span className="font-display text-xs font-black uppercase tracking-widest text-brand-pink">
                OUR PHILOSOPHY
              </span>
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
                NATURE'S BRIGHTEST ENERGY
              </h2>
              <p className="mt-6 font-body text-sm md:text-base text-brand-dark/70 leading-relaxed">
                We believe that snacking shouldn't make you feel sluggish. Traditional ice creams are packed with dairy fat and processed sugar, leading to heavy crashes.
              </p>
              <p className="mt-4 font-body text-sm md:text-base text-brand-dark/70 leading-relaxed">
                By harnessing the natural creaminess of organic wild acai, coconuts, and ripe tropical fruits, we deliver the same premium velvety scoop without the dairy fog. It's clean fuel for active, sun-kissed lifestyles.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-brand-dark/10 bg-brand-dark/[0.02]"
            >
              <Image
                src="https://placehold.co/800x600/FF1493/FFFFFF?text=Austropical+Pulp"
                alt="Organic Acai Berries"
                fill
                placeholder="blur"
                blurDataURL={solidColorBlurDataURL}
                className="object-cover"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Timeline (Self-Drawing Line on Scroll) */}
      <section ref={timelineRef} className="relative py-24 px-6 md:px-12 bg-[#FAF6EE] border-y border-brand-dark/5">
        <div className="mx-auto max-w-3xl">
          
          <div className="text-center mb-20">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-orange">
              HOW WE GREW
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              THE JOURNEY SO FAR
            </h2>
          </div>

          <div className="relative mt-12 w-full">
            {/* Vertical Center Line */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-brand-dark/10" />
            
            {/* Scroll-Triggered Progress Line */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-brand-orange h-full"
            />

            {/* Milestones */}
            <div className="flex flex-col gap-16 md:gap-24">
              {MILESTONES.map((item, idx) => {
                const isLeft = item.side === "left";
                return (
                  <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 w-full items-center">
                    
                    {/* Circle Node */}
                    <div className="absolute left-1/2 top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FCF9F2] bg-brand-orange shadow-md shadow-brand-orange/40" />

                    {/* Milestone Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`flex flex-col items-start p-6 rounded-2xl border border-brand-dark/10 bg-white/80 shadow-lg shadow-brand-dark/[0.02] backdrop-blur-md max-w-sm w-full mx-auto ${
                        isLeft ? "md:mr-10" : "md:col-start-2 md:ml-10"
                      }`}
                    >
                      <span className="font-display text-2xl font-black text-brand-orange leading-none">
                        {item.year}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold uppercase text-brand-dark">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-body text-xs leading-relaxed text-brand-dark/60">
                        {item.description}
                      </p>
                    </motion.div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Values (3 cards) */}
      <section className="py-24 px-6 md:px-12 bg-[#FCF9F2]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-green">
              OUR STANDARDS
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              CORE VALUES
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-brand-dark/10 bg-[#FAF6EE] shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="text-4xl mb-4 select-none">{val.icon}</span>
                <h3 className="font-display text-lg font-black uppercase text-brand-dark">
                  {val.title}
                </h3>
                <p className="mt-2 font-body text-xs text-brand-dark/60 leading-relaxed">
                  {val.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section id="team" className="py-24 px-6 md:px-12 bg-[#FAF6EE] border-t border-brand-dark/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
              THE TEAM
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              MEET THE SUN-CHASERS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  y: -10,
                  borderColor: member.color,
                  boxShadow: `0 15px 30px -10px ${member.color}25`
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl border border-brand-dark/10 bg-white/70 shadow-md"
              >
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full text-5xl mb-6 shadow-2xl"
                  style={{ backgroundColor: `${member.color}20`, border: `2px border ${member.color}` }}
                >
                  {member.emoji}
                </div>
                <h3 className="font-display text-xl font-extrabold text-brand-dark uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 font-body text-xs font-bold text-brand-dark/50 uppercase tracking-widest">
                  {member.role}
                </p>
                <p className="mt-4 font-body text-xs text-brand-dark/60 leading-relaxed max-w-xs">
                  Passionate about active lifestyles, sustainable farming, and mixing the perfect tropical batch.
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-gradient-to-r from-brand-orange to-brand-pink py-20 text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            TASTE THE TROPICS.
          </h2>
          <p className="mt-4 text-white/90 font-body max-w-md mx-auto text-sm sm:text-base">
            Grab a tub or an ice pop line and feel the sun-kissed refreshment.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/products">
              <MagneticButton
                className="rounded-full bg-white px-8 py-4 font-display text-xs font-black uppercase tracking-wider text-brand-orange shadow-2xl hover:scale-105 transition-all"
                data-hover="true"
              >
                SHOP ALL FLAVOURS
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
