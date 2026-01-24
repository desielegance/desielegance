"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  className?: string;
}

const SIZES = ["S", "M", "L", "XL"];

export function ProductCard({ id, name, price, image, className }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  
  // We'll use "S" as default size for list view if not selected, or just force "S" for simplicity in card view
  const quantity = getItemQuantity(id, selectedSize);

  const handleIncrement = () => updateQuantity(id, quantity + 1, selectedSize);
  const handleDecrement = () => updateQuantity(id, quantity - 1, selectedSize);
  const handleAddToCart = () => addToCart({ id, name, price, images: [image], description: "" }, selectedSize);

  return (
    <div className={cn("group flex flex-col gap-4 ", className)}>
      {/* Image Container */}
      <Link href={`/products/${id}`} className="block w-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand/20">
          <Image
            src={image}
            alt={name}
            fill
            quality={95}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Quick Add Overlay (Desktop) or just visual interaction */}
          <div className="absolute inset-0 bg-obsidian/0 transition-colors duration-300 md:group-hover:bg-obsidian/5" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-serif text-base md:text-lg font-medium text-obsidian line-clamp-2 leading-tight">
            <Link href={`/products/${id}`} className="hover:text-copper transition-colors">
              {name}
            </Link>
          </h3>
          <p className="font-mono text-sm text-obsidian/60 tracking-wider">
            ₹ {price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Size Selector */}
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "h-8 w-8 text-xs font-medium uppercase transition-all border rounded-full flex items-center justify-center",
                selectedSize === size
                  ? "bg-obsidian text-ivory border-obsidian"
                  : "bg-transparent text-obsidian/70 border-obsidian/20 hover:border-obsidian/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Action Row: Quantity + Add */}
        <div className="w-full pt-1">
          {quantity > 0 ? (
             /* Quantity Control (Green Number style per request) */
            <div className="flex h-10 w-full items-center justify-between border border-obsidian/20 rounded-sm px-1 bg-ivory">
              <button
                onClick={handleDecrement}
                className="h-8 w-8 flex items-center justify-center text-obsidian/60 hover:text-obsidian hover:bg-obsidian/5 transition-colors rounded-sm"
              >
                <Minus size={16} />
              </button>
              
              <span className="font-mono text-lg font-bold text-green-700">{quantity}</span>
              
              <button
                onClick={handleIncrement}
                className="h-8 w-8 flex items-center justify-center text-obsidian/60 hover:text-obsidian hover:bg-obsidian/5 transition-colors rounded-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            /* Add Button */
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddToCart}
              className="w-full h-10 border-obsidian/20 hover:bg-obsidian hover:text-ivory text-xs uppercase tracking-widest"
            >
               Add to Bag
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
