'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Eye, EyeOff, Package, X, Check, LogOut, ArrowLeft } from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  previewImage: string;
  digitalFile: string;
  features: string;
  isPublished: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(150000);
  const [category, setCategory] = useState('TEMPLATE');
  const [previewImage, setPreviewImage] = useState('/uploads/preview-template-1.svg');
  const [digitalFile, setDigitalFile] = useState('protected-downloads/aesthetic-studio-portfolio-v1.zip');
  const [featuresInput, setFeaturesInput] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setPrice(150000);
    setCategory('TEMPLATE');
    setPreviewImage('/uploads/preview-template-1.svg');
    setDigitalFile('protected-downloads/aesthetic-studio-portfolio-v1.zip');
    setFeaturesInput('Built with Next.js 15, Clean Code, SEO Optimized');
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setTitle(product.title);
    setSlug(product.slug);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setPreviewImage(product.previewImage);
    setDigitalFile(product.digitalFile);
    const parsed: string[] = JSON.parse(product.features || '[]');
    setFeaturesInput(parsed.join(', '));
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProduct) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = featuresInput.split(',').map((f) => f.trim()).filter(Boolean);

    const payload = {
      title,
      slug,
      description,
      price: Number(price),
      category,
      previewImage,
      digitalFile,
      features: featuresArray,
    };

    try {
      let res;
      if (editingProduct) {
        res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert('Gagal menyimpan produk.');
      }
    } catch {
      alert('Terjadi kesalahan jaringan.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Gagal menghapus produk.');
      }
    } catch {
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

  const handleTogglePublish = async (product: ProductItem) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !product.isPublished }),
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch {
      console.error('Failed to toggle publication state');
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-900 flex items-center justify-center font-heading text-base font-bold">
                A
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                ATELIER <span className="text-sky-500">Product CRUD</span>
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-4 text-xs font-semibold">
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors py-2">
                  Dashboard &amp; Transaksi DOKU
                </Link>
                <Link href="/admin/products" className="text-sky-500 border-b-2 border-sky-500 py-2">
                  Kelola Produk (CRUD)
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Manajemen Produk Digital (CRUD)
            </h1>
            <p className="text-xs text-slate-500">
              Tambah, perbarui, dan atur katalog produk Template, Preset, dan E-Book Anda
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </button>
        </div>

        {/* Table of Products */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold">Preview</th>
                  <th className="p-4 font-bold">Judul Produk</th>
                  <th className="p-4 font-bold">Kategori</th>
                  <th className="p-4 font-bold">Harga Lisensi</th>
                  <th className="p-4 font-bold">Status Publikasi</th>
                  <th className="p-4 font-bold text-right">Aksi Manajemen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E3D8] text-slate-900">
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      
                      <td className="p-4">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-white border border-slate-200">
                          <Image src={item.previewImage} alt={item.title} fill className="object-cover" />
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-heading font-bold text-sm text-slate-900 block">{item.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">/{item.slug}</span>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4 font-heading font-bold text-indigo-600 text-sm">
                        {formatRupiah(item.price)}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            item.isPublished
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {item.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{item.isPublished ? 'PUBLISHED' : 'DRAFT'}</span>
                        </button>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Produk"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Belum ada produk digital. Klik "Tambah Produk Baru" di atas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      {/* Modal CRUD Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold">
                {editingProduct ? 'Edit Produk Digital' : 'Tambah Produk Digital Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Judul Produk *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Contoh: Editorial Warm Presets"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="editorial-warm-presets"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Kategori Produk *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white font-semibold"
                  >
                    <option value="TEMPLATE">TEMPLATE WEBSITE</option>
                    <option value="PRESET">LIGHTROOM PRESET</option>
                    <option value="EBOOK">E-BOOK GUIDE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Harga Lisensi (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Deskripsi Lengkap *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan detail mengenai aset digital ini..."
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Path Gambar Preview
                  </label>
                  <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Path File Digital Terproteksi
                  </label>
                  <input
                    type="text"
                    value={digitalFile}
                    onChange={(e) => setDigitalFile(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Daftar Spesifikasi / Fitur (Dipisahkan Koma)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Next.js 15, Tailwind v4, Responsive"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-500 font-semibold hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-slate-900 text-white font-bold transition-all shadow-sm"
                >
                  {editingProduct ? 'Perbarui Produk' : 'Simpan Produk Baru'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
