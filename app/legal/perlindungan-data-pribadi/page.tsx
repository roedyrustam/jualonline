export const metadata = {
  title: 'Perlindungan Data Pribadi | ATELIER',
  description: 'Kepatuhan ATELIER Digital Store terhadap UU PDP Republik Indonesia',
};

export default function DataProtectionPage() {
  return (
    <div className="space-y-8 text-slate-600 leading-relaxed">
      <div className="space-y-2 border-b border-slate-200 pb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Perlindungan Data Pribadi (PDP)</h1>
        <p className="text-sm font-medium text-slate-400">Terakhir Diperbarui: 8 Agustus 2026</p>
      </div>

      <p>
        ATELIER Digital Store berkomitmen mematuhi Undang-Undang Perlindungan Data Pribadi (UU PDP) yang berlaku di Republik Indonesia. Dokumen ini merupakan ekstensi dari Kebijakan Privasi kami yang merinci hak-hak Anda atas data pribadi Anda.
      </p>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">1. Hak Pemilik Data Pribadi</h2>
        <p>Sebagai pengguna, Anda memiliki hak penuh atas data pribadi Anda, yang meliputi:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Hak Akses:</strong> Anda berhak meminta salinan data pribadi Anda yang kami simpan (seperti riwayat pesanan).</li>
          <li><strong>Hak Perbaikan:</strong> Anda berhak meminta kami memperbarui atau mengoreksi data yang tidak akurat.</li>
          <li><strong>Hak Penghapusan (Right to be Forgotten):</strong> Anda berhak meminta kami menghapus data pribadi Anda dari sistem kami, kecuali jika kami diwajibkan oleh hukum untuk menyimpannya (misalnya untuk tujuan audit pajak atau penyelesaian sengketa).</li>
          <li><strong>Hak Pencabutan Persetujuan:</strong> Anda berhak menarik persetujuan pemrosesan data untuk tujuan pemasaran kapan saja.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">2. Masa Retensi Data</h2>
        <p>Kami hanya akan menyimpan data pribadi Anda (nama dan email) selama yang diperlukan untuk memenuhi tujuan pengumpulannya, yaitu menyediakan akses ke tautan unduhan dan dukungan pelanggan. Riwayat transaksi akan disimpan setidaknya selama 5 (lima) tahun untuk keperluan kepatuhan hukum dan akuntansi.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">3. Pelanggaran Data (Data Breach)</h2>
        <p>Jika terjadi insiden keamanan yang mengakibatkan kebocoran data pribadi, kami berkomitmen untuk:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Memberitahu Anda dan otoritas terkait selambat-lambatnya dalam waktu 3x24 jam sejak insiden diketahui.</li>
          <li>Mengambil tindakan cepat untuk memitigasi risiko dan mengamankan sistem.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-900">4. Pengajuan Permohonan Hak PDP</h2>
        <p>Untuk melaksanakan hak-hak Anda, Anda dapat mengirimkan permohonan tertulis ke Data Protection Officer (DPO) kami melalui email:</p>
        <p className="font-medium text-slate-900">Email: dpo@atelier-studio.example.com</p>
        <p>Permohonan Anda akan diproses maksimal dalam waktu 14 hari kerja.</p>
      </div>
    </div>
  );
}
