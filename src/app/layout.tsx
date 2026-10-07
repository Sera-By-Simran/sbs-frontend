import type { Metadata } from 'next';
import { playfair, montserrat } from './fonts';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'SÉRA BY SIMRAN | Luxury Fashion Jewellery Boutique',
  description:
    'Exquisite demi-fine jewellery crafted with conscious luxury. Curated pendants, earrings, and statement pieces.',
  icons: {
    icon: '/brand/monogram.png',
    apple: '/brand/monogram.png',
  },
};

import { TrayProvider } from '@/context/TrayContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-sera-ivory text-sera-espresso font-sans antialiased">
        <TrayProvider>{children}</TrayProvider>
      </body>
    </html>
  );
}
