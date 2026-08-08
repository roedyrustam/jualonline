'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Tag, Percent, LogOut } from 'lucide-react';

interface CouponItem {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);

  // New Coupon Form State
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [maxUses, setMaxUses] = useState(100);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch {
      console.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, discountPercent, maxUses }),
      });

      if (res.ok) {
        setCode('');
        setDiscountPercent(20);
        setMaxUses(100);
        fetchCoupons();
      } else {
        alert('Gagal membuat kupon diskon baru.');
      }
    } catch {
      alert('Terjadi kesalahan jaringan.');
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('Hapus kupon diskon ini?')) return;

    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchCoupons();
      }
    } catch {
      alert('Gagal menghapus kupon.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-900 flex items-center justify-center font-heading text-base font-bold">
                A
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                ATELIER <span className="text-sky-500">Coupon Portal</span>
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-4 text-xs font-semibold">
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors py-2">
                  Dashboard &amp; Transaksi DOKU
                </Link>
                <Link href="/admin/products" className="text-slate-400 hover:text-white transition-colors py-2">
                  Kelola Produk (CRUD)
                </Link>
                <Link href="/admin/coupons" className="text-sky-500 border-b-2 border-sky-500 py-2">
                  Kode Kupon Diskon
                </Link>
                <Link href="/" target="_blank" className="text-slate-400 hover:text-white transition-colors py-2">
                  Lihat Storefront ↗
                </Link>
              </nav>

              <form action="/api/admin/auth/logout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-red-400 font-medium transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900">
            Manajemen Kode Kupon Diskon
          </h1>
          <p className="text-xs text-slate-500">
            Buat voucher promosi khusus untuk memberikan potongan harga otomatis pada halaman checkout DOKU
          </p>
        </div>

        {/* Add Coupon Form Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Tag className="w-4 h-4 text-sky-500" />
            <span>Buat Kode Kupon Baru</span>
          </h3>

          <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-xs">
            <div>
              <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                Kode Kupon *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: PROMO30"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 uppercase font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                Potongan Diskon (%) *
              </label>
              <input
                type="number"
                required
                min="1"
                max="99"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                Batas Penggunaan (Max)
              </label>
              <input
                type="number"
                required
                min="1"
                value={maxUses}
                onChange={(e) => setMaxUses(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 bg-indigo-600 hover:bg-slate-900 text-white font-bold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              + Tambah Kupon
            </button>
          </form>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold">Kode Kupon</th>
                  <th className="p-4 font-bold">Persentase Diskon</th>
                  <th className="p-4 font-bold">Penggunaan</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E3D8] text-slate-900">
                {coupons.length > 0 ? (
                  coupons.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-sm text-indigo-600">{item.code}</td>
                      <td className="p-4 font-heading font-bold text-sm">-{item.discountPercent}%</td>
                      <td className="p-4 text-slate-500">
                        {item.usedCount} / {item.maxUses} kali
                      </td>
                      <td className="p-4">
                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          AKTIF
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteCoupon(item.id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Kupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Belum ada kode kupon diskon.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

    </div>
  );
}
