"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for high-performance position tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configuration for 0.1 lerp-like smooth tracking
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if mobile or touch device
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches || 
                     window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Detect mouse hover on links, buttons, or elements with data-hover="true"
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isHoverable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest('[data-hover="true"]');

      if (isHoverable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="relative flex items-center justify-center"
      >
        {/* Core Dot (Brand Orange) */}
        <motion.div
          animate={{
            width: isHovered ? 8 : 40,
            height: isHovered ? 8 : 40,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="rounded-full bg-brand-orange mix-blend-difference"
        />

        {/* Explore Text Ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1.2 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute h-20 w-20 animate-spin-slow"
        >
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
            />
            <text className="fill-brand-orange text-[9px] font-extrabold uppercase letter-spacing-[3px] font-display">
              <textPath href="#circlePath" startOffset="0%">
                EXPLORE • TROPICAL • SUPERFOOD •
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
