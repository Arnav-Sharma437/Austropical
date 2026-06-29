"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight, Check } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import WalkingProduct from "../ui/WalkingProduct";

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
  { label: "Acai Buckets", href: "/products?filter=ACAI%20BUCKETS" },
  { label: "Grab 'n Go 3-Packs", href: "/products?filter=GRAB'N%20GO" },
  { label: "Ice Pop Line", href: "/products?filter=ICE%20POP%20LINE" },
  { label: "Smoothie Cubes", href: "/products?filter=SMOOTHIE%20CUBES" },
  { label: "Sorbet Line", href: "/products?filter=SORBET%20LINE" },
  { label: "Super Fruits", href: "/products?filter=SUPER%20FRUITS" }
];

const COMPANY_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Philosophy", href: "/about#philosophy" },
  { label: "Team", href: "/about#team" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Wholesale", href: "/contact?type=wholesale" }
];

const CONTACT_LINKS = [
  { label: "Support & FAQs", href: "/contact" },
  { label: "Wholesale Inquiry", href: "/contact?type=wholesale" },
  { label: "Store Locator", href: "/contact" },
  { label: "Contact Us", href: "/contact" }
];

const MonsteraLeafSVG = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
    <path d="M50 10 C30 10 15 25 15 45 C15 52 18 60 22 66 C21 68 18 69 16 68 C14 67 11 62 10 58 C9 56 7 57 8 59 C10 65 14 71 18 73 C20 74 21 73 22 71 C26 77 32 82 40 85 C39 82 37 77 37 73 C37 71 39 70 41 71 C42 72 44 76 45 81 C47 84 49 86 50 87 C51 86 53 84 55 81 C56 76 58 72 59 71 C61 70 63 71 63 73 C63 77 61 82 60 85 C68 82 74 77 78 71 C79 73 80 74 82 73 C86 71 90 65 92 59 C93 57 91 56 90 58 C89 62 86 67 84 68 C82 69 79 68 78 66 C82 60 85 52 85 45 C85 25 70 10 50 10 Z M50 25 C51 25 52 26 52 27 L52 75 C52 76 51 77 50 77 C49 77 48 76 48 75 L48 27 C48 26 49 25 50 25 Z" />
  </svg>
);

const PalmLeafSVG = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
    <path d="M50 90 C50 60 40 30 15 15 C35 30 45 55 50 90 Z M50 90 C50 60 60 30 85 15 C65 30 55 55 50 90 Z M50 90 C48 65 30 45 10 40 C30 50 45 68 50 90 Z M50 90 C52 65 70 45 90 40 C70 50 55 68 50 90 Z" />
  </svg>
);

const LeafOverlay = () => (
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden select-none">
    <div className="absolute left-[-40px] top-[-30px] w-64 h-64 text-white transform -rotate-12">
      <MonsteraLeafSVG />
    </div>
    <div className="absolute right-[-50px] bottom-[-40px] w-72 h-72 text-white transform rotate-45">
      <MonsteraLeafSVG />
    </div>
    <div className="absolute left-[30%] bottom-[-50px] w-48 h-48 text-white transform rotate-180 opacity-50">
      <PalmLeafSVG />
    </div>
    <div className="absolute right-[25%] top-[-60px] w-56 h-56 text-white transform -rotate-45 opacity-50">
      <PalmLeafSVG />
    </div>
  </div>
);

export default function Footer() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/api/logo");
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          // Look for logo with "white" in its file name first
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0D0B1A] text-white overflow-hidden">
      
      {/* SECTION 1: Newsletter Banner */}
      <div className="relative w-full bg-gradient-to-r from-[#FF6B00] to-[#FF1493] py-[60px] px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
        <LeafOverlay />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          {!isSubscribed ? (
            <>
              <div className="space-y-2">
                <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
                  JOIN THE AUSTROPICAL COMMUNITY
                </h3>
                <p className="font-body text-white/90 text-sm md:text-base max-w-xl mx-auto">
                  Exclusive offers, product launches and tropical updates.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mt-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-white text-[#FF1493] font-display font-black tracking-wider uppercase text-xs hover:bg-[#FFD700] hover:text-[#0D0B1A] transition-all hover:scale-105 active:scale-95 duration-200 shadow-md cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-4 max-w-lg animate-fade-in">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF1493] mb-4 shadow-lg">
                <Check className="h-7 w-7 stroke-[3]" />
              </div>
              <h3 className="font-display text-2xl font-black text-white uppercase tracking-wider">
                Welcome to the family, {name}! 🌴
              </h3>
              <p className="text-white/90 font-body text-sm md:text-base mt-2 leading-relaxed">
                You've subscribed successfully. Prepare your tastebuds for some serious tropical goodness!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          
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
              <a href="mailto:hello@austropical.com" className="pointer-events-auto">
                <MagneticButton className="h-10 w-10 rounded-full border border-white/20 text-white hover:border-[#FF6B00] hover:bg-[#FF6B00] transition-colors duration-300">
                  <Mail size={18} />
                </MagneticButton>
              </a>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#FFD700]">
              SHOP
            </h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/70">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="relative pb-0.5 hover:text-[#FFD700] after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AUSTROPICAL Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#FF1493]">
              AUSTROPICAL
            </h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/70">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="relative pb-0.5 hover:text-[#FF1493] after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#00C853]">
              SAY HELLO
            </h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/70">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="relative pb-0.5 hover:text-[#00C853] after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Big subtle background branding */}
        <div className="relative mt-16 select-none overflow-hidden text-center md:mt-24 pointer-events-none">
          <h2 className="font-display text-[11vw] font-black leading-none lowercase tracking-tighter text-white/[0.02]">
            austropical
          </h2>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row font-body">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
          <p>© {new Date().getFullYear()} Austropical. Australia's Brighter Snack Choice. Made with 🧡</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors uppercase font-display font-bold tracking-wider"
          >
            Back to top <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
      
      {/* SECTION 3: Dark Strip with Walking Product */}
      <div className="relative w-full bg-[#080610] h-[120px] overflow-hidden border-t border-white/[0.05]">
        <WalkingProduct />
      </div>

    </footer>
  );
}

