"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, Menu, X } from "lucide-react";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#FCF9F2] flex items-center justify-center w-full">{children}</div>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/products")) return "Products";
    if (pathname.startsWith("/admin/orders")) return "Orders";
    if (pathname.startsWith("/admin/customers")) return "Customers";
    if (pathname.startsWith("/admin/settings")) return "Settings";
    return "Admin";
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-brand-dark flex w-full">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1a1a2e] text-white fixed h-screen z-30">
        {/* Sidebar Brand Logo */}
        <div className="h-20 border-b border-white/10 flex items-center px-6 gap-2">
          <svg className="h-6 w-6 text-brand-orange" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 15 6 15 11C15 14 13.5 17 11 21C11 21 8 18 8 13C8 8.5 10 5 12 2Z"
              fill="url(#sidebar-leaf)"
            />
            <defs>
              <linearGradient id="sidebar-leaf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display text-lg font-black lowercase tracking-tighter text-white">
            austropical
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF1493] bg-[#FF1493]/10 px-2 py-0.5 rounded border border-[#FF1493]/20 ml-auto">
            Admin
          </span>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-body text-sm font-semibold ${
                  isActive
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200 text-left"
          >
            <LogOut size={18} />
            <span className="font-body text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <aside className="w-64 bg-[#1a1a2e] text-white h-screen flex flex-col z-50 relative" onClick={(e) => e.stopPropagation()}>
            <div className="h-20 border-b border-white/10 flex items-center px-6 justify-between">
              <span className="font-display text-lg font-black lowercase tracking-tighter">
                austropical
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-body text-sm font-semibold ${
                      isActive
                        ? "bg-brand-orange text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 text-left"
              >
                <LogOut size={18} />
                <span className="font-body text-sm font-semibold">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-brand-dark/10 bg-[#FCF9F2]/85 backdrop-blur-md sticky top-0 z-25 flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-brand-dark p-2 hover:bg-brand-dark/5 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="font-body text-sm font-bold text-brand-dark">
                {session?.user?.name || "Admin"}
              </span>
              <span className="font-body text-xs text-brand-dark/50 capitalize">
                {(session?.user as any)?.role || "Administrator"}
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-display text-sm font-bold shadow-md shadow-brand-orange/20 select-none uppercase">
              {session?.user?.name ? session.user.name.substring(0, 2) : "AD"}
            </div>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="flex-1 p-6 md:p-8 w-full max-w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </NextAuthProvider>
  );
}
