export const metadata = {
  title: 'Kebijakan Privasi | ATELIER',
  description: 'Kebijakan Privasi dan pengumpulan data ATELIER Digital Store',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 text-slate-600 leading-relaxed">
      <div className="space-y-2 border-b border-slate-200 pb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Kebijakan Privasi (Privacy Policy)</h1>
        <p className="text-sm font-medium text-slate-400">Terakhir Diperbarui: 8 Agustus 2026</p>
      </div>

      <p>
        Selamat datang di ATELIER Digital Store. Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat Anda menggunakan situs web dan layanan kami.
      </p>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">1. Informasi yang Kami Kumpulkan</h2>
        <p>Saat Anda melakukan pembelian atau berinteraksi dengan situs kami, kami dapat mengumpulkan informasi berikut:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Informasi Identitas:</strong> Nama lengkap, alamat email.</li>
          <li><strong>Informasi Transaksi:</strong> Rincian pesanan produk digital Anda.</li>
          <li><strong>Informasi Teknis:</strong> Alamat IP, jenis browser, waktu akses, dan aktivitas di situs.</li>
        </ul>
        <p className="text-sm italic text-slate-500 bg-slate-50 p-4 rounded-xl">
          Catatan: Kami tidak pernah menyimpan informasi sensitif kartu kredit atau kredensial perbankan Anda di server kami. Semua pemrosesan pembayaran ditangani secara aman oleh mitra gateway pembayaran resmi kami (DOKU).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">2. Penggunaan Informasi</h2>
        <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Memproses pesanan dan mengirimkan tautan unduhan (Secure Token Download Link).</li>
          <li>Mengirimkan tanda terima transaksi dan konfirmasi pesanan.</li>
          <li>Memberikan dukungan pelanggan dan bantuan teknis.</li>
          <li>Mengirimkan pembaruan produk jika ada perbaikan atau versi terbaru dari aset digital yang Anda beli.</li>
          <li>Mencegah aktivitas penipuan dan menjaga keamanan platform.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">3. Pembagian Informasi</h2>
        <p>Kami tidak menjual, menyewakan, atau menukar data pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dengan:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Penyedia Layanan Pembayaran (DOKU):</strong> Untuk tujuan otentikasi dan pemrosesan transaksi yang aman.</li>
          <li><strong>Pihak Berwenang:</strong> Jika diwajibkan oleh hukum yang berlaku di Republik Indonesia.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">4. Keamanan Data</h2>
        <p>Kami menerapkan standar keamanan teknis yang ketat (termasuk enkripsi HTTPS/TLS) untuk melindungi data Anda dari akses, modifikasi, atau penghancuran yang tidak sah. Tautan unduhan produk juga diproteksi dengan sistem token berbatas waktu untuk menghindari penyalahgunaan.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">5. Hubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi tim dukungan kami di:</p>
        <p className="font-medium text-slate-900">Email: privacy@atelier-studio.example.com</p>
      </div>
    </div>
  );
}
