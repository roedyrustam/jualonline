# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-flow.spec.ts >> E2E Checkout Flow >> Guest user can navigate to product and initialize checkout
- Location: tests\e2e\checkout-flow.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Contoh: 081234567890')

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - status [ref=f1e2]:
    - generic [ref=f1e7]:
      - text: Static route
      - button "Hide static indicator" [ref=f1e8] [cursor=pointer]
  - alert [ref=f1e12]: ATELIER | Storefront Produk Digital, Template, Preset & E-Book
  - generic [ref=f1e13]:
    - banner [ref=f1e14]:
      - generic [ref=f1e16]:
        - link "A ATELIER. Digital Assets Studio" [ref=f1e17] [cursor=pointer]:
          - /url: /
          - generic [ref=f1e18]: A
          - generic [ref=f1e19]:
            - generic [ref=f1e20]: ATELIER.
            - generic [ref=f1e21]: Digital Assets Studio
        - navigation [ref=f1e22]:
          - link "Semua Katalog" [ref=f1e23] [cursor=pointer]:
            - /url: /
          - link "Template Website" [ref=f1e24] [cursor=pointer]:
            - /url: /?category=TEMPLATE
          - link "Lightroom Presets" [ref=f1e25] [cursor=pointer]:
            - /url: /?category=PRESET
          - link "E-Book Guide" [ref=f1e26] [cursor=pointer]:
            - /url: /?category=EBOOK
        - generic [ref=f1e27]:
          - link "Cek Pesanan" [ref=f1e28] [cursor=pointer]:
            - /url: /track-order
          - link "Admin Area" [ref=f1e33] [cursor=pointer]:
            - /url: /admin
    - main [ref=f1e38]:
      - link "Kembali ke Detail Produk" [ref=f1e40] [cursor=pointer]:
        - /url: /products/high-ticket-ui-ux-design-system-manual
      - generic [ref=f1e44]:
        - heading "Formulir Pembelian Produk Digital" [level=1] [ref=f1e45]
        - paragraph [ref=f1e46]: Lengkapi data diri Anda untuk pemrosesan lisensi & pengiriman file via DOKU Payment Gateway
      - generic [ref=f1e47]:
        - generic [ref=f1e48]:
          - generic [ref=f1e49]: 1. Data Informasi Pembeli
          - generic [ref=f1e54]:
            - generic [ref=f1e55]:
              - generic [ref=f1e56]: Nama Lengkap *
              - 'textbox "Contoh: Roedy Rustam" [ref=f1e57]': Budi Test
            - generic [ref=f1e58]:
              - generic [ref=f1e59]: Alamat Email *
              - textbox "email@domain.com" [active] [ref=f1e60]: budi@example.com
              - paragraph [ref=f1e61]: Kuitansi pembayaran dan informasi lisensi akan dikirimkan ke email ini.
            - generic [ref=f1e62]:
              - generic [ref=f1e63]: Nomor WhatsApp / HP *
              - textbox "081234567890" [ref=f1e64]
            - generic [ref=f1e65]:
              - generic [ref=f1e66]: Kode Kupon Diskon (Opsional)
              - generic [ref=f1e67]:
                - 'textbox "Coba: ATELIER20 atau WELCOME10" [ref=f1e72]'
                - button "Pasang" [ref=f1e73] [cursor=pointer]
            - generic [ref=f1e75]:
              - generic [ref=f1e76]:
                - generic [ref=f1e77]: DOKU Payment Gateway
                - generic [ref=f1e81]: Secured 256-bit
              - paragraph [ref=f1e82]: Mendukung QRIS (GoPay, OVO, ShopeePay, Dana), Virtual Account (BCA, Mandiri, BRI, BNI), dan Kartu Kredit.
            - button "Lanjut Pembayaran DOKU (Rp 179.000)" [ref=f1e83] [cursor=pointer]
        - generic [ref=f1e84]:
          - heading "Ringkasan Pesanan" [level=3] [ref=f1e85]
          - generic [ref=f1e86]:
            - img "High-Ticket UI/UX Design System Manual" [ref=f1e88]
            - generic [ref=f1e89]:
              - text: EBOOK
              - heading "High-Ticket UI/UX Design System Manual" [level=4] [ref=f1e90]
          - generic [ref=f1e91]:
            - generic [ref=f1e92]:
              - generic [ref=f1e93]: Harga Produk Awal
              - generic [ref=f1e94]: Rp 179.000
            - generic [ref=f1e95]:
              - generic [ref=f1e96]: Biaya Layanan DOKU
              - generic [ref=f1e97]: GRATIS
            - generic [ref=f1e98]:
              - generic [ref=f1e99]: Total Pembayaran
              - generic [ref=f1e100]: Rp 179.000
          - generic [ref=f1e101]:
            - generic [ref=f1e102]: Link unduhan otomatis dibuat setelah konfirmasi DOKU
            - generic [ref=f1e107]: Lisensi komersial seumur hidup tanpa biaya tambahan
    - contentinfo [ref=f1e112]:
      - generic [ref=f1e113]:
        - generic [ref=f1e114]:
          - generic [ref=f1e115]:
            - generic [ref=f1e116]:
              - generic [ref=f1e117]: A
              - generic [ref=f1e118]: ATELIER.
            - paragraph [ref=f1e119]: Curated digital products built with aesthetic precision. Providing world-class templates, lightroom presets, and strategic creator playbooks.
          - generic [ref=f1e120]:
            - heading "Produk Digital" [level=4] [ref=f1e121]
            - list [ref=f1e122]:
              - listitem [ref=f1e123]:
                - link "Template Website Next.js" [ref=f1e124] [cursor=pointer]:
                  - /url: /?category=TEMPLATE
              - listitem [ref=f1e125]:
                - link "Lightroom Presets Pack" [ref=f1e126] [cursor=pointer]:
                  - /url: /?category=PRESET
              - listitem [ref=f1e127]:
                - link "E-Book Digital Creator" [ref=f1e128] [cursor=pointer]:
                  - /url: /?category=EBOOK
              - listitem [ref=f1e129]:
                - link "Koleksi Terbaru" [ref=f1e130] [cursor=pointer]:
                  - /url: /
          - generic [ref=f1e131]:
            - heading "Sistem Pembayaran" [level=4] [ref=f1e132]
            - list [ref=f1e133]:
              - listitem [ref=f1e134]:
                - generic [ref=f1e137]: DOKU Payment Gateway
              - listitem [ref=f1e138]: QRIS, Virtual Account, Credit Card & E-Wallet
              - listitem [ref=f1e139]:
                - generic [ref=f1e143]: Instan Auto Verification
          - generic [ref=f1e144]:
            - heading "Jaminan Kualitas" [level=4] [ref=f1e145]
            - generic [ref=f1e146]:
              - generic [ref=f1e147]: Lisensi Penggunaan Komersial & Personal
              - generic [ref=f1e152]: Download Aman Berdurasi Waktu
              - generic [ref=f1e157]: Dukungan Teknis & Pembaruan File
        - generic [ref=f1e162]:
          - paragraph [ref=f1e163]: © 2026 ATELIER Digital Store. Powered by Next.js 15 & DOKU Payment Gateway.
          - generic [ref=f1e164]:
            - link "Admin Login" [ref=f1e165] [cursor=pointer]:
              - /url: /admin/login
            - generic [ref=f1e166]: "-"
            - generic [ref=f1e167]: All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('E2E Checkout Flow', () => {
  4  |   test('Guest user can navigate to product and initialize checkout', async ({ page }) => {
  5  |     // 1. Visit the homepage
  6  |     await page.goto('/');
  7  |     await expect(page).toHaveTitle(/ATELIER/);
  8  | 
  9  |     // 2. Find and click the first product card
  10 |     // Assuming we have at least one product seeded. We wait for the product grid to load.
  11 |     const productCard = page.locator('a[href^="/products/"]').first();
  12 |     await expect(productCard).toBeVisible();
  13 |     
  14 |     // Store product URL to navigate directly if click causes issues in test
  15 |     const productUrl = await productCard.getAttribute('href');
  16 |     expect(productUrl).not.toBeNull();
  17 |     
  18 |     // Navigate to product page
  19 |     await page.goto(productUrl as string);
  20 |     
  21 |     // 3. Click "Beli Sekarang"
  22 |     const buyButton = page.getByRole('link', { name: /Beli Sekarang/i });
  23 |     await expect(buyButton).toBeVisible();
  24 |     await buyButton.click();
  25 | 
  26 |     // 4. Fill in the Guest Checkout Form
  27 |     await expect(page.getByText('Data Informasi Pembeli')).toBeVisible();
  28 |     
  29 |     await page.getByPlaceholder('Contoh: Roedy Rustam').fill('Budi Test');
  30 |     await page.getByPlaceholder('email@domain.com').fill('budi@example.com');
> 31 |     await page.getByPlaceholder('Contoh: 081234567890').fill('081234567890');
     |                                                         ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  32 | 
  33 |     // 5. Submit Checkout
  34 |     const payButton = page.getByRole('button', { name: /Bayar Sekarang/i });
  35 |     await expect(payButton).toBeEnabled();
  36 |     
  37 |     // We do not actually click the pay button in basic E2E because 
  38 |     // it will trigger a real DOKU API call (even in Sandbox) causing test pollution.
  39 |     // However, we verify the button is accessible and the form is valid.
  40 |     expect(await payButton.textContent()).toMatch(/Bayar Sekarang/);
  41 |   });
  42 | });
  43 | 
```