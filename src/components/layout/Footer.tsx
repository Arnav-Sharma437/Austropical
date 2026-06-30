"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Heart } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

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
    <footer className="relative bg-[#1E1235] text-white pt-20 pb-8 overflow-hidden select-none">
      
      {/* Decorative leaf bottom-right */}
      <div className="absolute right-[-30px] bottom-[-20px] w-48 h-48 text-[#FF6B00] opacity-5 pointer-events-none z-10 rotate-[45deg]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 10 C30 10 15 25 15 45 C15 52 18 60 22 66 C21 68 18 69 16 68 C14 67 11 62 10 58 C9 56 7 57 8 59 C10 65 14 71 18 73 C20 74 21 73 22 71 C26 77 32 82 40 85 C39 82 37 77 37 73 C37 71 39 70 41 71 C42 72 44 76 45 81 C47 84 49 86 50 87 C51 86 53 84 55 81 C56 76 58 72 59 71 C61 70 63 71 63 73 C63 77 61 82 60 85 C68 82 74 77 78 71 C79 73 80 74 82 73 C86 71 90 65 92 59 C93 57 91 56 90 58 C89 62 86 67 84 68 C82 69 79 68 78 66 C82 60 85 52 85 45 C85 25 70 10 50 10 Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-20">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-b border-white/10 pb-16">
          
          {/* Logo Area */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 max-w-max">
              {logoSrc ? (
                <div className="relative h-12 w-40 flex items-center brightness-0 invert">
                  <Image
                    src={logoSrc}
                    alt="austropical logo"
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="font-display text-3xl font-black lowercase tracking-tighter text-white">
                  austropical
                </span>
              )}
            </Link>
            
            <div className="font-display text-[10px] font-black tracking-[0.25em] text-[#FF6B00] uppercase mt-1">
              WILDLY NATURAL
            </div>
            
            <p className="max-w-xs text-sm text-white/70 leading-relaxed font-body mt-2">
              Australia's premium tropical superfood ice cream. 100% Vegan. Gluten-free. Certified organic.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <MagneticButton className="h-10 w-10 rounded-full border border-white/20 text-white hover:border-[#FF6B00] hover:bg-[#FF6B00] transition-colors duration-300">
                <InstagramIcon size={18} />
              </MagneticButton>
              <MagneticButton className="h-10 w-10 rounded-full border border-white/20 text-white hover:border-[#FF6B00] hover:bg-[#FF6B00] transition-colors duration-300">
                <FacebookIcon size={18} />
              </MagneticButton>
              <MagneticButton className="h-10 w-10 rounded-full border border-white/20 text-white hover:border-[#FF6B00] hover:bg-[#FF6B00] transition-colors duration-300">
                <TikTokIcon size={18} />
              </MagneticButton>
              <a href="mailto:hello@austropical.com">
                <MagneticButton className="h-10 w-10 rounded-full border border-white/20 text-white hover:border-[#FF6B00] hover:bg-[#FF6B00] transition-colors duration-300">
                  <Mail size={18} />
                </MagneticButton>
              </a>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-[#FFB627]">
              SHOP
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-white/70">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ABOUT Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-[#FFB627]">
              ABOUT
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-white/70">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-[#FFB627]">
              SUPPORT
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-white/70">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GET IN TOUCH Column (Rendered at Say Hello position) */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-[#FFB627]">
              GET IN TOUCH
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-white/70">
              <li>
                <a href="mailto:hello@austropical.com" className="hover:text-brand-orange transition-colors">
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
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row text-xs text-white/40 font-body">
          <p className="w-full text-center tracking-wide leading-relaxed font-display font-semibold uppercase">
            REAL FRUIT • PLANT-BASED • CLEAN INGREDIENTS • GOOD VIBES • MADE FOR YOU • Made with <Heart size={10} className="inline text-[#E91E63] fill-current" /> in Australia
          </p>
        </div>

      </div>
    </footer>
  );
}
