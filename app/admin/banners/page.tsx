"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface Banner {
  id:        string;
  title:     string;
  subtitle:  string;
  image:     string;
  cta:       string;
  ctaLink:   string;
  isActive:  boolean;
  sortOrder: number;
}

const INITIAL: Banner[] = [
  { id: "1", title: "Summer Sale — Up to 50% Off", subtitle: "Shop the best deals on electronics, fashion, and more", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800", cta: "Shop Now", ctaLink: "/products", isActive: true,  sortOrder: 0 },
  { id: "2", title: "New Electronics Arrivals",    subtitle: "Discover the latest gadgets and tech accessories",       image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800", cta: "Explore",   ctaLink: "/products?category=electronics", isActive: true,  sortOrder: 1 },
  { id: "3", title: "Fashion Week Specials",       subtitle: "Trending styles at unbeatable prices",                  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800", cta: "Shop Now", ctaLink: "/products?category=fashion", isActive: false, sortOrder: 2 },
];

export default function BannersPage() {
  const [banners, setBanners]     = useState<Banner[]>(INITIAL);
  const [showForm, setShowForm]   = useState(false);
  const [editId,   setEditId]     = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", image: "", cta: "Shop Now", ctaLink: "/products" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image) { toast.error("Title and image are required"); return; }

    if (editId) {
      setBanners((p) => p.map((b) => b.id === editId ? { ...b, ...form } : b));
      toast.success("Banner updated");
    } else {
      const nb: Banner = { id: Date.now().toString(), ...form, isActive: true, sortOrder: banners.length };
      setBanners((p) => [...p, nb]);
      toast.success("Banner added");
    }
    setForm({ title: "", subtitle: "", image: "", cta: "Shop Now", ctaLink: "/products" });
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (b: Banner) => {
    setForm({ title: b.title, subtitle: b.subtitle, image: b.image, cta: b.cta, ctaLink: b.ctaLink });
    setEditId(b.id);
    setShowForm(true);
  };

  const toggleActive = (id: string) => {
    setBanners((p) => p.map((b) => b.id === id ? { ...b, isActive: !b.isActive } : b));
    toast.success("Banner status updated");
  };

  const handleDelete = (id: string) => {
    setBanners((p) => p.filter((b) => b.id !== id));
    toast.success("Banner deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Banners</h1>
          <p className="text-sm text-muted-foreground">Manage homepage hero banners</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", subtitle: "", image: "", cta: "Shop Now", ctaLink: "/products" }); }}
          className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          Add Banner
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6">
          <h2 className="font-semibold mb-4">{editId ? "Edit Banner" : "Add New Banner"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border bg-background" placeholder="Banner headline" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border bg-background" placeholder="Supporting text" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL *</label>
              <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border bg-background font-mono text-sm" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input value={form.cta} onChange={(e) => setForm((p) => ({ ...p, cta: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border bg-background" placeholder="Shop Now" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Link</label>
              <input value={form.ctaLink} onChange={(e) => setForm((p) => ({ ...p, ctaLink: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border bg-background font-mono text-sm" placeholder="/products" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary px-6 py-2 rounded-lg">{editId ? "Save Changes" : "Add Banner"}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 rounded-lg border hover:bg-accent transition-colors text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Banner List */}
      <div className="space-y-4">
        {banners.map((b) => (
          <div key={b.id} className={`card p-4 flex gap-4 items-center transition-opacity ${b.isActive ? "" : "opacity-60"}`}>
            <div className="w-32 h-20 rounded-lg overflow-hidden border flex-shrink-0 bg-muted flex items-center justify-center">
              {b.image
                ? <img src={b.image} alt={b.title} className="w-full h-full object-cover" /> // eslint-disable-line @next/next/no-img-element
                : <ImageIcon className="w-8 h-8 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{b.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${b.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {b.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{b.subtitle}</p>
              <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                <span>CTA: <strong className="text-foreground">{b.cta}</strong></span>
                <span>→ {b.ctaLink}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleActive(b.id)} className="p-2 hover:bg-accent rounded-lg transition-colors" title={b.isActive ? "Deactivate" : "Activate"}>
                {b.isActive ? <ToggleRight className="w-5 h-5 text-green-600" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
              </button>
              <button onClick={() => handleEdit(b)} className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
              <button onClick={() => handleDelete(b.id)} className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="card p-12 text-center text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No banners yet. Add your first banner above.</p>
        </div>
      )}
    </div>
  );
}
