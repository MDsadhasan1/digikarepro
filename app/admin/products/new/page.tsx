"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Upload, Plus, X, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  shortDescription: z.string().optional(),
  categoryId: z.string().min(1, "Select a category"),
  basePrice: z.coerce.number().positive(),
  salePrice: z.coerce.number().optional(),
  stock: z.coerce.number().int().min(0),
  sku: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

const categories = ["Electronics", "Fashion", "Home & Living", "Health & Beauty", "Sports", "Books", "Baby & Kids", "Groceries"];

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { stock: 0, isFeatured: false, isBestSeller: false },
  });

  const nameVal = watch("name");
  const autoSlug = () => { if (nameVal) setValue("slug", slugify(nameVal)); };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, images, tags }) });
      if (res.ok) { toast.success("Product created!"); router.push("/admin/products"); }
      else toast.error("Failed to create product");
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const inputCls = (err?: boolean) => cn("w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background", err ? "border-destructive" : "border-input");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-muted transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Add Product</h1><p className="text-muted-foreground text-sm">Create a new product listing</p></div>
        <div className="ml-auto flex gap-3">
          <Link href="/admin/products" className="px-4 py-2.5 border border-border text-foreground rounded-xl text-sm font-medium hover:bg-muted">Cancel</Link>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-brand-sm disabled:opacity-70">
            <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Product Name *</label>
              <input {...register("name")} onBlur={autoSlug} placeholder="e.g. Wireless Headphones Pro" className={inputCls(!!errors.name)} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Slug (URL)</label>
              <input {...register("slug")} placeholder="wireless-headphones-pro" className={inputCls(!!errors.slug)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Short Description</label>
              <input {...register("shortDescription")} placeholder="Brief product summary (shown in listing)" className={inputCls()} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Description *</label>
              <textarea {...register("description")} rows={6} placeholder="Detailed product description..." className={cn(inputCls(!!errors.description), "resize-none")} />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Price (৳) *</label>
                <input {...register("basePrice")} type="number" placeholder="0" className={inputCls(!!errors.basePrice)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Sale Price (৳)</label>
                <input {...register("salePrice")} type="number" placeholder="0" className={inputCls()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Stock *</label>
                <input {...register("stock")} type="number" placeholder="0" className={inputCls(!!errors.stock)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">SKU</label>
                <input {...register("sku")} placeholder="e.g. DGK-HP-001" className={inputCls()} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Product Images</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-brand-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drag & drop images or <span className="text-brand-600 font-medium">browse</span></p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB each</p>
            </div>
            {/* URL input fallback */}
            <div className="flex gap-2">
              <input placeholder="Or paste image URL..." className={cn(inputCls(), "flex-1")}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); const v = (e.target as HTMLInputElement).value.trim(); if (v) { setImages([...images, v]); (e.target as HTMLInputElement).value = ""; } } }} />
            </div>
            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((url, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-5 space-y-4">
            <h2 className="font-semibold text-foreground">Organization</h2>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category *</label>
              <select {...register("categoryId")} className={inputCls(!!errors.categoryId)}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c} value={c.toLowerCase().replace(/\s/g, "-")}>{c}</option>)}
              </select>
              {errors.categoryId && <p className="text-xs text-destructive mt-1">{errors.categoryId.message}</p>}
            </div>
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tags</label>
              <div className="flex gap-2">
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag..." className={cn(inputCls(), "flex-1")} />
                <button type="button" onClick={addTag} className="w-9 h-9 flex items-center justify-center bg-muted rounded-xl hover:bg-muted/80"><Plus className="w-4 h-4" /></button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs rounded-full">
                      {t} <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Flags */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-5 space-y-3">
            <h2 className="font-semibold text-foreground">Product Flags</h2>
            {[
              { name: "isFeatured" as const, label: "Featured Product" },
              { name: "isBestSeller" as const, label: "Best Seller" },
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center gap-3 cursor-pointer">
                <input {...register(name)} type="checkbox" className="w-4 h-4 rounded accent-brand-600" />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
