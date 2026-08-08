import Link from 'next/link';
import { ShoppingBag, Lock, Sparkles, ShieldCheck, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-heading text-xl font-bold transition-transform group-hover:scale-105">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold tracking-tight text-slate-900 leading-none">
                ATELIER<span className="text-sky-500">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-slate-500 uppercase font-sans font-medium mt-1">
                Digital Assets Studio
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-900">
            <Link href="/" className="hover:text-indigo-600 transition-colors py-1 border-b-2 border-transparent hover:border-indigo-600">
              Semua Katalog
            </Link>
            <Link href="/?category=TEMPLATE" className="hover:text-indigo-600 transition-colors py-1 border-b-2 border-transparent hover:border-indigo-600">
              Template Website
            </Link>
            <Link href="/?category=PRESET" className="hover:text-indigo-600 transition-colors py-1 border-b-2 border-transparent hover:border-indigo-600">
              Lightroom Presets
            </Link>
            <Link href="/?category=EBOOK" className="hover:text-indigo-600 transition-colors py-1 border-b-2 border-transparent hover:border-indigo-600">
              E-Book Guide
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            <Link
              href="/track-order"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all border border-indigo-600/20"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cek Pesanan</span>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 border border-slate-200 bg-white px-3 py-2 rounded-lg hover:border-slate-900 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-sky-500" />
              <span>Admin Area</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
