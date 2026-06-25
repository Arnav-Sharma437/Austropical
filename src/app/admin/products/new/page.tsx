import React from "react";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminNewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-3xl font-black uppercase text-brand-dark">Create New Product</h2>
        <p className="text-xs text-brand-dark/50 font-body">Create a new superfood product to show in the online catalogue.</p>
      </div>
      <ProductForm />
    </div>
  );
}
