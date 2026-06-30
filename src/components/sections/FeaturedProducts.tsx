"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import WaveDivider from "../ui/WaveDivider";
import { useCart } from "@/context/CartContext";

const CAROUSEL_PRODUCTS = [
  {
    id: "acai-bucket",
    name: "Premium Açai Bucket (500ml)",
    price: "$12.99",
    image: "/hero/toon-1.webp",
    bgColor: "#9B59B6", // Purple
    badge: "BEST SELLER",
    fruit: "🫐"
  },
  {
    id: "grab-go-pack",
    name: "Açai Grab 'n Go 2 Pack",
    price: "$14.99",
    image: "/hero/toon-2.webp",
    bgColor: "#E91E63", // Pink
    badge: "ON THE GO",
    fruit: "🍓"
  },
  {
    id: "acai-pops",
    name: "Açai Tropical Ice Pops",
    price: "$8.99",
    image: "/hero/toon-3.webp",
    bgColor: "#E67E22", // Orange
    badge: null,
    fruit: "🥭"
  },
  {
    id: "acai-cubes",
    name: "Açai Booster Smoothie Cubes",
    price: "$10.99",
    image: "/hero/toon-4.webp",
    bgColor: "#2ECC71", // Green
    badge: "REAL ENERGY",
    fruit: "🍍"
  },
  {
    id: "acai-sorbet",
    name: "Classic Açai Sorbet Tub",
    price: "$11.49",
    image: "/hero/toon-1.webp", // Reusing the high-quality tub mockup
    bgColor: "#3B3B98", // Lavender
    badge: null,
    fruit: "🥥"
  }
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const cardWidth = 280 + 24; // Width + gap
    const targetScroll = direction === "left" 
      ? scrollLeft - cardWidth * 1.5
      : scrollLeft + cardWidth * 1.5;

    sliderRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });

    // Update dot index estimation
    setTimeout(() => {
      if (sliderRef.current) {
        const index = Math.round(sliderRef.current.scrollLeft / cardWidth);
        setScrollIndex(Math.max(0, Math.min(index, CAROUSEL_PRODUCTS.length - 1)));
      }
    }, 400);
  };

  return (
    <section 
      id="finest-flavours" 
      className="relative bg-[#FDF6ED] pt-20 pb-0 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
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
        <div className="relative w-full">
          {/* Nav Buttons (Desktop) */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-dark hover:scale-105 active:scale-95 transition-all border border-gray-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-dark hover:scale-105 active:scale-95 transition-all border border-gray-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>

          {/* Scrolling card wrapper */}
          <div 
            ref={sliderRef}
            className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 py-8 cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {CAROUSEL_PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                className="w-[280px] sm:w-[300px] shrink-0 snap-start rounded-2xl p-6 relative flex flex-col justify-between h-[380px] shadow-lg transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: prod.bgColor }}
              >
                {/* Ribbon Tag Top-Left */}
                {prod.badge && (
                  <div className="absolute top-4 left-4 bg-white text-brand-dark text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm z-10">
                    {prod.badge}
                  </div>
                )}

                {/* Floating Fruit Decor */}
                <div className="absolute bottom-16 right-4 text-3xl select-none opacity-85 z-10 animate-bounce">
                  {prod.fruit}
                </div>

                {/* Product Image Center */}
                <div className="w-full flex-1 flex items-center justify-center relative my-4">
                  <div className="relative w-44 h-44">
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
                  <h3 className="font-display font-black text-sm uppercase text-white leading-tight line-clamp-1">
                    {prod.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-display font-black text-lg text-white">
                      {prod.price}
                    </span>
                    <button 
                      onClick={() => addToCart({
                        product: prod.id,
                        name: prod.name,
                        price: parseFloat(prod.price.replace("$", "")),
                        image: prod.image
                      }, 1)}
                      className="bg-white text-brand-dark hover:scale-105 active:scale-95 font-display text-[10px] font-black uppercase tracking-widest rounded-full px-4 py-2.5 flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <ShoppingCart size={11} />
                      <span>ADD TO CART</span>
                    </button>
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
