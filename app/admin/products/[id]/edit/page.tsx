"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/lib/validations/product";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";

// Demo product – replace with real fetch in production
const DEMO = {
  name:         "Wireless Noise-Cancelling Headphones",
  slug:         "wireless-noise-cancelling-headphones",
  shortDesc:    "Premium sound quality with 30hr battery life",
  description:  "Experience crystal-clear audio.",
  categoryId:   "electronics",
  price:        4999,
  salePrice:    3999,
  stock:        50,
  sku:          "ELEC-HP-001",
  isFeatured:   true,
  isBestSeller: true,
  isActive:     true,
  images:       ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
  tags:         ["wireless", "audio", "noise-cancelling"],
};

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }   = use(params);
  const router   = useRouter();
  const [loading, setLoading] = useState(false);
  const [images,  setImages]  = useState<string[]>(DEMO.images);
  const [imgInput, setImgInput] = useState("");
  const [tags,    setTags]    = useState<string[]>(DEMO.tags);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...DEMO, images: DEMO.images, tags: DEMO.tags },
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...data, images, tags }),
      });
      if (!res.ok) throw new Error();
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    if (imgInput.trim()) { setImages((p) => [...p, imgInput.trim()]); setValue("images", [...images, imgInput.trim()]); setImgInput(""); }
  };
  const removeImage = (i: number) => { const n = images.filter((_, idx) => idx !== i); setImages(n); setValue("images", n); };
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) { const n = [...tags, tagInput.trim()]; setTags(n); setValue("tags", n); setTagInput(""); }
  };
  const removeTag = (t: string) => { const n = tags.filter((x) => x !== t); setTags(n); setValue("tags", n); };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="p-2 hover:bg-accent rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-sm text-muted-foreground">ID: {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input {...register("name")} onBlur={(e) => setValue("slug", slugify(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border bg-background" placeholder="Enter product name" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input {...register("slug")} className="w-full px-3 py-2 rounded-lg border bg-background font-mono text-sm" />
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <input {...register("shortDesc")} className="w-full px-3 py-2 rounded-lg border bg-background" placeholder="Brief product summary" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Description</label>
            <textarea {...register("description")} rows={4} className="w-full px-3 py-2 rounded-lg border bg-background resize-none" placeholder="Detailed product description" />
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (৳) *</label>
              <input {...register("price", { valueAsNumber: true })} type="number" className="w-full px-3 py-2 rounded-lg border bg-background" />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sale Price (৳)</label>
              <input {...register("salePrice", { valueAsNumber: true, setValueAs: (v) => v === "" ? null : Number(v) })} type="number" className="w-full px-3 py-2 rounded-lg border bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <input {...register("stock", { valueAsNumber: true })} type="number" className="w-full px-3 py-2 rounded-lg border bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SKU</label>
              <input {...register("sku")} className="w-full px-3 py-2 rounded-lg border bg-background font-mono text-sm" />
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Images</h2>
          <div className="flex gap-2">
            <input value={imgInput} onChange={(e) => setImgInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm" placeholder="Image URL" />
            <button type="button" onClick={addImage} className="btn-primary px-4 py-2 rounded-lg"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Tags & Flags</h2>
          <div className="flex gap-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm" placeholder="Add tag and press Enter" />
            <button type="button" onClick={addTag} className="btn-primary px-4 py-2 rounded-lg"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm">
                {t} <button type="button" onClick={() => removeTag(t)}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register("isFeatured")} type="checkbox" className="rounded" />
              <span className="text-sm font-medium">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register("isBestSeller")} type="checkbox" className="rounded" />
              <span className="text-sm font-medium">Best Seller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register("isActive")} type="checkbox" className="rounded" />
              <span className="text-sm font-medium">Active</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/products" className="px-6 py-2 rounded-lg border hover:bg-accent transition-colors text-sm font-medium">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
