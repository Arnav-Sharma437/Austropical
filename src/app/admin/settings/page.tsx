"use client";

import React, { useState } from "react";
import { Settings, Shield, Globe, Bell, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Austropical");
  const [storeEmail, setStoreEmail] = useState("hello@austropical.com.au");
  const [currency, setCurrency] = useState("AUD");
  const [taxRate, setTaxRate] = useState("10"); // 10% GST
  const [shippingRate, setShippingRate] = useState("5.99");
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully (Simulation)");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-3xl font-black uppercase text-brand-dark">Dashboard Settings</h2>
        <p className="text-xs text-brand-dark/50 font-body">Manage global storefront pricing configurations and security settings.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column Settings Tabs */}
        <div className="space-y-3">
          <button type="button" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-brand-orange/30 text-brand-orange font-display text-xs font-black uppercase tracking-wider text-left transition shadow-md shadow-brand-orange/5">
            <Globe size={16} /> Storefront Details
          </button>
          <button type="button" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 border border-brand-dark/10 hover:bg-white text-brand-dark/70 font-display text-xs font-black uppercase tracking-wider text-left transition">
            <Shield size={16} /> API & Keys
          </button>
          <button type="button" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 border border-brand-dark/10 hover:bg-white text-brand-dark/70 font-display text-xs font-black uppercase tracking-wider text-left transition">
            <Bell size={16} /> Notifications
          </button>
        </div>

        {/* Right Settings Form Fields */}
        <div className="md:col-span-2 p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-md space-y-6">
          <div className="flex items-center gap-2 border-b border-brand-dark/5 pb-4">
            <Settings size={18} className="text-brand-orange" />
            <h3 className="font-display text-xs font-black uppercase tracking-wider text-brand-dark">Global Configuration</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Store Contact Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-white text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                >
                  <option value="AUD">AUD ($)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Tax Rate (GST %)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">Shipping Rate ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingRate}
                  onChange={(e) => setShippingRate(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-[#FCF9F2]/30 text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-brand-dark/5 pt-6 flex justify-end">
            <button type="submit" className="flex items-center justify-center gap-2 bg-brand-orange text-white hover:scale-[1.02] active:scale-[0.98] py-3.5 px-6 rounded-2xl font-display text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-brand-orange/15">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
