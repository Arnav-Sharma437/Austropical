"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { staggerContainer, fadeUpVariants } from "@/lib/animations";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 overflow-visible px-4"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={fadeUpVariants}
          className="overflow-visible"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
