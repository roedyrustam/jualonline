# ATELIER Digital Store

Platform toko digital modern eksklusif dengan estetika **Neo-Minimalist Cream & Editorial Charcoal**, dirancang khusus untuk menjual aset digital (template, preset, e-book) dengan proses checkout sangat cepat tanpa memerlukan akun pembeli (Guest Checkout).

Platform ini mengintegrasikan **DOKU Payment Gateway** beserta verifikasi webhook aman (HMAC-SHA256) untuk pemrosesan pembayaran instan. File dilindungi melalui sistem *Secure Download Token* (berbatas 24 jam / maksimal 10x unduhan).

## 🌟 Fitur Utama
1. **Neo-Minimalist UI**: Antarmuka premium ala editorial fesyen menggunakan `Tailwind CSS v4`.
2. **Performa & SEO (Core Web Vitals)**: Menggunakan `next/font/google` untuk nol *Layout Shift (CLS)* dan skema JSON-LD dinamis, didukung oleh Sitemap & Robots otomatis.
3. **DOKU Jokul Checkout**: Modal *in-app* resmi dari DOKU; pembeli tidak akan terlempar dari ekosistem toko saat membayar.
4. **Secure Digital Vault**: Pembeli hanya akan menerima akses unduhan *file* setelah *webhook* DOKU memverifikasi status pesanan sebagai `PAID`.
5. **Dashboard Admin Pintar**: Sistem manajemen produk (CRUD) yang dilindungi oleh autentikasi kuki terenkripsi.
6. **Agentic Commerce Ready**: Dilengkapi *DOKU MCP Server* terpisah untuk orkestrasi via AI *agents*.
7. **Automated Testing**: Diamankan menggunakan unit test (Vitest) & E2E Browser Testing (Playwright).

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router, Server Components & Actions)
- **Bahasa**: TypeScript 5
- **Database**: SQLite & Prisma 6 ORM
- **Payment**: DOKU Payment Gateway API v2
- **Testing**: Playwright & Vitest
- **CI/CD**: GitHub Actions

## 💻 Instalasi Lokal

### 1. Klon Repositori
```bash
git clone https://github.com/username/jualonline.git
cd jualonline
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan
Buat file `.env` dan lengkapi konfigurasi berikut:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="rahasia-super-kuat-anda"

# DOKU Sandbox Keys
DOKU_CLIENT_ID="KLIEN_ID_ANDA"
DOKU_SECRET_KEY="KUNCI_RAHASIA_ANDA"
DOKU_ENVIRONMENT="sandbox"
NEXT_PUBLIC_DOKU_ENVIRONMENT="sandbox"
```

### 4. Setup Database
```bash
npx prisma db push
npm run seed
```

### 5. Jalankan Server Development
```bash
npm run dev
```
Aplikasi kini berjalan di [http://localhost:3005](http://localhost:3005).

## 🧪 Pengujian (Testing)
Aplikasi ini dilindungi oleh tes otomatis.
```bash
# Jalankan Unit Tests (Vitest)
npx vitest run

# Jalankan E2E Browser Tests (Playwright)
npx playwright test
```

## 🤝 Lisensi
Dikembangkan secara penuh menggunakan protokol Agentic AI (Antigravity). Bebas digunakan dan dimodifikasi untuk tujuan komersial.
