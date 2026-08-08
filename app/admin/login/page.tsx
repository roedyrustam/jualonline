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
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4">
      
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Storefront Utama</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-heading text-xl font-bold mx-auto">
            A
          </div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Atelier Admin Portal
          </h1>
          <p className="text-xs text-slate-500">
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
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 space-y-0.5">
            <span className="font-bold text-slate-900 block">Kredensial Default Demo:</span>
            <p>Email: <code className="text-indigo-600 font-bold">admin@toko.com</code></p>
            <p>Password: <code className="text-indigo-600 font-bold">admin123</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? 'Memverifikasi Kredensial...' : 'Masuk Ke Dashboard Admin'}
          </button>

        </form>

        <div className="pt-4 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Sistem Proteksi Session Cookie Terenkripsi</span>
        </div>

      </div>

    </div>
  );
}
