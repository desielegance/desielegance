"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function BrandStory() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [50, 0]);

  return (
    <SectionWrapper className="bg-ivory">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ opacity, y }} className="space-y-8 order-2 md:order-1">
          <h2 className="font-serif text-4xl md:text-5xl text-obsidian font-light leading-tight">
            Heritage Woven for the <span className="text-copper italic">Future</span>.
          </h2>
          <p className="text-obsidian/70 text-lg leading-relaxed font-light tracking-wide">
            We believe that tradition is not about looking back—it's about moving forward with deep roots. 
            Each piece in our collection tells a story of craftsmanship, reimagined for the fast-paced 
            rhythm of modern life.
          </p>
          <div className="pt-4">
             <Button onClick={()=>{router.push('/about')}} variant="outline">Read Our Story</Button>
          </div>
        </motion.div>

        {/* Visual Side */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm order-1 md:order-2">
           {/* Placeholder for now - can use a solid color or pattern if no image */}
           <div className="absolute inset-0 bg-emerald/5 translate-y-4 translate-x-4 border border-emerald/20"/>
           <motion.div 
             className="absolute inset-0 bg-charcoal/5"
             initial={{ scale: 1.1 }}
             whileInView={{ scale: 1 }}
             transition={{ duration: 1.5 }}
             viewport={{ once: true }}
           >
              {/* Image would go here */}
              <img 
                src="https://images.unsplash.com/photo-1759719441268-7d807f21a4ea?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Artisan working" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
           </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
