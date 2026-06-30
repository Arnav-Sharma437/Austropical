'use client'

import React from 'react'
import { Sparkles, Heart, Smile, CheckCircle } from 'lucide-react'
import WaveDivider from '../ui/WaveDivider'

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Zero Dairy",
    desc: "Creamy indulgence without the dairy."
  },
  {
    icon: Sparkles,
    title: "Zero Sugar Added",
    desc: "Naturally sweetened for a healthier choice."
  },
  {
    icon: Heart,
    title: "Low Calories",
    desc: "Indulge guilt-free with lower calories."
  },
  {
    icon: Smile,
    title: "Premium Taste",
    desc: "Exceptional taste in every scoop."
  }
]

export default function FeatureStrip() {
  return (
    <section className="relative bg-[#2D1B4E] pt-16 pb-0 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div key={idx} className="flex flex-col items-center gap-4 group">
                {/* Circle Icon Outline wrapper */}
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-white/50 transition-all duration-300">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-display font-black uppercase text-lg tracking-wider">
                  {feat.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-white/70 max-w-xs leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Wave divider bottom: dark purple -> cream (#FDF6ED) */}
      <div className="relative z-20 mt-16">
        <WaveDivider fromColor="transparent" toColor="#FDF6ED" />
      </div>
    </section>
  )
}
