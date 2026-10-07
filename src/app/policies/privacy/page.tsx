import React from 'react';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';

export const metadata = {
  title: 'Privacy Policy | SÉRA BY SIMRAN',
  description: 'How SÉRA BY SIMRAN handles client data, privacy protections, and marketing consent.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-16 px-6 lg:px-12 max-w-3xl mx-auto w-full space-y-8">
        <div className="border-b border-sera-taupe/20 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Governance & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs text-sera-taupe mt-2">Effective Date: October 2026</p>
        </div>

        <div className="prose prose-sera text-xs sm:text-sm text-sera-espresso/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">1. Information We Collect</h2>
            <p>
              When you submit a VIP enquiry, subscribe to our journal, or place an order, we collect details necessary to fulfill your request: name, phone number, email address, and delivery destination.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">2. Zero Sale of Personal Data</h2>
            <p>
              We treat your contact and preference records with absolute confidentiality. SÉRA BY SIMRAN never sells, trades, or leases client personal identifiable information (PII) to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">3. Communications & WhatsApp Consent</h2>
            <p>
              We only initiate contact regarding active orders or bespoke inquiries initiated by you. You may opt out of our private client journal or styling messages at any time by messaging STOP or contacting our concierge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">4. Data Security</h2>
            <p>
              Our infrastructure employs strict role-level security, encrypted SSL transit, and automated rate-limiting to protect all client interactions against unauthorised intrusion.
            </p>
          </section>
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
