"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  product: string; // Product ID
  name: string;
  image?: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  sessionId: string | null;
  loading: boolean;
  addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number, variant?: string) => Promise<void>;
  removeFromCart: (productId: string, variant?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Session ID and fetch Cart
  useEffect(() => {
    let activeSessionId = localStorage.getItem("austropical_session_id");
    if (!activeSessionId) {
      activeSessionId = "session_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("austropical_session_id", activeSessionId);
    }
    setSessionId(activeSessionId);

    async function loadCart() {
      try {
        const res = await fetch(`/api/cart/${activeSessionId}`);
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.items || []);
        }
      } catch (err) {
        console.error("Failed to load cart from backend:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  // Add Item
  const addToCart = async (item: Omit<CartItem, "quantity">, quantity: number) => {
    if (!sessionId) return;
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity,
          variant: item.variant
        })
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart.items || []);
      }
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  // Update Item Quantity
  const updateCartQuantity = async (productId: string, quantity: number, variant?: string) => {
    if (!sessionId) return;
    
    // Optimistic local state update
    const updatedItems = cartItems.map((item) => {
      if (item.product === productId && item.variant === variant) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);

    try {
      const res = await fetch(`/api/cart/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems })
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart.items || []);
      }
    } catch (err) {
      console.error("Failed to update cart quantity:", err);
    }
  };

  // Remove Item
  const removeFromCart = async (productId: string, variant?: string) => {
    if (!sessionId) return;

    // Optimistic update
    setCartItems((prev) =>
      prev.filter((item) => !(item.product === productId && item.variant === variant))
    );

    try {
      let url = `/api/cart/${sessionId}/item/${productId}`;
      if (variant) {
        url += `?variant=${encodeURIComponent(variant)}`;
      }
      const res = await fetch(url, {
        method: "DELETE"
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart.items || []);
      }
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    if (!sessionId) return;
    setCartItems([]);
    try {
      const res = await fetch(`/api/cart/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [] })
      });
      if (res.ok) {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  // Derived Values
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.1; // 10% GST Added
  const total = subtotal + shippingCost + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        sessionId,
        loading,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shippingCost,
        tax,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
