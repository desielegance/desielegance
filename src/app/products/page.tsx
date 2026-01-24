import { ProductCard } from "@/components/products/ProductCard";
import { productService } from "@/services/productService";

// Force dynamic rendering so we always get fresh data from the DB
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await productService.getAllProducts();

  return (
    <main className="min-h-screen bg-ivory pt-24 md:pt-32 pb-20">
      {/* Header / Title */}
      <div className="container mx-auto px-6 mb-6 text-center md:text-left">
        <span className="text-copper uppercase tracking-[0.2em] text-xl font-medium">
          New Arrivals
        </span>
        {/* <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian font-light mt-4">
          The Collection
        </h1>
        <p className="text-obsidian/60 mt-4 max-w-md font-light">
          A seamless blend of tradition and modernity, crafted for the conscious soul.
        </p> */}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}