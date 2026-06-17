import Logo from "@/components/common/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl" />
        </div>
        <Logo dark />
        <div>
          <h2 className="text-4xl font-display font-bold mb-4 leading-tight">Smart Care,<br /><span className="text-teal-300">Smart Shopping</span></h2>
          <p className="text-white/70 text-lg max-w-sm">Bangladesh's premium e-commerce platform. Quality products, fast delivery, and dedicated support.</p>
          <div className="flex gap-6 mt-8">
            {[["10K+", "Customers"], ["500+", "Products"], ["4.9★", "Rating"]].map(([v, l]) => (
              <div key={l as string}><div className="text-2xl font-bold">{v}</div><div className="text-white/60 text-sm">{l}</div></div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-sm">© 2025 dogikarepro</p>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8 lg:hidden"><Logo /></div>
          {children}
        </div>
      </div>
    </div>
  );
}
