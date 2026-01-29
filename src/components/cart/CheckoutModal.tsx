"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CartItem, AppliedCoupon } from "@/context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalMRP: number;
  discountAmount: number;
  finalTotal: number;
  coupon: AppliedCoupon | null;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  totalMRP,
  discountAmount,
  finalTotal,
  coupon,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const advanceAmount = Math.round(finalTotal * 0.40); // 40% Advance

  const handleConfirm = () => {
    // Basic Validation
    if (!formData.name.trim() || !formData.address.trim() || !formData.contact.trim()) {
      setError("Please fill in all details to proceed.");
      return;
    }
    setError("");

    // Construct WhatsApp Message
    let message = `Hello Desi Elegance, I would like to place an order:\n\n`;

    message += `*Items:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.size}) - Rs. ${item.price}\n`;
    });

    message += `\n*Order Summary:*\n`;
    message += `Total MRP: Rs. ${totalMRP}\n`;
    if (coupon) {
      message += `Coupon Applied: ${coupon.name} (-Rs. ${discountAmount})\n`;
    }
    message += `Final Price: Rs. ${finalTotal}\n`;

    message += `\n*Payment:*\n`;
    message += `Advance Payable (40%): Rs. ${advanceAmount}\n`;
    message += `Remaining Amount: Rs. ${finalTotal - advanceAmount}\n`;

    // Explicitly mentioning Advance
    message += `\n*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Address: ${formData.address}\n`;
    message += `Contact: ${formData.contact}\n`;

    message += `\nPlease share the QR code so I can pay the advance amount.`;

    // Encode and Open WhatsApp
    const whatsappUrl = `https://wa.me/919874112489?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Optionally close modal or clear cart here if desired
    // onClose(); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-24 md:pt-32">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-ivory rounded-lg shadow-2xl overflow-hidden border border-obsidian/10 flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-obsidian/10 bg-white shrink-0">
              <h2 className="text-xl font-serif text-obsidian tracking-wide">Confirm Order</h2>
              <button
                onClick={onClose}
                className="p-2 text-obsidian/50 hover:text-obsidian hover:bg-obsidian/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto min-h-0">
              <div className="bg-sand/20 p-4 rounded-md border border-sand-dark/10 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-obsidian/80 font-medium">Payment Note:</p>
                  <p className="text-xs text-obsidian/70 leading-relaxed">
                    To confirm your order, a minimal advance payment of <span className="font-bold text-obsidian">40% (₹{advanceAmount})</span> is required. The remaining amount (₹{finalTotal - advanceAmount}) will be payable upon delivery.
                  </p>
                </div>

                <div className="pt-2 border-t border-obsidian/10">
                  <p className="text-[10px] md:text-xs text-red-600/80 font-medium leading-relaxed italic">
                    * Shipping charges may vary based on your location (₹60 - ₹100). Final shipping cost will be confirmed during order processing.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-obsidian/60">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anjali Sharma"
                    className="w-full bg-white border border-obsidian/20 p-3 rounded-sm focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian/10 transition-all font-serif"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-obsidian/60">Delivery Address</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Complete address with pincode"
                    className="w-full bg-white border border-obsidian/20 p-3 rounded-sm focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian/10 transition-all font-serif resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-obsidian/60">Contact Number</label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-obsidian/20 p-3 rounded-sm focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian/10 transition-all font-serif"
                  />
                </div>
              </div>

              {error && <p className="text-red-600 text-sm font-medium animate-pulse">{error}</p>}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-obsidian/10 bg-gray-50 flex gap-3 shrink-0">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-obsidian/20 h-12 uppercase tracking-wider text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-[2] bg-green-700 hover:bg-green-800 text-white h-12 uppercase tracking-wider text-xs font-bold shadow-lg"
              >
                <MessageCircle size={18} className="mr-2" /> Confirm via WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
