"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Metadata } from "next";

const initCats = [
  { id: "c1", name: "Electronics",    slug: "electronics",    products: 120, active: true  },
  { id: "c2", name: "Fashion",        slug: "fashion",         products: 85,  active: true  },
  { id: "c3", name: "Home & Living",  slug: "home-living",     products: 64,  active: true  },
  { id: "c4", name: "Health & Beauty",slug: "health-beauty",   products: 97,  active: true  },
  { id: "c5", name: "Sports",         slug: "sports",          products: 43,  active: false },
  { id: "c6", name: "Books",          slug: "books",           products: 210, active: true  },
];

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState(initCats);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");

  const addCategory = () => {
    if (!newName.trim()) return;
    setCats([...cats, { id: `c${Date.now()}`, name: newName, slug: newName.toLowerCase().replace(/\s+/g, "-"), products: 0, active: true }]);
    setNewName(""); setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Categories</h1><p className="text-muted-foreground text-sm">{cats.length} categories</p></div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-brand-sm">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-5 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-1.5">Category Name</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCategory()} placeholder="e.g. Garden & Outdoors" className="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background" autoFocus />
          </div>
          <button onClick={addCategory} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold">Save</button>
          <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-border text-foreground rounded-xl text-sm font-medium hover:bg-muted">Cancel</button>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
            {["Name", "Slug", "Products", "Status", "Actions"].map((h) => (
              <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {cats.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4 font-medium text-sm text-foreground">{c.name}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground font-mono">{c.slug}</td>
                <td className="px-5 py-4 text-sm text-foreground">{c.products}</td>
                <td className="px-5 py-4">
                  <button onClick={() => setCats(cats.map((x) => x.id === c.id ? { ...x, active: !x.active } : x))}
                    className={`badge-pill text-xs cursor-pointer ${c.active ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
                    {c.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-brand-600 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setCats(cats.filter((x) => x.id !== c.id))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
