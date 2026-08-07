import Link from 'next/link';
import { ShoppingBag, Lock, Sparkles, ShieldCheck, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F3]/90 backdrop-blur-md border-b border-[#E6E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-[#1C1B18] text-[#F9F8F3] flex items-center justify-center font-serif text-xl font-bold transition-transform group-hover:scale-105">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1B18] leading-none">
                ATELIER<span className="text-[#A37D4C]">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#5C5953] uppercase font-sans font-medium mt-1">
                Digital Assets Studio
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#1C1B18]">
            <Link href="/" className="hover:text-[#0F4C3A] transition-colors py-1 border-b-2 border-transparent hover:border-[#0F4C3A]">
              Semua Katalog
            </Link>
            <Link href="/?category=TEMPLATE" className="hover:text-[#0F4C3A] transition-colors py-1 border-b-2 border-transparent hover:border-[#0F4C3A]">
              Template Website
            </Link>
            <Link href="/?category=PRESET" className="hover:text-[#0F4C3A] transition-colors py-1 border-b-2 border-transparent hover:border-[#0F4C3A]">
              Lightroom Presets
            </Link>
            <Link href="/?category=EBOOK" className="hover:text-[#0F4C3A] transition-colors py-1 border-b-2 border-transparent hover:border-[#0F4C3A]">
              E-Book Guide
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            <Link
              href="/track-order"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0F4C3A] bg-[#E6F0EC] px-3 py-2 rounded-lg hover:bg-[#0F4C3A] hover:text-white transition-all border border-[#0F4C3A]/20"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cek Pesanan</span>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#5C5953] hover:text-[#1C1B18] border border-[#E6E3D8] bg-white px-3 py-2 rounded-lg hover:border-[#1C1B18] transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-[#A37D4C]" />
              <span>Admin Area</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
