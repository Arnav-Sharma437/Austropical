"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";

const STATUS_TABS = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to retrieve orders list");
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleUpdatePaymentStatus = async (id: string, newPaymentStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPaymentStatus })
      });
      if (!res.ok) throw new Error("Failed to update payment status");
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
    } catch (err: any) {
      alert(err.message || "Failed to update payment status");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesTab = activeTab === "all" || o.status === activeTab;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ["Order Number,Customer Name,Customer Email,Customer Phone,Date,Subtotal,Shipping,Tax,Total,Status,Payment Status,Payment Method"];
    const rows = filteredOrders.map((o) => {
      const date = new Date(o.createdAt).toLocaleDateString("en-AU");
      return `"${o.orderNumber}","${o.customer?.name}","${o.customer?.email}","${o.customer?.phone}","${date}",${o.subtotal},${o.shippingCost},${o.tax},${o.total},"${o.status}","${o.paymentStatus}","${o.paymentMethod}"`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `austropical_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleRowExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(val);
  };

  const statusStyles: Record<string, string> = {
    pending: "text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20",
    confirmed: "text-blue-500 bg-blue-500/10 border border-blue-500/20",
    processing: "text-brand-orange bg-brand-orange/10 border border-brand-orange/20",
    shipped: "text-indigo-500 bg-indigo-500/10 border border-indigo-500/20",
    delivered: "text-brand-green bg-brand-green/10 border border-brand-green/20",
    cancelled: "text-brand-pink bg-brand-pink/10 border border-brand-pink/20",
    refunded: "text-purple-500 bg-purple-500/10 border border-purple-500/20"
  };

  return (
    <div className="space-y-6">
      {/* Filters & Export Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-dark/40">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search orders by number, customer name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-dark/10 rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-dark"
          />
        </div>

        {/* CSV Export Button */}
        <button
          onClick={exportToCSV}
          className="flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-orange py-3.5 px-6 rounded-2xl font-display text-xs font-black uppercase tracking-wider transition-all shadow-md"
        >
          <Download size={16} /> Export to CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-dark/10 pb-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-xs font-display font-black uppercase tracking-wider rounded-xl transition ${
              activeTab === tab.value
                ? "bg-brand-orange text-white"
                : "bg-white text-brand-dark/70 border border-brand-dark/10 hover:bg-brand-dark/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Table Wrapper */}
      <div className="bg-white rounded-3xl border border-brand-dark/5 shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-semibold text-brand-dark/40 animate-pulse">
            Loading orders list...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm font-semibold text-brand-pink">
            ⚠️ Error: {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-dark/5 bg-brand-dark/[0.01]">
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Order Number</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Customer</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Date</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Total</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Status</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Payment Status</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => {
                  const date = new Date(o.createdAt).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });
                  const isExpanded = expandedOrderId === o._id;

                  return (
                    <React.Fragment key={o._id}>
                      <tr className="border-b border-brand-dark/5 last:border-b-0 hover:bg-brand-dark/[0.005] transition-all">
                        <td className="py-4 px-6">
                          <button
                            type="button"
                            onClick={() => toggleRowExpand(o._id)}
                            className="font-display text-sm font-bold text-brand-orange hover:underline text-left flex items-center gap-1.5"
                          >
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {o.orderNumber}
                          </button>
                        </td>
                        <td className="py-4 px-6 font-body text-sm text-brand-dark">
                          <div className="flex flex-col">
                            <span className="font-bold">{o.customer?.name}</span>
                            <span className="text-xs text-brand-dark/50">{o.customer?.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-body text-sm text-brand-dark/60">{date}</td>
                        <td className="py-4 px-6 font-body text-sm font-bold text-brand-dark">{formatCurrency(o.total)}</td>
                        
                        <td className="py-4 px-6">
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateStatus(o._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold focus:outline-none border font-body cursor-pointer ${statusStyles[o.status] || "bg-gray-100"}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>

                        <td className="py-4 px-6">
                          <select
                            value={o.paymentStatus}
                            onChange={(e) => handleUpdatePaymentStatus(o._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold focus:outline-none border font-body cursor-pointer ${
                              o.paymentStatus === "paid"
                                ? "text-brand-green bg-brand-green/10 border-brand-green/20"
                                : o.paymentStatus === "failed"
                                ? "text-brand-pink bg-brand-pink/10 border-brand-pink/20"
                                : "text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <Link href={`/admin/orders/${o._id}`}>
                            <button className="p-2 border border-brand-dark/10 text-brand-dark/70 hover:text-brand-orange hover:border-brand-orange/30 rounded-xl transition-all">
                              <Eye size={14} />
                            </button>
                          </Link>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-[#FAF6EE] border-b border-brand-dark/5">
                          <td colSpan={7} className="p-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/50 block mb-1">Shipping Address</span>
                                  <p className="font-body text-xs text-brand-dark/80">
                                    {o.shippingAddress?.street}, {o.shippingAddress?.city}, {o.shippingAddress?.state} {o.shippingAddress?.postcode}, {o.shippingAddress?.country}
                                  </p>
                                  {o.notes && (
                                    <p className="mt-2 text-xs font-body text-brand-dark/60 italic">
                                      <span className="font-bold not-italic">Notes:</span> "{o.notes}"
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/50 block mb-1">Payment Method</span>
                                  <span className="font-body text-xs font-bold text-brand-dark capitalize">{o.paymentMethod}</span>
                                </div>
                              </div>

                              <div>
                                <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/50 block mb-2">Items Ordered</span>
                                <div className="space-y-2 max-w-2xl">
                                  {o.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center text-xs border-b border-brand-dark/5 last:border-b-0 pb-1.5 last:pb-0">
                                      <span className="font-body text-brand-dark/80 font-bold">
                                        {item.name} {item.variant ? `(${item.variant})` : ""} <span className="text-brand-dark/40 font-normal">x {item.quantity}</span>
                                      </span>
                                      <span className="font-body font-bold text-brand-dark">{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-brand-dark/40 font-body">
                      No orders matching selected criteria found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
