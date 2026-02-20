"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { CldUploadWidget } from "next-cloudinary";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

type ProductFormData = {
  name: string;
  price: number;
  slashPrice: number | "";
  caption: string;
  description: string;
  category: string;
  images: string[];
}


export function ProductForm({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    slashPrice: "",
    caption: "",
    description: "",
    category: "",
    images: [],
  });

  //This guard is mainly used for prefilling the form data when editing a product
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || 0,
        slashPrice: initialData.slashPrice || "",
        caption: initialData.caption || "",
        description: initialData.description || "",
        category: initialData.category || "",
        images: initialData.images || [],
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSuccess = (result: any) => {
    if (result.info && result.info.secure_url) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, result.info.secure_url],
      }));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Calculate discount percentage for preview
  const discountPercent =
    formData.slashPrice !== "" &&
      Number(formData.slashPrice) > Number(formData.price) &&
      Number(formData.price) > 0
      ? Math.round(
        ((Number(formData.slashPrice) - Number(formData.price)) /
          Number(formData.slashPrice)) *
        100
      )
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: any = {
      ...formData,
      price: parseFloat(formData.price.toString()),
    };
    // Send slashPrice as a number if filled, or null to clear it (undefined gets stripped by JSON.stringify)
    if (formData.slashPrice !== "" && Number(formData.slashPrice) > 0) {
      submitData.slashPrice = parseFloat(formData.slashPrice.toString());
    } else {
      submitData.slashPrice = null;
    }
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-obsidian outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-obsidian outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            MRP / Slash Price (₹) <span className="text-obsidian/40 font-normal">— Optional</span>
          </label>
          <input
            type="number"
            name="slashPrice"
            value={formData.slashPrice}
            onChange={handleChange}
            min="0"
            placeholder="Original price before discount"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-obsidian outline-none"
          />
          {discountPercent !== null && (
            <p className="mt-1.5 text-sm font-medium text-green-600">
              ✓ Discount: {discountPercent}% OFF (₹{formData.price} selling vs ₹{formData.slashPrice} MRP)
            </p>
          )}
          {formData.slashPrice !== "" &&
            Number(formData.slashPrice) > 0 &&
            Number(formData.slashPrice) <= Number(formData.price) && (
              <p className="mt-1.5 text-sm text-amber-600">
                ⚠ Slash price should be higher than the selling price
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Caption</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-obsidian outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-obsidian outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Sarees, Lehengas, Kurtas"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-obsidian outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Product Images</label>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {formData.images.map((url, index) => (
            <div key={url} className="relative group aspect-[3/4] bg-gray-100 rounded-md overflow-hidden border">
              <Image
                src={url}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          {formData.images.length < 4 && (
            <CldUploadWidget
              uploadPreset="desi_elegance_upload"
              onSuccess={handleUploadSuccess}
              options={{
                maxFiles: 4 - formData.images.length,
                resourceType: "image",
                clientAllowedFormats: ["image"], // only allow images
              }}
            >
              {({ open }) => {
                return (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="flex flex-col items-center justify-center w-full h-full min-h-[160px] border-2 border-dashed border-gray-300 rounded-md hover:border-obsidian hover:bg-gray-50 transition-colors gap-2 text-gray-400 hover:text-obsidian"
                  >
                    <Upload size={24} />
                    <span className="text-sm font-medium">Upload Image</span>
                  </button>
                );
              }}
            </CldUploadWidget>
          )}
        </div>
        <p className="text-xs text-obsidian/60">
          Upload up to 4 images. Optimal aspect ratio is 3:4 (Portrait).
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
