"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { useCart } from "@/context/CartContext";

const LEFT_LINKS = [
  { href: "/products", label: "SHOP" },
  { href: "/about", label: "ABOUT US" },
  { href: "/sustainability", label: "SUSTAINABILITY" }
];

const RIGHT_LINKS = [
  { href: "/products?filter=SORBET%20LINE", label: "ALL FLAVOURS" },
  { href: "/contact", label: "CONTACT US" }
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/api/logo");
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          setLogoSrc(`/logo/${data.files[0]}`);
        }
      } catch (err) {
        console.error("Failed to load logo:", err);
      }
    }
    loadLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const allLinks = [...LEFT_LINKS, ...RIGHT_LINKS];
  
  // Dynamic color state based on whether the page has a dark hero or not
  const hasHero = pathname === "/" || pathname === "/about" || pathname === "/sustainability";
  const activeScrolled = isScrolled || !hasHero;

  const linkColor = activeScrolled ? "text-brand-dark hover:text-brand-orange" : "text-white hover:text-brand-orange";
  const logoColor = activeScrolled ? "text-brand-dark" : "text-white";
  const secondaryLinkColor = activeScrolled ? "text-brand-dark/70 hover:text-brand-dark" : "text-white/70 hover:text-white";
  const iconColor = activeScrolled ? "text-brand-dark hover:text-brand-orange" : "text-white hover:text-brand-orange";
  const borderClass = activeScrolled ? "border-brand-dark/10" : "border-white/10";

  // Mobile menu animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    },
    exit: { 
      opacity: 0, 
      y: "-100%",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  const navLinksContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const navLinkVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 120, damping: 12 } }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
          activeScrolled
            ? "border-b border-brand-dark/10 bg-[#FCF9F2]/80 py-4 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          
          {/* Left Navigation Links (Desktop) */}
          <div className="hidden items-center gap-8 lg:flex">
            {LEFT_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-display text-xs font-semibold uppercase tracking-wider transition-colors ${linkColor}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-orange"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Logo (Center) */}
          <Link href="/" className="z-[110] flex items-center gap-2" data-hover="true">
            {logoSrc ? (
              <div className="relative h-10 w-36 md:h-12 md:w-40 flex items-center">
                <Image
                  src={logoSrc}
                  alt="austropical"
                  fill
                  className="object-contain object-left md:object-center"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <>
                {/* Colorful Leaf SVG Icon */}
                <svg className="h-8 w-8 text-brand-orange" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C12 2 15 6 15 11C15 14 13.5 17 11 21C11 21 8 18 8 13C8 8.5 10 5 12 2Z"
                    fill="url(#gradient-leaf-1)"
                  />
                  <path
                    d="M12 2C12 2 9 6 9 11C9 14 10.5 17 13 21C13 21 16 18 16 13C16 8.5 14 5 12 2Z"
                    fill="url(#gradient-leaf-2)"
                    opacity="0.85"
                    style={{ mixBlendMode: "screen" }}
                  />
                  <defs>
                    <linearGradient id="gradient-leaf-1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="100%" stopColor="#FF1493" />
                    </linearGradient>
                    <linearGradient id="gradient-leaf-2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#00A86B" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className={`font-display text-xl font-black lowercase tracking-tighter transition-colors ${logoColor}`}>
                  austropical
                </span>
              </>
            )}
          </Link>

          {/* Right Navigation Links (Desktop) */}
          <div className="hidden items-center gap-8 lg:flex">
            {RIGHT_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-display text-xs font-semibold uppercase tracking-wider transition-colors ${linkColor}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-orange"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Login & Cart Button */}
            <div className={`flex items-center gap-4 border-l pl-6 ${borderClass}`}>
              <Link href="/products" className={`font-display text-xs font-semibold uppercase tracking-wider transition-colors ${secondaryLinkColor}`}>
                LOGIN
              </Link>
              
              <Link href="/cart" className="relative flex items-center justify-center">
                <MagneticButton className="h-10 w-10 rounded-full bg-white text-brand-dark shadow-lg hover:shadow-brand-orange/20 flex items-center justify-center">
                  <ShoppingBag size={16} className="text-brand-dark" />
                </MagneticButton>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-pink text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#FCF9F2] shadow-sm select-none font-display">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/cart" className="relative flex items-center justify-center">
              <MagneticButton className="h-10 w-10 rounded-full bg-white text-brand-dark shadow-md flex items-center justify-center">
                <ShoppingBag size={16} />
              </MagneticButton>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-pink text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#FCF9F2] shadow-sm select-none font-display">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`z-[110] focus:outline-none transition-colors ${isMobileMenuOpen ? "text-brand-dark" : iconColor}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[95] flex flex-col justify-between bg-[#FCF9F2] px-6 py-24 md:px-12"
          >
            {/* Wavy Background Graphic overlay */}
            <div className="absolute inset-0 -z-10 opacity-5">
              <svg className="h-full w-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,20 50,50 T100,50 V100 H0 Z" fill="#FF6B00" />
              </svg>
            </div>

            <motion.div
              variants={navLinksContainerVariants}
              className="flex flex-col gap-6 pt-12"
            >
              {allLinks.map((link) => (
                <motion.div key={link.href} variants={navLinkVariants}>
                  <Link
                    href={link.href}
                    className="font-display text-3xl font-extrabold uppercase text-brand-dark hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 border-t border-brand-dark/10 pt-6"
            >
              <div className="flex items-center gap-6">
                <Link
                  href="/products"
                  className="font-display text-lg font-bold uppercase text-brand-dark hover:text-brand-pink"
                >
                  LOGIN
                </Link>
                <Link
                  href="/products"
                  className="font-display text-lg font-bold uppercase text-brand-dark hover:text-brand-pink"
                >
                  VIEW PRODUCTS
                </Link>
              </div>
              <p className="text-xs text-brand-dark/50">
                © {new Date().getFullYear()} Austropical. Australia's Brighter Snack Choice.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
