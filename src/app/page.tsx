import { Hero } from "@/components/landing/Hero";
import { BrandStory } from "@/components/landing/BrandStory";
import { ProductTease } from "@/components/landing/ProductTease";
import { productService } from "@/services/productService";

export const dynamic = "force-dynamic";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      
      <ProductTease />
      <BrandStory />
    </main>
  );
}
