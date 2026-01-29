"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface AppliedCoupon {
  name: string;
  discount: number;
}

interface CartContextType {
  cart: CartItem[];
  coupon: AppliedCoupon | null;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
  getItemQuantity: (productId: string, size?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("desi-elegance-cart");
    const savedCoupon = localStorage.getItem("desi-elegance-coupon");
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    
    if (savedCoupon) {
      try {
        setCoupon(JSON.parse(savedCoupon));
      } catch (e) {
        console.error("Failed to parse coupon", e);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save to local storage whenever cart or coupon changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("desi-elegance-cart", JSON.stringify(cart));
      
      // If cart is empty, discard any coupon
      if (cart.length === 0 && coupon) {
        setCoupon(null);
        localStorage.removeItem("desi-elegance-coupon");
      } else if (coupon) {
        localStorage.setItem("desi-elegance-coupon", JSON.stringify(coupon));
      } else {
        localStorage.removeItem("desi-elegance-coupon");
      }
    }
  }, [cart, coupon, isLoaded]);

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

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (newCoupon: AppliedCoupon) => {
    setCoupon(newCoupon);
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getDiscountAmount = () => {
    if (!coupon) return 0;
    const total = getCartTotal();
    return (total * coupon.discount) / 100;
  };

  const getFinalTotal = () => {
    return getCartTotal() - getDiscountAmount();
  };

  const getItemQuantity = (productId: string, size: string = "S") => {
    const item = cart.find((item) => item.id === productId && item.size === size);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        coupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        getCartCount,
        getCartTotal,
        getDiscountAmount,
        getFinalTotal,
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
