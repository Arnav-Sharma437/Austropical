'use client'

import React from 'react'

interface WaveDividerProps {
  fromColor: string
  toColor: string
  flip?: boolean
}

export default function WaveDivider({ fromColor, toColor, flip }: WaveDividerProps) {
  return (
    <div style={{ background: fromColor, lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg 
        viewBox="0 0 1440 100" 
        preserveAspectRatio="none" 
        style={{ width: '100%', height: 80, display: 'block' }}
      >
        <path 
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z" 
          fill={toColor}
        />
      </svg>
    </div>
  )
}
