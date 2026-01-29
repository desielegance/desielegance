import { productService } from "@/services/productService";
import { ProductGridWithFilter } from "@/components/products/ProductGridWithFilter";

// Force dynamic rendering so we always get fresh data from the DB
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await productService.getAllProducts();

  return (
    <main className="min-h-screen bg-ivory pt-24 md:pt-32 pb-20">
      <ProductGridWithFilter products={products} />
    </main>
  );
}