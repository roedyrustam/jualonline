import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { ShieldCheck, Download, Sparkles, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.category;

  const whereClause = categoryFilter && categoryFilter !== 'ALL'
    ? { category: categoryFilter, isPublished: true }
    : { isPublished: true };

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ATELIER Digital Store',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ATELIER Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005'}/favicon.ico`
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        
        {/* Editorial Hero Section */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F3F0E6] to-[#F9F8F3] border-b border-[#E6E3D8]">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-white border border-[#E6E3D8] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#1C1B18] uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A37D4C]" />
              <span>Atelier Digital Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1C1B18] tracking-tight leading-[1.1]">
              Aset Digital Modern untuk Kreator, Desainer &amp; Studio
            </h1>

            <p className="text-base sm:text-lg text-[#5C5953] max-w-2xl mx-auto leading-relaxed font-sans">
              Koleksi kurasi template website Next.js, preset tone Lightroom sinematik, dan e-book strategi bisnis digital. Pembayaran instan &amp; aman via Payment Gateway DOKU.
            </p>

            {/* Feature Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#1C1B18] font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                <span>Terintegrasi DOKU Payment Gateway</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-[#A37D4C]" />
                <span>Instan Secure Token Download Link</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#1C1B18]" />
                <span>Lisensi Komersial Lengkap</span>
              </div>
            </div>

          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B18]">
              Jelajahi Katalog Produk
            </h2>
            <p className="text-sm text-[#5C5953]">
              Pilih produk digital sesuai kebutuhan proyek Anda dan nikmati akses langsung setelah pembayaran.
            </p>
          </div>

          {/* Category Filter Component */}
          <CategoryFilter />

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E6E3D8] my-8">
              <p className="text-base text-[#5C5953]">Belum ada produk dalam kategori ini.</p>
              <Link href="/" className="inline-block mt-4 text-xs font-semibold text-[#0F4C3A] underline">
                Lihat Semua Produk
              </Link>
            </div>
          )}

        </section>

        {/* Editorial Feature Highlight Banner */}
        <section className="bg-[#1C1B18] text-[#F9F8F3] py-20 px-4 sm:px-6 lg:px-8 my-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A37D4C]">
                Sistem Pembayaran Terpercaya
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
                Transaksi Instan via DOKU Payment Gateway
              </h2>
              <p className="text-sm text-[#A39E93] leading-relaxed">
                Platform kami menggunakan integrasi otomatis DOKU Payment Gateway. Anda dapat melakukan pembayaran via QRIS, Bank Virtual Account (BCA, Mandiri, BRI, BNI), Credit Card, maupun E-Wallet favorit Anda secara real-time.
              </p>
              <div className="pt-2">
                <Link
                  href="/?category=TEMPLATE"
                  className="inline-flex items-center space-x-2 bg-[#A37D4C] text-[#1C1B18] hover:bg-[#F9F8F3] px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Mulai Belanja Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-[#2C2A26] p-8 rounded-2xl border border-[#A37D4C]/30 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#F9F8F3]">
                Alur Pembelian 3 Langkah
              </h3>
              <div className="space-y-4 text-sm text-[#E6E3D8]">
                <div className="flex items-start space-x-4">
                  <div className="w-7 h-7 rounded-full bg-[#A37D4C] text-[#1C1B18] flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-white">Pilih Produk Digital</h4>
                    <p className="text-xs text-[#A39E93]">Pilih template, preset, atau e-book yang Anda inginkan.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-7 h-7 rounded-full bg-[#A37D4C] text-[#1C1B18] flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-white">Bayar via DOKU Gateway</h4>
                    <p className="text-xs text-[#A39E93]">Selesaikan pembayaran via QRIS, Bank Transfer, atau E-Wallet.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-7 h-7 rounded-full bg-[#A37D4C] text-[#1C1B18] flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-white">Unduh Langsung File Digital</h4>
                    <p className="text-xs text-[#A39E93]">Dapatkan link unduhan terproteksi instan di halaman sukses.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
