'use client';

import { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';

interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
  orderId?: string; // Optional orderId if user is coming from order success page
}

export default function ReviewSection({ productId, orderId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [averageRating, setAverageRating] = useState(5.0);
  const [totalCount, setTotalCount] = useState(0);
  const [breakdown, setBreakdown] = useState<Record<number, number>>({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [loading, setLoading] = useState(true);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [formOrderId, setFormOrderId] = useState(orderId || '');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(!!orderId);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 5.0);
        setTotalCount(data.totalCount || 0);
        setBreakdown(data.breakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
      }
    } catch {
      console.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formOrderId || !comment.trim()) {
      setMsg('Mohon isi Nomor Order dan ulasan Anda.');
      return;
    }

    setSubmitting(true);
    setMsg('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          orderId: formOrderId,
          customerName: customerName || 'Pembeli Terverifikasi',
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMsg(data.message);
        setComment('');
        fetchReviews();
      } else {
        setMsg(data.error || 'Gagal menyimpan ulasan.');
      }
    } catch {
      setMsg('Terjadi kesalahan jaringan.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-4 h-4 ${
          idx < count ? 'text-[#A37D4C] fill-[#A37D4C]' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-[#E6E3D8] shadow-xs space-y-8">
      
      {/* Header Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E6E3D8]">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1C1B18] flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-[#A37D4C]" />
            <span>Ulasan Pembeli Terverifikasi</span>
          </h3>
          <p className="text-xs text-[#5C5953]">
            Ulasan jujur dari pengguna yang telah menyelesaikan pembayaran via DOKU
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-[#F9F8F3] p-4 rounded-xl border border-[#E6E3D8]">
          <div className="text-center">
            <span className="font-serif text-3xl font-bold text-[#1C1B18] block leading-none">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex items-center justify-center mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-[10px] text-[#5C5953] block mt-1">
              Berdasarkan {totalCount} Ulasan
            </span>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#1C1B18] hover:bg-[#0F4C3A] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            {showForm ? 'Tutup Form' : 'Tulis Ulasan'}
          </button>
        </div>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="bg-[#F9F8F3] p-6 rounded-xl border border-[#E6E3D8] space-y-4 text-xs">
          <h4 className="font-bold text-[#1C1B18] uppercase tracking-wider text-xs">
            Formulir Ulasan Produk Digital
          </h4>

          {msg && (
            <div className={`p-3 rounded-lg border text-xs ${msg.includes('berhasil') ? 'bg-[#E6F0EC] text-[#0F4C3A] border-[#0F4C3A]/30' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {msg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1C1B18] mb-1">ID Pesanan DOKU / Order ID *</label>
              <input
                type="text"
                required
                placeholder="Masukkan ID Pesanan dari kuitansi..."
                value={formOrderId}
                onChange={(e) => setFormOrderId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E6E3D8] bg-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1C1B18] mb-1">Nama Pembeli (Opsional)</label>
              <input
                type="text"
                placeholder="Nama Anda..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E6E3D8] bg-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1C1B18] mb-1">Bintang Rating (1-5)</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((starVal) => (
                <button
                  type="button"
                  key={starVal}
                  onClick={() => setRating(starVal)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      starVal <= rating ? 'text-[#A37D4C] fill-[#A37D4C]' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="font-bold text-[#1C1B18] ml-2">{rating} dari 5 Bintang</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1C1B18] mb-1">Komentar / Pengalaman Penggunaan *</label>
            <textarea
              rows={3}
              required
              placeholder="Bagikan ulasan Anda mengenai kualitas template/preset/ebook ini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E6E3D8] bg-white text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#0F4C3A] hover:bg-[#1C1B18] text-white font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Mengirim Ulasan...' : 'Kirim Ulasan Terverifikasi'}
          </button>
        </form>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-xl bg-[#F9F8F3] border border-[#E6E3D8]/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#1C1B18] font-serif text-sm">{rev.customerName}</span>
                  {rev.isVerified && (
                    <span className="inline-flex items-center space-x-1 bg-[#E6F0EC] text-[#0F4C3A] px-2 py-0.5 rounded-full text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-[#5C5953]">
                  {new Date(rev.createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                {renderStars(rev.rating)}
              </div>

              <p className="text-[#1C1B18] leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[#5C5953] text-xs">
            Belum ada ulasan untuk produk ini. Jadilah pembeli pertama yang memberikan ulasan!
          </div>
        )}
      </div>

    </div>
  );
}
