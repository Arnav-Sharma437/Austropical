"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, MapPin, CreditCard, ShoppingBag, Clock } from "lucide-react";
import Image from "next/image";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      if (!res.ok) throw new Error("Order not found");
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setOrder(updated);
    } catch (err: any) {
      alert(err.message || "Failed to update order status");
    }
  };

  const handlePaymentStatusChange = async (newPaymentStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPaymentStatus })
      });
      if (!res.ok) throw new Error("Failed to update payment status");
      const updated = await res.json();
      setOrder(updated);
    } catch (err: any) {
      alert(err.message || "Failed to update payment status");
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-sm font-semibold text-brand-dark/40 animate-pulse">Loading order details...</div>;
  }

  if (error || !order) {
    return (
      <div className="p-8 bg-brand-pink/5 border border-brand-pink/10 rounded-3xl text-center text-brand-pink font-display text-sm font-black uppercase">
        Error: {error || "Order not found"}
      </div>
    );
  }

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
    <div className="space-y-8 pb-16">
      {/* Back button header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 border border-brand-dark/10 rounded-xl hover:bg-brand-dark/5 text-brand-dark/70 transition">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-col">
            <h2 className="font-display text-2xl font-black uppercase text-brand-dark">{order.orderNumber}</h2>
            <span className="text-[10px] font-body text-brand-dark/40">Placed on {new Date(order.createdAt).toLocaleString("en-AU")}</span>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/40">Order Status</span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold focus:outline-none border font-body cursor-pointer ${statusStyles[order.status] || "bg-gray-100"}`}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-display text-[9px] font-black uppercase tracking-wider text-brand-dark/40">Payment Status</span>
            <select
              value={order.paymentStatus}
              onChange={(e) => handlePaymentStatusChange(e.target.value)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold focus:outline-none border font-body cursor-pointer ${
                order.paymentStatus === "paid"
                  ? "text-brand-green bg-brand-green/10 border-brand-green/20"
                  : order.paymentStatus === "failed"
                  ? "text-brand-pink bg-brand-pink/10 border-brand-pink/20"
                  : "text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20"
              }`}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Customer details & Address */}
        <div className="space-y-6">
          {/* Card 1: Customer */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-dark/5 pb-4">
              <span className="h-10 w-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center"><User size={18} /></span>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark">Customer Details</h3>
            </div>
            <div className="space-y-2 font-body text-sm text-brand-dark">
              <p className="font-bold">{order.customer?.name}</p>
              <p className="text-brand-dark/60">{order.customer?.email}</p>
              <p className="text-brand-dark/60">{order.customer?.phone}</p>
            </div>
          </div>

          {/* Card 2: Shipping */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-dark/5 pb-4">
              <span className="h-10 w-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center"><MapPin size={18} /></span>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark">Shipping Address</h3>
            </div>
            <div className="space-y-1 font-body text-sm text-brand-dark/80">
              <p>{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postcode}</p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>

          {/* Card 3: Payment */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-dark/5 pb-4">
              <span className="h-10 w-10 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center"><CreditCard size={18} /></span>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark">Payment Information</h3>
            </div>
            <div className="space-y-2 font-body text-sm text-brand-dark/80">
              <p><span className="font-bold">Method:</span> <span className="capitalize">{order.paymentMethod}</span></p>
              {order.stripePaymentId && (
                <p className="font-mono text-xs text-brand-dark/55"><span className="font-bold font-body text-sm text-brand-dark/85">Stripe Ref:</span> {order.stripePaymentId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Items Ordered & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 4: Items */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-brand-dark/5 pb-4">
              <span className="h-10 w-10 rounded-2xl bg-brand-yellow/15 text-brand-orange flex items-center justify-center"><ShoppingBag size={18} /></span>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark">Items Ordered</h3>
            </div>

            <div className="space-y-4">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4 border-b border-brand-dark/5 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-2xl border border-brand-dark/10 overflow-hidden bg-[#FAF6EE] flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[10px] font-bold text-brand-dark/30 select-none">
                          Bowl
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-sm font-bold text-brand-dark">{item.name}</span>
                      <span className="font-body text-xs text-brand-dark/50">
                        {item.variant ? `Variant: ${item.variant} • ` : ""}Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-body text-sm font-bold text-brand-dark">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-brand-dark/5 pt-6 space-y-3 max-w-sm ml-auto">
              <div className="flex justify-between text-sm font-body text-brand-dark/60">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-body text-brand-dark/60">
                <span>Shipping Cost</span>
                <span>{formatCurrency(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm font-body text-brand-dark/60">
                <span>Estimated GST</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-display font-black text-brand-dark border-t border-brand-dark/5 pt-3">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Card 5: Notes & Timeline */}
          <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-brand-dark/5 pb-4">
              <span className="h-10 w-10 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center"><Clock size={18} /></span>
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark">Order History Timeline</h3>
            </div>

            <div className="pl-6 border-l-2 border-brand-orange/20 space-y-6 relative ml-3">
              <div className="relative">
                <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-brand-orange border-4 border-white" />
                <div className="flex flex-col">
                  <span className="font-body text-xs font-bold text-brand-dark">Order Received</span>
                  <span className="font-body text-[10px] text-brand-dark/50">Customer placed order online</span>
                  <span className="text-[10px] text-brand-dark/40 font-mono mt-0.5">{new Date(order.createdAt).toLocaleString("en-AU")}</span>
                </div>
              </div>

              {order.status !== "pending" && (
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-brand-green border-4 border-white" />
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-bold text-brand-dark">Status Changed: {order.status}</span>
                    <span className="font-body text-[10px] text-brand-dark/50 font-semibold uppercase">{order.status}</span>
                    <span className="text-[10px] text-brand-dark/40 font-mono mt-0.5">{new Date(order.updatedAt).toLocaleString("en-AU")}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
