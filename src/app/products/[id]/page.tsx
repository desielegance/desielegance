import { notFound } from "next/navigation";
import { productService } from "@/services/productService";
import { ProductDetail } from "@/components/products/ProductDetail";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
