'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Download, ShieldCheck, CheckCircle2, Clock, FileText, ArrowLeft } from 'lucide-react';

interface TrackedOrder {
  id: string;
  orderNumber: string;
  dokuInvoiceNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  productTitle: string;
  productCategory: string;
  productPreview: string;
  downloadToken: string | null;
  tokenExpiresAt: string | null;
}

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSearched(true);

    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (res.ok && data.orders) {
        setOrders(data.orders);
      } else {
        setOrders([]);
        setErrorMsg(data.error || 'Pesanan tidak ditemukan.');
      }
    } catch {
      setErrorMsg('Gagal terhubung ke server pencarian.');
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#5C5953] hover:text-[#1C1B18]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Storefront Utama</span>
          </Link>
        </div>

        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A37D4C]">
            Layanan Mandiri Pembeli
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1B18]">
            Cek Pesanan &amp; Unduh File Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5953] max-w-lg mx-auto leading-relaxed">
            Masukkan Nomor Pesanan (contoh: <code>DKU-xxxx</code>) atau Alamat Email Anda untuk menemukan riwayat pembelian dan mengunduh ulang produk digital Anda.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-2xl border border-[#E6E3D8] shadow-sm mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#5C5953] absolute left-4 top-4" />
              <input
                type="text"
                required
                placeholder="Masukkan Nomor Order (DKU-...) atau Email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E6E3D8] text-xs text-[#1C1B18] focus:outline-none focus:border-[#1C1B18]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#1C1B18] hover:bg-[#0F4C3A] text-white rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? 'Mencari...' : 'Cek Pesanan'}
            </button>
          </form>
        </div>

        {/* Error State */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium text-center mb-8">
            {errorMsg}
          </div>
        )}

        {/* Orders List Result */}
        {searched && orders.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#1C1B18]">
              Ditemukan {orders.length} Pesanan:
            </h2>

            {orders.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E3D8] shadow-sm space-y-6"
              >
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E6E3D8] gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A37D4C]">Nomor Pesanan</span>
                    <h3 className="font-mono text-base font-bold text-[#1C1B18]">{item.orderNumber}</h3>
                    <span className="text-[#5C5953] text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div>
                    {item.status === 'PAID' ? (
                      <span className="inline-flex items-center space-x-1 bg-[#E6F0EC] text-[#0F4C3A] px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PAID / LUNAS</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>PENDING (MENUNGGU PEMBAYARAN)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#5C5953] block">Produk Digital:</span>
                    <span className="font-serif text-base font-bold text-[#1C1B18]">{item.productTitle}</span>
                    <span className="block text-[10px] text-[#A37D4C] uppercase font-bold mt-0.5">{item.productCategory}</span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[#5C5953] block">Total Pembayaran:</span>
                    <span className="font-serif text-lg font-bold text-[#0F4C3A]">{formatRupiah(item.totalAmount)}</span>
                    <span className="block text-[11px] text-[#5C5953]">DOKU Gateway</span>
                  </div>
                </div>

                {/* Download Action Area */}
                {item.status === 'PAID' && item.downloadToken ? (
                  <div className="pt-4 border-t border-[#E6E3D8] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#5C5953] space-y-1">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                        <span>File Terproteksi dengan Token Aktif</span>
                      </div>
                    </div>

                    <a
                      href={`/api/download/${item.downloadToken}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0F4C3A] hover:bg-[#1C1B18] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh File Digital</span>
                    </a>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-[#E6E3D8] text-xs text-[#5C5953]">
                    <p>Pembayaran belum terkonfirmasi lunas. Silakan selesaikan pembayaran via DOKU.</p>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
