"use client";

import React from "react";
import Image from "next/image";

interface BannerItem {
  id: number;
  src: string;
  title: string;
  gradient: string;
}

const BANNERS: BannerItem[] = [
  {
    id: 1,
    src: "/banners/banner-1.png",
    title: "Health Foods That Move With You",
    gradient: "from-orange-600 to-pink-600",
  },
  {
    id: 2,
    src: "/banners/banner-2.png",
    title: "Wildly Natural",
    gradient: "from-pink-600 to-purple-600",
  },
  {
    id: 3,
    src: "/banners/banner-3.png",
    title: "Unmatched Excellence",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: 4,
    src: "/banners/banner-4.png",
    title: "That's Mornings Made",
    gradient: "from-blue-600 to-emerald-600",
  },
  {
    id: 5,
    src: "/banners/banner-5.png",
    title: "Pure Exotic Flavour Pink Guava",
    gradient: "from-emerald-600 to-yellow-600",
  },
  {
    id: 6,
    src: "/banners/banner-6.png",
    title: "Cool Off The Bright Way",
    gradient: "from-yellow-600 to-orange-600",
  },
  {
    id: 7,
    src: "/banners/banner-7.png",
    title: "Pure Exotic Flavour Dragon Fruit",
    gradient: "from-red-600 to-pink-600",
  },
  {
    id: 8,
    src: "/banners/banner-8.png",
    title: "Pure Exotic Flavour",
    gradient: "from-pink-600 to-indigo-600",
  },
];

export default function BannerMarquee() {
  // Duplicate array for seamless infinite looping
  const repeatedBanners = [...BANNERS, ...BANNERS];

  return (
    <section className="relative overflow-hidden bg-[#0D0D0D] py-16">
      
      {/* Scrollable Marquee Container */}
      <div 
        className="marquee-container flex w-full overflow-hidden select-none"
        style={{
          "--speed": "40s",
        } as React.CSSProperties}
      >
        <div className="animate-marquee-left gap-6 px-3">
          {repeatedBanners.map((banner, index) => (
            <div
              key={`${banner.id}-${index}`}
              className="relative flex h-[340px] w-[600px] shrink-0 items-end justify-start overflow-hidden rounded-[20px] bg-gradient-to-tr p-8 shadow-2xl transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
            >
              {/* Image element with cover styling */}
              <Image
                src={banner.src}
                alt={banner.title}
                fill
                sizes="600px"
                className="object-cover transition-opacity duration-300 pointer-events-none"
                // Load unoptimized since files are added locally by users
                unoptimized
              />

              {/* Gradient overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

              {/* Dynamic Fallback Gradient Backdrop if image fails */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${banner.gradient} opacity-90`} />

              {/* Banner Text Content */}
              <div className="relative z-20 select-none">
                <span className="font-display text-[10px] font-black uppercase tracking-widest text-brand-yellow">
                  AUSTROPICAL SUPERFOOD
                </span>
                <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-white leading-tight max-w-[480px]">
                  {banner.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
