'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldCheck, Key, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@toko.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setErrorMsg(data.error || 'Email atau password admin salah.');
      }
    } catch {
      setErrorMsg('Gagal terhubung ke server autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F9F8F3] px-4">
      
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-[#5C5953] hover:text-[#1C1B18]">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Storefront Utama</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-[#E6E3D8] shadow-md space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1C1B18] text-[#F9F8F3] flex items-center justify-center font-serif text-xl font-bold mx-auto">
            A
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1B18]">
            Atelier Admin Portal
          </h1>
          <p className="text-xs text-[#5C5953]">
            Masuk untuk mengelola produk digital &amp; pemantauan transaksi DOKU
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-[#1C1B18] uppercase tracking-wider mb-1">
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#E6E3D8] text-xs text-[#1C1B18] focus:outline-none focus:border-[#1C1B18]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1B18] uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#E6E3D8] text-xs text-[#1C1B18] focus:outline-none focus:border-[#1C1B18]"
            />
          </div>

          <div className="p-3 bg-[#F3F0E6] rounded-lg border border-[#E6E3D8] text-[11px] text-[#5C5953] space-y-0.5">
            <span className="font-bold text-[#1C1B18] block">Kredensial Default Demo:</span>
            <p>Email: <code className="text-[#0F4C3A] font-bold">admin@toko.com</code></p>
            <p>Password: <code className="text-[#0F4C3A] font-bold">admin123</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1C1B18] hover:bg-[#0F4C3A] text-[#F9F8F3] rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? 'Memverifikasi Kredensial...' : 'Masuk Ke Dashboard Admin'}
          </button>

        </form>

        <div className="pt-4 border-t border-[#E6E3D8] text-center text-[11px] text-[#5C5953] flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F4C3A]" />
          <span>Sistem Proteksi Session Cookie Terenkripsi</span>
        </div>

      </div>

    </div>
  );
}
