import React from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';

export const metadata = {
  title: 'Returns & Exchange Policy | SÉRA BY SIMRAN',
  description: 'Exchange guidelines, return conditions, and client support for SÉRA demi-fine jewellery.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-16 px-6 lg:px-12 max-w-3xl mx-auto w-full space-y-8">
        <div className="border-b border-sera-taupe/20 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Client Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Returns & Exchange Policy
          </h1>
          <p className="text-xs text-sera-taupe mt-2">Effective Date: October 2026</p>
        </div>

        <div className="prose prose-sera text-xs sm:text-sm text-sera-espresso/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">1. Exchange Window</h2>
            <p>
              Due to the personal nature of fine jewellery, we accept exchange requests within 48 hours of confirmed delivery for eligible, unworn items in their original packaging with security seals intact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">2. Eligibility Conditions</h2>
            <p>
              To qualify for an exchange, items must be unworn, undamaged, free of cosmetic scratches, and returned alongside all original documentation, pouches, and keepsake boxes. Custom-sized rings and bespoke engraved pieces are non-exchangeable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">3. Transit Damage or Defect Claims</h2>
            <p>
              In the rare event of damage in transit or a craftsmanship irregularity, notify our concierge team within 24 hours of receiving the parcel with clear photographic evidence and an unboxing video. We will coordinate a replacement or reverse pickup at no additional cost.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">4. Initiating an Exchange</h2>
            <p>
              Please message our styling concierge over WhatsApp or email{' '}
              <a href="mailto:concierge@serabysimran.com" className="text-sera-espresso underline font-mono">
                concierge@serabysimran.com
              </a>{' '}
              with your order reference (e.g. SRA-O-001001) to begin the process.
            </p>
          </section>
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
