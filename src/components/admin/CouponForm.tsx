"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface CouponFormProps {
  initialData?: {
    id: string;
    name: string;
    discount: number;
  };
  onSubmit: (data: { name: string; discount: number }) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function CouponForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: CouponFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        discount: initialData.discount.toString(),
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      discount: parseFloat(formData.discount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-obsidian">
          Coupon Name (Code) *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-obsidian/20 rounded-md focus:outline-none focus:ring-1 focus:ring-obsidian/50 bg-transparent"
          placeholder="e.g. SUMMER10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-obsidian">
          Discount Percentage (%) *
        </label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          required
          min="0"
          max="100"
          step="0.1"
          className="w-full px-4 py-2 border border-obsidian/20 rounded-md focus:outline-none focus:ring-1 focus:ring-obsidian/50 bg-transparent"
          placeholder="e.g. 10"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Coupon"}
        </Button>
      </div>
    </form>
  );
}
