import Link from 'next/link';
import { ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-900 flex items-center justify-center font-heading text-lg font-bold">
                A
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                ATELIER<span className="text-sky-500">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated digital products built with aesthetic precision. Providing world-class templates, lightroom presets, and strategic creator playbooks.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-sky-500 uppercase">Produk Digital</h4>
            <ul className="space-y-2 text-sm text-[#E6E3D8]">
              <li><Link href="/?category=TEMPLATE" className="hover:text-white transition-colors">Template Website Next.js</Link></li>
              <li><Link href="/?category=PRESET" className="hover:text-white transition-colors">Lightroom Presets Pack</Link></li>
              <li><Link href="/?category=EBOOK" className="hover:text-white transition-colors">E-Book Digital Creator</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Koleksi Terbaru</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-sky-500 uppercase">Sistem Pembayaran</h4>
            <ul className="space-y-2 text-sm text-[#E6E3D8]">
              <li className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-sky-500" />
                <span>DOKU Payment Gateway</span>
              </li>
              <li className="text-xs text-slate-400">QRIS, Virtual Account, Credit Card & E-Wallet</li>
              <li className="flex items-center space-x-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Instan Auto Verification</span>
              </li>
            </ul>
          </div>

          {/* Trust Badges Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-sky-500 uppercase">Jaminan Kualitas</h4>
            <div className="space-y-2 text-xs text-[#E6E3D8]">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Lisensi Penggunaan Komersial & Personal</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Download Aman Berdurasi Waktu</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Dukungan Teknis & Pembaruan File</span>
              </div>
            </div>
          </div>

          {/* Legal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-sky-500 uppercase">Informasi Legal</h4>
            <ul className="space-y-2 text-sm text-[#E6E3D8]">
              <li><Link href="/legal/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/legal/syarat-dan-ketentuan" className="hover:text-white transition-colors">Syarat dan Ketentuan</Link></li>
              <li><Link href="/legal/perlindungan-data-pribadi" className="hover:text-white transition-colors">Perlindungan Data</Link></li>
              <li><Link href="/legal/syarat-pembayaran" className="hover:text-white transition-colors">Syarat Pembayaran</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 ATELIER Digital Store. Powered by Next.js 15 & DOKU Payment Gateway.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">

            <span>All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
