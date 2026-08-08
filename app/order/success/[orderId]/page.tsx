import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewSection from '@/components/ReviewSection';
import { CheckCircle2, Download, ShieldCheck, Lock, FileText, ArrowRight, Printer } from 'lucide-react';

export const revalidate = 0;

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: order.productId },
  });

  // Fetch or Generate Download Token
  let downloadTokenRecord = await prisma.downloadToken.findFirst({
    where: { orderId: order.id },
  });

  // Fallback token creation if missing
  if (!downloadTokenRecord && order.status === 'PAID' && product) {
    const crypto = await import('crypto');
    const tokenString = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    downloadTokenRecord = await prisma.downloadToken.create({
      data: {
        token: tokenString,
        orderId: order.id,
        productId: product.id,
        expiresAt,
        downloadCount: 0,
        maxDownloads: 10,
      },
    });
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        
        {/* Top Success Badge */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            DOKU Payment Confirmed
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900">
            Pembayaran Berhasil!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Terima kasih, <strong>{order.customerName}</strong>. Transaksi DOKU Anda telah diverifikasi secara instan. File produk digital Anda siap untuk diunduh.
          </p>
        </div>

        {/* Download Asset Box */}
        {downloadTokenRecord && (
          <div className="bg-white p-8 rounded-2xl border-2 border-indigo-600 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    {product?.title}
                  </h3>
                  <span className="text-xs text-slate-500">Format File: Digital Zip / PDF</span>
                </div>
              </div>

              <a
                href={`/api/download/${downloadTokenRecord.token}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Produk Digital</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <Lock className="w-4 h-4 text-sky-500" />
                <span>Link Berlaku 24 Jam</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Lisensi Komersial Aktif</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <FileText className="w-4 h-4 text-slate-900" />
                <span>Batas Unduhan: 10x Max</span>
              </div>
            </div>
          </div>
        )}

        {/* Digital Receipt / Invoice Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-heading text-2xl font-bold text-slate-900">
                Kuitansi Transaksi DOKU
              </span>
              <p className="text-xs text-slate-500">Status: PAID / LUNAS</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-slate-900 block">{order.orderNumber}</span>
              <span className="text-[11px] text-slate-500">{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
          </div>

          {/* Customer & Product Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block uppercase text-[10px] tracking-wider text-sky-500">Data Pembeli:</span>
              <p className="text-slate-900 font-medium">{order.customerName}</p>
              <p className="text-slate-500">{order.customerEmail}</p>
              <p className="text-slate-500">{order.customerPhone}</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="font-bold text-slate-900 block uppercase text-[10px] tracking-wider text-sky-500">Metode Pembayaran:</span>
              <p className="text-slate-900 font-medium">DOKU Payment Gateway</p>
              <p className="text-indigo-600 font-semibold">QRIS / Virtual Account</p>
              <p className="text-slate-500">Invoice: {order.dokuInvoiceNumber}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-2">
            <span>Total Yang Dibayarkan</span>
            <span className="font-heading text-2xl text-indigo-600">{formatRupiah(order.totalAmount)}</span>
          </div>

        </div>

        {/* Verified Review Section Component for Instant Review Submission */}
        {product && (
          <ReviewSection productId={product.id} orderId={order.id} />
        )}

        {/* Action Link back to store */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-900 hover:text-indigo-600 underline"
          >
            <span>Kembali ke Halaman Utama Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
