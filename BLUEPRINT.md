# BluePrint & Arsitektur Teknis Toko Produk Digital Modern

## 1. Ringkasan Proyek

Platform toko produk digital modern dan mewah yang dirancang khusus untuk menjual template, preset, dan e-book dengan tampilan estetik **Neo-Minimalist Cream & Editorial Charcoal**. Dilengkapi dengan integrasi Payment Gateway DOKU, pengiriman file terproteksi via token berbatas waktu, serta Dashboard Admin CRUD produk yang komprehensif.

---

## 2. Arsitektur & Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components & Server Actions)
- **Bahasa**: TypeScript
- **Styling & UI**: Tailwind CSS v4, Google Fonts (Playfair Display / Cormorant Garamond & Inter), Glassmorphism, Micro-interactions
- **Database & ORM**: SQLite dengan Prisma 6 ORM
- **Payment Gateway**: Integrasi DOKU Payment Gateway (Checkout redirect / DOKU Snap Simulator, Webhook notification handler, dan auto-verification)
- **Keamanan File**: Secure Local Protection (`/protected-downloads/`) dengan Secure Token Link Handler (`/api/download/[token]`)
- **Autentikasi Admin**: Session-based encrypted Cookie Authentication via Next.js Middleware
- **AI Agentic Integration**: Standalone TypeScript DOKU MCP Server (`/doku-mcp-server`) untuk eksekusi checkout & pengecekan status otomatis via LLM agents.
- **CI/CD & Automated Testing**: GitHub Actions, Vitest (Unit Tests), dan Playwright (E2E Tests).

---

## 3. Skema Basis Data (Prisma Schema)

- **User / Admin**: `id`, `email`, `passwordHash`, `name`, `createdAt`
- **Product**: `id`, `title`, `slug`, `description`, `price`, `category` (TEMPLATE, PRESET, EBOOK), `previewImage`, `digitalFile`, `features` (JSON/String), `isPublished`, `createdAt`, `updatedAt`
- **Order**: `id`, `orderNumber`, `customerName`, `customerEmail`, `customerPhone`, `totalAmount`, `status` (PENDING, PAID, FAILED, EXPIRED), `dokuInvoiceNumber`, `dokuPaymentUrl`, `createdAt`, `updatedAt`
- **DownloadToken**: `id`, `token`, `orderId`, `productId`, `expiresAt`, `downloadCount`, `maxDownloads`

---

## 4. Alur Kerja Aplikasi & Pembayaran DOKU

1. **Browsing Produk**: Pengguna melihat daftar produk digital dengan filter kategori (Template, Preset, E-book).
2. **Detail & Checkout**: Pengguna memilih produk, mengisi data diri di form checkout.
3. **Inisiasi Pembayaran DOKU**: Server membuat `Order` dengan status `PENDING` dan membuat transaksi DOKU (`/api/checkout/doku`).
4. **Pembayaran & Webhook**: Pembeli diarahkan ke antarmuka DOKU. Setelah pembayaran diselesaikan, DOKU mengirimkan Webhook Notification ke server (`/api/webhooks/doku`).
5. **Verifikasi & Token Unduhan**: Webhook mengubah status Order menjadi `PAID`, dan server membuat `DownloadToken` aman yang aktif selama 24 jam.
6. **Unduh File**: Pembeli diarahkan ke halaman sukses dan menekan tombol unduh. API `/api/download/[token]` memvalidasi token dan mengirimkan file produk secara stream tanpa mengekspos lokasi file fisik.
7. **Manajemen Admin**: Admin login di `/admin/login`, mengakses dashboard `/admin` untuk melihat analitik penjualan, mengelola daftar produk (CRUD), serta memantau status pesanan DOKU.

---

## 5. Rencana Eksekusi & Tahapan Pembangunan

- **Fase 1**: Inisialisasi proyek Next.js 15, Tailwind CSS v4, Prisma SQLite setup, dan pembuatan font/desain token editorial.
- **Fase 2**: Implementasi Prisma Models dan Seed Data produk digital awal.
- **Fase 3**: Pembuatan UI Storefront (Homepage, Catalog Filter, Product Detail, Customer Checkout Form).
- **Fase 4**: Integrasi DOKU Payment Gateway API Handler & Simulator + Webhook Engine + Secure File Serving route.
- **Fase 5**: Pembuatan Dashboard Admin (`/admin`), Auth Session Cookie, CRUD Produk Modal/Form, dan Order Monitoring Table.
- **Fase 6**: Verifikasi end-to-end, testing alur pembelian, dan pengujian unduhan aman.
