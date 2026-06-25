"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/lib/products";
import IngredientHover from "./IngredientHover";
import MagneticButton from "../ui/MagneticButton";

interface ProductCardProps {
  product: Product;
}

// Solid color Base64 image placeholder to bypass remote image blur requirements
const solidColorBlurDataURL = 
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { name, category, price, image, ingredients, bgColor, textColor } = product;

  // Determine text coloring based on card background contrast
  const isLightBg = textColor === "#0D0D0D" || bgColor === "#FFD700" || bgColor === "#FFF";
  const mainTextColor = isLightBg ? "text-brand-dark" : "text-white";
  const secondaryTextColor = isLightBg ? "text-brand-dark/60" : "text-white/60";
  const buttonBgColor = isLightBg ? "bg-brand-dark text-white" : "bg-white text-brand-dark";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col justify-between overflow-visible rounded-3xl p-6 shadow-2xl transition-all duration-500 h-[480px] w-full max-w-[350px] mx-auto md:max-w-none"
      style={{ backgroundColor: bgColor }}
    >
      
      {/* Category & Title */}
      <div className="z-10 select-none">
        <span className={`font-display text-[10px] font-black uppercase tracking-widest ${secondaryTextColor}`}>
          {category}
        </span>
        <h3 className={`mt-1 font-display text-xl font-black leading-tight tracking-tight ${mainTextColor}`}>
          {name}
        </h3>
      </div>

      {/* Image & Ingredients Container */}
      <div className="relative my-4 flex h-[240px] w-full items-center justify-center">
        {/* Ingredient hover effect sitting behind the main product image */}
        <IngredientHover ingredients={ingredients} isHovered={isHovered} />

        {/* Product Image */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            y: isHovered ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative z-10 h-[190px] w-[190px]"
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 190px, 190px"
            placeholder="blur"
            blurDataURL={solidColorBlurDataURL}
            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
      </div>

      {/* Price & Add to Cart */}
      <div className="z-10 flex items-center justify-between mt-auto">
        <div className="select-none">
          <span className={`text-[10px] uppercase font-bold tracking-wider ${secondaryTextColor}`}>
            PRICE
          </span>
          <p className={`font-display text-2xl font-black leading-none ${mainTextColor}`}>
            {price}
          </p>
        </div>

        {/* Add to Cart button using Magnetic interaction */}
        <MagneticButton
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${buttonBgColor} hover:scale-105 transition-transform`}
          data-hover="true"
          aria-label="Add to cart"
        >
          <Plus size={20} strokeWidth={3} />
        </MagneticButton>
      </div>

    </motion.div>
  );
}
