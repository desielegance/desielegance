"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  getItemQuantity: (productId: string, size?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("desi-elegance-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("desi-elegance-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, size: string = "S") => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, size }];
    });
  };

  const removeFromCart = (productId: string, size: string = "S") => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, quantity: number, size: string = "S") => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getItemQuantity = (productId: string, size: string = "S") => {
    const item = cart.find((item) => item.id === productId && item.size === size);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        getItemQuantity,
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
