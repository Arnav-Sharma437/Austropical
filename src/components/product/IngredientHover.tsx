"use client";

import React from "react";
import { motion } from "framer-motion";

interface IngredientHoverProps {
  ingredients: string[];
  isHovered: boolean;
}

// Target coordinate map for each index (up to 8 ingredients)
const INGREDIENT_POSITIONS = [
  { x: -130, y: -80, rotate: -25 },  // Ingredient 1
  { x: 120, y: -90, rotate: 15 },   // Ingredient 2
  { x: -100, y: 100, rotate: 40 },   // Ingredient 3
  { x: 110, y: 90, rotate: -20 },    // Ingredient 4
  { x: 20, y: -140, rotate: 10 },    // Ingredient 5
  { x: -30, y: 130, rotate: -35 },   // Ingredient 6
  { x: -140, y: 20, rotate: 15 },    // Ingredient 7 (fallback)
  { x: 140, y: -20, rotate: -15 }    // Ingredient 8 (fallback)
];

// Vibrant background and border colors for each ingredient emoji
const getIngredientColors = (emoji: string) => {
  switch (emoji) {
    case "🍇": return { bg: "bg-purple-500/20", border: "border-purple-400/40" };
    case "🍌": return { bg: "bg-yellow-500/20", border: "border-yellow-400/40" };
    case "🥥": return { bg: "bg-stone-500/20", border: "border-stone-400/40" };
    case "🫐": return { bg: "bg-blue-600/20", border: "border-blue-500/40" };
    case "🍓": return { bg: "bg-red-500/20", border: "border-red-400/40" };
    case "🥬": return { bg: "bg-emerald-500/20", border: "border-emerald-400/40" };
    case "🍍": return { bg: "bg-amber-400/20", border: "border-amber-300/40" };
    case "🥭": return { bg: "bg-orange-500/20", border: "border-orange-400/40" };
    case "🍋": return { bg: "bg-yellow-400/20", border: "border-yellow-300/40" };
    case "🍏": return { bg: "bg-green-500/20", border: "border-green-400/40" };
    case "🥝": return { bg: "bg-lime-500/20", border: "border-lime-400/40" };
    default: return { bg: "bg-white/10", border: "border-white/20" };
  }
};

export default function IngredientHover({ ingredients, isHovered }: IngredientHoverProps) {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      {ingredients.map((ingredient, idx) => {
        // Extract emoji and name
        const spaceIdx = ingredient.indexOf(" ");
        const emoji = spaceIdx !== -1 ? ingredient.slice(0, spaceIdx) : "🌱";
        const label = spaceIdx !== -1 ? ingredient.slice(spaceIdx + 1) : ingredient;

        // Get custom coordinates (cycle if ingredients count > positions count)
        const pos = INGREDIENT_POSITIONS[idx % INGREDIENT_POSITIONS.length];
        const colors = getIngredientColors(emoji);

        // Transition physics configuration
        const springTransition = isHovered
          ? {
              type: "spring" as const,
              stiffness: 200,
              damping: 20,
              delay: idx * 0.04, // Stagger effect
            }
          : {
              type: "spring" as const,
              stiffness: 300,
              damping: 30,
            };

        return (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
            animate={
              isHovered
                ? { x: pos.x, y: pos.y, scale: 1, opacity: 1, rotate: pos.rotate }
                : { x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }
            }
            transition={springTransition}
            className={`absolute flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm shadow-lg ${colors.bg} ${colors.border}`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-xl">{emoji}</span>
              <span className="text-[7px] font-black uppercase tracking-tighter text-white/80 font-body max-w-[45px] text-center truncate">
                {label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
