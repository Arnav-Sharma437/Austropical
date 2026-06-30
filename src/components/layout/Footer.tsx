"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86 1.08 2.07 1.8 3.4 2.06v4.03c-1.89-.07-3.73-.83-5.13-2.12v7.07c.06 4.67-4.42 8.79-9.19 7.82-3.83-.78-6.66-4.66-5.83-8.62.62-2.95 3.19-5.18 6.22-5.12.82-.01 1.64.15 2.41.47V.02zm-2.41 12.02c-1.92-.05-3.66 1.49-3.83 3.42-.23 2.66 2.37 4.79 4.93 4.07 1.63-.46 2.53-2.2 2.31-3.83v-3.66z"/>
  </svg>
);

const PinterestIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.62 11.17-.1-.95-.2-2.4.04-3.44.22-.94 1.4-5.95 1.4-5.95s-.36-.72-.36-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.52.77 1.52 1.69 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.79-2.26 3.79-5.52 0-2.89-2.08-4.91-5.04-4.91-3.43 0-5.45 2.57-5.45 5.23 0 1.04.4 2.15.9 2.76.1.12.11.23.08.35-.09.37-.29 1.18-.33 1.34-.05.2-.18.25-.42.14-1.57-.73-2.55-3.02-2.55-4.86 0-3.96 2.88-7.6 8.3-7.6 4.36 0 7.74 3.1 7.74 7.25 0 4.33-2.73 7.82-6.52 7.82-1.27 0-2.47-.66-2.88-1.44 0 0-.63 2.4-.78 2.99-.28 1.08-1.04 2.43-1.56 3.27C9.62 23.78 10.78 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
  </svg>
);

const SHOP_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Ice Cream", href: "/products?category=sorbet" },
  { label: "Ice Pops", href: "/products?category=pops" },
  { label: "Smoothie Cubes", href: "/products?category=cubes" },
  { label: "Grab & Go Packs", href: "/products?category=packs" },
  { label: "Bundles", href: "/products" }
];

const ABOUT_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Our Ingredients", href: "/about" },
  { label: "FAQs", href: "/contact" }
];

const SUPPORT_LINKS = [
  { label: "Shipping & Delivery", href: "/contact" },
  { label: "Returns & Refunds", href: "/contact" },
  { label: "Terms & Conditions", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" }
];

export default function Footer() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/api/logo");
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          const whiteLogo = data.files.find((f: string) => f.toLowerCase().includes("white"));
          if (whiteLogo) {
            setLogoSrc(`/logo/${whiteLogo}`);
          } else {
            setLogoSrc(`/logo/${data.files[0]}`);
          }
        }
      } catch (err) {
        console.error("Failed to load footer logo:", err);
      }
    }
    loadLogo();
  }, []);

  return (
    <footer className="relative bg-[#1E1235] text-white py-10 overflow-hidden select-none">
      
      {/* Decorative cherries, blueberries, and palm leaf at the edges */}
      <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 text-[#FF6B00] opacity-[0.04] pointer-events-none z-10 rotate-[35deg]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 90 C50 60 40 30 15 15 C35 30 45 55 50 90 Z M50 90 C50 60 60 30 85 15 C65 30 55 55 50 90 Z M50 90 C48 65 30 45 10 40 C30 50 45 68 50 90 Z M50 90 C52 65 70 45 90 40 C70 50 55 68 50 90 Z" />
        </svg>
      </div>
      <div className="absolute left-4 top-6 opacity-[0.25] pointer-events-none select-none z-10 text-4xl animate-bounce">
        🍒
      </div>
      <div className="absolute left-16 top-16 opacity-[0.2] pointer-events-none select-none z-10 text-3xl">
        🫐
      </div>
      <div className="absolute right-6 top-6 opacity-[0.25] pointer-events-none select-none z-10 text-4xl animate-pulse">
        🌿
      </div>
      <div className="absolute right-20 top-16 opacity-[0.2] pointer-events-none select-none z-10 text-3xl">
        🍒
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-20">
        
        {/* Compact 5-Column Single Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start pb-8">
          
          {/* Column 1 (Wider layout matching) */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 max-w-max">
              {logoSrc ? (
                <div className="relative h-9 w-32 flex items-center brightness-0 invert">
                  <Image
                    src={logoSrc}
                    alt="austropical logo"
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              ) : (
                <>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C12 2 15 6 15 11C15 14 13.5 17 11 21C11 21 8 18 8 13C8 8.5 10 5 12 2Z"
                      fill="#FF6B00"
                    />
                    <path
                      d="M12 2C12 2 9 6 9 11C9 14 10.5 17 13 21C13 21 16 18 16 13C16 8.5 14 5 12 2Z"
                      fill="#FF1493"
                      opacity="0.85"
                      style={{ mixBlendMode: "screen" }}
                    />
                  </svg>
                  <span className="font-display text-lg font-black lowercase tracking-tighter text-white">
                    AUSTROPICAL
                  </span>
                </>
              )}
            </Link>
            
            <p className="text-[11px] text-white/70 leading-relaxed font-body">
              Australian superfoods inspired by nature. Made for a healthier and happier you.
            </p>
            
            {/* Social Icons row */}
            <div className="flex items-center gap-2.5 mt-2">
              <Link href="https://instagram.com" className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-[#FFB627] hover:bg-[#FFB627] hover:text-[#1E1235] transition-all flex items-center justify-center">
                <InstagramIcon size={14} />
              </Link>
              <Link href="https://facebook.com" className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-[#FFB627] hover:bg-[#FFB627] hover:text-[#1E1235] transition-all flex items-center justify-center">
                <FacebookIcon size={14} />
              </Link>
              <Link href="https://tiktok.com" className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-[#FFB627] hover:bg-[#FFB627] hover:text-[#1E1235] transition-all flex items-center justify-center">
                <TikTokIcon size={14} />
              </Link>
              <Link href="https://pinterest.com" className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-[#FFB627] hover:bg-[#FFB627] hover:text-[#1E1235] transition-all flex items-center justify-center">
                <PinterestIcon size={14} />
              </Link>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[11px] font-black uppercase tracking-wider text-[#FFB627]">
              SHOP
            </h4>
            <ul className="flex flex-col gap-2 font-body text-xs text-white/80">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[11px] font-black uppercase tracking-wider text-[#FFB627]">
              ABOUT
            </h4>
            <ul className="flex flex-col gap-2 font-body text-xs text-white/80">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: SUPPORT */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[11px] font-black uppercase tracking-wider text-[#FFB627]">
              SUPPORT
            </h4>
            <ul className="flex flex-col gap-2 font-body text-xs text-white/80">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: GET IN TOUCH */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[11px] font-black uppercase tracking-wider text-[#FFB627]">
              GET IN TOUCH
            </h4>
            <ul className="flex flex-col gap-2 font-body text-xs text-white/80">
              <li>
                <a href="mailto:hello@austropical.com" className="hover:text-white hover:underline transition-all">
                  hello@austropical.com
                </a>
              </li>
              <li>
                <span className="text-white/70">+61 400 123 456</span>
              </li>
              <li>
                <span className="text-white/70">Australia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center">
          <p className="text-[10px] sm:text-xs text-white/50 text-center tracking-wide leading-relaxed font-display font-semibold uppercase whitespace-pre-line md:whitespace-nowrap">
            REAL FRUIT  ·  PLANT-BASED  ·  CLEAN INGREDIENTS  ·  GOOD VIBES  ·  MADE FOR YOU  ·  Made with ❤️ in Australia
          </p>
        </div>

      </div>
    </footer>
  );
}
