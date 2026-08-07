'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'ALL';

  const categories = [
    { key: 'ALL', label: 'Semua Produk' },
    { key: 'TEMPLATE', label: 'Template Website' },
    { key: 'PRESET', label: 'Lightroom Presets' },
    { key: 'EBOOK', label: 'E-Book Guide' },
  ];

  const handleSelect = (key: string) => {
    if (key === 'ALL') {
      router.push('/');
    } else {
      router.push(`/?category=${key}`);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-8">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => handleSelect(cat.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#1C1B18] text-[#F9F8F3] shadow-md border border-[#1C1B18]'
                : 'bg-white text-[#5C5953] border border-[#E6E3D8] hover:border-[#1C1B18] hover:text-[#1C1B18]'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
