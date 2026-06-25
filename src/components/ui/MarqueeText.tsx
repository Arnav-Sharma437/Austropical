"use client";

import React from "react";

interface MarqueeTextProps {
  text: string;
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export default function MarqueeText({
  text,
  speed = 20,
  direction = "left",
  className = "",
  textClassName = "",
}: MarqueeTextProps) {
  // Duplicate the text multiple times to cover screen widths
  const content = Array(8).fill(text).join("  ");

  return (
    <div
      className={`marquee-container overflow-hidden whitespace-nowrap flex w-full select-none ${className}`}
      style={{
        // Set CSS variable for custom speeds
        "--speed": `${speed}s`,
      } as React.CSSProperties}
    >
      <div className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}>
        <span className={`inline-block pr-4 ${textClassName}`}>{content}</span>
        <span className={`inline-block pr-4 ${textClassName}`}>{content}</span>
      </div>
    </div>
  );
}
