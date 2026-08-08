import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { verifyAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DollarSign, ShoppingCart, Package, TrendingUp, ShieldCheck, LogOut, ArrowRight, CheckCircle2, Clock, Tag } from 'lucide-react';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const session = await verifyAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch Metrics
  const paidOrders = await prisma.order.findMany({
    where: { status: 'PAID' },
  });

  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const totalOrdersCount = await prisma.order.count();
  const paidOrdersCount = paidOrders.length;
  const totalProductsCount = await prisma.product.count({
    where: { isPublished: true },
  });
  const totalCouponsCount = await prisma.coupon.count({
    where: { isActive: true },
  });

  // Recent Transactions
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 15,
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Admin Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-900 flex items-center justify-center font-heading text-base font-bold">
                A
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                ATELIER <span className="text-sky-500">Admin Portal</span>
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-4 text-xs font-semibold">
                <Link href="/admin" className="text-sky-500 border-b-2 border-sky-500 py-2">
                  Dashboard &amp; Transaksi DOKU
                </Link>
                <Link href="/admin/products" className="text-slate-400 hover:text-white transition-colors py-2">
                  Kelola Produk (CRUD)
                </Link>
                <Link href="/admin/coupons" className="text-slate-400 hover:text-white transition-colors py-2">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Dashboard Ringkasan &amp; Transaksi DOKU
            </h1>
            <p className="text-xs text-slate-500">
              Pemantauan pendapatan instan, status webhook DOKU, dan log transaksi
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/coupons"
              className="inline-flex items-center space-x-2 bg-white border border-slate-200 hover:border-slate-900 text-slate-900 text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-xs"
            >
              <Tag className="w-4 h-4 text-sky-500" />
              <span>Kupon ({totalCouponsCount})</span>
            </Link>

            <Link
              href="/admin/products"
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm"
            >
              <Package className="w-4 h-4" />
              <span>Kelola Produk (CRUD)</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Metric 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase font-bold tracking-wider">Total Pendapatan Lunas</span>
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="font-heading text-3xl font-bold text-indigo-600">
              {formatRupiah(totalRevenue)}
            </p>
            <p className="text-[11px] text-slate-500">Dari transaksi berstatus PAID</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase font-bold tracking-wider">Transaksi Sukses (PAID)</span>
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="font-heading text-3xl font-bold text-slate-900">
              {paidOrdersCount}
            </p>
            <p className="text-[11px] text-slate-500">Pesanan terverifikasi DOKU</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase font-bold tracking-wider">Total Semua Pesanan</span>
              <ShoppingCart className="w-5 h-5 text-sky-500" />
            </div>
            <p className="font-heading text-3xl font-bold text-slate-900">
              {totalOrdersCount}
            </p>
            <p className="text-[11px] text-slate-500">Termasuk status PENDING &amp; FAILED</p>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase font-bold tracking-wider">Produk Digital Aktif</span>
              <Package className="w-5 h-5 text-slate-900" />
            </div>
            <p className="font-heading text-3xl font-bold text-slate-900">
              {totalProductsCount}
            </p>
            <p className="text-[11px] text-slate-500">Template, Preset &amp; E-Book</p>
          </div>

        </div>

        {/* Transactions Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
          
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Riwayat Transaksi DOKU Payment Gateway
              </h2>
              <p className="text-xs text-slate-500">15 Pesanan terbaru yang masuk ke sistem</p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DOKU Webhook Active</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold">No. Order</th>
                  <th className="p-4 font-bold">Invoice DOKU</th>
                  <th className="p-4 font-bold">Tanggal</th>
                  <th className="p-4 font-bold">Nama Pembeli</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Kupon</th>
                  <th className="p-4 font-bold">Total</th>
                  <th className="p-4 font-bold">Status DOKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E3D8] text-slate-900">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold">{order.orderNumber}</td>
                      <td className="p-4 font-mono text-[11px] text-slate-500">{order.dokuInvoiceNumber || '-'}</td>
                      <td className="p-4 text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-4 font-medium">{order.customerName}</td>
                      <td className="p-4 text-slate-500">{order.customerEmail}</td>
                      <td className="p-4 font-mono text-[11px] text-indigo-600 font-bold">
                        {order.couponCode || '-'}
                      </td>
                      <td className="p-4 font-heading font-bold text-slate-900">
                        {formatRupiah(order.totalAmount)}
                      </td>
                      <td className="p-4">
                        {order.status === 'PAID' ? (
                          <span className="inline-flex items-center space-x-1 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>PAID / LUNAS</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                            <span>PENDING</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      Belum ada transaksi yang tercatat.
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
