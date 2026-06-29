'use client'

import React from 'react'

const Character = () => (
  <div style={{ position: 'relative', width: 80, height: 120 }}>
    {/* Body - acai tub shape */}
    <div style={{
      width: 60, height: 55,
      background: '#2D1B69',
      borderRadius: '8px 8px 14px 14px',
      position: 'absolute',
      top: 20, left: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Lid */}
      <div style={{
        position: 'absolute', top: -10, left: -5,
        width: 70, height: 18,
        background: '#3D2B89',
        borderRadius: 9,
      }}/>
      {/* Face */}
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Eyes */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 7, height: 7, background: 'white', borderRadius: '50%' }}/>
          <div style={{ width: 7, height: 7, background: 'white', borderRadius: '50%' }}/>
        </div>
        {/* Smile */}
        <div style={{
          width: 16, height: 8,
          border: '2px solid white',
          borderTop: 'none',
          borderRadius: '0 0 10px 10px'
        }}/>
      </div>
    </div>

    {/* Left arm - raised up holding flag */}
    <div style={{
      position: 'absolute', top: 15, left: -12,
      width: 12, height: 35,
      background: '#2D1B69',
      borderRadius: 6,
      transform: 'rotate(-45deg)',
      transformOrigin: 'bottom center',
      animation: 'arm-wave 0.8s ease-in-out infinite alternate'
    }}/>

    {/* Right arm */}
    <div style={{
      position: 'absolute', top: 35, right: -8,
      width: 12, height: 28,
      background: '#2D1B69',
      borderRadius: 6,
      transform: 'rotate(20deg)',
      animation: 'arm-sway 1s ease-in-out infinite alternate'
    }}/>

    {/* Left leg */}
    <div style={{
      position: 'absolute', bottom: 0, left: 12,
      width: 14, height: 30,
      background: '#2D1B69',
      borderRadius: 7,
      transformOrigin: 'top center',
      animation: 'leg-left-walk 0.5s ease-in-out infinite alternate'
    }}/>

    {/* Right leg */}
    <div style={{
      position: 'absolute', bottom: 0, right: 12,
      width: 14, height: 30,
      background: '#2D1B69',
      borderRadius: 7,
      transformOrigin: 'top center',
      animation: 'leg-right-walk 0.5s ease-in-out infinite alternate'
    }}/>

    {/* Flag pole */}
    <div style={{
      position: 'absolute', top: -80, left: -8,
      width: 3, height: 90,
      background: '#2D1B69',
      transform: 'rotate(-5deg)',
      transformOrigin: 'bottom center'
    }}/>
  </div>
)

const WavyFlag = () => (
  <div style={{
    position: 'absolute',
    top: 20,
    left: 55,
    width: '120vw',
    height: 70,
    background: '#2D1B69',
    clipPath: `path('M0,20 Q30,0 60,20 Q90,40 120,20 Q150,0 180,20 Q210,40 240,20 Q270,0 300,20 Q330,40 360,20 Q390,0 420,20 Q450,40 480,20 Q510,0 540,20 Q570,40 600,20 Q630,0 660,20 Q690,40 720,20 Q750,0 780,20 Q810,40 840,20 Q870,0 900,20 Q930,40 960,20 Q990,0 1020,20 Q1050,40 1080,20 Q1110,0 1140,20 Q1170,40 1200,20 Q1230,0 1260,20 Q1290,40 1320,20 Q1350,0 1380,20 Q1410,40 1440,20 Q1470,0 1500,20 Q1530,40 1560,20 Q1590,0 1620,20 Q1650,40 1680,20 Q1710,0 1740,20 Q1770,40 1800,20 Q1830,0 1860,20 Q1890,40 1920,20 Q1950,0 1980,20 Q2010,40 2040,20 Q2070,0 2100,20 Q2130,40 2160,20 Q2190,0 2220,20 Q2250,40 2280,20 Q2310,0 2340,20 Q2370,40 2400,20 Q2430,0 2460,20 Q2490,40 2520,20 Q2550,0 2580,20 Q2610,40 2640,20 Q2670,0 2700,20 Q2730,40 2760,20 Q2790,0 2820,20 Q2850,40 2880,20 Q2910,0 2940,20 Q2970,40 3000,20 Q3030,0 3060,20 Q3090,40 3120,20 Q3150,0 3180,20 Q3210,40 3240,20 Q3270,0 3300,20 Q3330,40 3360,20 Q3390,0 3420,20 Q3450,40 3480,20 Q3510,0 3540,20 Q3570,40 3600,20 L3600,70 L0,70 Z')`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
    overflow: 'hidden',
  }}>
    {/* Repeating text content */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      whiteSpace: 'nowrap',
      animation: 'flag-text-scroll 12s linear infinite',
      color: 'white',
      fontWeight: 900,
      fontSize: 18,
      letterSpacing: 1,
      fontFamily: 'Fredoka One, sans-serif',
    }}>
      {[
        '⚡ 100% VEGAN',
        '⚡ GLUTEN FREE',
        '⚡ CERTIFIED ORGANIC',
        '⚡ NO ADDED SUGAR',
        '⚡ DAIRY FREE',
        '⚡ AMAZON SUPERFOOD',
        '⚡ ESSENTIAL MINERALS',
        '⚡ NON GMO',
        '⚡ 100% PLANT-BASED',
        '⚡ 100% VEGAN',
        '⚡ GLUTEN FREE',
        '⚡ CERTIFIED ORGANIC',
      ].map((text, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
)

const WavyFlagMobile = () => (
  <div style={{
    position: 'relative',
    width: '100%',
    height: 70,
    background: '#2D1B69',
    clipPath: `path('M0,20 Q30,0 60,20 Q90,40 120,20 Q150,0 180,20 Q210,40 240,20 Q270,0 300,20 Q330,40 360,20 Q390,0 420,20 Q450,40 480,20 Q510,0 540,20 Q570,40 600,20 Q630,0 660,20 Q690,40 720,20 Q750,0 780,20 Q810,40 840,20 Q870,0 900,20 Q930,40 960,20 Q990,0 1020,20 Q1050,40 1080,20 Q1110,0 1140,20 Q1170,40 1200,20 Q1230,0 1260,20 Q1290,40 1320,20 Q1350,0 1380,20 Q1410,40 1440,20 Q1470,0 1500,20 Q1530,40 1560,20 Q1590,0 1620,20 Q1650,40 1680,20 Q1710,0 1740,20 Q1770,40 1800,20 Q1830,0 1860,20 Q1890,40 1920,20 Q1950,0 1980,20 Q2010,40 2040,20 Q2070,0 2100,20 Q2130,40 2160,20 Q2190,0 2220,20 Q2250,40 2280,20 Q2310,0 2340,20 Q2370,40 2400,20 Q2430,0 2460,20 Q2490,40 2520,20 Q2550,0 2580,20 Q2610,40 2640,20 Q2670,0 2700,20 Q2730,40 2760,20 Q2790,0 2820,20 Q2850,40 2880,20 Q2910,0 2940,20 Q2970,40 3000,20 Q3030,0 3060,20 Q3090,40 3120,20 Q3150,0 3180,20 Q3210,40 3240,20 Q3270,0 3300,20 Q3330,40 3360,20 Q3390,0 3420,20 Q3450,40 3480,20 Q3510,0 3540,20 Q3570,40 3600,20 L3600,70 L0,70 Z')`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    overflow: 'hidden',
  }}>
    {/* Repeating text content */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      whiteSpace: 'nowrap',
      animation: 'flag-text-scroll 12s linear infinite',
      color: 'white',
      fontWeight: 900,
      fontSize: 16,
      letterSpacing: 1,
      fontFamily: 'Fredoka One, sans-serif',
    }}>
      {[
        '⚡ 100% VEGAN',
        '⚡ GLUTEN FREE',
        '⚡ CERTIFIED ORGANIC',
        '⚡ NO ADDED SUGAR',
        '⚡ DAIRY FREE',
        '⚡ AMAZON SUPERFOOD',
        '⚡ ESSENTIAL MINERALS',
        '⚡ NON GMO',
        '⚡ 100% PLANT-BASED',
        '⚡ 100% VEGAN',
        '⚡ GLUTEN FREE',
        '⚡ CERTIFIED ORGANIC',
      ].map((text, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
)

const bannerStyles = `
  @keyframes scene-walk {
    0% { transform: translateX(-180px); }
    100% { transform: translateX(110vw); }
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
      
      {/* Ground strip */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        background: '#A8E063',
        borderRadius: '60% 60% 0 0 / 20px 20px 0 0',
      }}/>

      {/* Desktop Version: Walking character holding wavy flag */}
      <div className="hidden md:flex" style={{
        position: 'absolute',
        bottom: 45,
        alignItems: 'flex-end',
        animation: 'scene-walk 18s linear infinite',
        width: 'max-content',
      }}>
        {/* Character with body bounce */}
        <div style={{ animation: 'body-bounce 0.5s ease-in-out infinite' }}>
          <Character />
        </div>

        {/* Wavy flag extends from character */}
        <WavyFlag />
      </div>

      {/* Mobile Version: Centered wavy flag banner, no character */}
      <div className="flex md:hidden absolute inset-0 items-center justify-center px-4 z-10">
        <WavyFlagMobile />
      </div>
    </section>
  )
}
