"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "../product/ProductCard";
import MagneticButton from "../ui/MagneticButton";
import { fadeUpVariants } from "@/lib/animations";

export default function FeaturedProducts() {
  // Select first 5 items to showcase as featured
  const featured = products.slice(0, 5);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Implement mouse drag horizontal scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="featured-flavours"
      className="relative overflow-hidden bg-[#FCF9F2] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Scroll Triggered Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="text-center"
        >
          <motion.span
            variants={fadeUpVariants}
            className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-orange"
          >
            CRAVINGS SATISFIED
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-brand-dark sm:text-5xl md:text-6xl"
          >
            OUR FINEST FLAVOURS
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-4 max-w-md font-body text-sm md:text-base text-brand-dark/60"
          >
            Discover our crowd favourites, packed with antioxidants, fresh organic ingredients, and tropical energy.
          </motion.p>
        </motion.div>

      </div>

      {/* Horizontal Drag-To-Scroll Slider */}
      <div className="relative mt-16 w-full select-none">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`no-scrollbar flex w-full gap-6 overflow-x-auto px-6 py-6 md:px-12 lg:px-24 cursor-grab ${
            isDown ? "cursor-grabbing" : ""
          }`}
          style={{ scrollBehavior: isDown ? "auto" : "smooth" }}
        >
          {featured.map((product) => (
            <div
              key={product.id}
              className="w-[280px] shrink-0 sm:w-[320px] md:w-[350px] overflow-visible"
            >
              <ProductCard product={product} />
            </div>
          ))}

          {/* CTA Card at the end of slider */}
          <div className="flex w-[280px] shrink-0 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-dark/15 bg-brand-dark/[0.03] p-8 text-center sm:w-[320px] md:w-[350px]">
            <span className="text-4xl">🍦</span>
            <h3 className="mt-4 font-display text-2xl font-black uppercase text-brand-dark">
              Hungry for more?
            </h3>
            <p className="mt-2 text-sm text-brand-dark/60 font-body">
              Explore our full range of sorbets, cubes, buckets, and ice pop lines.
            </p>
            
            <Link href="/products" className="mt-6">
              <MagneticButton
                className="rounded-full bg-brand-orange px-6 py-3 font-display text-xs font-black uppercase tracking-wider text-white shadow-xl hover:bg-brand-orange/95 hover:shadow-brand-orange/20"
                data-hover="true"
              >
                VIEW ALL FLAVOURS
              </MagneticButton>
            </Link>
          </div>
        </div>

        {/* Small drag visual hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-brand-dark/40 text-xs font-bold uppercase tracking-widest font-display select-none">
          <span>DRAG TO SCROLL</span>
          <ArrowRight size={12} className="animate-pulse" />
        </div>
      </div>

    </section>
  );
}
