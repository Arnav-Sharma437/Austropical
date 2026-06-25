"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductFormProps {
  productId?: string;
}

const CATEGORIES = [
  { value: "acai-buckets", label: "Acai Buckets" },
  { value: "grab-n-go", label: "Grab 'n Go" },
  { value: "ice-pop-line", label: "Ice Pop Line" },
  { value: "smoothie-cubes", label: "Smoothie Cubes" },
  { value: "sorbet-line", label: "Sorbet Line" },
  { value: "super-fruits-buckets", label: "Super Fruits Buckets" },
  { value: "super-fruits-ice-pop", label: "Super Fruits Ice Pop" },
  { value: "super-fruits-smoothie-cubes", label: "Super Fruits Smoothie Cubes" },
  { value: "super-fruits-sorbet", label: "Super Fruits Sorbet" }
];

const BADGES = [
  "100% Vegan",
  "Gluten Free",
  "Certified Organic",
  "Non GMO",
  "Lower Sugar",
  "Essential Minerals"
];

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!productId);
  
  // Basic State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("acai-buckets");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  
  // Nutrition Facts
  const [calories, setCalories] = useState("0");
  const [protein, setProtein] = useState("0");
  const [carbs, setCarbs] = useState("0");
  const [fat, setFat] = useState("0");
  const [fiber, setFiber] = useState("0");
  const [sugar, setSugar] = useState("0");
  
  // Badges
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  
  // Variants
  const [variants, setVariants] = useState<any[]>([]);
  const [variantName, setVariantName] = useState("");
  const [variantSize, setVariantSize] = useState("");
  const [variantPrice, setVariantPrice] = useState("");
  const [variantStock, setVariantStock] = useState("");
  const [variantSku, setVariantSku] = useState("");
  
  // Flags
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  
  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const p = await res.json();
        
        setName(p.name || "");
        setDescription(p.description || "");
        setShortDescription(p.shortDescription || "");
        setCategory(p.category || "acai-buckets");
        setPrice(p.price?.toString() || "");
        setCompareAtPrice(p.compareAtPrice?.toString() || "");
        setImages(p.images || []);
        setTags(p.tags || []);
        setIngredients(p.ingredients || []);
        
        setCalories(p.nutritionFacts?.calories?.toString() || "0");
        setProtein(p.nutritionFacts?.protein?.toString() || "0");
        setCarbs(p.nutritionFacts?.carbs?.toString() || "0");
        setFat(p.nutritionFacts?.fat?.toString() || "0");
        setFiber(p.nutritionFacts?.fiber?.toString() || "0");
        setSugar(p.nutritionFacts?.sugar?.toString() || "0");
        
        setSelectedBadges(p.badges || []);
        setVariants(p.variants || []);
        setIsActive(p.isActive !== false);
        setIsFeatured(!!p.isFeatured);
        setMetaTitle(p.metaTitle || "");
        setMetaDescription(p.metaDescription || "");
      } catch (err: any) {
        alert(err.message || "Failed to load product for editing");
        router.push("/admin/products");
      } finally {
        setFetching(false);
      }
    }
    loadProduct();
  }, [productId, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        setImages((prev) => [...prev, data.secure_url]);
      }
    } catch (err: any) {
      alert(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
    }
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    if (!ingredients.includes(ingredientInput.trim())) {
      setIngredients((prev) => [...prev, ingredientInput.trim()]);
    }
    setIngredientInput("");
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    if (!variantName.trim()) {
      alert("Variant name is required");
      return;
    }
    const newVariant = {
      name: variantName.trim(),
      size: variantSize.trim() || undefined,
      price: variantPrice ? parseFloat(variantPrice) : undefined,
      stock: variantStock ? parseInt(variantStock, 10) : 0,
      sku: variantSku.trim() || undefined
    };
    setVariants((prev) => [...prev, newVariant]);
    setVariantName("");
    setVariantSize("");
    setVariantPrice("");
    setVariantStock("");
    setVariantSku("");
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBadgeToggle = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Product name is required");
    if (!price) return alert("Product price is required");

    setLoading(true);

    const payload = {
      name,
      description,
      shortDescription,
      category,
      price: parseFloat(price),
      compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
      images,
      tags,
      ingredients,
      nutritionFacts: {
        calories: parseInt(calories, 10) || 0,
        protein: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fat: parseFloat(fat) || 0,
        fiber: parseFloat(fiber) || 0,
        sugar: parseFloat(sugar) || 0
      },
      badges: selectedBadges,
      variants,
      isActive,
      isFeatured,
      metaTitle,
      metaDescription
    };

    try {
      const url = productId ? `/api/products/${productId}` : "/api/products";
      const method = productId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-12 text-center text-sm font-semibold text-brand-dark/40 animate-pulse">Loading product form...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-16">
      {/* Back button header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 border border-brand-dark/10 rounded-xl hover:bg-brand-dark/5 text-brand-dark/70 transition">
          <ArrowLeft size={16} />
        </Link>
        <span className="text-sm font-body font-semibold text-brand-dark/60">Back to Products</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Basic Info */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Basic Information</h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Premium Acai Bucket (500ml)"
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-white text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Price ($ AUD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="12.99"
                  className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Compare At Price (Original price for sale)</label>
                <input
                  type="number"
                  step="0.01"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  placeholder="15.99"
                  className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Short Description</label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Organic Amazonian acai tub topped with fresh fruits."
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Full Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe product highlights, premium ingredients, textures, and health benefits..."
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>
          </div>

          {/* Card 2: Variants Panel */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Product Variants</h3>
            
            {/* Variants table list */}
            {variants.length > 0 && (
              <div className="overflow-x-auto border border-brand-dark/10 rounded-2xl">
                <table className="w-full text-left text-sm font-body">
                  <thead className="bg-brand-dark/[0.02] border-b border-brand-dark/10">
                    <tr>
                      <th className="py-3 px-4 font-bold">Name</th>
                      <th className="py-3 px-4 font-bold">Size</th>
                      <th className="py-3 px-4 font-bold">Price Override</th>
                      <th className="py-3 px-4 font-bold">Stock</th>
                      <th className="py-3 px-4 font-bold">SKU</th>
                      <th className="py-3 px-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((v, i) => (
                      <tr key={i} className="border-b border-brand-dark/5 last:border-b-0">
                        <td className="py-3 px-4 font-semibold">{v.name}</td>
                        <td className="py-3 px-4 text-brand-dark/60">{v.size || "-"}</td>
                        <td className="py-3 px-4 font-bold">${v.price !== undefined ? v.price.toFixed(2) : "-"}</td>
                        <td className="py-3 px-4">{v.stock} units</td>
                        <td className="py-3 px-4 font-mono text-xs text-brand-dark/55">{v.sku || "-"}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => removeVariant(i)}
                            className="p-1.5 hover:bg-brand-pink/10 text-brand-pink rounded-lg transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Add Variant Formlet */}
            <div className="p-4 bg-[#FCF9F2]/30 rounded-2xl border border-brand-dark/10 space-y-4">
              <span className="font-display text-[10px] font-black uppercase text-brand-dark/60 tracking-wider">Add Variant</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Variant Name (e.g. Medium Tub)"
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 bg-white text-sm rounded-xl focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Size (e.g. 500ml)"
                  value={variantSize}
                  onChange={(e) => setVariantSize(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 bg-white text-sm rounded-xl focus:outline-none"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price Override ($)"
                  value={variantPrice}
                  onChange={(e) => setVariantPrice(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 bg-white text-sm rounded-xl focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Stock count"
                  value={variantStock}
                  onChange={(e) => setVariantStock(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 bg-white text-sm rounded-xl focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="SKU Reference"
                  value={variantSku}
                  onChange={(e) => setVariantSku(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 bg-white text-sm rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addVariant}
                  className="bg-brand-orange text-white hover:bg-brand-pink px-4 py-2 text-xs font-display font-black uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1"
                >
                  <Plus size={14} /> Add variant
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: SEO and metadata */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Search Engine Optimization (SEO)</h3>
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Austropical | Premium Organic Acai Ice Cream Tubs"
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                placeholder="Delicious 100% plant-based organic acai ice cream buckets available for home delivery. Discover the brighter snack."
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Status, Images, Badges, Nutrition */}
        <div className="space-y-8">
          
          {/* Card 4: Status and Action buttons */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Visibility Status</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-body text-sm font-bold text-brand-dark">Active on Website</span>
                <span className="text-[10px] text-brand-dark/40 font-body">Make public on storefront</span>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isActive ? "bg-brand-green" : "bg-brand-dark/15"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-brand-dark/5 pt-4">
              <div className="flex flex-col">
                <span className="font-body text-sm font-bold text-brand-dark">Featured Product</span>
                <span className="text-[10px] text-brand-dark/40 font-body">Prioritise on homepage slider</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isFeatured ? "bg-brand-pink" : "bg-brand-dark/15"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFeatured ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            <div className="border-t border-brand-dark/5 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-orange to-brand-pink text-white py-4 rounded-2xl font-display text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-brand-orange/15 disabled:opacity-50"
              >
                {loading ? "Saving Product..." : "Save Product Details"}
              </button>
            </div>
          </div>

          {/* Card 5: Cloudinary Multiple Images */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Product Images</h3>
            
            {/* Grid of uploaded images */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, i) => (
                  <div key={i} className="relative h-20 w-20 rounded-xl overflow-hidden border border-brand-dark/10 group bg-[#FCF9F2]">
                    <Image
                      src={img}
                      alt={`Product image ${i}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Selector */}
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="border-2 border-dashed border-brand-dark/15 rounded-2xl p-6 text-center hover:border-brand-orange transition flex flex-col items-center gap-2">
                <Upload className="text-brand-dark/40" size={24} />
                <span className="font-body text-xs font-bold text-brand-dark/70">
                  {uploading ? "Uploading to Cloudinary..." : "Click or drag images to upload"}
                </span>
                <span className="text-[10px] text-brand-dark/40 font-body">JPEG, PNG, WEBP accepted</span>
              </div>
            </div>
          </div>

          {/* Card 6: Badges & Dietary tags */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Dietary Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((b) => {
                const isChecked = selectedBadges.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBadgeToggle(b)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl text-left border transition-all ${
                      isChecked
                        ? "bg-brand-green/10 border-brand-green/30 text-brand-green"
                        : "bg-white border-brand-dark/10 text-brand-dark/70 hover:bg-brand-dark/5"
                    }`}
                  >
                    {isChecked ? "✓ " : "+ "} {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 7: Nutrition Facts */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Nutrition Facts</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/55">Calories (kcal)</span>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none text-brand-dark bg-[#FCF9F2]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/55">Protein (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none text-brand-dark bg-[#FCF9F2]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/55">Carbohydrates (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none text-brand-dark bg-[#FCF9F2]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/55">Fat (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none text-brand-dark bg-[#FCF9F2]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/55">Fiber (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none text-brand-dark bg-[#FCF9F2]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/55">Sugar (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  className="px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none text-brand-dark bg-[#FCF9F2]/30"
                />
              </div>
            </div>
          </div>

          {/* Card 8: Ingredients & Tags list */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-brand-dark">Ingredients & Search Tags</h3>
            
            {/* Ingredients Section */}
            <div className="space-y-3">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Ingredients List</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 🍇 Pure Acai"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
                  className="flex-1 px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="bg-brand-dark text-white hover:bg-brand-orange px-4 py-2 rounded-xl text-xs font-display font-black uppercase transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ingredients.map((ing, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs font-semibold bg-[#FCF9F2] text-brand-dark border border-brand-dark/10 px-2 py-1 rounded-xl">
                    {ing}
                    <button type="button" onClick={() => removeIngredient(i)} className="text-brand-pink"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-3 border-t border-brand-dark/5 pt-4">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Search Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. organic, acai, dairy-free"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-brand-dark/15 text-sm rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-brand-dark text-white hover:bg-brand-orange px-4 py-2 rounded-xl text-xs font-display font-black uppercase transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-orange/5 text-brand-orange border border-brand-orange/15 px-2 py-1 rounded-xl">
                    #{t}
                    <button type="button" onClick={() => removeTag(i)} className="text-brand-pink"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </form>
  );
}
