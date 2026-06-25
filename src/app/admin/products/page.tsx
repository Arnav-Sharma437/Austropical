"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { value: "ALL PRODUCTS", label: "All Categories" },
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL PRODUCTS");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?category=${encodeURIComponent(category)}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setPage(1);
  }, [category, search]);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err: any) {
      alert(err.message || "Failed to update product status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCategoryLabel = (val: string) => {
    const found = CATEGORIES.find((c) => c.value === val);
    return found ? found.label : val;
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-dark/40">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search products by name, tag, ingredient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-brand-dark/10 rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-dark"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-white border border-brand-dark/10 rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-dark"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Add Product */}
        <Link href="/admin/products/new">
          <button className="flex items-center gap-2 bg-brand-orange text-white hover:scale-[1.02] active:scale-[0.98] py-3.5 px-6 rounded-2xl font-display text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-brand-orange/15">
            <Plus size={16} /> Add Product
          </button>
        </Link>
      </div>

      {/* Products list panel */}
      <div className="bg-white rounded-3xl border border-brand-dark/5 shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-semibold text-brand-dark/40 animate-pulse">
            Loading products list...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm font-semibold text-brand-pink">
            ⚠️ Error loading products: {error}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-dark/5 bg-brand-dark/[0.01]">
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Thumbnail</th>
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Product Name</th>
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Category</th>
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Base Price</th>
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Total Stock</th>
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Active Status</th>
                    <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((p) => (
                    <tr key={p._id} className="border-b border-brand-dark/5 last:border-0 hover:bg-brand-dark/[0.005] transition-all">
                      {/* Image */}
                      <td className="py-4 px-6">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-brand-dark/5 bg-[#FAF6EE]">
                          {p.images && p.images[0] ? (
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs font-bold text-brand-dark/30 select-none">
                              Bowl
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-display text-sm font-bold text-brand-dark">{p.name}</span>
                          {p.isFeatured && (
                            <span className="inline-flex max-w-fit items-center text-[9px] font-bold text-[#FF1493] bg-[#FF1493]/10 px-1.5 py-0.5 rounded mt-1 uppercase">
                              ★ Featured
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 font-body text-xs text-brand-dark/70 font-semibold">
                        {getCategoryLabel(p.category)}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-body text-sm font-bold text-brand-dark">
                        ${p.price.toFixed(2)}
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-6 font-body text-sm text-brand-dark">
                        <span className={`font-semibold ${p.totalStock === 0 ? "text-brand-pink font-bold" : p.totalStock < 10 ? "text-brand-orange font-bold" : "text-brand-dark/70"}`}>
                          {p.totalStock} units
                        </span>
                      </td>

                      {/* Active Status */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleActive(p._id, p.isActive)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                            p.isActive ? "bg-brand-green" : "bg-brand-dark/15"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              p.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${p._id}/edit`}>
                            <button className="p-2 border border-brand-dark/10 text-brand-dark/70 hover:text-brand-orange hover:border-brand-orange/30 rounded-xl transition-all">
                              <Edit2 size={14} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-2 border border-brand-dark/10 text-brand-dark/70 hover:text-brand-pink hover:border-brand-pink/30 rounded-xl transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-xs text-brand-dark/40 font-body">
                        No products match selected search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-brand-dark/5 bg-brand-dark/[0.005] flex items-center justify-between">
                <span className="text-xs text-brand-dark/50 font-body">
                  Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, products.length)} of {products.length} products
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 border border-brand-dark/10 rounded-xl hover:bg-brand-dark/5 transition disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold font-body px-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 border border-brand-dark/10 rounded-xl hover:bg-brand-dark/5 transition disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
