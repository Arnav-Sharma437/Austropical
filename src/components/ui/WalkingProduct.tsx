"use client";

import React, { useState } from "react";

export default function WalkingProduct() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="absolute bottom-2 left-0 w-full overflow-visible pointer-events-none z-10">
      <div className="animate-walk-across flex flex-col items-center w-[120px] overflow-visible">
        
        {/* Product Tub */}
        <div className="relative w-[70px] h-[70px] flex items-center justify-center">
          {!imgFailed ? (
            <img
              src="/banners/walking-product.png"
              alt="Walking Product"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-contain drop-shadow-md"
            />
          ) : (
            /* Custom styled product tub fallback */
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)] overflow-visible">
              {/* Tub lid */}
              <rect x="15" y="15" width="70" height="10" rx="5" fill="#9D4EDD" stroke="#7B2CBF" strokeWidth="2" />
              {/* Tub body */}
              <path d="M20 25 L25 80 C26 83, 29 85, 32 85 L68 85 C71 85, 74 83, 75 80 L80 25 Z" fill="#4B0082" stroke="#3C096C" strokeWidth="2" />
              {/* Label */}
              <rect x="28" y="36" width="44" height="34" rx="3" fill="#FCF9F2" />
              {/* Small tropical detail on label */}
              <circle cx="50" cy="48" r="8" fill="#FF1493" />
              <path d="M50 42 C53 46, 53 52, 50 52 C47 52, 47 46, 50 42 Z" fill="#FFD700" />
              <text x="50" y="64" fontFamily="var(--font-display)" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#4B0082">
                ACAI
              </text>
            </svg>
          )}
        </div>

        {/* Cartoon Legs (Two white oval shapes that alternate up/down) */}
        <div className="flex justify-between w-[32px] h-[24px] mt-[-6px] overflow-visible px-1">
          {/* Left Leg */}
          <div className="w-[10px] h-[20px] bg-white border-2 border-brand-dark rounded-full origin-top animate-step-left" />
          {/* Right Leg */}
          <div className="w-[10px] h-[20px] bg-white border-2 border-brand-dark rounded-full origin-top animate-step-right" />
        </div>

      </div>
    </div>
  );
}
