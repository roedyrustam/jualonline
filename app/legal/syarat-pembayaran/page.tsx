export const metadata = {
  title: 'Syarat Pembayaran | ATELIER',
  description: 'Metode dan syarat pembayaran menggunakan DOKU Gateway di ATELIER',
};

export default function PaymentTermsPage() {
  return (
    <div className="space-y-8 text-slate-600 leading-relaxed">
      <div className="space-y-2 border-b border-slate-200 pb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Syarat Pembayaran (Terms of Payment)</h1>
        <p className="text-sm font-medium text-slate-400">Terakhir Diperbarui: 8 Agustus 2026</p>
      </div>

      <p>
        Di ATELIER Digital Store, kami menggunakan DOKU Payment Gateway sebagai mitra resmi untuk memastikan seluruh transaksi berjalan secara instan, aman, dan lancar. Berikut adalah Syarat Pembayaran yang berlaku:
      </p>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">1. Metode Pembayaran yang Diterima</h2>
        <p>Kami menerima berbagai metode pembayaran melalui infrastruktur DOKU:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>QRIS:</strong> Membayar seketika menggunakan aplikasi perbankan atau e-wallet (Gopay, OVO, Dana, ShopeePay, dll).</li>
          <li><strong>Virtual Account (VA):</strong> Tersedia untuk Bank Mandiri, BCA, BRI, BNI, dan bank mitra lainnya.</li>
          <li><strong>Credit Card (Kartu Kredit):</strong> Visa, Mastercard, dan JCB (dilengkapi otentikasi 3D Secure).</li>
          <li><strong>E-Wallet Direct:</strong> Pembayaran langsung via aplikasi e-wallet tertentu yang didukung oleh DOKU.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">2. Proses Konfirmasi Instan</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Setelah pembayaran berhasil dilakukan melalui salah satu metode di atas, sistem DOKU akan mengirimkan notifikasi (webhook) otomatis ke server kami.</li>
          <li>Pesanan Anda akan berstatus <strong>Berhasil (Success)</strong> secara instan.</li>
          <li>Halaman akan otomatis mengarahkan Anda ke Halaman Sukses yang berisi Secure Download Link.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">3. Batas Waktu Pembayaran (Expiry Time)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Setiap kode pembayaran (seperti Virtual Account atau QRIS) memiliki batas waktu yang telah ditentukan (umumnya 30-60 menit tergantung metode).</li>
          <li>Jika Anda gagal melakukan pembayaran sebelum batas waktu berakhir, pesanan akan dibatalkan secara otomatis oleh sistem (Expired). Anda harus membuat pesanan baru untuk melanjutkan pembelian.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">4. Kegagalan Pembayaran & Penanganan Kendala</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Jika saldo terpotong namun status pesanan di situs kami tidak berubah menjadi "Berhasil" dalam waktu 15 menit, harap jangan melakukan pemesanan ulang.</li>
          <li>Segera hubungi kami dengan melampirkan <strong>Bukti Potong Saldo / Resi Pembayaran</strong> dan <strong>Order ID</strong> Anda.</li>
          <li>Tim kami akan melakukan pengecekan manual (cross-check) dengan dashboard DOKU dan mengubah status pesanan Anda.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">5. Pajak dan Biaya Layanan</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Harga yang tertera pada produk sudah bersifat <strong>Final</strong> (Termasuk pajak jika ada).</li>
          <li>Tidak ada biaya layanan tambahan (convenience fee) yang dibebankan kepada pembeli. Seluruh biaya MDR (Merchant Discount Rate) DOKU ditanggung sepenuhnya oleh ATELIER.</li>
        </ul>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <p className="text-sm italic">Untuk kendala pembayaran, silakan hubungi tim finansial kami di: billing@atelier-studio.example.com</p>
      </div>
    </div>
  );
}
