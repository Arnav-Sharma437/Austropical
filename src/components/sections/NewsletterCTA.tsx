'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "loading">("idle")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <section className="relative bg-[#3A8FD6] py-20 overflow-hidden select-none">
      {/* Decorative Acai Bowl Bottom-Right */}
      <div className="absolute right-[-100px] bottom-[-80px] w-64 h-64 opacity-80 pointer-events-none select-none z-10 hidden sm:block">
        <Image 
          src="/hero/toon-1.webp" 
          alt="Acai Bowl Decor" 
          fill
          className="object-contain object-bottom scale-110"
          unoptimized
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-8 relative z-20 text-center text-white flex flex-col items-center">
        
        {/* Title */}
        <h2 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
          JOIN THE AUSTROPICAL COMMUNITY 💜
        </h2>
        {/* Description */}
        <p className="mt-4 font-body text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
          Exclusive offers, recipes and wellness updates.
        </p>

        {/* Subscribe Form */}
        <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-full px-6 py-3.5 text-xs sm:text-sm font-semibold text-brand-dark placeholder-gray-400 focus:outline-none border-2 border-transparent focus:border-[#2D1B4E] transition-all"
          />
          <button 
            type="submit"
            disabled={status === "loading"}
            className="bg-[#2D1B4E] hover:bg-opacity-95 text-white font-display text-xs font-black uppercase tracking-wider rounded-full px-8 py-3.5 active:scale-95 transition-all shadow-md shrink-0"
          >
            {status === "loading" ? "SUBSCRIBING..." : status === "success" ? "SUBSCRIBED!" : "SUBSCRIBE"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-3 text-xs font-bold font-display uppercase tracking-widest text-[#FFB627]">
            Awesome! Welcome to the family!
          </p>
        )}

      </div>
    </section>
  )
}
