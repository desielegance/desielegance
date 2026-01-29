"use client";

import { useState, useEffect } from "react";
import { Product, Coupon } from "@/types";
import { ProductForm } from "@/components/admin/ProductForm";
import { CouponForm } from "@/components/admin/CouponForm";
import { SubscribersModal } from "@/components/admin/SubscribersModal";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Plus, Edit, Trash2, X, Tag, Mail } from "lucide-react";
import Image from "next/image";
import ToasterUi from "toaster-ui";

export default function AdminPage() {
  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const toaster = new ToasterUi();

  // Newsletter State
  const [isSubscribersModalOpen, setIsSubscribersModalOpen] = useState(false);

  // Coupon State
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Shared State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCoupons();
  }, []);

  const fetchProducts = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
    } finally {
      setLoadingList(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/coupons");
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (error) {
    }
  };

  // --- Product Handlers ---

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toaster.addToast("Failed to delete product", "error");
      }
    } catch (error) {
      toaster.addToast("Error deleting product", "error");
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts(); // Refresh list
      } else {
        toaster.addToast("Failed to save product", "error");
      }
    } catch (error) {
      toaster.addToast("Error saving product", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Coupon Handlers ---

  const handleAddCouponClick = () => {
    setEditingCoupon(null);
    setIsCouponModalOpen(true);
  };

  const handleEditCouponClick = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsCouponModalOpen(true);
  };

  const handleDeleteCouponClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const res = await fetch(`/api/coupons/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
      } else {
        toaster.addToast("Failed to delete coupon", "error");
      }
    } catch (error) {
      toaster.addToast("Error deleting coupon", "error");
    }
  };

  const handleCouponSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const url = editingCoupon ? `/api/coupons/${editingCoupon.id}` : "/api/coupons";
      const method = editingCoupon ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsCouponModalOpen(false);
        fetchCoupons(); // Refresh list
      } else {
        toaster.addToast("Failed to save coupon", "error");
      }
    } catch (error) {
      toaster.addToast("Error saving coupon", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper className="py-20 min-h-screen bg-sand/10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl text-center font-bold underline font-serif text-obsidian">Admin Dashboard</h1>
        </div>

        <div>
          <Button onClick={() => setIsSubscribersModalOpen(true)} className="gap-2 bg-obsidian text-ivory hover:bg-obsidian/90">
            <Mail size={18} /> View Subscribers
          </Button>
        </div>

        {/* Coupons Section */}
        <div className="space-y-6 pt-10 border-t border-obsidian/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-obsidian flex items-center gap-2">
              Coupons
            </h2>
            <Button onClick={handleAddCouponClick} className="gap-2" variant="outline">
              <Plus size={18} /> Create Coupon
            </Button>
          </div>

          <div className="grid gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-ivory p-4 rounded shadow-sm border border-obsidian/10 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-obsidian/5 rounded flex items-center justify-center flex-shrink-0 text-obsidian/60">
                  <Tag size={20} />
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-obsidian truncate">{coupon.name}</h3>
                  <p className="text-sm text-green-600 font-medium">{coupon.discount}% Off</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditCouponClick(coupon)}
                    className="p-2 hover:bg-obsidian/5 rounded-full transition-colors text-obsidian/70"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCouponClick(coupon.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-600/80 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {coupons.length === 0 && (
              <div className="text-center py-10 text-obsidian/50">
                No coupons found. Create one to get started.
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif text-obsidian">Products</h1>
            <Button onClick={handleAddClick} className="gap-2">
              <Plus size={18} /> Add Product
            </Button>
          </div>

          {loadingList ? (
            <div className="text-center py-10">Loading products...</div>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-ivory p-3 md:p-4 rounded shadow-sm border border-obsidian/10 flex items-center gap-3 md:gap-4 overflow-hidden"
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {product.images && product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium text-obsidian truncate text-sm md:text-base">{product.name}</h3>
                    <p className="text-xs md:text-sm text-obsidian/60">₹{product.price}</p>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-1.5 md:p-2 hover:bg-obsidian/5 rounded-full transition-colors text-obsidian/70"
                      title="Edit"
                    >
                      <Edit size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="p-1.5 md:p-2 hover:bg-red-50 rounded-full transition-colors text-red-600/80 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-10 text-obsidian/50">
                  No products found. Add one to get started.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-ivory w-full max-w-lg rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-ivory z-10">
              <h2 className="text-xl font-serif">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <ProductForm
                initialData={editingProduct || undefined}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-ivory w-full max-w-sm rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-ivory z-10">
              <h2 className="text-xl font-serif">
                {editingCoupon ? "Edit Coupon" : "Create Coupon"}
              </h2>
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <CouponForm
                initialData={editingCoupon || undefined}
                onSubmit={handleCouponSubmit}
                onCancel={() => setIsCouponModalOpen(false)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Subscribers Modal */}
      {isSubscribersModalOpen && (
        <SubscribersModal onClose={() => setIsSubscribersModalOpen(false)} />
      )}
    </SectionWrapper>
  );
}
