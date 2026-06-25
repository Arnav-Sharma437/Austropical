"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  strength?: number; // scale factor of the magnetic pull
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;

    // Constrain magnetic movement to 40px radius
    const distance = Math.sqrt(x * x + y * y);
    const maxRadius = 40;

    if (distance > maxRadius) {
      const angle = Math.atan2(y, x);
      setPosition({
        x: Math.cos(angle) * maxRadius,
        y: Math.sin(angle) * maxRadius,
      });
    } else {
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring" as const, stiffness: 120, damping: 12, mass: 0.2 }}
      className={`relative inline-flex items-center justify-center transition-shadow duration-300 ${className}`}
      {...props}
    >
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  );
}
