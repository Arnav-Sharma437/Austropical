'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WaveDivider from '../ui/WaveDivider'

const PACKS = [
  {
    name: "Açai Power Pack",
    desc: "Nutritious & delicious for on-the-go energy.",
    price: "$9.99",
    image: "/hero/toon-1.webp"
  },
  {
    name: "Tropical Pack",
    desc: "Your tropical favourites, ready anywhere.",
    price: "$8.99",
    image: "/hero/toon-3.webp"
  },
  {
    name: "Berry Pack",
    desc: "Packed with berries and superfoods.",
    price: "$8.99",
    image: "/hero/toon-2.webp"
  },
  {
    name: "Green Pack",
    desc: "Greens and fruits for a healthy you.",
    price: "$8.99",
    image: "/hero/toon-4.webp"
  },
  {
    name: "Citrus Pack",
    desc: "Citrusy goodness for ultimate refreshment.",
    price: "$8.99",
    image: "/hero/toon-3.webp"
  }
]

export default function GrabGoPacks() {
  return (
    <section className="relative bg-[#FF7A3D] pt-20 pb-0 overflow-hidden select-none">
      
      {/* Decorative Popsicle Left Edge (Partially cropped) */}
      <div className="absolute left-[-40px] top-[30%] text-[100px] opacity-25 select-none pointer-events-none rotate-[-30deg] z-10 hidden md:block">
        🍧
      </div>
      {/* Decorative Fruit Bowl Right Edge (Partially cropped) */}
      <div className="absolute right-[-40px] top-[30%] text-[100px] opacity-25 select-none pointer-events-none rotate-[30deg] z-10 hidden md:block">
        🥭
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center text-white mb-12">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-white/80">
            PORTABLE TREATS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight mt-1">
            GRAB & GO PACKS
          </h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PACKS.map((pack, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-5 flex flex-col justify-between items-center text-center shadow-md hover:scale-[1.03] transition-transform duration-300"
            >
              {/* Product Image */}
              <div className="relative w-28 h-28 mb-4">
                <Image 
                  src={pack.image} 
                  alt={pack.name} 
                  fill 
                  className="object-contain object-bottom drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)]"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 w-full flex-1">
                <h3 className="font-display font-black text-xs uppercase text-brand-orange leading-tight">
                  {pack.name}
                </h3>
                <p className="font-body text-[10px] text-gray-500 line-clamp-2 mt-1 leading-normal">
                  {pack.desc}
                </p>
              </div>

              {/* Price & Add */}
              <span className="font-display font-black text-sm text-brand-dark mt-3">
                {pack.price}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-12">
          <Link href="/products?category=packs">
            <button className="border-2 border-white text-white hover:bg-white hover:text-brand-orange font-display text-xs font-black uppercase tracking-wider rounded-full px-8 py-3.5 active:scale-95 transition-all">
              VIEW ALL PACKS →
            </button>
          </Link>
        </div>

      </div>

      {/* Wave divider bottom: orange -> blue (#3A8FD6) */}
      <div className="relative z-20 mt-16 lg:mt-24">
        <WaveDivider fromColor="transparent" toColor="#3A8FD6" />
      </div>
    </section>
  )
}
