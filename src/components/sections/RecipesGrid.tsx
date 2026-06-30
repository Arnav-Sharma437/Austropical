'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sun } from 'lucide-react'
import WaveDivider from '../ui/WaveDivider'

const RECIPES = [
  {
    title: "Mango Coconut Bliss",
    desc: "Mango, coconut & pineapple for a tropical burst.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=150&h=150&fit=crop&q=80"
  },
  {
    title: "Green Harmony",
    desc: "A refreshing blend of greens, apple & lime.",
    image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=150&h=150&fit=crop&q=80"
  },
  {
    title: "Berry Radiance",
    desc: "A vibrant mix of berries for a naturally sweet delight.",
    image: "https://images.unsplash.com/photo-1513612254195-b27a3f45bb68?w=150&h=150&fit=crop&q=80"
  },
  {
    title: "Citrus Splash",
    desc: "Zesty lemon, orange & passionfruit for a tangy twist.",
    image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=150&h=150&fit=crop&q=80"
  },
  {
    title: "Golden Glow",
    desc: "Turmeric, ginger & pineapple for an immunity boost.",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=150&h=150&fit=crop&q=80"
  },
  {
    title: "Dragon Delight",
    desc: "Dragon fruit, berries & coconut for a refreshing indulgence.",
    image: "https://images.unsplash.com/photo-1527324688151-0e627063f291?w=150&h=150&fit=crop&q=80"
  }
]

export default function RecipesGrid() {
  return (
    <section className="relative bg-[#FFB627] pt-20 pb-0 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center text-[#2D1B4E] mb-12">
          <div className="flex items-center gap-1.5">
            <Sun size={20} className="text-[#2D1B4E] animate-spin-slow" />
            <span className="font-display text-xs font-black uppercase tracking-[0.25em]">
              HEALTHY & REFRESHING
            </span>
            <Sun size={20} className="text-[#2D1B4E] animate-spin-slow" />
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
            SUPERFRUITS & SORBETS
          </h2>
        </div>

        {/* 3-Column Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECIPES.map((recipe, idx) => (
            <div 
              key={idx} 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-5 flex items-center gap-4 transition-colors duration-300"
            >
              {/* Recipe Image Preview */}
              <div className="relative w-20 h-20 bg-white/20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <Image 
                  src={recipe.image} 
                  alt={recipe.title} 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* Recipe Text Details */}
              <div className="flex flex-col gap-1 text-[#2D1B4E]">
                <h3 className="font-display font-black text-sm uppercase tracking-wide">
                  {recipe.title}
                </h3>
                <p className="font-body text-xs text-[#2D1B4E]/80 leading-snug">
                  {recipe.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-12">
          <Link href="/recipes">
            <button className="border-2 border-[#2D1B4E] text-[#2D1B4E] hover:bg-[#2D1B4E] hover:text-white font-display text-xs font-black uppercase tracking-wider rounded-full px-8 py-3.5 active:scale-95 transition-all">
              VIEW ALL RECIPES →
            </button>
          </Link>
        </div>

      </div>

      {/* Wave divider bottom: orange -> dark purple (#2D1B4E) */}
      <div className="relative z-20 mt-16">
        <WaveDivider fromColor="transparent" toColor="#2D1B4E" />
      </div>
    </section>
  )
}
