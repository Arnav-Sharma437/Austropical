'use client'

import React from 'react'
import Image from 'next/image'
import { Check, Globe, Heart } from 'lucide-react'
import WaveDivider from '../ui/WaveDivider'

export default function Showcase() {
  return (
    <section className="relative bg-[#2D1B4E] pt-20 pb-0 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Product Trio & Pedestal - 6 cols) */}
          <div className="relative lg:col-span-6 flex flex-col items-center justify-center h-[350px] sm:h-[450px]">
            
            {/* SVG Arched Text "UNMATCHED EXCELLENCE" */}
            <div className="absolute top-[0px] w-full max-w-[320px] h-20 z-30 select-none">
              <svg viewBox="0 0 300 100" className="w-full h-full">
                <path id="curve-showcase" d="M 30,90 Q 150,20 270,90" fill="transparent" />
                <text className="font-display font-black text-[12px] uppercase tracking-[0.25em]" fill="#FFFFFF">
                  <textPath href="#curve-showcase" startOffset="50%" textAnchor="middle">
                    UNMATCHED EXCELLENCE
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Pedestal Ellipse */}
            <div className="absolute bottom-[30px] w-[80%] max-w-[280px] h-[35px] bg-white/10 rounded-full blur-sm z-10" />

            {/* Product Trio Mockup */}
            <div className="relative w-full max-w-[350px] h-[80%] flex items-end justify-center z-20">
              {/* Product 1: Left */}
              <div className="absolute left-[10%] bottom-[30px] w-36 h-36 z-10 rotate-[-12deg] opacity-90">
                <Image 
                  src="/hero/toon-3.webp" 
                  alt="Sorbet Pops" 
                  fill 
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Product 2: Center (Main) */}
              <div className="absolute left-[50%] -translate-x-1/2 bottom-[35px] w-48 h-48 z-20 drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">
                <Image 
                  src="/hero/toon-1.webp" 
                  alt="Premium Acai Bucket" 
                  fill 
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Product 3: Right */}
              <div className="absolute right-[10%] bottom-[30px] w-36 h-36 z-10 rotate-[12deg] opacity-90">
                <Image 
                  src="/hero/toon-2.webp" 
                  alt="Acai Grab Pack" 
                  fill 
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

          </div>

          {/* Right Column (Text details - 6 cols) */}
          <div className="flex flex-col items-start lg:col-span-6 text-white text-left z-20">
            <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
              OUR MISSION
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              Moments That Matter
            </h2>
            <p className="mt-6 font-body text-sm sm:text-base text-white/85 leading-relaxed max-w-lg">
              Every scoop of Austropical is a moment of pure, refreshing indulgence. Handcrafted with local Australian fruits and rainforest ingredients to give you the perfect clean choice.
            </p>

            {/* 3 inline trust points */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Check size={14} className="text-[#FFB627]" />
                </div>
                <span className="font-display text-xs font-black uppercase tracking-wider text-white">
                  Real Ingredients
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Globe size={14} className="text-[#FFB627]" />
                </div>
                <span className="font-display text-xs font-black uppercase tracking-wider text-white">
                  Sustainably Made
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Heart size={14} className="text-[#FFB627]" />
                </div>
                <span className="font-display text-xs font-black uppercase tracking-wider text-white">
                  Made with Love
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave divider bottom: dark purple -> orange (#FF7A3D) */}
      <div className="relative z-20 mt-16 lg:mt-24">
        <WaveDivider fromColor="transparent" toColor="#FF7A3D" />
      </div>
    </section>
  )
}
