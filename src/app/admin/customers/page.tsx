"use client";

import React, { useState, useEffect } from "react";
import { Users, Mail, Phone, Calendar } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate some mock customer details based on orders
    async function loadCustomers() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const orders = await res.json();
          const uniqueCustomers: Record<string, any> = {};
          
          orders.forEach((o: any) => {
            if (o.customer && o.customer.email) {
              const email = o.customer.email.toLowerCase();
              if (!uniqueCustomers[email]) {
                uniqueCustomers[email] = {
                  name: o.customer.name,
                  email: o.customer.email,
                  phone: o.customer.phone,
                  lastOrderDate: o.createdAt,
                  totalOrdersCount: 1,
                  totalSpend: o.total
                };
              } else {
                uniqueCustomers[email].totalOrdersCount += 1;
                uniqueCustomers[email].totalSpend += o.total;
                if (new Date(o.createdAt) > new Date(uniqueCustomers[email].lastOrderDate)) {
                  uniqueCustomers[email].lastOrderDate = o.createdAt;
                }
              }
            }
          });
          setCustomers(Object.values(uniqueCustomers));
        }
      } catch (err) {
        console.error("Failed to load customers", err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-3xl font-black uppercase text-brand-dark">Customers Database</h2>
        <p className="text-xs text-brand-dark/50 font-body">Directory of customers who placed orders on the website.</p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-dark/5 shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-semibold text-brand-dark/40 animate-pulse">Loading customers list...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-dark/5 bg-brand-dark/[0.01]">
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40">Customer Details</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 font-bold">Phone Number</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 font-bold">Total Orders</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 font-bold">Total Spend</th>
                  <th className="py-4 px-6 font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/40 font-bold">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={i} className="border-b border-brand-dark/5 last:border-b-0 hover:bg-brand-dark/[0.005] transition-all">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-display text-sm font-black uppercase">
                          {c.name.substring(0, 2)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display text-sm font-bold text-brand-dark">{c.name}</span>
                          <span className="text-xs text-brand-dark/50 flex items-center gap-1 font-body mt-0.5"><Mail size={12} /> {c.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-body text-sm text-brand-dark/70">
                      <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-dark/35" /> {c.phone}</span>
                    </td>
                    <td className="py-4 px-6 font-body text-sm font-bold text-brand-dark">{c.totalOrdersCount} orders</td>
                    <td className="py-4 px-6 font-body text-sm font-bold text-brand-green">${c.totalSpend.toFixed(2)}</td>
                    <td className="py-4 px-6 font-body text-xs text-brand-dark/50">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-dark/30" /> {new Date(c.lastOrderDate).toLocaleDateString("en-AU")}</span>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-brand-dark/40 font-body">
                      No customer records found yet.
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
