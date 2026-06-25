"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-[#FAF6EE] border border-brand-dark/10 shadow-2xl">
      {/* Brand logo header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <svg className="h-12 w-12 text-brand-orange mb-3" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 15 6 15 11C15 14 13.5 17 11 21C11 21 8 18 8 13C8 8.5 10 5 12 2Z"
            fill="url(#login-leaf)"
          />
          <defs>
            <linearGradient id="login-leaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FF1493" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-display text-2xl font-black lowercase tracking-tighter text-brand-dark">
          austropical
        </span>
        <span className="font-display text-[9px] font-black uppercase tracking-widest text-[#FF1493] mt-1">
          Admin Portal
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-brand-pink/10 border border-brand-pink/20 rounded-2xl text-xs font-semibold text-brand-pink font-body">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-white text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
            placeholder="admin@austropical.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-display text-[10px] font-black uppercase tracking-wider text-brand-dark/60">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-2xl border border-brand-dark/15 bg-white text-brand-dark focus:outline-none focus:border-brand-orange transition-all font-body text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-brand-orange to-brand-pink hover:scale-[1.02] text-white py-4 rounded-2xl font-display text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-orange/15 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
}
