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

      {/* 4. Partner Foundations */}
      <section className="py-24 px-6 md:px-12 bg-[#FCF9F2]">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center mb-20">
            <span className="font-display text-xs font-black uppercase tracking-widest text-brand-orange">
              OUR PARTNERSHIPS
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-brand-dark sm:text-4xl">
              FOUNDATIONS WE SUPPORT
            </h2>
            <p className="mx-auto mt-4 max-w-md font-body text-sm md:text-base text-brand-dark/60">
              We believe in active preservation. A percentage of our revenues goes directly to these global organizations doing critical field work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* Great Barrier Reef Foundation Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-brand-dark/10 bg-[#FAF6EE] shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Logo Header */}
              <div className="flex flex-col items-center justify-center bg-white py-10 px-6 text-center border-b border-brand-dark/5">
                <span className="font-display text-[9px] font-black uppercase tracking-[0.2em] text-brand-dark/40 mb-2 italic">
                  Supporting the
                </span>
                
                {/* Fish SVG Logo */}
                <div className="flex h-20 w-20 items-center justify-center text-[#00A86B] mb-4">
                  <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 50 C30 25, 70 25, 85 50 C70 75, 30 75, 15 50 Z" />
                    <path d="M85 50 L95 38 V62 Z" fill="currentColor" />
                    <path d="M22 50 C26 40, 36 32, 50 32" strokeWidth="1.5" strokeDasharray="3,3" />
                    <path d="M30 85 C32 75, 42 70, 48 78 C52 70, 60 74, 62 85" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 88 Q15 85 25 88 T45 88 T65 88 T85 88" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                
                <h3 className="font-display text-lg font-black uppercase text-brand-dark tracking-wide max-w-xs">
                  Great Barrier Reef Foundation
                </h3>
              </div>

              {/* Body */}
              <div className="flex-1 p-8 md:p-10 bg-brand-green/[0.03] flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-xl font-black uppercase text-brand-green mb-4">
                    Great Barrier Reef Foundation
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-brand-dark/70 mb-8">
                    The Great Barrier Reef Foundation partnership underscores our dedication to safeguarding one of the world's most remarkable marine ecosystems. By actively supporting reef restoration projects, we play a pivotal role in conserving marine biodiversity and promoting the long-term health of this vital natural wonder.
                  </p>

                  <h5 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark mb-4">
                    Our Contribution:
                  </h5>
                  <ul className="flex flex-col gap-3 font-body text-sm text-brand-dark/80 mb-8">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green mt-0.5">✔</span>
                      <span>Supporting coral restoration and regeneration projects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green mt-0.5">✔</span>
                      <span>Funding marine biodiversity conservation initiatives</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green mt-0.5">✔</span>
                      <span>Contributing to reef resilience research</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green mt-0.5">✔</span>
                      <span>Helping protect critical marine habitats - Promoting ocean health and ecosystem balance</span>
                    </li>
                  </ul>
                </div>

                {/* Why It Matters */}
                <div className="rounded-2xl bg-brand-green/10 border border-brand-green/20 p-6">
                  <h6 className="font-display text-xs font-black uppercase text-brand-green tracking-wider mb-2">
                    Why It Matters:
                  </h6>
                  <p className="font-body text-xs leading-relaxed text-brand-dark/70">
                    The Great Barrier Reef is home to thousands of marine species and plays a crucial role in ocean health. Our partnership helps ensure this natural wonder continues to thrive for future generations, while supporting the communities that depend on healthy reef ecosystems.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Black Jaguar Foundation Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-brand-dark/10 bg-[#FAF6EE] shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Logo Header */}
              <div className="flex flex-col items-center justify-center bg-white py-10 px-6 text-center border-b border-brand-dark/5">
                <span className="font-display text-[9px] font-black uppercase tracking-[0.2em] text-brand-dark/40 mb-2">
                  &nbsp;
                </span>
                
                {/* BJF SVG Logo */}
                <div className="flex h-20 w-20 items-center justify-center text-[#4B0082] mb-4">
                  <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M30 65 V50 C30 35, 40 25, 50 25 C60 25, 70 35, 70 50 V65" strokeLinecap="round" />
                    <path d="M48 25 C45 15, 38 12, 33 13 C28 17, 28 26, 33 34" strokeLinecap="round" />
                    <path d="M52 25 C55 15, 62 12, 67 13 C72 17, 72 26, 67 34" strokeLinecap="round" />
                    <circle cx="42" cy="45" r="2.5" fill="currentColor" />
                    <circle cx="58" cy="45" r="2.5" fill="currentColor" />
                    <path d="M47 52 L50 55 L53 52 Z" fill="currentColor" />
                    <path d="M50 65 V80" strokeWidth="3" strokeLinecap="round" />
                    <path d="M40 80 Q50 78 60 80" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                
                <h3 className="font-display text-lg font-black uppercase text-brand-dark tracking-wide max-w-xs">
                  Black Jaguar Foundation
                </h3>
              </div>

              {/* Body */}
              <div className="flex-1 p-8 md:p-10 bg-brand-purple/[0.03] flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-xl font-black uppercase text-brand-purple mb-4">
                    Black Jaguar Foundation
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-brand-dark/70 mb-8">
                    In alliance with the Black Jaguar Foundation, we contribute to the restoration and protection of the Amazon Rainforest and the Cerrado Savanna in Brazil. Together, we are championing climate action and fostering the thriving of these critical ecosystems, ensuring they continue to support life for centuries to come.
                  </p>

                  <h5 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark mb-4">
                    Our Contribution:
                  </h5>
                  <ul className="flex flex-col gap-3 font-body text-sm text-brand-dark/80 mb-8">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-purple mt-0.5">✔</span>
                      <span>Supporting reforestation of degraded Amazon areas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-purple mt-0.5">✔</span>
                      <span>Protecting jaguar corridors and wildlife habitats</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-purple mt-0.5">✔</span>
                      <span>Funding biodiversity conservation projects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-purple mt-0.5">✔</span>
                      <span>Contributing to climate action initiatives - Supporting indigenous communities and traditional knowledge</span>
                    </li>
                  </ul>
                </div>

                {/* Why It Matters */}
                <div className="rounded-2xl bg-brand-purple/10 border border-brand-purple/20 p-6">
                  <h6 className="font-display text-xs font-black uppercase text-brand-purple tracking-wider mb-2">
                    Why It Matters:
                  </h6>
                  <p className="font-body text-xs leading-relaxed text-brand-dark/70">
                    The Amazon Rainforest is the world's largest tropical rainforest and a critical carbon sink. The Cerrado Savanna is one of the most biodiverse regions on Earth. Our partnership helps restore these vital ecosystems while supporting the communities who call them home and protecting endangered species like the majestic black jaguar.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Certifications */}
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
