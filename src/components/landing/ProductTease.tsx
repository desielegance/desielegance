"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: "1",
    name: "The Royal Muslin Set",
    price: 2999,
    image: "https://images.unsplash.com/photo-1764161148361-d8d87d000acf?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Patterned Apparel",
    price: 1500,
    image: "https://images.unsplash.com/photo-1768803968262-320d4752966f?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Emerald Velvet Lehenga",
    price: 2000,
    image: "https://images.unsplash.com/photo-1668371679302-a8ec781e876e?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Tunic Kurti",
    price: 2500,
    image: "https://images.unsplash.com/photo-1767785829193-191aae29045b?q=80&w=687&auto=format&fit=crop",
  },
];

export function ProductTease() {
  const router = useRouter();

  return (
    <SectionWrapper className="bg-sand text-obsidian overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-copper uppercase tracking-[0.2em] text-sm font-medium">
            Curated For You
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2 font-light">
            Signature Collection
          </h2>
        </div>
        <Button variant="outline" className="border-obsidian/20 text-obsidian hover:bg-obsidian hover:text-ivory w-fit"
        onClick={()=>{router.push('/products')}}>
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Horizontal Scroll / Desktop Grid */}
      <div className="mb-5">
         <span className=" text-copper uppercase tracking-[0.2em] text-2xl">
            Coming soon!!
          </span>
      </div>
    
      <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide">
         
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-none w-[75vw] md:w-auto snap-center group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-white/40 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="bg-ivory text-obsidian px-6 py-3 uppercase text-xs tracking-widest font-medium backdrop-blur-sm">
                    Quick View
                 </span>
              </div>
            </div>
            <h3 className="font-serif text-xl mb-1 group-hover:text-copper transition-colors font-medium">
              {product.name}
            </h3>
            <p className="text-obsidian/60 font-mono text-sm">₹ {product.price.toLocaleString("en-IN")}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
