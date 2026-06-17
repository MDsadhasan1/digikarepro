import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">DigiKare Pro</h3>
          <p className="text-sm leading-relaxed">
            বাংলাদেশের বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম। সেরা পণ্য, সেরা দামে।
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/products?category=Electronics" className="hover:text-white transition-colors">Electronics</Link></li>
            <li><Link href="/products?category=Fashion" className="hover:text-white transition-colors">Fashion</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm">
            <p>Email: support@digikarepro.com</p>
            <p>Phone: 01700-000000</p>
            <p>Hours: Sat–Thu, 9am–6pm</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2025 DigiKare Pro. All rights reserved.
      </div>
    </footer>
  );
}
