"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CartPage() {
  const {
    cartItems,
    loading,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    tax,
    total
  } = useCart();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(val);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF9F2] pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center font-display text-sm font-black uppercase text-brand-dark/40 animate-pulse">
          Loading your cart items...
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCF9F2] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <div className="h-20 w-20 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-6">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-black uppercase text-brand-dark tracking-tight">
          Your tub is empty!
        </h1>
        <p className="font-body text-sm text-brand-dark/60 mt-3 max-w-sm">
          Looks like you haven't added any tropical superfoods to your scoop bucket yet. Let's fix that!
        </p>
        <div className="mt-8">
          <Link href="/products">
            <MagneticButton className="bg-brand-orange text-white py-4 px-8 rounded-full font-display text-xs font-black uppercase tracking-wider shadow-lg shadow-brand-orange/15">
              Shop All Flavours
            </MagneticButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-brand-dark pt-32 pb-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-dark mb-10">
          Your Scoop Bucket
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, idx) => (
              <div
                key={`${item.product}-${item.variant || ""}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md hover:shadow-lg transition-all"
              >
                {/* Product details & thumbnail */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-2xl border border-brand-dark/10 overflow-hidden bg-[#FAF6EE] flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs font-bold text-brand-dark/30 select-none">
                        Bowl
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display text-base font-black uppercase text-brand-dark tracking-tight leading-tight">
                      {item.name}
                    </span>
                    {item.variant && (
                      <span className="text-[10px] uppercase font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20 mt-1 max-w-fit font-body">
                        Size: {item.variant}
                      </span>
                    )}
                    <span className="text-xs text-brand-dark/50 mt-1 font-body">
                      {formatCurrency(item.price)} each
                    </span>
                  </div>
                </div>

                {/* Adjuster & Pricing */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-brand-dark/15 rounded-xl bg-[#FCF9F2]/30 px-1 py-1">
                    <button
                      onClick={() => updateCartQuantity(item.product, Math.max(1, item.quantity - 1), item.variant)}
                      className="p-1 text-brand-dark/60 hover:text-brand-orange hover:bg-brand-dark/5 rounded-lg transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold font-body">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product, item.quantity + 1, item.variant)}
                      className="p-1 text-brand-dark/60 hover:text-brand-orange hover:bg-brand-dark/5 rounded-lg transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Total price for line */}
                  <span className="font-body text-base font-bold text-brand-dark min-w-[70px] text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </span>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.product, item.variant)}
                    className="p-2.5 border border-brand-dark/10 hover:border-brand-pink/30 hover:bg-brand-pink/5 text-brand-dark/50 hover:text-brand-pink rounded-xl transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Checkout Summary Card */}
          <div className="p-8 bg-white rounded-3xl border border-brand-dark/5 shadow-lg space-y-6 lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-brand-dark pb-4 border-b border-brand-dark/5">
              Order Summary
            </h3>

            <div className="space-y-4 font-body text-sm">
              <div className="flex justify-between text-brand-dark/70">
                <span>Subtotal</span>
                <span className="font-bold text-brand-dark">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between text-brand-dark/70">
                <span>Shipping</span>
                {shippingCost === 0 ? (
                  <span className="font-bold text-brand-green uppercase text-xs tracking-wider bg-brand-green/10 px-2 py-0.5 rounded border border-brand-green/20">
                    Free Shipping
                  </span>
                ) : (
                  <span className="font-bold text-brand-dark">{formatCurrency(shippingCost)}</span>
                )}
              </div>

              {shippingCost > 0 && (
                <p className="text-[10px] text-brand-dark/40 leading-snug">
                  💡 Add <span className="font-bold text-brand-orange">{formatCurrency(50 - subtotal)}</span> more to unlock <span className="font-bold text-brand-green">FREE SHIPPING</span>!
                </p>
              )}

              <div className="flex justify-between text-brand-dark/70">
                <span>Estimated GST (10%)</span>
                <span className="font-bold text-brand-dark">{formatCurrency(tax)}</span>
              </div>

              <div className="flex justify-between text-base font-display font-black text-brand-dark border-t border-brand-dark/5 pt-4">
                <span>Estimated Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/checkout">
                <button className="w-full bg-gradient-to-r from-brand-orange to-brand-pink text-white py-4 rounded-full font-display text-xs font-black uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-brand-orange/15 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={14} />
                </button>
              </Link>
            </div>
            
            <div className="text-center pt-2">
              <Link href="/products" className="text-xs font-bold text-brand-dark/45 hover:text-brand-orange transition font-body">
                ← Continue Shopping
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
