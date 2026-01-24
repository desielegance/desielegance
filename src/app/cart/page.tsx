"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  // Placeholder for discount logic if you implement fully dynamic coupons later
  const discount = 0; 
  const total = subtotal - discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-obsidian mb-4">Your Cart is Empty</h1>
        <p className="font-light text-obsidian/60 mb-8 max-w-md">
          Looks like you haven't added any pieces to your collection yet.
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg" className="uppercase tracking-widest">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-24 md:pt-32 pb-40">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-obsidian/10 pb-6">
          <h1 className="font-serif text-3xl md:text-4xl text-obsidian">Cart</h1>
          <Link href="/products" className="hidden md:block text-sm uppercase tracking-widest hover:text-copper transition-colors">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            {cart.map((item) => (
              <div 
                key={`${item.id}-${item.size}`} 
                className="flex gap-4 md:gap-8 p-4 bg-white/40 border border-transparent hover:border-obsidian/5 transition-all rounded-sm"
              >
                {/* Image */}
                <div className="relative h-28 w-24 md:h-40 md:w-32 flex-shrink-0 bg-sand/20 overflow-hidden">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-base md:text-xl text-obsidian mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-obsidian/60 font-mono">
                         <span>Size: {item.size}</span>
                         <span>₹ {item.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-obsidian/40 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Quantity Control (Green Number Style) */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-obsidian/10 bg-ivory rounded-sm h-9">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        className="px-3 h-full hover:bg-obsidian/5 text-obsidian/60 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-green-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        className="px-3 h-full hover:bg-obsidian/5 text-obsidian/60 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="ml-auto md:ml-0 font-medium text-obsidian">
                       ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4 h-fit sticky top-32">
            <div className="bg-white p-6 md:p-8 border border-obsidian/5 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl uppercase tracking-widest text-obsidian/80">
                Order Summary
              </h2>
              
              <div className="space-y-3 font-light text-sm text-obsidian/80 pb-6 border-b border-obsidian/10">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Discount on MRP</span>
                  <span>- ₹ {discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-green-700 uppercase font-medium text-xs">Free</span>
                </div>
              </div>

              {/* Coupon Section (75% / 25% Split) */}
              <div className="space-y-2">
                <div className="flex w-full h-12 border border-obsidian/20 rounded-sm overflow-hidden">
                    <div className="relative w-[75%] bg-transparent flex items-center px-3 gap-2">
                        <Tag size={16} className="text-obsidian/40" />
                        <input 
                            type="text" 
                            placeholder="Have a Coupon?" 
                            className="w-full bg-transparent outline-none text-sm font-light placeholder:text-obsidian/30 uppercase tracking-wide"
                        />
                    </div>
                    <button className="w-[25%] bg-obsidian text-ivory text-xs font-bold uppercase tracking-widest hover:bg-copper transition-colors">
                        Apply
                    </button>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="font-medium text-lg uppercase tracking-widest">Total Amount</span>
                <span className="font-serif text-2xl font-medium">
                  ₹ {total.toLocaleString("en-IN")}
                </span>
              </div>
              
              <Button className="w-full h-14 bg-copper hover:bg-obsidian text-white uppercase tracking-[0.2em] font-medium transition-all duration-500 shadow-xl shadow-copper/20">
                Place Order <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
