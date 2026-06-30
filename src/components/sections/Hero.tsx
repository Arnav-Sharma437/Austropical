"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Leaf, Shield } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";

export default function Hero() {
  const scrollToFlavours = () => {
    const section = document.getElementById("finest-flavours");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#FF8C2E] to-[#FF4F8B] pt-24 lg:pt-32">
      {/* Scattered Floating Fruits & Leaves */}
      <div className="absolute top-[10%] left-[5%] opacity-20 pointer-events-none select-none z-10 animate-pulse">
        <Image src="/fruits/leaf.png" alt="Leaf" width={100} height={100} className="w-16 h-16 object-contain" />
      </div>
      <div className="absolute top-[15%] right-[8%] opacity-20 pointer-events-none select-none z-10">
        <Image src="/fruits/leaf.png" alt="Leaf" width={100} height={100} className="w-20 h-20 object-contain rotate-90" />
      </div>
      <div className="absolute bottom-[20%] left-[4%] pointer-events-none select-none z-10 hover:scale-110 transition-transform">
        <Image src="/fruits/strawberry.png" alt="Strawberry" width={120} height={120} className="w-24 h-24 object-contain" />
      </div>
      <div className="absolute top-[35%] left-[2%] opacity-80 pointer-events-none select-none z-10 animate-bounce">
        <Image src="/fruits/blueberry.png" alt="Blueberry" width={50} height={50} className="w-10 h-10 object-contain" />
      </div>
      <div className="absolute bottom-[35%] right-[2%] opacity-90 pointer-events-none select-none z-10">
        <Image src="/fruits/blueberry.png" alt="Blueberry" width={60} height={60} className="w-12 h-12 object-contain" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 lg:pb-0">
          
          {/* Left Text Column */}
          <div className="flex flex-col items-start lg:col-span-6 mt-8 lg:mt-0">
            {/* Top Ribbon Shape Badge */}
            <div className="bg-[#2D1B4E] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-2 rounded-md mb-6 shadow-md relative flex items-center">
              <span className="relative z-10">REAL FRUIT, REAL GOODNESS</span>
              <div className="absolute top-0 right-full h-full w-2 bg-[#2D1B4E] origin-right skew-y-12" />
            </div>

            {/* Headline */}
            <h1 className="flex flex-col text-left font-display font-black leading-none tracking-tight select-none">
              <span className="text-[75px] sm:text-[100px] md:text-[120px] text-white">AÇAÍ</span>
              <span className="text-[55px] sm:text-[75px] md:text-[90px] text-[#2D1B4E]">SUPERFOOD</span>
              <span className="text-[45px] sm:text-[60px] md:text-[70px] text-white">ICE CREAM</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-white text-sm sm:text-base leading-relaxed max-w-md font-medium font-body opacity-95">
              Made with real Açaí berries and other superfoods. Rich in nutrients, full of flavour and made for a healthier you.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={scrollToFlavours}
                className="bg-[#2D1B4E] text-white hover:bg-opacity-90 font-display text-[11px] font-black uppercase tracking-wider rounded-full px-8 py-4 shadow-xl active:scale-95 transition-all"
              >
                SHOP FLAVOURS
              </button>
              <Link href="/about">
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#FF4F8B] font-display text-[11px] font-black uppercase tracking-wider rounded-full px-8 py-4 active:scale-95 transition-all">
                  LEARN MORE
                </button>
              </Link>
            </div>

            {/* Bottom 3 Trust Icons */}
            <div className="mt-10 pt-6 border-t border-white/20 w-full flex flex-wrap gap-6 text-white select-none">
              <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider">
                <Leaf size={16} className="text-[#2D1B4E]" />
                <span>100% Vegan</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider">
                <Shield size={16} className="text-[#2D1B4E]" />
                <span>Gluten Free</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider">
                <Award size={16} className="text-[#2D1B4E]" />
                <span>Certified Organic</span>
              </div>
            </div>

          </div>

          {/* Right Product & Bowl Column */}
          <div className="relative lg:col-span-6 flex justify-center items-end h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            
            {/* Spinning Badge 1: Loaded with Superfoods */}
            <div className="absolute top-[10%] right-[5%] z-30 select-none animate-[spin_20s_linear_infinite] w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <path id="text-path-superfoods" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <circle cx="50" cy="50" r="28" fill="#2D1B4E" />
                <text className="font-display font-black uppercase tracking-widest text-[8.5px]" fill="#FFF">
                  <textPath href="#text-path-superfoods" startOffset="0%">
                    LOADED WITH • SUPERFOODS • 
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Spinning Badge 2: Certified Organic */}
            <div className="absolute top-[30%] left-[2%] z-30 select-none animate-[spin_25s_linear_infinite] w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="text-path-organic" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <circle cx="50" cy="50" r="28" fill="#00A86B" />
                <text className="font-display font-black uppercase tracking-widest text-[7px]" fill="#FFF">
                  <textPath href="#text-path-organic" startOffset="0%">
                    CERTIFIED • ORGANIC • 
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Main Product Package WebP Illustration (Tubs + Bowl) */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[95%] flex items-end justify-center z-20"
            >
              <Image 
                src="/hero/toon-1.webp" 
                alt="Austropical Acai Bowl & Premium Tubs" 
                fill 
                className="object-contain object-bottom select-none pointer-events-none drop-shadow-[0_25px_30px_rgba(0,0,0,0.35)]" 
                priority
              />
            </motion.div>

          </div>

        </div>
      </div>

      {/* S-Curve Wave Divider transitioning to Section 2 background (#FDF6ED) */}
      <div className="relative z-20 mt-[-10px] lg:mt-[-40px]">
        <WaveDivider fromColor="transparent" toColor="#FDF6ED" />
      </div>
    </div>
  );
}
