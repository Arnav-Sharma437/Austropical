"use client";

import React, { useState, useEffect } from "react";

export default function WalkingProduct() {
  const [walkingProductFiles, setWalkingProductFiles] = useState<string[]>([]);
  const [bannerFiles, setBannerFiles] = useState<string[]>([]);

  useEffect(() => {
    async function loadAssets() {
      try {
        const wpRes = await fetch("/api/walking-product");
        if (wpRes.ok) {
          const wpData = await wpRes.json();
          setWalkingProductFiles(wpData.files || []);
        }

        const bRes = await fetch("/api/banners");
        if (bRes.ok) {
          const bData = await bRes.json();
          setBannerFiles(bData.files || []);
        }
      } catch (err) {
        console.error("Failed to load walking product assets:", err);
      }
    }
    loadAssets();
  }, []);

  const getProductSrc = () => {
    // 1. Look in public/walking-product/ for coconut-walking or walking-product
    if (walkingProductFiles.length > 0) {
      const match = walkingProductFiles.find(file => {
        const lastDot = file.lastIndexOf(".");
        const name = lastDot !== -1 ? file.substring(0, lastDot) : file;
        return name.toLowerCase() === "coconut-walking" || name.toLowerCase() === "walking-product";
      });
      if (match) return `/walking-product/${match}`;
    }

    // 2. Look in public/banners/ for walking-product
    if (bannerFiles.length > 0) {
      const match = bannerFiles.find(file => {
        const lastDot = file.lastIndexOf(".");
        const name = lastDot !== -1 ? file.substring(0, lastDot) : file;
        return name.toLowerCase() === "walking-product";
      });
      if (match) return `/banners/${match}`;
    }

    return null;
  };

  const activeSrc = getProductSrc();

  return (
    <div className="absolute bottom-2 left-0 w-full overflow-visible pointer-events-none z-10">
      <div className="animate-walk-ltr flex flex-col items-center w-[120px] overflow-visible">
        
        {/* Product Tub */}
        <div className="relative w-[70px] h-[70px] flex items-center justify-center">
          {activeSrc ? (
            <img
              src={activeSrc}
              alt="Walking Product"
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

        {/* Cartoon Legs (Two white rounded rectangles that alternate up/down) */}
        <div className="flex justify-between w-[32px] h-[24px] mt-[-6px] overflow-visible px-2">
          {/* Left Leg */}
          <div className="w-[8px] h-[18px] bg-white rounded-full origin-top animate-leg-left" />
          {/* Right Leg */}
          <div className="w-[8px] h-[18px] bg-white rounded-full origin-top animate-leg-right" />
        </div>

      </div>
    </div>
  );
}
