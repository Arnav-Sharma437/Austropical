"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  { src: '/hero/toon-1.webp', bg: '#F4845F', panel: '#F79B7F' },
  { src: '/hero/toon-2.webp', bg: '#6BBF7A', panel: '#85CC92' },
  { src: '/hero/toon-3.webp', bg: '#E882B4', panel: '#ED9DC4' },
  { src: '/hero/toon-4.webp', bg: '#6EB5FF', panel: '#8DC4FF' },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Preload all 4 images on mount
  React.useEffect(() => {
    IMAGES.forEach((img) => {
      const image = new window.Image();
      image.src = img.src;
    });
  }, []);

  // Update mobile status on resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % 4);
    } else {
      setActiveIndex((prev) => (prev + 3) % 4);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Derive roles
  const centerIndex = activeIndex;
  const leftIndex = (activeIndex + 3) % 4;
  const rightIndex = (activeIndex + 1) % 4;

  const getItemStyle = (index: number) => {
    let role: "center" | "left" | "right" | "back";

    if (index === centerIndex) {
      role = "center";
    } else if (index === leftIndex) {
      role = "left";
    } else if (index === rightIndex) {
      role = "right";
    } else {
      role = "back";
    }

    switch (role) {
      case "center":
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "60%" : "92%",
          bottom: isMobile ? "22%" : "0",
        };
      case "left":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "20%" : "30%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "right":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "80%" : "70%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "back":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "13%" : "22%",
          bottom: isMobile ? "32%" : "12%",
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "var(--font-inter), sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full h-screen overflow-hidden">
        
        {/* 1. Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-50 opacity-[0.4]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* 2. Giant ghost text "AUSTROPICAL" */}
        <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2] top-[18%]">
          <span
            style={{
              fontSize: "clamp(90px, 24vw, 350px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
            className="font-anton font-black uppercase text-white opacity-100 whitespace-nowrap"
          >
            AUSTROPICAL
          </span>
        </div>

        {/* 3. Top-left brand label "AUSTROPICAL" */}
        <div className="absolute top-8 left-6 sm:left-12 z-[60] flex flex-col gap-1">
          <span className="text-xs font-bold uppercase text-white opacity-90 tracking-[0.18em] font-inter">
            AUSTROPICAL
          </span>
          <span className="text-[9px] font-bold uppercase text-white/70 tracking-[0.25em] font-inter">
            PREMIUM SUPERFOODS
          </span>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0 z-[3]">
          {IMAGES.map((img, index) => {
            const itemStyle = getItemStyle(index);
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  aspectRatio: "0.6 / 1",
                  willChange: "transform, filter, opacity",
                  transition: "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1)",
                  ...itemStyle,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={`Toon Figurine ${index + 1}`}
                  className="w-full h-full object-contain object-bottom select-none"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div className="absolute bottom-8 left-6 sm:bottom-20 sm:left-24 z-[60] max-w-[320px] flex flex-col items-start">
          <p className="font-inter font-black uppercase text-white opacity-95 text-base sm:text-[22px] tracking-[0.02em] mb-2 sm:mb-3">
            AUSTROPICAL SUPERFOODS
          </p>
          <p className="hidden sm:block font-inter text-xs sm:text-sm text-white opacity-85 leading-[1.6] mb-5">
            Premium tropical superfood ice cream and acai bowls. Made in Australia, 100% plant-powered, zero dairy, certified organic, and crafted under the sun. Order now.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("prev")}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white hover:scale-[1.08] hover:bg-white/10 active:scale-95 transition-all duration-150"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-[26px] h-[26px]" strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate("next")}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white hover:scale-[1.08] hover:bg-white/10 active:scale-95 transition-all duration-150"
              aria-label="Next slide"
            >
              <ArrowRight className="w-[26px] h-[26px]" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <div className="absolute bottom-8 right-6 sm:bottom-20 sm:right-12 z-[60]">
          <a
            href="/products"
            className="flex items-center gap-2 font-anton text-white opacity-95 hover:opacity-100 transition-opacity duration-200 uppercase tracking-[-0.02em] leading-none"
            style={{
              fontSize: "clamp(20px, 4vw, 56px)",
            }}
          >
            <span>DISCOVER IT</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>

      </div>
    </div>
  );
}
