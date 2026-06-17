import { Metadata } from "next";
import { CheckCircle2, XCircle, Star } from "lucide-react";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Reviews — Admin" };

const reviews = Array.from({ length: 8 }, (_, i) => ({
  id: `r${i + 1}`,
  product: ["Wireless Headphones Pro", "Smart Watch Gen 4", "Premium Backpack", "Running Shoes", "Coffee Maker", "Desk Lamp", "Yoga Mat", "Gaming Mouse"][i],
  customer: ["Rakibul H.", "Fatema B.", "Arif A.", "Nusrat J.", "Mehedi H.", "Sumaiya A.", "Tanvir I.", "Ritu D."][i],
  rating: [5, 4, 5, 3, 4, 5, 5, 4][i],
  title: ["Amazing quality!", "Good watch", "Perfect bag", "Decent shoes", "Great coffee", "Bright lamp", "Love it!", "Smooth mouse"][i],
  body: ["Absolutely love this product. Build quality is premium and delivery was fast.", "Works well but could have better battery life.", "Very spacious and durable. Exactly as described.", "Good for casual use but not for serious running.", "Makes perfect coffee every morning!", "Very bright and adjustable. Great for work.", "Perfect for daily yoga practice!", "Smooth clicks and great precision."][i],
  approved: [true, true, false, false, true, false, true, true][i],
  verified: [true, true, false, true, false, true, true, true][i],
  date: new Date(Date.now() - i * 3 * 86400000),
}));

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Reviews</h1><p className="text-muted-foreground text-sm">{reviews.filter(r=>!r.approved).length} pending approval</p></div>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className={`bg-white dark:bg-slate-800 rounded-2xl border p-5 ${!r.approved ? "border-amber-300 dark:border-amber-700" : "border-border"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-foreground">{r.customer}</span>
                  {r.verified && <span className="badge-pill text-[10px] bg-green-100 text-green-700">Verified Purchase</span>}
                  {!r.approved && <span className="badge-pill text-[10px] bg-amber-100 text-amber-700">Pending</span>}
                  <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><Star key={i} className={`w-3.5 h-3.5 ${i<r.rating?"fill-yellow-400 text-yellow-400":"text-muted-foreground/30"}`}/>)}</div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">On: <span className="text-foreground font-medium">{r.product}</span> · {formatDate(r.date)}</p>
                <p className="font-medium text-sm text-foreground mb-1">{r.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {!r.approved && <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Approve</button>}
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg text-xs font-semibold"><XCircle className="w-3.5 h-3.5" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
