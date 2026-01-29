"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import ToasterUi from 'toaster-ui'

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    coupon: appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getFinalTotal
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const toaster = new ToasterUi();

  const subtotal = getCartTotal();
  const discountAmount = getDiscountAmount();
  const total = getFinalTotal();

  const advanceAmount = Math.round(total * 0.25);

  // Re-validate coupon on mount to ensure it still exists in DB
  useEffect(() => {
    const validateCoupon = async () => {
      if (appliedCoupon) {
        try {
          const res = await fetch("/api/coupons/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: appliedCoupon.name }),
          });
          const data = await res.json();
          if (!res.ok || !data.valid) {
            removeCoupon();
            toaster.addToast(`Coupon '${appliedCoupon.name}' is no longer valid.`, "error");
          }
        } catch (error) {
          // On network error we might choose to keep it or remove it. 
          // For safety, let's keep it unless we know it's invalid, 
          // but technically we can't verify.
          // However, if the user explicitly deleted it, we want it gone.
          console.error("Coupon re-validation failed", error);
        }
      }
    };

    validateCoupon();
  }, [appliedCoupon?.name]); // Only run if the coupon name changes or on mount

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplying(true);
    try {
      const res = await fetch("/api/coupons/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        applyCoupon(data.coupon);
        // Optional: clear input or keep it to show what's applied
      } else {
        toaster.addToast("Coupon not valid", "error");
        removeCoupon();
      }
    } catch (error) {
      toaster.addToast("Something went wrong. Please try again after some time.", "error");
    } finally {
      setIsApplying(false);
    }
  };

  const clearCoupon = () => {
    removeCoupon();
    setCouponCode("");
  };

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
          <Link href="/products">
            <Button
              variant="outline"
              size="sm"
              className="text-xs md:text-sm uppercase tracking-widest border border-obsidian/20 hover:bg-obsidian hover:text-ivory transition-colors"
            >
              Continue Shopping
            </Button>
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
                <Link href={`/products/${item.id}`} className="relative h-28 w-24 md:h-40 md:w-32 flex-shrink-0 bg-sand/20 overflow-hidden block">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>

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
                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag size={12} /> Coupon ({appliedCoupon.name})
                    </span>
                    <span>- ₹ {discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-green-700 uppercase font-medium text-xs">Free</span>
                </div>
              </div>

              {/* Coupon Section (75% / 25% Split) */}
              <div className="space-y-2">
                {!appliedCoupon ? (
                  <div className="flex w-full h-12 border border-obsidian/20 rounded-sm overflow-hidden focus-within:border-obsidian transition-colors">
                    <div className="relative w-[75%] bg-transparent flex items-center px-3 gap-2">
                      <Tag size={16} className="text-obsidian/40" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Have a Coupon?"
                        className="w-full bg-transparent outline-none text-sm font-light placeholder:text-obsidian/30 uppercase tracking-wide"
                        disabled={isApplying}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplying || !couponCode.trim()}
                      className="w-[25%] bg-obsidian text-ivory text-xs font-bold uppercase tracking-widest hover:bg-copper transition-colors disabled:opacity-50"
                    >
                      {isApplying ? "..." : "Apply"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-sm text-sm">
                    <span className="text-green-800 font-medium flex items-center gap-2">
                      <Tag size={14} /> {appliedCoupon.name} Applied
                    </span>
                    <button onClick={clearCoupon} className="text-green-800 hover:text-green-950">
                      <X size={16} />
                    </button>
                  </div>
                )}
                {appliedCoupon && (
                  <p className="text-xs text-green-600 text-right">
                    You saved ₹{discountAmount.toLocaleString("en-IN")} ({appliedCoupon.discount}%)!
                  </p>
                )}
              </div>

              {/* Totals Section */}
              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-lg uppercase tracking-widest">Total Amount</span>
                  <span className="font-serif text-2xl font-medium">
                    ₹ {total.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Advance Payment Info */}
                {/* <div className="bg-sand/30 p-3 rounded-sm border border-sand-dark/20 text-sm space-y-2">
                  <div className="flex justify-between items-center text-obsidian/80">
                    <span>Advance to Pay (25%)</span>
                    <span className="font-bold">₹ {advanceAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center text-obsidian/60 text-xs">
                    <span>Remaining on Delivery</span>
                    <span>₹ {remainingAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div> */}
              </div>

              <Button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full h-14 bg-copper hover:bg-obsidian text-white uppercase tracking-[0.2em] font-medium transition-all duration-500 shadow-xl shadow-copper/20"
              >
                Place Order <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalMRP={subtotal}
        discountAmount={discountAmount}
        finalTotal={total}
        coupon={appliedCoupon}
      />
    </div>
  );
}
