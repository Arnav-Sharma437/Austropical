"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { products, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import { staggerContainer, fadeUpVariants } from "@/lib/animations";
import WalkingBanner from "@/components/sections/WalkingBanner";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Read category filter from query params, fallback to "ALL PRODUCTS"
  const initialFilter = searchParams.get("filter") || "ALL PRODUCTS";
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      setActiveFilter(filterParam);
    } else {
      setActiveFilter("ALL PRODUCTS");
    }
  }, [searchParams]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "ALL PRODUCTS") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?filter=${encodeURIComponent(filter)}`, { scroll: false });
    }
  };

  // Filter products based on selected tab
  const filteredProducts = activeFilter === "ALL PRODUCTS"
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#FCF9F2] min-h-screen text-brand-dark pt-32 pb-24">
      
      {/* Page Hero */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-12">
        <div className="text-center">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
            OUR CATALOGUE
          </span>
          <h1 className="mt-2 font-display text-5xl font-black uppercase tracking-tight text-brand-dark sm:text-6xl md:text-7xl">
            OUR FLAVOURS
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-sm md:text-base text-brand-dark/60">
            Explore our premium range of acai buckets, ice pop lines, smoothie cubes, and sorbets. Handcrafted for a brighter snack choice.
          </p>
        </div>
      </div>

      {/* Walking Banner Section */}
      <div className="w-full mb-16">
        <WalkingBanner />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Filter Pills Tabs (Horizontal scrolling on mobile) */}
        <div className="no-scrollbar flex w-full justify-start md:justify-center overflow-x-auto gap-3 pb-8 select-none">
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`relative shrink-0 rounded-full px-6 py-3 font-display text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-brand-dark border-brand-dark text-white shadow-lg shadow-brand-dark/15"
                    : "border-brand-dark/10 hover:border-brand-dark/30 text-brand-dark/70 hover:text-brand-dark bg-white/40"
                }`}
                data-hover="true"
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Dynamic Restaggering Grid */}
        <div className="mt-12 overflow-visible">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 overflow-visible"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeUpVariants}
                  layout
                  className="overflow-visible"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-brand-dark/40">
              No products found in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="bg-[#FCF9F2] min-h-screen pt-32 text-center text-brand-dark font-display text-xl">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
