import React from "react";
import ProductForm from "@/components/admin/ProductForm";

interface AdminEditProductPageProps {
  params: {
    id: string;
  };
}

export default function AdminEditProductPage({ params }: AdminEditProductPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-3xl font-black uppercase text-brand-dark font-bold">Edit Product</h2>
        <p className="text-xs text-brand-dark/50 font-body">Update pricing, images, descriptions, variants or nutrition values.</p>
      </div>
      <ProductForm productId={params.id} />
    </div>
  );
}
