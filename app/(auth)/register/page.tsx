"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:     z.string().min(2, "Name is required"),
  email:    z.string().email("Enter a valid email"),
  phone:    z.string().regex(/^(\+?880|0)?1[3-9]\d{8}$/, "Enter a valid BD phone number").optional().or(z.literal("")),
  password: z.string().min(6, "At least 6 characters"),
  confirm:  z.string(),
}).refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await res.json();
      if (res.ok) { toast.success("Account created! Please sign in."); router.push("/login"); }
      else toast.error(body.message ?? "Registration failed");
    } catch { toast.error("Network error"); }
    finally { setLoading(false); }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", icon: User },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com", icon: Mail },
    { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "01XXXXXXXXX", icon: Phone },
    { name: "password", label: "Password", type: showPw ? "text" : "password", placeholder: "Min 6 characters", icon: Lock, toggle: true },
    { name: "confirm", label: "Confirm Password", type: showPw ? "text" : "password", placeholder: "Repeat password", icon: Lock },
  ] as const;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-1">Create account</h1>
      <p className="text-muted-foreground text-sm mb-8">Join thousands of happy dogikarepro customers</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map(({ name, label, type, placeholder, icon: Icon, toggle }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input {...register(name)} type={type} placeholder={placeholder}
                className={cn("w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background", errors[name] ? "border-destructive" : "border-input")} />
              {toggle && (
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
            {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name]?.message}</p>}
          </div>
        ))}

        <button type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-brand-sm disabled:opacity-70 mt-2">
          {loading ? "Creating account..." : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
