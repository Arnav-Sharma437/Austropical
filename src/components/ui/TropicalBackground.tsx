"use client";

import React from "react";

interface TropicalBackgroundProps {
  color: "orange" | "pink" | "purple" | "green" | "blue";
  children?: React.ReactNode;
  className?: string;
}

const COLOR_MAP = {
  orange: "#FF6B00",
  pink: "#FF1493",
  purple: "#4B0082",
  green: "#1B5E20",
  blue: "#0D47A1",
};

// SVG repeating tropical leaf pattern encoded as data URI
// The leaf SVG draws a stylized tropical split-leaf (monstera style)
const LEAF_PATTERN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><g fill="%23FFFFFF" fill-opacity="1"><path d="M30,10 C45,10 55,25 55,45 C55,55 48,65 30,85 C12,65 5,55 5,45 C5,25 15,10 30,10 Z M30,25 C24,35 20,45 20,50 C20,58 24,63 30,68 C36,63 40,58 40,50 C40,45 36,35 30,25 Z" opacity="0.5"/><path d="M90,70 C105,70 115,85 115,105 C115,115 108,125 90,145 C72,125 65,115 65,105 C65,85 75,70 90,70 Z" opacity="0.3"/><path d="M85,20 C95,20 102,30 102,42 C102,49 97,55 85,67 C73,55 68,49 68,42 C68,30 75,20 85,20 Z" opacity="0.4"/><path d="M35,80 C42,80 47,87 47,95 C47,100 43,105 35,113 C27,105 23,100 23,95 C23,87 28,80 35,80 Z" opacity="0.3"/></g></svg>`;

export default function TropicalBackground({
  color,
  children,
  className = "",
}: TropicalBackgroundProps) {
  const bgColor = COLOR_MAP[color];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Repeating SVG Leaf Pattern Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.12] bg-repeat"
        style={{
          backgroundImage: `url('${LEAF_PATTERN_SVG}')`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
