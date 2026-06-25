"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";
import MagneticButton from "@/components/ui/MagneticButton";

const PILLARS = [
  {
    icon: "📦",
    title: "100% Eco Packaging",
    text: "We completely reject petroleum plastics. Our containers are manufactured from cornstarch PLA and FSC certified paperboards, decomposing in standard composting facilities within 90 days."
  },
  {
    icon: "🤝",
    title: "Direct Ethical Sourcing",
    text: "By bypassing middlemen, we pay Amazonian farming families up to 35% above market rates. This stabilizes wild acai harvests, keeping ecosystems intact and preventing Amazon deforestation."
  },
  {
    icon: "🌸",
    title: "Community Regeneration",
    text: "A portion of every single Austropical sale goes directly to local forest regeneration. We work with Australian landcare programs to plant native shrubs, rebuilding biodiversity habitats."
  }
];

const CERTIFICATIONS = [
  { name: "Certified Organic", logo: "🟢" },
  { name: "100% Vegan Certified", logo: "🌿" },
  { name: "Fair For Life Trade", logo: "🤝" },
  { name: "Carbon Neutral Certified", logo: "🌎" }
];

// Interactive Counter Component
interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ value, duration = 1.2, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const totalSteps = 40;
    const increment = Math.ceil(end / totalSteps);
    const stepTime = (duration * 1000) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function SustainabilityPage() {
  const [heroImage, setHeroImage] = useState<string>("https://placehold.co/1920x1080/00A86B/FFFFFF?text=Austropical+Rainforest");

  useEffect(() => {
    async function loadHeroImage() {
      try {
        const res = await fetch("/api/page-assets?page=sustainability");
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          // Look for any file containing 'hero' or 'banner'
          const heroFile = data.files.find((file: string) => 
            file.toLowerCase().includes("hero") || file.toLowerCase().includes("banner")
          ) || data.files[0];
          
          if (heroFile) {
            setHeroImage(`/sustainability/${heroFile}`);
          }
        }
      } catch (err) {
        console.error("Failed to load sustainability hero image:", err);
      }
    }
    loadHeroImage();
  }, []);

  return (
    <div className="bg-[#FCF9F2] min-h-screen text-brand-dark overflow-visible">
      
      {/* 1. Page Hero */}
      <section className="relative flex h-[60vh] min-h-[450px] w-full items-center justify-center overflow-hidden bg-[#022115] px-6 text-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src={heroImage}
          alt="Rainforest canopy"
          fill
          priority
          className="object-cover opacity-60"
          unoptimized
        />
        <div className="relative z-20 mx-auto max-w-4xl px-4">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-green drop-shadow-md">
            SUSTAINABILITY
          </span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-lg">
            BETTER FOR EARTH
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/90 drop-shadow-md">
            Guilt-free bowls. Carbon-neutral manufacturing. FSC eco packaging. Discover how we're leaving the planet brighter.
          </p>
        </div>
      </section>

      {/* 2. Three Pillars */}
      <section className="py-24 px-6 md:px-12 bg-[#FCF9F2]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-orange">
              OUR THREE PILLARS
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              HOW WE MAKE A DIFFERENCE
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={{ y: -8 }}
                className="flex flex-col items-start p-8 rounded-2xl border border-brand-dark/10 bg-[#FAF6EE] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 border border-brand-green/20 text-3xl mb-6 select-none">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl font-black uppercase text-brand-dark tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/70">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Counter Section (scroll-triggered increment) */}
      <section className="py-24 px-6 md:px-12 bg-[#FAF6EE] border-y border-brand-dark/5">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center mb-16">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
              THE IMPACT NUMBERS
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              OUR PLANET NUMBERS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <span className="font-display text-5xl md:text-6xl font-black text-brand-green">
                <Counter value={100} suffix="%" />
              </span>
              <span className="mt-3 font-display text-xs font-black uppercase tracking-wider text-brand-dark/80">
                ECO BIODEGRADABLE TUBS
              </span>
              <p className="mt-2 font-body text-xs text-brand-dark/60 max-w-xs">
                Every bucket, pop sleeve, and shipping cup is built from 100% plant fiber.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <span className="font-display text-5xl md:text-6xl font-black text-brand-yellow">
                <Counter value={55} suffix="k+" />
              </span>
              <span className="mt-3 font-display text-xs font-black uppercase tracking-wider text-brand-dark/80">
                TREES PLANTED LOCALLY
              </span>
              <p className="mt-2 font-body text-xs text-brand-dark/60 max-w-xs">
                Planted in partner reforestation corridors across QLD and NSW.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <span className="font-display text-5xl md:text-6xl font-black text-brand-pink">
                <Counter value={120} suffix="+" />
              </span>
              <span className="mt-3 font-display text-xs font-black uppercase tracking-wider text-brand-dark/80">
                COOP FARMING PARTNERS
              </span>
              <p className="mt-2 font-body text-xs text-brand-dark/60 max-w-xs">
                Empowered farmers harvests wild acai across 15 pristine rainforest zones.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Certifications */}
      <section className="py-24 px-6 md:px-12 bg-[#FCF9F2]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-green">
              RECOGNISED GLOBAL STANDARDS
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              OUR TRUST CERTIFICATIONS
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-brand-dark/10 bg-[#FAF6EE] shadow-md"
              >
                <span className="text-4xl mb-4">{cert.logo}</span>
                <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark/80">
                  {cert.name}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Bottom Banner */}
      <section className="bg-gradient-to-r from-brand-green to-emerald-900 py-20 text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            SIPPED & SCOOPED CONSCIOUSLY.
          </h2>
          <p className="mt-4 text-white/90 font-body max-w-md mx-auto text-sm sm:text-base">
            Every bite supports carbon offset reforestation and fair harvesting.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/products">
              <MagneticButton
                className="rounded-full bg-white px-8 py-4 font-display text-xs font-black uppercase tracking-wider text-brand-green shadow-2xl hover:scale-105 transition-all"
                data-hover="true"
              >
                SUPPORT THE MISSION
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
