"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, ShoppingBag, Package, AlertCircle, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Link from "next/link";

interface StatsData {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrdersCount: number;
  recentOrders: any[];
  statusCounts: Record<string, number>;
  monthlyRevenue: { name: string; revenue: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) throw new Error("Failed to load dashboard statistics");
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-3xl border border-brand-dark/5" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 bg-white rounded-3xl border border-brand-dark/5 lg:col-span-2" />
          <div className="h-96 bg-white rounded-3xl border border-brand-dark/5" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8 bg-brand-pink/5 border border-brand-pink/10 rounded-3xl text-center text-brand-pink font-display text-sm font-black uppercase">
        Error: {error || "Failed to load statistics"}
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(val);
  };

  const COLORS = ["#FFD700", "#FF6B00", "#FF1493", "#4B0082", "#00A86B", "#8B5CF6", "#3B82F6"];
  const pieData = Object.entries(stats.statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: status.toUpperCase(),
      value: count,
    }));

  return (
    <div className="space-y-8">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md flex items-center justify-between">
          <div className="space-y-2">
            <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Total Revenue</span>
            <h3 className="font-display text-2xl font-black text-brand-dark">{formatCurrency(stats.totalRevenue)}</h3>
            <span className="inline-flex items-center text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full font-body">
              +12.4% vs last month
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md flex items-center justify-between">
          <div className="space-y-2">
            <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Total Orders</span>
            <h3 className="font-display text-2xl font-black text-brand-dark">{stats.totalOrders}</h3>
            <span className="inline-flex items-center text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full font-body">
              +4.8% vs last week
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
            <ShoppingBag size={20} />
          </div>
        </div>

        {/* Total Products */}
        <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md flex items-center justify-between">
          <div className="space-y-2">
            <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Total Products</span>
            <h3 className="font-display text-2xl font-black text-brand-dark">{stats.totalProducts}</h3>
            <span className="text-[10px] font-bold text-brand-dark/50 font-body">Active on web storefront</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-brand-yellow/15 text-brand-orange flex items-center justify-center">
            <Package size={20} />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md flex items-center justify-between">
          <div className="space-y-2">
            <span className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Pending Orders</span>
            <h3 className="font-display text-2xl font-black text-brand-dark">{stats.pendingOrdersCount}</h3>
            <span className="inline-flex items-center text-[10px] font-bold text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded-full font-body">
              Requires attention
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center">
            <AlertCircle size={20} />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md lg:col-span-2 space-y-6">
          <h4 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark/60">Monthly Revenue Summary</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,13,13,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(13,13,13,0.4)" fontSize={11} fontFamily="var(--font-body)" />
                <YAxis stroke="rgba(13,13,13,0.4)" fontSize={11} fontFamily="var(--font-body)" tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Status Chart */}
        <div className="p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6 flex flex-col justify-between">
          <h4 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark/60">Orders Status Distribution</h4>
          <div className="h-60 w-full relative flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-xs text-brand-dark/40 font-body">No orders recorded yet</span>
            )}
          </div>
          {/* Custom Legends */}
          <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs font-semibold text-brand-dark/70">
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="truncate">{entry.name.toLowerCase()}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 bg-white rounded-3xl border border-[#0D0D0D]/5 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark/60">Recent Orders</h4>
          <Link href="/admin/orders" className="text-xs font-bold text-brand-orange hover:text-brand-pink flex items-center gap-1 font-body">
            View All Orders <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-dark/5">
                <th className="pb-4 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Order Number</th>
                <th className="pb-4 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Customer</th>
                <th className="pb-4 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Date</th>
                <th className="pb-4 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Total</th>
                <th className="pb-4 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => {
                const date = new Date(order.createdAt).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                });
                
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
                  <tr key={order._id} className="border-b border-brand-dark/5 last:border-b-0 hover:bg-brand-dark/[0.01] transition-all">
                    <td className="py-4 font-display text-sm font-bold text-brand-dark">
                      <Link href={`/admin/orders/${order._id}`} className="hover:underline text-brand-orange">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-4 font-body text-sm text-brand-dark">{order.customer?.name}</td>
                    <td className="py-4 font-body text-sm text-brand-dark/60">{date}</td>
                    <td className="py-4 font-body text-sm font-bold text-brand-dark">{formatCurrency(order.total)}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusStyles[order.status] || "text-gray-500 bg-gray-100"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-brand-dark/40 font-body">
                    No orders placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
