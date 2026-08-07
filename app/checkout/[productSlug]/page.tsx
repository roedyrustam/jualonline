'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Lock, CreditCard, CheckCircle2, Tag, Percent } from 'lucide-react';

interface ProductData {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  previewImage: string;
}

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Coupon State
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
    finalPrice: number;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState('');

  // Active Order tracking for Polling after DOKU popup opens
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // Poll for payment success when popup is active
  useEffect(() => {
    if (!activeOrderId) return;

    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/status/${activeOrderId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'PAID') {
            clearInterval(intervalId);
            router.push(`/order/success/${activeOrderId}`);
          }
        }
      } catch (err) {
        console.error('Error polling order status:', err);
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId);
  }, [activeOrderId, router]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productSlug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setErrorMsg('Produk tidak ditemukan');
        }
      } catch {
        setErrorMsg('Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productSlug]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim() || !product) return;

    setCouponLoading(true);
    setCouponMsg('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCodeInput,
          originalPrice: product.price,
        }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setAppliedCoupon({
          code: data.code,
          discountPercent: data.discountPercent,
          discountAmount: data.discountAmount,
          finalPrice: data.finalPrice,
        });
        setCouponMsg(`Kupon ${data.code} berhasil dipasang (-${data.discountPercent}%)!`);
      } else {
        setAppliedCoupon(null);
        setCouponMsg(data.error || 'Kode kupon tidak valid.');
      }
    } catch {
      setCouponMsg('Gagal memproses kupon.');
    } finally {
      setCouponLoading(false);
    }
  };

  const finalAmount = appliedCoupon ? appliedCoupon.finalPrice : (product?.price || 0);

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMsg('Mohon lengkapi semua kolom data pembeli.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/checkout/doku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product?.id,
          customerName,
          customerEmail,
          customerPhone,
          couponCode: appliedCoupon?.code || null,
          discountAmount: appliedCoupon?.discountAmount || 0,
        }),
      });

      const data = await res.json();

      if (res.ok && data.orderId) {
        // Track order so we can poll its status in the background
        setActiveOrderId(data.orderId);

        // Trigger DOKU Official Popup Modal
        if (typeof window !== 'undefined' && (window as any).loadJokulCheckout) {
          (window as any).loadJokulCheckout(data.dokuPaymentUrl);
        } else {
          // Fallback if script fails to load
          window.location.href = data.dokuPaymentUrl;
        }
      } else {
        setErrorMsg(data.error || 'Terjadi kesalahan saat memproses pesanan DOKU.');
      }
    } catch {
      setErrorMsg('Gagal terhubung ke server pembayaran DOKU.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-[#5C5953] text-sm">
          Memuat informasi checkout...
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-4">
          <p className="text-base text-[#1C1B18] font-bold">Produk tidak ditemukan</p>
          <Link href="/" className="text-xs text-[#0F4C3A] underline font-semibold">
            Kembali ke Katalog Produk
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const dokuScriptUrl = process.env.NEXT_PUBLIC_DOKU_ENVIRONMENT === 'production'
    ? 'https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js'
    : 'https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js';

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
      <Script src={dokuScriptUrl} strategy="lazyOnload" />
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        <div className="mb-6">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#5C5953] hover:text-[#1C1B18]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Detail Produk</span>
          </Link>
        </div>

        <div className="text-center space-y-2 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B18]">
            Formulir Pembelian Produk Digital
          </h1>
          <p className="text-xs text-[#5C5953]">
            Lengkapi data diri Anda untuk pemrosesan lisensi &amp; pengiriman file via DOKU Payment Gateway
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Area */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E6E3D8] shadow-sm space-y-6">
            
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1C1B18] uppercase tracking-wider pb-4 border-b border-[#E6E3D8]">
              <Lock className="w-4 h-4 text-[#A37D4C]" />
              <span>1. Data Informasi Pembeli</span>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitCheckout} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-[#1C1B18] uppercase tracking-wider mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Roedy Rustam"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6E3D8] text-xs text-[#1C1B18] focus:outline-none focus:border-[#1C1B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1B18] uppercase tracking-wider mb-1">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6E3D8] text-xs text-[#1C1B18] focus:outline-none focus:border-[#1C1B18]"
                />
                <p className="text-[11px] text-[#5C5953] mt-1">
                  Kuitansi pembayaran dan informasi lisensi akan dikirimkan ke email ini.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1B18] uppercase tracking-wider mb-1">
                  Nomor WhatsApp / HP *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6E3D8] text-xs text-[#1C1B18] focus:outline-none focus:border-[#1C1B18]"
                />
              </div>

              {/* Coupon Code Input Box */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#1C1B18] uppercase tracking-wider mb-1">
                  Kode Kupon Diskon (Opsional)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#A37D4C] absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coba: ATELIER20 atau WELCOME10"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E6E3D8] text-xs text-[#1C1B18] uppercase font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="px-4 py-2.5 bg-[#1C1B18] hover:bg-[#0F4C3A] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {couponLoading ? 'Cek...' : 'Pasang'}
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[11px] mt-1.5 font-medium ${appliedCoupon ? 'text-[#0F4C3A]' : 'text-red-600'}`}>
                    {couponMsg}
                  </p>
                )}
              </div>

              {/* Payment Gateway Box */}
              <div className="pt-4 border-t border-[#E6E3D8]">
                <div className="p-4 bg-[#F9F8F3] rounded-xl border border-[#E6E3D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#1C1B18]">
                      <CreditCard className="w-4 h-4 text-[#0F4C3A]" />
                      <span>DOKU Payment Gateway</span>
                    </div>
                    <span className="text-[10px] bg-[#0F4C3A] text-white px-2 py-0.5 rounded-full font-bold">
                      Secured 256-bit
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5C5953]">
                    Mendukung QRIS (GoPay, OVO, ShopeePay, Dana), Virtual Account (BCA, Mandiri, BRI, BNI), dan Kartu Kredit.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#0F4C3A] rounded-xl font-semibold text-sm transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Memproses Transaksi DOKU...' : `Lanjut Pembayaran DOKU (${formatRupiah(finalAmount)})`}
              </button>

            </form>

          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-5 bg-[#1C1B18] text-[#F9F8F3] p-8 rounded-2xl border border-[#2C2A26] space-y-6">
            
            <h3 className="font-serif text-xl font-bold border-b border-[#2C2A26] pb-4">
              Ringkasan Pesanan
            </h3>

            <div className="flex items-start space-x-4 pb-4 border-b border-[#2C2A26]">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-[#2C2A26] shrink-0 border border-[#A37D4C]/30">
                <Image
                  src={product.previewImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A37D4C]">
                  {product.category}
                </span>
                <h4 className="font-serif text-base font-bold text-white leading-tight">
                  {product.title}
                </h4>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#A39E93]">
              <div className="flex justify-between">
                <span>Harga Produk Awal</span>
                <span className="text-white font-medium">{formatRupiah(product.price)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-[#0F4C3A] bg-[#E6F0EC]/10 p-2 rounded-lg border border-[#0F4C3A]/30 font-bold">
                  <span>Diskon Kupon ({appliedCoupon.code})</span>
                  <span>-{formatRupiah(appliedCoupon.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Biaya Layanan DOKU</span>
                <span className="text-[#0F4C3A] font-semibold">GRATIS</span>
              </div>

              <div className="pt-3 border-t border-[#2C2A26] flex justify-between text-sm font-bold text-white">
                <span>Total Pembayaran</span>
                <span className="text-[#A37D4C] font-serif text-lg">{formatRupiah(finalAmount)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2C2A26] space-y-2 text-[11px] text-[#A39E93]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span>Link unduhan otomatis dibuat setelah konfirmasi DOKU</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A37D4C]" />
                <span>Lisensi komersial seumur hidup tanpa biaya tambahan</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
