import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface ProductProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  previewImage: string;
  features: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const parsedFeatures: string[] = JSON.parse(product.features || '[]');

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'TEMPLATE':
        return { label: 'Template Next.js', color: 'bg-slate-900 text-white' };
      case 'PRESET':
        return { label: 'Preset Pack', color: 'bg-sky-500 text-white' };
      case 'EBOOK':
        return { label: 'E-Book PDF', color: 'bg-indigo-600 text-white' };
      default:
        return { label: cat, color: 'bg-slate-500 text-white' };
    }
  };

  const badge = getCategoryBadge(product.category);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="card-modern rounded-xl overflow-hidden flex flex-col justify-between group">
      
      {/* Top Media Area */}
      <div className="relative aspect-[4/3] bg-white overflow-hidden border-b border-slate-200">
        <Image
          src={product.previewImage}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${badge.color}`}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <Link href={`/products/${product.slug}`} className="group-hover:text-indigo-600 transition-colors">
            <h3 className="font-heading text-xl font-bold text-slate-900 leading-tight line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Feature List (2 items max) */}
        {parsedFeatures.length > 0 && (
          <ul className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs text-slate-900">
            {parsedFeatures.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom Price & Action Button */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Harga Lisensi</span>
            <span className="font-heading text-xl font-bold text-slate-900">
              {formatRupiah(product.price)}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-indigo-600 px-4 py-2.5 rounded-lg transition-all"
          >
            <span>Lihat Detail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
