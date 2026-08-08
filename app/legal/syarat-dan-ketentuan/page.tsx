export const metadata = {
  title: 'Syarat dan Ketentuan | ATELIER',
  description: 'Syarat dan Ketentuan penggunaan produk digital ATELIER Store',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="space-y-8 text-slate-600 leading-relaxed">
      <div className="space-y-2 border-b border-slate-200 pb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Syarat dan Ketentuan (Terms of Conditions)</h1>
        <p className="text-sm font-medium text-slate-400">Terakhir Diperbarui: 8 Agustus 2026</p>
      </div>

      <p>
        Dengan mengakses dan melakukan pembelian di ATELIER Digital Store, Anda menyetujui Syarat dan Ketentuan berikut. Harap baca dengan saksama sebelum menyelesaikan transaksi.
      </p>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">1. Layanan dan Produk Digital</h2>
        <p>ATELIER menyediakan produk digital premium berupa Template Website (Next.js), Lightroom Presets, dan E-Book ("Produk Digital"). Semua produk disediakan secara instan melalui tautan unduhan setelah pembayaran berhasil dikonfirmasi.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">2. Lisensi Penggunaan</h2>
        <p>Setiap pembelian Produk Digital dilengkapi dengan <strong>Lisensi Standar (Personal & Komersial Terbatas)</strong>, yang berarti:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Diizinkan:</strong> Menggunakan aset untuk proyek pribadi, proyek klien (1 lisensi per proyek utama), dan konten media sosial.</li>
          <li><strong>Dilarang:</strong> Mendistribusikan ulang, menjual kembali, membagikan tautan unduhan kepada pihak ketiga, atau mengklaim Produk Digital sebagai karya Anda sendiri.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">3. Kebijakan Pengembalian Dana (No Refund Policy)</h2>
        <p>Dikarenakan sifat Produk Digital yang dapat diunduh secara instan dan tidak dapat dikembalikan, <strong>semua penjualan adalah final</strong>. Kami tidak melayani pengembalian dana (refund) untuk alasan apa pun setelah tautan unduhan dibuat, kecuali terbukti ada cacat teknis fatal pada file yang tidak dapat kami perbaiki.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">4. Ketersediaan Unduhan</h2>
        <p>Tautan unduhan (Download Link) akan aktif selama <strong>30 hari</strong> sejak tanggal pembelian dan dibatasi hingga <strong>5 kali unduhan</strong> demi alasan keamanan. Harap segera mengunduh dan mencadangkan file Anda di penyimpanan lokal.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">5. Perubahan Layanan dan Harga</h2>
        <p>Harga Produk Digital kami dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Kami berhak memodifikasi, menangguhkan, atau menghentikan layanan (atau bagian mana pun darinya) kapan saja.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">6. Hukum yang Berlaku</h2>
        <p>Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia.</p>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <p className="text-sm italic">Untuk pertanyaan terkait lisensi atau penggunaan produk, hubungi: support@atelier-studio.example.com</p>
      </div>
    </div>
  );
}
