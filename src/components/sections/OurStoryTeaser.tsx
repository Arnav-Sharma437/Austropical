"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";

export default function OurStoryTeaser() {
  return (
    <section className="relative bg-[#FDF6ED] pt-20 pb-0 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column (Text - 40% width / 5 cols) */}
          <div className="relative flex flex-col items-start lg:col-span-5 z-20">
            {/* Sun Decor Icon */}
            <div className="absolute top-[-40px] left-[-20px] opacity-10 pointer-events-none text-brand-orange animate-spin-slow">
              <Sun size={60} />
            </div>

            <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
              MADE IN AUSTRALIA
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tight text-brand-dark">
              Crafted for the<br />Sun-Chasers
            </h2>
            
            <p className="mt-6 font-body text-sm sm:text-base text-brand-dark/70 leading-relaxed max-w-md">
              Inspired by the Australian lifestyle, we create superfoods that fuel your adventures and keep you feeling your best. Made under the sun with real organic fruits.
            </p>

            <Link href="/about" className="mt-8">
              <button className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-display text-xs font-black uppercase tracking-wider rounded-full px-8 py-3.5 active:scale-95 transition-all">
                OUR STORY
              </button>
            </Link>

            {/* Circular badge below: "AUSTRALIAN MADE LOVED GLOBALLY" */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border border-dashed border-brand-orange/30 flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full text-brand-orange">
                  <path id="circle-path-story" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text className="font-display font-black uppercase text-[7.5px]" fill="#FF6B00">
                    <textPath href="#circle-path-story" startOffset="0%">
                      AUSTRALIAN MADE • LOVED GLOBALLY • 
                    </textPath>
                  </text>
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark/50 font-display">
                Loved Globally
              </span>
            </div>
          </div>

          {/* Right Column (Image - 60% width / 7 cols) */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[500px] lg:col-span-7 rounded-2xl overflow-hidden shadow-xl z-10 border border-brand-dark/5">
            <Image
              src="/about/About-aus.webp"
              alt="Austropical Jungle Story Mockup"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              unoptimized
            />
          </div>

        </div>
      </div>

      {/* Wave divider bottom: cream -> orange/yellow (#FFB627) */}
      <div className="relative z-20 mt-16 lg:mt-24">
        <WaveDivider fromColor="transparent" toColor="#FFB627" />
      </div>
    </section>
  );
}
