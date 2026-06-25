"use client";

import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
}

const REVIEWS: Testimonial[] = [
  {
    quote: "I've tried a lot of vegan ice creams, but Austropical takes the cake. It's so rich and creamy, you won't believe it is 100% dairy-free!",
    name: "Sarah M.",
    location: "Sydney",
    rating: 5,
  },
  {
    quote: "The Acai Sorbet is my absolute go-to after a morning surf. It is incredibly refreshing and has just the right level of natural sweetness.",
    name: "Liam T.",
    location: "Byron Bay",
    rating: 5,
  },
  {
    quote: "Zero dairy, zero added sugar, but 100% flavour. Austropical is officially stocked in our family freezer for good.",
    name: "Emma K.",
    location: "Melbourne",
    rating: 5,
  },
  {
    quote: "Those Passion Fruit Ice Pops are pure tropical heaven! Low calories means I can eat them every afternoon guilt-free.",
    name: "David P.",
    location: "Gold Coast",
    rating: 5,
  },
  {
    quote: "Smoothie cubes are a total game-changer. I pop a few into a blender with coconut water, and I have a cafe-grade smoothie in seconds.",
    name: "Jessica L.",
    location: "Brisbane",
    rating: 5,
  },
];

export default function Testimonials() {
  // Duplicate reviews to create a seamless infinite loop scrolling effect
  const scrollingReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
      {/* Dynamic CSS for testimonial scrolling marquee */}
      <style jsx global>{`
        @keyframes testimonial-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .animate-testimonial-marquee {
          display: flex;
          width: max-content;
          animation: testimonial-marquee 40s linear infinite;
        }
        .testimonial-container:hover .animate-testimonial-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-yellow">
            SPOON-TESTED BY AUSSIES
          </span>
          <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            LOVED BY SUN-CHASERS
          </h2>
        </div>

      </div>

      {/* Infinite Scrolling Cards */}
      <div className="testimonial-container mt-16 flex w-full overflow-hidden select-none py-4">
        <div className="animate-testimonial-marquee gap-6 px-4">
          {scrollingReviews.map((item, idx) => (
            <div
              key={idx}
              className="flex w-[290px] flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-8 shadow-xl backdrop-blur-sm sm:w-[350px]"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-brand-yellow">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {/* Quote */}
                <p className="mt-6 font-body text-sm leading-relaxed text-white/80 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 border-t border-white/5 pt-4">
                <h4 className="font-display text-sm font-extrabold uppercase text-white tracking-wide">
                  {item.name}
                </h4>
                <p className="text-xs text-white/40 font-body mt-0.5">
                  Verified Buyer, {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
