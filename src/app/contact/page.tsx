"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

type FormStatus = "idle" | "loading" | "success";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-32 pb-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Page Hero */}
        <div className="text-center mb-16">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-pink">
            GET IN TOUCH
          </span>
          <h1 className="mt-2 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
            SAY HELLO
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-sm md:text-base text-white/50">
            Have questions about wholesale, ingredients, or just want to tell us your favourite flavour? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 mt-12 items-start">
          
          {/* Left: Contact Info (5 Cols) */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h2 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                CONTACT DETAILS
              </h2>
              <p className="mt-2 text-sm text-white/50 font-body">
                Drop us a message, email, or give us a buzz.
              </p>
            </div>

            <div className="flex flex-col gap-6 font-body text-sm text-white/85">
              
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-brand-orange">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-wider">EMAIL US</p>
                  <p className="hover:text-brand-orange transition-colors mt-0.5">hello@austropical.com.au</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-brand-pink">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-wider">CALL US</p>
                  <p className="hover:text-brand-pink transition-colors mt-0.5">+61 (02) 9876 5432</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-brand-yellow">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-wider">VISIT HEADQUARTERS</p>
                  <p className="hover:text-brand-yellow transition-colors mt-0.5">14 Bondi Road, Bondi Beach, NSW 2026</p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                FOLLOW OUR SUN-CHASING JOURNEY
              </h3>
              <div className="flex gap-4">
                <MagneticButton className="h-12 w-12 rounded-full border border-white/10 text-white hover:border-brand-orange hover:bg-brand-orange">
                  <InstagramIcon size={18} />
                </MagneticButton>
                <MagneticButton className="h-12 w-12 rounded-full border border-white/10 text-white hover:border-brand-pink hover:bg-brand-pink">
                  <FacebookIcon size={18} />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 Cols) */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10 backdrop-blur-md lg:col-span-7 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/20 border border-brand-green text-brand-green mb-6 animate-pulse">
                    <Check size={28} strokeWidth={3} />
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    MESSAGE SENT!
                  </h3>
                  <p className="mt-2 text-sm text-white/60 font-body max-w-sm">
                    Thank you for reaching out. A member of our sun-chasing team will respond to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs font-display font-black uppercase tracking-wider text-brand-orange hover:underline focus:outline-none"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-8"
                >
                  {/* Name Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      disabled={status === "loading"}
                      className="peer block w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-orange placeholder-transparent transition-colors font-body text-sm"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 text-sm text-white/40 origin-[0_0] transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-brand-orange font-body font-medium"
                    >
                      YOUR NAME
                    </label>
                  </div>

                  {/* Email Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      disabled={status === "loading"}
                      className="peer block w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-orange placeholder-transparent transition-colors font-body text-sm"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-3 text-sm text-white/40 origin-[0_0] transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-brand-orange font-body font-medium"
                    >
                      YOUR EMAIL
                    </label>
                  </div>

                  {/* Message Textarea with Floating Label */}
                  <div className="relative">
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder=" "
                      disabled={status === "loading"}
                      className="peer block w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-orange placeholder-transparent transition-colors font-body text-sm resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-3 text-sm text-white/40 origin-[0_0] transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-brand-orange font-body font-medium"
                    >
                      MESSAGE
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-start">
                    <MagneticButton
                      type="submit"
                      disabled={status === "loading" || !formData.name || !formData.email || !formData.message}
                      className="rounded-full bg-brand-orange px-8 py-4 font-display text-xs font-black uppercase tracking-wider text-white shadow-xl hover:bg-brand-orange/95 hover:shadow-brand-orange/20 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                      data-hover="true"
                    >
                      {status === "loading" ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          SEND MESSAGE
                        </>
                      )}
                    </MagneticButton>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
