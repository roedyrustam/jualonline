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
        return { label: 'Template Next.js', color: 'bg-[#1C1B18] text-[#F9F8F3]' };
      case 'PRESET':
        return { label: 'Preset Pack', color: 'bg-[#A37D4C] text-[#F9F8F3]' };
      case 'EBOOK':
        return { label: 'E-Book PDF', color: 'bg-[#0F4C3A] text-[#F9F8F3]' };
      default:
        return { label: cat, color: 'bg-[#5C5953] text-[#F9F8F3]' };
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
    <div className="card-editorial rounded-xl overflow-hidden flex flex-col justify-between group">
      
      {/* Top Media Area */}
      <div className="relative aspect-[4/3] bg-[#F3F0E6] overflow-hidden border-b border-[#E6E3D8]">
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
          <Link href={`/products/${product.slug}`} className="group-hover:text-[#0F4C3A] transition-colors">
            <h3 className="font-serif text-xl font-bold text-[#1C1B18] leading-tight line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-[#5C5953] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Feature List (2 items max) */}
        {parsedFeatures.length > 0 && (
          <ul className="space-y-1.5 pt-2 border-t border-[#E6E3D8]/60 text-xs text-[#1C1B18]">
            {parsedFeatures.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#0F4C3A] shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom Price & Action Button */}
        <div className="pt-4 border-t border-[#E6E3D8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#5C5953] block">Harga Lisensi</span>
            <span className="font-serif text-xl font-bold text-[#1C1B18]">
              {formatRupiah(product.price)}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#0F4C3A] px-4 py-2.5 rounded-lg transition-all"
          >
            <span>Lihat Detail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
