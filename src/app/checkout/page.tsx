"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ArrowRight, Check, CreditCard, ShoppingBag, MapPin, UserCheck, ShieldCheck } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, shippingCost, tax, total, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("Australia");

  // Payment Mock Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(val);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        alert("Please fill in all customer details.");
        return;
      }
    } else if (step === 2) {
      if (!street.trim() || !city.trim() || !state.trim() || !postcode.trim()) {
        alert("Please complete shipping address details.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      customer: { name, email, phone },
      shippingAddress: { street, city, state, postcode, country },
      items: cartItems.map((item) => ({
        product: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant
      })),
      subtotal,
      shippingCost,
      tax,
      total,
      paymentMethod: "Stripe"
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit order");
      }

      const createdOrder = await res.json();
      await clearCart(); // Reset cart context
      router.push(`/checkout/success?orderNumber=${createdOrder.orderNumber}`);
    } catch (err: any) {
      alert(err.message || "Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="min-h-screen bg-[#FCF9F2] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-2xl font-black uppercase text-brand-dark">No items to checkout</h1>
        <Link href="/products" className="mt-4 text-brand-orange hover:underline font-body text-sm font-bold">
          Return to catalogue
        </Link>
      </div>
    );
  }

  const stepsList = [
    { num: 1, label: "Info", icon: UserCheck },
    { num: 2, label: "Shipping", icon: MapPin },
    { num: 3, label: "Review", icon: ShoppingBag },
    { num: 4, label: "Payment", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-brand-dark pt-32 pb-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Step Indicator Header */}
        <div className="max-w-xl mx-auto mb-12 flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-brand-dark/10 -translate-y-1/2 z-0" />
          {stepsList.map((s) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border-2 font-display text-xs font-black transition-all ${
                    isCompleted
                      ? "bg-brand-green border-brand-green text-white"
                      : isActive
                      ? "bg-brand-orange border-brand-orange text-white"
                      : "bg-[#FCF9F2] border-brand-dark/15 text-brand-dark/40"
                  }`}
                >
                  {isCompleted ? <Check size={14} /> : s.num}
                </div>
                <span className={`text-[10px] uppercase font-display font-black tracking-wider ${isActive ? "text-brand-orange" : "text-brand-dark/40"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Form Wizards */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-brand-dark/5 shadow-lg p-8 space-y-8">
            
            {/* STEP 1: Customer Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark border-b border-brand-dark/5 pb-4">
                  Customer Information
                </h2>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arnav Sharma"
                    className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arnav@gmail.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+61 400 123 456"
                      className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark border-b border-brand-dark/5 pb-4">
                  Shipping Address
                </h2>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="123 Tropical Way"
                    className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">City / Suburb</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Cairns"
                      className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">State / Territory</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="QLD"
                      className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Postcode</label>
                    <input
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="4870"
                      className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Country</label>
                    <input
                      type="text"
                      disabled
                      value={country}
                      className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/10 text-brand-dark/50 font-body text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark border-b border-brand-dark/5 pb-4">
                  Review Order Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm font-body text-brand-dark/85">
                  <div className="space-y-1">
                    <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 block">Customer Info</span>
                    <p className="font-bold">{name}</p>
                    <p className="text-brand-dark/60">{email}</p>
                    <p className="text-brand-dark/60">{phone}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 block">Shipping Location</span>
                    <p>{street}</p>
                    <p>{city}, {state} {postcode}</p>
                    <p>{country}</p>
                  </div>
                </div>

                <div className="border-t border-brand-dark/5 pt-6 space-y-4">
                  <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 block">Items List</span>
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-brand-dark/5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <span className="font-body text-brand-dark font-bold">
                          {item.name} {item.variant ? `(${item.variant})` : ""} <span className="text-brand-dark/40 font-normal">x {item.quantity}</span>
                        </span>
                      </div>
                      <span className="font-body font-bold text-brand-dark">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Mock Stripe Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark border-b border-brand-dark/5 pb-4">
                  Mock Card Payment
                </h2>

                <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="text-brand-orange flex-shrink-0" size={20} />
                  <div className="font-body text-xs text-brand-dark/80">
                    <p className="font-bold">Stripe Payment Gateway integration coming soon!</p>
                    <p className="mt-1 text-brand-dark/60 leading-relaxed">Fill in mock details below and click "Place Order" to complete checkout simulation.</p>
                  </div>
                </div>

                {/* Simulated Credit Card Graphic */}
                <div className="relative h-48 w-full max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-brand-orange to-brand-pink p-6 text-white flex flex-col justify-between shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-display text-[8px] font-black uppercase tracking-wider opacity-60">Card Issuer</span>
                      <span className="font-display text-sm font-black lowercase tracking-tighter text-white">austropical</span>
                    </div>
                    <CreditCard size={28} className="opacity-80" />
                  </div>

                  <div className="font-mono text-lg tracking-widest text-center select-none py-2">
                    {cardNumber || "•••• •••• •••• ••••"}
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="font-display text-[7px] font-black uppercase tracking-wider opacity-60">Card Holder</span>
                      <span className="font-body text-xs font-bold uppercase tracking-wider truncate max-w-[180px]">{name || "Your Name"}</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col text-right">
                        <span className="font-display text-[7px] font-black uppercase tracking-wider opacity-60">Expires</span>
                        <span className="font-mono text-xs">{cardExpiry || "MM/YY"}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="font-display text-[7px] font-black uppercase tracking-wider opacity-60">CVC</span>
                        <span className="font-mono text-xs">{cardCvc || "•••"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/50">Card Number</span>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 1234 5678"
                      className="w-full px-4 py-2 text-sm border border-brand-dark/15 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/50">Expiration</span>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="px-4 py-2 text-sm border border-brand-dark/15 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/50">CVC</span>
                      <input
                        type="text"
                        maxLength={3}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="px-4 py-2 text-sm border border-brand-dark/15 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="border-t border-brand-dark/5 pt-6 flex justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 border border-brand-dark/15 text-brand-dark hover:bg-brand-dark/5 py-3 px-6 rounded-full font-display text-xs font-black uppercase tracking-wider transition"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <Link href="/cart">
                  <button className="flex items-center gap-2 border border-brand-dark/15 text-brand-dark hover:bg-brand-dark/5 py-3 px-6 rounded-full font-display text-xs font-black uppercase tracking-wider transition">
                    <ArrowLeft size={14} /> Return to Cart
                  </button>
                </Link>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 bg-brand-orange text-white hover:bg-brand-pink py-3.5 px-6 rounded-full font-display text-xs font-black uppercase tracking-wider transition shadow-md shadow-brand-orange/15"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-pink text-white hover:scale-[1.01] py-4 px-8 rounded-full font-display text-xs font-black uppercase tracking-widest transition shadow-lg shadow-brand-orange/15 disabled:opacity-50"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Checkout Billing Summary */}
          <div className="p-8 bg-white rounded-3xl border border-brand-dark/5 shadow-lg space-y-6 lg:sticky lg:top-24">
            <h3 className="font-display text-base font-black uppercase tracking-tight text-brand-dark pb-4 border-b border-brand-dark/5">
              Billing Summary
            </h3>

            <div className="space-y-4 font-body text-sm">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between gap-4 text-xs text-brand-dark/70">
                  <span>{item.name} {item.variant ? `(${item.variant})` : ""} <span className="font-normal opacity-60">x {item.quantity}</span></span>
                  <span className="font-bold text-brand-dark">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}

              <div className="border-t border-brand-dark/5 pt-4 space-y-3">
                <div className="flex justify-between text-brand-dark/70 text-xs">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-dark">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-brand-dark/70 text-xs">
                  <span>Shipping Cost</span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-brand-green uppercase text-[10px] tracking-wider bg-brand-green/10 px-1.5 py-0.5 rounded border border-brand-green/20">Free</span>
                  ) : (
                    <span className="font-bold text-brand-dark">{formatCurrency(shippingCost)}</span>
                  )}
                </div>

                <div className="flex justify-between text-brand-dark/70 text-xs">
                  <span>Estimated GST (10%)</span>
                  <span className="font-bold text-brand-dark">{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm font-display font-black text-brand-dark border-t border-brand-dark/5 pt-4">
                <span>Final Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
