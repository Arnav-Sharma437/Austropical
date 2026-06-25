"use client";

import React, { useState } from "react";

interface FruitPlaceholderProps {
  name: string;
  basePath: string;
  fallbackSvg: React.ReactNode;
  className?: string;
}

const FruitPlaceholder: React.FC<FruitPlaceholderProps> = ({ name, basePath, fallbackSvg, className }) => {
  const extensions = [".png", ".webp", ".jpg", ".jpeg", ".svg"];
  const [extIndex, setExtIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImageError = () => {
    if (extIndex < extensions.length - 1) {
      setExtIndex(extIndex + 1);
    } else {
      setImgFailed(true);
    }
  };

  const currentSrc = `${basePath}${extensions[extIndex]}`;

  return (
    <div className={`relative select-none pointer-events-none transition-transform hover:scale-105 duration-500 ${className}`}>
      {!imgFailed ? (
        <img
          src={currentSrc}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-contain"
        />
      ) : (
        fallbackSvg
      )}
    </div>
  );
};

export default function FloatingFruits() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden hidden md:block">
      {/* Left Side Fruits */}
      <div className="absolute left-[-20px] top-[15%] flex flex-col gap-28 items-start pl-6">
        
        {/* Acai berries cluster - top left, slight rotation, animate duration 4s */}
        <FruitPlaceholder
          name="Acai Cluster"
          basePath="/fruits/acai-cluster"
          className="animate-float-left-4 origin-center rotate-[-12deg]"
          fallbackSvg={
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              {/* Leaves */}
              <path d="M50 30 C35 15, 20 25, 30 40 C40 45, 45 35, 50 30 Z" fill="#2E7D32" />
              <path d="M50 30 C65 15, 80 25, 70 40 C60 45, 55 35, 50 30 Z" fill="#388E3C" />
              {/* Berries */}
              <circle cx="40" cy="55" r="16" fill="url(#acaiGrad)" />
              <circle cx="62" cy="58" r="15" fill="url(#acaiGrad2)" />
              <circle cx="48" cy="72" r="17" fill="url(#acaiGrad)" />
              <defs>
                <radialGradient id="acaiGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#7B2CBF" />
                  <stop offset="70%" stopColor="#4B0082" />
                  <stop offset="100%" stopColor="#240046" />
                </radialGradient>
                <radialGradient id="acaiGrad2" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#9D4EDD" />
                  <stop offset="70%" stopColor="#4B0082" />
                  <stop offset="100%" stopColor="#1F003A" />
                </radialGradient>
              </defs>
            </svg>
          }
        />

        {/* Fig/purple fruit cut - middle left, animate duration 6s */}
        <FruitPlaceholder
          name="Fig Cut"
          basePath="/fruits/fig"
          className="animate-float-left-6 origin-center rotate-[8deg]"
          fallbackSvg={
            <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
              {/* Outer skin */}
              <path d="M50 15 C20 40, 20 80, 50 90 C80 80, 80 40, 50 15 Z" fill="#8B008B" stroke="#5c005c" strokeWidth="2" />
              {/* Inner flesh */}
              <path d="M50 20 C25 43, 25 77, 50 85 C75 77, 75 43, 50 20 Z" fill="#e05a8f" />
              <path d="M50 25 C30 45, 30 73, 50 80 C70 73, 70 45, 50 25 Z" fill="#fca5c5" />
              {/* Center pulp/seeds */}
              <path d="M50 35 C38 50, 38 68, 50 72 C62 68, 62 50, 50 35 Z" fill="#d90429" />
              {/* Seeds */}
              <circle cx="47" cy="50" r="1.5" fill="#ffd166" />
              <circle cx="53" cy="52" r="1.5" fill="#ffd166" />
              <circle cx="49" cy="58" r="1.5" fill="#ffd166" />
              <circle cx="52" cy="62" r="1.5" fill="#ffd166" />
              <circle cx="45" cy="64" r="1.5" fill="#ffd166" />
              <circle cx="54" cy="46" r="1.5" fill="#ffd166" />
              <circle cx="46" cy="44" r="1.5" fill="#ffd166" />
            </svg>
          }
        />

        {/* Strawberries - bottom left, animate duration 5s */}
        <FruitPlaceholder
          name="Strawberry"
          basePath="/fruits/strawberry"
          className="animate-float-left-5 origin-center rotate-[-5deg]"
          fallbackSvg={
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              {/* Green Calyx */}
              <path d="M50 22 C48 10, 40 15, 35 15 C42 22, 45 25, 50 26 Z" fill="#4CAF50" />
              <path d="M50 22 C52 10, 60 15, 65 15 C58 22, 55 25, 50 26 Z" fill="#4CAF50" />
              <path d="M50 22 C50 8, 50 8, 50 22 Z" fill="#388E3C" stroke="#388E3C" strokeWidth="3" />
              {/* Strawberry Body */}
              <path d="M50 25 C25 25, 20 60, 50 90 C80 60, 75 25, 50 25 Z" fill="url(#strawGrad)" />
              {/* Seeds */}
              <ellipse cx="40" cy="42" rx="1.5" ry="2.5" fill="#FFEB3B" transform="rotate(-10 40 42)" />
              <ellipse cx="60" cy="42" rx="1.5" ry="2.5" fill="#FFEB3B" transform="rotate(10 60 42)" />
              <ellipse cx="50" cy="52" rx="1.5" ry="2.5" fill="#FFEB3B" />
              <ellipse cx="36" cy="58" rx="1.5" ry="2.5" fill="#FFEB3B" transform="rotate(-15 36 58)" />
              <ellipse cx="64" cy="58" rx="1.5" ry="2.5" fill="#FFEB3B" transform="rotate(15 64 58)" />
              <ellipse cx="48" cy="68" rx="1.5" ry="2.5" fill="#FFEB3B" />
              <ellipse cx="58" cy="74" rx="1.5" ry="2.5" fill="#FFEB3B" />
              <ellipse cx="42" cy="78" rx="1.5" ry="2.5" fill="#FFEB3B" />
              <defs>
                <radialGradient id="strawGrad" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FF1493" />
                  <stop offset="60%" stopColor="#E91E63" />
                  <stop offset="100%" stopColor="#880E4F" />
                </radialGradient>
              </defs>
            </svg>
          }
        />
      </div>

      {/* Right Side Fruits */}
      <div className="absolute right-[-20px] top-[12%] flex flex-col gap-28 items-end pr-6">
        
        {/* Purple acai cross-section - top right, animate duration 3s */}
        <FruitPlaceholder
          name="Acai Cross Section"
          basePath="/fruits/acai-cross"
          className="animate-float-right-3 origin-center rotate-[15deg]"
          fallbackSvg={
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              {/* Outer skin */}
              <circle cx="50" cy="50" r="42" fill="#240046" stroke="#4B0082" strokeWidth="2" />
              {/* Flesh */}
              <circle cx="50" cy="50" r="36" fill="url(#acaiCrossGrad)" />
              {/* Inner Ring / Texture */}
              <circle cx="50" cy="50" r="24" fill="none" stroke="#7B2CBF" strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Seed core */}
              <circle cx="50" cy="50" r="14" fill="#E0AAFF" />
              <circle cx="50" cy="50" r="8" fill="#FFFFFF" opacity="0.6" />
              <defs>
                <radialGradient id="acaiCrossGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#5A189A" />
                  <stop offset="75%" stopColor="#3C096C" />
                  <stop offset="100%" stopColor="#240046" />
                </radialGradient>
              </defs>
            </svg>
          }
        />

        {/* Another acai cluster - middle right, animate duration 5s */}
        <FruitPlaceholder
          name="Acai Cluster 2"
          basePath="/fruits/acai-cluster-2"
          className="animate-float-right-5 origin-center rotate-[-6deg]"
          fallbackSvg={
            <svg viewBox="0 0 100 100" className="w-26 h-26 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              {/* Leaves */}
              <path d="M50 32 C40 18, 25 22, 33 38 C38 42, 44 36, 50 32 Z" fill="#2E7D32" />
              {/* Berries */}
              <circle cx="38" cy="52" r="15" fill="url(#acaiGrad3)" />
              <circle cx="58" cy="50" r="16" fill="url(#acaiGrad4)" />
              <circle cx="48" cy="68" r="14" fill="url(#acaiGrad3)" />
              <circle cx="64" cy="66" r="12" fill="url(#acaiGrad4)" />
              <defs>
                <radialGradient id="acaiGrad3" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#7B2CBF" />
                  <stop offset="70%" stopColor="#4B0082" />
                  <stop offset="100%" stopColor="#240046" />
                </radialGradient>
                <radialGradient id="acaiGrad4" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#9D4EDD" />
                  <stop offset="70%" stopColor="#4B0082" />
                  <stop offset="100%" stopColor="#1F003A" />
                </radialGradient>
              </defs>
            </svg>
          }
        />

        {/* Ice pop/fruit - bottom right, animate duration 4s */}
        <FruitPlaceholder
          name="Ice Pop"
          basePath="/fruits/icepop"
          className="animate-float-right-4 origin-center rotate-[10deg]"
          fallbackSvg={
            <svg viewBox="0 0 100 120" className="w-24 h-28 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
              {/* Wooden Stick */}
              <rect x="44" y="80" width="12" height="30" rx="6" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1" />
              <rect x="44" y="80" width="12" height="15" fill="#BCAAA4" opacity="0.3" />
              {/* Pop Body */}
              <path d="M30 20 C30 10, 70 10, 70 20 L70 80 C70 83, 67 86, 64 86 L36 86 C33 86, 30 83, 30 80 Z" fill="url(#popGrad)" />
              {/* Gloss shine */}
              <path d="M35 22 C35 18, 42 16, 48 16 C38 20, 36 28, 36 40 L36 78 C36 79, 35 80, 34 80 C35 80, 35 79, 35 78 Z" fill="#FFFFFF" opacity="0.35" />
              <defs>
                <linearGradient id="popGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF9100" />
                  <stop offset="50%" stopColor="#FF3D00" />
                  <stop offset="100%" stopColor="#DD2C00" />
                </linearGradient>
              </defs>
            </svg>
          }
        />
      </div>
    </div>
  );
}
