import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ReviewSection from '@/components/ReviewSection';
import { ShieldCheck, Download, CheckCircle2, ArrowRight, ArrowLeft, Lock, FileText, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan | ATELIER',
    };
  }

  return {
    title: `${product.title} | ATELIER`,
    description: product.description,
    openGraph: {
      title: `${product.title} | ATELIER`,
      description: product.description,
      images: [product.previewImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | ATELIER`,
      description: product.description,
      images: [product.previewImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { reviews: true },
  });

  if (!product) {
    notFound();
  }

  const features: string[] = JSON.parse(product.features || '[]');

  // Calculate rating stats
  const totalReviews = product.reviews.length;
  const avgRating =
    totalReviews > 0
      ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  // Related Products
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    take: 3,
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.previewImage,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005'}/products/${product.slug}`,
      priceCurrency: 'IDR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: totalReviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: totalReviews,
    } : undefined,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Katalog</span>
          </Link>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Media Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <Image
                src={product.previewImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {product.category}
                </span>
                <span className="bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 border border-slate-200">
                  <Star className="w-3.5 h-3.5 text-sky-500 fill-[#A37D4C]" />
                  <span>{avgRating} ({totalReviews} ulasan)</span>
                </span>
              </div>
            </div>

            {/* Feature Highlights Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-heading text-xl font-bold text-slate-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-sky-500" />
                <span>Spesifikasi &amp; Fitur Produk Digital</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-900">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Buying Box */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-sky-500 font-semibold">
                    Aset Digital Eksklusif
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-sky-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#A37D4C]" />
                    <span>{avgRating} / 5.0</span>
                  </div>
                </div>
                <h1 className="font-heading text-3xl font-bold text-slate-900 mt-1 leading-tight">
                  {product.title}
                </h1>
              </div>

              <div className="py-4 border-y border-slate-200 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500">Harga Lisensi</span>
                <span className="font-heading text-3xl font-bold text-slate-900">
                  {formatRupiah(product.price)}
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {product.description}
              </p>

              {/* Action Button */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/checkout/${product.slug}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 text-white hover:bg-indigo-600 py-4 rounded-xl font-medium text-sm transition-all shadow-md"
                >
                  <span>Beli Sekarang via DOKU</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-slate-500">
                  Akses file instan akan diberikan tepat setelah konfirmasi pembayaran DOKU.
                </p>
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-slate-200 space-y-3 text-xs text-slate-500">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Sistem Pembayaran Resmi DOKU Gateway</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Enkripsi Token Unduhan Aman 24 Jam</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>Siap Diunduh Dalam Format ZIP / PDF</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Review Section */}
        <ReviewSection productId={product.id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-12 border-t border-slate-200">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">
              Produk Terkait Dalam Kategori Ini
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
