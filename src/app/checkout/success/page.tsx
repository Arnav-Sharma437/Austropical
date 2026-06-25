"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export const dynamic = "force-dynamic";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "AUS-0000";

  return (
    <div className="min-h-screen bg-[#FCF9F2] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <div className="h-20 w-20 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mb-6 border border-brand-green/20">
        <CheckCircle size={36} />
      </div>
      
      <h1 className="font-display text-3xl md:text-5xl font-black uppercase text-brand-dark tracking-tight leading-tight">
        Order Placed Successfully!
      </h1>
      
      <p className="font-body text-sm text-brand-dark/70 mt-4 max-w-md leading-relaxed">
        Thank you for scooping with Austropical! Your order has been placed. We have sent a confirmation email containing details to your email address.
      </p>

      <div className="mt-6 p-4 bg-white border border-brand-dark/5 shadow-md rounded-2xl flex flex-col items-center min-w-[200px]">
        <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/40">Your Order Number</span>
        <span className="font-display text-2xl font-black text-brand-orange mt-1">{orderNumber}</span>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <Link href="/products">
          <MagneticButton className="bg-brand-orange text-white py-4 px-8 rounded-full font-display text-xs font-black uppercase tracking-wider shadow-lg shadow-brand-orange/15 flex items-center gap-2">
            Scoop More Tubs <ArrowRight size={14} />
          </MagneticButton>
        </Link>
        <Link href="/" className="font-body text-xs font-bold text-brand-dark/50 hover:text-brand-orange transition">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCF9F2] pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center font-display text-sm font-black uppercase text-brand-dark/40 animate-pulse">Loading order details...</div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
