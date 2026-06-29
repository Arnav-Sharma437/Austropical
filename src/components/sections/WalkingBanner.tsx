'use client'

import React from 'react'

// Generate parallel wavy ribbon clip path coordinates dynamically:
// Top wave centers around Y=15, bottom wave centers around Y=45.
// Amplitude is 8px, wavelength is 100px.
// Ribbon height is exactly 30px.
const generateFlagPath = () => {
  let topPath = `M 0 15`;
  const waveLength = 100;
  const numWaves = 45; // covers up to 4500px width
  
  for (let i = 0; i < numWaves; i++) {
    const x = i * waveLength;
    topPath += ` Q ${x + 25} 7, ${x + 50} 15 Q ${x + 75} 23, ${x + 100} 15`;
  }
  
  const endX = numWaves * waveLength;
  let bottomPath = ` L ${endX} 45`;
  
  for (let i = numWaves - 1; i >= 0; i--) {
    const x = i * waveLength;
    bottomPath += ` Q ${x + 75} 53, ${x + 50} 45 Q ${x + 25} 37, ${x} 45`;
  }
  
  bottomPath += ` L 0 45 Z`;
  return topPath + bottomPath;
};

const FLAG_PATH = generateFlagPath();

const Character = () => (
  <div style={{ position: 'relative', width: 80, height: 130 }}>
    {/* Hexagon Body */}
    <div style={{
      width: 54, height: 75,
      background: '#2D1B69',
      clipPath: 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)',
      position: 'absolute',
      top: 25, left: 13,
      zIndex: 10,
    }}>
      {/* Cute face */}
      <div style={{ position: 'absolute', top: 18, left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
          {/* Left Eye */}
          <div style={{ width: 10, height: 12, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 2 }}>
            <div style={{ width: 4, height: 4, background: '#2D1B69', borderRadius: '50%' }} />
          </div>
          {/* Right Eye */}
          <div style={{ width: 10, height: 12, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 2 }}>
            <div style={{ width: 4, height: 4, background: '#2D1B69', borderRadius: '50%' }} />
          </div>
        </div>
        {/* Smiling mouth */}
        <div style={{
          width: 14, height: 7,
          border: '2.5px solid white',
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
        }}/>
      </div>
    </div>

    {/* Left arm holding the flagpole */}
    <div style={{
      position: 'absolute',
      top: 60,
      left: -3,
      width: 24,
      height: 12,
      background: '#2D1B69',
      borderRadius: 6,
      transform: 'rotate(-25deg)',
      transformOrigin: 'right center',
      zIndex: 12,
    }}/>

    {/* Right arm swaying */}
    <div style={{
      position: 'absolute',
      top: 55,
      right: -2,
      width: 12,
      height: 28,
      background: '#2D1B69',
      borderRadius: 6,
      transform: 'rotate(20deg)',
      transformOrigin: 'top center',
      animation: 'arm-sway 1s ease-in-out infinite alternate',
      zIndex: 8,
    }}/>

    {/* Left leg walking */}
    <div style={{
      position: 'absolute',
      bottom: 8,
      left: 16,
      width: 14,
      height: 26,
      background: '#2D1B69',
      borderRadius: 7,
      transformOrigin: 'top center',
      animation: 'leg-left-walk 0.5s ease-in-out infinite alternate',
      zIndex: 5,
    }}/>

    {/* Right leg walking */}
    <div style={{
      position: 'absolute',
      bottom: 8,
      right: 16,
      width: 14,
      height: 26,
      background: '#2D1B69',
      borderRadius: 7,
      transformOrigin: 'top center',
      animation: 'leg-right-walk 0.5s ease-in-out infinite alternate',
      zIndex: 5,
    }}/>

    {/* Flagpole - slanted up-left */}
    <div style={{
      position: 'absolute',
      top: -40,
      left: -12,
      width: 4,
      height: 100,
      background: '#2D1B69',
      borderRadius: 2,
      transform: 'rotate(-8deg)',
      transformOrigin: 'bottom center',
      zIndex: 9,
    }}/>

    {/* Wavy flag banner trailing to the right from the pole top */}
    <div style={{
      position: 'absolute',
      top: -48,
      left: -26,
      width: '120vw',
      height: 60,
      background: '#2D1B69',
      clipPath: `path('${FLAG_PATH}')`,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 24,
      overflow: 'hidden',
      zIndex: 8,
    }}>
      {/* Repeating text content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        whiteSpace: 'nowrap',
        animation: 'flag-text-scroll 12s linear infinite',
        color: 'white',
        fontWeight: 900,
        fontSize: 12,
        letterSpacing: 1,
        fontFamily: 'Fredoka One, sans-serif',
        marginTop: 5,
      }}>
        {[
          '⚡ 100% VEGAN',
          '⚡ GLUTEN FREE',
          '⚡ ORGANIC',
          '⚡ DAIRY FREE',
          '⚡ PLANT-BASED',
          '⚡ 100% VEGAN',
          '⚡ GLUTEN FREE',
          '⚡ ORGANIC',
          '⚡ DAIRY FREE',
          '⚡ PLANT-BASED',
          '⚡ 100% VEGAN',
          '⚡ GLUTEN FREE',
          '⚡ ORGANIC',
          '⚡ DAIRY FREE',
          '⚡ PLANT-BASED',
        ].map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  </div>
);

const WavyFlagMobile = () => (
  <div style={{
    position: 'relative',
    width: '100%',
    height: 60,
    background: '#2D1B69',
    clipPath: `path('${FLAG_PATH}')`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    overflow: 'hidden',
  }}>
    {/* Repeating text content */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      whiteSpace: 'nowrap',
      animation: 'flag-text-scroll 12s linear infinite',
      color: 'white',
      fontWeight: 900,
      fontSize: 12,
      letterSpacing: 1,
      fontFamily: 'Fredoka One, sans-serif',
      marginTop: 5,
    }}>
      {[
        '⚡ 100% VEGAN',
        '⚡ GLUTEN FREE',
        '⚡ ORGANIC',
        '⚡ DAIRY FREE',
        '⚡ PLANT-BASED',
        '⚡ 100% VEGAN',
        '⚡ GLUTEN FREE',
        '⚡ ORGANIC',
        '⚡ DAIRY FREE',
        '⚡ PLANT-BASED',
      ].map((text, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
);

const bannerStyles = `
  @keyframes scene-walk {
    0% { transform: translateX(100vw); }
    100% { transform: translateX(-130vw); }
  }

  @keyframes leg-left-walk {
    0% { transform: rotate(-20deg); }
    100% { transform: rotate(20deg); }
  }

  @keyframes leg-right-walk {
    0% { transform: rotate(20deg); }
    100% { transform: rotate(-20deg); }
  }

  @keyframes arm-wave {
    0% { transform: rotate(-50deg); }
    100% { transform: rotate(-35deg); }
  }

  @keyframes arm-sway {
    0% { transform: rotate(15deg); }
    100% { transform: rotate(30deg); }
  }

  @keyframes flag-text-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes body-bounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
`;

export default function WalkingBanner() {
  return (
    <section style={{
      position: 'relative',
      height: 280,
      background: '#C8F5A0',
      overflow: 'hidden',
      width: '100%',
    }}>
      <style dangerouslySetInnerHTML={{ __html: bannerStyles }} />
      
      {/* Ground strip - slanted */}
      <div style={{
        position: 'absolute',
        bottom: -20,
        left: '-5%',
        width: '110%',
        height: 80,
        background: '#A8E063',
        transform: 'rotate(-2.5deg)',
        transformOrigin: 'left center',
      }}/>

      {/* Desktop Version: Walking character holding wavy flag */}
      <div className="hidden md:flex" style={{
        position: 'absolute',
        bottom: 25,
        alignItems: 'flex-end',
        animation: 'scene-walk 18s linear infinite',
        width: 'max-content',
      }}>
        {/* Character with body bounce */}
        <div style={{ animation: 'body-bounce 0.5s ease-in-out infinite' }}>
          <Character />
        </div>
      </div>

      {/* Mobile Version: Centered wavy flag banner, no character */}
      <div className="flex md:hidden absolute inset-0 items-center justify-center px-4 z-10">
        <WavyFlagMobile />
      </div>
    </section>
  )
}
