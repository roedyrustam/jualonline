import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample digital products and admin account...');

  // Create Default Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@toko.com' },
    update: {},
    create: {
      email: 'admin@toko.com',
      name: 'Super Admin Atelier',
      passwordHash,
    },
  });

  // Sample Products Data
  const products = [
    {
      title: 'Aesthetic Studio Portfolio Template',
      slug: 'aesthetic-studio-portfolio-template',
      description: 'Template website Next.js 15 & Tailwind CSS v4 dengan konsep editorial minimalis, ideal untuk arsitek, desainer interior, studio kreatif, dan fotografer.',
      price: 249000,
      category: 'TEMPLATE',
      previewImage: '/uploads/preview-template-1.svg',
      digitalFile: 'protected-downloads/aesthetic-studio-portfolio-v1.zip',
      features: JSON.stringify([
        'Built with Next.js 15 App Router & TypeScript',
        'Tailwind CSS v4 dengan custom OKLCH design tokens',
        'SEO-ready dengan metadata JSON-LD & Dynamic OG Image',
        'Animasi ultra smooth & Framer Motion ready',
        'Dokumentasi setup & panduan modifikasi terperinci'
      ]),
      isPublished: true,
    },
    {
      title: 'Editorial Warm Tone Preset Pack (LR & PS)',
      slug: 'editorial-warm-tone-preset-pack',
      description: 'Koleksi 15 preset warna hangat ala majalah fashion Eropa untuk Lightroom Classic, Mobile, dan Adobe Camera Raw Photoshop.',
      price: 149000,
      category: 'PRESET',
      previewImage: '/uploads/preview-preset-1.svg',
      digitalFile: 'protected-downloads/editorial-warm-tone-presets.zip',
      features: JSON.stringify([
        '15 Preset XMP untuk Lightroom Desktop & Photoshop',
        '15 Preset DNG untuk Lightroom Mobile (iOS & Android)',
        'Tone kurva eksklusif untuk warna kulit alami',
        'Panduan instalasi satu klik'
      ]),
      isPublished: true,
    },
    {
      title: 'The Digital Creator Playbook (E-Book PDF)',
      slug: 'the-digital-creator-playbook-ebook',
      description: 'Panduan komprehensif 120 halaman menyusun, memasarkan, dan memonetisasi produk digital beromzet ratusan juta dari nol.',
      price: 199000,
      category: 'EBOOK',
      previewImage: '/uploads/preview-ebook-1.svg',
      digitalFile: 'protected-downloads/the-digital-creator-playbook.pdf',
      features: JSON.stringify([
        'E-Book PDF 120 Halaman HD Print Quality',
        'Studi kasus nyata monetisasi produk digital',
        'Template copy-paste copywriting penjualan',
        'Akses gratis ke pembaruan e-book seumur hidup'
      ]),
      isPublished: true,
    },
    {
      title: 'Luxe Agency SaaS Landing Page Template',
      slug: 'luxe-agency-saas-landing-page-template',
      description: 'Landing page SaaS premium bercita rasa tinggi dengan dark mode obsidian, glassmorphism, dan komponen interactive bento grid.',
      price: 329000,
      category: 'TEMPLATE',
      previewImage: '/uploads/preview-template-2.svg',
      digitalFile: 'protected-downloads/luxe-agency-saas-template.zip',
      features: JSON.stringify([
        '10+ Seksi Komponen Siap Pakai (Hero, Bento, Pricing, FAQ)',
        'Responsif 100% Mobile & Tablet',
        'Integrasi Stripe & Payment Form UI',
        'Struktur file bersih dan modular'
      ]),
      isPublished: true,
    },
    {
      title: 'Cinematic Film Grain Lightroom Presets',
      slug: 'cinematic-film-grain-lightroom-presets',
      description: 'Preset simulasi film 35mm klasik dengan tekstur grain organik dan palet warna sinematik khas sinema analog.',
      price: 129000,
      category: 'PRESET',
      previewImage: '/uploads/preview-preset-2.svg',
      digitalFile: 'protected-downloads/cinematic-film-grain-presets.zip',
      features: JSON.stringify([
        '10 Look Sinematik Analog (Kodak Portra & Fuji Superia Style)',
        'Efek Halation & Grain Emulation halus',
        'Format XMP & DNG Included'
      ]),
      isPublished: true,
    },
    {
      title: 'High-Ticket UI/UX Design System Manual',
      slug: 'high-ticket-ui-ux-design-system-manual',
      description: 'E-book & panduan praktis membangun UI/UX kelas dunia dengan standar WCAG AAA, typography hierarchy, dan design token modern.',
      price: 179000,
      category: 'EBOOK',
      previewImage: '/uploads/preview-ebook-2.svg',
      digitalFile: 'protected-downloads/high-ticket-ui-ux-design-system-manual.pdf',
      features: JSON.stringify([
        'PDF High Resolution 95 Halaman',
        'Figma File UI Kit Starter Included',
        'Panduan WCAG 2.2 AAA & Accessibility Best Practices'
      ]),
      isPublished: true,
    },
  ];

  for (const item of products) {
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
