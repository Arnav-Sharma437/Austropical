"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShoppingCart, Check } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";
import { useCart } from "@/context/CartContext";

const CAROUSEL_PRODUCTS = [
  {
    id: "acai-bucket",
    name: "Premium Açai Bucket (500ml)",
    price: "$12.99",
    image: "/hero/toon-1.webp",
    bgColor: "#9B59B6", // Purple
    glowColor: "#AF7AC5",
    badge: "BEST SELLER",
    fruit: "🫐",
    ingredients: ["🍇 Pure Açai", "🍌 Banana", "🥥 Coconut", "🫐 Blueberry", "🍓 Strawberry", "🍯 Guarana", "🌾 Gluten-Free Oats"]
  },
  {
    id: "grab-go-pack",
    name: "Açai Grab 'n Go 2 Pack",
    price: "$14.99",
    image: "/hero/toon-2.webp",
    bgColor: "#E91E63", // Pink
    glowColor: "#F06292",
    badge: "ON THE GO",
    fruit: "🍓",
    ingredients: ["🍇 Pure Açai", "🍌 Banana", "🍏 Apple Juice", "🥥 Coconut Oil", "🍯 Guarana", "🥛 Vegan Base"]
  },
  {
    id: "acai-pops",
    name: "Açai Tropical Ice Pops",
    price: "$8.99",
    image: "/hero/toon-3.webp",
    bgColor: "#E67E22", // Orange
    glowColor: "#F39C12",
    badge: null,
    fruit: "🥭",
    ingredients: ["🍇 Pure Açai", "🍍 Pineapple", "🥭 Mango", "🥥 Coconut Water", "🍋 Lime Juice", "🍁 Maple Syrup"]
  },
  {
    id: "acai-cubes",
    name: "Açai Booster Smoothie Cubes",
    price: "$10.99",
    image: "/hero/toon-4.webp",
    bgColor: "#2ECC71", // Green
    glowColor: "#58D68D",
    badge: "REAL ENERGY",
    fruit: "🍍",
    ingredients: ["🍇 Raw Açai", "🥬 Organic Spinach", "🍌 Banana", "🥥 Coconut Milk", "🌱 Chia Seeds", "🍍 Pineapple"]
  },
  {
    id: "acai-sorbet",
    name: "Classic Açai Sorbet Tub",
    price: "$11.49",
    image: "/hero/toon-1.webp", // Reusing high-quality tub mockup
    bgColor: "#3B3B98", // Lavender
    glowColor: "#5D5FEF",
    badge: null,
    fruit: "🥥",
    ingredients: ["🍇 Organic Açai", "🍎 Apple Extract", "🍋 Fresh Lemon", "🍯 Guarana", "🌾 Rice Syrup", "🍇 Blackberry"]
  }
];

// Duplicate list to support seamless infinite loop scrolling
const DUPLICATED_PRODUCTS = [...CAROUSEL_PRODUCTS, ...CAROUSEL_PRODUCTS];

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Card Width + Gap calculation
  const getCardWidth = () => {
    return 300 + 24; // Width (300px) + Gap (24px)
  };

  // Continuous loop scroll handler
  useEffect(() => {
    let animationFrameId: number;

    const scrollStep = () => {
      if (sliderRef.current && !isPaused) {
        const { scrollLeft, scrollWidth } = sliderRef.current;
        const cardWidth = getCardWidth();
        const firstHalfWidth = cardWidth * CAROUSEL_PRODUCTS.length;
        
        let nextScroll = scrollLeft + 0.65; // Scroll speed (px per frame)

        // Loop seamlessly back to 0 once we scroll past the first half
        if (nextScroll >= firstHalfWidth) {
          nextScroll = 0;
        }

        sliderRef.current.scrollLeft = nextScroll;

        // Update dot pagination indicators
        const activeIdx = Math.floor((nextScroll % firstHalfWidth) / cardWidth);
        setScrollIndex(Math.max(0, Math.min(activeIdx, CAROUSEL_PRODUCTS.length - 1)));
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Arrow button scrolling handler
  const handleNavScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    setIsPaused(true);
    const { scrollLeft } = sliderRef.current;
    const cardWidth = getCardWidth();
    const targetScroll = direction === "left" 
      ? scrollLeft - cardWidth * 1.5
      : scrollLeft + cardWidth * 1.5;

    sliderRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });

    // Resume scrolling after animation wraps up
    setTimeout(() => {
      setIsPaused(false);
    }, 1200);
  };

  return (
    <section 
      id="finest-flavours" 
      className="relative bg-[#FDF6ED] pt-20 pb-0 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 relative">
          {/* Centered Heading */}
          <div className="flex items-center gap-2 sm:mx-auto">
            <span className="text-brand-orange text-lg sm:text-xl font-bold">←</span>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#2D1B4E] tracking-tight">
              OUR FINEST FLAVOURS
            </h2>
            <span className="text-brand-orange text-lg sm:text-xl font-bold">→</span>
          </div>

          {/* View All Link */}
          <Link 
            href="/products" 
            className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-orange hover:text-brand-pink transition-colors flex items-center gap-1.5 self-center sm:absolute sm:right-8 lg:right-12"
          >
            <span>VIEW ALL PRODUCTS</span>
            <span>→</span>
          </Link>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Nav Buttons (Desktop) */}
          <button 
            onClick={() => handleNavScroll("left")}
            className="absolute left-[-20px] top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-dark hover:scale-105 active:scale-95 transition-all border border-gray-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => handleNavScroll("right")}
            className="absolute right-[-20px] top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-dark hover:scale-105 active:scale-95 transition-all border border-gray-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>

          {/* Scrolling card wrapper */}
          <div 
            ref={sliderRef}
            className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 py-8 cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: "none" }}
          >
            {DUPLICATED_PRODUCTS.map((prod, index) => (
              <div 
                key={`${prod.id}-${index}`}
                className="group perspective-1000 w-[280px] sm:w-[300px] h-[380px] shrink-0 snap-start select-none"
              >
                {/* 3D Card Flipping Core */}
                <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 transition-transform">
                  
                  {/* FRONT SIDE */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col justify-between shadow-lg"
                    style={{ 
                      background: `radial-gradient(circle at center, ${prod.glowColor} 0%, ${prod.bgColor} 100%)`
                    }}
                  >
                    {/* Sketch border highlights matching reference painted overlay */}
                    <div className="absolute inset-3 border-2 border-white/20 pointer-events-none z-10" style={{ borderRadius: "24px 35px 20px 30px" }} />
                    <div className="absolute inset-4 border border-white/10 pointer-events-none z-10" style={{ borderRadius: "30px 20px 35px 24px" }} />

                    {/* Ribbon Tag Top-Left */}
                    {prod.badge && (
                      <div className="absolute top-5 left-5 bg-white text-brand-dark text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm z-20">
                        {prod.badge}
                      </div>
                    )}

                    {/* Floating Fruit Decor */}
                    <div className="absolute bottom-16 right-5 text-3xl select-none opacity-85 z-20 animate-bounce">
                      {prod.fruit}
                    </div>

                    {/* Product Image Center */}
                    <div className="w-full flex-1 flex items-center justify-center relative my-4 z-20">
                      <div className="relative w-40 h-40">
                        <Image 
                          src={prod.image} 
                          alt={prod.name} 
                          fill 
                          className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)]"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Info & Add-To-Cart Footer */}
                    <div className="flex flex-col gap-2 relative z-20">
                      <h3 className="font-display font-black text-xs uppercase text-white leading-tight line-clamp-1">
                        {prod.name}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-display font-black text-base text-white">
                          {prod.price}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              product: prod.id,
                              name: prod.name,
                              price: parseFloat(prod.price.replace("$", "")),
                              image: prod.image
                            }, 1);
                          }}
                          className="bg-white text-brand-dark hover:scale-105 active:scale-95 font-display text-[9px] font-black uppercase tracking-widest rounded-full px-3.5 py-2 flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        >
                          <ShoppingCart size={11} />
                          <span>ADD TO CART</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Natural Ingredients Display) */}
                  <div 
                    className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden rounded-2xl p-6 flex flex-col justify-between shadow-lg text-white"
                    style={{ 
                      background: `radial-gradient(circle at center, ${prod.bgColor} 0%, #1E1235 100%)`
                    }}
                  >
                    {/* Sketch border highlights */}
                    <div className="absolute inset-3 border-2 border-white/20 pointer-events-none z-10" style={{ borderRadius: "24px 35px 20px 30px" }} />
                    
                    {/* Header */}
                    <div className="flex flex-col items-center border-b border-white/10 pb-2">
                      <span className="font-display text-[9px] font-bold tracking-[0.2em] text-[#FFB627] uppercase">
                        NATURAL RECIPE
                      </span>
                      <h4 className="font-display text-sm font-black uppercase tracking-wide text-white mt-0.5 text-center line-clamp-1">
                        {prod.name}
                      </h4>
                    </div>

                    {/* Ingredients List */}
                    <div className="flex-1 flex flex-col justify-center gap-2.5 my-3 px-2 overflow-y-auto no-scrollbar">
                      {prod.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-white/90">
                          <Check size={12} className="text-[#FFB627] shrink-0" />
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t border-white/10 pt-2">
                      <span className="text-[9px] font-bold tracking-[0.1em] text-white/50 font-display">
                        100% DAIRY-FREE
                      </span>
                      <span className="text-[10px] font-black text-[#FFB627] font-display uppercase tracking-widest">
                        ORGANIC JOY
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Dot Pagination indicators */}
          <div className="flex justify-center items-center gap-2 mt-6 select-none">
            {CAROUSEL_PRODUCTS.map((_, idx) => (
              <div 
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  scrollIndex === idx ? "w-6 bg-brand-orange" : "w-2.5 bg-brand-orange/20"
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Wave divider bottom: cream -> dark purple (#2D1B4E) */}
      <div className="relative z-20 mt-12">
        <WaveDivider fromColor="transparent" toColor="#2D1B4E" />
      </div>
    </section>
  );
}
