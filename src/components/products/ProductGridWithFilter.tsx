"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ChevronDown } from "lucide-react";

interface ProductGridWithFilterProps {
  products: Product[];
}

export function ProductGridWithFilter({ products }: ProductGridWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)].sort();
  }, [products]);

  // Filter products based on selection
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header & Filter Bar */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-copper uppercase tracking-[0.2em] text-xl font-medium">
              New Arrivals
            </span>
          </div>

          {/* Filter Dropdown */}
          <div className="relative group min-w-[200px] z-10">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-obsidian/20 rounded-none px-4 py-3 pr-10 text-obsidian font-serif focus:outline-none focus:border-obsidian cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat as string}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian/50 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-5 md:px-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                slashPrice={product.slashPrice}
                image={product.images[0]}
                category={product.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-obsidian/50 font-serif">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
