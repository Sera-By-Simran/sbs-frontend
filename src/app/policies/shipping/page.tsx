import React from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';

export const metadata = {
  title: 'Shipping & Delivery Policy | SÉRA BY SIMRAN',
  description: 'Shipping timelines, courier handling, and delivery protocols for SÉRA demi-fine jewellery.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-16 px-6 lg:px-12 max-w-3xl mx-auto w-full space-y-8">
        <div className="border-b border-sera-taupe/20 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Client Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-sera-taupe mt-2">Effective Date: October 2026</p>
        </div>

        <div className="prose prose-sera text-xs sm:text-sm text-sera-espresso/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">1. Dispatch & Processing Timelines</h2>
            <p>
              Each piece of SÉRA jewellery undergoes individual inspection and hand-polishing before departure. Ready-to-ship pieces are dispatched within 2 to 4 business days following order confirmation. Bespoke and made-to-order creations require 7 to 14 business days of artisanal preparation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">2. Pan-India Delivery Partners</h2>
            <p>
              We partner with reputed courier services (Blue Dart, Delhivery) to ensure safe, tracked transit across all serviceable pincodes in India. Standard delivery typically takes 3 to 6 business days from dispatch depending on the destination city.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">3. Telemetry & Tracking</h2>
            <p>
              Upon dispatch, a unique consignment tracking number is shared via WhatsApp and email. You may also track the real-time status of your parcel directly via our{' '}
              <Link href="/track-order" className="text-sera-espresso font-semibold underline">
                Track Order portal
              </Link>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">4. Tamper-Evident Packaging</h2>
            <p>
              All shipments are encased within our signature keepsake packaging and sealed with tamper-evident security tape. If the outer parcel appears damaged or breached upon arrival, please decline receipt and notify our concierge immediately.
            </p>
          </section>
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
