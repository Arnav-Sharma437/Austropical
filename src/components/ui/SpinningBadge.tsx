"use client";

import React from "react";

export default function SpinningBadges() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none">
      
      {/* 1. Yellow Circle: "100% VEGAN" 🌴 - spin 10s */}
      <div className="absolute left-[-15%] top-[5%] sm:left-[-10%] sm:top-[8%] h-24 w-24 animate-spin-badge-10">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#FFD700" className="shadow-lg" />
          <path
            id="veganPath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text className="fill-brand-dark text-[9px] font-black uppercase tracking-widest font-display">
            <textPath href="#veganPath" startOffset="0%">
              100% VEGAN 🌴 100% VEGAN 🌴
            </textPath>
          </text>
        </svg>
      </div>

      {/* 2. Red Pill: "GLUTEN FREE" - wobble only */}
      <div className="absolute right-[-8%] top-[10%] sm:right-[-5%] sm:top-[12%] animate-wobble-badge">
        <div className="rounded-full bg-red-600 border-2 border-white/20 px-5 py-2.5 font-display text-xs font-black uppercase tracking-wider text-white shadow-xl flex items-center gap-1.5 backdrop-blur-sm">
          🌾 <span className="pt-[1px]">GLUTEN FREE</span>
        </div>
      </div>

      {/* 3. Yellow Starburst: "ESSENTIAL MINERALS" - spin 12s */}
      <div className="absolute left-[-18%] bottom-[20%] sm:left-[-12%] sm:bottom-[22%] h-28 w-28 animate-spin-badge-12 flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          {/* 12-point starburst shape */}
          <polygon
            points="50,5 57,22 75,17 72,35 88,40 76,53 84,70 67,71 63,89 49,78 36,89 32,71 15,70 23,53 11,40 27,35 24,17 42,22"
            fill="#FFD700"
            className="shadow-lg"
          />
          <path
            id="starburstPath"
            d="M 50, 50 m -24, 0 a 24,24 0 1,1 48,0 a 24,24 0 1,1 -48,0"
            fill="none"
          />
          <text className="fill-brand-dark text-[6.5px] font-black uppercase tracking-widest font-display">
            <textPath href="#starburstPath" startOffset="0%">
              ESSENTIAL MINERALS ★
            </textPath>
          </text>
        </svg>
      </div>

      {/* 4. Purple Circle: "AMAZON SUPERFOOD" ⚡ - spin 8s */}
      <div className="absolute right-[-14%] bottom-[30%] sm:right-[-10%] sm:bottom-[32%] h-24 w-24 animate-spin-badge-8">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#4B0082" className="shadow-lg border border-white/20" />
          <path
            id="superfoodPath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text className="fill-brand-yellow text-[8.5px] font-black uppercase tracking-widest font-display">
            <textPath href="#superfoodPath" startOffset="0%">
              AMAZON SUPERFOOD ⚡
            </textPath>
          </text>
        </svg>
      </div>

      {/* 5. Green Arch: "CERTIFIED ORGANIC" - spin 15s */}
      <div className="absolute left-[15%] top-[-8%] sm:left-[20%] sm:top-[-10%] h-28 w-28 animate-spin-badge-15">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#00A86B" strokeWidth="8" strokeDasharray="140 40" />
          <path
            id="organicPath"
            d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
            fill="none"
          />
          <text className="fill-brand-green text-[8.5px] font-black uppercase tracking-widest font-display">
            <textPath href="#organicPath" startOffset="5%">
              ★ CERTIFIED ORGANIC ★
            </textPath>
          </text>
        </svg>
      </div>

      {/* 6. Pink Pill: "LOWER SUGAR" - bounce only */}
      <div className="absolute right-[10%] bottom-[-5%] sm:right-[15%] sm:bottom-[-8%] animate-bounce-badge">
        <div className="rounded-full bg-brand-pink border-2 border-white/20 px-5 py-2.5 font-display text-xs font-black uppercase tracking-wider text-white shadow-xl flex items-center gap-1.5 backdrop-blur-sm">
          🍓 <span className="pt-[1px]">LOWER SUGAR</span>
        </div>
      </div>

    </div>
  );
}
