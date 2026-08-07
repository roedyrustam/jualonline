import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant' 
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const viewport: Viewport = {
  themeColor: '#0F4C3A',
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
    <html lang="id" className={`${cormorant.variable} ${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
