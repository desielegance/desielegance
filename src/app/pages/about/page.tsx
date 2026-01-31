"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="bg-ivory min-h-screen pt-24">
      {/* Hero Section */}
      <SectionWrapper className="pb-8 pt-8 md:pt-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-obsidian"
            >
              About Us
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden rounded-sm"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0341/4805/7228/files/libas-about-1.jpg?v=1590125657"
              alt="Desi Elegance Heritage"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Brand Story Section */}
      <SectionWrapper className="py-6 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-serif uppercase tracking-widest text-obsidian"
          >
            YOUNG. STYLISH. MODERN.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed text-obsidian/80 font-light"
          >
            <span className="italic text-copper font-serif">Young Stylish Modern</span> defines Desi Elegance — a brand that celebrates the story of the <span className="italic text-copper font-serif">New Age Indian Woman</span>: free-spirited, independent, and aware. Our constant endeavour is to offer a fashionable, stylish, and uplifting collection of <span className="italic text-copper font-serif">ethnic and fusion wear</span>, thoughtfully curated in harmony with global fashion trends.
          </motion.p>
        </div>
      </SectionWrapper>

      {/* Philosophy Section */}
      <SectionWrapper className="py-16 md:py-24 bg-sand/30">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-obsidian"
          >
            PHILOSOPHY
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl font-light text-obsidian/80"
          >
            <p>
              We believe in stories for every season, personal style over passing trends, and comfort that never compromises on elegance.
            </p>
            <p>
              Each piece is crafted with deep respect for tradition while embracing the momentum of modern expression. Our designs balance heritage and contemporary aesthetics, creating clothing that feels timeless, effortless, and distinctly you.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Brand Story Section */}
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-serif uppercase tracking-widest text-obsidian"
          >
            BRAND FORTE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed text-obsidian/80 font-light"
          >
            <span className="italic text-copper font-serif">Kurtis</span> are our forte, but our upcoming collection of bottom wear and dupattas will allow you to mix, match, and curate your perfect ensemble.
          </motion.p>
        </div>
      </SectionWrapper>
    </main>
  );
}