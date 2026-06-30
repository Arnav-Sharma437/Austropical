"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ChevronDown, User } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { useCart } from "@/context/CartContext";

const CENTER_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "SHOP", hasDropdown: true },
  { href: "/about", label: "OUR STORY" },
  { href: "/sustainability", label: "SUPERFRUITS" },
  { href: "/recipes", label: "RECIPES" },
  { href: "/contact", label: "CONTACT" }
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
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
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [pathname]);

  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    },
    exit: { 
      opacity: 0, 
      y: "-100%",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <div className="w-full z-[100] relative">
      {/* 1. Thin Dark Purple Announcement Bar */}
      <div className="bg-[#2D1B4E] text-white text-[11px] font-medium py-2.5 px-6 md:px-12 flex justify-between items-center z-[110] relative select-none">
        <div className="hidden md:flex items-center gap-6 mx-auto">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
            🌱 100% Vegan
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
            🌾 Gluten Free
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
            ⭐ Certified Organic
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
            🍧 Superfood Ice Cream
          </span>
        </div>
        <div className="flex md:hidden items-center gap-2 mx-auto font-bold uppercase tracking-wider text-center">
          🍧 100% VEGAN • GLUTEN FREE • ORGANIC
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold">
          <Link href="/products" className="hover:text-brand-yellow transition-colors flex items-center gap-1">
            <User size={13} />
            <span>My Account</span>
          </Link>
          <span className="opacity-30">|</span>
          <Link href="/cart" className="hover:text-brand-yellow transition-colors flex items-center gap-1">
            <ShoppingBag size={13} />
            <span>Cart ({cartCount})</span>
          </Link>
        </div>
      </div>

      {/* 2. White Sticky Navbar */}
      <nav 
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled 
            ? "sticky top-0 z-[100] shadow-md border-b border-gray-100 py-3" 
            : "relative py-4 border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center gap-2" data-hover="true">
            {logoSrc ? (
              <div className="relative h-10 w-36 md:h-12 md:w-40 flex items-center">
                <Image
                  src={logoSrc}
                  alt="austropical"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <>
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C12 2 15 6 15 11C15 14 13.5 17 11 21C11 21 8 18 8 13C8 8.5 10 5 12 2Z"
                    fill="url(#nav-leaf-1)"
                  />
                  <path
                    d="M12 2C12 2 9 6 9 11C9 14 10.5 17 13 21C13 21 16 18 16 13C16 8.5 14 5 12 2Z"
                    fill="url(#nav-leaf-2)"
                    opacity="0.85"
                    style={{ mixBlendMode: "screen" }}
                  />
                  <defs>
                    <linearGradient id="nav-leaf-1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="100%" stopColor="#FF1493" />
                    </linearGradient>
                    <linearGradient id="nav-leaf-2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#00A86B" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="font-display text-xl font-black lowercase tracking-tighter text-brand-dark">
                  austropical
                </span>
              </>
            )}
          </Link>

          {/* Center Links (Desktop Nav) */}
          <div className="hidden lg:flex items-center gap-6">
            {CENTER_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    <button 
                      className={`font-display text-xs font-bold uppercase tracking-wider flex items-center gap-1 py-2 text-brand-dark hover:text-brand-orange transition-colors`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {isShopDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl rounded-xl py-3 min-w-[200px] z-[120]"
                        >
                          <Link href="/products?category=acai" className="block px-4 py-2 text-xs font-semibold text-brand-dark hover:bg-[#FDF6ED] hover:text-brand-orange transition-colors font-display">
                            Açaí Bowls & Tubs
                          </Link>
                          <Link href="/products?category=sorbet" className="block px-4 py-2 text-xs font-semibold text-brand-dark hover:bg-[#FDF6ED] hover:text-brand-orange transition-colors font-display">
                            Premium Sorbets
                          </Link>
                          <Link href="/products?category=cubes" className="block px-4 py-2 text-xs font-semibold text-brand-dark hover:bg-[#FDF6ED] hover:text-brand-orange transition-colors font-display">
                            Smoothie Cubes
                          </Link>
                          <Link href="/products?category=pops" className="block px-4 py-2 text-xs font-semibold text-brand-dark hover:bg-[#FDF6ED] hover:text-brand-orange transition-colors font-display">
                            Tropical Ice Pops
                          </Link>
                          <Link href="/products?category=packs" className="block px-4 py-2 text-xs font-semibold text-brand-dark hover:bg-[#FDF6ED] hover:text-brand-orange transition-colors font-display">
                            Grab & Go Packs
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-display text-xs font-bold uppercase tracking-wider transition-colors py-2 ${
                    isActive ? "text-brand-orange" : "text-brand-dark hover:text-brand-orange"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-orange rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button (Desktop Nav) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/products">
              <MagneticButton className="rounded-full bg-[#2D1B4E] text-white px-7 py-3 font-display text-[11px] font-black uppercase tracking-wider shadow-md hover:bg-opacity-95 hover:scale-105 transition-all">
                SHOP NOW
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/cart" className="relative flex items-center justify-center">
              <MagneticButton className="h-10 w-10 rounded-full bg-white text-brand-dark shadow-md flex items-center justify-center border border-gray-100">
                <ShoppingBag size={16} />
              </MagneticButton>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF1493] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm select-none font-display">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-[110] text-brand-dark focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[95] flex flex-col justify-between bg-white px-6 py-24 md:px-12"
          >
            <div className="flex flex-col gap-6 pt-12">
              {CENTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl font-black uppercase text-brand-dark hover:text-brand-orange transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <Link href="/products">
                <button className="w-full rounded-full bg-[#2D1B4E] text-white py-3.5 font-display text-sm font-black uppercase tracking-wider shadow-md">
                  SHOP NOW
                </button>
              </Link>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center mt-2">
                © {new Date().getFullYear()} Austropical. Real Fruit, Real Goodness.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
