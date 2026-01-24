"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";
import ViewerCount from "./ViewerCount";

const SIZES = ["S", "M", "L", "XL", "2XL"];

import { useCart } from "@/context/CartContext";

export function ProductDetail({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id, selectedSize);

  const handleIncrement = () => updateQuantity(product.id, quantity + 1, selectedSize);
  const handleDecrement = () => updateQuantity(product.id, quantity - 1, selectedSize);
  const handleAddToCart = () => addToCart(product, selectedSize);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const toggleAccordion = (value: string) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-0 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - IMAGES */}
          <div className="col-span-1 lg:col-span-7 lg:col-start-1">
            {/* Mobile Slider */}
            <div className="relative aspect-[3/4] md:hidden w-full bg-sand/10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} view ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Mobile Controls */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-ivory/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-obsidian hover:bg-ivory transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-ivory/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-obsidian hover:bg-ivory transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-300",
                      idx === currentImageIndex ? "bg-obsidian w-4" : "bg-obsidian/30"
                    )} 
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid Layout (2 columns) */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className={cn(
                  "relative aspect-[3/4] bg-sand/10 w-full overflow-hidden group cursor-zoom-in",
                  idx === 0 || idx === 3 ? "col-span-1" : "col-span-1" // Just standard grid as per "2 up 2 down"
                )}>
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - DETAILS */}
          <div className="col-span-1 lg:col-span-5 relative px-6 md:px-0">
            <div className="sticky top-32 space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <h1 className="font-serif text-3xl md:text-4xl text-obsidian uppercase tracking-wide">
                  {product.name}
                </h1>
                <div className="flex items-baseline justify-between border-b border-obsidian/10 pb-6">
                  <span className="font-mono text-xl text-obsidian/80">
                    ₹ {product.price.toLocaleString("en-IN")}.00
                  </span>
                  
                  <div className="flex items-center gap-2 text-copper animate-pulse">
                    <span className="text-xs font-medium uppercase tracking-wider">
                      <ViewerCount />
                    </span>
                    <Eye height={16} width={16}/>
                    {/* <div className="h-2 w-2 rounded-full bg-copper" /> */}
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-obsidian/60 font-medium">Size: <span className="text-obsidian">{selectedSize}</span></span>
                  <button className="text-obsidian underline underline-offset-4 hover:text-copper transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 w-12 md:h-14 md:w-14 flex items-center justify-center border transition-all duration-200 text-sm md:text-base font-medium",
                        selectedSize === size
                          ? "bg-obsidian text-ivory border-obsidian"
                          : "bg-transparent text-obsidian/70 border-obsidian/20 hover:border-obsidian/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  {quantity > 0 ? (
                       /* Quantity Control (Green Number style per request) in Detail Page */
                      <div className="flex h-14 w-full items-center justify-between border border-obsidian/20 rounded-none px-4 bg-ivory">
                        <button
                          onClick={handleDecrement}
                          className="h-10 w-10 flex items-center justify-center text-obsidian/60 hover:text-obsidian hover:bg-obsidian/5 transition-colors rounded-sm"
                        >
                          <Minus size={20} />
                        </button>
                        
                        <span className="font-mono text-2xl font-bold text-green-700">{quantity}</span>
                        
                        <button
                          onClick={handleIncrement}
                          className="h-10 w-10 flex items-center justify-center text-obsidian/60 hover:text-obsidian hover:bg-obsidian/5 transition-colors rounded-sm"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={handleAddToCart}
                      className="flex-1 h-14 uppercase tracking-[0.2em] text-sm md:text-base bg-obsidian text-ivory hover:bg-copper hover:border-copper transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  )}
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex-1 h-14 uppercase tracking-[0.2em] text-sm md:text-base bg-obsidian text-ivory hover:bg-copper hover:border-copper transition-all duration-300 opacity-60 hover:opacity-100"
                  >
                    Buy Now
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-medium text-obsidian/60 tracking-wider uppercase">
                  <Truck size={14} />
                  <span>Cash on Delivery Available
                    <br></br>
                    With a minimal advance
                  </span>
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-obsidian/10 pt-4 space-y-2">
                
                <AccordionItem 
                  title="Description" 
                  isOpen={openAccordion === "description"}
                  onClick={() => toggleAccordion("description")}
                >
                  <p className="font-light leading-relaxed text-obsidian/80">
                    {product.description}
                  </p>
                </AccordionItem>

                <AccordionItem 
                  title="Wash Care Instructions" 
                  isOpen={openAccordion === "care"}
                  onClick={() => toggleAccordion("care")}
                >
                  <ul className="list-disc list-inside space-y-1 font-light text-obsidian/80">
                    <li>Do not bleach</li>
                    <li>Hand wash separately</li>
                    <li>Iron on low heat</li>
                    <li>Dry in shade</li>
                  </ul>
                </AccordionItem>

                <AccordionItem 
                  title="Shipping & Returns" 
                  isOpen={openAccordion === "shipping"}
                  onClick={() => toggleAccordion("shipping")}
                >
                   <p className="font-light leading-relaxed text-obsidian/80">
                    Free shipping on orders over ₹2000. Easy returns within 7 days of delivery.
                  </p>
                </AccordionItem>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ title, isOpen, onClick, children }: { 
  title: string; 
  isOpen: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) {
  return (
    <div className="border-b border-obsidian/10 last:border-0">
      <button 
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 text-left group"
      >
        <span className="font-medium text-obsidian uppercase tracking-wider text-sm group-hover:text-copper transition-colors">
          {title}
        </span>
        <span className="text-obsidian/40 group-hover:text-copper transition-colors">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
