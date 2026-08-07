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
      images: [product.imageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | ATELIER`,
      description: product.description,
      images: [product.imageUrl],
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
    image: product.imageUrl,
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
    <div className="min-h-screen flex flex-col bg-[#F9F8F3]">
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
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#5C5953] hover:text-[#1C1B18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Katalog</span>
          </Link>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Media Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F3F0E6] border border-[#E6E3D8] shadow-sm">
              <Image
                src={product.previewImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-[#1C1B18] text-[#F9F8F3] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {product.category}
                </span>
                <span className="bg-white/90 backdrop-blur-xs text-[#1C1B18] text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 border border-[#E6E3D8]">
                  <Star className="w-3.5 h-3.5 text-[#A37D4C] fill-[#A37D4C]" />
                  <span>{avgRating} ({totalReviews} ulasan)</span>
                </span>
              </div>
            </div>

            {/* Feature Highlights Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E3D8] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1C1B18] flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#A37D4C]" />
                <span>Spesifikasi &amp; Fitur Produk Digital</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1C1B18]">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-[#F9F8F3] p-3 rounded-lg border border-[#E6E3D8]/60">
                    <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Buying Box */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            <div className="bg-white p-8 rounded-2xl border border-[#E6E3D8] space-y-6 shadow-sm">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#A37D4C] font-semibold">
                    Aset Digital Eksklusif
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-[#A37D4C] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#A37D4C]" />
                    <span>{avgRating} / 5.0</span>
                  </div>
                </div>
                <h1 className="font-serif text-3xl font-bold text-[#1C1B18] mt-1 leading-tight">
                  {product.title}
                </h1>
              </div>

              <div className="py-4 border-y border-[#E6E3D8] flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-[#5C5953]">Harga Lisensi</span>
                <span className="font-serif text-3xl font-bold text-[#1C1B18]">
                  {formatRupiah(product.price)}
                </span>
              </div>

              <p className="text-xs text-[#5C5953] leading-relaxed">
                {product.description}
              </p>

              {/* Action Button */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/checkout/${product.slug}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#0F4C3A] py-4 rounded-xl font-medium text-sm transition-all shadow-md"
                >
                  <span>Beli Sekarang via DOKU</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-[#5C5953]">
                  Akses file instan akan diberikan tepat setelah konfirmasi pembayaran DOKU.
                </p>
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-[#E6E3D8] space-y-3 text-xs text-[#5C5953]">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                  <span>Sistem Pembayaran Resmi DOKU Gateway</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-4 h-4 text-[#A37D4C] shrink-0" />
                  <span>Enkripsi Token Unduhan Aman 24 Jam</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="w-4 h-4 text-[#1C1B18] shrink-0" />
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
          <section className="pt-12 border-t border-[#E6E3D8]">
            <h2 className="font-serif text-2xl font-bold text-[#1C1B18] mb-8">
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
