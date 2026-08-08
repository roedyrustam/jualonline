import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'ATELIER | Storefront Produk Digital, Template, Preset & E-Book',
  description: 'Toko produk digital modern & terpercaya. Jual beli template website Next.js, preset Lightroom sinematik, dan e-book dengan DOKU Payment Gateway.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005'),
  openGraph: {
    title: 'ATELIER | Premium Digital Assets',
    description: 'Toko produk digital modern & terpercaya.',
    url: '/',
    siteName: 'ATELIER',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATELIER | Premium Digital Assets',
    description: 'Toko produk digital modern & terpercaya.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
