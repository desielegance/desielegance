"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";

export function ProductTease() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // Take top 4 recent products
          setRecentProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch recent products", error);
      }
    };
    fetchProducts();
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="bg-sand text-obsidian py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16">

          {/* Recent Products List (Vertical Stack) */}
          {/* Recent Products List (Vertical Stack) */}
          {/* Recent Products List (Vertical Stack) */}
          {/* Recent Products List (Vertical Stack) */}
          <div className="flex flex-col gap-6 md:order-2 mt-0">

            <h3 className="font-serif text-3xl font-bold uppercase tracking-widest text-obsidian text-center md:text-left border-b-2 border-copper w-fit mx-auto md:mx-0 pb-2 mb-2">
              New Arrivals
            </h3>

            {recentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "backOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link href={`/products/${product.id}`} className="group block cursor-pointer  bg-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-sm">
                  {/* Image Thumbnail */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/40 mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-2 pb-2">
                    <h3 className="font-serif text-3xl font-light text-obsidian group-hover:text-copper transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-mono text-lg text-obsidian/60">
                      ₹ {product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Brand / Inspiration Text (Left Side to balance layout) */}
          <div className="flex flex-col justify-between md:order-1 sticky top-32 h-fit space-y-10">
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-obsidian text-obsidian hover:bg-obsidian hover:text-ivory uppercase tracking-widest">
                  View All Collection <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
           
          </div>

        </div>
      </div>
    </div>
  );
}
