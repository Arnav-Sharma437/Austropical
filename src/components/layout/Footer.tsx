"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
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

const SHOP_LINKS = [
  { label: "Acai Buckets", href: "/products?filter=ACAI%20BUCKETS" },
  { label: "Grab 'n Go 3-Packs", href: "/products?filter=GRAB'N%20GO" },
  { label: "Ice Pop Line", href: "/products?filter=ICE%20POP%20LINE" },
  { label: "Smoothie Cubes", href: "/products?filter=SMOOTHIE%20CUBES" },
  { label: "Sorbet Line", href: "/products?filter=SORBET%20LINE" }
];

const COMPANY_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Philosophy", href: "/about#philosophy" },
  { label: "Team", href: "/about#team" },
  { label: "Sustainability", href: "/sustainability" }
];

const CONTACT_LINKS = [
  { label: "Support & FAQs", href: "/contact" },
  { label: "Wholesale Inquiry", href: "/contact?type=wholesale" },
  { label: "Store Locator", href: "/contact" }
];

export default function Footer() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/api/logo");
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          setLogoSrc(`/logo/${data.files[0]}`);
        }
      } catch (err) {
        console.error("Failed to load footer logo:", err);
      }
    }
    loadLogo();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#FAF6EE] pt-24 pb-12 text-brand-dark">
      
      {/* Wavy SVG divider on top of footer */}
      <div className="absolute left-0 right-0 top-0 w-full overflow-hidden leading-[0] translate-y-[-99%] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[60px] md:h-[100px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96 C280,32 560,160 840,64 C1120,-32 1280,32 1440,0 L1440,120 L0,120 Z"
            fill="#FAF6EE"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2" data-hover="true">
              {logoSrc ? (
                <div className="relative h-10 w-36 flex items-center">
                  <Image
                    src={logoSrc}
                    alt="austropical"
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="font-display text-3xl font-black lowercase tracking-tighter text-brand-dark">
                  austropical
                </span>
              )}
            </Link>
            <p className="max-w-xs text-sm text-brand-dark/60 leading-relaxed font-body">
              Australia's premium tropical superfood ice cream. 100% Vegan. Gluten-free. Certified organic. Bringing the sun to your spoon.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <MagneticButton className="h-10 w-10 rounded-full border border-brand-dark/15 text-brand-dark hover:border-brand-orange hover:bg-brand-orange hover:text-white">
                <InstagramIcon size={16} />
              </MagneticButton>
              <MagneticButton className="h-10 w-10 rounded-full border border-brand-dark/15 text-brand-dark hover:border-brand-orange hover:bg-brand-orange hover:text-white">
                <FacebookIcon size={16} />
              </MagneticButton>
              <MagneticButton className="h-10 w-10 rounded-full border border-brand-dark/15 text-brand-dark hover:border-brand-orange hover:bg-brand-orange hover:text-white">
                <Mail size={16} />
              </MagneticButton>
            </div>
          </div>

          {/* Shop Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-orange">
              SHOP
            </h4>
            <ul className="flex flex-col gap-2 font-body text-sm text-brand-dark/70">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-dark transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-pink">
              AUSTROPICAL
            </h4>
            <ul className="flex flex-col gap-2 font-body text-sm text-brand-dark/70">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-dark transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-yellow">
              SAY HELLO
            </h4>
            <ul className="flex flex-col gap-2 font-body text-sm text-brand-dark/70">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-dark transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Huge stretched brand text */}
        <div className="relative mt-16 select-none overflow-hidden text-center md:mt-24">
          <h2 className="font-display text-[14vw] font-black leading-none lowercase tracking-tighter text-brand-dark/[0.04]">
            austropical
          </h2>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-brand-dark/10 pt-8 text-xs text-brand-dark/50 md:flex-row font-body">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link href="/" className="hover:text-brand-dark transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-brand-dark transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-brand-dark transition-colors">Refund Policy</Link>
          </div>
          <p>© {new Date().getFullYear()} Austropical. Australia's Brighter Snack Choice. Made with 🧡</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-brand-dark transition-colors uppercase font-display font-bold tracking-wider"
          >
            Back to top <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
