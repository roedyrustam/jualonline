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
    <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        
        {/* Top Success Badge */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C3A]">
            DOKU Payment Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1B18]">
            Pembayaran Berhasil!
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5953] max-w-lg mx-auto leading-relaxed">
            Terima kasih, <strong>{order.customerName}</strong>. Transaksi DOKU Anda telah diverifikasi secara instan. File produk digital Anda siap untuk diunduh.
          </p>
        </div>

        {/* Download Asset Box */}
        {downloadTokenRecord && (
          <div className="bg-white p-8 rounded-2xl border-2 border-[#0F4C3A] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E6E3D8]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#E6F0EC] text-[#0F4C3A] flex items-center justify-center font-bold shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1B18]">
                    {product?.title}
                  </h3>
                  <span className="text-xs text-[#5C5953]">Format File: Digital Zip / PDF</span>
                </div>
              </div>

              <a
                href={`/api/download/${downloadTokenRecord.token}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0F4C3A] hover:bg-[#1C1B18] text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Produk Digital</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C5953] pt-2">
              <div className="flex items-center space-x-2 bg-[#F9F8F3] p-3 rounded-lg border border-[#E6E3D8]">
                <Lock className="w-4 h-4 text-[#A37D4C]" />
                <span>Link Berlaku 24 Jam</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#F9F8F3] p-3 rounded-lg border border-[#E6E3D8]">
                <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                <span>Lisensi Komersial Aktif</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#F9F8F3] p-3 rounded-lg border border-[#E6E3D8]">
                <FileText className="w-4 h-4 text-[#1C1B18]" />
                <span>Batas Unduhan: 10x Max</span>
              </div>
            </div>
          </div>
        )}

        {/* Digital Receipt / Invoice Card */}
        <div className="bg-white p-8 rounded-2xl border border-[#E6E3D8] space-y-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-[#E6E3D8] pb-6">
            <div>
              <span className="text-xs font-serif text-2xl font-bold text-[#1C1B18]">
                Kuitansi Transaksi DOKU
              </span>
              <p className="text-xs text-[#5C5953]">Status: PAID / LUNAS</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-[#1C1B18] block">{order.orderNumber}</span>
              <span className="text-[11px] text-[#5C5953]">{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
          </div>

          {/* Customer & Product Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-[#E6E3D8] pb-6">
            <div className="space-y-1">
              <span className="font-bold text-[#1C1B18] block uppercase text-[10px] tracking-wider text-[#A37D4C]">Data Pembeli:</span>
              <p className="text-[#1C1B18] font-medium">{order.customerName}</p>
              <p className="text-[#5C5953]">{order.customerEmail}</p>
              <p className="text-[#5C5953]">{order.customerPhone}</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="font-bold text-[#1C1B18] block uppercase text-[10px] tracking-wider text-[#A37D4C]">Metode Pembayaran:</span>
              <p className="text-[#1C1B18] font-medium">DOKU Payment Gateway</p>
              <p className="text-[#0F4C3A] font-semibold">QRIS / Virtual Account</p>
              <p className="text-[#5C5953]">Invoice: {order.dokuInvoiceNumber}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-[#1C1B18] pt-2">
            <span>Total Yang Dibayarkan</span>
            <span className="font-serif text-2xl text-[#0F4C3A]">{formatRupiah(order.totalAmount)}</span>
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
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#1C1B18] hover:text-[#0F4C3A] underline"
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
