"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const heroImages = [
  "./1.jpg",
  "./2.avif",
  "./3.avif",
  "./4.avif"
];

export function Hero() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Hero Background"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* <motion.span
            variants={itemVariants}
            className="text-ivory/90 uppercase tracking-[0.2em] text-sm md:text-base font-semibold"
          >
            New Collection 2026
          </motion.span> */}

          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory font-medium leading-tight tracking-tight"
          >
            Desi Spirit.
            <br />
            <span className="text-copper italic">Global Soul.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-ivory/80 max-w-md md:max-w-xl text-lg md:text-xl font-light leading-relaxed tracking-wide"
          >
            Redefining Indian fashion for the modern urban aesthete.
            Timeless elegance meets contemporary rhythm.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <Button variant="primary" size="lg" className="min-w-[180px]"
            onClick={() => router.push('/products')}>
              Explore Collection
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-ivory/60 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-ivory/20 overflow-hidden">
          <motion.div
            animate={{ y: [0, 50] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-full h-1/2 bg-copper"
          />
        </div>
      </motion.div>
    </section>
  );
}
