import Link from 'next/link';
import { ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1B18] text-[#F9F8F3] pt-16 pb-12 border-t border-[#2C2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2C2A26]">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#A37D4C] text-[#1C1B18] flex items-center justify-center font-serif text-lg font-bold">
                A
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#F9F8F3]">
                ATELIER<span className="text-[#A37D4C]">.</span>
              </span>
            </div>
            <p className="text-xs text-[#A39E93] leading-relaxed">
              Curated digital products built with aesthetic precision. Providing world-class templates, lightroom presets, and strategic creator playbooks.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#A37D4C] uppercase">Produk Digital</h4>
            <ul className="space-y-2 text-sm text-[#E6E3D8]">
              <li><Link href="/?category=TEMPLATE" className="hover:text-white transition-colors">Template Website Next.js</Link></li>
              <li><Link href="/?category=PRESET" className="hover:text-white transition-colors">Lightroom Presets Pack</Link></li>
              <li><Link href="/?category=EBOOK" className="hover:text-white transition-colors">E-Book Digital Creator</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Koleksi Terbaru</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#A37D4C] uppercase">Sistem Pembayaran</h4>
            <ul className="space-y-2 text-sm text-[#E6E3D8]">
              <li className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-[#A37D4C]" />
                <span>DOKU Payment Gateway</span>
              </li>
              <li className="text-xs text-[#A39E93]">QRIS, Virtual Account, Credit Card & E-Wallet</li>
              <li className="flex items-center space-x-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                <span>Instan Auto Verification</span>
              </li>
            </ul>
          </div>

          {/* Trust Badges Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#A37D4C] uppercase">Jaminan Kualitas</h4>
            <div className="space-y-2 text-xs text-[#E6E3D8]">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A37D4C] shrink-0 mt-0.5" />
                <span>Lisensi Penggunaan Komersial & Personal</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A37D4C] shrink-0 mt-0.5" />
                <span>Download Aman Berdurasi Waktu</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A37D4C] shrink-0 mt-0.5" />
                <span>Dukungan Teknis & Pembaruan File</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A39E93]">
          <p>© 2026 ATELIER Digital Store. Powered by Next.js 15 & DOKU Payment Gateway.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
            <span>-</span>
            <span>All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
